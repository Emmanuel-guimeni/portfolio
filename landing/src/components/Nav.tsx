'use client';

import { useEffect, useState } from 'react';
import { site } from '@/config/site';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { track } from '@/lib/tracking';
import { IconClose, IconMenu } from './Icons';
import LanguageSwitcher from './LanguageSwitcher';

export default function Nav({ d, locale }: { d: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Verrouille la page derrière le menu mobile et permet de fermer avec Échap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#top" aria-label={`${site.name} — ${d.nav.home}`}>
          <span className="nav__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span>
            <span className="nav__name">{site.shortName}</span>
            <span className="nav__role">{d.site.roleShort}</span>
          </span>
        </a>

        <nav className="nav__links" aria-label={d.nav.items[0]?.label}>
          {d.nav.items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <LanguageSwitcher locale={locale} label={d.nav.languageLabel} />
          <a
            className="btn btn--primary btn--sm nav__cta"
            href="#contact"
            onClick={() => track('cta_click', { location: 'nav', label: d.nav.cta })}
          >
            {d.nav.cta}
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? d.nav.closeMenu : d.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="nav__drawer" aria-label={d.nav.openMenu}>
          {d.nav.items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="btn btn--primary btn--block"
            href="#contact"
            onClick={() => {
              setOpen(false);
              track('cta_click', { location: 'nav-mobile', label: d.nav.cta });
            }}
          >
            {d.nav.cta}
          </a>
          <LanguageSwitcher locale={locale} label={d.nav.languageLabel} variant="drawer" />
        </nav>
      )}
    </header>
  );
}
