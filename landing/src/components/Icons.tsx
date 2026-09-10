import type { SVGProps } from 'react';

/**
 * Inline SVG icon set — no icon-font, no icon library, no extra network
 * request. Every icon inherits `currentColor` and is decorative unless the
 * consumer passes a title.
 */

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconArrowRight = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconCheck = (p: P) => (
  <Svg {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Svg>
);

export const IconPlus = (p: P) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconAlert = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16.2v.3" />
  </Svg>
);

export const IconMenu = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconClose = (p: P) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const IconMail = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
);

export const IconPhone = (p: P) => (
  <Svg {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.6 19.6 4.4 13.4 4 5.7A2.5 2.5 0 0 1 6.5 3Z" />
  </Svg>
);

export const IconWhatsApp = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8 19.2l-4.5 1.3Z" />
    <path d="M9 9.2c.3 1 .8 1.9 1.5 2.6.7.7 1.6 1.2 2.6 1.5l.9-1.1 2 .9v1.3c-2.6.4-5.6-2.6-6-5.2l1.3-.5.9 2-1.1.9" />
  </Svg>
);

export const IconPin = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const IconLinkedIn = (p: P) => (
  <Svg {...p} strokeWidth={1.4}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7.5 10.5V17M7.5 7.6v.1M11.5 17v-3.6a2.2 2.2 0 0 1 4.4 0V17" />
  </Svg>
);

/* ── Domain icons ────────────────────────────────────────────────────────── */

export const IconStrategy = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4" />
  </Svg>
);

export const IconContent = (p: P) => (
  <Svg {...p}>
    <path d="M5 4.5h9.5L19 9v10.5H5z" />
    <path d="M14 4.5V9h5M8 13h8M8 16.5h5" />
  </Svg>
);

export const IconCreative = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5c4.7 0 8.5 3.5 8.5 7.8 0 2.6-2 4.2-4.4 4.2h-1.6a1.6 1.6 0 0 0-1.2 2.7c.4.5.5 1.2 0 1.7-.3.4-.8.6-1.3.6-4.7 0-8.5-3.8-8.5-8.5S7.3 3.5 12 3.5Z" />
    <circle cx="8.4" cy="11" r="1" fill="currentColor" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
    <circle cx="15.6" cy="11" r="1" fill="currentColor" />
  </Svg>
);

export const IconPerformance = (p: P) => (
  <Svg {...p}>
    <path d="M4 19h16" />
    <path d="M6.5 19v-5M11 19V8M15.5 19v-7M20 19V5" />
  </Svg>
);

export const IconCrm = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6.5a3 3 0 0 1 0 6M17.5 19a5.5 5.5 0 0 0-2-4.3" />
  </Svg>
);

export const IconSeo = (p: P) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15 15 5 5" />
    <path d="M7.5 10.5h6M10.5 7.5v6" />
  </Svg>
);

export const IconAnalytics = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <path d="M7.5 16v-3M12 16v-6M16.5 16v-4" />
  </Svg>
);

export const IconAutomation = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="9" width="6" height="6" rx="1.6" />
    <rect x="15" y="4" width="6" height="6" rx="1.6" />
    <rect x="15" y="14" width="6" height="6" rx="1.6" />
    <path d="M9 12h3a2 2 0 0 0 2-2V7M9 12h3a2 2 0 0 1 2 2v3" />
  </Svg>
);

export const IconAi = (p: P) => (
  <Svg {...p}>
    <rect x="6" y="6" width="12" height="12" rx="3" />
    <path d="M9.5 3.5v2.5M14.5 3.5v2.5M9.5 18v2.5M14.5 18v2.5M3.5 9.5H6M3.5 14.5H6M18 9.5h2.5M18 14.5h2.5" />
    <circle cx="12" cy="12" r="2" />
  </Svg>
);

export const IconSystem = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="m6.7 7.2 3.4 3.3M17.3 7.2l-3.4 3.3M6.7 16.8l3.4-3.3M17.3 16.8l-3.4-3.3" />
  </Svg>
);

export const IconAudit = (p: P) => (
  <Svg {...p}>
    <path d="M6 3.5h8L19 8v12.5H6z" />
    <path d="M13 3.5V8h5" />
    <path d="m9 14 2 2 4-4.5" />
  </Svg>
);

export const IconTransform = (p: P) => (
  <Svg {...p}>
    <path d="M4 8h11a4 4 0 0 1 0 8H9" />
    <path d="m7 5-3 3 3 3M12 13l-3 3 3 3" />
  </Svg>
);

export const IconDatabase = (p: P) => (
  <Svg {...p}>
    <ellipse cx="12" cy="6" rx="7.5" ry="3" />
    <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </Svg>
);

export const IconShield = (p: P) => (
  <Svg {...p}>
    <path d="M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.3 4.1-1.1 7-5 7-9.3V5.8Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const IconSpark = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5 13.8 9l5.7 1.8L13.8 12.6 12 18.5l-1.8-5.9L4.5 10.8 10.2 9Z" />
  </Svg>
);

export const IconMegaphone = (p: P) => (
  <Svg {...p}>
    <path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H8l7 4V4.5l-7 4H5.5A1.5 1.5 0 0 0 4 10Z" />
    <path d="M18.5 9.5a3.5 3.5 0 0 1 0 5" />
    <path d="M8 15.5V20" />
  </Svg>
);

export const IconLayers = (p: P) => (
  <Svg {...p}>
    <path d="m12 3.5 8.5 4.3L12 12 3.5 7.8Z" />
    <path d="m3.5 12 8.5 4.3 8.5-4.3M3.5 16.2l8.5 4.3 8.5-4.3" />
  </Svg>
);

/** Lookup used by the agents and services data files. */
export const ICONS = {
  strategy: IconStrategy,
  content: IconContent,
  creative: IconCreative,
  performance: IconPerformance,
  crm: IconCrm,
  seo: IconSeo,
  analytics: IconAnalytics,
  automation: IconAutomation,
  ai: IconAi,
  system: IconSystem,
  audit: IconAudit,
  transform: IconTransform,
  database: IconDatabase,
  shield: IconShield,
  spark: IconSpark,
  megaphone: IconMegaphone,
  layers: IconLayers,
} as const;

export type IconKey = keyof typeof ICONS;
