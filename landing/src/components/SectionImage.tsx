import Image from 'next/image';
import { IMAGE_SLOTS, resolveImage, type ImageSlotId } from '@/config/images';

/**
 * Illustration de section.
 *
 * Ne rend rien tant que le fichier n'existe pas dans public/images/ : la mise
 * en page reste donc propre avant même que les visuels soient livrés.
 *
 * Les photos de banque sont presque toujours claires et saturées, alors que le
 * site est sombre. Le cadre applique donc un traitement homogène — coins
 * arrondis, filet, dégradé sombre par-dessus et légère teinte indigo — pour
 * qu'une image déposée s'intègre au lieu de trancher.
 */
export default function SectionImage({
  id,
  alt,
  caption,
  priority = false,
  className = '',
  sizes = '(max-width: 960px) 100vw, 46vw',
}: {
  id: ImageSlotId;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const src = resolveImage(id);
  if (!src) return null;

  const slot = IMAGE_SLOTS[id];

  return (
    <figure
      className={`section-image ${className}`.trim()}
      style={{ ['--img-ratio' as string]: slot.ratio }}
    >
      <div className="section-image__frame">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="section-image__img"
        />
        <span className="section-image__scrim" aria-hidden="true" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
