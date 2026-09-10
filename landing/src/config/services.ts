/**
 * Services. `formValue` DOIT correspondre exactement à une option du
 * formulaire (voir SERVICE_OPTIONS dans lib/leads.ts) pour que le bouton
 * « Demander ce service » présélectionne le bon choix et que le lead arrive
 * correctement qualifié en base.
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  formValue: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: 'digital-marketing-audit',
    title: 'Audit Marketing Digital',
    description:
      'Une lecture complète de votre présence et de vos performances digitales : canaux, tunnel, contenu, tracking, et où sont les fuites.',
    deliverables: ['Audit des canaux', 'Analyse du tunnel', 'Revue du tracking', 'Actions prioritaires'],
    formValue: 'Audit Marketing Digital',
    icon: 'audit',
  },
  {
    id: 'ai-marketing-audit',
    title: 'Audit Marketing IA',
    description:
      "Là où l'IA crée réellement de la valeur dans votre marketing — et, tout aussi important, là où elle n'ajouterait que du bruit.",
    deliverables: ['Cartographie des cas d’usage', 'Matrice effort/impact', 'Sélection d’outils', 'Feuille de route'],
    formValue: 'Audit Marketing IA',
    icon: 'ai',
  },
  {
    id: 'marketing-automation-audit',
    title: 'Audit Marketing Automation',
    description:
      "Chaque processus répétitif de votre marketing, cartographié, chronométré et classé selon ce que son automatisation rapporterait.",
    deliverables: ['Inventaire des processus', 'Modèle de coût-temps', 'Backlog d’automatisation', 'Gains rapides'],
    formValue: 'Audit Marketing Automation',
    icon: 'automation',
  },
  {
    id: 'ai-automation-consulting',
    title: 'Conseil Automatisation IA',
    description:
      "La conception du système réel : agents, workflows, flux de données, points de validation et les humains qui gardent chaque décision.",
    deliverables: ['Architecture du système', 'Spécifications des workflows', 'Bibliothèque de prompts', 'Règles de gouvernance'],
    formValue: 'Conseil Automatisation IA',
    icon: 'system',
  },
  {
    id: 'crm-lead-automation',
    title: 'CRM & Automatisation des leads',
    description:
      'Le parcours prospect, structuré et automatisé de bout en bout : capture, scoring, segmentation, nurturing, passage aux ventes.',
    deliverables: ['Structure du CRM', 'Modèle de lead scoring', 'Séquences de nurturing', 'Alertes commerciales'],
    formValue: 'Conseil CRM',
    icon: 'crm',
  },
  {
    id: 'digital-marketing-strategy',
    title: 'Stratégie Marketing Digital',
    description:
      "Positionnement, audiences, mix de canaux, plan de contenu et budget — une stratégie que votre équipe peut exécuter sans traducteur.",
    deliverables: ['Positionnement', 'Plan de canaux', 'Stratégie de contenu', 'Modèle budgétaire'],
    formValue: 'Stratégie Marketing Digital',
    icon: 'strategy',
  },
  {
    id: 'data-analytics',
    title: 'Data & Marketing Analytics',
    description:
      'Un plan de mesure qui survit au réel : KPI, tracking propre, dashboards et un rythme de reporting tenable.',
    deliverables: ['Cadre de KPI', 'Plan de tracking', 'Dashboards', 'Reporting mensuel'],
    formValue: 'Data & Analytics',
    icon: 'analytics',
  },
  {
    id: 'ai-marketing-transformation',
    title: 'Transformation Marketing par l’IA',
    description:
      "Intégration progressive de l'IA dans le fonctionnement réel de votre marketing — avec l'équipe, pas à côté d'elle.",
    deliverables: ['Diagnostic de maturité', 'Feuille de route par phases', 'Montée en compétences', 'Conduite du changement'],
    formValue: 'Conseil Automatisation IA',
    icon: 'transform',
  },
];

/** Ma méthode — la séquence d'intervention affichée sous les services. */
export const PROCESS = [
  {
    step: '01',
    title: 'Découverte',
    body: 'Un échange structuré sur votre activité, votre tunnel et ce qui le ralentit vraiment.',
  },
  {
    step: '02',
    title: 'Audit',
    body: "Je cartographie la stack, les processus, les données et les manques — aucune recommandation sans preuve.",
  },
  {
    step: '03',
    title: 'Conception du système',
    body: "L'architecture : quel agent fait quoi, quel workflow se déclenche quand, et où un humain doit rester dans la boucle.",
  },
  {
    step: '04',
    title: 'Construction & connexion',
    body: 'Automatisations, CRM, formulaires, séquences et tracking sont implémentés puis reliés entre eux.',
  },
  {
    step: '05',
    title: 'Mesure & optimisation',
    body: 'Les dashboards passent en production, le système produit de la donnée, et la donnée pilote l’itération suivante.',
  },
];
