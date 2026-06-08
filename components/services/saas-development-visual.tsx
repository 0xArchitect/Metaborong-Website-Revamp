// Signature visual for the SaaS Development leaf hero (DESIGN.md: one signature
// visual per section, blueprint grammar, one-shot motion). A multi-tenant
// architecture blueprint: three isolated tenant lanes on the left feed drawn
// connectors into one shared application core in the middle, with a recurring
// billing-cycle meter on the right — the workspace-scoped isolation on a single
// shared platform the copy references. Pure SVG; the stroke-draw plays once on
// mount (hero is above the fold) and short-circuits to the final state under
// prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function SaasDevelopmentVisual() {
  return (
    <figure className="saasv relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* faint isolation rail the lanes sit against */}
        <line
          className="saasv-grid"
          x1="40" y1="60" x2="40" y2="288"
          stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 5"
        />

        {/* three isolated tenant lanes — each a rounded, scoped row */}
        <g className="saasv-lane saasv-l1">
          <rect x="40" y="60" width="150" height="44" rx="6" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <rect x="52" y="74" width="16" height="16" rx="3" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="80" y1="78" x2="172" y2="78" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="80" y1="88" x2="150" y2="88" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>
        <g className="saasv-lane saasv-l2">
          <rect x="40" y="152" width="150" height="44" rx="6" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <rect x="52" y="166" width="16" height="16" rx="3" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="80" y1="170" x2="172" y2="170" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="80" y1="180" x2="150" y2="180" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>
        <g className="saasv-lane saasv-l3">
          <rect x="40" y="244" width="150" height="44" rx="6" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <rect x="52" y="258" width="16" height="16" rx="3" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="80" y1="262" x2="172" y2="262" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="80" y1="272" x2="150" y2="272" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>

        {/* drawn connectors — every tenant routes into the one shared core */}
        <path
          className="saasv-wire"
          pathLength={1}
          d="M190,82 C228,82 240,160 270,170 M190,174 H270 M190,266 C228,266 240,180 270,174"
          fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* shared application core — the single platform all tenants run on */}
        <g className="saasv-core">
          <rect x="270" y="138" width="72" height="72" rx="6" fill="var(--color-brand)" />
          <rect x="270" y="138" width="72" height="72" rx="6" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="306" y1="138" x2="306" y2="210" stroke="var(--color-bg)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="270" y1="174" x2="342" y2="174" stroke="var(--color-bg)" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="306" cy="174" r="11" fill="none" stroke="var(--color-bg)" strokeWidth="2" />
        </g>

        {/* metered link from core to the billing accent */}
        <path
          className="saasv-meter-wire"
          pathLength={1}
          d="M342,174 H392"
          fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 5"
        />

        {/* recurring billing cycle meter on the right */}
        <g className="saasv-bill">
          <circle cx="408" cy="174" r="26" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="2" />
          <path
            className="saasv-cycle"
            pathLength={1}
            d="M408,148 A26,26 0 1 1 388,156"
            fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round"
          />
          <path d="M385,154 L388,156 L387,160" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="saasv-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="44" y="40">TENANT</text>
          <text x="276" y="40">CORE</text>
          <text x="392" y="222" textAnchor="middle">BILLING</text>
        </g>
        <g className="saasv-label" fill="var(--color-gray-light)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="44" y="124">t1</text>
          <text x="44" y="216">t2</text>
          <text x="44" y="308">t3</text>
        </g>

        {/* the artefact handed forward — isolation contract */}
        <g className="saasv-foot" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.04em">
          <text x="40" y="348" fill="var(--color-gray-light)">{'// workspace-scoped data'}</text>
          <text x="40" y="364" fill="var(--color-brand)">→ one shared platform</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.saasv .saasv-wire,
.saasv .saasv-meter-wire,
.saasv .saasv-cycle { stroke-dasharray: 1; stroke-dashoffset: 1; }
.saasv .saasv-lane, .saasv .saasv-core, .saasv .saasv-bill,
.saasv .saasv-label, .saasv .saasv-foot { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .saasv .saasv-l1 { animation: saasvFade 0.45s ease-out 0.2s forwards; }
  .saasv .saasv-l2 { animation: saasvFade 0.45s ease-out 0.35s forwards; }
  .saasv .saasv-l3 { animation: saasvFade 0.45s ease-out 0.5s forwards; }
  .saasv .saasv-wire { animation: saasvDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.7s forwards; }
  .saasv .saasv-core { animation: saasvFade 0.5s ease-out 1.05s forwards; }
  .saasv .saasv-meter-wire { animation: saasvDraw 0.6s cubic-bezier(0.65,0,0.35,1) 1.3s forwards; }
  .saasv .saasv-bill { animation: saasvFade 0.45s ease-out 1.55s forwards; }
  .saasv .saasv-cycle { animation: saasvDraw 0.9s cubic-bezier(0.65,0,0.35,1) 1.7s forwards; }
  .saasv .saasv-label { animation: saasvFade 0.6s ease-out 0.9s forwards; }
  .saasv .saasv-foot { animation: saasvFade 0.6s ease-out 1.4s forwards; }
  @keyframes saasvDraw { to { stroke-dashoffset: 0; } }
  @keyframes saasvFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .saasv .saasv-wire,
  .saasv .saasv-meter-wire,
  .saasv .saasv-cycle { stroke-dashoffset: 0; }
  .saasv .saasv-lane, .saasv .saasv-core, .saasv .saasv-bill,
  .saasv .saasv-label, .saasv .saasv-foot { opacity: 1; }
}
`
