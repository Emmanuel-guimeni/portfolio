import type { Dictionary, FlowStepCopy } from '@/i18n/types';

/**
 * Primitives de mise en page partagées.
 *
 * Ce module est volontairement dépourvu de toute dépendance serveur : il est
 * importé aussi bien par des composants serveur que par des composants client
 * ('use client'). Y ajouter un import Node (`fs`, `path`…) casserait le build
 * du bundle navigateur.
 */

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
export function Flow({
  steps,
  legend,
}: {
  steps: FlowStepCopy[];
  legend: Dictionary['flowLegend'];
}) {
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
          <i style={{ background: 'rgba(99,102,241,.35)' }} /> {legend.ai}
        </span>
        <span>
          <i style={{ background: 'rgba(251,191,36,.35)' }} /> {legend.human}
        </span>
        <span>
          <i style={{ background: 'rgba(52,211,153,.35)' }} /> {legend.out}
        </span>
      </p>
    </>
  );
}

/** Titre de sous-bloc, réutilisé pour « Sources », « Pipeline », « Outils ». */
export function MicroHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        marginBottom: '0.9rem',
        fontSize: 'var(--fs-xs)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}
    >
      {children}
    </h4>
  );
}

export function ToolPills({ tools }: { tools: string[] }) {
  return (
    <div className="stack-tools">
      {tools.map((t) => (
        <span className="stack-tool" key={t}>
          <i aria-hidden="true" />
          {t}
        </span>
      ))}
    </div>
  );
}
