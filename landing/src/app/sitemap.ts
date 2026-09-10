import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/seo';
import { DEFAULT_LOCALE, LOCALES, localePath } from '@/i18n/config';

/**
 * Sitemap multilingue : une entrée par page ET par langue, chacune déclarant
 * ses alternatives via `alternates.languages`. C'est ce que Google attend pour
 * associer les versions entre elles et servir la bonne à chaque marché.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const languages = (path: string) =>
    Object.fromEntries(
      LOCALES.map((l) => [l.code, `${SITE_URL}${localePath(l.code, path)}`]),
    );

  return pages.flatMap((page) =>
    LOCALES.map((l) => ({
      url: `${SITE_URL}${localePath(l.code, page.path)}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: l.code === DEFAULT_LOCALE ? page.priority : page.priority * 0.9,
      alternates: {
        languages: {
          ...languages(page.path),
          'x-default': `${SITE_URL}${localePath(DEFAULT_LOCALE, page.path)}`,
        },
      },
    })),
  );
}
