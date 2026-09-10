'use client';

import { useEffect, useState } from 'react';
import { primaryNav, site } from '@/config/site';
import { track } from '@/lib/tracking';
import { IconClose, IconMenu } from './Icons';

export default function Nav() {
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
        <a className="nav__brand" href="#top" aria-label={`${site.name} — accueil`}>
          <span className="nav__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span>
            <span className="nav__name">{site.shortName}</span>
            <span className="nav__role">Marketing Digital &amp; Automatisation IA</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Navigation principale">
          {primaryNav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="btn btn--primary btn--sm nav__cta"
            href="#contact"
            onClick={() => track('cta_click', { location: 'nav', label: 'Demander un audit' })}
          >
            Demander un audit
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="nav__drawer" aria-label="Navigation mobile">
          {primaryNav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="btn btn--primary btn--block"
            href="#contact"
            onClick={() => {
              setOpen(false);
              track('cta_click', { location: 'nav-mobile', label: 'Demander un audit' });
            }}
          >
            Demander un audit
          </a>
        </nav>
      )}
    </header>
  );
}
