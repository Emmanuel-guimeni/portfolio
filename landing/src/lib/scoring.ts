import type { LeadInput } from './leads';
import { temperature } from './leads';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LEAD SCORING
 * ─────────────────────────────────────────────────────────────────────────────
 *  Volontairement transparent et facile à ajuster : chaque règle est une ligne
 *  du tableau ci-dessous. Modifiez un poids ici et l'API, le tableau de bord et
 *  le score stocké suivent. Recalculez les leads existants à tout moment avec
 *  POST /api/score.
 *
 *  Paliers :  0–30 Froid  ·  31–60 Tiède  ·  61+ Chaud
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Messageries grand public — un lead sur l'une d'elles n'est pas « professionnel ». */
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.fr', 'ymail.com',
  'hotmail.com', 'hotmail.fr', 'outlook.com', 'outlook.fr', 'live.com',
  'live.fr', 'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com',
  'proton.me', 'protonmail.com', 'gmx.com', 'gmx.fr', 'mail.com',
  'yandex.com', 'zoho.com', 'orange.fr', 'free.fr', 'laposte.net',
  'wanadoo.fr', 'sfr.fr', 'menara.ma',
]);

/**
 * Tranches de budget et points correspondants.
 * Les clés sont les valeurs CANONIQUES de BUDGET_OPTIONS, pas des libellés :
 * le scoring fonctionne donc à l'identique quelle que soit la langue du
 * visiteur.
 */
const BUDGET_POINTS: Record<string, number> = {
  'lt-500': 0,
  '500-1000': 5,
  '1000-3000': 10,
  '3000-5000': 15,
  '5000-plus': 20,
  undecided: 0,
};

/** Services qui signalent une demande d'audit (clés canoniques). */
const AUDIT_SERVICES = [
  'digital-marketing-audit',
  'ai-marketing-audit',
  'marketing-automation-audit',
];

/** Services qui signalent une mission de conseil (clés canoniques). */
const CONSULTING_SERVICES = [
  'ai-automation-consulting',
  'crm-consulting',
  'seo-consulting',
  'digital-marketing-strategy',
  'data-analytics',
];

/**
 * Mots du message libre qui indiquent un vrai projet d'automatisation.
 * Le message est rédigé dans la langue du visiteur : la liste couvre donc le
 * français, l'anglais, l'espagnol et l'arabe, plus les noms d'outils qui sont
 * les mêmes partout.
 */
const AUTOMATION_KEYWORDS = [
  // Noms d'outils et termes techniques, identiques dans toutes les langues
  'zapier', 'make', 'n8n', 'hubspot', 'brevo', 'crm', 'api', 'workflow',
  'pipeline', 'chatbot', 'scoring', 'segmentation', 'lead',
  // Français
  'automat', 'automatis', 'intégration', 'système', 'systeme', 'tunnel',
  'prospection', 'relance', 'agent', 'ia ',
  // Anglais
  'automation', 'integration', 'system', ' ai ', 'nurtur', 'funnel',
  'follow-up', 'onboarding',
  // Espagnol
  'automatiz', 'integración', 'integracion', 'sistema', 'embudo',
  'seguimiento', 'prospección', 'prospeccion',
  // Arabe
  'أتمتة', 'نظام', 'تكامل', 'ذكاء', 'تسويق', 'عملاء',
];

export interface ScoreRule {
  id: string;
  label: string;
  points: number;
  applies: (lead: LeadInput) => boolean;
  /** Les règles à valeur dynamique (ex. le budget) écrasent `points`. */
  value?: (lead: LeadInput) => number;
}

export const SCORE_RULES: ScoreRule[] = [
  {
    id: 'professional_email',
    label: 'Email professionnel',
    points: 10,
    applies: (l) => isProfessionalEmail(l.email),
  },
  {
    id: 'company',
    label: 'Entreprise renseignée',
    points: 10,
    applies: (l) => nonEmpty(l.company),
  },
  {
    id: 'phone',
    label: 'Téléphone / WhatsApp renseigné',
    points: 10,
    applies: (l) => nonEmpty(l.phone),
  },
  {
    id: 'budget',
    label: 'Budget déclaré',
    points: 20,
    applies: (l) => (BUDGET_POINTS[l.budget ?? ''] ?? 0) > 0,
    value: (l) => BUDGET_POINTS[l.budget ?? ''] ?? 0,
  },
  {
    id: 'audit_request',
    label: 'Demande d’audit',
    points: 10,
    applies: (l) => AUDIT_SERVICES.includes(l.service_requested),
  },
  {
    id: 'consulting_request',
    label: 'Demande de conseil',
    points: 15,
    applies: (l) => CONSULTING_SERVICES.includes(l.service_requested),
  },
  {
    id: 'automation_project',
    label: 'Projet d’automatisation décrit dans le message',
    points: 20,
    applies: (l) => hasAutomationIntent(l.message),
  },
  {
    id: 'detailed_message',
    label: 'Message détaillé (120 caractères ou plus)',
    points: 5,
    applies: (l) => (l.message?.trim().length ?? 0) >= 120,
  },
  {
    id: 'job_title',
    label: 'Fonction renseignée',
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

  // Borné, pour qu'un futur changement de règle ne produise jamais un palier absurde.
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
