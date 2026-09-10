import { TOOLS } from '@/config/tools';
import { ICONS, type IconKey } from './Icons';
import { SectionHead } from './Sections';

/**
 * Stack technologique, groupée par catégorie. Construite depuis tools.ts : un
 * outil ajouté au tableau tarifaire apparaît ici automatiquement — les deux ne
 * peuvent jamais diverger.
 */

const CATEGORY_ICON: Record<string, IconKey> = {
  IA: 'ai',
  Automatisation: 'automation',
  CRM: 'crm',
  Email: 'content',
  'Réseaux sociaux': 'megaphone',
  Design: 'creative',
  Publicité: 'performance',
  SEO: 'seo',
  Analytics: 'analytics',
  Infrastructure: 'database',
};

const ORDER = [
  'IA',
  'Automatisation',
  'CRM',
  'Email',
  'Réseaux sociaux',
  'Design',
  'Publicité',
  'SEO',
  'Analytics',
  'Infrastructure',
];

export default function TechStack() {
  const grouped = ORDER.map((category) => ({
    category,
    // Une entrée par produit — les offres sont détaillées dans le tableau tarifaire.
    tools: Array.from(
      new Set(TOOLS.filter((t) => t.category === category).map((t) => t.name)),
    ),
  })).filter((g) => g.tools.length > 0);

  return (
    <section className="section section--bordered" id="stack">
      <div className="container">
        <SectionHead
          eyebrow="Stack technologique"
          title="Les outils avec lesquels je travaille vraiment"
          intro="Aucun outil n’est ici par effet de mode. Chacun gagne sa place en faisant un travail qu’aucun autre de la stack ne fait déjà."
          center
        />

        <div className="grid grid--3">
          {grouped.map((group) => {
            const Icon = ICONS[CATEGORY_ICON[group.category] ?? 'layers'];
            return (
              <div className="stack-group reveal" key={group.category}>
                <div className="stack-group__head">
                  <Icon size={18} />
                  <h3>{group.category}</h3>
                </div>
                <div className="stack-tools">
                  {group.tools.map((name) => (
                    <span className="stack-tool" key={name}>
                      <i aria-hidden="true" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
