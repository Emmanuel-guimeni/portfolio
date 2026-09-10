import type { Metadata } from 'next';
import { Footer } from '@/components/Closing';
import Nav from '@/components/Nav';
import { links, site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms of use for the website of Mr GUEHEDI Emmanuel, Digital Marketing & AI Automation Specialist.',
};

const UPDATED = '9 September 2026';

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container prose">
          <h1>Terms of Use</h1>
          <p className="muted">Last updated: {UPDATED}</p>

          <h2>1. Site owner</h2>
          <p>
            This site is published by {site.name}, {site.role}, {site.location.label}.
            Contact: <a href={links.mailto}>{site.email}</a> ·{' '}
            <a href={links.tel}>{site.phone.display}</a>.
          </p>

          <h2>2. Purpose of the site</h2>
          <p>
            This site presents my professional expertise and services, and lets you
            request an audit or a consultation. Submitting the form does not create a
            contract; it opens a conversation. Any engagement is governed by a separate
            written proposal.
          </p>

          <h2>3. Pricing information</h2>
          <p>
            The pricing section lists third-party software prices published by their
            respective vendors, together with the date each figure was checked and a link
            to the vendor&rsquo;s own pricing page. These vendors change their prices
            without notice, prices vary by region, contact volume, seat count and
            negotiation, and currency conversions use indicative exchange rates that you
            can override on the page.
          </p>
          <p>
            Those figures are provided for orientation only. They are not an offer, not a
            quotation, and not a guarantee of the price you will be charged by any
            vendor. Always confirm on the vendor&rsquo;s official pricing page before
            making a purchasing decision. Trademarks and product names belong to their
            respective owners; their mention here does not imply any partnership or
            endorsement.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            The structure, text, visual identity, diagrams and frameworks presented on
            this site are my work and are protected. You may quote them with attribution;
            you may not reproduce the site or substantial parts of it for commercial
            purposes without written permission.
          </p>

          <h2>5. Liability</h2>
          <p>
            The content of this site is provided for information. I take care to keep it
            accurate and up to date, but I give no warranty that it is complete or
            error-free, and I cannot be held liable for decisions taken on the basis of
            it alone. Recommendations made during a paid engagement are governed by that
            engagement&rsquo;s own terms.
          </p>

          <h2>6. External links</h2>
          <p>
            This site links to third-party websites, chiefly vendor pricing pages. I have
            no control over their content and accept no responsibility for it.
          </p>

          <h2>7. Personal data</h2>
          <p>
            The handling of personal data is described in the{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>8. Applicable law</h2>
          <p>
            These terms are governed by Moroccan law. Any dispute will be submitted to
            the competent courts of Casablanca, unless a mandatory provision provides
            otherwise.
          </p>

          <p style={{ marginTop: '2.5rem' }}>
            <a className="btn btn--ghost" href="/">
              ← Back to the site
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
