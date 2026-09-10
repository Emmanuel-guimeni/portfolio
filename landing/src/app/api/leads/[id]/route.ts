import { NextResponse } from 'next/server';
import { isAuthorised } from '@/lib/auth';
import { deleteLead, getLead, updateLead, type LeadPatch } from '@/lib/db';
import { LEAD_STATUSES, type LeadStatus } from '@/lib/leads';
import { clean, cleanMultiline } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

/** GET /api/leads/:id — protected. */
export async function GET(req: Request, { params }: Ctx) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, lead });
}

/**
 * PATCH /api/leads/:id — protected.
 * Only the operator-editable fields are accepted; everything else is ignored,
 * so a malformed or hostile payload cannot rewrite a lead's identity.
 */
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }

  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const patch: LeadPatch = {};

  if (body.status !== undefined) {
    const status = clean(body.status, 20);
    if (!(LEAD_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json(
        { ok: false, error: `status must be one of: ${LEAD_STATUSES.join(', ')}` },
        { status: 422 },
      );
    }
    patch.status = status as LeadStatus;
  }

  if (body.notes !== undefined) patch.notes = cleanMultiline(body.notes, 4000);
  if (body.company !== undefined) patch.company = clean(body.company, 120);
  if (body.job_title !== undefined) patch.job_title = clean(body.job_title, 120);
  if (body.country !== undefined) patch.country = clean(body.country, 64);
  if (body.phone !== undefined) patch.phone = clean(body.phone, 32);

  if (body.lead_score !== undefined) {
    const score = Number(body.lead_score);
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      return NextResponse.json(
        { ok: false, error: 'lead_score must be a number between 0 and 100.' },
        { status: 422 },
      );
    }
    patch.lead_score = Math.round(score);
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: 'No editable field supplied.' }, { status: 400 });
  }

  try {
    const lead = await updateLead(id, patch);
    if (!lead) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error('[PATCH /api/leads/:id]', error);
    return NextResponse.json({ ok: false, error: 'Could not update the lead.' }, { status: 500 });
  }
}

/** DELETE /api/leads/:id — protected. */
export async function DELETE(req: Request, { params }: Ctx) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }
  const { id } = await params;
  try {
    const deleted = await deleteLead(id);
    if (!deleted) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error('[DELETE /api/leads/:id]', error);
    return NextResponse.json({ ok: false, error: 'Could not delete the lead.' }, { status: 500 });
  }
}
