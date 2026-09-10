import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from '@/config/tools';
import type { Dictionary } from '@/i18n/types';
import { ICONS, type IconKey } from './Icons';
import { SectionHead } from './Primitives';

/**
 * Stack technologique, groupée par catégorie. Construite depuis tools.ts : un
 * outil ajouté au tableau tarifaire apparaît ici automatiquement — les deux ne
 * peuvent jamais diverger.
 */

const CATEGORY_ICON: Record<ToolCategory, IconKey> = {
  ai: 'ai',
  automation: 'automation',
  crm: 'crm',
  email: 'content',
  social: 'megaphone',
  design: 'creative',
  advertising: 'performance',
  seo: 'seo',
  analytics: 'analytics',
  infrastructure: 'database',
};

export default function TechStack({ d }: { d: Dictionary }) {
  const grouped = TOOL_CATEGORIES.map((category) => ({
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
          eyebrow={d.stack.eyebrow}
          title={d.stack.title}
          intro={d.stack.intro}
          center
        />

        <div className="grid grid--3">
          {grouped.map((group) => {
            const Icon = ICONS[CATEGORY_ICON[group.category] ?? 'layers'];
            return (
              <div className="stack-group reveal" key={group.category}>
                <div className="stack-group__head">
                  <Icon size={18} />
                  <h3>{d.stack.categories[group.category]}</h3>
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
