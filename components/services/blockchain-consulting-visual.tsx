// Signature visual for the Blockchain Consulting leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). A chain-
// selection decision tree: a root node branches through constraint gates and
// resolves to a single recommended path, the rejected branches left faint. Pure
// SVG; the path-draw plays once on mount (hero is above the fold) and short-
// circuits to the final state under prefers-reduced-motion. Decorative —
// aria-hidden, lg+ only.

export function BlockchainConsultingVisual() {
  return (
    <figure className="consult-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* faint blueprint grid */}
        <g className="consult-grid" stroke="var(--color-border)" strokeWidth="1">
          <line x1="40" y1="40" x2="40" y2="340" strokeDasharray="2 5" />
          <line x1="40" y1="340" x2="440" y2="340" strokeDasharray="2 5" />
        </g>

        {/* rejected branches — drawn but left faint */}
        <g className="consult-reject" stroke="var(--color-gray-light)" fill="none" strokeWidth="1.5">
          <path className="consult-edge" pathLength={1} d="M70,80 L150,80 L150,150" />
          <path className="consult-edge" pathLength={1} d="M150,150 L250,150 L250,120" />
          <path className="consult-edge" pathLength={1} d="M150,150 L250,150 L250,200" />
          <path className="consult-edge" pathLength={1} d="M70,80 L150,80 L150,260" />
          <path className="consult-edge" pathLength={1} d="M150,260 L250,260 L250,290" />
        </g>

        {/* the resolved recommended path — root → gate → chosen leaf */}
        <g className="consult-path" stroke="var(--color-brand)" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path className="consult-edge-main" pathLength={1} d="M70,80 L150,80 L150,210" />
          <path className="consult-edge-main" pathLength={1} d="M150,210 L250,210 L350,210" />
        </g>

        {/* nodes */}
        <g className="consult-nodes">
          {/* root */}
          <rect className="consult-node" x="40" y="66" width="60" height="28" rx="2" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          {/* constraint gates (rejected) */}
          <circle className="consult-gate" cx="250" cy="120" r="6" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <circle className="consult-gate" cx="250" cy="200" r="6" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <circle className="consult-gate" cx="250" cy="290" r="6" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          {/* recommended leaf */}
          <rect className="consult-node consult-rec" x="350" y="196" width="74" height="28" rx="2" fill="var(--color-brand)" stroke="var(--color-brand)" strokeWidth="2" />
        </g>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="consult-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="70" y="84" textAnchor="middle" fill="var(--color-brand)">REQS</text>
          <text x="262" y="124" fill="var(--color-gray-light)">finality?</text>
          <text x="262" y="204" fill="var(--color-gray-light)">fees?</text>
          <text x="262" y="294" fill="var(--color-gray-light)">audit?</text>
          <text x="387" y="214" textAnchor="middle" fill="var(--color-bg)">CHAIN</text>
          <text x="40" y="358" fill="var(--color-gray)">{'// recommended path'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.consult-viz .consult-edge,
.consult-viz .consult-edge-main { stroke-dasharray: 1; stroke-dashoffset: 1; }
.consult-viz .consult-reject { opacity: 0.4; }
.consult-viz .consult-node,
.consult-viz .consult-gate,
.consult-viz .consult-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .consult-viz .consult-edge {
    animation: consultDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.2s forwards;
  }
  .consult-viz .consult-edge-main {
    animation: consultDraw 1.2s cubic-bezier(0.65,0,0.35,1) 0.55s forwards;
  }
  .consult-viz .consult-gate { animation: consultFade 0.5s ease-out 0.7s forwards; }
  .consult-viz .consult-node { animation: consultFade 0.6s ease-out 1.4s forwards; }
  .consult-viz .consult-label { animation: consultFade 0.6s ease-out 1.5s forwards; }
  @keyframes consultDraw { to { stroke-dashoffset: 0; } }
  @keyframes consultFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .consult-viz .consult-edge,
  .consult-viz .consult-edge-main { stroke-dashoffset: 0; }
  .consult-viz .consult-node,
  .consult-viz .consult-gate,
  .consult-viz .consult-label { opacity: 1; }
}
`
