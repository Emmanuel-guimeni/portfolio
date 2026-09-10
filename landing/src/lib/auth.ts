import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * Admin authentication for /admin and for the protected lead endpoints.
 *
 * A signed, httpOnly, SameSite=Lax session cookie — no third-party dependency,
 * no password stored anywhere except the ADMIN_PASSWORD environment variable.
 * Machine clients (Make / Zapier / n8n) authenticate instead with a bearer
 * token (LEADS_API_TOKEN).
 *
 * If ADMIN_PASSWORD or ADMIN_SESSION_SECRET is missing, the admin area is
 * closed rather than open — failing shut is the only safe default.
 */

export const SESSION_COOKIE = 'gea_admin';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

/** Constant-time string comparison that tolerates unequal lengths. */
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) {
    // Still burn a comparison so the timing signal does not leak the length.
    timingSafeEqual(ba, ba);
    return false;
  }
  return timingSafeEqual(ba, bb);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !secret()) return false;
  return safeEqual(candidate, expected);
}

/** token = <expiryMs>.<nonce>.<hmac> */
export function createSessionToken(): string {
  const key = secret();
  if (!key) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const payload = `${Date.now() + SESSION_TTL_MS}.${randomBytes(12).toString('hex')}`;
  const sig = createHmac('sha256', key).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const key = secret();
  if (!key || !token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [expiry, nonce, sig] = parts;
  const expected = createHmac('sha256', key).update(`${expiry}.${nonce}`).digest('hex');
  if (!safeEqual(sig, expected)) return false;

  const expiresAt = Number(expiry);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_TTL_MS / 1000,
} as const;

/** True when the current request carries a valid admin session cookie. */
export async function hasAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * Authorises a request to a protected API route: either an admin session
 * cookie, or `Authorization: Bearer <LEADS_API_TOKEN>` for machine clients.
 */
export async function isAuthorised(req: Request): Promise<boolean> {
  const token = process.env.LEADS_API_TOKEN;
  const header = req.headers.get('authorization');
  if (token && header?.startsWith('Bearer ') && safeEqual(header.slice(7), token)) {
    return true;
  }
  return hasAdminSession();
}
