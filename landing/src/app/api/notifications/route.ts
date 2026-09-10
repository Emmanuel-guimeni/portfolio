import { NextResponse } from 'next/server';
import { isAuthorised } from '@/lib/auth';
import { getLead } from '@/lib/db';
import { notifyNewLead } from '@/lib/notifications';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/notifications — protected.
 *
 * Re-fires the notification pipeline for an existing lead:
 *   · email alert to Emmanuel
 *   · optional confirmation email to the prospect
 *   · outbound webhook to Make / Zapier / n8n / HubSpot
 *
 * Use it to replay a notification that failed, or to push an older lead into a
 * newly connected integration.
 *
 * Body: { "leadId": "<uuid>" }
 */
export async function POST(req: Request) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ ok: false, error: 'Non autorisé' }, { status: 401 });
  }

  let body: { leadId?: string };
  try {
    body = (await req.json()) as { leadId?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'Corps de requête JSON invalide.' }, { status: 400 });
  }

  if (!body.leadId) {
    return NextResponse.json({ ok: false, error: 'leadId est obligatoire.' }, { status: 400 });
  }

  const lead = await getLead(body.leadId);
  if (!lead) {
    return NextResponse.json({ ok: false, error: 'Lead introuvable.' }, { status: 404 });
  }

  const result = await notifyNewLead(lead);
  return NextResponse.json({ ok: true, leadId: lead.id, result });
}

/** GET /api/notifications — protected. Reports which channels are configured. */
export async function GET(req: Request) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ ok: false, error: 'Non autorisé' }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    channels: {
      emailProvider: process.env.EMAIL_PROVIDER ?? 'none',
      emailConfigured: Boolean(process.env.EMAIL_API_KEY && process.env.EMAIL_FROM),
      confirmationToProspect: process.env.EMAIL_SEND_CONFIRMATION === 'true',
      webhookConfigured: Boolean(process.env.LEAD_WEBHOOK_URL),
    },
  });
}
