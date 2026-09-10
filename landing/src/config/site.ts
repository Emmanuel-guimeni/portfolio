/**
 * Source unique de vérité pour l'identité, les coordonnées et la navigation.
 * Modifiez un numéro ou un email ici et il change partout sur le site.
 */

export const site = {
  name: 'Mr GUEHEDI Emmanuel',
  shortName: 'GUEHEDI Emmanuel',
  initials: 'GE',
  role: 'Spécialiste Marketing Digital & Automatisation IA',
  roleShort: 'Marketing Digital & Automatisation IA',
  degree: 'Master en Marketing Digital & E-commerce',
  positioning:
    'Marketing Digital • Intelligence Artificielle • Marketing Automation • Data • Growth',
  headline: 'Transformez votre marketing digital en un système intelligent et automatisé',
  manifesto:
    "Je ne me contente pas d'utiliser des outils d'IA. Je conçois des systèmes marketing intelligents qui relient IA, automatisation, data et croissance.",
  signature: [
    'Automatiser le répétitif.',
    'Augmenter le stratégique.',
    'Humaniser les décisions critiques.',
  ],
  philosophy:
    "L'avenir du marketing, ce ne sont pas plus d'outils. Ce sont des systèmes mieux connectés.",
  location: {
    city: 'Casablanca',
    country: 'Maroc',
    countryCode: 'MA',
    label: 'Casablanca – Maroc',
  },
  email: 'christguimeni@gmail.com',
  phone: {
    /** Format E.164, utilisé pour les liens tel: et WhatsApp */
    e164: '+212779635685',
    display: '+212 779 63 56 85',
  },
  whatsapp: {
    number: '212779635685',
    prefilledMessage:
      'Bonjour Emmanuel, je souhaite échanger avec vous concernant vos services de Digital Marketing & AI Automation.',
  },
  /**
   * Réseaux sociaux. N'ajoutez une entrée que si vous avez une URL RÉELLE et
   * vérifiée — n'en inventez jamais. Les entrées dont l'`url` est vide ne sont
   * pas affichées.
   */
  socials: [
    { label: 'LinkedIn', url: '', icon: 'linkedin' as const },
  ],
} as const;

/** Liens mailto: / tel: / wa.me, dérivés pour ne jamais se désynchroniser. */
export const links = {
  mailto: `mailto:${site.email}?subject=${encodeURIComponent(
    'Demande — Marketing Digital & Automatisation IA',
  )}`,
  tel: `tel:${site.phone.e164}`,
  whatsapp: `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
    site.whatsapp.prefilledMessage,
  )}`,
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'Le système', href: '#system' },
  { label: 'Agents IA', href: '#agents' },
  { label: 'Automatisation', href: '#automation' },
  { label: 'Stack', href: '#stack' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
];

export const footerNav: NavItem[] = [
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: "Système d'automatisation", href: '#system' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
  { label: 'Politique de confidentialité', href: '/privacy' },
  { label: "Conditions d'utilisation", href: '/terms' },
];

/** Chiffres clés affichés dans le bandeau sous le hero. Restez honnête. */
export const heroStats = [
  { value: '7', label: 'Agents marketing IA', sub: 'conçus et orchestrés' },
  { value: '9', label: 'Workflows automatisés', sub: 'contenu → CRM → data' },
  { value: '20+', label: 'Outils analysés', sub: 'avec leurs tarifs officiels' },
  { value: '4', label: 'Devises', sub: 'USD · EUR · MAD · XAF' },
] as const;
