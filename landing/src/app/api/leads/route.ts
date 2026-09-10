import { NextResponse } from 'next/server';
import { isAuthorised } from '@/lib/auth';
import {
  checkHoneypot,
  checkTiming,
  verifyTurnstile,
} from '@/lib/antispam';
import {
  createLead,
  findRecentDuplicate,
  listLeads,
  storageMode,
} from '@/lib/db';
import { notifyNewLead } from '@/lib/notifications';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { scoreLead } from '@/lib/scoring';
import { temperature } from '@/lib/leads';
import { validateLead } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 5 submissions per IP per 10 minutes. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * Codes de résultat.
 *
 * L'API ne connaît pas la langue du visiteur : elle renvoie un `code` stable et
 * l'interface affiche le texte traduit correspondant. Le champ `error`/`message`
 * en clair reste présent pour les clients non navigateur (Make, Zapier, curl).
 */
export type LeadResultCode =
  | 'created'
  | 'duplicate'
  | 'validation_failed'
  | 'rate_limited'
  | 'spam_rejected'
  | 'server_error';

/**
 * POST /api/leads — public.
 *
 * Pipeline:  rate limit → anti-spam → validation → duplicate check →
 *            lead score → database → notifications → confirmation.
 */
export async function POST(req: Request) {
  const ip = clientIp(req.headers);

  const limited = rateLimit(`leads:${ip}`, LIMIT, WINDOW_MS);
  if (!limited.allowed) {
    return NextResponse.json(
      {
        ok: false,
        code: 'rate_limited' satisfies LeadResultCode,
        error: 'Trop de demandes. Merci de réessayer dans quelques minutes.',
      },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Corps de requête JSON invalide.' }, { status: 400 });
  }

  // ── 1. Anti-spam ────────────────────────────────────────────────────────
  const honeypot = checkHoneypot(body);
  const timing = checkTiming(body);
  if (honeypot.spam || timing.spam) {
    // On répond 200 pour que les bots ne puissent pas se calibrer sur la réponse.
    return NextResponse.json({
      ok: true,
      code: 'spam_rejected' satisfies LeadResultCode,
      id: null,
      discarded: true,
    });
  }
  if (!(await verifyTurnstile(body.turnstile_token, ip))) {
    return NextResponse.json(
      { ok: false, error: 'La vérification anti-spam a échoué. Merci de recharger la page.' },
      { status: 400 },
    );
  }

  // ── 2. Validation ───────────────────────────────────────────────────────
  const validation = validateLead(body);
  if (!validation.ok || !validation.data) {
    return NextResponse.json(
      {
        ok: false,
        code: 'validation_failed' satisfies LeadResultCode,
        error: 'Merci de vérifier les champs signalés.',
        errors: validation.errors,
      },
      { status: 422 },
    );
  }
  const input = validation.data;

  try {
    // ── 3. Duplicate guard (same person, same request, same half hour) ────
    const duplicate = await findRecentDuplicate(input.email, input.service_requested);
    if (duplicate) {
      return NextResponse.json({
        ok: true,
        code: 'duplicate' satisfies LeadResultCode,
        duplicate: true,
      });
    }

    // ── 4. Score, then store ──────────────────────────────────────────────
    const scored = scoreLead(input);
    const lead = await createLead({ ...input, lead_score: scored.score });

    // ── 5. Notification (n'empêche jamais la confirmation si un fournisseur tombe)
    const notified = await notifyNewLead(lead);
    if (notified.errors.length > 0) {
      // Journalisé côté serveur uniquement : la réponse publique n'expose ni le
      // fournisseur configuré ni son message d'erreur.
      console.error('[POST /api/leads] notifications', notified.errors);
    }

    return NextResponse.json(
      {
        ok: true,
        code: 'created' satisfies LeadResultCode,
        id: lead.id,
        score: lead.lead_score,
        temperature: temperature(lead.lead_score),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('[POST /api/leads]', error);
    return NextResponse.json(
      {
        ok: false,
        code: 'server_error' satisfies LeadResultCode,
        error:
          'Votre demande n’a pas pu être enregistrée. Écrivez-moi directement à christguimeni@gmail.com.',
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/leads — protected (admin session cookie or Bearer LEADS_API_TOKEN).
 * Supports filtering by status, service, country, source, score, date and text.
 */
export async function GET(req: Request) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ ok: false, error: 'Non autorisé' }, { status: 401 });
  }

  const url = new URL(req.url);
  const p = url.searchParams;
  const minScore = p.get('minScore');

  try {
    const leads = await listLeads({
      status: p.get('status') ?? undefined,
      service: p.get('service') ?? undefined,
      country: p.get('country') ?? undefined,
      source: p.get('source') ?? undefined,
      minScore: minScore ? Number(minScore) : undefined,
      from: p.get('from') ?? undefined,
      to: p.get('to') ?? undefined,
      search: p.get('search') ?? undefined,
      limit: p.get('limit') ? Number(p.get('limit')) : undefined,
      offset: p.get('offset') ? Number(p.get('offset')) : undefined,
    });
    return NextResponse.json({ ok: true, count: leads.length, storage: storageMode(), leads });
  } catch (error) {
    console.error('[GET /api/leads]', error);
    return NextResponse.json({ ok: false, error: 'Lecture des leads impossible.' }, { status: 500 });
  }
}
