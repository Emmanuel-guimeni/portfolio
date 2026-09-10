'use client';

import { useEffect } from 'react';

/**
 * Scroll reveal, done cheaply.
 *
 * Adds `js` to <html> so the CSS can hide `.reveal` elements ONLY when
 * JavaScript is available — without it every section stays visible, which keeps
 * the page usable with JS disabled and safe for crawlers.
 *
 * One IntersectionObserver, no scroll listener, no animation library.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    root.classList.add('js');
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          // Stagger siblings slightly so a grid animates as a wave, not a block.
          const siblings = Array.from(el.parentElement?.children ?? []);
          const delay = Math.min(siblings.indexOf(el), 5) * 70;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0.01 },
    );

    items.forEach((el) => observer.observe(el));

    // Safety net: never leave content hidden if the observer misbehaves.
    const timer = window.setTimeout(() => {
      items.forEach((el) => el.classList.add('is-visible'));
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      root.classList.remove('js');
    };
  }, []);

  return null;
}
