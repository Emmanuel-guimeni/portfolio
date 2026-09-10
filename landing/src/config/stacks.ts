import { TOOLS, type TierId, type Tool } from './tools';

/**
 * Three reference stacks. Each one lists the EXACT tool + plan rows from
 * tools.ts, so a price change in one place flows through to every total.
 */

export interface Stack {
  id: TierId;
  name: string;
  tagline: string;
  audience: string[];
  featured?: boolean;
  /** Tool ids from tools.ts, in display order. */
  toolIds: string[];
  /** One-off build cost, quoted separately from software. */
  implementationNote: string;
  /** Suggested monthly media budget floor — media, not software. */
  mediaBudgetNote: string;
}

export const STACKS: Stack[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Prove the system works before you pay for it.',
    audience: ['Freelancers', 'Independent consultants', 'Small businesses', 'First automation'],
    toolIds: [
      'chatgpt-plus',
      'make-free',
      'hubspot-free',
      'brevo-starter',
      'metricool-free',
      'canva-free',
      'ga4',
      'gsc',
      'looker-studio',
    ],
    implementationNote:
      'One-off setup: forms, CRM pipeline, 2–3 automations, tracking plan.',
    mediaBudgetNote: 'Ad spend is optional at this stage — organic + email first.',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'A real acquisition engine: content, leads, CRM, nurturing, reporting.',
    audience: ['SMEs', 'In-house marketing teams', 'Lead generation', 'CRM + automation'],
    featured: true,
    toolIds: [
      'chatgpt-plus',
      'claude-pro',
      'make-core',
      'llm-api',
      'hubspot-starter',
      'brevo-business',
      'metricool-starter',
      'canva-business',
      'semrush-pro',
      'ga4',
      'gsc',
      'looker-studio',
    ],
    implementationNote:
      'Full system build: lead capture, scoring, nurturing sequences, dashboards.',
    mediaBudgetNote: 'Plan a separate Meta/Google media budget — never inside the software line.',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    tagline: 'Multi-tool orchestration, governed data, agency-grade reporting.',
    audience: ['Structured companies', 'Marketing teams', 'Multi-tool systems', 'Data & reporting'],
    toolIds: [
      'chatgpt-business',
      'claude-team',
      'make-pro',
      'llm-api',
      'n8n-self',
      'hubspot-pro',
      'brevo-business',
      'metricool-advanced',
      'canva-business',
      'semrush-guru',
      'power-bi-pro',
      'ga4',
      'gsc',
    ],
    implementationNote:
      'Architecture, migration, governance, multi-workflow orchestration, training.',
    mediaBudgetNote: 'Media budget is typically the largest line — track it on its own P&L row.',
  },
];

export interface StackLine {
  tool: Tool;
  /** Monthly price in the tool's own currency, or null when not published. */
  monthly: number | null;
  annualMonthly: number | null;
}

export function stackLines(stack: Stack): StackLine[] {
  return stack.toolIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t))
    .map((tool) => ({
      tool,
      monthly: tool.monthly,
      annualMonthly: tool.annualMonthly ?? tool.monthly,
    }));
}
