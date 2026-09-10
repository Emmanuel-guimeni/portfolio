/**
 * Représentation abstraite du système marketing IA : quatre couches d'entrée qui
 * alimentent un noyau d'orchestration, lequel pilote quatre couches de sortie.
 *
 * SVG inline pur — aucune image, aucune librairie, aucun décalage de mise en
 * page ; s'adapte à toute largeur et reste lisible sur fond sombre. `viewBox`
 * gère tous les points de rupture.
 */

import type { Dictionary } from '@/i18n/types';

export default function SystemDiagram({ d }: { d: Dictionary['solution']['diagram'] }) {
  const INPUTS = d.inputs;
  const OUTPUTS = d.outputs;
  return (
    <svg
      viewBox="0 0 720 420"
      role="img"
      aria-label={d.alt}
      style={{ width: '100%', height: 'auto' }}
    >
      <defs>
        <linearGradient id="sd-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id="sd-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sd-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* halo d’ambiance derrière le noyau */}
      <circle cx="360" cy="210" r="170" fill="url(#sd-glow)" />

      {/* connecteurs : entrées → noyau → sorties */}
      <g stroke="url(#sd-line)" strokeWidth="1.4" fill="none">
        {INPUTS.map((_, i) => (
          <path key={`in-${i}`} d={`M188 ${64 + i * 92} C 260 ${64 + i * 92}, 268 210, 300 210`} />
        ))}
        {OUTPUTS.map((_, i) => (
          <path key={`out-${i}`} d={`M420 210 C 452 210, 460 ${64 + i * 92}, 532 ${64 + i * 92}`} />
        ))}
      </g>

      {/* impulsions animées — animation SVG pure, sans JS, sans coût de repaint */}
      <g fill="#a5b4fc">
        {INPUTS.map((_, i) => (
          <circle key={`p-in-${i}`} r="3">
            <animateMotion
              dur={`${3.4 + i * 0.35}s`}
              repeatCount="indefinite"
              path={`M188 ${64 + i * 92} C 260 ${64 + i * 92}, 268 210, 300 210`}
            />
          </circle>
        ))}
        {OUTPUTS.map((_, i) => (
          <circle key={`p-out-${i}`} r="3">
            <animateMotion
              dur={`${3.2 + i * 0.4}s`}
              begin={`${0.6 + i * 0.2}s`}
              repeatCount="indefinite"
              path={`M420 210 C 452 210, 460 ${64 + i * 92}, 532 ${64 + i * 92}`}
            />
          </circle>
        ))}
      </g>

      {/* nœuds d’entrée */}
      {INPUTS.map((label, i) => (
        <g key={label} transform={`translate(28 ${64 + i * 92 - 20})`}>
          <rect
            width="160"
            height="40"
            rx="12"
            fill="#0e1119"
            stroke="rgba(255,255,255,0.12)"
          />
          <text
            x="80"
            y="25"
            textAnchor="middle"
            fill="#b6bfd0"
            fontSize="13"
            fontFamily="system-ui, sans-serif"
          >
            {label}
          </text>
        </g>
      ))}

      {/* noyau d’orchestration */}
      <g transform="translate(300 150)">
        <rect width="120" height="120" rx="30" fill="#0e1119" stroke="url(#sd-accent)" strokeWidth="1.6" />
        <rect x="26" y="26" width="68" height="68" rx="18" fill="url(#sd-accent)" opacity="0.16" />
        <text x="60" y="52" textAnchor="middle" fill="#f2f5fa" fontSize="15" fontWeight="600" fontFamily="system-ui, sans-serif">
          {d.core}
        </text>
        <text x="60" y="72" textAnchor="middle" fill="#7c8699" fontSize="10.5" letterSpacing="1.4" fontFamily="system-ui, sans-serif">
          {d.coreSub}
        </text>
      </g>

      {/* nœuds de sortie */}
      {OUTPUTS.map((label, i) => (
        <g key={label} transform={`translate(532 ${64 + i * 92 - 20})`}>
          <rect
            width="160"
            height="40"
            rx="12"
            fill="#0e1119"
            stroke="rgba(99,102,241,0.35)"
          />
          <text
            x="80"
            y="25"
            textAnchor="middle"
            fill="#e8ecf5"
            fontSize="13"
            fontFamily="system-ui, sans-serif"
          >
            {label}
          </text>
        </g>
      ))}

      {/* boucle de rétroaction */}
      <path
        d="M612 340 C 612 392, 480 400, 360 400 C 240 400, 108 392, 108 340"
        fill="none"
        stroke="rgba(139,92,246,0.35)"
        strokeWidth="1.4"
        strokeDasharray="5 6"
      />
      <text
        x="360"
        y="392"
        textAnchor="middle"
        fill="#7c8699"
        fontSize="11.5"
        letterSpacing="1.2"
        fontFamily="system-ui, sans-serif"
      >
        {d.loop}
      </text>
    </svg>
  );
}
