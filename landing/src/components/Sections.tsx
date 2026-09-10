import type { Dictionary } from '@/i18n/types';
import {
  IconAlert,
  IconArrowRight,
  IconCheck,
  IconLayers,
  IconSpark,
  ICONS,
  type IconKey,
} from './Icons';
import { Flow, MicroHeading, SectionHead, ToolPills } from './Primitives';
import SectionImage from './SectionImage';
import SystemDiagram from './SystemDiagram';

/* ═══════════════════════════════════════════════════════════════════════════
   PROBLÈME
   ═══════════════════════════════════════════════════════════════════════════ */

export function Problem({ d }: { d: Dictionary }) {
  return (
    <section className="section section--bordered" id="problem">
      <div className="container">
        <SectionHead
          eyebrow={d.problem.eyebrow}
          title={
            <>
              {d.problem.titleLead}
              <br />
              {d.problem.titleTail}{' '}
              <span className="accent-text">{d.problem.titleAccent}</span>.
            </>
          }
          intro={d.problem.intro}
        />

        <ul className="problem-grid">
          {d.problem.items.map((problem) => (
            <li className="problem-cell" key={problem}>
              <IconAlert size={18} />
              <span>{problem}</span>
            </li>
          ))}
        </ul>

        <div className="transition-bar">
          <b>{d.problem.from}</b>
          <IconArrowRight size={20} />
          <b className="accent-text">{d.problem.to}</b>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOLUTION + SYSTÈME
   ═══════════════════════════════════════════════════════════════════════════ */

export function Solution({ d }: { d: Dictionary }) {
  return (
    <section className="section section--panel" id="system">
      <div className="container">
        <SectionHead
          eyebrow={d.solution.eyebrow}
          title={
            <>
              {d.solution.titleParts.map((part, i) => (
                <span key={part}>
                  {i > 0 && <span className="muted"> + </span>}
                  {part}
                </span>
              ))}
            </>
          }
          intro={d.solution.intro}
        />

        <div className="split split--wide-left" style={{ marginBottom: '3.5rem' }}>
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}>
            <SystemDiagram d={d.solution.diagram} />
          </div>

          <div>
            <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '1rem' }}>
              {d.solution.sideTitle}
            </h3>
            <p className="lede" style={{ marginBottom: '1.5rem' }}>
              {d.solution.sideBody}
            </p>
            <ul className="checklist" style={{ marginBottom: '1.75rem' }}>
              {d.site.signature.map((line) => (
                <li key={line}>
                  <IconCheck size={16} />
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{line}</span>
                </li>
              ))}
            </ul>
            <SectionImage
              id="ai-workspace"
              alt={d.solution.diagram.alt}
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </div>
        </div>

        <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
          {d.solution.chainTitle}
        </h3>
        <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '62ch' }}>
          {d.solution.chainIntro}
        </p>

        <ol className="chain">
          {d.solution.chain.map((link, i) => (
            <li className="chain__row" key={link.label}>
              <span className="chain__idx">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <b>{link.label}</b>
                <small>{link.detail}</small>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LES 7 AGENTS MARKETING IA
   ═══════════════════════════════════════════════════════════════════════════ */

const AGENT_ICONS: IconKey[] = [
  'strategy',
  'content',
  'creative',
  'performance',
  'crm',
  'seo',
  'analytics',
];

export function Agents({ d }: { d: Dictionary }) {
  return (
    <section className="section section--bordered" id="agents">
      <div className="container">
        <SectionHead
          eyebrow={d.agents.eyebrow}
          title={d.agents.title}
          intro={d.agents.intro}
          center
        />

        <div className="grid grid--3">
          {d.agents.list.map((agent, i) => {
            const Icon = ICONS[AGENT_ICONS[i] ?? 'system'];
            return (
              <article className="agent reveal" key={agent.num}>
                <div className="agent__top">
                  <span className="agent__num">{agent.num}</span>
                  <span className="agent__icon">
                    <Icon size={20} />
                  </span>
                </div>
                <div>
                  <h3>{agent.name}</h3>
                  <span className="agent__role">{agent.role}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>{agent.summary}</p>
                <ul className="agent__caps">
                  {agent.capabilities.map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
              </article>
            );
          })}

          {/* Carte de clôture — l'humain, délibérément la 8ᵉ tuile */}
          <article
            className="agent reveal"
            style={{
              borderColor: 'var(--line-accent)',
              background: 'var(--grad-accent-soft), var(--surface)',
            }}
          >
            <div className="agent__top">
              <span className="agent__num" style={{ opacity: 0.5 }}>
                {d.agents.human.num}
              </span>
              <span className="agent__icon">
                <IconSpark size={20} />
              </span>
            </div>
            <div>
              <h3>{d.agents.human.name}</h3>
              <span className="agent__role">{d.agents.human.role}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>{d.agents.human.summary}</p>
            <ul className="agent__caps">
              {d.agents.human.capabilities.map((cap) => (
                <li key={cap}>{cap}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTIONS D'AUTOMATISATION
   ═══════════════════════════════════════════════════════════════════════════ */

/** Les sections qui reçoivent une illustration, et laquelle. */
const WORKFLOW_IMAGE = {
  'social-automation': 'social-team',
  'seo-automation': 'seo-dashboard',
} as const;

export function AutomationSections({ d }: { d: Dictionary }) {
  return (
    <div id="automation">
      {d.workflows.map((wf, index) => {
        const imageId = WORKFLOW_IMAGE[wf.id as keyof typeof WORKFLOW_IMAGE];
        const sideBySide = Boolean(wf.tools || imageId);

        return (
          <section
            className={`section ${index % 2 === 0 ? 'section--bordered' : 'section--panel'}`}
            id={wf.id}
            key={wf.id}
          >
            <div className="container">
              <SectionHead eyebrow={wf.eyebrow} title={wf.title} intro={wf.intro} />

              <div className="reveal">
                <Flow steps={wf.steps} legend={d.flowLegend} />
              </div>

              {(wf.bullets || sideBySide) && (
                <div
                  className={sideBySide ? 'grid grid--2' : ''}
                  style={{ marginTop: '2.25rem', alignItems: 'start' }}
                >
                  {wf.bullets && (
                    <ul className={`checklist${sideBySide ? '' : ' checklist--split'}`}>
                      {wf.bullets.map((b) => (
                        <li key={b}>
                          <IconCheck size={16} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {imageId ? (
                    <SectionImage id={imageId} alt={wf.title} />
                  ) : (
                    wf.tools && (
                      <div>
                        <MicroHeading>{d.stack.toolsUsed}</MicroHeading>
                        <ToolPills tools={wf.tools} />
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Quand l'image occupe la colonne, les outils passent dessous. */}
              {wf.tools && imageId && (
                <div style={{ marginTop: '1.75rem' }}>
                  <MicroHeading>{d.stack.toolsUsed}</MicroHeading>
                  <ToolPills tools={wf.tools} />
                </div>
              )}

              {wf.note && (
                <p
                  className="lede"
                  style={{
                    marginTop: '1.75rem',
                    paddingInlineStart: '1rem',
                    borderInlineStart: '2px solid var(--line-accent)',
                    fontSize: 'var(--fs-base)',
                  }}
                >
                  {wf.note}
                </p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA & ANALYTICS
   ═══════════════════════════════════════════════════════════════════════════ */

export function DataAnalytics({ d }: { d: Dictionary }) {
  return (
    <section className="section section--bordered" id="data">
      <div className="container">
        <SectionHead eyebrow={d.data.eyebrow} title={d.data.title} intro={d.data.intro} />

        <div className="split split--wide-right" style={{ alignItems: 'start' }}>
          <div>
            <MicroHeading>{d.data.sourcesLabel}</MicroHeading>
            <div className="grid" style={{ gap: '8px' }}>
              {d.data.sources.map((source) => (
                <div className="chain__row" key={source}>
                  <span className="chain__idx">
                    <IconLayers size={15} />
                  </span>
                  <b>{source}</b>
                </div>
              ))}
            </div>
          </div>

          <div>
            <MicroHeading>{d.data.pipelineLabel}</MicroHeading>
            <Flow steps={d.data.pipeline} legend={d.flowLegend} />

            <div className="grid grid--3" style={{ marginTop: '1.75rem' }}>
              {d.data.tools.map((tool) => (
                <div className="card" key={tool.name} style={{ padding: '16px 18px' }}>
                  <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: 4 }}>{tool.name}</h3>
                  <p style={{ fontSize: 'var(--fs-xs)' }}>{tool.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINCIPES DE CONCEPTION
   ═══════════════════════════════════════════════════════════════════════════ */

export function Principles({ d }: { d: Dictionary }) {
  return (
    <section className="section section--panel" id="principles">
      <div className="container">
        <SectionHead
          eyebrow={d.principles.eyebrow}
          title={d.principles.title}
          intro={d.site.philosophy}
          center
        />
        <div className="grid grid--4">
          {d.principles.items.map((principle) => (
            <div className="card card--hover reveal" key={principle.title}>
              <h3 style={{ fontSize: 'var(--fs-base)' }}>{principle.title}</h3>
              <p style={{ fontSize: 'var(--fs-sm)' }}>{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
