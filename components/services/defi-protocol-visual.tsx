// Signature visual for the DeFi Protocol Development leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). A
// constant-product AMM curve (x*y=k) in reserve space, with two reserve markers
// joined by a swap vector (token X in, token Y out) and a faint slippage band
// between the spot-price line and the realized fill. Distinct from the bonding
// curve (rising price-vs-supply) and the emission curve. Pure SVG; the
// stroke-draw plays once on mount (hero is above the fold) and short-circuits to
// the final state under prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function DefiProtocolVisual() {
  return (
    <figure className="dpv relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* plot frame */}
        <g className="dpv-grid" stroke="var(--color-border)" strokeWidth="1">
          <line x1="60" y1="40" x2="60" y2="320" />
          <line x1="60" y1="320" x2="440" y2="320" />
          <line x1="60" y1="264" x2="440" y2="264" strokeDasharray="2 5" />
          <line x1="60" y1="208" x2="440" y2="208" strokeDasharray="2 5" />
          <line x1="60" y1="152" x2="440" y2="152" strokeDasharray="2 5" />
          <line x1="60" y1="96" x2="440" y2="96" strokeDasharray="2 5" />
        </g>

        {/* slippage band — area swept between the two reserve points and the curve */}
        <path className="dpv-band" d="M150,121 L298,121 L298,232 Z" fill="var(--color-brand)" />

        {/* constant-product invariant curve: x*y=k (a falling hyperbola) */}
        <path
          className="dpv-curve"
          pathLength={1}
          d="M84,300 C150,150 180,121 298,108 C360,101 400,98 432,96"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* swap vector: reserves move from point A down the curve to point B */}
        <g className="dpv-swap">
          {/* reserve point A (before swap) */}
          <circle cx="150" cy="121" r="3.5" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          {/* dy out (vertical) and dx in (horizontal) construction lines */}
          <line x1="150" y1="121" x2="298" y2="121" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="298" y1="121" x2="298" y2="232" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 4" />
          {/* reserve point B (after swap) */}
          <circle cx="298" cy="232" r="3.5" fill="var(--color-brand)" />
          {/* swap arrow chord A -> B */}
          <path d="M150,121 L292,226" stroke="var(--color-brand)" strokeWidth="1.5" markerEnd="url(#dpv-arrow)" />
        </g>

        <defs>
          <marker id="dpv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-brand)" />
          </marker>
        </defs>

        {/* axis + annotation labels (JetBrains Mono via --font-mono) */}
        <g className="dpv-label" fill="var(--color-gray-light)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="60" y="338">0</text>
          <text x="430" y="338" textAnchor="end">RESERVE X</text>
          <text x="60" y="356" fill="var(--color-gray)">x · y = k</text>
          <text x="150" y="113" textAnchor="middle" fill="var(--color-brand)">SPOT</text>
          <text x="306" y="244" fill="var(--color-brand)">FILL</text>
          <text x="224" y="135" textAnchor="middle" fill="var(--color-gray)">ΔX IN</text>
        </g>
        <text
          className="dpv-label" x="24" y="180" transform="rotate(-90 24 180)" textAnchor="middle"
          fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        >
          RESERVE Y
        </text>
      </svg>
    </figure>
  )
}

const css = `
.dpv .dpv-band { opacity: 0; }
.dpv .dpv-curve { stroke-dasharray: 1; stroke-dashoffset: 1; }
.dpv .dpv-swap, .dpv .dpv-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .dpv .dpv-curve {
    animation: dpvDraw 1.25s cubic-bezier(0.65,0,0.35,1) 0.15s forwards;
  }
  .dpv .dpv-band { animation: dpvFadeBand 0.9s ease-out 0.7s forwards; }
  .dpv .dpv-swap { animation: dpvFade 0.6s ease-out 0.95s forwards; }
  .dpv .dpv-label { animation: dpvFade 0.6s ease-out 0.7s forwards; }
  @keyframes dpvDraw { to { stroke-dashoffset: 0; } }
  @keyframes dpvFade { to { opacity: 1; } }
  @keyframes dpvFadeBand { to { opacity: 0.08; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .dpv .dpv-curve { stroke-dashoffset: 0; }
  .dpv .dpv-band { opacity: 0.08; }
  .dpv .dpv-swap, .dpv .dpv-label { opacity: 1; }
}
`
