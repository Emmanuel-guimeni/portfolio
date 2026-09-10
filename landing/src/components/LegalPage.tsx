import { Footer } from '@/components/Closing';
import Nav from '@/components/Nav';
import { links, site } from '@/config/site';
import type { Locale } from '@/i18n/config';
import type { Dictionary, LegalSection } from '@/i18n/types';

/**
 * Gabarit partagé par la politique de confidentialité et les conditions.
 *
 * Les textes vivent dans les dictionnaires. Les coordonnées y sont écrites sous
 * forme de jetons — {email}, {phone}, {location} — remplacés ici par les vraies
 * valeurs de config/site.ts, et transformés en liens cliquables. Ainsi un
 * changement de numéro se fait à un seul endroit, dans toutes les langues.
 */

const UPDATED_ON = '2026-09-10';

function renderTokens(text: string, key: string): React.ReactNode[] {
  return text.split(/(\{email\}|\{phone\}|\{location\})/).map((part, i) => {
    if (part === '{email}') {
      return (
        <a key={`${key}-${i}`} href={links.mailto}>
          {site.email}
        </a>
      );
    }
    if (part === '{phone}') {
      return (
        <a key={`${key}-${i}`} href={links.tel}>
          {site.phone.display}
        </a>
      );
    }
    if (part === '{location}') {
      return <span key={`${key}-${i}`}>{site.location.label}</span>;
    }
    return <span key={`${key}-${i}`}>{part}</span>;
  });
}

export default function LegalPage({
  d,
  locale,
  doc,
}: {
  d: Dictionary;
  locale: Locale;
  doc: 'privacy' | 'terms';
}) {
  const content = d.legal[doc];
  const updated = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(UPDATED_ON));

  return (
    <>
      <Nav d={d} locale={locale} />
      <main id="main" className="section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container prose">
          <h1>{content.title}</h1>
          <p className="muted">
            {d.legal.updated} {updated}
          </p>

          {content.sections.map((section: LegalSection) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>{renderTokens(paragraph, `${section.heading}-${i}`)}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p style={{ marginTop: '2.5rem' }}>
            <a className="btn btn--ghost" href={`/${locale}`}>
              {d.legal.backToSite}
            </a>
          </p>
        </div>
      </main>
      <Footer d={d} locale={locale} />
    </>
  );
}
