import { site } from './site';

/** Origine canonique. Renseignez NEXT_PUBLIC_SITE_URL en production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

export const SEO = {
  title: `${site.name} — Spécialiste Marketing Digital & Automatisation IA`,
  /** Moins de 160 caractères, pour que Google ne la tronque pas. */
  description:
    "Consultant en marketing digital et automatisation IA à Casablanca. Je conçois des systèmes marketing intelligents reliant IA, automatisation, CRM, data et croissance.",
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
    'AI marketing automation',
    'digital marketing consultant',
  ],
  ogImage: '/og.png',
} as const;

/**
 * Graphe Schema.org : Person + ProfessionalService + WebSite + FAQPage.
 * Rendu une seule fois dans le layout racine, en un seul bloc JSON-LD.
 */
export function structuredData(faqs: { q: string; a: string }[]) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: site.name,
    givenName: 'Emmanuel',
    familyName: 'GUEHEDI',
    jobTitle: site.role,
    description: site.manifesto,
    email: `mailto:${site.email}`,
    telephone: site.phone.e164,
    url: SITE_URL,
    image: `${SITE_URL}/images/emmanuel-avatar.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    alumniOf: { '@type': 'EducationalOrganization', name: site.degree },
    knowsAbout: [
      'Marketing digital',
      'Intelligence artificielle',
      'Marketing automation',
      'CRM',
      'SEO',
      'Data analytics',
      'Growth marketing',
    ],
    ...(site.socials.some((s) => s.url)
      ? { sameAs: site.socials.filter((s) => s.url).map((s) => s.url) }
      : {}),
  };

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: `${site.name} — Marketing digital & automatisation IA`,
    description: SEO.description,
    url: SITE_URL,
    image: `${SITE_URL}${SEO.ogImage}`,
    telephone: site.phone.e164,
    email: `mailto:${site.email}`,
    founder: { '@id': `${SITE_URL}/#person` },
    areaServed: ['MA', 'CM', 'CG', 'GA', 'TD', 'FR', 'BE', 'CH'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        'Audit Marketing Digital',
        'Audit Marketing IA',
        'Audit Marketing Automation',
        'Conseil Automatisation IA',
        'CRM & Automatisation des leads',
        'Stratégie Marketing Digital',
        'Data & Marketing Analytics',
        'Transformation Marketing par l’IA',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SEO.title,
    description: SEO.description,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'fr',
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [person, service, website, faqPage],
  };
}
