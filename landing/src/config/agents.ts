/** The 7 AI marketing agents — the core of the offer. */

export type IconName =
  | 'strategy'
  | 'content'
  | 'creative'
  | 'performance'
  | 'crm'
  | 'seo'
  | 'analytics';

export interface Agent {
  num: string;
  name: string;
  role: string;
  summary: string;
  capabilities: string[];
  icon: IconName;
}

export const AGENTS: Agent[] = [
  {
    num: '01',
    name: 'AI Marketing Strategist',
    role: 'Direction & positioning',
    summary:
      'Turns market signals into a defensible position and a marketing plan someone can actually execute.',
    capabilities: [
      'Strategy',
      'Personas',
      'Positioning',
      'Market analysis',
      'Marketing plan',
      'Recommendations',
    ],
    icon: 'strategy',
  },
  {
    num: '02',
    name: 'AI Content Manager',
    role: 'Editorial engine',
    summary:
      'Keeps the content pipeline full: ideas, angles, copy, calendar, and second lives for what already worked.',
    capabilities: [
      'Ideas',
      'Copywriting',
      'Scripts',
      'Editorial calendar',
      'Newsletters',
      'Repurposing',
    ],
    icon: 'content',
  },
  {
    num: '03',
    name: 'AI Creative Director',
    role: 'Concept & art direction',
    summary:
      'Holds the visual line across every campaign so the brand looks like one company, not ten freelancers.',
    capabilities: [
      'Creative concepts',
      'Visuals',
      'Video',
      'Campaigns',
      'Art direction',
    ],
    icon: 'creative',
  },
  {
    num: '04',
    name: 'AI Performance Manager',
    role: 'Paid acquisition',
    summary:
      'Builds, reads and tunes paid campaigns — audiences, creatives, budget, and the decision to cut what is not working.',
    capabilities: [
      'Meta Ads',
      'Google Ads',
      'Audiences',
      'Campaigns',
      'Performance analysis',
      'Optimisation',
    ],
    icon: 'performance',
  },
  {
    num: '05',
    name: 'AI CRM Manager',
    role: 'Pipeline & nurturing',
    summary:
      'Makes sure no lead goes cold: segmentation, scoring, sequences, and a clean handover to sales.',
    capabilities: [
      'Segmentation',
      'Lead scoring',
      'Nurturing',
      'CRM hygiene',
      'Sales automation',
    ],
    icon: 'crm',
  },
  {
    num: '06',
    name: 'AI SEO Manager',
    role: 'Organic visibility',
    summary:
      'Works the long game: intent, briefs, on-page fixes and the monitoring loop that catches decay early.',
    capabilities: [
      'Keyword research',
      'SEO analysis',
      'Content briefs',
      'On-page optimisation',
      'Search Console',
      'Monitoring',
    ],
    icon: 'seo',
  },
  {
    num: '07',
    name: 'AI Marketing Analyst',
    role: 'Measurement & decisions',
    summary:
      'Closes the loop. Turns GA4, CRM and ad data into a small number of decisions worth making this week.',
    capabilities: [
      'GA4',
      'Dashboards',
      'KPIs',
      'Attribution',
      'Analysis',
      'Recommendations',
    ],
    icon: 'analytics',
  },
];
