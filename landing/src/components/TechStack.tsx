import { TOOLS } from '@/config/tools';
import { ICONS, type IconKey } from './Icons';
import { SectionHead } from './Sections';

/**
 * Technology stack, grouped by category. Built from tools.ts so a tool added to
 * the pricing table automatically appears here — the two can never disagree.
 */

const CATEGORY_ICON: Record<string, IconKey> = {
  AI: 'ai',
  Automation: 'automation',
  CRM: 'crm',
  Email: 'content',
  'Social Media': 'megaphone',
  Design: 'creative',
  Advertising: 'performance',
  SEO: 'seo',
  Analytics: 'analytics',
  Infrastructure: 'database',
};

const ORDER = [
  'AI',
  'Automation',
  'CRM',
  'Email',
  'Social Media',
  'Design',
  'Advertising',
  'SEO',
  'Analytics',
  'Infrastructure',
];

export default function TechStack() {
  const grouped = ORDER.map((category) => ({
    category,
    // One entry per product name — plans are shown in the pricing table instead.
    tools: Array.from(
      new Set(TOOLS.filter((t) => t.category === category).map((t) => t.name)),
    ),
  })).filter((g) => g.tools.length > 0);

  return (
    <section className="section section--bordered" id="stack">
      <div className="container">
        <SectionHead
          eyebrow="Technology stack"
          title="The tools I actually work with"
          intro="No tool is here because it is fashionable. Each one earns its place by doing a job nothing else in the stack already does."
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
