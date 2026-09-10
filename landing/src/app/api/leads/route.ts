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
        error: 'Too many requests. Please try again in a few minutes.',
      },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  // ── 1. Anti-spam ────────────────────────────────────────────────────────
  const honeypot = checkHoneypot(body);
  const timing = checkTiming(body);
  if (honeypot.spam || timing.spam) {
    // Answer 200 so bots cannot use the response to tune themselves.
    return NextResponse.json({ ok: true, id: null, discarded: true });
  }
  if (!(await verifyTurnstile(body.turnstile_token, ip))) {
    return NextResponse.json(
      { ok: false, error: 'Anti-spam verification failed. Please reload the page.' },
      { status: 400 },
    );
  }

  // ── 2. Validation ───────────────────────────────────────────────────────
  const validation = validateLead(body);
  if (!validation.ok || !validation.data) {
    return NextResponse.json(
      { ok: false, error: 'Please check the highlighted fields.', errors: validation.errors },
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
        id: duplicate.id,
        duplicate: true,
        score: duplicate.lead_score,
        temperature: temperature(duplicate.lead_score),
        message: 'Your request has already been received. I will come back to you shortly.',
      });
    }

    // ── 4. Score, then store ──────────────────────────────────────────────
    const scored = scoreLead(input);
    const lead = await createLead({ ...input, lead_score: scored.score });

    // ── 5. Notify (never blocks the confirmation on a provider failure) ───
    const notified = await notifyNewLead(lead);

    return NextResponse.json(
      {
        ok: true,
        id: lead.id,
        score: lead.lead_score,
        temperature: temperature(lead.lead_score),
        storage: storageMode(),
        notifications: notified,
        message: 'Thank you — your request has been received.',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('[POST /api/leads]', error);
    return NextResponse.json(
      {
        ok: false,
        error:
          'Your request could not be saved. Please email me directly at christguimeni@gmail.com.',
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
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
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
    return NextResponse.json({ ok: false, error: 'Could not read leads.' }, { status: 500 });
  }
}
