import type { CostType, TierId, ToolCategory } from '@/config/tools';

/**
 * Contrat de traduction.
 *
 * `Dictionary` décrit tout ce qui est visible par un visiteur. Chaque langue
 * doit fournir cet objet en entier : TypeScript refuse de compiler si une clé
 * manque, ce qui rend une traduction partielle impossible à livrer par erreur.
 */

export interface ToolCopy {
  functionality: string;
  plan: string;
  users: string;
  limits: string;
  variableCost?: string;
  apiCost?: string;
  extraCost?: string;
  note?: string;
}

export interface FlowStepCopy {
  label: string;
  detail?: string;
  kind?: 'ai' | 'human' | 'out';
}

export interface WorkflowCopy {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: FlowStepCopy[];
  bullets?: string[];
  tools?: string[];
  note?: string;
}

export interface AgentCopy {
  num: string;
  name: string;
  role: string;
  summary: string;
  capabilities: string[];
}

export interface ServiceCopy {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  /** Clé canonique : doit correspondre à un `value` de form.serviceOptions. */
  formValue: string;
  icon: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    /** Nom de la langue pour les données structurées Schema.org. */
    schemaLanguage: string;
  };

  site: {
    role: string;
    roleShort: string;
    degree: string;
    positioning: string;
    manifesto: string;
    signature: string[];
    philosophy: string;
    locationLabel: string;
  };

  nav: {
    items: { label: string; href: string }[];
    cta: string;
    home: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    languageLabel: string;
  };

  hero: {
    available: string;
    headlineLead: string;
    headlineAccent: string;
    value: string;
    ctaAudit: string;
    ctaConsult: string;
    ctaExplore: string;
    tags: string[];
    floatAgents: string;
    floatHuman: string;
    statsLabel: string;
    stats: { value: string; label: string; sub: string }[];
  };

  problem: {
    eyebrow: string;
    titleLead: string;
    titleTail: string;
    titleAccent: string;
    intro: string;
    items: string[];
    from: string;
    to: string;
  };

  solution: {
    eyebrow: string;
    titleParts: string[];
    intro: string;
    sideTitle: string;
    sideBody: string;
    chainTitle: string;
    chainIntro: string;
    chain: { label: string; detail: string }[];
    diagram: {
      inputs: string[];
      outputs: string[];
      core: string;
      coreSub: string;
      loop: string;
      alt: string;
    };
  };

  agents: {
    eyebrow: string;
    title: string;
    intro: string;
    list: AgentCopy[];
    human: AgentCopy;
  };

  flowLegend: { ai: string; human: string; out: string };

  workflows: WorkflowCopy[];

  data: {
    eyebrow: string;
    title: string;
    intro: string;
    sourcesLabel: string;
    pipelineLabel: string;
    sources: string[];
    pipeline: FlowStepCopy[];
    tools: { name: string; note: string }[];
  };

  stack: {
    eyebrow: string;
    title: string;
    intro: string;
    toolsUsed: string;
    categories: Record<ToolCategory, string>;
  };

  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    currencyGroup: string;
    billingGroup: string;
    monthly: string;
    annual: string;
    fxTitle: string;
    fxBase: string;
    fxUpdated: string;
    fxEdit: string;
    fxHide: string;
    fxRateLabel: string;
    fxNote: string[];
    fxSourceLink: string;
    mostCommon: string;
    perMonth: string;
    billedAnnually: string;
    saving: string;
    noAnnualDiscount: string;
    atMonthlyRate: string;
    extraUsageLines: string;
    monthlyCost: string;
    annualCost: string;
    notIncluded: string;
    buildThisStack: string;
    tcoTitle: string;
    tcoIntro: string;
    referenceStack: string;
    tcoApi: string;
    tcoMedia: string;
    tcoImplementation: string;
    tcoMaintenance: string;
    tcoSoftware: string;
    tcoApiRow: string;
    tcoMediaRow: string;
    tcoImplementationRow: string;
    tcoMaintenanceRow: string;
    tcoTotalMonthly: string;
    tcoTotalYearOne: string;
    bloatBanner: string;
    bloatIntro: string;
    overlap: string;
    tableTitle: string;
    tableIntro: string;
    tableCaption: string;
    tableFootnote: string;
    columns: {
      tool: string;
      category: string;
      plan: string;
      model: string;
      monthly: string;
      annualPerMonth: string;
      annualTotal: string;
      savingPerYear: string;
      users: string;
      limits: string;
      verified: string;
    };
    officialPricing: string;
    verifyBadge: string;
    notPublished: string;
    models: Record<
      'free' | 'flat' | 'per-user' | 'usage' | 'contact-sales' | 'media-spend',
      string
    >;
    costTypes: Record<CostType, { label: string; description: string }>;
    redundancy: Record<string, { group: string; overlap: string; verdict: string }>;
    stacks: Record<
      TierId,
      {
        name: string;
        tagline: string;
        audience: string[];
        implementationNote: string;
        mediaBudgetNote: string;
      }
    >;
    currencyNames: Record<'USD' | 'EUR' | 'MAD' | 'XAF', string>;
    fxSource: string;
    fxPegNote: string;
  };

  services: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    list: ServiceCopy[];
  };

  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { step: string; title: string; body: string }[];
  };

  principles: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };

  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    emailMe: string;
    callMe: string;
    whatsapp: string;
    whatsappSub: string;
    locationSub: string;
    afterTitle: string;
    afterSteps: string[];
  };

  form: {
    firstName: string;
    lastName: string;
    email: string;
    emailHint: string;
    phone: string;
    country: string;
    countryPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    jobTitle: string;
    jobTitlePlaceholder: string;
    service: string;
    servicePlaceholder: string;
    budget: string;
    budgetPlaceholder: string;
    message: string;
    messageHint: string;
    messagePlaceholder: string;
    consent: string;
    privacyLink: string;
    submit: string;
    submitting: string;
    footnote: string;
    required: string;
    honeypot: string;
    captchaLabel: string;
    successTitle: string;
    successBody: string;
    duplicateBody: string;
    sendAnother: string;
    errorTitle: string;
    errors: {
      firstName: string;
      lastName: string;
      email: string;
      service: string;
      consent: string;
      generic: string;
      network: string;
    };
    /**
     * `value` est la clé canonique enregistrée en base (identique dans toutes
     * les langues, c'est elle que lit le scoring) ; `label` est ce que voit le
     * visiteur. Ne traduisez jamais un `value`.
     */
    serviceOptions: { value: string; label: string }[];
    budgetOptions: { value: string; label: string }[];
    countries: { value: string; label: string }[];
  };

  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };

  cta: {
    title: string;
    body: string;
    audit: string;
    consult: string;
  };

  footer: {
    navigate: string;
    legal: string;
    contact: string;
    dashboard: string;
    rights: string;
    links: { label: string; href: string }[];
  };

  legal: {
    backToSite: string;
    updated: string;
    privacy: { title: string; description: string; sections: LegalSection[] };
    terms: { title: string; description: string; sections: LegalSection[] };
  };

  tools: Record<string, ToolCopy>;
}
