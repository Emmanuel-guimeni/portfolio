import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  type LeadInput,
} from './leads';

/**
 * Server-side validation + sanitisation.
 *
 * The browser also validates (see LeadForm), but browser validation is a UX
 * feature, not a security control. Nothing reaches the database that has not
 * passed through this file.
 */

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
  data?: LeadInput;
}

const MAX = {
  name: 80,
  email: 254,
  phone: 32,
  country: 64,
  company: 120,
  jobTitle: 120,
  message: 4000,
  utm: 160,
  url: 500,
} as const;

/** Reasonable, deliberately permissive email shape check. */
const EMAIL_RE = /^[^\s@,;:<>()[\]\\]+@[^\s@.]+(\.[^\s@.]+)+$/;
/** Digits, spaces and the usual separators; 6–25 characters. */
const PHONE_RE = /^\+?[\d\s().-]{6,25}$/;
/** ASCII control characters — stripped from every stored value. */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

/**
 * Strip control characters and collapse whitespace. Values are stored as plain
 * text and rendered by React (which escapes by default), and every database
 * write is a parameterised PostgREST call — so this is defence in depth, not
 * the only thing standing between the form and an injection.
 */
export function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(CONTROL_CHARS, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

/** Multi-line variant — preserves paragraph breaks in the message field. */
export function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(CONTROL_CHARS, (c) => (c === '\n' ? c : ''))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

export function validateLead(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const raw = (body ?? {}) as Record<string, unknown>;

  const first_name = clean(raw.first_name, MAX.name);
  const last_name = clean(raw.last_name, MAX.name);
  const email = clean(raw.email, MAX.email).toLowerCase();
  const phone = clean(raw.phone, MAX.phone);
  const country = clean(raw.country, MAX.country);
  const company = clean(raw.company, MAX.company);
  const job_title = clean(raw.job_title, MAX.jobTitle);
  const service_requested = clean(raw.service_requested, 80);
  const budget = clean(raw.budget, 40);
  const message = cleanMultiline(raw.message, MAX.message);
  const consent =
    raw.consent === true || raw.consent === 'true' || raw.consent === 'on';

  if (first_name.length < 2) errors.first_name = 'Merci d’indiquer votre prénom.';
  if (last_name.length < 2) errors.last_name = 'Merci d’indiquer votre nom.';
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Merci d’indiquer une adresse email professionnelle valide.';
  }
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = 'Merci d’indiquer un numéro de téléphone valide.';
  }
  if (!(SERVICE_OPTIONS as readonly string[]).includes(service_requested)) {
    errors.service_requested = 'Merci de sélectionner ce que vous recherchez.';
  }
  if (budget && !(BUDGET_OPTIONS as readonly string[]).includes(budget)) {
    errors.budget = 'Merci de sélectionner une tranche de budget valide.';
  }
  if (message && message.length < 10) {
    errors.message = 'Merci de préciser un peu plus (10 caractères minimum).';
  }
  if (!consent) {
    errors.consent =
      'Votre consentement est requis avant que je puisse enregistrer et utiliser vos informations.';
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: {},
    data: {
      first_name,
      last_name,
      email,
      phone: phone || undefined,
      country: country || undefined,
      company: company || undefined,
      job_title: job_title || undefined,
      service_requested,
      budget: budget || undefined,
      message: message || undefined,
      source: clean(raw.source, 80) || 'website',
      utm_source: clean(raw.utm_source, MAX.utm) || undefined,
      utm_medium: clean(raw.utm_medium, MAX.utm) || undefined,
      utm_campaign: clean(raw.utm_campaign, MAX.utm) || undefined,
      landing_page: clean(raw.landing_page, MAX.url) || undefined,
      consent: true,
    },
  };
}
