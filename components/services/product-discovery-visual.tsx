// Signature visual for the Product Discovery leaf hero (DESIGN.md: one signature
// visual per section, blueprint grammar, one-shot motion). A discovery funnel:
// several diverging hypothesis branches on the left narrow and converge toward a
// single validated path on the right, ending at a small clickable-prototype frame
// — the "many assumptions, one validated path" the copy references. Branches that
// fail dead-end as faint dotted stubs. Pure SVG; the stroke-draw plays once on
// mount (hero is above the fold) and short-circuits to the final state under
// prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function ProductDiscoveryVisual() {
  return (
    <figure className="pdv relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* convergence guide rail — the funnel collapses toward the validated path */}
        <line
          className="pdv-grid"
          x1="60"
          y1="190"
          x2="300"
          y2="190"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {/* failed hypotheses — faint dotted stubs that dead-end */}
        <g className="pdv-stub" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round">
          <path d="M60,70 C110,72 150,88 184,104" />
          <path d="M60,118 C112,120 150,128 188,138" />
          <path d="M60,262 C112,260 150,250 188,240" />
          <path d="M60,312 C110,310 152,290 184,272" />
        </g>
        {/* dead-end markers on the failed stubs */}
        <g className="pdv-stub" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5">
          <circle cx="184" cy="104" r="3" />
          <circle cx="188" cy="138" r="3" />
          <circle cx="188" cy="240" r="3" />
          <circle cx="184" cy="272" r="3" />
        </g>

        {/* surviving hypothesis branches that converge to the validated node */}
        <path
          className="pdv-branch pdv-b1"
          pathLength={1}
          d="M60,96 C140,100 210,150 300,190"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          className="pdv-branch pdv-b2"
          pathLength={1}
          d="M60,190 C150,190 220,190 300,190"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          className="pdv-branch pdv-b3"
          pathLength={1}
          d="M60,288 C140,284 210,230 300,190"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* hypothesis origin nodes (left) */}
        <g className="pdv-origin" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2">
          <circle cx="60" cy="96" r="3.5" />
          <circle cx="60" cy="190" r="3.5" />
          <circle cx="60" cy="288" r="3.5" />
        </g>

        {/* the single validated path — thicker, brand, runs to the prototype */}
        <path
          className="pdv-valid"
          pathLength={1}
          d="M300,190 H360"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* convergence node where branches meet */}
        <circle className="pdv-converge" cx="300" cy="190" r="5" fill="var(--color-brand)" />

        {/* prototype screen frame (right) — the tested clickable artefact */}
        <g className="pdv-proto">
          <rect x="360" y="150" width="80" height="80" rx="3" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="360" y1="166" x2="440" y2="166" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="367" cy="158" r="1.5" fill="var(--color-gray-light)" />
          <circle cx="373" cy="158" r="1.5" fill="var(--color-gray-light)" />
          <line x1="370" y1="180" x2="430" y2="180" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="370" y1="192" x2="430" y2="192" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <rect x="370" y="206" width="34" height="12" rx="2" fill="var(--color-brand)" />
        </g>

        {/* stage labels (JetBrains Mono via --font-mono) */}
        <g className="pdv-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" textAnchor="middle">
          <text x="60" y="346">HYPOTHESES</text>
          <text x="300" y="346" fill="var(--color-brand)">VALIDATED</text>
          <text x="400" y="346">PROTOTYPE</text>
        </g>

        {/* the artefact handed forward — build-ready estimate */}
        <g className="pdv-foot" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.04em">
          <text x="60" y="372" fill="var(--color-brand)">→ build-ready estimate</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.pdv .pdv-branch, .pdv .pdv-valid { stroke-dasharray: 1; stroke-dashoffset: 1; }
.pdv .pdv-stub, .pdv .pdv-origin, .pdv .pdv-converge,
.pdv .pdv-proto, .pdv .pdv-label, .pdv .pdv-foot { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .pdv .pdv-origin { animation: pdvFade 0.4s ease-out 0.15s forwards; }
  .pdv .pdv-b1 { animation: pdvDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.3s forwards; }
  .pdv .pdv-b2 { animation: pdvDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.4s forwards; }
  .pdv .pdv-b3 { animation: pdvDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.5s forwards; }
  .pdv .pdv-stub { animation: pdvFadeFaint 0.7s ease-out 0.6s forwards; }
  .pdv .pdv-converge { animation: pdvFade 0.4s ease-out 1.25s forwards; }
  .pdv .pdv-valid { animation: pdvDraw 0.6s cubic-bezier(0.65,0,0.35,1) 1.4s forwards; }
  .pdv .pdv-proto { animation: pdvFade 0.6s ease-out 1.75s forwards; }
  .pdv .pdv-label { animation: pdvFade 0.6s ease-out 1.0s forwards; }
  .pdv .pdv-foot { animation: pdvFade 0.6s ease-out 1.9s forwards; }
  @keyframes pdvDraw { to { stroke-dashoffset: 0; } }
  @keyframes pdvFade { to { opacity: 1; } }
  @keyframes pdvFadeFaint { to { opacity: 0.5; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .pdv .pdv-branch, .pdv .pdv-valid { stroke-dashoffset: 0; }
  .pdv .pdv-stub { opacity: 0.5; }
  .pdv .pdv-origin, .pdv .pdv-converge,
  .pdv .pdv-proto, .pdv .pdv-label, .pdv .pdv-foot { opacity: 1; }
}
`
