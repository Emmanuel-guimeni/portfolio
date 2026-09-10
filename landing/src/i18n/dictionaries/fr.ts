import type { Dictionary } from '../types';
import { toolsFr } from './tools.fr';

/**
 * FRANÇAIS — langue principale et source de vérité du contenu.
 *
 * Quand vous modifiez un texte ici, pensez à répercuter le changement dans
 * en.ts, ar.ts et es.ts. TypeScript vous signalera une clé manquante, mais pas
 * une traduction devenue obsolète.
 *
 * Dans les textes juridiques, {email}, {phone} et {location} sont remplacés au
 * rendu par les coordonnées réelles issues de config/site.ts.
 */
export const fr: Dictionary = {
  meta: {
    title: 'Mr GUEHEDI Emmanuel — Spécialiste Marketing Digital & Automatisation IA',
    description:
      'Consultant en marketing digital et automatisation IA à Casablanca. Je conçois des systèmes marketing intelligents reliant IA, automatisation, CRM, data et croissance.',
    keywords: [
      'consultant marketing digital',
      'automatisation marketing IA',
      'consultant marketing automation',
      'spécialiste automatisation IA',
      'marketing digital et automatisation IA',
      'marketing automation Maroc',
      'consultant marketing digital Casablanca',
      'automatisation CRM',
      'système de génération de leads',
      'agents marketing IA',
    ],
    schemaLanguage: 'fr',
  },

  site: {
    role: 'Spécialiste Marketing Digital & Automatisation IA',
    roleShort: 'Marketing Digital & Automatisation IA',
    degree: 'Master en Marketing Digital & E-commerce',
    positioning:
      'Marketing Digital • Intelligence Artificielle • Marketing Automation • Data • Growth',
    manifesto:
      "Je ne me contente pas d'utiliser des outils d'IA. Je conçois des systèmes marketing intelligents qui relient IA, automatisation, data et croissance.",
    signature: [
      'Automatiser le répétitif.',
      'Augmenter le stratégique.',
      'Humaniser les décisions critiques.',
    ],
    philosophy:
      "L'avenir du marketing, ce ne sont pas plus d'outils. Ce sont des systèmes mieux connectés.",
    locationLabel: 'Casablanca – Maroc',
  },

  nav: {
    items: [
      { label: 'Le système', href: '#system' },
      { label: 'Agents IA', href: '#agents' },
      { label: 'Automatisation', href: '#automation' },
      { label: 'Stack', href: '#stack' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Services', href: '#services' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: 'Demander un audit',
    home: 'accueil',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    skipToContent: 'Aller au contenu principal',
    languageLabel: 'Changer de langue',
  },

  hero: {
    available: 'Disponible pour de nouveaux projets',
    headlineLead: 'Transformez votre marketing digital en un',
    headlineAccent: 'système intelligent et automatisé',
    value:
      'Je relie stratégie marketing, intelligence artificielle, automatisation, CRM, acquisition, contenu et data en un seul système — pour que le répétitif tourne seul, que le stratégique gagne en précision, et que chaque décision s’appuie sur des chiffres auxquels vous pouvez vraiment vous fier.',
    ctaAudit: 'Demander un audit',
    ctaConsult: 'Réserver une consultation',
    ctaExplore: 'Explorer le système',
    tags: ['Master en Marketing Digital & E-commerce', '7 agents marketing IA', 'Automatisation · CRM · Data'],
    floatAgents: 'agents IA',
    floatHuman: 'décisions humaines',
    statsLabel: 'Chiffres clés',
    stats: [
      { value: '7', label: 'Agents marketing IA', sub: 'conçus et orchestrés' },
      { value: '9', label: 'Workflows automatisés', sub: 'contenu → CRM → data' },
      { value: '20+', label: 'Outils analysés', sub: 'avec leurs tarifs officiels' },
      { value: '4', label: 'Devises', sub: 'USD · EUR · MAD · XAF' },
    ],
  },

  problem: {
    eyebrow: 'Le problème',
    titleLead: 'La plupart des équipes marketing ne manquent pas d’outils.',
    titleTail: 'Elles manquent d’un',
    titleAccent: 'système',
    intro:
      'Chacun de ces symptômes vient de la même cause : des outils achetés un par un, jamais conçus pour fonctionner ensemble.',
    items: [
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
    ],
    from: 'D’un marketing fragmenté',
    to: 'à des systèmes marketing intelligents',
  },

  solution: {
    eyebrow: 'L’approche',
    titleParts: ['IA', 'Marketing', 'Automatisation', 'Data'],
    intro:
      "Je ne me contente pas d'utiliser des outils d'IA. Je conçois des systèmes marketing intelligents qui relient IA, automatisation, data et croissance.",
    sideTitle: 'Un système, quatre disciplines, zéro copier-coller',
    sideBody:
      'La stratégie donne la direction. L’IA produit le volume. L’automatisation fait circuler les données entre les outils. L’analytics boucle la boucle et vous dit quoi changer ensuite — puis tout recommence.',
    chainTitle: 'La chaîne de valeur complète',
    chainIntro:
      'Treize étapes, d’un inconnu jusqu’à un système optimisé. Chacune est instrumentée, automatisée là où elle doit l’être, et relue par un humain là où c’est indispensable.',
    chain: [
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
    ],
    diagram: {
      inputs: ['Stratégie', 'Contenu', 'Trafic', 'Data'],
      outputs: ['Leads', 'CRM', 'Nurturing', 'Insights'],
      core: 'IA',
      coreSub: 'ORCHESTRATION',
      loop: 'MESURER → APPRENDRE → OPTIMISER',
      alt: 'Schéma : stratégie, contenu, trafic et data alimentent un noyau d’orchestration IA, qui produit des leads, des fiches CRM, des séquences de nurturing et des insights.',
    },
  },

  agents: {
    eyebrow: 'Les 7 agents marketing IA',
    title: 'Sept spécialistes, une équipe orchestrée',
    intro:
      'Pas sept abonnements — sept rôles. Chacun a un périmètre défini, des entrées définies, des sorties définies, et un moment précis où un humain reprend la main.',
    list: [
      {
        num: '01',
        name: 'AI Marketing Strategist',
        role: 'Direction & positionnement',
        summary:
          'Transforme les signaux du marché en un positionnement défendable et en un plan marketing réellement exécutable.',
        capabilities: ['Stratégie', 'Personas', 'Positionnement', 'Analyse de marché', 'Plan marketing', 'Recommandations'],
      },
      {
        num: '02',
        name: 'AI Content Manager',
        role: 'Moteur éditorial',
        summary:
          'Alimente le pipeline de contenu en continu : idées, angles, rédaction, calendrier, et une seconde vie pour ce qui a déjà fonctionné.',
        capabilities: ['Idées', 'Copywriting', 'Scripts', 'Calendrier éditorial', 'Newsletters', 'Repurposing'],
      },
      {
        num: '03',
        name: 'AI Creative Director',
        role: 'Concept & direction artistique',
        summary:
          'Tient la ligne visuelle sur toutes les campagnes, pour que la marque ressemble à une entreprise et non à dix freelances.',
        capabilities: ['Concepts créatifs', 'Visuels', 'Vidéo', 'Campagnes', 'Direction artistique'],
      },
      {
        num: '04',
        name: 'AI Performance Manager',
        role: 'Acquisition payante',
        summary:
          'Construit, lit et ajuste les campagnes payantes — audiences, créas, budget, et la décision de couper ce qui ne marche pas.',
        capabilities: ['Meta Ads', 'Google Ads', 'Audiences', 'Campagnes', 'Analyse de performance', 'Optimisation'],
      },
      {
        num: '05',
        name: 'AI CRM Manager',
        role: 'Pipeline & nurturing',
        summary:
          'Fait en sorte qu’aucun lead ne refroidisse : segmentation, scoring, séquences et passage de relais propre aux commerciaux.',
        capabilities: ['Segmentation', 'Lead scoring', 'Nurturing', 'Hygiène du CRM', 'Automatisation commerciale'],
      },
      {
        num: '06',
        name: 'AI SEO Manager',
        role: 'Visibilité organique',
        summary:
          'Joue le temps long : intention de recherche, briefs, optimisations on-page et la boucle de suivi qui détecte le déclin tôt.',
        capabilities: ['Recherche de mots-clés', 'Analyse SEO', 'Briefs de contenu', 'Optimisation on-page', 'Search Console', 'Monitoring'],
      },
      {
        num: '07',
        name: 'AI Marketing Analyst',
        role: 'Mesure & décisions',
        summary:
          'Boucle la boucle. Transforme GA4, le CRM et les données publicitaires en un petit nombre de décisions à prendre cette semaine.',
        capabilities: ['GA4', 'Dashboards', 'KPI', 'Attribution', 'Analyse', 'Recommandations'],
      },
    ],
    human: {
      num: '00',
      name: 'L’humain',
      role: 'Responsable de chaque décision qui compte',
      summary:
        'Les agents proposent. Une personne décide. Marque, budget, tarifs, relation client et tout ce qui a un poids juridique ou réputationnel ne quittent jamais les mains humaines — c’est une règle de conception, pas une limite.',
      capabilities: ['Jugement de marque', 'Validation du budget', 'Relation client', 'Dernier mot'],
    },
  },

  flowLegend: {
    ai: 'L’IA fait le travail',
    human: 'Décision humaine',
    out: 'Résultat & données',
  },

  workflows: [
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
        'Une boucle unique, de la stratégie au recyclage, avec exactement un point de contrôle humain : la validation avant toute mise en ligne.',
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
      note: 'Tout ce que vous voyez dans cette section tourne réellement sous le formulaire, plus bas sur cette page.',
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
      note: "Un budget média n'est jamais un abonnement logiciel. Logiciel, consommation API et budget publicitaire sont trois lignes distinctes dans tous les budgets que je construis.",
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
  ],

  data: {
    eyebrow: 'Data & Analytics',
    title: 'Six sources, un dashboard, une décision à la fois',
    intro:
      'Le reporting n’est pas un rituel mensuel. C’est le mécanisme qui dit au système quoi changer — et il ne fonctionne que si toutes les sources atterrissent au même endroit.',
    sourcesLabel: 'Sources',
    pipelineLabel: 'Pipeline',
    sources: ['GA4', 'Search Console', 'Meta Ads', 'Google Ads', 'CRM', 'Plateforme email'],
    pipeline: [
      { label: 'Dashboard', detail: 'Une vue consolidée de toutes les sources', kind: 'out' },
      { label: 'Analyse IA', detail: 'Anomalies, tendances, corrélations', kind: 'ai' },
      { label: 'Insights', detail: 'Ce qui a réellement changé, et pourquoi' },
      { label: 'Recommandations', detail: 'Classées par impact attendu', kind: 'ai' },
      { label: 'Optimisation', detail: 'Appliquée, puis mesurée à nouveau', kind: 'human' },
    ],
    tools: [
      { name: 'Looker Studio', note: 'Gratuit, natif à GA4 et Google Ads' },
      { name: 'Power BI', note: 'Modèles gouvernés et partage à l’échelle de l’organisation' },
      { name: 'Sheets / Excel', note: 'Modélisation et transmissions rapides' },
    ],
  },

  stack: {
    eyebrow: 'Stack technologique',
    title: 'Les outils avec lesquels je travaille vraiment',
    intro:
      'Aucun outil n’est ici par effet de mode. Chacun gagne sa place en faisant un travail qu’aucun autre de la stack ne fait déjà.',
    toolsUsed: 'Outils utilisés',
    categories: {
      ai: 'IA',
      automation: 'Automatisation',
      crm: 'CRM',
      email: 'Email',
      social: 'Réseaux sociaux',
      design: 'Design',
      advertising: 'Publicité',
      seo: 'SEO',
      analytics: 'Analytics',
      infrastructure: 'Infrastructure',
    },
  },

  pricing: {
    eyebrow: 'Tarifs & coût réel',
    title: 'Combien coûte réellement un système marketing piloté par l’IA ?',
    intro:
      'Des prix officiels, réels et sourcés — convertis en direct en USD, EUR, MAD et XAF. Changez de devise, de cycle de facturation, ou modifiez vous-même les taux de change.',
    currencyGroup: 'Devise d’affichage',
    billingGroup: 'Cycle de facturation',
    monthly: 'Mensuel',
    annual: 'Annuel',
    fxTitle: 'Taux de change',
    fxBase: 'Base USD',
    fxUpdated: 'mis à jour le',
    fxEdit: 'Modifier les taux',
    fxHide: 'Masquer les taux',
    fxRateLabel: '1 USD =',
    fxNote: [
      'Tous les montants de cette page sont calculés à partir de ces taux — rien n’est codé en dur. Le XAF est le franc CFA d’Afrique centrale (zone CEMAC), arrimé à 1 EUR = 655,957 XAF ; c’est une devise différente du XOF (Afrique de l’Ouest). Source :',
      '. À revérifier avant tout chiffrage client.',
    ],
    fxSourceLink: 'taux interbancaires en direct',
    mostCommon: 'Le plus courant',
    perMonth: '/ mois',
    billedAnnually: 'Facturé annuellement —',
    saving: 'd’économie',
    noAnnualDiscount: 'pas de remise annuelle sur ces offres',
    atMonthlyRate: 'au tarif mensuel',
    extraUsageLines: 'à la consommation ou média en sus',
    monthlyCost: 'Coût mensuel',
    annualCost: 'Coût annuel',
    notIncluded: 'Non inclus :',
    buildThisStack: 'Construire cette stack avec moi',
    tcoTitle: 'Coût total de possession (TCO)',
    tcoIntro:
      'Une ligne logiciel ne fait pas un budget. Huit postes de coût composent le chiffre réel — et les quatre les plus souvent oubliés sont la consommation API, le budget publicitaire, la mise en place et la maintenance. Ajustez-les ci-dessous.',
    referenceStack: 'Stack de référence',
    tcoApi: 'API / consommation',
    tcoMedia: 'Budget média',
    tcoImplementation: 'Mise en place',
    tcoMaintenance: 'Maintenance',
    tcoSoftware: 'Logiciels + abonnements IA',
    tcoApiRow: 'Coût API / consommation',
    tcoMediaRow: 'Budget média publicitaire',
    tcoImplementationRow: 'Mise en place (lissée sur 12 mois)',
    tcoMaintenanceRow: 'Maintenance',
    tcoTotalMonthly: 'Total par mois',
    tcoTotalYearOne: 'Total première année',
    bloatBanner: 'Vous n’avez pas besoin de tous les outils. Vous avez besoin du bon système.',
    bloatIntro:
      'Stack minimale nécessaire → efficacité opérationnelle maximale. Ci-dessous, le score de redondance : à quel point chaque paire d’outils se recouvre, et ce qui peut être fusionné sans risque. Chaque outil supprimé, c’est un abonnement en moins, une intégration en moins, et une chose de moins qui casse à 2h du matin.',
    overlap: 'de recouvrement',
    tableTitle: 'Chaque outil, chaque offre, quatre devises',
    tableIntro:
      'Les prix sont les tarifs officiels publiés par l’éditeur, dans sa propre devise de facturation ; les trois autres colonnes sont converties avec les taux ci-dessus. Lorsqu’un prix n’est pas publié, la ligne le dit plutôt que de deviner.',
    tableCaption:
      'Tarifs officiels de chaque outil de la stack, en facturation mensuelle et annuelle, en USD, EUR, MAD et XAF.',
    tableFootnote:
      'La devise de facturation d’origine est le USD pour toutes les lignes ci-dessus ; MAD, EUR et XAF sont des conversions. Les lignes marquées « À vérifier » varient selon la région, le volume de contacts ou la négociation — confirmez toujours sur la page tarifaire de l’éditeur avant de chiffrer. Les éditeurs changent leurs prix sans préavis.',
    columns: {
      tool: 'Outil',
      category: 'Catégorie',
      plan: 'Offre',
      model: 'Modèle',
      monthly: 'Mensuel',
      annualPerMonth: 'Annuel / mois',
      annualTotal: 'Total annuel',
      savingPerYear: 'Économie / an',
      users: 'Utilisateurs',
      limits: 'Limites & coûts variables',
      verified: 'Vérifié le',
    },
    officialPricing: 'Tarif officiel ↗',
    verifyBadge: 'À vérifier',
    notPublished: 'Non publié',
    models: {
      free: 'Gratuit',
      flat: 'Forfait',
      'per-user': 'Par utilisateur',
      usage: 'À la consommation',
      'contact-sales': 'Sur devis',
      'media-spend': 'Budget média',
    },
    costTypes: {
      software: {
        label: '1 · Abonnement logiciel',
        description: 'Licences récurrentes : CRM, plateforme email, planificateur social, suite SEO.',
      },
      'ai-subscription': {
        label: '2 · Abonnement IA',
        description: 'Sièges ChatGPT, Claude, Gemini utilisés par des humains au quotidien.',
      },
      api: {
        label: '3 · Coût API',
        description:
          'Tokens consommés par l’IA à l’intérieur des automatisations. À l’usage, sans plafond par défaut.',
      },
      automation: {
        label: '4 · Coût d’automatisation',
        description: 'Make, Zapier ou n8n — facturés à l’opération, à la tâche ou à l’exécution.',
      },
      advertising: {
        label: '5 · Budget média publicitaire',
        description:
          'Budget Meta Ads et Google Ads. C’est du média, PAS du logiciel. Ne fusionnez jamais les deux.',
      },
      data: {
        label: '6 · Coût data & analytics',
        description: 'GA4, Search Console, Looker Studio, licences Power BI et connecteurs.',
      },
      implementation: {
        label: '7 · Coût de mise en place',
        description:
          'Conception et construction ponctuelles du système : architecture, workflows, migration.',
      },
      maintenance: {
        label: '8 · Coût de maintenance',
        description:
          'Supervision, correction des scénarios cassés, entretien des prompts, itération. À budgéter systématiquement.',
      },
    },
    redundancy: {
      email: {
        group: 'Brevo vs Mailchimp',
        overlap: 'Les deux sont des plateformes complètes d’email marketing et d’automatisation.',
        verdict:
          'Gardez-en un. Brevo est moins cher à faible volume de contacts, Mailchimp à faible volume d’envois.',
      },
      automation: {
        group: 'Make vs Zapier vs n8n',
        overlap: 'Trois réponses à la même question : comment mes outils se parlent-ils ?',
        verdict:
          'Gardez-en un. Make pour la profondeur visuelle, Zapier pour la couverture, n8n pour maîtriser l’infrastructure.',
      },
      hubspot: {
        group: 'HubSpot Marketing Pro vs (Brevo + Make)',
        overlap: 'Lead scoring, nurturing et workflows existent dans les deux configurations.',
        verdict:
          'En dessous de quelques milliers de contacts, Brevo + Make fait le travail pour une fraction du prix.',
      },
      social: {
        group: 'Metricool vs Meta Business Suite',
        overlap: 'Programmation et analytics pour les plateformes Meta.',
        verdict: 'Meta Business Suite seul suffit si Facebook et Instagram sont vos seuls réseaux.',
      },
      ai: {
        group: 'ChatGPT vs Claude vs Gemini',
        overlap: 'Des assistants généralistes aux capacités largement redondantes.',
        verdict: 'Deux est un maximum raisonnable. Un troisième abonnement se rentabilise rarement.',
      },
      bi: {
        group: 'Power BI vs Looker Studio',
        overlap: 'Dashboards et reporting sur les mêmes sources marketing.',
        verdict:
          'Looker Studio est gratuit et natif à GA4/Ads. Power BI justifie sa licence sur la gouvernance.',
      },
    },
    stacks: {
      starter: {
        name: 'Starter',
        tagline: 'Prouvez que le système fonctionne avant de payer pour lui.',
        audience: ['Freelances', 'Consultants indépendants', 'Petites entreprises', 'Première automatisation'],
        implementationNote:
          'Mise en place ponctuelle : formulaires, pipeline CRM, 2 à 3 automatisations, plan de tracking.',
        mediaBudgetNote: 'La publicité est optionnelle à ce stade — organique et email d’abord.',
      },
      professional: {
        name: 'Professional',
        tagline: 'Un vrai moteur d’acquisition : contenu, leads, CRM, nurturing, reporting.',
        audience: ['PME', 'Équipes marketing internes', 'Génération de leads', 'CRM + automatisation'],
        implementationNote:
          'Construction complète : capture de leads, scoring, séquences de nurturing, dashboards.',
        mediaBudgetNote:
          'Prévoyez un budget média Meta/Google distinct — jamais dans la ligne logiciel.',
      },
      advanced: {
        name: 'Advanced',
        tagline: 'Orchestration multi-outils, données gouvernées, reporting niveau agence.',
        audience: ['Entreprises structurées', 'Équipes marketing', 'Systèmes multi-outils', 'Data & reporting'],
        implementationNote:
          'Architecture, migration, gouvernance, orchestration multi-workflows, formation.',
        mediaBudgetNote:
          'Le budget média est en général la plus grosse ligne — suivez-le sur sa propre ligne de compte de résultat.',
      },
    },
    currencyNames: {
      USD: 'Dollar américain',
      EUR: 'Euro',
      MAD: 'Dirham marocain',
      XAF: 'Franc CFA d’Afrique centrale (CEMAC)',
    },
    fxSource: 'Taux interbancaires indicatifs — à rafraîchir avant tout chiffrage client',
    fxPegNote: '1 EUR = 655,957 XAF (parité fixe CEMAC)',
  },

  services: {
    eyebrow: 'Services',
    title: 'Mes services',
    intro:
      'Chaque mission commence par des faits et se termine par quelque chose qui tourne. Pas un deck de 60 slides que personne n’ouvre deux fois.',
    cta: 'Demander ce service',
    list: [
      {
        id: 'digital-marketing-audit',
        title: 'Audit Marketing Digital',
        description:
          'Une lecture complète de votre présence et de vos performances digitales : canaux, tunnel, contenu, tracking, et où sont les fuites.',
        deliverables: ['Audit des canaux', 'Analyse du tunnel', 'Revue du tracking', 'Actions prioritaires'],
        formValue: 'digital-marketing-audit',
        icon: 'audit',
      },
      {
        id: 'ai-marketing-audit',
        title: 'Audit Marketing IA',
        description:
          "Là où l'IA crée réellement de la valeur dans votre marketing — et, tout aussi important, là où elle n'ajouterait que du bruit.",
        deliverables: ['Cartographie des cas d’usage', 'Matrice effort/impact', 'Sélection d’outils', 'Feuille de route'],
        formValue: 'ai-marketing-audit',
        icon: 'ai',
      },
      {
        id: 'marketing-automation-audit',
        title: 'Audit Marketing Automation',
        description:
          'Chaque processus répétitif de votre marketing, cartographié, chronométré et classé selon ce que son automatisation rapporterait.',
        deliverables: ['Inventaire des processus', 'Modèle de coût-temps', 'Backlog d’automatisation', 'Gains rapides'],
        formValue: 'marketing-automation-audit',
        icon: 'automation',
      },
      {
        id: 'ai-automation-consulting',
        title: 'Conseil Automatisation IA',
        description:
          'La conception du système réel : agents, workflows, flux de données, points de validation et les humains qui gardent chaque décision.',
        deliverables: ['Architecture du système', 'Spécifications des workflows', 'Bibliothèque de prompts', 'Règles de gouvernance'],
        formValue: 'ai-automation-consulting',
        icon: 'system',
      },
      {
        id: 'crm-lead-automation',
        title: 'CRM & Automatisation des leads',
        description:
          'Le parcours prospect, structuré et automatisé de bout en bout : capture, scoring, segmentation, nurturing, passage aux ventes.',
        deliverables: ['Structure du CRM', 'Modèle de lead scoring', 'Séquences de nurturing', 'Alertes commerciales'],
        formValue: 'crm-consulting',
        icon: 'crm',
      },
      {
        id: 'digital-marketing-strategy',
        title: 'Stratégie Marketing Digital',
        description:
          'Positionnement, audiences, mix de canaux, plan de contenu et budget — une stratégie que votre équipe peut exécuter sans traducteur.',
        deliverables: ['Positionnement', 'Plan de canaux', 'Stratégie de contenu', 'Modèle budgétaire'],
        formValue: 'digital-marketing-strategy',
        icon: 'strategy',
      },
      {
        id: 'data-analytics',
        title: 'Data & Marketing Analytics',
        description:
          'Un plan de mesure qui survit au réel : KPI, tracking propre, dashboards et un rythme de reporting tenable.',
        deliverables: ['Cadre de KPI', 'Plan de tracking', 'Dashboards', 'Reporting mensuel'],
        formValue: 'data-analytics',
        icon: 'analytics',
      },
      {
        id: 'ai-marketing-transformation',
        title: 'Transformation Marketing par l’IA',
        description:
          "Intégration progressive de l'IA dans le fonctionnement réel de votre marketing — avec l'équipe, pas à côté d'elle.",
        deliverables: ['Diagnostic de maturité', 'Feuille de route par phases', 'Montée en compétences', 'Conduite du changement'],
        formValue: 'ai-automation-consulting',
        icon: 'transform',
      },
    ],
  },

  process: {
    eyebrow: 'Ma méthode',
    title: 'Cinq étapes, dans cet ordre, à chaque fois',
    intro:
      'L’ordre compte. Concevoir un système avant d’auditer l’existant, c’est la meilleure façon d’automatiser plus vite un processus cassé.',
    steps: [
      { step: '01', title: 'Découverte', body: 'Un échange structuré sur votre activité, votre tunnel et ce qui le ralentit vraiment.' },
      { step: '02', title: 'Audit', body: 'Je cartographie la stack, les processus, les données et les manques — aucune recommandation sans preuve.' },
      { step: '03', title: 'Conception du système', body: 'L’architecture : quel agent fait quoi, quel workflow se déclenche quand, et où un humain doit rester dans la boucle.' },
      { step: '04', title: 'Construction & connexion', body: 'Automatisations, CRM, formulaires, séquences et tracking sont implémentés puis reliés entre eux.' },
      { step: '05', title: 'Mesure & optimisation', body: 'Les dashboards passent en production, le système produit de la donnée, et la donnée pilote l’itération suivante.' },
    ],
  },

  principles: {
    eyebrow: 'Principes de conception',
    title: 'Les règles que tout système que je construis doit respecter',
    items: [
      { title: 'Simplicité', body: "N'utilisez pas 30 outils quand 8 suffisent. Chaque outil en trop est un point de panne en plus." },
      { title: 'Automatisation', body: 'Tout ce qui est répétitif, régi par des règles et à fort volume revient à la machine.' },
      { title: 'Contrôle humain', body: 'Stratégie, marque, budget et décisions sensibles restent à une personne. Toujours.' },
      { title: 'Data', body: 'Toute automatisation qui compte doit laisser derrière elle des données exploitables.' },
      { title: 'ROI', body: 'Chaque outil doit justifier sa ligne dans le budget. S’il ne peut pas, il sort.' },
      { title: 'Scalabilité', body: 'Le système doit survivre à une entreprise qui grandit d’un facteur 10, sans tout reconstruire.' },
      { title: 'Sécurité', body: 'Les données des prospects sont un risque tant qu’elles ne sont pas protégées. À traiter comme tel.' },
      { title: 'Conversion', body: 'Chaque section, chaque email, chaque workflow existe pour faire avancer quelqu’un d’un pas.' },
    ],
  },

  contact: {
    eyebrow: 'Parlons-en',
    title: 'Construisons votre système marketing intelligent',
    intro:
      'Parlez-moi de votre activité, de vos difficultés et de ce que vous voulez automatiser. Plus vous serez concret, plus ma première réponse vous sera utile.',
    emailMe: 'M’écrire',
    callMe: 'M’appeler',
    whatsapp: 'WhatsApp',
    whatsappSub: 'Message direct — la réponse la plus rapide',
    locationSub: 'J’accompagne des clients en Afrique et en Europe',
    afterTitle: 'Ce qui se passe après l’envoi',
    afterSteps: [
      '1 — Vos données sont validées côté serveur.',
      '2 — Le lead est enregistré en base de données.',
      '3 — Un score de qualification est calculé et stocké.',
      '4 — Vous voyez une confirmation immédiate.',
      '5 — Je suis notifié, avec tout votre contexte.',
      '6 — Je réponds personnellement, en général sous un jour ouvré.',
    ],
  },

  form: {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email professionnel',
    emailHint: 'Un domaine d’entreprise obtient un meilleur score qu’une boîte gratuite.',
    phone: 'Téléphone / WhatsApp',
    country: 'Pays',
    countryPlaceholder: 'Choisir un pays',
    company: 'Entreprise',
    companyPlaceholder: 'Nom de l’entreprise',
    jobTitle: 'Fonction',
    jobTitlePlaceholder: 'Responsable marketing',
    service: 'Que recherchez-vous ?',
    servicePlaceholder: 'Choisir un service',
    budget: 'Budget',
    budgetPlaceholder: 'Choisir une tranche',
    message: 'Parlez-moi de votre projet ou de votre problème',
    messageHint: 'Ce que vous cherchez à automatiser, ce qui vous ralentit, ce que vous avez déjà essayé.',
    messagePlaceholder:
      'Nous publions notre contenu à la main, nos leads finissent dans un tableur et personne ne relance. Nous aimerions…',
    consent: 'J’accepte que mes informations soient utilisées pour me recontacter au sujet de ma demande.',
    privacyLink: 'Politique de confidentialité',
    submit: 'Demander ma consultation',
    submitting: 'Envoi en cours…',
    footnote:
      'Validée, enregistrée, scorée et notifiée automatiquement — exactement le pipeline de leads décrit plus haut sur cette page.',
    required: '(obligatoire)',
    honeypot: 'Laissez ce champ vide',
    captchaLabel: 'Vérification anti-spam',
    successTitle: 'Demande reçue.',
    successBody:
      'Je lis personnellement chaque demande et je réponds en général sous un jour ouvré. Si c’est urgent, WhatsApp est le canal le plus rapide.',
    duplicateBody:
      'Votre demande a déjà été reçue — je reviens vers vous très vite.',
    sendAnother: 'Envoyer une autre demande',
    errorTitle: 'Votre demande n’a pas été envoyée.',
    errors: {
      firstName: 'Merci d’indiquer votre prénom.',
      lastName: 'Merci d’indiquer votre nom.',
      email: 'Merci d’indiquer une adresse email valide.',
      service: 'Merci d’indiquer ce que vous recherchez.',
      consent: 'Votre consentement est obligatoire.',
      generic: 'Une erreur est survenue. Merci de réessayer.',
      network: 'Erreur réseau. Vérifiez votre connexion, ou écrivez-moi à christguimeni@gmail.com.',
    },
    serviceOptions: [
      { value: 'digital-marketing-audit', label: 'Audit Marketing Digital' },
      { value: 'ai-marketing-audit', label: 'Audit Marketing IA' },
      { value: 'marketing-automation-audit', label: 'Audit Marketing Automation' },
      { value: 'ai-automation-consulting', label: 'Conseil Automatisation IA' },
      { value: 'crm-consulting', label: 'Conseil CRM' },
      { value: 'seo-consulting', label: 'Conseil SEO' },
      { value: 'digital-marketing-strategy', label: 'Stratégie Marketing Digital' },
      { value: 'data-analytics', label: 'Data & Analytics' },
      { value: 'other', label: 'Autre' },
    ],
    budgetOptions: [
      { value: 'lt-500', label: 'Moins de 500 €' },
      { value: '500-1000', label: '500 € – 1 000 €' },
      { value: '1000-3000', label: '1 000 € – 3 000 €' },
      { value: '3000-5000', label: '3 000 € – 5 000 €' },
      { value: '5000-plus', label: '5 000 € et plus' },
      { value: 'undecided', label: 'Pas encore défini' },
    ],
    countries: [
      { value: 'MA', label: 'Maroc' },
      { value: 'CM', label: 'Cameroun' },
      { value: 'CG', label: 'Congo' },
      { value: 'GA', label: 'Gabon' },
      { value: 'TD', label: 'Tchad' },
      { value: 'CF', label: 'République centrafricaine' },
      { value: 'GQ', label: 'Guinée équatoriale' },
      { value: 'CI', label: "Côte d'Ivoire" },
      { value: 'SN', label: 'Sénégal' },
      { value: 'FR', label: 'France' },
      { value: 'BE', label: 'Belgique' },
      { value: 'CH', label: 'Suisse' },
      { value: 'CA', label: 'Canada' },
      { value: 'US', label: 'États-Unis' },
      { value: 'GB', label: 'Royaume-Uni' },
      { value: 'OTHER', label: 'Autre' },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Les questions qu’on me pose avant chaque projet',
    items: [
      {
        q: 'Qu’est-ce que le marketing automation piloté par l’IA ?',
        a: "C'est la conception d'un système marketing où l'IA, les outils d'automatisation, votre CRM et vos données sont reliés entre eux plutôt qu'utilisés côte à côte. Contenu, capture de leads, scoring, nurturing, reporting et optimisation tournent comme une seule boucle au lieu d'une dizaine de tâches manuelles. Les outils sont la partie facile — le vrai travail, c'est l'architecture.",
      },
      {
        q: 'L’IA peut-elle remplacer complètement une équipe marketing ?',
        a: "Non, et construire comme si c'était le cas est exactement la façon dont une entreprise se retrouve avec un marketing rapide, sûr de lui et hors marque. L'IA excelle sur le volume, la détection de motifs et les premiers jets. La stratégie, le jugement de marque, les arbitrages budgétaires et la relation client restent humains. Ma règle : automatiser le répétitif, augmenter le stratégique, humaniser les décisions critiques.",
      },
      {
        q: 'Qu’est-ce qui peut réellement être automatisé ?',
        a: "La recherche d'idées et la rédaction, les calendriers éditoriaux, l'adaptation par plateforme, la programmation et la publication, la capture de leads et la création des fiches CRM, le lead scoring, la segmentation, les séquences de nurturing, les alertes commerciales, le suivi des performances publicitaires, les briefs et le monitoring SEO, les dashboards et le reporting. Ce qui ne peut pas l'être : la décision de ce que votre entreprise doit représenter.",
      },
      {
        q: 'Combien coûte un système de marketing automation ?',
        a: "La section tarifs de cette page y répond avec des chiffres réels et sourcés, en USD, EUR, MAD et XAF. Une stack Starter peut se monter pour très peu — plusieurs des meilleurs outils ont des versions gratuites réellement utilisables. Une stack Professional se situe généralement autour de quelques centaines de dollars par mois. Le coût total de possession inclut aussi la consommation API, le budget publicitaire, la mise en place et la maintenance — quatre lignes que la plupart des budgets oublient.",
      },
      {
        q: 'Ai-je besoin de tous ces outils ?',
        a: "Presque certainement pas. L'accumulation d'outils est l'erreur la plus fréquente et la plus coûteuse que je rencontre. Brevo et Mailchimp font le même travail. Make, Zapier et n8n font le même travail. Trois abonnements IA valent rarement mieux que deux. L'analyse de redondance sur cette page montre exactement quels outils se recouvrent et ce qui peut être fusionné.",
      },
      {
        q: 'Pouvez-vous auditer ma stack marketing actuelle ?',
        a: "Oui — c'est généralement le bon point de départ. L'audit couvre ce que vous payez, ce que vous utilisez réellement, les processus encore manuels, les données perdues entre les outils, et le retour réaliste qu'apporterait l'automatisation de chaque processus. Vous repartez avec un backlog priorisé, pas avec un jeu de slides.",
      },
      {
        q: 'Pouvez-vous construire un système d’automatisation sur mesure ?',
        a: "Oui. Découverte, audit, conception du système, construction et mesure. Je conçois l'architecture — quel agent fait quoi, quel workflow se déclenche quand, où se place un point de validation humaine — je l'implémente sur votre stack, puis je vous remets une documentation que votre équipe peut maintenir.",
      },
      {
        q: 'Comment demander une consultation ?',
        a: "Remplissez le formulaire de cette page et choisissez le service qui vous intéresse. Chaque demande est validée, enregistrée, scorée automatiquement et déclenche une notification : je vois donc immédiatement les demandes qualifiées. Vous pouvez aussi me joindre directement par email, téléphone ou WhatsApp — les boutons de cette page sont fonctionnels.",
      },
    ],
  },

  cta: {
    title: 'Prêt à construire un système marketing plus intelligent ?',
    body: 'Identifions ensemble ce qui peut être automatisé, ce qui doit rester humain, et là où l’IA crée le plus de valeur.',
    audit: 'Demander un audit',
    consult: 'Réserver une consultation',
  },

  footer: {
    navigate: 'Navigation',
    legal: 'Mentions légales',
    contact: 'Contact',
    dashboard: 'Tableau de bord des leads',
    rights: 'Tous droits réservés.',
    links: [
      { label: 'À propos', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: "Système d'automatisation", href: '#system' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Contact', href: '#contact' },
      { label: 'Politique de confidentialité', href: '/privacy' },
      { label: "Conditions d'utilisation", href: '/terms' },
    ],
  },

  legal: {
    backToSite: '← Retour au site',
    updated: 'Dernière mise à jour :',
    privacy: {
      title: 'Politique de confidentialité',
      description:
        'Comment Mr GUEHEDI Emmanuel collecte, stocke, utilise et protège les données personnelles transmises via ce site.',
      sections: [
        {
          heading: '1. Qui est responsable de vos données',
          paragraphs: [
            'Mr GUEHEDI Emmanuel, spécialiste marketing digital et automatisation IA, établi à {location}, est le responsable du traitement des données personnelles collectées via ce site. Vous pouvez me joindre à {email} ou au {phone}.',
          ],
        },
        {
          heading: '2. Quelles données sont collectées',
          paragraphs: ['Via le formulaire de contact de ce site, je ne collecte que ce que vous transmettez :'],
          bullets: [
            'Prénom et nom',
            'Adresse email professionnelle',
            'Numéro de téléphone / WhatsApp (facultatif)',
            'Pays, entreprise et fonction (facultatifs)',
            'Le service qui vous intéresse et votre tranche de budget',
            'Le message que vous rédigez',
            'Le contexte technique : la page depuis laquelle vous avez envoyé le formulaire, et les paramètres de campagne UTM si vous êtes arrivé par un lien de campagne',
          ],
        },
        {
          heading: '3. Le score de qualification',
          paragraphs: [
            'Un score est calculé automatiquement à partir des champs ci-dessus. Il s’agit uniquement d’une aide interne à la priorisation : il ne produit aucun effet juridique et aucune décision n’est prise sur ce seul fondement.',
          ],
        },
        {
          heading: '4. Pourquoi elles sont collectées — et sur quelle base légale',
          paragraphs: [
            'Vos données servent exclusivement à répondre à votre demande, à préparer une proposition et à assurer le suivi de nos échanges. La base légale est votre consentement explicite, donné en cochant la case avant l’envoi du formulaire, ainsi que les mesures précontractuelles prises à votre demande.',
            'Je ne vends pas vos données, je ne les loue pas, et je ne les transmets à aucun tiers pour son propre marketing.',
          ],
        },
        {
          heading: '5. Où elles sont stockées',
          paragraphs: [
            'Les demandes sont enregistrées dans une base de données PostgreSQL (Supabase) dont l’accès m’est réservé. Les données peuvent être transmises aux sous-traitants suivants, utilisés strictement pour faire fonctionner ce site et assurer mon suivi : l’hébergeur, le fournisseur d’emails transactionnels et, le cas échéant, un CRM ou une plateforme d’automatisation utilisés pour gérer l’échange.',
          ],
        },
        {
          heading: '6. Combien de temps elles sont conservées',
          paragraphs: [
            'Les demandes qui ne débouchent pas sur une collaboration sont conservées au maximum 3 ans à compter de notre dernier contact, puis supprimées. Les données liées à une mission signée sont conservées pendant la durée du contrat, puis selon les durées légales applicables aux documents commerciaux et comptables.',
          ],
        },
        {
          heading: '7. Vos droits',
          paragraphs: [
            'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et de portabilité de vos données, d’un droit d’opposition au traitement, et du droit de retirer votre consentement à tout moment — sans effet sur les traitements réalisés avant ce retrait. Écrivez à {email} et je vous répondrai sous un mois.',
            'Au Maroc, vous pouvez également saisir la CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel). Si vous résidez dans l’Union européenne, vous pouvez saisir l’autorité de contrôle de votre pays.',
          ],
        },
        {
          heading: '8. Cookies et mesure d’audience',
          paragraphs: [
            'Ce site ne charge aucun cookie de mesure d’audience ou de publicité tant que la balise correspondante n’a pas été explicitement configurée par l’éditeur du site. Lorsque Google Analytics 4, Google Tag Manager, le pixel Meta ou le tag LinkedIn Insight sont actifs, ils déposent des cookies de mesure d’audience et d’attribution de campagne.',
            'Une petite quantité de données est également conservée dans le stockage de session de votre navigateur pour mémoriser la campagne qui vous a amené ici ; elle ne quitte jamais votre navigateur tant que vous n’envoyez pas le formulaire. Votre choix de langue est enregistré dans un cookie fonctionnel.',
          ],
        },
        {
          heading: '9. Sécurité',
          paragraphs: [
            'Les données transitent en HTTPS, sont validées et nettoyées côté serveur, sont protégées par une limitation du débit contre les abus et par des mécanismes anti-spam. L’accès d’administration est authentifié et restreint. Aucun identifiant ni clé d’API n’est jamais exposé dans le navigateur.',
          ],
        },
        {
          heading: '10. Modifications',
          paragraphs: [
            'Cette politique peut être mise à jour. La date en haut de cette page correspond toujours à la version en vigueur.',
          ],
        },
      ],
    },
    terms: {
      title: 'Conditions d’utilisation',
      description:
        'Conditions d’utilisation du site de Mr GUEHEDI Emmanuel, spécialiste marketing digital et automatisation IA.',
      sections: [
        {
          heading: '1. Éditeur du site',
          paragraphs: [
            'Ce site est édité par Mr GUEHEDI Emmanuel, spécialiste marketing digital et automatisation IA, {location}. Contact : {email} · {phone}.',
          ],
        },
        {
          heading: '2. Objet du site',
          paragraphs: [
            'Ce site présente mon expertise professionnelle et mes services, et vous permet de demander un audit ou une consultation. L’envoi du formulaire ne crée aucun contrat : il ouvre une conversation. Toute mission est encadrée par une proposition écrite distincte.',
          ],
        },
        {
          heading: '3. Informations tarifaires',
          paragraphs: [
            'La section tarifs répertorie les prix de logiciels tiers publiés par leurs éditeurs respectifs, accompagnés de la date de vérification de chaque montant et d’un lien vers la page tarifaire officielle correspondante. Ces éditeurs modifient leurs prix sans préavis, les tarifs varient selon la région, le volume de contacts, le nombre de sièges et la négociation, et les conversions de devises utilisent des taux indicatifs que vous pouvez modifier sur la page.',
            'Ces chiffres sont fournis à titre d’orientation uniquement. Ils ne constituent ni une offre, ni un devis, ni une garantie du prix qui vous sera facturé par un éditeur. Confirmez toujours sur la page tarifaire officielle de l’éditeur avant toute décision d’achat. Les marques et noms de produits appartiennent à leurs détenteurs respectifs ; leur mention ici n’implique aucun partenariat ni aucune approbation.',
          ],
        },
        {
          heading: '4. Propriété intellectuelle',
          paragraphs: [
            'La structure, les textes, l’identité visuelle, les schémas et les cadres méthodologiques présentés sur ce site sont mon travail et sont protégés. Vous pouvez les citer avec attribution ; vous ne pouvez pas reproduire le site ou des parties substantielles de celui-ci à des fins commerciales sans autorisation écrite.',
          ],
        },
        {
          heading: '5. Responsabilité',
          paragraphs: [
            'Le contenu de ce site est fourni à titre informatif. Je m’efforce de le maintenir exact et à jour, mais je ne garantis ni son exhaustivité ni son absence d’erreur, et je ne saurais être tenu responsable des décisions prises sur cette seule base. Les recommandations formulées dans le cadre d’une mission rémunérée sont régies par les conditions propres à cette mission.',
          ],
        },
        {
          heading: '6. Liens externes',
          paragraphs: [
            'Ce site renvoie vers des sites tiers, principalement des pages tarifaires d’éditeurs. Je n’ai aucun contrôle sur leur contenu et n’en assume aucune responsabilité.',
          ],
        },
        {
          heading: '7. Données personnelles',
          paragraphs: [
            'Le traitement des données personnelles est décrit dans la politique de confidentialité, accessible depuis le pied de page.',
          ],
        },
        {
          heading: '8. Droit applicable',
          paragraphs: [
            'Les présentes conditions sont régies par le droit marocain. Tout litige sera porté devant les tribunaux compétents de Casablanca, sauf disposition impérative contraire.',
          ],
        },
      ],
    },
  },

  tools: toolsFr,
};
