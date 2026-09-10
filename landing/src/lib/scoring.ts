import type { LeadInput } from './leads';
import { temperature } from './leads';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LEAD SCORING
 * ─────────────────────────────────────────────────────────────────────────────
 *  Deliberately transparent and easy to tune: every rule is a row in the table
 *  below. Change a weight here and the API, the dashboard and the stored score
 *  all follow. Re-score existing leads at any time with POST /api/score.
 *
 *  Bands:  0–30 Cold  ·  31–60 Warm  ·  61+ Hot
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Free / consumer mailbox domains — a lead on one of these is not "professional". */
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.fr', 'ymail.com',
  'hotmail.com', 'hotmail.fr', 'outlook.com', 'outlook.fr', 'live.com',
  'live.fr', 'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com',
  'proton.me', 'protonmail.com', 'gmx.com', 'gmx.fr', 'mail.com',
  'yandex.com', 'zoho.com', 'orange.fr', 'free.fr', 'laposte.net',
  'wanadoo.fr', 'sfr.fr', 'menara.ma',
]);

/** Budget bands, mapped to the points they contribute. */
const BUDGET_POINTS: Record<string, number> = {
  'Less than €500': 0,
  '€500–€1,000': 5,
  '€1,000–€3,000': 10,
  '€3,000–€5,000': 15,
  '€5,000+': 20,
  'Not defined yet': 0,
};

/** Services that signal an audit request. */
const AUDIT_SERVICES = [
  'Digital Marketing Audit',
  'AI Marketing Audit',
  'Marketing Automation Audit',
];

/** Services that signal a consulting engagement. */
const CONSULTING_SERVICES = [
  'AI Automation Consulting',
  'CRM Consulting',
  'SEO Consulting',
  'Digital Marketing Strategy',
  'Data & Analytics',
];

/** Words in the free-text message that indicate a genuine automation project. */
const AUTOMATION_KEYWORDS = [
  'automat', 'automatis', 'workflow', 'crm', 'lead', 'scoring', 'nurtur',
  'integration', 'intégration', 'api', 'zapier', 'make', 'n8n', 'hubspot',
  'pipeline', 'système', 'system', 'ia ', ' ai ', 'agent', 'chatbot',
];

export interface ScoreRule {
  id: string;
  label: string;
  points: number;
  applies: (lead: LeadInput) => boolean;
  /** Rules with a dynamic value (e.g. budget) override `points`. */
  value?: (lead: LeadInput) => number;
}

export const SCORE_RULES: ScoreRule[] = [
  {
    id: 'professional_email',
    label: 'Professional email domain',
    points: 10,
    applies: (l) => isProfessionalEmail(l.email),
  },
  {
    id: 'company',
    label: 'Company provided',
    points: 10,
    applies: (l) => nonEmpty(l.company),
  },
  {
    id: 'phone',
    label: 'Phone / WhatsApp provided',
    points: 10,
    applies: (l) => nonEmpty(l.phone),
  },
  {
    id: 'budget',
    label: 'Declared budget',
    points: 20,
    applies: (l) => (BUDGET_POINTS[l.budget ?? ''] ?? 0) > 0,
    value: (l) => BUDGET_POINTS[l.budget ?? ''] ?? 0,
  },
  {
    id: 'audit_request',
    label: 'Audit requested',
    points: 10,
    applies: (l) => AUDIT_SERVICES.includes(l.service_requested),
  },
  {
    id: 'consulting_request',
    label: 'Consulting requested',
    points: 15,
    applies: (l) => CONSULTING_SERVICES.includes(l.service_requested),
  },
  {
    id: 'automation_project',
    label: 'Automation project described in the message',
    points: 20,
    applies: (l) => hasAutomationIntent(l.message),
  },
  {
    id: 'detailed_message',
    label: 'Detailed message (120+ characters)',
    points: 5,
    applies: (l) => (l.message?.trim().length ?? 0) >= 120,
  },
  {
    id: 'job_title',
    label: 'Job title provided',
    points: 5,
    applies: (l) => nonEmpty(l.job_title),
  },
];

export interface ScoreBreakdown {
  score: number;
  temperature: ReturnType<typeof temperature>;
  matched: { id: string; label: string; points: number }[];
}

export function scoreLead(lead: LeadInput): ScoreBreakdown {
  const matched: ScoreBreakdown['matched'] = [];
  let score = 0;

  for (const rule of SCORE_RULES) {
    if (!rule.applies(lead)) continue;
    const points = rule.value ? rule.value(lead) : rule.points;
    if (points <= 0) continue;
    score += points;
    matched.push({ id: rule.id, label: rule.label, points });
  }

  // Clamp so a future rule change can never produce a nonsensical band.
  score = Math.max(0, Math.min(100, score));
  return { score, temperature: temperature(score), matched };
}

export function isProfessionalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

function nonEmpty(v?: string | null): boolean {
  return Boolean(v && v.trim().length > 1);
}

function hasAutomationIntent(message?: string | null): boolean {
  if (!message) return false;
  const m = ` ${message.toLowerCase()} `;
  return AUTOMATION_KEYWORDS.some((k) => m.includes(k));
}
