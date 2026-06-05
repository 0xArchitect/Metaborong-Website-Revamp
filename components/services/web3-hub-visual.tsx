// Signature visual for the /services/web3 HUB hero (pillar-level, NOT a single
// leaf — distinct from the homepage Services hex-glyph and the per-leaf visuals).
// A linked block-chain: three blocks (header hash + tx rows) chained left-to-right,
// the newest brand-filled. Follows the leaf-hero grammar: one-shot stroke-draw on
// mount (hero is above the fold), final-state fallback under prefers-reduced-motion,
// var(--color-*) tokens only, JetBrains Mono labels, aria-hidden, ~460x380 viewBox.

export function Web3HubVisualChain() {
  const blocks = [30, 175, 320]
  return (
    <figure className="hubchain-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{chainCss}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        {/* link connectors between blocks */}
        <g className="hubchain-link" stroke="var(--color-brand)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="hubchain-draw" pathLength={1} d="M140,190 H175" />
          <path className="hubchain-draw" pathLength={1} d="M285,190 H320" />
        </g>
        <g className="hubchain-linknode" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="1.5">
          <circle cx="157" cy="190" r="5" />
          <circle cx="302" cy="190" r="5" />
        </g>

        {blocks.map((x, i) => {
          const last = i === blocks.length - 1
          return (
            <g key={x} className="hubchain-block" style={{ ['--d' as string]: `${0.2 + i * 0.25}s` }}>
              <rect x={x} y="130" width="110" height="120" rx="5" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
              {/* header bar */}
              <rect x={x} y="130" width="110" height="26" rx="5" fill="var(--color-brand)" opacity={last ? 0.9 : 0.12} />
              <text x={x + 12} y="147" fontSize="9" fontFamily="var(--font-mono)" fill={last ? 'var(--color-off-white)' : 'var(--color-gray)'}>
                0x{(i + 1) * 4}f…
              </text>
              {/* tx rows */}
              <g stroke="var(--color-gray-light)" strokeWidth="1">
                <line x1={x + 12} y1="178" x2={x + 98} y2="178" />
                <line x1={x + 12} y1="196" x2={x + 80} y2="196" />
                <line x1={x + 12} y1="214" x2={x + 92} y2="214" />
              </g>
            </g>
          )
        })}

        {/* labels */}
        <g className="hubchain-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="85" y="278" textAnchor="middle" fill="var(--color-gray)">#8,401</text>
          <text x="230" y="278" textAnchor="middle" fill="var(--color-gray)">#8,402</text>
          <text x="375" y="278" textAnchor="middle" fill="var(--color-brand)">#8,403</text>
          <text x="30" y="108" fill="var(--color-gray-light)">{'// append-only'}</text>
        </g>
      </svg>
    </figure>
  )
}

const chainCss = `
.hubchain-viz .hubchain-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.hubchain-viz .hubchain-block,
.hubchain-viz .hubchain-linknode,
.hubchain-viz .hubchain-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .hubchain-viz .hubchain-block { animation: hubchainFade 0.5s ease-out var(--d) forwards; }
  .hubchain-viz .hubchain-draw { animation: hubchainDraw 0.5s cubic-bezier(0.65,0,0.35,1) forwards; }
  .hubchain-viz .hubchain-draw:nth-of-type(1) { animation-delay: 0.45s; }
  .hubchain-viz .hubchain-draw:nth-of-type(2) { animation-delay: 0.7s; }
  .hubchain-viz .hubchain-linknode { animation: hubchainFade 0.4s ease-out 0.8s forwards; }
  .hubchain-viz .hubchain-label { animation: hubchainFade 0.6s ease-out 1s forwards; }
  @keyframes hubchainDraw { to { stroke-dashoffset: 0; } }
  @keyframes hubchainFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .hubchain-viz .hubchain-draw { stroke-dashoffset: 0; }
  .hubchain-viz .hubchain-block,
  .hubchain-viz .hubchain-linknode,
  .hubchain-viz .hubchain-label { opacity: 1; }
}
`
