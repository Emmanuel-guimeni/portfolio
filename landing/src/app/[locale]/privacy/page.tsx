import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LegalPage from '@/components/LegalPage';
import { getDictionary, isLocale } from '@/i18n';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const d = getDictionary(locale);
  return {
    title: d.legal.privacy.title,
    description: d.legal.privacy.description,
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage d={getDictionary(locale)} locale={locale} doc="privacy" />;
}
