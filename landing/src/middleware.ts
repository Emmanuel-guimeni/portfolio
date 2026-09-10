import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALE_CODES, isLocale, pickLocale } from '@/i18n/config';

/** Cookie fonctionnel qui mémorise la langue choisie par le visiteur. */
export const LOCALE_COOKIE = 'gea_locale';

/**
 * Toutes les pages vivent sous /<langue>. Ce middleware redirige les URL sans
 * préfixe vers la bonne langue :
 *   1. la langue déjà choisie par le visiteur (cookie), sinon
 *   2. la langue de son navigateur (Accept-Language), sinon
 *   3. le français.
 *
 * Les routes API, les fichiers statiques et les fichiers SEO sont laissés
 * intacts : ils n'ont pas de langue.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const first = pathname.split('/')[1];
  if (isLocale(first)) {
    // Déjà préfixé : on mémorise simplement la langue consultée.
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }
    return response;
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : pickLocale(request.headers.get('accept-language'));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  /**
   * Tout sauf : les routes API, les fichiers internes de Next, les fichiers
   * SEO servis à la racine et tout chemin contenant une extension de fichier.
   */
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml|site.webmanifest|apple-touch-icon.png|og.png|images/).*)',
  ],
};

export { LOCALE_CODES, DEFAULT_LOCALE };
