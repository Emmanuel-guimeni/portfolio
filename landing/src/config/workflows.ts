/**
 * Every automation section on the page is rendered from this file, so the
 * diagrams and the copy can never drift apart.
 *
 * kind: 'ai'     → the AI agent does the work
 *       'human'  → a human decision / approval gate
 *       'out'    → an output, a stored record or a result
 *       undefined→ a neutral system step
 */

export type StepKind = 'ai' | 'human' | 'out';

export interface FlowStep {
  label: string;
  detail?: string;
  kind?: StepKind;
}

export interface WorkflowSection {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: FlowStep[];
  bullets?: string[];
  tools?: string[];
  /** Extra note rendered under the flow. */
  note?: string;
}

export const SOLUTION_CHAIN: { label: string; detail: string }[] = [
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
];

export const WORKFLOWS: WorkflowSection[] = [
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
    note:
      'Everything you see in this section is running underneath the form further down this page.',
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
    note:
      'Media spend is never a software subscription. Software, API usage and advertising budget are three separate lines in every budget I build.',
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
];

export const DATA_SOURCES = [
  'GA4',
  'Search Console',
  'Meta Ads',
  'Google Ads',
  'CRM',
  'Email platform',
];

export const DATA_PIPELINE: FlowStep[] = [
  { label: 'Dashboard', detail: 'One consolidated view of every source', kind: 'out' },
  { label: 'AI analysis', detail: 'Anomalies, trends, correlations', kind: 'ai' },
  { label: 'Insights', detail: 'What actually changed, and why' },
  { label: 'Recommendations', detail: 'Ranked by expected impact', kind: 'ai' },
  { label: 'Optimisation', detail: 'Applied, then measured again', kind: 'human' },
];

export const PROBLEMS = [
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
];

export const DESIGN_PRINCIPLES = [
  {
    title: 'Simplicity',
    body: "Don't run 30 tools when 8 will do. Every extra tool is an extra failure point.",
  },
  {
    title: 'Automation',
    body: 'Anything repetitive, rule-based and high-volume belongs to the machine.',
  },
  {
    title: 'Human control',
    body: 'Strategy, brand, budget and sensitive decisions stay with a person. Always.',
  },
  {
    title: 'Data',
    body: 'Every meaningful automation must leave behind data you can act on.',
  },
  {
    title: 'ROI',
    body: 'Every tool must justify its line in the budget. If it cannot, it goes.',
  },
  {
    title: 'Scalability',
    body: 'The system has to survive the company growing 10× without a rebuild.',
  },
  {
    title: 'Security',
    body: 'Prospect data is a liability until it is properly protected. Treat it that way.',
  },
  {
    title: 'Conversion',
    body: 'Every section, every email, every workflow exists to move someone one step forward.',
  },
];
