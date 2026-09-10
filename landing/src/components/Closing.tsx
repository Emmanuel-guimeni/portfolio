'use client';

import { links, site } from '@/config/site';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
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
import { SectionHead } from './Primitives';

/* ═══════════════════════════════════════════════════════════════════════════
   20 · FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

export function Faq({ d }: { d: Dictionary }) {
  return (
    <section className="section section--panel" id="faq">
      <div className="container">
        <SectionHead
          eyebrow={d.faq.eyebrow}
          title={d.faq.title}
          center
        />
        <div className="faq">
          {d.faq.items.map((item) => (
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

export function FinalCta({ d }: { d: Dictionary }) {
  return (
    <section className="section section--bordered" id="final-cta">
      <div className="container">
        <div className="cta-banner">
          <div>
            <h2>{d.cta.title}</h2>
            <p>{d.cta.body}</p>
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
              <span className="muted">{d.site.locationLabel}</span>
            </div>
          </div>

          <div className="btn-row" style={{ flexDirection: 'column' }}>
            <a
              className="btn btn--primary btn--lg btn--block"
              href="#contact"
              onClick={() =>
                track('cta_click', { location: 'final-cta', label: d.cta.audit })
              }
            >
              {d.cta.audit}
              <IconArrowRight size={17} />
            </a>
            <a
              className="btn btn--ghost btn--lg btn--block"
              href="#contact"
              onClick={() =>
                track('cta_click', { location: 'final-cta', label: d.cta.consult })
              }
            >
              {d.cta.consult}
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

export function Footer({ d, locale }: { d: Dictionary; locale: Locale }) {
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
                <span className="nav__role">{d.site.role}</span>
              </span>
            </a>
            <p>{d.site.positioning}</p>
            <p style={{ marginTop: 10 }}>{d.site.philosophy}</p>

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
            <h4>{d.footer.navigate}</h4>
            <nav className="footer__links" aria-label={d.footer.navigate}>
              {d.footer.links.slice(0, 5).map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4>{d.footer.legal}</h4>
            <nav className="footer__links" aria-label={d.footer.legal}>
              {d.footer.links.slice(5).map((item) => (
                <a key={item.href} href={localePath(locale, item.href)}>
                  {item.label}
                </a>
              ))}
              <a href={localePath(locale, "/admin")}>{d.footer.dashboard}</a>
            </nav>
          </div>

          <div>
            <h4>{d.footer.contact}</h4>
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
                {d.site.locationLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. {d.footer.rights}
          </span>
          <span>{d.site.signature.join(' ')}</span>
        </div>
      </div>
    </footer>
  );
}
