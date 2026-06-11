// Signature visual for the Crypto Wallet Development leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). An ERC-4337
// account-abstraction architecture: a UserOperation flows through a bundler into
// the smart-account, which is funded by a paymaster (gas sponsor) and governed by
// signer + recovery keys. Pure SVG; the stroke-draw plays once on mount and
// short-circuits to the final state under prefers-reduced-motion. Decorative —
// aria-hidden, lg+ only.

export function CryptoWalletVisual() {
  return (
    <figure className="wallet-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* connecting flow lines: UserOp -> bundler -> smart account, paymaster + keys -> account */}
        <g className="wallet-flow" stroke="var(--color-border)" strokeWidth="1.25" fill="none">
          <path pathLength={1} d="M118,86 L188,86 L188,176" />
          <path pathLength={1} d="M118,294 L188,294 L188,204" />
          <path pathLength={1} d="M272,190 L342,190" />
        </g>

        {/* UserOperation node (top-left) */}
        <g className="wallet-node wallet-userop">
          <rect x="28" y="62" width="90" height="48" rx="3" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>

        {/* Bundler / EntryPoint node (top-center) */}
        <g className="wallet-node wallet-bundler">
          <rect x="148" y="62" width="90" height="48" rx="3" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>

        {/* Keys node (bottom-left): signer + recovery */}
        <g className="wallet-node wallet-keys">
          <rect x="28" y="270" width="90" height="48" rx="3" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>

        {/* Smart account — the center subject, brand accent */}
        <g className="wallet-node wallet-account">
          <rect x="148" y="158" width="124" height="64" rx="4" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2.5" />
          {/* inner ledger lines */}
          <line x1="166" y1="196" x2="254" y2="196" stroke="var(--color-brand)" strokeWidth="1" opacity="0.5" />
          <line x1="166" y1="206" x2="232" y2="206" stroke="var(--color-brand)" strokeWidth="1" opacity="0.5" />
        </g>

        {/* Paymaster node (right): gas sponsor, brand-tinted */}
        <g className="wallet-node wallet-paymaster">
          <rect x="342" y="166" width="92" height="48" rx="3" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="1.5" />
        </g>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="wallet-label" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.04em">
          <text x="73" y="80" textAnchor="middle" fill="var(--color-gray)">USEROP</text>
          <text x="73" y="94" textAnchor="middle" fill="var(--color-gray-light)">{'// signed'}</text>
          <text x="193" y="80" textAnchor="middle" fill="var(--color-gray)">BUNDLER</text>
          <text x="193" y="94" textAnchor="middle" fill="var(--color-gray-light)">ENTRYPOINT</text>
          <text x="73" y="288" textAnchor="middle" fill="var(--color-gray)">KEYS</text>
          <text x="73" y="302" textAnchor="middle" fill="var(--color-gray-light)">{'// recovery'}</text>
          <text x="210" y="150" textAnchor="middle" fill="var(--color-brand)">SMART ACCOUNT</text>
          <text x="210" y="248" textAnchor="middle" fill="var(--color-gray-light)" fontSize="8">ERC-4337</text>
          <text x="388" y="158" textAnchor="middle" fill="var(--color-brand)">PAYMASTER</text>
          <text x="388" y="234" textAnchor="middle" fill="var(--color-gray)" fontSize="8">{'// gas sponsor'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.wallet-viz .wallet-flow path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.wallet-viz .wallet-node { opacity: 0; }
.wallet-viz .wallet-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .wallet-viz .wallet-flow path {
    animation: walletDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.45s forwards;
  }
  .wallet-viz .wallet-userop { animation: walletFade 0.5s ease-out 0.1s forwards; }
  .wallet-viz .wallet-bundler { animation: walletFade 0.5s ease-out 0.55s forwards; }
  .wallet-viz .wallet-account { animation: walletFade 0.6s ease-out 0.9s forwards; }
  .wallet-viz .wallet-keys { animation: walletFade 0.5s ease-out 1.1s forwards; }
  .wallet-viz .wallet-paymaster { animation: walletFade 0.5s ease-out 1.3s forwards; }
  .wallet-viz .wallet-label { animation: walletFade 0.6s ease-out 1.5s forwards; }
  @keyframes walletDraw { to { stroke-dashoffset: 0; } }
  @keyframes walletFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .wallet-viz .wallet-flow path { stroke-dashoffset: 0; }
  .wallet-viz .wallet-node { opacity: 1; }
  .wallet-viz .wallet-label { opacity: 1; }
}
`
