'use client';

import Image from 'next/image';
import { heroStats, site } from '@/config/site';
import { track } from '@/lib/tracking';
import { IconArrowRight, IconPin } from './Icons';

export default function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="container container--wide hero__grid">
          {/* ── Texte ────────────────────────────────────────────────────── */}
          <div>
            <p className="hero__badge">
              <span className="tag" style={{ border: 'none', background: 'none', padding: 0 }}>
                <IconPin size={14} />
                {site.location.label}
              </span>
              <span aria-hidden="true" style={{ opacity: 0.3 }}>·</span>
              <b>Disponible pour de nouveaux projets</b>
              <span className="hero__dot" aria-hidden="true" />
            </p>

            <h1>
              Transformez votre marketing digital en un{' '}
              <span className="accent-text">système intelligent et automatisé</span>
            </h1>

            <span className="hero__sub">{site.positioning}</span>

            <p className="hero__value">
              Je relie stratégie marketing, intelligence artificielle, automatisation,
              CRM, acquisition, contenu et data en un seul système — pour que le
              répétitif tourne seul, que le stratégique gagne en précision, et que chaque
              décision s’appuie sur des chiffres auxquels vous pouvez vraiment vous fier.
            </p>

            <div className="btn-row">
              <a
                className="btn btn--primary btn--lg"
                href="#contact"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: 'Demander un audit' })
                }
              >
                Demander un audit
                <IconArrowRight size={17} />
              </a>
              <a
                className="btn btn--ghost btn--lg"
                href="#contact"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: 'Réserver une consultation' })
                }
              >
                Réserver une consultation
              </a>
              <a
                className="btn btn--quiet btn--lg"
                href="#system"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: 'Explorer le système' })
                }
              >
                Explorer le système
                <IconArrowRight size={16} />
              </a>
            </div>

            <div className="hero__meta">
              <span className="tag">{site.degree}</span>
              <span className="tag">7 agents marketing IA</span>
              <span className="tag">Automatisation · CRM · Data</span>
            </div>
          </div>

          {/* ── Portrait + cartes de preuve flottantes ──────────────────── */}
          <div className="hero__portrait">
            <span className="hero__portrait-glow" aria-hidden="true" />
            <span className="hero__portrait-ring" aria-hidden="true" />

            <div className="hero__float hero__float--a">
              <b className="accent-text">7</b>
              <span>agents IA</span>
            </div>

            <Image
              className="hero__img"
              src="/images/emmanuel-portrait.png"
              alt={`${site.name}, ${site.role}`}
              width={502}
              height={1090}
              priority
              sizes="(max-width: 999px) 60vw, 380px"
            />

            <div className="hero__float hero__float--b">
              <b>100%</b>
              <span>décisions humaines</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bandeau de chiffres clés ──────────────────────────────────── */}
      <section className="statband" aria-label="Chiffres clés">
        <div className="container container--wide">
          <div className="statband__grid">
            {heroStats.map((stat) => (
              <div className="statband__item" key={stat.label}>
                <span className="statband__value accent-text">{stat.value}</span>
                <span>
                  <span className="statband__label">{stat.label}</span>
                  <span className="statband__sub">{stat.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
