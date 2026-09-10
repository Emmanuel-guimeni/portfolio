import { notFound } from 'next/navigation';
import { Faq, FinalCta, Footer } from '@/components/Closing';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Nav from '@/components/Nav';
import Pricing from '@/components/Pricing';
import {
  Agents,
  AutomationSections,
  DataAnalytics,
  Principles,
  Problem,
  Solution,
} from '@/components/Sections';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import { getDictionary, isLocale } from '@/i18n';

/**
 * La landing page, dans l'ordre où un visiteur doit la rencontrer :
 *
 *  1 Navigation        8  Réseaux sociaux          15 Stack technologique
 *  2 Hero              9  Génération de leads      16 Tarifs / coût réel
 *  3 Chiffres clés     10 Automatisation CRM       17 Services
 *  4 Problème          11 Automatisation email     18 Ma méthode
 *  5 Solution          12 Automatisation pub       19 Contact / capture
 *  6 Les 7 agents IA   13 Automatisation SEO       20 FAQ
 *  7 Content factory   14 Data & analytics         21 CTA final · 22 Footer
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <Nav d={d} locale={locale} />
      <main id="main">
        <Hero d={d} />
        <Problem d={d} />
        <Solution d={d} />
        <Agents d={d} />
        <AutomationSections d={d} />
        <DataAnalytics d={d} />
        <TechStack d={d} />
        <Pricing d={d} />
        <Services d={d} />
        <Contact d={d} locale={locale} />
        <Faq d={d} />
        <Principles d={d} />
        <FinalCta d={d} />
      </main>
      <Footer d={d} locale={locale} />
    </>
  );
}
