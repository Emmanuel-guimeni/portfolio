'use client';

import Image from 'next/image';
import { site } from '@/config/site';
import type { Dictionary } from '@/i18n/types';
import { track } from '@/lib/tracking';
import { IconArrowRight, IconPin } from './Icons';

export default function Hero({ d }: { d: Dictionary }) {
  return (
    <>
      <section className="hero" id="top">
        <div className="container container--wide hero__grid">
          {/* ── Texte ────────────────────────────────────────────────────── */}
          <div>
            <p className="hero__badge">
              <span className="tag" style={{ border: 'none', background: 'none', padding: 0 }}>
                <IconPin size={14} />
                {d.site.locationLabel}
              </span>
              <span aria-hidden="true" style={{ opacity: 0.3 }}>·</span>
              <b>{d.hero.available}</b>
              <span className="hero__dot" aria-hidden="true" />
            </p>

            <h1>
              {d.hero.headlineLead}{' '}
              <span className="accent-text">{d.hero.headlineAccent}</span>
            </h1>

            <span className="hero__sub">{d.site.positioning}</span>

            <p className="hero__value">{d.hero.value}</p>

            <div className="btn-row">
              <a
                className="btn btn--primary btn--lg"
                href="#contact"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: d.hero.ctaAudit })
                }
              >
                {d.hero.ctaAudit}
                <IconArrowRight size={17} />
              </a>
              <a
                className="btn btn--ghost btn--lg"
                href="#contact"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: d.hero.ctaConsult })
                }
              >
                {d.hero.ctaConsult}
              </a>
              <a
                className="btn btn--quiet btn--lg"
                href="#system"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: d.hero.ctaExplore })
                }
              >
                {d.hero.ctaExplore}
                <IconArrowRight size={16} />
              </a>
            </div>

            <div className="hero__meta">
              {d.hero.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Portrait + cartes de preuve flottantes ──────────────────── */}
          <div className="hero__portrait">
            <span className="hero__portrait-glow" aria-hidden="true" />
            <span className="hero__portrait-ring" aria-hidden="true" />

            <div className="hero__float hero__float--a">
              <b className="accent-text">7</b>
              <span>{d.hero.floatAgents}</span>
            </div>

            <Image
              className="hero__img"
              src="/images/emmanuel-portrait.png"
              alt={`${site.name}, ${d.site.role}`}
              width={502}
              height={1090}
              priority
              sizes="(max-width: 999px) 60vw, 380px"
            />

            <div className="hero__float hero__float--b">
              <b>100%</b>
              <span>{d.hero.floatHuman}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bandeau de chiffres clés ──────────────────────────────────── */}
      <section className="statband" aria-label={d.hero.statsLabel}>
        <div className="container container--wide">
          <div className="statband__grid">
            {d.hero.stats.map((stat) => (
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
