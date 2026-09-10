/**
 * Toutes les sections d'automatisation de la page sont rendues depuis ce
 * fichier : les schémas et les textes ne peuvent donc jamais diverger.
 *
 * kind: 'ai'     → l'agent IA fait le travail
 *       'human'  → décision / validation humaine
 *       'out'    → une sortie, un enregistrement ou un résultat
 *       undefined→ une étape système neutre
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
  /** Note affichée sous le schéma. */
  note?: string;
}

export const SOLUTION_CHAIN: { label: string; detail: string }[] = [
  { label: 'Visiteur', detail: 'Quelqu’un arrive du search, du social, des ads ou d’une recommandation.' },
  { label: 'Contenu', detail: 'L’actif qui capte l’attention et répond à une intention réelle.' },
  { label: 'Trafic', detail: 'Des sessions qualifiées, dirigées vers la bonne destination.' },
  { label: 'Landing page', detail: 'Une promesse, une offre, une action.' },
  { label: 'Lead', detail: 'Formulaire soumis, consentement recueilli, données validées.' },
  { label: 'CRM', detail: 'La fiche est créée automatiquement, jamais ressaisie.' },
  { label: 'Lead scoring', detail: 'Un score calculé sur des signaux réels, pas à l’intuition.' },
  { label: 'Nurturing', detail: 'Des contenus séquencés selon le score et le segment.' },
  { label: 'Vente', detail: 'Une conversation humaine, au moment où elle vaut la peine.' },
  { label: 'Client', detail: 'L’affaire se signe et la fiche suit jusqu’au bout.' },
  { label: 'Data', detail: 'Chaque étape ci-dessus laisse une trace mesurable.' },
  { label: 'Analyse IA', detail: 'Tendances, anomalies et points de fuite remontés automatiquement.' },
  { label: 'Optimisation', detail: 'L’itération suivante est décidée par les faits. Puis ça reboucle.' },
];

export const WORKFLOWS: WorkflowSection[] = [
  {
    id: 'content-factory',
    eyebrow: 'Content Factory',
    title: 'D’une seule idée à un mois de contenu',
    intro:
      "Le contenu cesse d'être une urgence hebdomadaire quand le pipeline lui-même devient un système. L'IA produit le volume ; vous gardez le jugement.",
    steps: [
      { label: 'Idée', detail: 'Tendances, intentions de recherche, questions clients', kind: 'ai' },
      { label: 'IA', detail: 'Angles, plan, calendrier éditorial', kind: 'ai' },
      { label: 'Rédaction', detail: 'Textes adaptés à chaque plateforme', kind: 'ai' },
      { label: 'Design', detail: 'Visuels et vidéos à partir de templates' },
      { label: 'Validation', detail: 'Vous validez le ton, les promesses, la marque', kind: 'human' },
      { label: 'Programmation', detail: 'Publié au bon créneau' },
      { label: 'Publication', detail: 'Diffusé sur tous les réseaux' },
      { label: 'Analytics', detail: 'Portée, engagement, conversions', kind: 'out' },
      { label: 'Repurposing', detail: 'Les gagnants deviennent de nouveaux formats', kind: 'out' },
    ],
    bullets: [
      'Recherche d’idées et veille des tendances',
      'Génération du calendrier éditorial',
      'Rédaction et adaptation par plateforme',
      'Briefs créatifs et scripts vidéo',
      'Variantes de contenus pour l’A/B testing',
      'Programmation, publication et analyse des performances',
      'Recyclage automatique des meilleurs contenus',
    ],
  },
  {
    id: 'social-automation',
    eyebrow: 'Automatisation des réseaux sociaux',
    title: 'Une publication qui tourne sans que vous la surveilliez',
    intro:
      "Une boucle unique, de la stratégie au recyclage, avec exactement un point de contrôle humain : la validation avant toute mise en ligne.",
    steps: [
      { label: 'Stratégie de contenu', detail: 'Piliers, ton, cadence' },
      { label: 'Génération IA', detail: 'Textes, accroches, hashtags', kind: 'ai' },
      { label: 'Production créative', detail: 'Assets Canva / CapCut' },
      { label: 'Validation humaine', detail: 'Rien ne se publie sans relecture', kind: 'human' },
      { label: 'Programmation', detail: 'Créneaux optimaux par réseau' },
      { label: 'Publication', detail: 'Diffusion multi-réseaux' },
      { label: 'Analytics', detail: 'Données natives + consolidées', kind: 'out' },
      { label: 'Analyse IA', detail: 'Ce qui a marché, et pourquoi', kind: 'ai' },
      { label: 'Repurposing', detail: 'Alimente le cycle suivant', kind: 'out' },
    ],
    tools: ['Canva', 'CapCut', 'Metricool', 'Meta Business Suite', 'ChatGPT', 'Claude', 'Gemini'],
  },
  {
    id: 'lead-generation',
    eyebrow: 'Système de génération de leads',
    title: 'Du trafic à l’entrée, un pipeline qualifié à la sortie',
    intro:
      "Le chemin d'un inconnu jusqu'à une conversation commerciale, sans une seule étape manuelle entre les deux. Cette page en est une implémentation réelle.",
    steps: [
      { label: 'Trafic', detail: 'SEO, social, ads, recommandation' },
      { label: 'Landing page', detail: 'Une offre, une action' },
      { label: 'Formulaire', detail: 'Validé, consenti, tagué UTM' },
      { label: 'CRM', detail: 'Fiche créée automatiquement', kind: 'out' },
      { label: 'Lead scoring', detail: 'Froid / Tiède / Chaud', kind: 'ai' },
      { label: 'Nurturing', detail: 'Séquence adaptée au score' },
      { label: 'Vente', detail: 'Conversation humaine, au bon moment', kind: 'human' },
    ],
    note:
      'Tout ce que vous voyez dans cette section tourne réellement sous le formulaire, plus bas sur cette page.',
  },
  {
    id: 'crm-automation',
    eyebrow: 'Automatisation du CRM',
    title: 'Un pipeline qui se met à jour tout seul',
    intro:
      "Un lead ne devrait jamais être ressaisi, et une relance ne devrait jamais dépendre de la mémoire de quelqu'un.",
    steps: [
      { label: 'Nouveau lead', detail: 'Formulaire, chat, publicité ou import' },
      { label: 'Base de données', detail: 'Stocké avec tout son contexte', kind: 'out' },
      { label: 'CRM', detail: 'Contact et opportunité créés' },
      { label: 'Lead scoring', detail: 'Les signaux deviennent un chiffre', kind: 'ai' },
      { label: 'Segmentation', detail: 'Service, budget, pays' },
      { label: 'Relance automatique', detail: 'Séquences par segment' },
      { label: 'Alerte commerciale', detail: 'Notification sur les leads chauds' },
      { label: 'Rendez-vous', detail: 'Pris et enregistré', kind: 'human' },
      { label: 'Proposition', detail: 'Envoyée et suivie', kind: 'human' },
      { label: 'Client', detail: 'Signé et attribué', kind: 'out' },
    ],
    bullets: [
      'Statuts du pipeline : Nouveau → Contacté → Qualifié → Rendez-vous → Proposition → Gagné → Perdu',
    ],
  },
  {
    id: 'email-automation',
    eyebrow: 'Automatisation des emails',
    title: 'La séquence qui entretient la conversation',
    intro:
      "L'email reste le canal le plus rentable de la stack — à condition d'être segmenté, bien cadencé et réellement utile.",
    steps: [
      { label: 'Lead', detail: 'Consentement recueilli à la source' },
      { label: 'Email de bienvenue', detail: 'Envoyé en quelques minutes', kind: 'out' },
      { label: 'Segmentation', detail: 'Service, budget, maturité' },
      { label: 'Nurturing', detail: 'De la valeur avant l’offre' },
      { label: 'Contenu pédagogique', detail: 'Preuves, cas, méthodes' },
      { label: 'Offre', detail: 'Faite quand le score le justifie' },
      { label: 'Relance', detail: 'Automatisée, puis humaine', kind: 'human' },
      { label: 'Conversion', detail: 'Mesurée et attribuée', kind: 'out' },
    ],
    tools: ['Brevo', 'Mailchimp', 'HubSpot'],
  },
  {
    id: 'advertising-automation',
    eyebrow: 'Automatisation publicitaire',
    title: 'De la publicité pilotée par la donnée, validée par un humain',
    intro:
      "L'IA lit les performances plus vite que n'importe quel analyste. Ce n'est pas pour autant à elle de décider de tripler un budget.",
    steps: [
      { label: 'Recherche', detail: 'Marché, concurrents, angles', kind: 'ai' },
      { label: 'Audience', detail: 'Segments et exclusions' },
      { label: 'Créa', detail: 'Variantes par placement' },
      { label: 'Message', detail: 'Test des accroches et des CTA', kind: 'ai' },
      { label: 'Campagne', detail: 'Structurée pour apprendre' },
      { label: 'Données', detail: 'Dépense, CPA, ROAS', kind: 'out' },
      { label: 'Analyse IA', detail: 'Gagnants, perdants, usure créative', kind: 'ai' },
      { label: 'Optimisation', detail: 'Proposition de réallocation' },
      { label: 'Validation humaine', detail: 'Le budget reste une décision humaine', kind: 'human' },
    ],
    bullets: [
      'Structure des campagnes Meta Ads et Google Ads',
      'Analyse d’audience et stratégie d’exclusion',
      'Test créatif systématique',
      'Test des messages et des accroches',
      'Suivi de performance en continu',
    ],
    note:
      "Un budget média n'est jamais un abonnement logiciel. Logiciel, consommation API et budget publicitaire sont trois lignes distinctes dans tous les budgets que je construis.",
  },
  {
    id: 'seo-automation',
    eyebrow: 'Automatisation du SEO',
    title: 'Une croissance organique industrialisée',
    intro:
      "Le SEO récompense la régularité plus que le génie. Automatiser les tâches répétitives, c'est précisément ce qui rend cette régularité possible.",
    steps: [
      { label: 'Mots-clés', detail: 'Volume, difficulté, valeur business' },
      { label: 'Intention de recherche', detail: 'Ce que la requête veut vraiment', kind: 'ai' },
      { label: 'Brief de contenu', detail: 'Structure, entités, angle', kind: 'ai' },
      { label: 'Contenu assisté par IA', detail: 'Brouillon, puis relecture humaine', kind: 'ai' },
      { label: 'Optimisation SEO', detail: 'On-page, maillage interne' },
      { label: 'Publication', detail: 'Indexé et soumis' },
      { label: 'Search Console', detail: 'Impressions, position, CTR', kind: 'out' },
      { label: 'Monitoring', detail: 'Déclin et cannibalisation' },
      { label: 'Recommandations IA', detail: 'Ce qu’il faut rafraîchir ensuite', kind: 'ai' },
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
  'Plateforme email',
];

export const DATA_PIPELINE: FlowStep[] = [
  { label: 'Dashboard', detail: 'Une vue consolidée de toutes les sources', kind: 'out' },
  { label: 'Analyse IA', detail: 'Anomalies, tendances, corrélations', kind: 'ai' },
  { label: 'Insights', detail: 'Ce qui a réellement changé, et pourquoi' },
  { label: 'Recommandations', detail: 'Classées par impact attendu', kind: 'ai' },
  { label: 'Optimisation', detail: 'Appliquée, puis mesurée à nouveau', kind: 'human' },
];

export const PROBLEMS = [
  'Trop de tâches répétitives',
  'Du temps perdu sur ce qu’une machine ferait',
  'Du contenu produit entièrement à la main',
  'Des leads qui ne sont jamais vraiment relancés',
  'Un CRM que personne n’utilise réellement',
  'Des données éparpillées dans une dizaine d’outils',
  'Un reporting manuel et pénible',
  'Des campagnes difficiles à optimiser',
  'Aucune automatisation dans le tunnel',
  'Des outils qui ne communiquent pas entre eux',
  'Aucune visibilité sur le ROI réel',
];

export const DESIGN_PRINCIPLES = [
  {
    title: 'Simplicité',
    body: "N'utilisez pas 30 outils quand 8 suffisent. Chaque outil en trop est un point de panne en plus.",
  },
  {
    title: 'Automatisation',
    body: 'Tout ce qui est répétitif, régi par des règles et à fort volume revient à la machine.',
  },
  {
    title: 'Contrôle humain',
    body: 'Stratégie, marque, budget et décisions sensibles restent à une personne. Toujours.',
  },
  {
    title: 'Data',
    body: 'Toute automatisation qui compte doit laisser derrière elle des données exploitables.',
  },
  {
    title: 'ROI',
    body: 'Chaque outil doit justifier sa ligne dans le budget. S’il ne peut pas, il sort.',
  },
  {
    title: 'Scalabilité',
    body: 'Le système doit survivre à une entreprise qui grandit d’un facteur 10, sans tout reconstruire.',
  },
  {
    title: 'Sécurité',
    body: 'Les données des prospects sont un risque tant qu’elles ne sont pas protégées. À traiter comme tel.',
  },
  {
    title: 'Conversion',
    body: 'Chaque section, chaque email, chaque workflow existe pour faire avancer quelqu’un d’un pas.',
  },
];
