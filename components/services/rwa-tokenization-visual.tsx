// Signature visual for the RWA Tokenization leaf hero (DESIGN.md: one signature
// visual per section, blueprint grammar, one-shot motion). A real-world asset
// glyph mapping to on-chain token units with an ownership ledger beneath, in
// blueprint grammar. Pure SVG; the stroke-draw plays once on mount (hero is
// above the fold) and short-circuits to the final state under
// prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function RwaTokenizationVisual() {
  return (
    <figure className="rwa-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* real-world asset glyph — a building, drawn as a blueprint */}
        <g className="rwa-asset" stroke="var(--color-gray)" strokeWidth="1.5" fill="none">
          <rect x="40" y="120" width="110" height="150" />
          <line x1="40" y1="120" x2="95" y2="84" />
          <line x1="95" y1="84" x2="150" y2="120" />
          <line x1="62" y1="150" x2="84" y2="150" />
          <line x1="62" y1="150" x2="62" y2="172" />
          <line x1="84" y1="150" x2="84" y2="172" />
          <line x1="62" y1="172" x2="84" y2="172" />
          <line x1="106" y1="150" x2="128" y2="150" />
          <line x1="106" y1="150" x2="106" y2="172" />
          <line x1="128" y1="150" x2="128" y2="172" />
          <line x1="106" y1="172" x2="128" y2="172" />
          <line x1="62" y1="200" x2="84" y2="200" />
          <line x1="62" y1="200" x2="62" y2="222" />
          <line x1="84" y1="200" x2="84" y2="222" />
          <line x1="62" y1="222" x2="84" y2="222" />
          <rect x="106" y="200" width="22" height="70" />
        </g>

        {/* mapping arrow — asset maps to token units */}
        <path
          className="rwa-map"
          pathLength={1}
          d="M158,180 C200,180 230,180 268,180"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          markerEnd="url(#rwaArrow)"
        />
        <defs>
          <marker id="rwaArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-brand)" />
          </marker>
        </defs>

        {/* on-chain token units — a grid of minted tokens */}
        <g className="rwa-tokens">
          <circle cx="312" cy="120" r="16" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="356" cy="120" r="16" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="400" cy="120" r="16" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="312" cy="164" r="16" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="356" cy="164" r="16" fill="var(--color-brand)" fillOpacity="0.12" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="400" cy="164" r="16" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
        </g>

        {/* ownership ledger beneath — registry rows */}
        <g className="rwa-ledger" stroke="var(--color-border)" strokeWidth="1">
          <rect x="40" y="288" width="380" height="60" fill="none" stroke="var(--color-gray-light)" />
          <line x1="40" y1="308" x2="420" y2="308" />
          <line x1="40" y1="328" x2="420" y2="328" />
          <line x1="160" y1="288" x2="160" y2="348" strokeDasharray="2 4" />
          <line x1="300" y1="288" x2="300" y2="348" strokeDasharray="2 4" />
        </g>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="rwa-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="40" y="108" fill="var(--color-gray)">REAL ASSET</text>
          <text x="312" y="100" fill="var(--color-brand)">TOKEN UNITS</text>
          <text x="48" y="302" fill="var(--color-gray-light)">{'// HOLDER'}</text>
          <text x="168" y="302" fill="var(--color-gray-light)">{'// UNITS'}</text>
          <text x="308" y="302" fill="var(--color-gray-light)">{'// ELIGIBLE'}</text>
          <text x="40" y="368" fill="var(--color-gray)" letterSpacing="0.08em">OWNERSHIP REGISTRY</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.rwa-viz .rwa-asset line, .rwa-viz .rwa-asset rect { stroke-dasharray: 1; stroke-dashoffset: 1; }
.rwa-viz .rwa-map { stroke-dasharray: 1; stroke-dashoffset: 1; }
.rwa-viz .rwa-tokens circle { opacity: 0; }
.rwa-viz .rwa-ledger { opacity: 0; }
.rwa-viz .rwa-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .rwa-viz .rwa-asset line, .rwa-viz .rwa-asset rect {
    animation: rwaDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.1s forwards;
  }
  .rwa-viz .rwa-map {
    animation: rwaDraw 0.7s cubic-bezier(0.65,0,0.35,1) 0.9s forwards;
  }
  .rwa-viz .rwa-tokens circle {
    animation: rwaPop 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .rwa-viz .rwa-tokens circle:nth-child(1) { animation-delay: 1.3s; }
  .rwa-viz .rwa-tokens circle:nth-child(2) { animation-delay: 1.4s; }
  .rwa-viz .rwa-tokens circle:nth-child(3) { animation-delay: 1.5s; }
  .rwa-viz .rwa-tokens circle:nth-child(4) { animation-delay: 1.6s; }
  .rwa-viz .rwa-tokens circle:nth-child(5) { animation-delay: 1.7s; }
  .rwa-viz .rwa-tokens circle:nth-child(6) { animation-delay: 1.8s; }
  .rwa-viz .rwa-ledger { animation: rwaFade 0.6s ease-out 1.9s forwards; }
  .rwa-viz .rwa-label { animation: rwaFade 0.6s ease-out 1.5s forwards; }
  @keyframes rwaDraw { to { stroke-dashoffset: 0; } }
  @keyframes rwaPop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
  @keyframes rwaFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .rwa-viz .rwa-asset line, .rwa-viz .rwa-asset rect { stroke-dashoffset: 0; }
  .rwa-viz .rwa-map { stroke-dashoffset: 0; }
  .rwa-viz .rwa-tokens circle { opacity: 1; }
  .rwa-viz .rwa-ledger { opacity: 1; }
  .rwa-viz .rwa-label { opacity: 1; }
}
`
