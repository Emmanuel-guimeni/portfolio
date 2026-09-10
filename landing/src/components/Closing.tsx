'use client';

import { FAQS } from '@/config/faq';
import { footerNav, links, site } from '@/config/site';
import { track } from '@/lib/tracking';
import {
  IconArrowRight,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconPin,
  IconPlus,
  IconWhatsApp,
} from './Icons';
import { SectionHead } from './Sections';

/* ═══════════════════════════════════════════════════════════════════════════
   20 · FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

export function Faq() {
  return (
    <section className="section section--panel" id="faq">
      <div className="container">
        <SectionHead
          eyebrow="FAQ"
          title="Les questions qu’on me pose avant chaque projet"
          center
        />
        <div className="faq">
          {FAQS.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <IconPlus size={18} />
              </summary>
              <div className="faq__body">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   21 · CTA FINAL
   ═══════════════════════════════════════════════════════════════════════════ */

export function FinalCta() {
  return (
    <section className="section section--bordered" id="final-cta">
      <div className="container">
        <div className="cta-banner">
          <div>
            <h2>Prêt à construire un système marketing plus intelligent ?</h2>
            <p>
              Identifions ensemble ce qui peut être automatisé, ce qui doit rester humain,
              et là où l’IA crée le plus de valeur.
            </p>
            <div className="cta-banner__contacts">
              <a
                href={links.mailto}
                onClick={() => track('email_click', { location: 'final-cta' })}
              >
                {site.email}
              </a>
              <a
                href={links.tel}
                onClick={() => track('phone_click', { location: 'final-cta' })}
              >
                {site.phone.display}
              </a>
              <span className="muted">{site.location.label}</span>
            </div>
          </div>

          <div className="btn-row" style={{ flexDirection: 'column' }}>
            <a
              className="btn btn--primary btn--lg btn--block"
              href="#contact"
              onClick={() =>
                track('cta_click', { location: 'final-cta', label: 'Demander un audit' })
              }
            >
              Demander un audit
              <IconArrowRight size={17} />
            </a>
            <a
              className="btn btn--ghost btn--lg btn--block"
              href="#contact"
              onClick={() =>
                track('cta_click', { location: 'final-cta', label: 'Réserver une consultation' })
              }
            >
              Réserver une consultation
            </a>
            <a
              className="btn btn--ghost btn--lg btn--block"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'final-cta' })}
            >
              <IconWhatsApp size={17} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   22 · PIED DE PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export function Footer() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <footer className="footer" id="about">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="nav__brand" href="#top">
              <span className="nav__mark" aria-hidden="true">
                {site.initials}
              </span>
              <span>
                <span className="nav__name">{site.name}</span>
                <span className="nav__role">{site.role}</span>
              </span>
            </a>
            <p>{site.positioning}</p>
            <p style={{ marginTop: 10 }}>{site.philosophy}</p>

            {socials.length > 0 && (
              <div className="footer__socials">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <IconLinkedIn size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4>Navigation</h4>
            <nav className="footer__links" aria-label="Pied de page">
              {footerNav.slice(0, 5).map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4>Mentions légales</h4>
            <nav className="footer__links" aria-label="Mentions légales">
              {footerNav.slice(5).map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
              <a href="/admin">Tableau de bord des leads</a>
            </nav>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="footer__links">
              <a
                href={links.mailto}
                onClick={() => track('email_click', { location: 'footer' })}
              >
                <IconMail
                  size={14}
                  style={{ display: 'inline', verticalAlign: '-2px', marginRight: 8 }}
                />
                {site.email}
              </a>
              <a
                href={links.tel}
                onClick={() => track('phone_click', { location: 'footer' })}
              >
                <IconPhone
                  size={14}
                  style={{ display: 'inline', verticalAlign: '-2px', marginRight: 8 }}
                />
                {site.phone.display}
              </a>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { location: 'footer' })}
              >
                <IconWhatsApp
                  size={14}
                  style={{ display: 'inline', verticalAlign: '-2px', marginRight: 8 }}
                />
                WhatsApp
              </a>
              <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
                <IconPin
                  size={14}
                  style={{ display: 'inline', verticalAlign: '-2px', marginRight: 8 }}
                />
                {site.location.label}
              </span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </span>
          <span>{site.signature.join(' ')}</span>
        </div>
      </div>
    </footer>
  );
}
