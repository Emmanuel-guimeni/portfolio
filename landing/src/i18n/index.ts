import { DEFAULT_LOCALE, isLocale, type Locale } from './config';
import type { Dictionary } from './types';
import { fr } from './dictionaries/fr';
import { en } from './dictionaries/en';

/**
 * Registre des dictionnaires.
 *
 * Pour ajouter une langue : importez son dictionnaire, ajoutez-le ici, puis
 * ajoutez son entrée dans LOCALES (config.ts). Rien d'autre.
 */
const DICTIONARIES: Record<Locale, Dictionary> = {
  fr,
  en,
};

/**
 * Renvoie le dictionnaire d'une langue. Une langue inconnue retombe sur le
 * français plutôt que de faire planter la page.
 */
export function getDictionary(locale: string | undefined): Dictionary {
  return DICTIONARIES[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

export type { Dictionary } from './types';
export * from './config';
