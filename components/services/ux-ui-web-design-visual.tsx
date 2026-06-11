// Signature visual for the UI/UX & Web Design leaf hero (DESIGN.md: one signature
// visual per section, blueprint grammar, one-shot motion). A design-system canvas:
// an artboard frame over a baseline grid, schematic component blocks (card, input,
// button) wired down to a row of design-token swatches — design delivered as a
// token-driven, coded system, not a static file. Pure SVG; the stroke-draw plays
// once on mount (hero is above the fold) and short-circuits to the final state
// under prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function UxUiWebDesignVisual() {
  return (
    <figure className="uxd relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* baseline grid the artboard is laid out on */}
        <g className="uxd-grid" stroke="var(--color-border)" strokeWidth="1">
          <line x1="44" y1="92" x2="416" y2="92" strokeDasharray="2 5" />
          <line x1="44" y1="132" x2="416" y2="132" strokeDasharray="2 5" />
          <line x1="44" y1="172" x2="416" y2="172" strokeDasharray="2 5" />
          <line x1="44" y1="212" x2="416" y2="212" strokeDasharray="2 5" />
          <line x1="128" y1="60" x2="128" y2="244" strokeDasharray="2 5" />
          <line x1="232" y1="60" x2="232" y2="244" strokeDasharray="2 5" />
          <line x1="336" y1="60" x2="336" y2="244" strokeDasharray="2 5" />
        </g>

        {/* artboard frame drawn around the canvas */}
        <rect
          className="uxd-frame"
          pathLength={1}
          x="44"
          y="60"
          width="372"
          height="184"
          rx="3"
          fill="none"
          stroke="var(--pillar-color, var(--color-brand))"
          strokeWidth="2"
        />

        {/* component block — card */}
        <g className="uxd-block uxd-b1">
          <rect x="62" y="84" width="120" height="100" rx="3" fill="var(--color-bg)" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" />
          <rect x="62" y="84" width="120" height="36" rx="3" fill="var(--pillar-color, var(--color-brand))" opacity="0.12" />
          <line x1="76" y1="138" x2="168" y2="138" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="76" y1="152" x2="168" y2="152" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="76" y1="166" x2="140" y2="166" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>

        {/* component block — input field */}
        <g className="uxd-block uxd-b2">
          <rect x="204" y="100" width="156" height="30" rx="3" fill="var(--color-bg)" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" />
          <line x1="216" y1="115" x2="216" y2="115" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" strokeLinecap="round" />
          <line x1="216" y1="108" x2="216" y2="122" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="1.5" />
          <line x1="228" y1="115" x2="300" y2="115" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>

        {/* component block — button */}
        <g className="uxd-block uxd-b3">
          <rect x="204" y="150" width="104" height="34" rx="3" fill="var(--pillar-color, var(--color-brand))" />
          <line x1="222" y1="167" x2="290" y2="167" stroke="var(--color-bg)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        </g>

        {/* connectors from each block down to the token row */}
        <path
          className="uxd-wire"
          pathLength={1}
          d="M122,184 V268 M232,184 V268 M256,184 V268 M336,184 V268"
          fill="none"
          stroke="var(--pillar-color, var(--color-brand))"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />

        {/* design-token swatches — color tints, neutrals, then spacing tokens */}
        <g className="uxd-tokens">
          <rect className="uxd-tok uxd-t1" x="62" y="280" width="26" height="26" rx="2" fill="var(--pillar-color, var(--color-brand))" />
          <rect className="uxd-tok uxd-t2" x="98" y="280" width="26" height="26" rx="2" fill="var(--pillar-color, var(--color-brand))" fillOpacity="0.65" />
          <rect className="uxd-tok uxd-t3" x="134" y="280" width="26" height="26" rx="2" fill="var(--pillar-color, var(--color-brand))" fillOpacity="0.4" />
          <rect className="uxd-tok uxd-t4" x="170" y="280" width="26" height="26" rx="2" fill="var(--pillar-color, var(--color-brand))" fillOpacity="0.22" />
          <rect className="uxd-tok uxd-t5" x="206" y="280" width="26" height="26" rx="2" fill="var(--color-gray)" />
          <rect className="uxd-tok uxd-t6" x="242" y="280" width="26" height="26" rx="2" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect className="uxd-tok uxd-t7" x="278" y="280" width="12" height="26" rx="2" fill="var(--color-gray-light)" />
          <rect className="uxd-tok uxd-t8" x="300" y="280" width="60" height="8" rx="2" fill="var(--color-gray-light)" />
          <rect className="uxd-tok uxd-t9" x="300" y="298" width="36" height="8" rx="2" fill="var(--color-gray-light)" />
        </g>

        {/* mono labels (JetBrains Mono via --font-mono) */}
        <g className="uxd-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="44" y="50">COMPONENTS</text>
          <text x="44" y="272">TOKENS</text>
          <text x="316" y="298" fill="var(--color-gray-light)">SPACING</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.uxd .uxd-frame, .uxd .uxd-wire { stroke-dasharray: 1; stroke-dashoffset: 1; }
.uxd .uxd-block, .uxd .uxd-tok, .uxd .uxd-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .uxd .uxd-frame { animation: uxdDraw 1.2s cubic-bezier(0.65,0,0.35,1) 0.15s forwards; }
  .uxd .uxd-b1 { animation: uxdPop 0.5s cubic-bezier(0.16,1,0.3,1) 0.55s forwards; }
  .uxd .uxd-b2 { animation: uxdPop 0.5s cubic-bezier(0.16,1,0.3,1) 0.7s forwards; }
  .uxd .uxd-b3 { animation: uxdPop 0.5s cubic-bezier(0.16,1,0.3,1) 0.85s forwards; }
  .uxd .uxd-wire { animation: uxdDraw 0.7s cubic-bezier(0.65,0,0.35,1) 1.0s forwards; }
  .uxd .uxd-t1 { animation: uxdFade 0.4s ease-out 1.2s forwards; }
  .uxd .uxd-t2 { animation: uxdFade 0.4s ease-out 1.27s forwards; }
  .uxd .uxd-t3 { animation: uxdFade 0.4s ease-out 1.34s forwards; }
  .uxd .uxd-t4 { animation: uxdFade 0.4s ease-out 1.41s forwards; }
  .uxd .uxd-t5 { animation: uxdFade 0.4s ease-out 1.48s forwards; }
  .uxd .uxd-t6 { animation: uxdFade 0.4s ease-out 1.55s forwards; }
  .uxd .uxd-t7 { animation: uxdFade 0.4s ease-out 1.62s forwards; }
  .uxd .uxd-t8 { animation: uxdFade 0.4s ease-out 1.69s forwards; }
  .uxd .uxd-t9 { animation: uxdFade 0.4s ease-out 1.76s forwards; }
  .uxd .uxd-label { animation: uxdFade 0.6s ease-out 0.4s forwards; }
  @keyframes uxdDraw { to { stroke-dashoffset: 0; } }
  @keyframes uxdFade { to { opacity: 1; } }
  @keyframes uxdPop {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }
  .uxd .uxd-block { transform-box: fill-box; transform-origin: center; }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .uxd .uxd-frame, .uxd .uxd-wire { stroke-dashoffset: 0; }
  .uxd .uxd-block, .uxd .uxd-tok, .uxd .uxd-label { opacity: 1; }
}
`
