import type { Dictionary } from '../types';
import { toolsEn } from './tools.en';

/**
 * ENGLISH.
 *
 * Mirrors fr.ts key for key — TypeScript will not compile if one is missing.
 * In the legal sections, {email}, {phone} and {location} are replaced at render
 * time with the real contact details from config/site.ts.
 */
export const en: Dictionary = {
  meta: {
    title: 'Mr GUEHEDI Emmanuel — Digital Marketing & AI Automation Specialist',
    description:
      'Digital Marketing & AI Automation Specialist in Casablanca. I design intelligent marketing systems connecting AI, automation, CRM, data and growth.',
    keywords: [
      'digital marketing consultant',
      'AI marketing automation',
      'marketing automation consultant',
      'AI automation specialist',
      'digital marketing and AI automation',
      'marketing automation Morocco',
      'digital marketing consultant Casablanca',
      'CRM automation',
      'lead generation system',
      'AI marketing agents',
    ],
    schemaLanguage: 'en',
  },

  site: {
    role: 'Digital Marketing & AI Automation Specialist',
    roleShort: 'Digital Marketing & AI Automation',
    degree: 'MSc in Digital Marketing & E-commerce',
    positioning:
      'Digital Marketing • Artificial Intelligence • Marketing Automation • Data • Growth',
    manifesto:
      "I don't just use AI tools. I design intelligent marketing systems that connect AI, automation, data and growth.",
    signature: [
      'Automate the repetitive.',
      'Augment the strategic.',
      'Humanize the critical decisions.',
    ],
    philosophy:
      'The future of marketing is not more tools. It is better-connected systems.',
    locationLabel: 'Casablanca – Morocco',
  },

  nav: {
    items: [
      { label: 'System', href: '#system' },
      { label: 'AI Agents', href: '#agents' },
      { label: 'Automation', href: '#automation' },
      { label: 'Stack', href: '#stack' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Services', href: '#services' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: 'Request an Audit',
    home: 'home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to main content',
    languageLabel: 'Change language',
  },

  hero: {
    available: 'Available for new projects',
    headlineLead: 'Transform Digital Marketing Into an',
    headlineAccent: 'Intelligent Automated System',
    value:
      'I connect marketing strategy, artificial intelligence, automation, CRM, acquisition, content and data into one system — so the repetitive work runs itself, the strategic work gets sharper, and every decision is backed by numbers you can actually trust.',
    ctaAudit: 'Request an Audit',
    ctaConsult: 'Book a Consultation',
    ctaExplore: 'Explore the System',
    tags: ['MSc in Digital Marketing & E-commerce', '7 AI marketing agents', 'Automation · CRM · Data'],
    floatAgents: 'AI agents',
    floatHuman: 'human decisions',
    statsLabel: 'Key figures',
    stats: [
      { value: '7', label: 'AI marketing agents', sub: 'designed & orchestrated' },
      { value: '9', label: 'Automated workflows', sub: 'content → CRM → data' },
      { value: '20+', label: 'Tools benchmarked', sub: 'with real public pricing' },
      { value: '4', label: 'Currencies', sub: 'USD · EUR · MAD · XAF' },
    ],
  },

  problem: {
    eyebrow: 'The problem',
    titleLead: 'Most marketing teams are not short of tools.',
    titleTail: 'They are short of a',
    titleAccent: 'system',
    intro:
      'Every one of these is a symptom of the same root cause: tools bought one at a time, never designed to work as a whole.',
    items: [
      'Too many repetitive tasks',
      'Time lost on work a machine could do',
      'Content produced entirely by hand',
      'Leads that are never properly followed up',
      'A CRM nobody really uses',
      'Data scattered across a dozen tools',
      'Manual, painful reporting',
      'Campaigns that are hard to optimise',
      'No automation anywhere in the funnel',
      'Tools that do not talk to each other',
      'No visibility on what the ROI actually is',
    ],
    from: 'From fragmented marketing',
    to: 'to intelligent marketing systems',
  },

  solution: {
    eyebrow: 'The approach',
    titleParts: ['AI', 'Marketing', 'Automation', 'Data'],
    intro:
      "I don't just use AI tools. I design intelligent marketing systems that connect AI, automation, data and growth.",
    sideTitle: 'One system, four disciplines, zero copy-paste',
    sideBody:
      'Strategy sets the direction. AI produces the volume. Automation moves the data between tools. Analytics closes the loop and tells you what to change next — then the whole thing runs again.',
    chainTitle: 'The full value chain',
    chainIntro:
      'Thirteen steps from a stranger to an optimised system. Every step below is instrumented, automated where it should be, and reviewed by a human where it must be.',
    chain: [
      { label: 'Visitor', detail: 'Someone lands from search, social, ads or a referral.' },
      { label: 'Content', detail: 'The asset that earns attention and answers a real intent.' },
      { label: 'Traffic', detail: 'Qualified sessions routed to the right destination.' },
      { label: 'Landing page', detail: 'One promise, one offer, one action.' },
      { label: 'Lead', detail: 'Form submitted, consent captured, data validated.' },
      { label: 'CRM', detail: 'The record is created automatically, never re-typed.' },
      { label: 'Lead scoring', detail: 'A score computed from real signals, not intuition.' },
      { label: 'Nurturing', detail: 'Sequenced content that matches the score and the segment.' },
      { label: 'Sales', detail: 'A human conversation, at the moment it is worth having.' },
      { label: 'Customer', detail: 'The deal closes and the record follows through.' },
      { label: 'Data', detail: 'Every step above leaves a measurable trace.' },
      { label: 'AI analysis', detail: 'Patterns, anomalies and drop-offs surfaced automatically.' },
      { label: 'Optimisation', detail: 'The next iteration is decided by evidence. Then it loops.' },
    ],
    diagram: {
      inputs: ['Strategy', 'Content', 'Traffic', 'Data'],
      outputs: ['Leads', 'CRM', 'Nurturing', 'Insights'],
      core: 'AI',
      coreSub: 'ORCHESTRATION',
      loop: 'MEASURE → LEARN → OPTIMISE',
      alt: 'Diagram: strategy, content, traffic and data feed an AI orchestration core, which produces leads, CRM records, nurturing sequences and insights.',
    },
  },

  agents: {
    eyebrow: 'The 7 AI marketing agents',
    title: 'Seven specialists, one orchestrated team',
    intro:
      'Not seven subscriptions — seven roles. Each one has a defined scope, defined inputs, defined outputs, and a defined moment where a human takes over.',
    list: [
      {
        num: '01',
        name: 'AI Marketing Strategist',
        role: 'Direction & positioning',
        summary:
          'Turns market signals into a defensible position and a marketing plan someone can actually execute.',
        capabilities: ['Strategy', 'Personas', 'Positioning', 'Market analysis', 'Marketing plan', 'Recommendations'],
      },
      {
        num: '02',
        name: 'AI Content Manager',
        role: 'Editorial engine',
        summary:
          'Keeps the content pipeline full: ideas, angles, copy, calendar, and second lives for what already worked.',
        capabilities: ['Ideas', 'Copywriting', 'Scripts', 'Editorial calendar', 'Newsletters', 'Repurposing'],
      },
      {
        num: '03',
        name: 'AI Creative Director',
        role: 'Concept & art direction',
        summary:
          'Holds the visual line across every campaign so the brand looks like one company, not ten freelancers.',
        capabilities: ['Creative concepts', 'Visuals', 'Video', 'Campaigns', 'Art direction'],
      },
      {
        num: '04',
        name: 'AI Performance Manager',
        role: 'Paid acquisition',
        summary:
          'Builds, reads and tunes paid campaigns — audiences, creatives, budget, and the decision to cut what is not working.',
        capabilities: ['Meta Ads', 'Google Ads', 'Audiences', 'Campaigns', 'Performance analysis', 'Optimisation'],
      },
      {
        num: '05',
        name: 'AI CRM Manager',
        role: 'Pipeline & nurturing',
        summary:
          'Makes sure no lead goes cold: segmentation, scoring, sequences, and a clean handover to sales.',
        capabilities: ['Segmentation', 'Lead scoring', 'Nurturing', 'CRM hygiene', 'Sales automation'],
      },
      {
        num: '06',
        name: 'AI SEO Manager',
        role: 'Organic visibility',
        summary:
          'Works the long game: intent, briefs, on-page fixes and the monitoring loop that catches decay early.',
        capabilities: ['Keyword research', 'SEO analysis', 'Content briefs', 'On-page optimisation', 'Search Console', 'Monitoring'],
      },
      {
        num: '07',
        name: 'AI Marketing Analyst',
        role: 'Measurement & decisions',
        summary:
          'Closes the loop. Turns GA4, CRM and ad data into a small number of decisions worth making this week.',
        capabilities: ['GA4', 'Dashboards', 'KPIs', 'Attribution', 'Analysis', 'Recommendations'],
      },
    ],
    human: {
      num: '00',
      name: 'The human',
      role: 'Owner of every decision that matters',
      summary:
        'The agents propose. A person decides. Brand, budget, pricing, client relationships and anything with legal or reputational weight never leave human hands — that is a design rule, not a limitation.',
      capabilities: ['Brand judgement', 'Budget approval', 'Client relationships', 'Final say'],
    },
  },

  flowLegend: {
    ai: 'AI does the work',
    human: 'Human decision',
    out: 'Output & data',
  },

  workflows: [
    {
      id: 'content-factory',
      eyebrow: 'Content Factory',
      title: 'From one idea to a month of content',
      intro:
        'Content stops being a weekly emergency when the pipeline itself is a system. AI does the volume; you keep the judgement.',
      steps: [
        { label: 'Idea', detail: 'Trends, search intent, customer questions', kind: 'ai' },
        { label: 'AI', detail: 'Angles, outline, editorial calendar', kind: 'ai' },
        { label: 'Copy', detail: 'Drafts adapted per platform', kind: 'ai' },
        { label: 'Design', detail: 'Visuals and video from templates' },
        { label: 'Validation', detail: 'You approve tone, claims, brand', kind: 'human' },
        { label: 'Scheduling', detail: 'Queued at the right slot' },
        { label: 'Publication', detail: 'Pushed to every network' },
        { label: 'Analytics', detail: 'Reach, engagement, conversions', kind: 'out' },
        { label: 'Repurposing', detail: 'Winners become new formats', kind: 'out' },
      ],
      bullets: [
        'Idea research and trend monitoring',
        'Editorial calendar generation',
        'Copywriting and per-platform adaptation',
        'Creative briefs and video scripts',
        'Content variants for A/B testing',
        'Scheduling, publishing and performance analysis',
        'Automatic recycling of the best-performing content',
      ],
    },
    {
      id: 'social-automation',
      eyebrow: 'Social Media Automation',
      title: 'Publishing that runs without you watching it',
      intro:
        'A single loop from strategy to repurposing, with exactly one human checkpoint — approval before anything goes public.',
      steps: [
        { label: 'Content strategy', detail: 'Pillars, tone, cadence' },
        { label: 'AI generation', detail: 'Copy, hooks, hashtags', kind: 'ai' },
        { label: 'Creative production', detail: 'Canva / CapCut assets' },
        { label: 'Human approval', detail: 'Nothing publishes unreviewed', kind: 'human' },
        { label: 'Scheduling', detail: 'Per-network optimal slots' },
        { label: 'Publication', detail: 'Multi-network push' },
        { label: 'Analytics', detail: 'Native + consolidated data', kind: 'out' },
        { label: 'AI analysis', detail: 'What worked and why', kind: 'ai' },
        { label: 'Repurposing', detail: 'Feed the next cycle', kind: 'out' },
      ],
      tools: ['Canva', 'CapCut', 'Metricool', 'Meta Business Suite', 'ChatGPT', 'Claude', 'Gemini'],
    },
    {
      id: 'lead-generation',
      eyebrow: 'Lead Generation System',
      title: 'Traffic in, qualified pipeline out',
      intro:
        'The path from a stranger to a sales conversation, with no manual step in between. This page is a live implementation of it.',
      steps: [
        { label: 'Traffic', detail: 'SEO, social, ads, referral' },
        { label: 'Landing page', detail: 'One offer, one action' },
        { label: 'Form', detail: 'Validated, consented, UTM-tagged' },
        { label: 'CRM', detail: 'Record created automatically', kind: 'out' },
        { label: 'Lead scoring', detail: 'Cold / Warm / Hot', kind: 'ai' },
        { label: 'Nurturing', detail: 'Sequence matched to the score' },
        { label: 'Sales', detail: 'Human conversation, right moment', kind: 'human' },
      ],
      note: 'Everything you see in this section is running underneath the form further down this page.',
    },
    {
      id: 'crm-automation',
      eyebrow: 'CRM Automation',
      title: 'A pipeline that updates itself',
      intro:
        'A lead should never be re-typed, and a follow-up should never depend on someone remembering it.',
      steps: [
        { label: 'New lead', detail: 'Form, chat, ad or import' },
        { label: 'Database', detail: 'Stored with full context', kind: 'out' },
        { label: 'CRM', detail: 'Contact + deal created' },
        { label: 'Lead scoring', detail: 'Signals become a number', kind: 'ai' },
        { label: 'Segmentation', detail: 'Service, budget, country' },
        { label: 'Automated follow-up', detail: 'Sequences by segment' },
        { label: 'Sales notification', detail: 'Alert on hot leads' },
        { label: 'Meeting', detail: 'Booked and logged', kind: 'human' },
        { label: 'Proposal', detail: 'Sent and tracked', kind: 'human' },
        { label: 'Customer', detail: 'Closed and attributed', kind: 'out' },
      ],
      bullets: [
        'Pipeline statuses: New → Contacted → Qualified → Meeting → Proposal → Won → Lost',
      ],
    },
    {
      id: 'email-automation',
      eyebrow: 'Email Automation',
      title: 'The sequence that keeps the conversation alive',
      intro:
        'Email is still the highest-margin channel in the stack — provided it is segmented, timed and genuinely useful.',
      steps: [
        { label: 'Lead', detail: 'Consent captured at source' },
        { label: 'Welcome email', detail: 'Sent within minutes', kind: 'out' },
        { label: 'Segmentation', detail: 'Service, budget, maturity' },
        { label: 'Nurturing', detail: 'Value before the offer' },
        { label: 'Educational content', detail: 'Proof, cases, frameworks' },
        { label: 'Offer', detail: 'Made when the score justifies it' },
        { label: 'Follow-up', detail: 'Automated, then human', kind: 'human' },
        { label: 'Conversion', detail: 'Tracked and attributed', kind: 'out' },
      ],
      tools: ['Brevo', 'Mailchimp', 'HubSpot'],
    },
    {
      id: 'advertising-automation',
      eyebrow: 'Advertising Automation',
      title: 'Paid media, decided by data and confirmed by a human',
      intro:
        'AI can read performance faster than any analyst. It should not be the one deciding to triple a budget.',
      steps: [
        { label: 'Research', detail: 'Market, competitors, angles', kind: 'ai' },
        { label: 'Audience', detail: 'Segments and exclusions' },
        { label: 'Creative', detail: 'Variants per placement' },
        { label: 'Copy', detail: 'Hooks and CTA testing', kind: 'ai' },
        { label: 'Campaign', detail: 'Structured for learning' },
        { label: 'Data', detail: 'Spend, CPA, ROAS', kind: 'out' },
        { label: 'AI analysis', detail: 'Winners, losers, fatigue', kind: 'ai' },
        { label: 'Optimisation', detail: 'Reallocation proposal' },
        { label: 'Human approval', detail: 'Budget stays a human call', kind: 'human' },
      ],
      bullets: [
        'Meta Ads and Google Ads campaign structure',
        'Audience analysis and exclusion strategy',
        'Systematic creative testing',
        'Copy and hook testing',
        'Continuous performance monitoring',
      ],
      note: 'Media spend is never a software subscription. Software, API usage and advertising budget are three separate lines in every budget I build.',
    },
    {
      id: 'seo-automation',
      eyebrow: 'SEO Automation',
      title: 'Organic growth, industrialised',
      intro:
        'SEO rewards consistency more than brilliance. Automating the repetitive parts is what makes consistency possible.',
      steps: [
        { label: 'Keywords', detail: 'Volume, difficulty, business value' },
        { label: 'Search intent', detail: 'What the query really wants', kind: 'ai' },
        { label: 'Content brief', detail: 'Structure, entities, angle', kind: 'ai' },
        { label: 'AI-assisted content', detail: 'Draft, then human edit', kind: 'ai' },
        { label: 'SEO optimisation', detail: 'On-page, internal links' },
        { label: 'Publication', detail: 'Indexed and submitted' },
        { label: 'Search Console', detail: 'Impressions, position, CTR', kind: 'out' },
        { label: 'Monitoring', detail: 'Decay and cannibalisation' },
        { label: 'AI recommendations', detail: 'What to refresh next', kind: 'ai' },
      ],
      tools: ['Semrush', 'Google Search Console', 'GA4'],
    },
  ],

  data: {
    eyebrow: 'Data & Analytics',
    title: 'Six sources, one dashboard, one decision at a time',
    intro:
      'Reporting is not a monthly ritual. It is the mechanism that tells the system what to change — which only works when every source lands in the same place.',
    sourcesLabel: 'Sources',
    pipelineLabel: 'Pipeline',
    sources: ['GA4', 'Search Console', 'Meta Ads', 'Google Ads', 'CRM', 'Email platform'],
    pipeline: [
      { label: 'Dashboard', detail: 'One consolidated view of every source', kind: 'out' },
      { label: 'AI analysis', detail: 'Anomalies, trends, correlations', kind: 'ai' },
      { label: 'Insights', detail: 'What actually changed, and why' },
      { label: 'Recommendations', detail: 'Ranked by expected impact', kind: 'ai' },
      { label: 'Optimisation', detail: 'Applied, then measured again', kind: 'human' },
    ],
    tools: [
      { name: 'Looker Studio', note: 'Free, native to GA4 and Google Ads' },
      { name: 'Power BI', note: 'Governed models and org-wide sharing' },
      { name: 'Sheets / Excel', note: 'Modelling and quick hand-offs' },
    ],
  },

  stack: {
    eyebrow: 'Technology stack',
    title: 'The tools I actually work with',
    intro:
      'No tool is here because it is fashionable. Each one earns its place by doing a job nothing else in the stack already does.',
    toolsUsed: 'Tools used',
    categories: {
      ai: 'AI',
      automation: 'Automation',
      crm: 'CRM',
      email: 'Email',
      social: 'Social Media',
      design: 'Design',
      advertising: 'Advertising',
      seo: 'SEO',
      analytics: 'Analytics',
      infrastructure: 'Infrastructure',
    },
  },

  pricing: {
    eyebrow: 'Pricing & real cost',
    title: 'How much does an AI-powered marketing system actually cost?',
    intro:
      'Real, sourced, official prices — converted live into USD, EUR, MAD and XAF. Change the currency, change the billing cycle, or override the exchange rates yourself.',
    currencyGroup: 'Display currency',
    billingGroup: 'Billing cycle',
    monthly: 'Monthly',
    annual: 'Annual',
    fxTitle: 'Exchange rates',
    fxBase: 'Base USD',
    fxUpdated: 'updated',
    fxEdit: 'Edit rates',
    fxHide: 'Hide rates',
    fxRateLabel: '1 USD =',
    fxNote: [
      'Every figure on this page is computed from these rates — nothing is hard-coded. XAF is the Central African CFA franc (CEMAC zone), pegged at 1 EUR = 655.957 XAF; it is a different currency from XOF (West Africa). Source:',
      '. Re-check before quoting a client.',
    ],
    fxSourceLink: 'live mid-market rates',
    mostCommon: 'Most common',
    perMonth: '/ month',
    billedAnnually: 'Billed annually —',
    saving: 'saved',
    noAnnualDiscount: 'no annual discount on these plans',
    atMonthlyRate: 'at the monthly rate',
    extraUsageLines: 'usage-based or media line(s) on top',
    monthlyCost: 'Monthly cost',
    annualCost: 'Annual cost',
    notIncluded: 'Not included:',
    buildThisStack: 'Build this stack with me',
    tcoTitle: 'Total Cost of Ownership',
    tcoIntro:
      'A software line alone is not a budget. Eight cost types make up the real number — and the four most often forgotten are API usage, advertising media, implementation and maintenance. Adjust them below.',
    referenceStack: 'Reference stack',
    tcoApi: 'API / usage',
    tcoMedia: 'Advertising media',
    tcoImplementation: 'Implementation',
    tcoMaintenance: 'Maintenance',
    tcoSoftware: 'Software + AI subscriptions',
    tcoApiRow: 'API / usage cost',
    tcoMediaRow: 'Advertising media spend',
    tcoImplementationRow: 'Implementation (spread over 12 months)',
    tcoMaintenanceRow: 'Maintenance',
    tcoTotalMonthly: 'Total per month',
    tcoTotalYearOne: 'Total year one',
    bloatBanner: 'You don’t need every tool. You need the right system.',
    bloatIntro:
      'Minimum necessary stack → maximum operational efficiency. Below is the redundancy score: how much each pair of tools overlaps, and what can safely be collapsed. Every removed tool is one less subscription, one less integration and one less thing that breaks at 2am.',
    overlap: 'overlap',
    tableTitle: 'Every tool, every plan, four currencies',
    tableIntro:
      'Prices are the vendor’s official published rates in their own billing currency; the other three columns are converted with the rates above. Where a price is not published, the row says so rather than guessing.',
    tableCaption:
      'Official pricing for every tool in the stack, with monthly and annual billing in USD, EUR, MAD and XAF.',
    tableFootnote:
      'Original billing currency is USD for every row above; MAD, EUR and XAF are conversions. Rows tagged “Verify” vary by region, contact volume or negotiation — always confirm on the vendor’s own pricing page before quoting. Vendors change prices without notice.',
    columns: {
      tool: 'Tool',
      category: 'Category',
      plan: 'Plan',
      model: 'Model',
      monthly: 'Monthly',
      annualPerMonth: 'Annual / mo',
      annualTotal: 'Annual total',
      savingPerYear: 'Saving / yr',
      users: 'Users',
      limits: 'Limits & variable cost',
      verified: 'Verified',
    },
    officialPricing: 'Official pricing ↗',
    verifyBadge: 'Verify',
    notPublished: 'Not published',
    models: {
      free: 'Free',
      flat: 'Flat',
      'per-user': 'Per user',
      usage: 'Usage-based',
      'contact-sales': 'Contact sales',
      'media-spend': 'Media spend',
    },
    costTypes: {
      software: {
        label: '1 · Software subscription',
        description: 'Recurring licences: CRM, email platform, social scheduler, SEO suite.',
      },
      'ai-subscription': {
        label: '2 · AI subscription',
        description: 'ChatGPT, Claude, Gemini seats used by humans in day-to-day work.',
      },
      api: {
        label: '3 · API cost',
        description:
          'Tokens consumed by AI running inside automations. Usage-based, uncapped by default.',
      },
      automation: {
        label: '4 · Automation cost',
        description: 'Make, Zapier or n8n — priced per operation, task or execution.',
      },
      advertising: {
        label: '5 · Advertising media spend',
        description:
          'Meta Ads and Google Ads budget. This is media, NOT software. Never merge the two.',
      },
      data: {
        label: '6 · Data & analytics cost',
        description: 'GA4, Search Console, Looker Studio, Power BI licences and connectors.',
      },
      implementation: {
        label: '7 · Implementation cost',
        description:
          'One-off design and build of the system: architecture, workflows, migration.',
      },
      maintenance: {
        label: '8 · Maintenance cost',
        description:
          'Monitoring, fixing broken scenarios, prompt upkeep, iteration. Always budget it.',
      },
    },
    redundancy: {
      email: {
        group: 'Brevo vs Mailchimp',
        overlap: 'Both are full email marketing + automation platforms.',
        verdict: 'Keep one. Brevo is cheaper at low contact volume, Mailchimp at low send volume.',
      },
      automation: {
        group: 'Make vs Zapier vs n8n',
        overlap: 'Three answers to the same question: how do my tools talk to each other?',
        verdict: 'Keep one. Make for visual depth, Zapier for breadth, n8n to own the infrastructure.',
      },
      hubspot: {
        group: 'HubSpot Marketing Pro vs (Brevo + Make)',
        overlap: 'Lead scoring, nurturing and workflows exist in both setups.',
        verdict:
          'Below a few thousand contacts, Brevo + Make does the job for a fraction of the cost.',
      },
      social: {
        group: 'Metricool vs Meta Business Suite',
        overlap: 'Scheduling and analytics for Meta platforms.',
        verdict: 'Meta Business Suite alone is enough if Facebook and Instagram are your only networks.',
      },
      ai: {
        group: 'ChatGPT vs Claude vs Gemini',
        overlap: 'General-purpose assistants with heavily overlapping capabilities.',
        verdict: 'Two is a reasonable maximum. A third seat rarely pays for itself.',
      },
      bi: {
        group: 'Power BI vs Looker Studio',
        overlap: 'Dashboards and reporting on the same marketing sources.',
        verdict:
          'Looker Studio is free and native to GA4/Ads. Power BI earns its licence on governance.',
      },
    },
    stacks: {
      starter: {
        name: 'Starter',
        tagline: 'Prove the system works before you pay for it.',
        audience: ['Freelancers', 'Independent consultants', 'Small businesses', 'First automation'],
        implementationNote:
          'One-off setup: forms, CRM pipeline, 2–3 automations, tracking plan.',
        mediaBudgetNote: 'Ad spend is optional at this stage — organic + email first.',
      },
      professional: {
        name: 'Professional',
        tagline: 'A real acquisition engine: content, leads, CRM, nurturing, reporting.',
        audience: ['SMEs', 'In-house marketing teams', 'Lead generation', 'CRM + automation'],
        implementationNote:
          'Full system build: lead capture, scoring, nurturing sequences, dashboards.',
        mediaBudgetNote:
          'Plan a separate Meta/Google media budget — never inside the software line.',
      },
      advanced: {
        name: 'Advanced',
        tagline: 'Multi-tool orchestration, governed data, agency-grade reporting.',
        audience: ['Structured companies', 'Marketing teams', 'Multi-tool systems', 'Data & reporting'],
        implementationNote:
          'Architecture, migration, governance, multi-workflow orchestration, training.',
        mediaBudgetNote:
          'Media budget is typically the largest line — track it on its own P&L row.',
      },
    },
    currencyNames: {
      USD: 'US Dollar',
      EUR: 'Euro',
      MAD: 'Moroccan Dirham',
      XAF: 'Central African CFA Franc (CEMAC)',
    },
    fxSource: 'Indicative mid-market rates — refresh before quoting a client',
    fxPegNote: '1 EUR = 655.957 XAF (fixed CEMAC peg)',
  },

  services: {
    eyebrow: 'Services',
    title: 'My services',
    intro:
      'Each engagement starts with evidence and ends with something that runs. No 60-slide deck that nobody opens twice.',
    cta: 'Request this service',
    list: [
      {
        id: 'digital-marketing-audit',
        title: 'Digital Marketing Audit',
        description:
          'A full read of your digital presence and performance: channels, funnel, content, tracking and where the leaks are.',
        deliverables: ['Channel audit', 'Funnel analysis', 'Tracking review', 'Priority actions'],
        formValue: 'digital-marketing-audit',
        icon: 'audit',
      },
      {
        id: 'ai-marketing-audit',
        title: 'AI Marketing Audit',
        description:
          'Where AI genuinely creates value in your marketing — and, just as important, where it would only add noise.',
        deliverables: ['Use-case mapping', 'Effort/impact matrix', 'Tooling shortlist', 'Roadmap'],
        formValue: 'ai-marketing-audit',
        icon: 'ai',
      },
      {
        id: 'marketing-automation-audit',
        title: 'Marketing Automation Audit',
        description:
          'Every repetitive process in your marketing, mapped, timed and ranked by how much automating it would return.',
        deliverables: ['Process inventory', 'Time-cost model', 'Automation backlog', 'Quick wins'],
        formValue: 'marketing-automation-audit',
        icon: 'automation',
      },
      {
        id: 'ai-automation-consulting',
        title: 'AI Automation Consulting',
        description:
          'Design of the actual system: agents, workflows, data flows, approval gates and the humans who own each decision.',
        deliverables: ['System architecture', 'Workflow specs', 'Prompt library', 'Governance rules'],
        formValue: 'ai-automation-consulting',
        icon: 'system',
      },
      {
        id: 'crm-lead-automation',
        title: 'CRM & Lead Automation',
        description:
          'The prospect journey, structured and automated end to end: capture, scoring, segmentation, nurturing, handover.',
        deliverables: ['CRM structure', 'Lead scoring model', 'Nurturing sequences', 'Sales alerts'],
        formValue: 'crm-consulting',
        icon: 'crm',
      },
      {
        id: 'digital-marketing-strategy',
        title: 'Digital Marketing Strategy',
        description:
          'Positioning, audiences, channel mix, content plan and budget — a strategy your team can run without a translator.',
        deliverables: ['Positioning', 'Channel plan', 'Content strategy', 'Budget model'],
        formValue: 'digital-marketing-strategy',
        icon: 'strategy',
      },
      {
        id: 'data-analytics',
        title: 'Data & Marketing Analytics',
        description:
          'A measurement plan that survives contact with reality: KPIs, clean tracking, dashboards and a reporting rhythm.',
        deliverables: ['KPI framework', 'Tracking plan', 'Dashboards', 'Monthly reporting'],
        formValue: 'data-analytics',
        icon: 'analytics',
      },
      {
        id: 'ai-marketing-transformation',
        title: 'AI Marketing Transformation',
        description:
          'Progressive integration of AI into how your marketing actually works — with the team, not around it.',
        deliverables: ['Maturity assessment', 'Phased roadmap', 'Team enablement', 'Change management'],
        formValue: 'ai-automation-consulting',
        icon: 'transform',
      },
    ],
  },

  process: {
    eyebrow: 'How I work',
    title: 'Five steps, in this order, every time',
    intro:
      'The sequence matters. Designing a system before auditing the existing one is how companies end up automating a broken process faster.',
    steps: [
      { step: '01', title: 'Discovery', body: 'A structured conversation about your business, your funnel and what is actually slowing it down.' },
      { step: '02', title: 'Audit', body: 'I map the current stack, the processes, the data and the gaps — no recommendation without evidence.' },
      { step: '03', title: 'System design', body: 'Architecture: which agent does what, which workflow runs when, and where a human must stay in the loop.' },
      { step: '04', title: 'Build & connect', body: 'Automations, CRM, forms, sequences and tracking are implemented and connected to each other.' },
      { step: '05', title: 'Measure & optimise', body: 'Dashboards go live, the system produces data, and the data drives the next iteration.' },
    ],
  },

  principles: {
    eyebrow: 'Design principles',
    title: 'The rules every system I build has to satisfy',
    items: [
      { title: 'Simplicity', body: "Don't run 30 tools when 8 will do. Every extra tool is an extra failure point." },
      { title: 'Automation', body: 'Anything repetitive, rule-based and high-volume belongs to the machine.' },
      { title: 'Human control', body: 'Strategy, brand, budget and sensitive decisions stay with a person. Always.' },
      { title: 'Data', body: 'Every meaningful automation must leave behind data you can act on.' },
      { title: 'ROI', body: 'Every tool must justify its line in the budget. If it cannot, it goes.' },
      { title: 'Scalability', body: 'The system has to survive the company growing 10× without a rebuild.' },
      { title: 'Security', body: 'Prospect data is a liability until it is properly protected. Treat it that way.' },
      { title: 'Conversion', body: 'Every section, every email, every workflow exists to move someone one step forward.' },
    ],
  },

  contact: {
    eyebrow: 'Let’s talk',
    title: 'Let’s Build Your Intelligent Marketing System',
    intro:
      'Tell me about your business, your challenges and what you want to automate. The more concrete you are, the more useful my first reply will be.',
    emailMe: 'Email me',
    callMe: 'Call me',
    whatsapp: 'WhatsApp',
    whatsappSub: 'Message me directly — fastest reply',
    locationSub: 'Working with clients across Africa and Europe',
    afterTitle: 'What happens after you submit',
    afterSteps: [
      '1 — Your data is validated server-side.',
      '2 — The lead is written to the database.',
      '3 — A lead score is computed and stored.',
      '4 — You see an immediate confirmation.',
      '5 — I am notified, with your full context.',
      '6 — I reply personally, usually within one business day.',
    ],
  },

  form: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Professional email',
    emailHint: 'A company domain scores higher than a free mailbox.',
    phone: 'Phone / WhatsApp',
    country: 'Country',
    countryPlaceholder: 'Select a country',
    company: 'Company',
    companyPlaceholder: 'Company name',
    jobTitle: 'Job title',
    jobTitlePlaceholder: 'Marketing Manager',
    service: 'What are you looking for?',
    servicePlaceholder: 'Select a service',
    budget: 'Budget',
    budgetPlaceholder: 'Select a range',
    message: 'Tell me about your project or challenge',
    messageHint: 'What you are trying to automate, what is slowing you down, what you have already tried.',
    messagePlaceholder:
      'We publish content manually, our leads land in a spreadsheet and nobody follows up. We would like…',
    consent: 'I agree that my information may be used to contact me regarding my request.',
    privacyLink: 'Privacy Policy',
    submit: 'Request My Consultation',
    submitting: 'Sending…',
    footnote:
      'Validated, stored, scored and notified automatically — the exact lead pipeline described further up this page.',
    required: '(required)',
    honeypot: 'Leave this field empty',
    captchaLabel: 'Anti-spam verification',
    successTitle: 'Request received.',
    successBody:
      'I read every submission personally and normally reply within one business day. If it is urgent, WhatsApp is the fastest route.',
    duplicateBody:
      'Your request has already been received — I will come back to you shortly.',
    sendAnother: 'Send another request',
    errorTitle: 'Your request was not sent.',
    errors: {
      firstName: 'Please enter your first name.',
      lastName: 'Please enter your last name.',
      email: 'Please enter a valid email address.',
      service: 'Please tell me what you are looking for.',
      consent: 'Your consent is required.',
      generic: 'Something went wrong. Please try again.',
      network: 'Network error. Please check your connection, or email me at christguimeni@gmail.com.',
    },
    serviceOptions: [
      { value: 'digital-marketing-audit', label: 'Digital Marketing Audit' },
      { value: 'ai-marketing-audit', label: 'AI Marketing Audit' },
      { value: 'marketing-automation-audit', label: 'Marketing Automation Audit' },
      { value: 'ai-automation-consulting', label: 'AI Automation Consulting' },
      { value: 'crm-consulting', label: 'CRM Consulting' },
      { value: 'seo-consulting', label: 'SEO Consulting' },
      { value: 'digital-marketing-strategy', label: 'Digital Marketing Strategy' },
      { value: 'data-analytics', label: 'Data & Analytics' },
      { value: 'other', label: 'Other' },
    ],
    budgetOptions: [
      { value: 'lt-500', label: 'Less than €500' },
      { value: '500-1000', label: '€500–€1,000' },
      { value: '1000-3000', label: '€1,000–€3,000' },
      { value: '3000-5000', label: '€3,000–€5,000' },
      { value: '5000-plus', label: '€5,000+' },
      { value: 'undecided', label: 'Not defined yet' },
    ],
    countries: [
      { value: 'MA', label: 'Morocco' },
      { value: 'CM', label: 'Cameroon' },
      { value: 'CG', label: 'Congo' },
      { value: 'GA', label: 'Gabon' },
      { value: 'TD', label: 'Chad' },
      { value: 'CF', label: 'Central African Republic' },
      { value: 'GQ', label: 'Equatorial Guinea' },
      { value: 'CI', label: 'Ivory Coast' },
      { value: 'SN', label: 'Senegal' },
      { value: 'FR', label: 'France' },
      { value: 'BE', label: 'Belgium' },
      { value: 'CH', label: 'Switzerland' },
      { value: 'CA', label: 'Canada' },
      { value: 'US', label: 'United States' },
      { value: 'GB', label: 'United Kingdom' },
      { value: 'OTHER', label: 'Other' },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions I get asked before every project',
    items: [
      {
        q: 'What is AI Marketing Automation?',
        a: 'It is the design of a marketing system where AI, automation tools, your CRM and your data are connected to each other rather than used side by side. Content, lead capture, scoring, nurturing, reporting and optimisation run as one loop instead of a dozen manual tasks. The tools are the easy part — the architecture is the work.',
      },
      {
        q: 'Can AI completely replace a marketing team?',
        a: 'No, and building as if it could is how companies end up with fast, confident, off-brand marketing. AI is excellent at volume, pattern recognition and first drafts. Strategy, brand judgement, budget decisions and client relationships stay human. My rule: automate the repetitive, augment the strategic, humanize the critical decisions.',
      },
      {
        q: 'What can realistically be automated?',
        a: 'Content ideation and drafting, editorial calendars, per-platform adaptation, scheduling and publishing, lead capture and CRM creation, lead scoring, segmentation, nurturing sequences, sales notifications, ad performance monitoring, SEO briefs and monitoring, dashboards and reporting. What cannot: the decision about what your company should stand for.',
      },
      {
        q: 'How much does a marketing automation system cost?',
        a: 'The pricing section on this page answers that with real, sourced numbers in USD, EUR, MAD and XAF. A Starter stack can be assembled for very little — several of the best tools have genuinely usable free tiers. A Professional stack usually lands in the low hundreds of dollars per month. Total cost of ownership also includes API usage, advertising media spend, implementation and maintenance — four lines most budgets forget.',
      },
      {
        q: 'Do I need all these tools?',
        a: 'Almost certainly not. Tool bloat is the most common and most expensive mistake I see. Brevo and Mailchimp do the same job. Make, Zapier and n8n do the same job. Three AI subscriptions rarely beat two. The redundancy analysis on this page shows exactly which tools overlap and what can be collapsed.',
      },
      {
        q: 'Can you audit my current marketing stack?',
        a: 'Yes — that is usually the right starting point. The audit covers what you pay for, what you actually use, where processes are still manual, where data is lost between tools, and what the realistic return on automating each process would be. You leave with a prioritised backlog, not a slide deck.',
      },
      {
        q: 'Can you build a customised automation system?',
        a: 'Yes. Discovery, audit, system design, build and measurement. I design the architecture — which agent does what, which workflow runs when, where a human approval gate sits — and implement it on your stack, then hand over documentation your team can maintain.',
      },
      {
        q: 'How can I request a consultation?',
        a: 'Fill in the form on this page and pick the service you are interested in. Every submission is validated, stored, scored automatically and triggers a notification, so I see qualified requests immediately. You can also reach me directly by email, phone or WhatsApp — the buttons on this page are live.',
      },
    ],
  },

  cta: {
    title: 'Ready to Build a Smarter Marketing System?',
    body: 'Let’s identify what can be automated, what should remain human, and where AI can create the most value.',
    audit: 'Request an Audit',
    consult: 'Book a Consultation',
  },

  footer: {
    navigate: 'Navigate',
    legal: 'Legal',
    contact: 'Contact',
    dashboard: 'Lead dashboard',
    rights: 'All rights reserved.',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Automation System', href: '#system' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },

  legal: {
    backToSite: '← Back to the site',
    updated: 'Last updated:',
    privacy: {
      title: 'Privacy Policy',
      description:
        'How Mr GUEHEDI Emmanuel collects, stores, uses and protects the personal data submitted through this website.',
      sections: [
        {
          heading: '1. Who is responsible for your data',
          paragraphs: [
            'Mr GUEHEDI Emmanuel, Digital Marketing & AI Automation Specialist, based in {location}, is the data controller for the personal data collected through this website. You can reach me at {email} or {phone}.',
          ],
        },
        {
          heading: '2. What data is collected',
          paragraphs: ['Through the contact form on this site, I collect only what you submit:'],
          bullets: [
            'First name and last name',
            'Professional email address',
            'Phone / WhatsApp number (optional)',
            'Country, company and job title (optional)',
            'The service you are interested in and your budget range',
            'The message you write',
            'Technical context: the page you submitted from, and UTM campaign parameters if you arrived from a campaign link',
          ],
        },
        {
          heading: '3. The lead score',
          paragraphs: [
            'A score is computed automatically from the fields above. It is an internal prioritisation aid only; it produces no legal effect and no decision is taken solely on that basis.',
          ],
        },
        {
          heading: '4. Why it is collected — and on what legal basis',
          paragraphs: [
            'Your data is used exclusively to answer your request, to prepare a proposal, and to follow up on our exchange. The legal basis is your explicit consent, which you give by ticking the consent box before submitting the form, and the steps taken at your request prior to entering into a contract.',
            'I do not sell your data, I do not rent it, and I do not share it with third parties for their own marketing.',
          ],
        },
        {
          heading: '5. Where it is stored',
          paragraphs: [
            'Submissions are stored in a PostgreSQL database (Supabase) with access restricted to me. Data may be transmitted to the following processors, each used strictly to operate this site and my follow-up: the hosting provider, the transactional email provider, and — where configured — a CRM or automation platform used to manage the exchange.',
          ],
        },
        {
          heading: '6. How long it is kept',
          paragraphs: [
            'Leads that do not become clients are kept for a maximum of 3 years from our last contact, then deleted. Data relating to a signed engagement is kept for the duration of the contract plus the legal retention periods that apply to commercial and accounting records.',
          ],
        },
        {
          heading: '7. Your rights',
          paragraphs: [
            'You have the right to access, rectify, erase, restrict and port your data, to object to its processing, and to withdraw your consent at any time — with no effect on processing carried out before the withdrawal. Write to {email} and I will answer within one month.',
            'In Morocco, you may also lodge a complaint with the CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel). If you are in the European Union, you may lodge a complaint with your national supervisory authority.',
          ],
        },
        {
          heading: '8. Cookies and measurement',
          paragraphs: [
            'This site loads no analytics or advertising cookie unless the corresponding tag has been explicitly configured by the site owner. Where Google Analytics 4, Google Tag Manager, the Meta Pixel or the LinkedIn Insight Tag are active, they set cookies for audience measurement and campaign attribution.',
            'A minimal amount of data is also stored in your browser’s session storage to remember which campaign brought you here; it never leaves your browser until you submit the form. Your language choice is stored in a functional cookie.',
          ],
        },
        {
          heading: '9. Security',
          paragraphs: [
            'Data is transmitted over HTTPS, validated and sanitised on the server, rate limited against abuse, and protected by anti-spam controls. Administrative access is authenticated and restricted. No credential or API key is ever exposed in the browser.',
          ],
        },
        {
          heading: '10. Changes',
          paragraphs: [
            'This policy may be updated. The date at the top of this page always reflects the current version.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of Use',
      description:
        'Terms of use for the website of Mr GUEHEDI Emmanuel, Digital Marketing & AI Automation Specialist.',
      sections: [
        {
          heading: '1. Site owner',
          paragraphs: [
            'This site is published by Mr GUEHEDI Emmanuel, Digital Marketing & AI Automation Specialist, {location}. Contact: {email} · {phone}.',
          ],
        },
        {
          heading: '2. Purpose of the site',
          paragraphs: [
            'This site presents my professional expertise and services, and lets you request an audit or a consultation. Submitting the form does not create a contract; it opens a conversation. Any engagement is governed by a separate written proposal.',
          ],
        },
        {
          heading: '3. Pricing information',
          paragraphs: [
            'The pricing section lists third-party software prices published by their respective vendors, together with the date each figure was checked and a link to the vendor’s own pricing page. These vendors change their prices without notice, prices vary by region, contact volume, seat count and negotiation, and currency conversions use indicative exchange rates that you can override on the page.',
            'Those figures are provided for orientation only. They are not an offer, not a quotation, and not a guarantee of the price you will be charged by any vendor. Always confirm on the vendor’s official pricing page before making a purchasing decision. Trademarks and product names belong to their respective owners; their mention here does not imply any partnership or endorsement.',
          ],
        },
        {
          heading: '4. Intellectual property',
          paragraphs: [
            'The structure, text, visual identity, diagrams and frameworks presented on this site are my work and are protected. You may quote them with attribution; you may not reproduce the site or substantial parts of it for commercial purposes without written permission.',
          ],
        },
        {
          heading: '5. Liability',
          paragraphs: [
            'The content of this site is provided for information. I take care to keep it accurate and up to date, but I give no warranty that it is complete or error-free, and I cannot be held liable for decisions taken on the basis of it alone. Recommendations made during a paid engagement are governed by that engagement’s own terms.',
          ],
        },
        {
          heading: '6. External links',
          paragraphs: [
            'This site links to third-party websites, chiefly vendor pricing pages. I have no control over their content and accept no responsibility for it.',
          ],
        },
        {
          heading: '7. Personal data',
          paragraphs: [
            'The handling of personal data is described in the Privacy Policy, linked from the footer.',
          ],
        },
        {
          heading: '8. Applicable law',
          paragraphs: [
            'These terms are governed by Moroccan law. Any dispute will be submitted to the competent courts of Casablanca, unless a mandatory provision provides otherwise.',
          ],
        },
      ],
    },
  },

  tools: toolsEn,
};
