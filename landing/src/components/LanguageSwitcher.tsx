'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LOCALES, isLocale, type Locale } from '@/i18n/config';

/**
 * Sélecteur de langue.
 *
 * Remplace le segment de langue dans l'URL courante : depuis /en/privacy,
 * choisir le français mène à /fr/privacy — le visiteur reste sur la même page.
 * L'ancre (#pricing) est conservée. Le middleware enregistre le choix dans un
 * cookie, donc la visite suivante arrive directement dans la bonne langue.
 */
export default function LanguageSwitcher({
  locale,
  label,
  variant = 'nav',
}: {
  locale: Locale;
  label: string;
  variant?: 'nav' | 'drawer';
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function switchTo(next: Locale) {
    const segments = (pathname || '/').split('/');
    // segments[0] est vide, segments[1] est la langue courante
    if (isLocale(segments[1])) segments[1] = next;
    else segments.splice(1, 0, next);

    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    setOpen(false);
    router.push(`${segments.join('/') || '/'}${hash}`);
    router.refresh();
  }

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  if (variant === 'drawer') {
    return (
      <div className="lang-drawer" role="group" aria-label={label}>
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-current={l.code === locale}
            onClick={() => switchTo(l.code)}
          >
            {l.nativeName}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang__button"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon />
        <span>{current.short}</span>
      </button>

      {open && (
        <ul className="lang__menu" role="listbox" aria-label={label}>
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                role="option"
                aria-selected={l.code === locale}
                onClick={() => switchTo(l.code)}
              >
                <span>{l.nativeName}</span>
                <em>{l.short}</em>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </svg>
  );
}
