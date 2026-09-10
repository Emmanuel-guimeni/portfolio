/**
 * Modèle métier du lead — partagé par le formulaire, l'API, le scoring et le
 * tableau de bord, pour qu'ils ne puissent jamais diverger sur un nom de champ.
 *
 * ⚠️ Les valeurs de ce fichier sont enregistrées en base. Elles sont donc
 * CANONIQUES et indépendantes de la langue : un visiteur arabophone et un
 * visiteur francophone qui demandent le même service enregistrent la même clé.
 * Les libellés affichés vivent dans les dictionnaires (src/i18n).
 */

export const SERVICE_OPTIONS = [
  'digital-marketing-audit',
  'ai-marketing-audit',
  'marketing-automation-audit',
  'ai-automation-consulting',
  'crm-consulting',
  'seo-consulting',
  'digital-marketing-strategy',
  'data-analytics',
  'other',
] as const;
export type ServiceRequested = (typeof SERVICE_OPTIONS)[number];

export const BUDGET_OPTIONS = [
  'lt-500',
  '500-1000',
  '1000-3000',
  '3000-5000',
  '5000-plus',
  'undecided',
] as const;
export type Budget = (typeof BUDGET_OPTIONS)[number];

/** Codes pays ISO 3166-1 alpha-2 proposés dans le formulaire. */
export const COUNTRY_CODES = [
  'MA', 'CM', 'CG', 'GA', 'TD', 'CF', 'GQ', 'CI', 'SN',
  'FR', 'BE', 'CH', 'CA', 'US', 'GB', 'OTHER',
] as const;

/**
 * Statuts du pipeline. Ces valeurs sont stockées en base (type ENUM
 * `lead_status` dans database/schema.sql) : elles restent donc en anglais pour
 * ne pas casser le schéma. L'interface affiche STATUS_LABELS à la place.
 */
export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Meeting',
  'Proposal',
  'Won',
  'Lost',
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Libellés français des statuts, pour le tableau de bord. */
export const STATUS_LABELS: Record<LeadStatus, string> = {
  New: 'Nouveau',
  Contacted: 'Contacté',
  Qualified: 'Qualifié',
  Meeting: 'Rendez-vous',
  Proposal: 'Proposition',
  Won: 'Gagné',
  Lost: 'Perdu',
};

/** Libellés français des services, pour le tableau de bord et les emails. */
export const SERVICE_LABELS: Record<ServiceRequested, string> = {
  'digital-marketing-audit': 'Audit Marketing Digital',
  'ai-marketing-audit': 'Audit Marketing IA',
  'marketing-automation-audit': 'Audit Marketing Automation',
  'ai-automation-consulting': 'Conseil Automatisation IA',
  'crm-consulting': 'Conseil CRM',
  'seo-consulting': 'Conseil SEO',
  'digital-marketing-strategy': 'Stratégie Marketing Digital',
  'data-analytics': 'Data & Analytics',
  other: 'Autre',
};

/** Libellés français des tranches de budget. */
export const BUDGET_LABELS: Record<Budget, string> = {
  'lt-500': 'Moins de 500 €',
  '500-1000': '500 € – 1 000 €',
  '1000-3000': '1 000 € – 3 000 €',
  '3000-5000': '3 000 € – 5 000 €',
  '5000-plus': '5 000 € et plus',
  undecided: 'Pas encore défini',
};

/** Traduit une clé stockée en libellé lisible ; renvoie la clé si inconnue. */
export function serviceLabel(value: string | null | undefined): string {
  return SERVICE_LABELS[value as ServiceRequested] ?? value ?? '—';
}

export function budgetLabel(value: string | null | undefined): string {
  return BUDGET_LABELS[value as Budget] ?? value ?? '—';
}

export type LeadTemperature = 'Froid' | 'Tiède' | 'Chaud';

/** Structure d'une ligne de la table `leads`. Miroir exact de schema.sql. */
export interface Lead {
  id: string;
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
  source: string | null;
  status: LeadStatus;
  lead_score: number;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  landing_page: string | null;
  consent: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/** Ce que le formulaire public a le droit d'envoyer. Rien d'autre n'est accepté. */
export interface LeadInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country?: string;
  company?: string;
  job_title?: string;
  service_requested: string;
  budget?: string;
  message?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page?: string;
  consent: boolean;
}

export function temperature(score: number): LeadTemperature {
  if (score >= 61) return 'Chaud';
  if (score >= 31) return 'Tiède';
  return 'Froid';
}

/** Classe CSS associée à une température (score--hot / warm / cold). */
export function temperatureClass(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 61) return 'hot';
  if (score >= 31) return 'warm';
  return 'cold';
}

export function fullName(lead: Pick<Lead, 'first_name' | 'last_name'>): string {
  return `${lead.first_name} ${lead.last_name}`.trim();
}
