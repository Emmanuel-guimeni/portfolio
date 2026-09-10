import { site } from './site';

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

export const SEO = {
  title: `${site.name} — Digital Marketing & AI Automation Specialist`,
  /** Under 160 characters so Google does not truncate it. */
  description:
    'Digital Marketing & AI Automation Specialist in Casablanca. I design intelligent marketing systems connecting AI, automation, CRM, data and growth. Request an audit.',
  keywords: [
    'Digital Marketing Consultant',
    'AI Marketing Automation',
    'Marketing Automation Consultant',
    'AI Automation Specialist',
    'Digital Marketing & AI Automation Specialist',
    'Marketing automation Morocco',
    'Consultant marketing digital Casablanca',
    'CRM automation',
    'Lead generation system',
    'AI marketing agents',
  ],
  ogImage: '/og.png',
} as const;

/**
 * Schema.org graph: Person + ProfessionalService + WebSite + FAQPage.
 * Rendered once in the root layout as a single JSON-LD block.
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
      'Digital Marketing',
      'Artificial Intelligence',
      'Marketing Automation',
      'CRM',
      'SEO',
      'Data Analytics',
      'Growth Marketing',
    ],
    ...(site.socials.some((s) => s.url)
      ? { sameAs: site.socials.filter((s) => s.url).map((s) => s.url) }
      : {}),
  };

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: `${site.name} — Digital Marketing & AI Automation`,
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
        'Digital Marketing Audit',
        'AI Marketing Audit',
        'Marketing Automation Audit',
        'AI Automation Consulting',
        'CRM & Lead Automation',
        'Digital Marketing Strategy',
        'Data & Marketing Analytics',
        'AI Marketing Transformation',
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
    inLanguage: 'en',
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
