'use client';

import { links, site } from '@/config/site';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { track } from '@/lib/tracking';
import { IconMail, IconPhone, IconPin, IconWhatsApp } from './Icons';
import LeadForm from './LeadForm';
import { SectionHead } from './Primitives';

export default function Contact({ d, locale }: { d: Dictionary; locale: Locale }) {
  return (
    <section className="section section--bordered" id="contact">
      <div className="container">
        <SectionHead
          eyebrow={d.contact.eyebrow}
          title={d.contact.title}
          intro={d.contact.intro}
        />

        <div className="contact-grid">
          {/* ── Contact direct — chaque bouton est fonctionnel ─────────── */}
          <aside className="contact-aside">
            <a
              className="contact-card"
              href={links.mailto}
              onClick={() => track('email_click', { location: 'contact' })}
            >
              <span className="contact-card__icon">
                <IconMail size={18} />
              </span>
              <span>
                <b>{site.email}</b>
                <small>{d.contact.emailMe}</small>
              </span>
            </a>

            <a
              className="contact-card"
              href={links.tel}
              onClick={() => track('phone_click', { location: 'contact' })}
            >
              <span className="contact-card__icon">
                <IconPhone size={18} />
              </span>
              <span>
                <b>{site.phone.display}</b>
                <small>{d.contact.callMe}</small>
              </span>
            </a>

            <a
              className="contact-card"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'contact' })}
            >
              <span className="contact-card__icon">
                <IconWhatsApp size={18} />
              </span>
              <span>
                <b>{d.contact.whatsapp}</b>
                <small>{d.contact.whatsappSub}</small>
              </span>
            </a>

            <div className="contact-card" style={{ cursor: 'default' }}>
              <span className="contact-card__icon">
                <IconPin size={18} />
              </span>
              <span>
                <b>{d.site.locationLabel}</b>
                <small>{d.contact.locationSub}</small>
              </span>
            </div>

            <div
              className="card"
              style={{ padding: '18px 20px', marginTop: 6 }}
            >
              <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: 8 }}>
                {d.contact.afterTitle}
              </h3>
              <ol
                style={{
                  display: 'grid',
                  gap: 7,
                  color: 'var(--text-muted)',
                  fontSize: 'var(--fs-xs)',
                  counterReset: 'x',
                }}
              >
                {d.contact.afterSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </aside>

          <LeadForm d={d} locale={locale} />
        </div>
      </div>
    </section>
  );
}
