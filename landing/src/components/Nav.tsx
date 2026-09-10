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

  // Lock the page behind the mobile drawer and allow Escape to close it.
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
        <a className="nav__brand" href="#top" aria-label={`${site.name} — home`}>
          <span className="nav__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span>
            <span className="nav__name">{site.shortName}</span>
            <span className="nav__role">Digital Marketing &amp; AI Automation</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Main">
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
            onClick={() => track('cta_click', { location: 'nav', label: 'Request an Audit' })}
          >
            Request an Audit
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="nav__drawer" aria-label="Mobile">
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
              track('cta_click', { location: 'nav-mobile', label: 'Request an Audit' });
            }}
          >
            Request an Audit
          </a>
        </nav>
      )}
    </header>
  );
}
