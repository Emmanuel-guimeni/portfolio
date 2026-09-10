'use client';

import { links, site } from '@/config/site';
import { track } from '@/lib/tracking';
import { IconMail, IconPhone, IconPin, IconWhatsApp } from './Icons';
import LeadForm from './LeadForm';
import { SectionHead } from './Sections';

export default function Contact() {
  return (
    <section className="section section--bordered" id="contact">
      <div className="container">
        <SectionHead
          eyebrow="Let&rsquo;s talk"
          title="Let&rsquo;s Build Your Intelligent Marketing System"
          intro="Tell me about your business, your challenges and what you want to automate. The more concrete you are, the more useful my first reply will be."
        />

        <div className="contact-grid">
          {/* ── Direct contact — every button is live ──────────────────── */}
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
                <small>Email me</small>
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
                <small>Call me</small>
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
                <b>WhatsApp</b>
                <small>Message me directly — fastest reply</small>
              </span>
            </a>

            <div className="contact-card" style={{ cursor: 'default' }}>
              <span className="contact-card__icon">
                <IconPin size={18} />
              </span>
              <span>
                <b>{site.location.label}</b>
                <small>Working with clients across Africa and Europe</small>
              </span>
            </div>

            <div
              className="card"
              style={{ padding: '18px 20px', marginTop: 6 }}
            >
              <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: 8 }}>
                What happens after you submit
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
                <li>1 — Your data is validated server-side.</li>
                <li>2 — The lead is written to the database.</li>
                <li>3 — A lead score is computed and stored.</li>
                <li>4 — You see an immediate confirmation.</li>
                <li>5 — I am notified, with your full context.</li>
                <li>6 — I reply personally, usually within one business day.</li>
              </ol>
            </div>
          </aside>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
