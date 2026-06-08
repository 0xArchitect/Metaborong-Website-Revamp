// Signature visual for the Cloud & DevOps Engineering leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). A CI/CD
// pipeline blueprint: four stage nodes (commit → build → test → deploy) joined
// by a drawn flow line, a curved rollback arc looping back from deploy, and an
// uptime/heartbeat line beneath as the observability accent — automated,
// observable, recoverable delivery. Pure SVG; the stroke-draw plays once on
// mount (hero is above the fold) and short-circuits to the final state under
// prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function CloudDevopsVisual() {
  return (
    <figure className="cdv relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* baseline rail the pipeline runs along */}
        <line
          className="cdv-grid"
          x1="40"
          y1="150"
          x2="420"
          y2="150"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {/* the drawn pipeline flow line between the four stages */}
        <path
          className="cdv-flow"
          pathLength={1}
          d="M58,150 H114 M146,150 H234 M266,150 H354 M386,150 H402"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* curved rollback arc looping back from deploy to build */}
        <path
          className="cdv-rollback"
          pathLength={1}
          d="M370,118 C370,70 130,70 130,116"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="5 4"
        />
        <path className="cdv-rollhead" d="M130,116 l-6,-9 l12,0 Z" fill="var(--color-brand)" />

        {/* stage 1 — COMMIT: a node ring */}
        <g className="cdv-node cdv-n1">
          <circle cx="40" cy="150" r="14" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="40" cy="150" r="4" fill="var(--color-brand)" />
        </g>

        {/* stage 2 — BUILD: a stacked-block glyph */}
        <g className="cdv-node cdv-n2">
          <rect x="116" y="136" width="28" height="28" rx="2" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="130" y1="136" x2="130" y2="164" stroke="var(--color-gray-light)" strokeWidth="1" />
          <line x1="116" y1="150" x2="144" y2="150" stroke="var(--color-gray-light)" strokeWidth="1" />
        </g>

        {/* stage 3 — TEST: a node with a forming checkmark */}
        <g className="cdv-node cdv-n3">
          <circle cx="250" cy="150" r="15" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <path
            className="cdv-check"
            pathLength={1}
            d="M243,151 L248,157 L258,144"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* stage 4 — DEPLOY: a filled cloud-block landing target */}
        <g className="cdv-node cdv-n4">
          <rect x="404" y="134" width="32" height="32" rx="2" fill="var(--color-brand)" />
          <line x1="420" y1="134" x2="420" y2="166" stroke="var(--color-bg)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="404" y1="150" x2="436" y2="150" stroke="var(--color-bg)" strokeWidth="1" strokeOpacity="0.4" />
        </g>

        {/* stage labels (JetBrains Mono via --font-mono) */}
        <g className="cdv-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" textAnchor="middle">
          <text x="40" y="196">COMMIT</text>
          <text x="130" y="196">BUILD</text>
          <text x="250" y="196">TEST</text>
          <text x="420" y="196">DEPLOY</text>
          <text x="250" y="62" fill="var(--color-brand)">ROLLBACK</text>
        </g>

        {/* observability accent — uptime/heartbeat line beneath the pipeline */}
        <path
          className="cdv-pulse"
          pathLength={1}
          d="M40,290 H150 l10,-26 l14,46 l12,-32 l9,12 H300 l10,-22 l13,40 l11,-18 H420"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g className="cdv-foot" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.04em">
          <text x="40" y="278" fill="var(--color-gray-light)">{'// observability'}</text>
          <text x="40" y="318" fill="var(--color-brand)">uptime 99.99%</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.cdv .cdv-flow,
.cdv .cdv-rollback,
.cdv .cdv-check,
.cdv .cdv-pulse { stroke-dasharray: 1; stroke-dashoffset: 1; }
.cdv .cdv-node, .cdv .cdv-label, .cdv .cdv-foot, .cdv .cdv-rollhead { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .cdv .cdv-flow { animation: cdvDraw 1.2s cubic-bezier(0.65,0,0.35,1) 0.15s forwards; }
  .cdv .cdv-n1 { animation: cdvFade 0.4s ease-out 0.25s forwards; }
  .cdv .cdv-n2 { animation: cdvFade 0.4s ease-out 0.5s forwards; }
  .cdv .cdv-n3 { animation: cdvFade 0.4s ease-out 0.75s forwards; }
  .cdv .cdv-check { animation: cdvDraw 0.5s cubic-bezier(0.65,0,0.35,1) 1.0s forwards; }
  .cdv .cdv-n4 { animation: cdvFade 0.5s ease-out 1.2s forwards; }
  .cdv .cdv-rollback { animation: cdvDraw 0.9s cubic-bezier(0.16,1,0.3,1) 1.4s forwards; }
  .cdv .cdv-rollhead { animation: cdvFade 0.4s ease-out 2.1s forwards; }
  .cdv .cdv-label { animation: cdvFade 0.6s ease-out 0.9s forwards; }
  .cdv .cdv-pulse { animation: cdvDraw 1.4s cubic-bezier(0.65,0,0.35,1) 0.6s forwards; }
  .cdv .cdv-foot { animation: cdvFade 0.6s ease-out 1.0s forwards; }
  @keyframes cdvDraw { to { stroke-dashoffset: 0; } }
  @keyframes cdvFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .cdv .cdv-flow,
  .cdv .cdv-rollback,
  .cdv .cdv-check,
  .cdv .cdv-pulse { stroke-dashoffset: 0; }
  .cdv .cdv-node, .cdv .cdv-label, .cdv .cdv-foot, .cdv .cdv-rollhead { opacity: 1; }
}
`
