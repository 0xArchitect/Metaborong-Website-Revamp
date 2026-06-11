// Signature visual for the Enterprise / Private Blockchain leaf hero (DESIGN.md:
// one signature visual per section, blueprint grammar, one-shot motion). A
// permissioned consortium topology: a ring of named validator nodes meshed
// inside a gated permission boundary, with one admission point on the boundary.
// Pure SVG; the stroke-draw plays once on mount (hero is above the fold) and
// short-circuits to the final state under prefers-reduced-motion. Decorative —
// aria-hidden, lg+ only.

export function EnterprisePrivateBlockchainVisual() {
  return (
    <figure className="enterprise-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* permission boundary — the gated membership envelope */}
        <circle
          className="ent-boundary"
          cx="230"
          cy="190"
          r="138"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          pathLength={1}
        />

        {/* admission gate — the one controlled entry point on the boundary */}
        <g className="ent-gate">
          <rect x="218" y="44" width="24" height="9" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="1.5" />
          <line x1="230" y1="20" x2="230" y2="44" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 4" />
        </g>

        {/* consortium mesh — links between the validator nodes */}
        <g className="ent-mesh" stroke="var(--color-gray-light)" strokeWidth="1" fill="none">
          <path pathLength={1} d="M230,98 L322,156 L304,262 L156,262 L138,156 Z" />
          <path pathLength={1} d="M230,98 L304,262" />
          <path pathLength={1} d="M230,98 L156,262" />
          <path pathLength={1} d="M322,156 L156,262" />
          <path pathLength={1} d="M138,156 L304,262" />
          <path pathLength={1} d="M322,156 L138,156" />
        </g>

        {/* validator nodes — named, permissioned participants */}
        <g className="ent-nodes" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2">
          <circle cx="230" cy="98" r="9" />
          <circle cx="322" cy="156" r="9" />
          <circle cx="304" cy="262" r="9" />
          <circle cx="156" cy="262" r="9" />
          <circle cx="138" cy="156" r="9" />
        </g>

        {/* the lead / coordinating node, filled */}
        <circle className="ent-nodes" cx="230" cy="98" r="4" fill="var(--color-brand)" />

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="ent-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="230" y="16" textAnchor="middle" fill="var(--color-brand)">ADMISSION</text>
          <text x="230" y="350" textAnchor="middle" fill="var(--color-gray)">PERMISSIONED CONSORTIUM</text>
          <text x="344" y="160" fill="var(--color-gray-light)">{'// validator'}</text>
          <text x="230" y="368" textAnchor="middle" fill="var(--color-gray-light)">{'// gated membership'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.enterprise-viz .ent-boundary,
.enterprise-viz .ent-mesh path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.enterprise-viz .ent-boundary { stroke-dasharray: 6 6; }
.enterprise-viz .ent-mesh { opacity: 0.5; }
.enterprise-viz .ent-nodes,
.enterprise-viz .ent-gate,
.enterprise-viz .ent-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .enterprise-viz .ent-boundary {
    animation: entDrawBoundary 1.4s cubic-bezier(0.65,0,0.35,1) 0.1s forwards;
  }
  .enterprise-viz .ent-mesh path {
    animation: entDraw 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
  }
  .enterprise-viz .ent-nodes { animation: entFade 0.5s ease-out 0.95s forwards; }
  .enterprise-viz .ent-gate { animation: entFade 0.5s ease-out 0.8s forwards; }
  .enterprise-viz .ent-label { animation: entFade 0.6s ease-out 1.15s forwards; }
  @keyframes entDraw { to { stroke-dashoffset: 0; } }
  @keyframes entDrawBoundary {
    from { stroke-dashoffset: 1; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes entFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .enterprise-viz .ent-boundary,
  .enterprise-viz .ent-mesh path { stroke-dashoffset: 0; }
  .enterprise-viz .ent-nodes,
  .enterprise-viz .ent-gate { opacity: 1; }
  .enterprise-viz .ent-label { opacity: 1; }
}
`
