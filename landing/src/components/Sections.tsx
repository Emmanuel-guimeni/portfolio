import { AGENTS } from '@/config/agents';
import { site } from '@/config/site';
import {
  DATA_PIPELINE,
  DATA_SOURCES,
  DESIGN_PRINCIPLES,
  PROBLEMS,
  SOLUTION_CHAIN,
  WORKFLOWS,
  type FlowStep,
} from '@/config/workflows';
import {
  IconAlert,
  IconArrowRight,
  IconCheck,
  IconLayers,
  IconSpark,
  ICONS,
} from './Icons';
import SystemDiagram from './SystemDiagram';

/* ═══════════════════════════════════════════════════════════════════════════
   Shared building blocks
   ═══════════════════════════════════════════════════════════════════════════ */

export function SectionHead({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

/** Horizontal pipeline used by every automation section. */
export function Flow({ steps }: { steps: FlowStep[] }) {
  return (
    <>
      <ol className="flow">
        {steps.map((step, i) => (
          <li
            key={step.label}
            className={`flow__step${step.kind ? ` flow__step--${step.kind}` : ''}`}
          >
            <i>{String(i + 1).padStart(2, '0')}</i>
            <b>{step.label}</b>
            {step.detail ? <small>{step.detail}</small> : null}
          </li>
        ))}
      </ol>
      <p className="flow-legend">
        <span>
          <i style={{ background: 'rgba(99,102,241,.35)' }} /> AI does the work
        </span>
        <span>
          <i style={{ background: 'rgba(251,191,36,.35)' }} /> Human decision
        </span>
        <span>
          <i style={{ background: 'rgba(52,211,153,.35)' }} /> Output &amp; data
        </span>
      </p>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · PROBLEM
   ═══════════════════════════════════════════════════════════════════════════ */

export function Problem() {
  return (
    <section className="section section--bordered" id="problem">
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          title={
            <>
              Most marketing teams are not short of tools.
              <br />
              They are short of a <span className="accent-text">system</span>.
            </>
          }
          intro="Every one of these is a symptom of the same root cause: tools bought one at a time, never designed to work as a whole."
        />

        <ul className="problem-grid">
          {PROBLEMS.map((problem) => (
            <li className="problem-cell" key={problem}>
              <IconAlert size={18} />
              <span>{problem}</span>
            </li>
          ))}
        </ul>

        <div className="transition-bar">
          <b>From fragmented marketing</b>
          <IconArrowRight size={20} />
          <b className="accent-text">to intelligent marketing systems</b>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4–5 · SOLUTION + AI MARKETING SYSTEM
   ═══════════════════════════════════════════════════════════════════════════ */

export function Solution() {
  return (
    <section className="section section--panel" id="system">
      <div className="container">
        <SectionHead
          eyebrow="The approach"
          title={
            <>
              AI <span className="muted">+</span> Marketing{' '}
              <span className="muted">+</span> Automation{' '}
              <span className="muted">+</span> Data
            </>
          }
          intro={site.manifesto}
        />

        <div className="split split--wide-left" style={{ marginBottom: '3.5rem' }}>
          <div
            className="card"
            style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}
          >
            <SystemDiagram />
          </div>

          <div>
            <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '1rem' }}>
              One system, four disciplines, zero copy-paste
            </h3>
            <p className="lede" style={{ marginBottom: '1.5rem' }}>
              Strategy sets the direction. AI produces the volume. Automation moves the
              data between tools. Analytics closes the loop and tells you what to change
              next — then the whole thing runs again.
            </p>
            <ul className="checklist">
              {site.signature.map((line) => (
                <li key={line}>
                  <IconCheck size={16} />
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
          The full value chain
        </h3>
        <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '62ch' }}>
          Thirteen steps from a stranger to an optimised system. Every step below is
          instrumented, automated where it should be, and reviewed by a human where it
          must be.
        </p>

        <ol className="chain">
          {SOLUTION_CHAIN.map((link, i) => (
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
   6 · THE 7 AI MARKETING AGENTS
   ═══════════════════════════════════════════════════════════════════════════ */

export function Agents() {
  return (
    <section className="section section--bordered" id="agents">
      <div className="container">
        <SectionHead
          eyebrow="The 7 AI marketing agents"
          title="Seven specialists, one orchestrated team"
          intro="Not seven subscriptions — seven roles. Each one has a defined scope, defined inputs, defined outputs, and a defined moment where a human takes over."
          center
        />

        <div className="grid grid--3">
          {AGENTS.map((agent) => {
            const Icon = ICONS[agent.icon];
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

          {/* Closing card — the human, deliberately the 8th tile */}
          <article
            className="agent reveal"
            style={{
              borderColor: 'var(--line-accent)',
              background: 'var(--grad-accent-soft), var(--surface)',
            }}
          >
            <div className="agent__top">
              <span className="agent__num" style={{ opacity: 0.5 }}>
                00
              </span>
              <span className="agent__icon">
                <IconSpark size={20} />
              </span>
            </div>
            <div>
              <h3>The human</h3>
              <span className="agent__role">Owner of every decision that matters</span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              The agents propose. A person decides. Brand, budget, pricing, client
              relationships and anything with legal or reputational weight never leave
              human hands — that is a design rule, not a limitation.
            </p>
            <ul className="agent__caps">
              <li>Brand judgement</li>
              <li>Budget approval</li>
              <li>Client relationships</li>
              <li>Final say</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7–13 · AUTOMATION SECTIONS (Content Factory → SEO)
   ═══════════════════════════════════════════════════════════════════════════ */

export function AutomationSections() {
  return (
    <div id="automation">
      {WORKFLOWS.map((wf, index) => (
        <section
          className={`section ${index % 2 === 0 ? 'section--bordered' : 'section--panel'}`}
          id={wf.id}
          key={wf.id}
        >
          <div className="container">
            <SectionHead eyebrow={wf.eyebrow} title={wf.title} intro={wf.intro} />

            <div className="reveal">
              <Flow steps={wf.steps} />
            </div>

            {(wf.bullets || wf.tools) && (
              <div
                className={wf.tools ? 'grid grid--2' : ''}
                style={{ marginTop: '2.25rem', alignItems: 'start' }}
              >
                {wf.bullets && (
                  <ul className={`checklist${wf.tools ? '' : ' checklist--split'}`}>
                    {wf.bullets.map((b) => (
                      <li key={b}>
                        <IconCheck size={16} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {wf.tools && (
                  <div>
                    <h4
                      style={{
                        marginBottom: '0.9rem',
                        fontSize: 'var(--fs-xs)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Tools used
                    </h4>
                    <div className="stack-tools">
                      {wf.tools.map((t) => (
                        <span className="stack-tool" key={t}>
                          <i aria-hidden="true" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {wf.note && (
              <p
                className="lede"
                style={{
                  marginTop: '1.75rem',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid var(--line-accent)',
                  fontSize: 'var(--fs-base)',
                }}
              >
                {wf.note}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   14 · DATA & ANALYTICS
   ═══════════════════════════════════════════════════════════════════════════ */

export function DataAnalytics() {
  return (
    <section className="section section--bordered" id="data">
      <div className="container">
        <SectionHead
          eyebrow="Data &amp; Analytics"
          title="Six sources, one dashboard, one decision at a time"
          intro="Reporting is not a monthly ritual. It is the mechanism that tells the system what to change — which only works when every source lands in the same place."
        />

        <div className="split split--wide-right" style={{ alignItems: 'start' }}>
          <div>
            <h3
              style={{
                marginBottom: '1rem',
                fontSize: 'var(--fs-xs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Sources
            </h3>
            <div className="grid" style={{ gap: '8px' }}>
              {DATA_SOURCES.map((source) => (
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
            <h3
              style={{
                marginBottom: '1rem',
                fontSize: 'var(--fs-xs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Pipeline
            </h3>
            <Flow steps={DATA_PIPELINE} />

            <div className="grid grid--3" style={{ marginTop: '1.75rem' }}>
              {[
                { name: 'Looker Studio', note: 'Free, native to GA4 and Google Ads' },
                { name: 'Power BI', note: 'Governed models and org-wide sharing' },
                { name: 'Sheets / Excel', note: 'Modelling and quick hand-offs' },
              ].map((tool) => (
                <div className="card" key={tool.name} style={{ padding: '16px 18px' }}>
                  <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: 4 }}>
                    {tool.name}
                  </h3>
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
   Design principles (§50) — used just above the final CTA
   ═══════════════════════════════════════════════════════════════════════════ */

export function Principles() {
  return (
    <section className="section section--panel" id="principles">
      <div className="container">
        <SectionHead
          eyebrow="Design principles"
          title="The rules every system I build has to satisfy"
          intro={site.philosophy}
          center
        />
        <div className="grid grid--4">
          {DESIGN_PRINCIPLES.map((principle) => (
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
