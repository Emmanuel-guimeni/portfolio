import type { Currency } from './currency';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BASE DE DONNÉES TARIFAIRE DES OUTILS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Règles appliquées à chaque ligne (et à toute ligne que vous ajouterez) :
 *
 *  1. Un prix est stocké UNE SEULE FOIS, dans la devise de facturation
 *     officielle de l'éditeur. Les montants USD / EUR / MAD / XAF affichés sont
 *     DÉRIVÉS (voir currency.ts).
 *  2. N'inventez jamais un prix. S'il n'est pas publié → model: 'contact-sales'.
 *  3. Tarif à la consommation → model: 'usage'. Au siège → model: 'per-user'.
 *  4. Une offre gratuite est un vrai prix (0 $) mais ses LIMITES doivent être
 *     indiquées.
 *  5. `source` doit être la page tarifaire de l'éditeur, et `verifiedOn` le jour
 *     de la vérification. `confidence: 'indicative'` marque un montant qui varie
 *     selon la région, le volume de contacts ou la négociation, et qui doit être
 *     revérifié avant d'être communiqué à un client.
 *
 *  Les éditeurs changent souvent leurs prix. Revérifiez avant chaque proposition.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type PricingModel =
  | 'free'
  | 'flat'
  | 'per-user'
  | 'usage'
  | 'contact-sales'
  | 'media-spend';

/** Les 8 postes de coût qui composent le coût total de possession (TCO). */
export type CostType =
  | 'software'
  | 'ai-subscription'
  | 'api'
  | 'automation'
  | 'advertising'
  | 'data'
  | 'implementation'
  | 'maintenance';

export type TierId = 'starter' | 'professional' | 'advanced';

/** Catégories de la stack. Clés stables : les libellés sont dans les dictionnaires. */
export const TOOL_CATEGORIES = [
  'ai',
  'automation',
  'crm',
  'email',
  'social',
  'design',
  'advertising',
  'seo',
  'analytics',
  'infrastructure',
] as const;
export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  model: PricingModel;
  costType: CostType;
  /** Devise de facturation officielle des montants ci-dessous. */
  currency: Currency;
  /** Prix officiel en facturation mensuelle. `null` s'il n'est pas publié. */
  monthly: number | null;
  /** Équivalent mensuel en facturation annuelle. `null` s'il n'y a pas d'offre annuelle. */
  annualMonthly: number | null;
  tiers: TierId[];
  source: string;
  verifiedOn: string;
  confidence: 'verified' | 'indicative';
}

const V = '2026-09-09';

export const TOOLS: Tool[] = [
  /* ── AI subscriptions ──────────────────────────────────────────────────── */
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'ai',
    model: 'flat',
    costType: 'ai-subscription',
    currency: 'USD',
    monthly: 20,
    annualMonthly: null,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://openai.com/chatgpt/pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'chatgpt-business',
    name: 'ChatGPT Business',
    category: 'ai',
    model: 'per-user',
    costType: 'ai-subscription',
    currency: 'USD',
    monthly: 30,
    annualMonthly: 25,
    tiers: ['advanced'],
    source: 'https://openai.com/business/chatgpt-pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    category: 'ai',
    model: 'flat',
    costType: 'ai-subscription',
    currency: 'USD',
    monthly: 20,
    annualMonthly: 16.67,
    tiers: ['professional', 'advanced'],
    source: 'https://claude.com/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'claude-team',
    name: 'Claude Team',
    category: 'ai',
    model: 'per-user',
    costType: 'ai-subscription',
    currency: 'USD',
    monthly: 25,
    annualMonthly: 20,
    tiers: ['advanced'],
    source: 'https://claude.com/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'google-ai-pro',
    name: 'Google AI Pro (Gemini)',
    category: 'ai',
    model: 'flat',
    costType: 'ai-subscription',
    currency: 'USD',
    monthly: 19.99,
    annualMonthly: null,
    tiers: ['professional', 'advanced'],
    source: 'https://gemini.google/subscriptions/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'llm-api',
    name: 'LLM APIs (OpenAI / Anthropic / Gemini)',
    category: 'ai',
    model: 'usage',
    costType: 'api',
    currency: 'USD',
    monthly: null,
    annualMonthly: null,
    tiers: ['professional', 'advanced'],
    source: 'https://platform.openai.com/docs/pricing',
    verifiedOn: V,
    confidence: 'indicative',
  },

  /* ── Automation ────────────────────────────────────────────────────────── */
  {
    id: 'make-free',
    name: 'Make',
    category: 'automation',
    model: 'free',
    costType: 'automation',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter'],
    source: 'https://www.make.com/en/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'make-core',
    name: 'Make',
    category: 'automation',
    model: 'usage',
    costType: 'automation',
    currency: 'USD',
    monthly: 12,
    annualMonthly: 10.59,
    tiers: ['professional'],
    source: 'https://www.make.com/en/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'make-pro',
    name: 'Make',
    category: 'automation',
    model: 'usage',
    costType: 'automation',
    currency: 'USD',
    monthly: 21,
    annualMonthly: 18.82,
    tiers: ['advanced'],
    source: 'https://www.make.com/en/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'zapier-team',
    name: 'Zapier',
    category: 'automation',
    model: 'usage',
    costType: 'automation',
    currency: 'USD',
    monthly: null,
    annualMonthly: 69,
    tiers: ['advanced'],
    source: 'https://zapier.com/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'n8n-self',
    name: 'n8n (self-hosted)',
    category: 'automation',
    model: 'free',
    costType: 'automation',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['professional', 'advanced'],
    source: 'https://n8n.io/pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'n8n-cloud',
    name: 'n8n Cloud',
    category: 'automation',
    model: 'usage',
    costType: 'automation',
    currency: 'USD',
    monthly: null,
    annualMonthly: null,
    tiers: ['advanced'],
    source: 'https://n8n.io/pricing/',
    verifiedOn: V,
    confidence: 'indicative',
  },

  /* ── CRM ───────────────────────────────────────────────────────────────── */
  {
    id: 'hubspot-free',
    name: 'HubSpot CRM',
    category: 'crm',
    model: 'free',
    costType: 'software',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter'],
    source: 'https://www.hubspot.com/pricing/marketing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'hubspot-starter',
    name: 'HubSpot Marketing Hub',
    category: 'crm',
    model: 'per-user',
    costType: 'software',
    currency: 'USD',
    monthly: 20,
    annualMonthly: 15,
    tiers: ['professional'],
    source: 'https://www.hubspot.com/pricing/marketing',
    verifiedOn: V,
    confidence: 'indicative',
  },
  {
    id: 'hubspot-pro',
    name: 'HubSpot Marketing Hub',
    category: 'crm',
    model: 'flat',
    costType: 'software',
    currency: 'USD',
    monthly: 890,
    annualMonthly: 800,
    tiers: ['advanced'],
    source: 'https://www.hubspot.com/pricing/marketing',
    verifiedOn: V,
    confidence: 'indicative',
  },

  /* ── Email ─────────────────────────────────────────────────────────────── */
  {
    id: 'brevo-free',
    name: 'Brevo',
    category: 'email',
    model: 'free',
    costType: 'software',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter'],
    source: 'https://www.brevo.com/pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'brevo-starter',
    name: 'Brevo',
    category: 'email',
    model: 'usage',
    costType: 'software',
    currency: 'USD',
    monthly: 9,
    annualMonthly: null,
    tiers: ['starter', 'professional'],
    source: 'https://www.brevo.com/pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'brevo-business',
    name: 'Brevo',
    category: 'email',
    model: 'usage',
    costType: 'software',
    currency: 'USD',
    monthly: 18,
    annualMonthly: null,
    tiers: ['professional', 'advanced'],
    source: 'https://www.brevo.com/pricing/',
    verifiedOn: V,
    confidence: 'indicative',
  },
  {
    id: 'mailchimp-essentials',
    name: 'Mailchimp',
    category: 'email',
    model: 'usage',
    costType: 'software',
    currency: 'USD',
    monthly: 13,
    annualMonthly: null,
    tiers: ['starter'],
    source: 'https://mailchimp.com/pricing/marketing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'mailchimp-standard',
    name: 'Mailchimp',
    category: 'email',
    model: 'usage',
    costType: 'software',
    currency: 'USD',
    monthly: 20,
    annualMonthly: null,
    tiers: ['professional'],
    source: 'https://mailchimp.com/pricing/marketing/',
    verifiedOn: V,
    confidence: 'verified',
  },

  /* ── Social media ──────────────────────────────────────────────────────── */
  {
    id: 'meta-business-suite',
    name: 'Meta Business Suite',
    category: 'social',
    model: 'free',
    costType: 'software',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://business.facebook.com/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'metricool-free',
    name: 'Metricool',
    category: 'social',
    model: 'free',
    costType: 'software',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter'],
    source: 'https://metricool.com/pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'metricool-starter',
    name: 'Metricool',
    category: 'social',
    model: 'flat',
    costType: 'software',
    currency: 'USD',
    monthly: 25,
    annualMonthly: 20,
    tiers: ['professional'],
    source: 'https://metricool.com/pricing/',
    verifiedOn: V,
    confidence: 'indicative',
  },
  {
    id: 'metricool-advanced',
    name: 'Metricool',
    category: 'social',
    model: 'flat',
    costType: 'software',
    currency: 'USD',
    monthly: 67,
    annualMonthly: 53,
    tiers: ['advanced'],
    source: 'https://metricool.com/pricing/',
    verifiedOn: V,
    confidence: 'indicative',
  },

  /* ── Design & creative ─────────────────────────────────────────────────── */
  {
    id: 'canva-free',
    name: 'Canva',
    category: 'design',
    model: 'free',
    costType: 'software',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter'],
    source: 'https://www.canva.com/pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'canva-business',
    name: 'Canva Business',
    category: 'design',
    model: 'per-user',
    costType: 'software',
    currency: 'USD',
    monthly: 20,
    annualMonthly: null,
    tiers: ['professional', 'advanced'],
    source: 'https://www.canva.com/pricing/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'design',
    model: 'free',
    costType: 'software',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://www.capcut.com/',
    verifiedOn: V,
    confidence: 'indicative',
  },

  /* ── Advertising ───────────────────────────────────────────────────────── */
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    category: 'advertising',
    model: 'media-spend',
    costType: 'advertising',
    currency: 'USD',
    monthly: null,
    annualMonthly: null,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://www.facebook.com/business/ads',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'advertising',
    model: 'media-spend',
    costType: 'advertising',
    currency: 'USD',
    monthly: null,
    annualMonthly: null,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://ads.google.com/',
    verifiedOn: V,
    confidence: 'verified',
  },

  /* ── SEO ───────────────────────────────────────────────────────────────── */
  {
    id: 'gsc',
    name: 'Google Search Console',
    category: 'seo',
    model: 'free',
    costType: 'data',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://search.google.com/search-console/about',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'semrush-pro',
    name: 'Semrush',
    category: 'seo',
    model: 'flat',
    costType: 'software',
    currency: 'USD',
    monthly: 139,
    annualMonthly: 117.33,
    tiers: ['professional'],
    source: 'https://www.semrush.com/pricing/seo/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'semrush-guru',
    name: 'Semrush',
    category: 'seo',
    model: 'flat',
    costType: 'software',
    currency: 'USD',
    monthly: 249.95,
    annualMonthly: 248.17,
    tiers: ['advanced'],
    source: 'https://www.semrush.com/pricing/seo/',
    verifiedOn: V,
    confidence: 'verified',
  },

  /* ── Analytics & data ──────────────────────────────────────────────────── */
  {
    id: 'ga4',
    name: 'Google Analytics 4',
    category: 'analytics',
    model: 'free',
    costType: 'data',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://marketingplatform.google.com/about/analytics/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'looker-studio',
    name: 'Looker Studio',
    category: 'analytics',
    model: 'free',
    costType: 'data',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://lookerstudio.google.com/',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'power-bi-pro',
    name: 'Power BI Pro',
    category: 'analytics',
    model: 'per-user',
    costType: 'data',
    currency: 'USD',
    monthly: 14,
    annualMonthly: null,
    tiers: ['advanced'],
    source: 'https://www.microsoft.com/en-us/power-platform/products/power-bi/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },
  {
    id: 'sheets',
    name: 'Google Sheets / Excel',
    category: 'analytics',
    model: 'free',
    costType: 'data',
    currency: 'USD',
    monthly: 0,
    annualMonthly: 0,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://workspace.google.com/pricing',
    verifiedOn: V,
    confidence: 'verified',
  },

  /* ── Infrastructure for this very site ─────────────────────────────────── */
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'infrastructure',
    model: 'usage',
    costType: 'software',
    currency: 'USD',
    monthly: 25,
    annualMonthly: null,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://supabase.com/pricing',
    verifiedOn: V,
    confidence: 'indicative',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'infrastructure',
    model: 'usage',
    costType: 'software',
    currency: 'USD',
    monthly: 20,
    annualMonthly: null,
    tiers: ['starter', 'professional', 'advanced'],
    source: 'https://vercel.com/pricing',
    verifiedOn: V,
    confidence: 'indicative',
  },
];

/** Les 8 postes du TCO, dans l'ordre de présentation. Libellés dans les dictionnaires. */
export const COST_TYPE_ORDER: CostType[] = [
  'software',
  'ai-subscription',
  'api',
  'automation',
  'advertising',
  'data',
  'implementation',
  'maintenance',
];

/** Recouvrement entre outils. Score plus élevé = plus facilement remplaçable.
 *  Les libellés sont dans les dictionnaires (i18n), seul le score vit ici. */
export const REDUNDANCY: { id: string; score: number }[] = [
  { id: 'email', score: 90 },
  { id: 'automation', score: 85 },
  { id: 'hubspot', score: 70 },
  { id: 'social', score: 55 },
  { id: 'ai', score: 45 },
  { id: 'bi', score: 60 },
];
