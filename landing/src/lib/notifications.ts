import { site } from '@/config/site';
import { temperature, type Lead } from './leads';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NOTIFICATIONS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Three independent channels, each one optional and each one failing softly —
 *  a notification problem must never lose a lead that is already stored.
 *
 *   1. Email alert to Emmanuel        → EMAIL_PROVIDER + EMAIL_API_KEY
 *   2. Confirmation email to the lead → EMAIL_SEND_CONFIRMATION=true
 *   3. Outbound webhook               → LEAD_WEBHOOK_URL
 *      (this is the integration point for HubSpot / Brevo / Make / Zapier / n8n)
 *
 *  STATUS: READY IN CODE — REQUIRES EXTERNAL CONFIGURATION (see README §6).
 * ─────────────────────────────────────────────────────────────────────────────
 */

type Provider = 'resend' | 'brevo' | 'none';

const provider = (process.env.EMAIL_PROVIDER ?? 'none').toLowerCase() as Provider;
const apiKey = process.env.EMAIL_API_KEY ?? '';
const from = process.env.EMAIL_FROM ?? '';
const notifyTo = process.env.EMAIL_NOTIFY_TO ?? site.email;
const sendConfirmation = process.env.EMAIL_SEND_CONFIRMATION === 'true';

export interface NotifyResult {
  emailAlert: 'sent' | 'skipped' | 'failed';
  confirmation: 'sent' | 'skipped' | 'failed';
  webhook: 'sent' | 'skipped' | 'failed';
  errors: string[];
}

export async function notifyNewLead(lead: Lead): Promise<NotifyResult> {
  const result: NotifyResult = {
    emailAlert: 'skipped',
    confirmation: 'skipped',
    webhook: 'skipped',
    errors: [],
  };

  const tasks: Promise<void>[] = [];

  if (provider !== 'none' && apiKey && from) {
    tasks.push(
      sendEmail({
        to: notifyTo,
        subject: `${temperature(lead.lead_score).toUpperCase()} lead · ${lead.service_requested} · ${lead.first_name} ${lead.last_name}`,
        html: alertHtml(lead),
        replyTo: lead.email,
      })
        .then(() => {
          result.emailAlert = 'sent';
        })
        .catch((e) => {
          result.emailAlert = 'failed';
          result.errors.push(`alert: ${errText(e)}`);
        }),
    );

    if (sendConfirmation) {
      tasks.push(
        sendEmail({
          to: lead.email,
          subject: 'Your request has been received — GUEHEDI Emmanuel',
          html: confirmationHtml(lead),
        })
          .then(() => {
            result.confirmation = 'sent';
          })
          .catch((e) => {
            result.confirmation = 'failed';
            result.errors.push(`confirmation: ${errText(e)}`);
          }),
      );
    }
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push(
      sendWebhook(lead)
        .then(() => {
          result.webhook = 'sent';
        })
        .catch((e) => {
          result.webhook = 'failed';
          result.errors.push(`webhook: ${errText(e)}`);
        }),
    );
  }

  await Promise.allSettled(tasks);
  return result;
}

/* ───────────────────────────── Email providers ──────────────────────────── */

async function sendEmail(msg: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  if (provider === 'resend') {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [msg.to],
        subject: msg.subject,
        html: msg.html,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return;
  }

  if (provider === 'brevo') {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: parseSender(from),
        to: [{ email: msg.to }],
        subject: msg.subject,
        htmlContent: msg.html,
        ...(msg.replyTo ? { replyTo: { email: msg.replyTo } } : {}),
      }),
    });
    if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
    return;
  }

  throw new Error(`Unknown EMAIL_PROVIDER: ${provider}`);
}

/** Accepts either "you@example.com" or "Name <you@example.com>". */
function parseSender(value: string): { name?: string; email: string } {
  const match = value.match(/^\s*(.*?)\s*<\s*(.+?)\s*>\s*$/);
  return match ? { name: match[1] || undefined, email: match[2] } : { email: value.trim() };
}

/* ───────────────────────────── Outbound webhook ─────────────────────────── */

async function sendWebhook(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL!;
  const secret = process.env.LEAD_WEBHOOK_SECRET;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { 'X-Webhook-Secret': secret } : {}),
    },
    body: JSON.stringify({
      event: 'lead.created',
      sentAt: new Date().toISOString(),
      temperature: temperature(lead.lead_score),
      lead,
    }),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
}

/* ───────────────────────────── Email templates ──────────────────────────── */

const wrap = (inner: string) => `<!doctype html>
<html><body style="margin:0;padding:24px;background:#0b0d13;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e8ecf5">
  <div style="max-width:600px;margin:0 auto;background:#111521;border:1px solid #232838;border-radius:16px;padding:28px">
    ${inner}
    <p style="margin-top:28px;padding-top:18px;border-top:1px solid #232838;color:#7c8699;font-size:12px">
      ${site.name} — ${site.role}<br>${site.location.label}
    </p>
  </div>
</body></html>`;

const esc = (v: unknown) =>
  String(v ?? '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function alertHtml(lead: Lead): string {
  const temp = temperature(lead.lead_score);
  const colour = temp === 'Hot' ? '#fb7185' : temp === 'Warm' ? '#fbbf24' : '#94a3b8';
  const row = (label: string, value: unknown) =>
    `<tr><td style="padding:6px 0;color:#7c8699;font-size:13px;width:150px">${label}</td>
       <td style="padding:6px 0;font-size:14px">${esc(value)}</td></tr>`;

  return wrap(`
    <p style="margin:0 0 6px;color:${colour};font-size:12px;letter-spacing:.12em;text-transform:uppercase">
      ${temp} lead · score ${lead.lead_score}/100
    </p>
    <h1 style="margin:0 0 18px;font-size:22px">${esc(lead.first_name)} ${esc(lead.last_name)}</h1>
    <table style="width:100%;border-collapse:collapse">
      ${row('Email', lead.email)}
      ${row('Phone', lead.phone)}
      ${row('Company', lead.company)}
      ${row('Job title', lead.job_title)}
      ${row('Country', lead.country)}
      ${row('Service', lead.service_requested)}
      ${row('Budget', lead.budget)}
      ${row('Source', lead.source)}
      ${row('UTM', [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' / '))}
      ${row('Landing page', lead.landing_page)}
    </table>
    ${
      lead.message
        ? `<div style="margin-top:18px;padding:16px;background:#0b0d13;border:1px solid #232838;border-radius:10px;white-space:pre-wrap;font-size:14px">${esc(lead.message)}</div>`
        : ''
    }
    <p style="margin-top:22px">
      <a href="mailto:${esc(lead.email)}" style="display:inline-block;padding:11px 20px;background:#4f5cf0;color:#fff;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${esc(lead.first_name)}</a>
    </p>`);
}

function confirmationHtml(lead: Lead): string {
  return wrap(`
    <h1 style="margin:0 0 14px;font-size:22px">Thank you, ${esc(lead.first_name)}.</h1>
    <p style="color:#b6bfd0;font-size:15px;line-height:1.65">
      I have received your request regarding <strong style="color:#e8ecf5">${esc(lead.service_requested)}</strong>
      and I will come back to you personally, usually within one business day.
    </p>
    <p style="color:#b6bfd0;font-size:15px;line-height:1.65">
      In the meantime, if anything is urgent you can reach me directly:
    </p>
    <p style="font-size:15px">
      <a href="mailto:${site.email}" style="color:#60a5fa">${site.email}</a><br>
      <a href="tel:${site.phone.e164}" style="color:#60a5fa">${site.phone.display}</a>
    </p>`);
}

function errText(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
