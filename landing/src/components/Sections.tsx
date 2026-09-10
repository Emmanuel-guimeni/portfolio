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

/** Pipeline horizontal utilisé par toutes les sections d'automatisation. */
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
          <i style={{ background: 'rgba(99,102,241,.35)' }} /> L’IA fait le travail
        </span>
        <span>
          <i style={{ background: 'rgba(251,191,36,.35)' }} /> Décision humaine
        </span>
        <span>
          <i style={{ background: 'rgba(52,211,153,.35)' }} /> Résultat &amp; données
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
          eyebrow="Le problème"
          title={
            <>
              La plupart des équipes marketing ne manquent pas d’outils.
              <br />
              Elles manquent d’un <span className="accent-text">système</span>.
            </>
          }
          intro="Chacun de ces symptômes vient de la même cause : des outils achetés un par un, jamais conçus pour fonctionner ensemble."
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
          <b>D’un marketing fragmenté</b>
          <IconArrowRight size={20} />
          <b className="accent-text">à des systèmes marketing intelligents</b>
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
          eyebrow="L’approche"
          title={
            <>
              IA <span className="muted">+</span> Marketing{' '}
              <span className="muted">+</span> Automatisation{' '}
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
              Un système, quatre disciplines, zéro copier-coller
            </h3>
            <p className="lede" style={{ marginBottom: '1.5rem' }}>
              La stratégie donne la direction. L’IA produit le volume. L’automatisation
              fait circuler les données entre les outils. L’analytics boucle la boucle et
              vous dit quoi changer ensuite — puis tout recommence.
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
          La chaîne de valeur complète
        </h3>
        <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '62ch' }}>
          Treize étapes, d’un inconnu jusqu’à un système optimisé. Chacune est
          instrumentée, automatisée là où elle doit l’être, et relue par un humain là où
          c’est indispensable.
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
          eyebrow="Les 7 agents marketing IA"
          title="Sept spécialistes, une équipe orchestrée"
          intro="Pas sept abonnements — sept rôles. Chacun a un périmètre défini, des entrées définies, des sorties définies, et un moment précis où un humain reprend la main."
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

          {/* Carte de clôture — l’humain, délibérément la 8ᵉ tuile */}
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
              <h3>L’humain</h3>
              <span className="agent__role">Responsable de chaque décision qui compte</span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Les agents proposent. Une personne décide. Marque, budget, tarifs, relation
              client et tout ce qui a un poids juridique ou réputationnel ne quittent jamais
              les mains humaines — c’est une règle de conception, pas une limite.
            </p>
            <ul className="agent__caps">
              <li>Jugement de marque</li>
              <li>Validation du budget</li>
              <li>Relation client</li>
              <li>Dernier mot</li>
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
                      Outils utilisés
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
          title="Six sources, un dashboard, une décision à la fois"
          intro="Le reporting n’est pas un rituel mensuel. C’est le mécanisme qui dit au système quoi changer — et il ne fonctionne que si toutes les sources atterrissent au même endroit."
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
                { name: 'Looker Studio', note: 'Gratuit, natif à GA4 et Google Ads' },
                { name: 'Power BI', note: 'Modèles gouvernés et partage à l’échelle de l’organisation' },
                { name: 'Sheets / Excel', note: 'Modélisation et transmissions rapides' },
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
   Principes de conception — placés juste avant le CTA final
   ═══════════════════════════════════════════════════════════════════════════ */

export function Principles() {
  return (
    <section className="section section--panel" id="principles">
      <div className="container">
        <SectionHead
          eyebrow="Principes de conception"
          title="Les règles que tout système que je construis doit respecter"
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
