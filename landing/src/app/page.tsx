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

/**
 * The landing page, in the order a visitor should meet it:
 *
 *  1 Navigation        8  Social media automation   15 Technology stack
 *  2 Hero              9  Lead generation           16 Pricing / real cost
 *  3 Stats band        10 CRM automation            17 Services
 *  4 Problem           11 Email automation          18 How I work
 *  5 Solution          12 Advertising automation    19 Contact / lead capture
 *  6 The 7 AI agents   13 SEO automation            20 FAQ
 *  7 Content factory   14 Data & analytics          21 Final CTA  ·  22 Footer
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Agents />
        <AutomationSections />
        <DataAnalytics />
        <TechStack />
        <Pricing />
        <Services />
        <Contact />
        <Faq />
        <Principles />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
