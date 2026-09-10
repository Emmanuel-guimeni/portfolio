import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/seo';
import { LOCALES } from '@/i18n/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Le tableau de bord et l'API sont privés : hors de l'index.
        disallow: ['/api/', ...LOCALES.map((l) => `/${l.code}/admin`)],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
