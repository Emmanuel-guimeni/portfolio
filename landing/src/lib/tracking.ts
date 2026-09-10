/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MARKETING EVENT TRACKING
 * ─────────────────────────────────────────────────────────────────────────────
 *  One function, four destinations. Every destination is optional: if the tag
 *  is not installed the call is a silent no-op, so the site never breaks
 *  because an ID is missing.
 *
 *   · GA4                 → window.gtag
 *   · Google Tag Manager  → window.dataLayer
 *   · Meta Pixel          → window.fbq
 *   · LinkedIn Insight    → window.lintrk
 *
 *  IDs are placeholders in .env.example — never commit real ones, and never put
 *  a secret in a NEXT_PUBLIC_ variable.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type TrackedEvent =
  | 'page_view'
  | 'scroll_depth'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'audit_request'
  | 'consulting_request'
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'pricing_currency_change';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
  }
}

/** Meta Pixel only recognises a fixed vocabulary; everything else is custom. */
const META_STANDARD: Partial<Record<TrackedEvent, string>> = {
  form_submit: 'Lead',
  audit_request: 'Lead',
  consulting_request: 'Lead',
  form_start: 'InitiateCheckout',
};

export function track(event: TrackedEvent, params: Params = {}): void {
  if (typeof window === 'undefined') return;

  const payload = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined),
  );

  try {
    window.dataLayer?.push({ event, ...payload });
    window.gtag?.('event', event, payload);

    const metaEvent = META_STANDARD[event];
    if (metaEvent) window.fbq?.('track', metaEvent, payload);
    else window.fbq?.('trackCustom', event, payload);

    window.lintrk?.('track', { conversion_id: event });
  } catch {
    // Analytics must never take the page down.
  }
}

/** Reads the UTM parameters from the current URL, with sessionStorage memory. */
export function captureAttribution(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page?: string;
  source?: string;
} {
  if (typeof window === 'undefined') return {};

  const KEY = 'gea_attribution';
  const params = new URLSearchParams(window.location.search);

  const fresh = {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
  };

  // First touch wins: keep whatever brought the visitor here originally.
  try {
    const stored = window.sessionStorage.getItem(KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as typeof fresh;
      if (parsed.utm_source || parsed.utm_medium || parsed.utm_campaign) {
        Object.assign(fresh, parsed);
      }
    }
    if (fresh.utm_source || fresh.utm_medium || fresh.utm_campaign) {
      window.sessionStorage.setItem(KEY, JSON.stringify(fresh));
    }
  } catch {
    // Private browsing — attribution is best-effort, never blocking.
  }

  return {
    ...fresh,
    landing_page: `${window.location.origin}${window.location.pathname}`,
    source: fresh.utm_source ? 'campaign' : referrerSource(),
  };
}

function referrerSource(): string {
  const ref = document.referrer;
  if (!ref) return 'direct';
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '');
    if (host === window.location.hostname) return 'internal';
    if (/google|bing|duckduckgo|yahoo|ecosia/.test(host)) return 'organic-search';
    if (/linkedin/.test(host)) return 'linkedin';
    if (/facebook|instagram|fb\.com/.test(host)) return 'meta';
    if (/whatsapp/.test(host)) return 'whatsapp';
    return host;
  } catch {
    return 'referral';
  }
}
