// Signature visual for the Token Launchpad Development leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). A bonding
// curve (price as a function of circulating supply) with a shaded "cost to buy"
// band and a graduation marker where the curve completes and liquidity migrates
// to a secondary DEX, the bonding-curve-to-DEX path the copy references. Pure SVG;
// the stroke-draw plays once on mount (hero is above the fold) and short-circuits
// to the final state under prefers-reduced-motion. Decorative, aria-hidden, lg+ only.

export function LaunchpadBondingCurveVisual() {
  return (
    <figure className="lbc relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* plot frame */}
        <g className="lbc-grid" stroke="var(--color-border)" strokeWidth="1">
          <line x1="60" y1="40" x2="60" y2="320" />
          <line x1="60" y1="320" x2="440" y2="320" />
          <line x1="60" y1="264" x2="440" y2="264" strokeDasharray="2 5" />
          <line x1="60" y1="208" x2="440" y2="208" strokeDasharray="2 5" />
          <line x1="60" y1="152" x2="440" y2="152" strokeDasharray="2 5" />
          <line x1="60" y1="96" x2="440" y2="96" strokeDasharray="2 5" />
        </g>

        {/* shaded "cost to buy" band — the integral under the curve for one purchase */}
        <path className="lbc-band" d="M296,320 L296,221 L332,190 L332,320 Z" fill="var(--color-brand)" />

        {/* bonding curve: price accelerates with supply */}
        <path
          className="lbc-curve"
          pathLength={1}
          d="M60,308 C200,300 320,235 440,64"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* current-price marker at the left edge of the band */}
        <g className="lbc-mark">
          <circle cx="296" cy="221" r="3.5" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
        </g>

        {/* graduation marker — curve completes, liquidity migrates to a DEX */}
        <g className="lbc-grad">
          <line x1="404" y1="40" x2="404" y2="320" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="404" cy="112" r="4" fill="var(--color-brand)" />
        </g>

        {/* axis + annotation labels (JetBrains Mono via --font-mono) */}
        <g className="lbc-label" fill="var(--color-gray-light)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="60" y="338">0</text>
          <text x="430" y="338" textAnchor="end">MAX</text>
          <text x="60" y="356" fill="var(--color-gray)">CIRCULATING SUPPLY</text>
          <text x="404" y="30" textAnchor="middle" fill="var(--color-brand)">GRADUATION</text>
          <text x="404" y="350" textAnchor="middle">→ DEX</text>
        </g>
        <text
          className="lbc-label" x="24" y="180" transform="rotate(-90 24 180)" textAnchor="middle"
          fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        >
          PRICE
        </text>
      </svg>
    </figure>
  )
}

const css = `
.lbc .lbc-band { opacity: 0; }
.lbc .lbc-curve { stroke-dasharray: 1; stroke-dashoffset: 1; }
.lbc .lbc-mark, .lbc .lbc-grad, .lbc .lbc-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .lbc .lbc-curve {
    animation: lbcDraw 1.25s cubic-bezier(0.65,0,0.35,1) 0.15s forwards;
  }
  .lbc .lbc-band { animation: lbcFadeBand 0.9s ease-out 0.6s forwards; }
  .lbc .lbc-mark { animation: lbcFade 0.5s ease-out 0.9s forwards; }
  .lbc .lbc-grad { animation: lbcFade 0.6s ease-out 1.05s forwards; }
  .lbc .lbc-label { animation: lbcFade 0.6s ease-out 0.7s forwards; }
  @keyframes lbcDraw { to { stroke-dashoffset: 0; } }
  @keyframes lbcFade { to { opacity: 1; } }
  @keyframes lbcFadeBand { to { opacity: 0.08; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .lbc .lbc-curve { stroke-dashoffset: 0; }
  .lbc .lbc-band { opacity: 0.08; }
  .lbc .lbc-mark, .lbc .lbc-grad, .lbc .lbc-label { opacity: 1; }
}
`
