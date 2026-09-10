/**
 * Layered anti-spam. Each layer is cheap and independent:
 *
 *  1. Honeypot field   — a hidden input no human can fill in.
 *  2. Time trap        — a form completed in under 3 seconds is a bot.
 *  3. Cloudflare Turnstile — real CAPTCHA-grade verification, optional.
 *
 * Rate limiting lives in rate-limit.ts and is applied on top of all three.
 */

export const HONEYPOT_FIELD = 'website_url';
export const TIMESTAMP_FIELD = 'form_loaded_at';
const MIN_FILL_MS = 3_000;
const MAX_FORM_AGE_MS = 6 * 60 * 60 * 1000; // 6h — stale tab, ask them to reload

export interface SpamCheck {
  spam: boolean;
  reason?: string;
}

export function checkHoneypot(body: Record<string, unknown>): SpamCheck {
  const value = body[HONEYPOT_FIELD];
  if (typeof value === 'string' && value.trim() !== '') {
    return { spam: true, reason: 'honeypot' };
  }
  return { spam: false };
}

export function checkTiming(body: Record<string, unknown>): SpamCheck {
  const loadedAt = Number(body[TIMESTAMP_FIELD]);
  if (!Number.isFinite(loadedAt) || loadedAt <= 0) {
    // No timestamp at all — treat as suspicious but not fatal on its own.
    return { spam: false };
  }
  const elapsed = Date.now() - loadedAt;
  if (elapsed < MIN_FILL_MS) return { spam: true, reason: 'submitted-too-fast' };
  if (elapsed > MAX_FORM_AGE_MS) return { spam: true, reason: 'stale-form' };
  return { spam: false };
}

/**
 * Cloudflare Turnstile server-side verification.
 * Returns true when Turnstile is not configured, so the form keeps working
 * before you set it up. STATUS: READY IN CODE — REQUIRES EXTERNAL CONFIGURATION.
 */
export async function verifyTurnstile(
  token: unknown,
  remoteIp?: string,
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;
  if (typeof token !== 'string' || !token) return false;

  try {
    const form = new URLSearchParams({ secret: secretKey, response: token });
    if (remoteIp && remoteIp !== 'unknown') form.set('remoteip', remoteIp);

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body: form },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Never lose a genuine lead because the CAPTCHA endpoint was unreachable.
    return true;
  }
}
