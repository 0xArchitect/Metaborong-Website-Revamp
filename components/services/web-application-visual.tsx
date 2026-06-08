// Signature visual for the Web Application Development leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). A blueprint
// browser window — top bar with three dots + an address line — whose body holds a
// small node graph of distinct user roles wiring into a shared application core,
// which then emits a verifiable credential badge. Anchored on the GetSmart on-chain
// credentialing build the copy references. Pure SVG; the stroke-draw plays once on
// mount (hero is above the fold) and short-circuits to the final state under
// prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function WebApplicationVisual() {
  return (
    <figure className="wapp relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* browser window frame */}
        <g className="wapp-frame">
          <rect x="40" y="40" width="380" height="270" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          {/* chrome / top bar */}
          <line x1="40" y1="72" x2="420" y2="72" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx="58" cy="56" r="4" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <circle cx="74" cy="56" r="4" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <circle cx="90" cy="56" r="4" fill="none" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          {/* address line */}
          <rect x="116" y="49" width="288" height="14" rx="7" fill="none" stroke="var(--color-border)" strokeWidth="1" />
        </g>

        {/* address text */}
        <text className="wapp-url" x="126" y="60" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          getsmart.app/issue
        </text>

        {/* the wired connectors: each role → core, core → badge */}
        <path
          className="wapp-wire"
          pathLength={1}
          d="M104,120 H188 M104,170 H188 M104,220 H188 M280,170 H348"
          fill="none"
          stroke="var(--pillar-color, var(--color-brand))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* role nodes — three distinct user roles */}
        <g className="wapp-roles" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.04em">
          <g className="wapp-role wapp-r1">
            <rect x="62" y="108" width="42" height="24" rx="3" fill="var(--color-bg)" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" />
            <circle cx="83" cy="120" r="4.5" fill="none" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="1.5" />
          </g>
          <g className="wapp-role wapp-r2">
            <rect x="62" y="158" width="42" height="24" rx="3" fill="var(--color-bg)" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" />
            <circle cx="83" cy="170" r="4.5" fill="none" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="1.5" />
          </g>
          <g className="wapp-role wapp-r3">
            <rect x="62" y="208" width="42" height="24" rx="3" fill="var(--color-bg)" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" />
            <circle cx="83" cy="220" r="4.5" fill="none" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="1.5" />
          </g>
        </g>

        {/* shared application core */}
        <g className="wapp-core">
          <rect x="188" y="148" width="92" height="44" rx="4" fill="var(--color-bg)" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" />
          <line x1="188" y1="162" x2="280" y2="162" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx="234" cy="178" r="6" fill="none" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="1.5" />
          <line x1="234" y1="178" x2="234" y2="172" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* emitted credential badge */}
        <g className="wapp-badge">
          <path
            d="M366,148 L384,154 L384,178 C384,189 376,196 366,200 C356,196 348,189 348,178 L348,154 Z"
            fill="var(--pillar-color, var(--color-brand))"
          />
          <path
            className="wapp-check"
            pathLength={1}
            d="M358,173 L364,180 L375,165"
            fill="none"
            stroke="var(--color-bg)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* labels (JetBrains Mono via --font-mono) */}
        <g className="wapp-label" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.06em">
          <text x="62" y="100" fill="var(--color-gray)">ISSUER</text>
          <text x="62" y="150" fill="var(--color-gray)">VERIFIER</text>
          <text x="62" y="200" fill="var(--color-gray)">HOLDER</text>
          <text x="188" y="140" fill="var(--color-gray-light)">APPLICATION CORE</text>
          <text x="348" y="140" fill="var(--pillar-color, var(--color-brand))">CREDENTIAL</text>
        </g>

        {/* footer artefact line under the window */}
        <g className="wapp-foot" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.04em">
          <text x="40" y="338" fill="var(--color-gray-light)">{'// multi-role access'}</text>
          <text x="40" y="354" fill="var(--pillar-color, var(--color-brand))">→ verifiable badge minted</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.wapp .wapp-wire { stroke-dasharray: 1; stroke-dashoffset: 1; }
.wapp .wapp-check { stroke-dasharray: 1; stroke-dashoffset: 1; }
.wapp .wapp-frame, .wapp .wapp-url, .wapp .wapp-role, .wapp .wapp-core,
.wapp .wapp-badge, .wapp .wapp-label, .wapp .wapp-foot { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .wapp .wapp-frame { animation: wappFade 0.5s ease-out 0.1s forwards; }
  .wapp .wapp-url { animation: wappFade 0.5s ease-out 0.35s forwards; }
  .wapp .wapp-r1 { animation: wappFade 0.4s ease-out 0.5s forwards; }
  .wapp .wapp-r2 { animation: wappFade 0.4s ease-out 0.62s forwards; }
  .wapp .wapp-r3 { animation: wappFade 0.4s ease-out 0.74s forwards; }
  .wapp .wapp-wire { animation: wappDraw 1.1s cubic-bezier(0.65,0,0.35,1) 0.55s forwards; }
  .wapp .wapp-core { animation: wappFade 0.5s ease-out 0.95s forwards; }
  .wapp .wapp-badge { animation: wappFade 0.5s ease-out 1.3s forwards; }
  .wapp .wapp-check { animation: wappDraw 0.5s cubic-bezier(0.65,0,0.35,1) 1.55s forwards; }
  .wapp .wapp-label { animation: wappFade 0.6s ease-out 1.05s forwards; }
  .wapp .wapp-foot { animation: wappFade 0.6s ease-out 1.4s forwards; }
  @keyframes wappDraw { to { stroke-dashoffset: 0; } }
  @keyframes wappFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .wapp .wapp-wire, .wapp .wapp-check { stroke-dashoffset: 0; }
  .wapp .wapp-frame, .wapp .wapp-url, .wapp .wapp-role, .wapp .wapp-core,
  .wapp .wapp-badge, .wapp .wapp-label, .wapp .wapp-foot { opacity: 1; }
}
`
