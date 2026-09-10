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
          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div>
            <p className="hero__badge">
              <span className="tag" style={{ border: 'none', background: 'none', padding: 0 }}>
                <IconPin size={14} />
                {site.location.label}
              </span>
              <span aria-hidden="true" style={{ opacity: 0.3 }}>·</span>
              <b>Available for new projects</b>
              <span className="hero__dot" aria-hidden="true" />
            </p>

            <h1>
              Transform Digital Marketing Into an{' '}
              <span className="accent-text">Intelligent Automated System</span>
            </h1>

            <span className="hero__sub">{site.positioning}</span>

            <p className="hero__value">
              I connect marketing strategy, artificial intelligence, automation, CRM,
              acquisition, content and data into one system — so the repetitive work runs
              itself, the strategic work gets sharper, and every decision is backed by
              numbers you can actually trust.
            </p>

            <div className="btn-row">
              <a
                className="btn btn--primary btn--lg"
                href="#contact"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: 'Request an Audit' })
                }
              >
                Request an Audit
                <IconArrowRight size={17} />
              </a>
              <a
                className="btn btn--ghost btn--lg"
                href="#contact"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: 'Book a Consultation' })
                }
              >
                Book a Consultation
              </a>
              <a
                className="btn btn--quiet btn--lg"
                href="#system"
                onClick={() =>
                  track('cta_click', { location: 'hero', label: 'Explore the System' })
                }
              >
                Explore the System
                <IconArrowRight size={16} />
              </a>
            </div>

            <div className="hero__meta">
              <span className="tag">{site.degree}</span>
              <span className="tag">7 AI marketing agents</span>
              <span className="tag">Automation · CRM · Data</span>
            </div>
          </div>

          {/* ── Portrait + floating proof cards ──────────────────────────── */}
          <div className="hero__portrait">
            <span className="hero__portrait-glow" aria-hidden="true" />
            <span className="hero__portrait-ring" aria-hidden="true" />

            <div className="hero__float hero__float--a">
              <b className="accent-text">7</b>
              <span>AI agents</span>
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
              <span>Human decisions</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ─────────────────────────────────────────────────── */}
      <section className="statband" aria-label="Key figures">
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
