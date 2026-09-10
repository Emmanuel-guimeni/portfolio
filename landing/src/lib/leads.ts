/**
 * Modèle métier du lead — partagé par le formulaire, l'API, le scoring et le
 * tableau de bord, pour qu'ils ne puissent jamais diverger sur un nom de champ.
 */

export const SERVICE_OPTIONS = [
  'Audit Marketing Digital',
  'Audit Marketing IA',
  'Audit Marketing Automation',
  'Conseil Automatisation IA',
  'Conseil CRM',
  'Conseil SEO',
  'Stratégie Marketing Digital',
  'Data & Analytics',
  'Autre',
] as const;
export type ServiceRequested = (typeof SERVICE_OPTIONS)[number];

export const BUDGET_OPTIONS = [
  'Moins de 500 €',
  '500 € – 1 000 €',
  '1 000 € – 3 000 €',
  '3 000 € – 5 000 €',
  '5 000 € et plus',
  'Pas encore défini',
] as const;
export type Budget = (typeof BUDGET_OPTIONS)[number];

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
