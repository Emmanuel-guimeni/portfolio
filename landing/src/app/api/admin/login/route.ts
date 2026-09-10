import { NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  createSessionToken,
  isAdminConfigured,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/auth';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/admin/login — { password } → sets the signed session cookie. */
export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'L’accès administrateur n’est pas configuré. Renseignez ADMIN_PASSWORD et ADMIN_SESSION_SECRET.',
      },
      { status: 503 },
    );
  }

  // 8 attempts per IP per 15 minutes — brute-force protection.
  const limited = rateLimit(`login:${clientIp(req.headers)}`, 8, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Trop de tentatives. Réessayez plus tard.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } },
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'Corps de requête JSON invalide.' }, { status: 400 });
  }

  if (!body.password || !verifyPassword(body.password)) {
    return NextResponse.json({ ok: false, error: 'Mot de passe incorrect.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return res;
}
