import type { Dictionary } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/i18n/config';
import { site } from './site';

/** Origine canonique. Renseignez NEXT_PUBLIC_SITE_URL en production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

/**
 * Graphe Schema.org : Person + ProfessionalService + WebSite + FAQPage.
 * Construit dans la langue de la page, pour que Google indexe chaque version
 * avec ses propres données structurées.
 */
export function structuredData(locale: Locale, d: Dictionary) {
  const pageUrl = `${SITE_URL}${localePath(locale)}`;

  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: site.name,
    givenName: 'Emmanuel',
    familyName: 'GUEHEDI',
    jobTitle: d.site.role,
    description: d.site.manifesto,
    email: `mailto:${site.email}`,
    telephone: site.phone.e164,
    url: SITE_URL,
    image: `${SITE_URL}/images/emmanuel-avatar.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    alumniOf: { '@type': 'EducationalOrganization', name: d.site.degree },
    knowsAbout: d.meta.keywords.slice(0, 7),
    ...(site.socials.some((s) => s.url)
      ? { sameAs: site.socials.filter((s) => s.url).map((s) => s.url) }
      : {}),
  };

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: `${site.name} — ${d.site.roleShort}`,
    description: d.meta.description,
    url: pageUrl,
    image: `${SITE_URL}/og.png`,
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
      name: d.services.title,
      itemListElement: d.services.list.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website-${locale}`,
    url: pageUrl,
    name: d.meta.title,
    description: d.meta.description,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: d.meta.schemaLanguage,
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    inLanguage: d.meta.schemaLanguage,
    mainEntity: d.faq.items.map((f) => ({
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
