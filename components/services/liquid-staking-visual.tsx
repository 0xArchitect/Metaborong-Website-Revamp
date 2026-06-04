// Signature visual for the Liquid Staking & Vault Development leaf hero (DESIGN.md:
// one signature visual per section, blueprint grammar, one-shot motion). A stake-in /
// receipt-token-out flow: an asset deposits into a vault that routes to a validator set,
// and the vault mints a receipt token whose exchange rate accrues along a rising curve
// over time. Pure SVG; the stroke-draw plays once on mount (hero is above the fold) and
// short-circuits to the final state under prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function LiquidStakingVisual() {
  return (
    <figure className="lsv relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* plot frame for the exchange-rate accrual curve */}
        <g className="lsv-grid" stroke="var(--color-border)" strokeWidth="1">
          <line x1="60" y1="40" x2="60" y2="200" />
          <line x1="60" y1="200" x2="440" y2="200" />
          <line x1="60" y1="160" x2="440" y2="160" strokeDasharray="2 5" />
          <line x1="60" y1="120" x2="440" y2="120" strokeDasharray="2 5" />
          <line x1="60" y1="80" x2="440" y2="80" strokeDasharray="2 5" />
        </g>

        {/* baseline 1.0 exchange rate */}
        <line className="lsv-base" x1="60" y1="184" x2="440" y2="184" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 4" />

        {/* exchange-rate accrual curve: rises as staking rewards compound, dips at a slashing event */}
        <path
          className="lsv-rate"
          pathLength={1}
          d="M60,184 C140,176 196,150 232,132 L240,150 C300,120 372,80 440,52"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* slashing dip marker on the curve */}
        <g className="lsv-slash">
          <circle cx="232" cy="132" r="3.5" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="240" cy="150" r="3" fill="var(--color-brand)" />
        </g>

        {/* ── deposit / vault / receipt flow, below the plot ── */}

        {/* staked asset in */}
        <g className="lsv-node lsv-stake">
          <rect x="44" y="260" width="86" height="40" rx="6" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
        </g>

        {/* vault (center) */}
        <g className="lsv-node lsv-vault">
          <rect x="187" y="252" width="86" height="56" rx="6" fill="var(--color-brand)" fillOpacity="0.08" stroke="var(--color-brand)" strokeWidth="1.5" />
        </g>

        {/* receipt token out */}
        <g className="lsv-node lsv-receipt">
          <circle cx="373" cy="280" r="24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
        </g>

        {/* flow arrows: stake → vault → receipt */}
        <g className="lsv-flow" stroke="var(--color-brand)" strokeWidth="2" fill="none">
          <path className="lsv-flow-a" pathLength={1} d="M130,280 L181,280" markerEnd="url(#lsvArrow)" />
          <path className="lsv-flow-b" pathLength={1} d="M273,280 L343,280" markerEnd="url(#lsvArrow)" />
        </g>

        {/* validator routing: vault down to a validator set */}
        <g className="lsv-validators" stroke="var(--color-gray-light)" strokeWidth="1" fill="none">
          <path d="M210,308 L182,340" />
          <path d="M230,308 L230,340" />
          <path d="M250,308 L278,340" />
        </g>
        <g className="lsv-vset" fill="var(--color-brand)">
          <circle cx="182" cy="346" r="3" />
          <circle cx="230" cy="346" r="3" />
          <circle cx="278" cy="346" r="3" />
        </g>

        <defs>
          <marker id="lsvArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-brand)" />
          </marker>
        </defs>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="lsv-label" fill="var(--color-gray-light)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="60" y="56" fill="var(--color-brand)">EXCHANGE RATE</text>
          <text x="442" y="200" textAnchor="end" fill="var(--color-gray)">TIME →</text>
          <text x="232" y="120" textAnchor="middle">SLASH</text>
          <text x="87" y="284" textAnchor="middle" fill="var(--color-gray)">STAKE</text>
          <text x="230" y="284" textAnchor="middle">VAULT</text>
          <text x="373" y="284" textAnchor="middle" fill="var(--color-gray)">LST</text>
          <text x="230" y="368" textAnchor="middle">VALIDATORS</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.lsv .lsv-base { opacity: 0; }
.lsv .lsv-rate { stroke-dasharray: 1; stroke-dashoffset: 1; }
.lsv .lsv-flow-a, .lsv .lsv-flow-b { stroke-dasharray: 1; stroke-dashoffset: 1; }
.lsv .lsv-node, .lsv .lsv-slash, .lsv .lsv-validators, .lsv .lsv-vset, .lsv .lsv-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .lsv .lsv-rate { animation: lsvDraw 1.3s cubic-bezier(0.65,0,0.35,1) 0.5s forwards; }
  .lsv .lsv-base { animation: lsvFade 0.6s ease-out 0.45s forwards; }
  .lsv .lsv-stake { animation: lsvFade 0.5s ease-out 0.1s forwards; }
  .lsv .lsv-flow-a { animation: lsvDraw 0.4s ease-out 0.35s forwards; }
  .lsv .lsv-vault { animation: lsvFade 0.5s ease-out 0.55s forwards; }
  .lsv .lsv-flow-b { animation: lsvDraw 0.4s ease-out 0.75s forwards; }
  .lsv .lsv-receipt { animation: lsvFade 0.5s ease-out 0.9s forwards; }
  .lsv .lsv-validators { animation: lsvFade 0.6s ease-out 1.0s forwards; }
  .lsv .lsv-vset { animation: lsvFade 0.5s ease-out 1.1s forwards; }
  .lsv .lsv-slash { animation: lsvFade 0.5s ease-out 1.5s forwards; }
  .lsv .lsv-label { animation: lsvFade 0.6s ease-out 0.6s forwards; }
  @keyframes lsvDraw { to { stroke-dashoffset: 0; } }
  @keyframes lsvFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .lsv .lsv-rate,
  .lsv .lsv-flow-a, .lsv .lsv-flow-b { stroke-dashoffset: 0; }
  .lsv .lsv-base, .lsv .lsv-node, .lsv .lsv-slash,
  .lsv .lsv-validators, .lsv .lsv-vset, .lsv .lsv-label { opacity: 1; }
}
`
