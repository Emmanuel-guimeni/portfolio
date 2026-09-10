/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  INTERNATIONALISATION — configuration des langues
 * ─────────────────────────────────────────────────────────────────────────────
 *  Le français est la langue principale et la source de vérité du contenu.
 *  Chaque langue a sa propre URL indexable (/fr, /en, /ar, /es) avec des
 *  balises hreflang, comme le recommande Google pour le référencement
 *  multilingue.
 *
 *  POUR AJOUTER UNE LANGUE :
 *   1. Créez src/i18n/dictionaries/<code>.ts en copiant fr.ts et traduisez-le.
 *      TypeScript refusera de compiler tant qu'une clé manque — c'est voulu.
 *   2. Ajoutez son entrée dans LOCALES ci-dessous.
 *   3. Importez-la dans src/i18n/index.ts.
 *  Rien d'autre à toucher : navigation, hreflang, sitemap et sélecteur de
 *  langue se mettent à jour tout seuls.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface LocaleMeta {
  /** Code ISO 639-1, utilisé dans l'URL et l'attribut lang. */
  code: string;
  /** Nom de la langue, écrit dans cette langue. */
  nativeName: string;
  /** Libellé court affiché dans le sélecteur. */
  short: string;
  /** Sens de lecture. 'rtl' bascule toute la mise en page. */
  dir: 'ltr' | 'rtl';
  /** Locale complète, pour Open Graph et Intl. */
  bcp47: string;
  /** Locale de repli pour le formatage des nombres et des dates. */
  numberLocale: string;
}

export const LOCALES = [
  {
    code: 'fr',
    nativeName: 'Français',
    short: 'FR',
    dir: 'ltr',
    bcp47: 'fr_FR',
    numberLocale: 'fr-FR',
  },
  {
    code: 'en',
    nativeName: 'English',
    short: 'EN',
    dir: 'ltr',
    bcp47: 'en_US',
    numberLocale: 'en-US',
  },
] as const satisfies readonly LocaleMeta[];

export type Locale = (typeof LOCALES)[number]['code'];

export const LOCALE_CODES = LOCALES.map((l) => l.code) as Locale[];

/** Langue principale : c'est elle que sert la racine du site. */
export const DEFAULT_LOCALE: Locale = 'fr';

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value) && (LOCALE_CODES as string[]).includes(value as string);
}

export function localeMeta(locale: Locale): LocaleMeta {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
}

/** Sens de lecture d'une langue. */
export function localeDir(locale: Locale): 'ltr' | 'rtl' {
  return localeMeta(locale).dir;
}

/**
 * Choisit la meilleure langue à partir de l'en-tête Accept-Language.
 * Utilisé par le middleware pour rediriger la racine du site.
 */
export function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return {
        tag: tag.trim().toLowerCase(),
        q: q ? Number(q.split('=')[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

/** Construit un chemin préfixé par la langue : ('en', '/privacy') → '/en/privacy'. */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}
