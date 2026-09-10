/**
 * The lead domain model — shared by the form, the API, the scorer and the
 * admin dashboard so the three can never disagree about a field name.
 */

export const SERVICE_OPTIONS = [
  'Digital Marketing Audit',
  'AI Marketing Audit',
  'Marketing Automation Audit',
  'AI Automation Consulting',
  'CRM Consulting',
  'SEO Consulting',
  'Digital Marketing Strategy',
  'Data & Analytics',
  'Other',
] as const;
export type ServiceRequested = (typeof SERVICE_OPTIONS)[number];

export const BUDGET_OPTIONS = [
  'Less than €500',
  '€500–€1,000',
  '€1,000–€3,000',
  '€3,000–€5,000',
  '€5,000+',
  'Not defined yet',
] as const;
export type Budget = (typeof BUDGET_OPTIONS)[number];

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

export type LeadTemperature = 'Cold' | 'Warm' | 'Hot';

/** Shape of a row in the `leads` table. Mirrors database/schema.sql exactly. */
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

/** What the public form is allowed to send. Nothing else is accepted. */
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
  if (score >= 61) return 'Hot';
  if (score >= 31) return 'Warm';
  return 'Cold';
}

export function fullName(lead: Pick<Lead, 'first_name' | 'last_name'>): string {
  return `${lead.first_name} ${lead.last_name}`.trim();
}
