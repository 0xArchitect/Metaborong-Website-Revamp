// Signature visual for the Decentralized Identity / DID leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). The trust
// triangle of verifiable credentials: an ISSUER signs a credential to a HOLDER,
// who presents a zero-knowledge PROOF to a VERIFIER. The holder→verifier edge
// passes a selective-disclosure gate — the proof crosses, the raw attributes
// (shown as withheld dots) do not. Pure SVG; the stroke-draw plays once on mount
// (hero is above the fold) and short-circuits to the final state under
// prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function DidVisual() {
  return (
    <figure className="did relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* trust-triangle edges: issuer → holder (signs), holder → verifier (proves) */}
        <g fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round">
          <path className="did-edge did-edge-1" pathLength={1} d="M96,96 L96,288" />
          <path className="did-edge did-edge-2" pathLength={1} d="M120,300 L344,300" />
        </g>

        {/* selective-disclosure gate on the holder → verifier edge */}
        <g className="did-gate">
          <line x1="232" y1="270" x2="232" y2="330" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 4" />
          {/* the single claim that passes through the gate */}
          <circle cx="232" cy="300" r="4" fill="var(--color-brand)" />
          {/* withheld attributes — held back below the edge, never crossing */}
          <g className="did-withheld" fill="var(--color-gray-light)">
            <circle cx="208" cy="332" r="2.5" />
            <circle cx="232" cy="340" r="2.5" />
            <circle cx="256" cy="332" r="2.5" />
          </g>
        </g>

        {/* issuer node — signs the credential */}
        <g className="did-node did-node-issuer">
          <rect x="68" y="72" width="56" height="48" rx="4" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          {/* signature key glyph */}
          <circle cx="88" cy="96" r="5" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="92" y1="96" x2="108" y2="96" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="104" y1="96" x2="104" y2="102" stroke="var(--color-brand)" strokeWidth="2" />
        </g>

        {/* holder node — wallet holding the credential */}
        <g className="did-node did-node-holder">
          <rect x="68" y="276" width="56" height="48" rx="4" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <rect x="80" y="290" width="32" height="20" rx="2" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="104" cy="300" r="2.5" fill="var(--color-brand)" />
        </g>

        {/* verifier node — checks the proof against the issuer's DID key */}
        <g className="did-node did-node-verifier">
          <rect x="328" y="276" width="56" height="48" rx="4" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          {/* check mark */}
          <path d="M344,300 l7,7 l13,-15" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* node labels (JetBrains Mono via --font-mono) */}
        <g className="did-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="96" y="60" textAnchor="middle">ISSUER</text>
          <text x="96" y="346" textAnchor="middle">HOLDER</text>
          <text x="356" y="346" textAnchor="middle">VERIFIER</text>
        </g>

        {/* edge annotations */}
        <g className="did-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="108" y="196" fill="var(--color-gray-light)">SIGNS VC</text>
          <text x="232" y="262" textAnchor="middle" fill="var(--color-brand)">ZK PROOF</text>
          <text x="232" y="360" textAnchor="middle" fill="var(--color-gray-light)">WITHHELD</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.did .did-edge { stroke-dasharray: 1; stroke-dashoffset: 1; }
.did .did-node, .did .did-gate, .did .did-label { opacity: 0; }
.did .did-withheld { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .did .did-node-issuer { animation: didFade 0.5s ease-out 0.15s forwards; }
  .did .did-edge-1 { animation: didDraw 0.9s cubic-bezier(0.65,0,0.35,1) 0.35s forwards; }
  .did .did-node-holder { animation: didFade 0.5s ease-out 1.1s forwards; }
  .did .did-edge-2 { animation: didDraw 0.9s cubic-bezier(0.65,0,0.35,1) 1.25s forwards; }
  .did .did-gate { animation: didFade 0.6s ease-out 2.0s forwards; }
  .did .did-withheld { animation: didFadeFaint 0.6s ease-out 2.3s forwards; }
  .did .did-node-verifier { animation: didFade 0.5s ease-out 2.2s forwards; }
  .did .did-label { animation: didFade 0.6s ease-out 1.4s forwards; }
  @keyframes didDraw { to { stroke-dashoffset: 0; } }
  @keyframes didFade { to { opacity: 1; } }
  @keyframes didFadeFaint { to { opacity: 0.5; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .did .did-edge { stroke-dashoffset: 0; }
  .did .did-node, .did .did-gate, .did .did-label { opacity: 1; }
  .did .did-withheld { opacity: 0.5; }
}
`
