import { TOOLS, type TierId, type Tool } from './tools';

/**
 * Trois stacks de référence. Chacune liste les lignes outil + offre EXACTES de
 * tools.ts : un changement de prix à un seul endroit se répercute sur tous les
 * totaux.
 */

export interface Stack {
  id: TierId;
  name: string;
  tagline: string;
  audience: string[];
  featured?: boolean;
  /** Identifiants d'outils issus de tools.ts, dans l'ordre d'affichage. */
  toolIds: string[];
  /** Coût de mise en place ponctuel, chiffré séparément du logiciel. */
  implementationNote: string;
  /** Budget média mensuel plancher suggéré — du média, pas du logiciel. */
  mediaBudgetNote: string;
}

export const STACKS: Stack[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Prouvez que le système fonctionne avant de payer pour lui.',
    audience: ['Freelances', 'Consultants indépendants', 'Petites entreprises', 'Première automatisation'],
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
      'Mise en place ponctuelle : formulaires, pipeline CRM, 2 à 3 automatisations, plan de tracking.',
    mediaBudgetNote: 'La publicité est optionnelle à ce stade — organique et email d’abord.',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Un vrai moteur d’acquisition : contenu, leads, CRM, nurturing, reporting.',
    audience: ['PME', 'Équipes marketing internes', 'Génération de leads', 'CRM + automatisation'],
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
      'Construction complète : capture de leads, scoring, séquences de nurturing, dashboards.',
    mediaBudgetNote: 'Prévoyez un budget média Meta/Google distinct — jamais dans la ligne logiciel.',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    tagline: 'Orchestration multi-outils, données gouvernées, reporting niveau agence.',
    audience: ['Entreprises structurées', 'Équipes marketing', 'Systèmes multi-outils', 'Data & reporting'],
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
      'Architecture, migration, gouvernance, orchestration multi-workflows, formation.',
    mediaBudgetNote: 'Le budget média est en général la plus grosse ligne — suivez-le sur sa propre ligne de compte de résultat.',
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
