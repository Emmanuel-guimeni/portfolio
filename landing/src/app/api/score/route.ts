import { NextResponse } from 'next/server';
import { isAuthorised } from '@/lib/auth';
import { listLeads, updateLead } from '@/lib/db';
import { SCORE_RULES, scoreLead } from '@/lib/scoring';
import type { LeadInput } from '@/lib/leads';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { validateLead } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/score — public. Returns the scoring model itself, so the rules are
 * auditable and a client can see exactly how they were qualified.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    bands: [
      { label: 'Cold', from: 0, to: 30 },
      { label: 'Warm', from: 31, to: 60 },
      { label: 'Hot', from: 61, to: 100 },
    ],
    rules: SCORE_RULES.map((r) => ({ id: r.id, label: r.label, points: r.points })),
  });
}

/**
 * POST /api/score
 *
 *  · Public  — `{ ...leadFields }` returns the score WITHOUT storing anything.
 *              Useful for previewing the model or scoring from an automation.
 *  · Admin   — `{ "recalculate": true }` re-scores every stored lead with the
 *              current rules and writes the new values back.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  /* ── Bulk recalculation (protected) ─────────────────────────────────── */
  if (body.recalculate === true) {
    if (!(await isAuthorised(req))) {
      return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
    }
    try {
      const leads = await listLeads({ limit: 1000 });
      let updated = 0;
      for (const lead of leads) {
        const { score } = scoreLead(leadToInput(lead));
        if (score !== lead.lead_score) {
          await updateLead(lead.id, { lead_score: score });
          updated += 1;
        }
      }
      return NextResponse.json({ ok: true, examined: leads.length, updated });
    } catch (error) {
      console.error('[POST /api/score recalculate]', error);
      return NextResponse.json({ ok: false, error: 'Recalculation failed.' }, { status: 500 });
    }
  }

  /* ── Stateless preview (public, rate limited) ───────────────────────── */
  const limited = rateLimit(`score:${clientIp(req.headers)}`, 30, 60_000);
  if (!limited.allowed) {
    return NextResponse.json({ ok: false, error: 'Too many requests.' }, { status: 429 });
  }

  const validation = validateLead({ ...body, consent: true });
  if (!validation.ok || !validation.data) {
    return NextResponse.json(
      { ok: false, error: 'Invalid lead payload.', errors: validation.errors },
      { status: 422 },
    );
  }

  const result = scoreLead(validation.data);
  return NextResponse.json({ ok: true, ...result });
}

/** Narrows a stored row back to the fields the scorer reads. */
function leadToInput(lead: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  company: string | null;
  job_title: string | null;
  service_requested: string;
  budget: string | null;
  message: string | null;
}): LeadInput {
  return {
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: lead.phone ?? undefined,
    country: lead.country ?? undefined,
    company: lead.company ?? undefined,
    job_title: lead.job_title ?? undefined,
    service_requested: lead.service_requested,
    budget: lead.budget ?? undefined,
    message: lead.message ?? undefined,
    consent: true,
  };
}
