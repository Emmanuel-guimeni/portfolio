import { TOOLS, type TierId, type Tool } from './tools';

/**
 * Trois stacks de référence. Chacune liste les lignes outil + offre EXACTES de
 * tools.ts : un changement de prix à un seul endroit se répercute sur tous les
 * totaux.
 */

export interface Stack {
  id: TierId;
  featured?: boolean;
  /** Identifiants d'outils issus de tools.ts, dans l'ordre d'affichage. */
  toolIds: string[];
}

export const STACKS: Stack[] = [
  {
    id: 'starter',
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
  },
  {
    id: 'professional',
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
  },
  {
    id: 'advanced',
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
  },
];

export interface StackLine {
  tool: Tool;
  /** Prix mensuel dans la devise de l'outil, ou null s'il n'est pas publié. */
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
