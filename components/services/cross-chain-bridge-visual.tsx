// Signature visual for the Cross-Chain Bridge Development leaf hero (DESIGN.md:
// one signature visual per section, blueprint grammar, one-shot motion). Two
// chain columns (NEAR / Solana) with a bridge arc carrying a locked->minted
// message between them, plus verify and replay-guard markers. Pure SVG; the
// stroke-draw plays once on mount (hero is above the fold) and short-circuits to
// the final state under prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function CrossChainBridgeVisual() {
  return (
    <figure className="bridge-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* two chain columns */}
        <g className="bridge-cols" stroke="var(--color-border)" strokeWidth="1" fill="none">
          <rect x="40" y="70" width="110" height="240" rx="4" />
          <rect x="310" y="70" width="110" height="240" rx="4" />
        </g>

        {/* faint block stacks inside each chain */}
        <g className="bridge-blocks" stroke="var(--color-gray-light)" strokeWidth="1" fill="none">
          <rect x="62" y="132" width="66" height="22" rx="2" />
          <rect x="62" y="160" width="66" height="22" rx="2" />
          <rect x="62" y="188" width="66" height="22" rx="2" />
          <rect x="332" y="132" width="66" height="22" rx="2" />
          <rect x="332" y="160" width="66" height="22" rx="2" />
          <rect x="332" y="188" width="66" height="22" rx="2" />
        </g>

        {/* locked asset on the source chain */}
        <g className="bridge-lock">
          <rect x="76" y="160" width="38" height="22" rx="2" fill="var(--color-brand)" opacity="0.16" />
          <rect x="76" y="160" width="38" height="22" rx="2" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
        </g>

        {/* bridge arc carrying the message */}
        <path
          className="bridge-arc"
          pathLength={1}
          d="M114,171 C170,90 290,90 346,171"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* verify marker at the apex of the arc */}
        <g className="bridge-verify">
          <circle cx="230" cy="106" r="13" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="1.5" />
          <path d="M224,106 l4,4 l8,-9" fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* replay-guard marker on the inbound leg */}
        <g className="bridge-guard">
          <circle cx="300" cy="124" r="9" fill="var(--color-bg)" stroke="var(--color-gray)" strokeWidth="1.25" />
          <line x1="295" y1="124" x2="305" y2="124" stroke="var(--color-gray)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* minted asset on the destination chain */}
        <g className="bridge-mint">
          <rect x="346" y="160" width="38" height="22" rx="2" fill="var(--color-brand)" />
        </g>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="bridge-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="95" y="58" textAnchor="middle" fill="var(--color-gray)">NEAR</text>
          <text x="365" y="58" textAnchor="middle" fill="var(--color-gray)">SOLANA</text>
          <text x="95" y="334" textAnchor="middle" fill="var(--color-brand)">LOCK</text>
          <text x="365" y="334" textAnchor="middle" fill="var(--color-brand)">MINT</text>
          <text x="230" y="146" textAnchor="middle" fill="var(--color-gray)">{'// verify'}</text>
          <text x="230" y="358" textAnchor="middle" fill="var(--color-gray-light)">REPLAY-GUARDED MESSAGE</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.bridge-viz .bridge-arc { stroke-dasharray: 1; stroke-dashoffset: 1; }
.bridge-viz .bridge-lock,
.bridge-viz .bridge-mint,
.bridge-viz .bridge-verify,
.bridge-viz .bridge-guard,
.bridge-viz .bridge-blocks,
.bridge-viz .bridge-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .bridge-viz .bridge-blocks { animation: bridgeFade 0.6s ease-out 0.1s forwards; }
  .bridge-viz .bridge-lock { animation: bridgeFade 0.5s ease-out 0.3s forwards; }
  .bridge-viz .bridge-arc {
    animation: bridgeDraw 1.2s cubic-bezier(0.65,0,0.35,1) 0.5s forwards;
  }
  .bridge-viz .bridge-verify { animation: bridgeFade 0.5s ease-out 1.2s forwards; }
  .bridge-viz .bridge-guard { animation: bridgeFade 0.5s ease-out 1.35s forwards; }
  .bridge-viz .bridge-mint { animation: bridgeFade 0.5s ease-out 1.5s forwards; }
  .bridge-viz .bridge-label { animation: bridgeFade 0.6s ease-out 1.1s forwards; }
  @keyframes bridgeDraw { to { stroke-dashoffset: 0; } }
  @keyframes bridgeFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .bridge-viz .bridge-arc { stroke-dashoffset: 0; }
  .bridge-viz .bridge-lock,
  .bridge-viz .bridge-mint,
  .bridge-viz .bridge-verify,
  .bridge-viz .bridge-guard,
  .bridge-viz .bridge-blocks,
  .bridge-viz .bridge-label { opacity: 1; }
}
`
