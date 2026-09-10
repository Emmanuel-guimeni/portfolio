import type { Metadata } from 'next';
import { Footer } from '@/components/Closing';
import Nav from '@/components/Nav';
import { links, site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Mr GUEHEDI Emmanuel collects, stores, uses and protects the personal data submitted through this website.',
  robots: { index: true, follow: true },
};

const UPDATED = '9 September 2026';

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container prose">
          <h1>Privacy Policy</h1>
          <p className="muted">Last updated: {UPDATED}</p>

          <h2>1. Who is responsible for your data</h2>
          <p>
            {site.name}, {site.role}, based in {site.location.label}, is the data
            controller for the personal data collected through this website. You can
            reach me at <a href={links.mailto}>{site.email}</a> or{' '}
            <a href={links.tel}>{site.phone.display}</a>.
          </p>

          <h2>2. What data is collected</h2>
          <p>Through the contact form on this site, I collect only what you submit:</p>
          <ul>
            <li>First name and last name</li>
            <li>Professional email address</li>
            <li>Phone / WhatsApp number (optional)</li>
            <li>Country, company and job title (optional)</li>
            <li>The service you are interested in and your budget range</li>
            <li>The message you write</li>
            <li>
              Technical context: the page you submitted from, and UTM campaign
              parameters if you arrived from a campaign link
            </li>
          </ul>
          <p>
            A lead score is computed automatically from the fields above. It is an
            internal prioritisation aid only; it produces no legal effect and no decision
            is taken solely on that basis.
          </p>

          <h2>3. Why it is collected — and on what legal basis</h2>
          <p>
            Your data is used exclusively to answer your request, to prepare a proposal,
            and to follow up on our exchange. The legal basis is your explicit consent,
            which you give by ticking the consent box before submitting the form, and
            the steps taken at your request prior to entering into a contract.
          </p>
          <p>
            I do not sell your data, I do not rent it, and I do not share it with third
            parties for their own marketing.
          </p>

          <h2>4. Where it is stored</h2>
          <p>
            Submissions are stored in a PostgreSQL database (Supabase) with access
            restricted to me. Data may be transmitted to the following processors, each
            used strictly to operate this site and my follow-up: the hosting provider,
            the transactional email provider, and — where configured — a CRM or
            automation platform used to manage the exchange.
          </p>

          <h2>5. How long it is kept</h2>
          <p>
            Leads that do not become clients are kept for a maximum of 3 years from our
            last contact, then deleted. Data relating to a signed engagement is kept for
            the duration of the contract plus the legal retention periods that apply to
            commercial and accounting records.
          </p>

          <h2>6. Your rights</h2>
          <p>
            You have the right to access, rectify, erase, restrict and port your data, to
            object to its processing, and to withdraw your consent at any time — with no
            effect on processing carried out before the withdrawal. Write to{' '}
            <a href={links.mailto}>{site.email}</a> and I will answer within one month.
          </p>
          <p>
            In Morocco, you may also lodge a complaint with the CNDP (Commission
            Nationale de contrôle de la protection des Données à caractère Personnel). If
            you are in the European Union, you may lodge a complaint with your national
            supervisory authority.
          </p>

          <h2>7. Cookies and measurement</h2>
          <p>
            This site loads no analytics or advertising cookie unless the corresponding
            tag has been explicitly configured by the site owner. Where Google Analytics
            4, Google Tag Manager, the Meta Pixel or the LinkedIn Insight Tag are active,
            they set cookies for audience measurement and campaign attribution. A minimal
            amount of data is also stored in your browser&rsquo;s session storage to
            remember which campaign brought you here; it never leaves your browser until
            you submit the form.
          </p>

          <h2>8. Security</h2>
          <p>
            Data is transmitted over HTTPS, validated and sanitised on the server, rate
            limited against abuse, and protected by anti-spam controls. Administrative
            access is authenticated and restricted. No credential or API key is ever
            exposed in the browser.
          </p>

          <h2>9. Changes</h2>
          <p>
            This policy may be updated. The date at the top of this page always reflects
            the current version.
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
