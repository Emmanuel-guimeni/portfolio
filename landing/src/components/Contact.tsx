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
          eyebrow="Parlons-en"
          title="Construisons votre système marketing intelligent"
          intro="Parlez-moi de votre activité, de vos difficultés et de ce que vous voulez automatiser. Plus vous serez concret, plus ma première réponse vous sera utile."
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
                <small>M’écrire</small>
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
                <small>M’appeler</small>
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
                <small>Message direct — la réponse la plus rapide</small>
              </span>
            </a>

            <div className="contact-card" style={{ cursor: 'default' }}>
              <span className="contact-card__icon">
                <IconPin size={18} />
              </span>
              <span>
                <b>{site.location.label}</b>
                <small>J’accompagne des clients en Afrique et en Europe</small>
              </span>
            </div>

            <div
              className="card"
              style={{ padding: '18px 20px', marginTop: 6 }}
            >
              <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: 8 }}>
                Ce qui se passe après l’envoi
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
                <li>1 — Vos données sont validées côté serveur.</li>
                <li>2 — Le lead est enregistré en base de données.</li>
                <li>3 — Un score de qualification est calculé et stocké.</li>
                <li>4 — Vous voyez une confirmation immédiate.</li>
                <li>5 — Je suis notifié, avec tout votre contexte.</li>
                <li>6 — Je réponds personnellement, en général sous un jour ouvré.</li>
              </ol>
            </div>
          </aside>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
