/**
 * Single source of truth for identity, contact details and navigation.
 * Change a phone number or an email here and it updates everywhere on the site.
 */

export const site = {
  name: 'Mr GUEHEDI Emmanuel',
  shortName: 'GUEHEDI Emmanuel',
  initials: 'GE',
  role: 'Digital Marketing & AI Automation Specialist',
  degree: 'Master en Marketing Digital & E-commerce',
  positioning:
    'Digital Marketing • Artificial Intelligence • Marketing Automation • Data • Growth',
  headline: 'Transform Digital Marketing Into an Intelligent Automated System',
  manifesto:
    "I don't just use AI tools. I design intelligent marketing systems that connect AI, automation, data and growth.",
  signature: [
    'Automate the repetitive.',
    'Augment the strategic.',
    'Humanize the critical decisions.',
  ],
  philosophy:
    'The future of marketing is not more tools. It is better-connected systems.',
  location: {
    city: 'Casablanca',
    country: 'Morocco',
    countryCode: 'MA',
    label: 'Casablanca – Morocco',
  },
  email: 'christguimeni@gmail.com',
  phone: {
    /** E.164, used for tel: and WhatsApp links */
    e164: '+212779635685',
    display: '+212 779 63 56 85',
  },
  whatsapp: {
    number: '212779635685',
    prefilledMessage:
      'Bonjour Emmanuel, je souhaite échanger avec vous concernant vos services de Digital Marketing & AI Automation.',
  },
  /**
   * Social profiles. Only add an entry when you have a REAL, verified URL —
   * never invent one. Entries with an empty `url` are not rendered.
   */
  socials: [
    { label: 'LinkedIn', url: '', icon: 'linkedin' as const },
  ],
} as const;

/** mailto: / tel: / wa.me links, derived so they can never drift out of sync. */
export const links = {
  mailto: `mailto:${site.email}?subject=${encodeURIComponent(
    'Demande — Digital Marketing & AI Automation',
  )}`,
  tel: `tel:${site.phone.e164}`,
  whatsapp: `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
    site.whatsapp.prefilledMessage,
  )}`,
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'System', href: '#system' },
  { label: 'AI Agents', href: '#agents' },
  { label: 'Automation', href: '#automation' },
  { label: 'Stack', href: '#stack' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
];

export const footerNav: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Automation System', href: '#system' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

/** Headline numbers shown in the band under the hero. Keep these honest. */
export const heroStats = [
  { value: '7', label: 'AI marketing agents', sub: 'designed & orchestrated' },
  { value: '9', label: 'Automated workflows', sub: 'content → CRM → data' },
  { value: '20+', label: 'Tools benchmarked', sub: 'with real public pricing' },
  { value: '4', label: 'Currencies', sub: 'USD · EUR · MAD · XAF' },
] as const;
