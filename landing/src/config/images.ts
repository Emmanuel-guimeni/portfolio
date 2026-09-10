import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ILLUSTRATIONS DE SECTION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Chaque emplacement ci-dessous est une place réservée dans la mise en page.
 *  Déposez le fichier correspondant dans `public/images/` et il apparaît
 *  automatiquement ; tant qu'il est absent, la section se rend simplement sans
 *  image, sans case vide ni lien cassé.
 *
 *  Formats acceptés, par ordre de préférence : .webp, .jpg, .png
 *  Largeur conseillée : 1200 px minimum. Compressez avant de déposer
 *  (squoosh.app), l'objectif est < 250 Ko par image.
 *
 *  ⚠️ N'utilisez que des images dont vous détenez les droits, ou issues d'une
 *  banque dont la licence autorise l'usage commercial (Unsplash, Pexels).
 *  Pinterest n'en est pas une.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ImageSlotId =
  | 'ai-workspace'
  | 'social-team'
  | 'seo-dashboard'
  | 'strategy-workshop'
  | 'team-collaboration';

export interface ImageSlot {
  id: ImageSlotId;
  /** Nom de base attendu dans public/images/ (sans extension). */
  basename: string;
  /** Ratio d'affichage — évite tout décalage de mise en page au chargement. */
  ratio: string;
  /** Où l'image est utilisée, pour vous repérer. */
  usedIn: string;
}

export const IMAGE_SLOTS: Record<ImageSlotId, ImageSlot> = {
  'ai-workspace': {
    id: 'ai-workspace',
    basename: 'ai-workspace',
    ratio: '1 / 1',
    usedIn: 'Section « L’approche » — à côté du schéma du système',
  },
  'social-team': {
    id: 'social-team',
    basename: 'social-team',
    ratio: '4 / 5',
    usedIn: 'Section « Automatisation des réseaux sociaux »',
  },
  'seo-dashboard': {
    id: 'seo-dashboard',
    basename: 'seo-dashboard',
    ratio: '3 / 2',
    usedIn: 'Section « Automatisation du SEO »',
  },
  'strategy-workshop': {
    id: 'strategy-workshop',
    basename: 'strategy-workshop',
    ratio: '3 / 2',
    usedIn: 'Section « Ma méthode »',
  },
  'team-collaboration': {
    id: 'team-collaboration',
    basename: 'team-collaboration',
    ratio: '4 / 5',
    usedIn: 'Section « Services »',
  },
};

const EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'] as const;

/**
 * Cherche le fichier réellement présent pour un emplacement.
 * Renvoie `null` si aucun n'existe — la section s'affiche alors sans image.
 *
 * Résolu côté serveur au rendu, donc déposer un fichier suffit : aucun code à
 * modifier.
 */
export function resolveImage(id: ImageSlotId): string | null {
  const slot = IMAGE_SLOTS[id];
  for (const ext of EXTENSIONS) {
    const rel = `/images/${slot.basename}${ext}`;
    if (existsSync(path.join(process.cwd(), 'public', rel))) return rel;
  }
  return null;
}
