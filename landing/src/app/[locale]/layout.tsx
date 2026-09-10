import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import Analytics from '@/components/Analytics';
import Reveal from '@/components/Reveal';
import { SITE_URL, structuredData } from '@/config/seo';
import { site } from '@/config/site';
import {
  DEFAULT_LOCALE,
  LOCALES,
  getDictionary,
  isLocale,
  localeMeta,
  localePath,
  type Locale,
} from '@/i18n';
import '@/styles/globals.css';

/**
 * Layout racine — il porte <html> et <body>, et c'est lui qui applique la
 * langue et le sens de lecture. Toutes les pages vivent sous /[locale], donc
 * chaque page connaît sa langue dès le rendu serveur : aucun clignotement, et
 * chaque version a sa propre URL indexable.
 */

/** Pré-génère /fr, /en, … au build. */
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l.code }));
}

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const d = getDictionary(locale);
  const meta = localeMeta(locale);

  // hreflang : une entrée par langue + x-default vers la langue principale.
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l.code, localePath(l.code)]),
  );
  languages['x-default'] = localePath(DEFAULT_LOCALE);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.meta.title, template: `%s — ${site.shortName}` },
    description: d.meta.description,
    keywords: [...d.meta.keywords],
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    alternates: { canonical: localePath(locale), languages },
    category: 'Marketing',
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${localePath(locale)}`,
      siteName: site.name,
      title: d.meta.title,
      description: d.meta.description,
      locale: meta.bcp47,
      alternateLocale: LOCALES.filter((l) => l.code !== locale).map((l) => l.bcp47),
      images: [
        { url: '/og.png', width: 1200, height: 630, alt: `${site.name} — ${d.site.role}` },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: d.meta.title,
      description: d.meta.description,
      images: ['/og.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export const viewport: Viewport = {
  themeColor: '#06070c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const d = getDictionary(locale);
  const meta = localeMeta(locale as Locale);

  return (
    <html lang={locale} dir={meta.dir}>
      <head>
        {/*
          Les polices sont chargées à l'exécution plutôt qu'empaquetées : le build
          ne dépend donc jamais d'un appel réseau externe. La pile système définie
          dans tokens.css s'affiche immédiatement en attendant.
          Noto Sans Arabic n'est demandée que pour l'arabe.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href={
            meta.dir === 'rtl'
              ? 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap'
              : 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap'
          }
        />
        <script
          type="application/ld+json"
          // JSON statique construit depuis les dictionnaires — aucune entrée utilisateur.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData(locale as Locale, d)),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {d.nav.skipToContent}
        </a>
        {children}
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
