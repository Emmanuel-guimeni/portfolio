import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LegalPage from '@/components/LegalPage';
import { getDictionary, isLocale } from '@/i18n';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const d = getDictionary(locale);
  return {
    title: d.legal.terms.title,
    description: d.legal.terms.description,
  };
}

export default async function TermsPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage d={getDictionary(locale)} locale={locale} doc="terms" />;
}
