/** Les 7 agents marketing IA — le cœur de l'offre. */

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
    role: 'Direction & positionnement',
    summary:
      "Transforme les signaux du marché en un positionnement défendable et en un plan marketing réellement exécutable.",
    capabilities: [
      'Stratégie',
      'Personas',
      'Positionnement',
      'Analyse de marché',
      'Plan marketing',
      'Recommandations',
    ],
    icon: 'strategy',
  },
  {
    num: '02',
    name: 'AI Content Manager',
    role: 'Moteur éditorial',
    summary:
      "Alimente le pipeline de contenu en continu : idées, angles, rédaction, calendrier, et une seconde vie pour ce qui a déjà fonctionné.",
    capabilities: [
      'Idées',
      'Copywriting',
      'Scripts',
      'Calendrier éditorial',
      'Newsletters',
      'Repurposing',
    ],
    icon: 'content',
  },
  {
    num: '03',
    name: 'AI Creative Director',
    role: 'Concept & direction artistique',
    summary:
      "Tient la ligne visuelle sur toutes les campagnes, pour que la marque ressemble à une entreprise et non à dix freelances.",
    capabilities: [
      'Concepts créatifs',
      'Visuels',
      'Vidéo',
      'Campagnes',
      'Direction artistique',
    ],
    icon: 'creative',
  },
  {
    num: '04',
    name: 'AI Performance Manager',
    role: 'Acquisition payante',
    summary:
      "Construit, lit et ajuste les campagnes payantes — audiences, créas, budget, et la décision de couper ce qui ne marche pas.",
    capabilities: [
      'Meta Ads',
      'Google Ads',
      'Audiences',
      'Campagnes',
      'Analyse de performance',
      'Optimisation',
    ],
    icon: 'performance',
  },
  {
    num: '05',
    name: 'AI CRM Manager',
    role: 'Pipeline & nurturing',
    summary:
      "Fait en sorte qu'aucun lead ne refroidisse : segmentation, scoring, séquences et passage de relais propre aux commerciaux.",
    capabilities: [
      'Segmentation',
      'Lead scoring',
      'Nurturing',
      'Hygiène du CRM',
      'Automatisation commerciale',
    ],
    icon: 'crm',
  },
  {
    num: '06',
    name: 'AI SEO Manager',
    role: 'Visibilité organique',
    summary:
      "Joue le temps long : intention de recherche, briefs, optimisations on-page et la boucle de suivi qui détecte le déclin tôt.",
    capabilities: [
      'Recherche de mots-clés',
      'Analyse SEO',
      'Briefs de contenu',
      'Optimisation on-page',
      'Search Console',
      'Monitoring',
    ],
    icon: 'seo',
  },
  {
    num: '07',
    name: 'AI Marketing Analyst',
    role: 'Mesure & décisions',
    summary:
      "Boucle la boucle. Transforme GA4, le CRM et les données publicitaires en un petit nombre de décisions à prendre cette semaine.",
    capabilities: [
      'GA4',
      'Dashboards',
      'KPI',
      'Attribution',
      'Analyse',
      'Recommandations',
    ],
    icon: 'analytics',
  },
];
