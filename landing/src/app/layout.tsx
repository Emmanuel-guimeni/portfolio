import type { Metadata, Viewport } from 'next';
import Analytics from '@/components/Analytics';
import Reveal from '@/components/Reveal';
import { FAQS } from '@/config/faq';
import { SEO, SITE_URL, structuredData } from '@/config/seo';
import { site } from '@/config/site';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: `%s — ${site.shortName}`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  category: 'Marketing',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: site.name,
    title: SEO.title,
    description: SEO.description,
    locale: 'en_US',
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
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
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#06070c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded at runtime rather than bundled, so the build never
          depends on an external network call. The system stack in tokens.css
          renders immediately while they arrive.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON built from config — no user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData([...FAQS])),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
