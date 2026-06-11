// Signature visual for the NFT Marketplace Development leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). A lazy-mint
// drop pipeline: a signed off-chain coupon redeems into a token grid (the
// collection), one tile lifts out as a live listing, and on settlement the sale
// fans into a royalty split back to the creator. Distinct from the bonding-curve
// and supply-envelope plots: this is a flow + gallery diagram, not an axis plot.
// Pure SVG; the connector path stroke-draws once on mount (hero is above the
// fold) and short-circuits to the final state under prefers-reduced-motion.
// Decorative - aria-hidden, lg+ only.

export function NftMarketplaceVisual() {
  return (
    <figure className="nft-mkt relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* signed lazy-mint coupon (off-chain) */}
        <g className="nft-coupon">
          <rect x="24" y="150" width="86" height="58" rx="4" fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="36" y1="168" x2="98" y2="168" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="36" y1="180" x2="86" y2="180" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <circle cx="92" cy="194" r="6" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
          <path d="M89,194 l2,2.5 l4,-5" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* redemption connector: coupon -> grid */}
        <path
          className="nft-flow nft-flow-1" pathLength={1}
          d="M110,179 C140,179 150,150 178,150"
          fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round"
        />

        {/* token grid - the minted collection (3x3) */}
        <g className="nft-grid">
          <rect x="178" y="96" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="224" y="96" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="270" y="96" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="178" y="142" width="40" height="40" rx="3" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
          <rect x="224" y="142" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="270" y="142" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="178" y="188" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="224" y="188" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="270" y="188" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
        </g>

        {/* the selected token lifts out as a live listing */}
        <g className="nft-listing">
          <rect x="340" y="118" width="48" height="48" rx="3" fill="var(--color-brand)" fillOpacity="0.08" stroke="var(--color-brand)" strokeWidth="1.5" />
          <path d="M349,154 l9,-13 l7,9 l5,-6 l9,10 Z" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="356" cy="130" r="3.5" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
        </g>

        {/* listing connector: grid tile -> listing */}
        <path
          className="nft-flow nft-flow-2" pathLength={1}
          d="M218,162 C290,162 300,142 340,142"
          fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round"
        />

        {/* settlement: royalty split fans from the sale */}
        <g className="nft-split">
          <circle cx="364" cy="212" r="4" fill="var(--color-brand)" />
          <path d="M364,216 C364,250 308,250 308,286" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" strokeDasharray="3 4" />
          <path d="M364,216 C364,250 420,250 420,286" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx="308" cy="290" r="3.5" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="420" cy="290" r="3.5" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
        </g>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="nft-label" fill="var(--color-gray-light)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="67" y="226" textAnchor="middle">SIGNED COUPON</text>
          <text x="244" y="86" textAnchor="middle" fill="var(--color-gray)">COLLECTION</text>
          <text x="364" y="110" textAnchor="middle" fill="var(--color-brand)">LISTING</text>
          <text x="364" y="180" textAnchor="middle">SETTLE</text>
          <text x="308" y="306" textAnchor="middle" fill="var(--color-brand)">ROYALTY</text>
          <text x="420" y="306" textAnchor="middle">SELLER</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.nft-mkt .nft-flow { stroke-dasharray: 1; stroke-dashoffset: 1; }
.nft-mkt .nft-coupon, .nft-mkt .nft-grid, .nft-mkt .nft-listing,
.nft-mkt .nft-split, .nft-mkt .nft-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .nft-mkt .nft-coupon { animation: nftFade 0.5s ease-out 0.15s forwards; }
  .nft-mkt .nft-flow-1 { animation: nftDraw 0.7s cubic-bezier(0.65,0,0.35,1) 0.4s forwards; }
  .nft-mkt .nft-grid { animation: nftFade 0.6s ease-out 0.7s forwards; }
  .nft-mkt .nft-flow-2 { animation: nftDraw 0.7s cubic-bezier(0.65,0,0.35,1) 1s forwards; }
  .nft-mkt .nft-listing { animation: nftFade 0.6s ease-out 1.3s forwards; }
  .nft-mkt .nft-split { animation: nftFade 0.6s ease-out 1.6s forwards; }
  .nft-mkt .nft-label { animation: nftFade 0.6s ease-out 0.9s forwards; }
  @keyframes nftDraw { to { stroke-dashoffset: 0; } }
  @keyframes nftFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .nft-mkt .nft-flow { stroke-dashoffset: 0; }
  .nft-mkt .nft-coupon, .nft-mkt .nft-grid, .nft-mkt .nft-listing,
  .nft-mkt .nft-split, .nft-mkt .nft-label { opacity: 1; }
}
`
