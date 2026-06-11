// Signature visual for the Mobile App Development leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). Anchored on
// Breayz — a cross-platform app that reads the user's location air-quality index
// and mints a dynamically generated NFT whose metadata updates as they move. A
// blueprint phone frame holding a location pin emitting concentric signal rings,
// an AQI gauge arc, and a generated collectible tile. Pure SVG; the stroke-draw
// plays once on mount (hero is above the fold) and short-circuits to the final
// state under prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function MobileAppVisual() {
  return (
    <figure className="mob relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* phone frame — drawn portrait outline */}
        <path
          className="mob-frame"
          pathLength={1}
          d="M180,36 h100 a16,16 0 0 1 16,16 v276 a16,16 0 0 1 -16,16 h-100 a16,16 0 0 1 -16,-16 v-276 a16,16 0 0 1 16,-16 Z"
          fill="var(--color-bg)"
          stroke="var(--pillar-color, var(--color-brand))"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* speaker notch */}
        <line className="mob-frame" x1="212" y1="50" x2="248" y2="50" stroke="var(--color-gray-light)" strokeWidth="2" strokeLinecap="round" />

        {/* concentric signal rings emitted from the pin */}
        <g className="mob-rings" fill="none" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="1.5">
          <circle className="mob-ring mob-r1" cx="230" cy="138" r="20" />
          <circle className="mob-ring mob-r2" cx="230" cy="138" r="34" />
          <circle className="mob-ring mob-r3" cx="230" cy="138" r="48" />
        </g>

        {/* location pin */}
        <g className="mob-pin">
          <path
            d="M230,108 a14,14 0 0 1 14,14 c0,10 -14,28 -14,28 c0,0 -14,-18 -14,-28 a14,14 0 0 1 14,-14 Z"
            fill="var(--pillar-color, var(--color-brand))"
          />
          <circle cx="230" cy="122" r="5" fill="var(--color-bg)" />
        </g>

        {/* AQI gauge arc + drawn reading needle */}
        <g className="mob-gauge">
          <path d="M196,238 A40,40 0 0 1 264,238" fill="none" stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round" />
          <path
            className="mob-arc"
            pathLength={1}
            d="M196,238 A40,40 0 0 1 252,221"
            fill="none"
            stroke="var(--pillar-color, var(--color-brand))"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="230" cy="238" r="3" fill="var(--pillar-color, var(--color-brand))" />
        </g>

        {/* generated collectible tile */}
        <g className="mob-tile">
          <rect x="200" y="262" width="60" height="48" rx="3" fill="var(--color-bg)" stroke="var(--pillar-color, var(--color-brand))" strokeWidth="2" />
          <path d="M208,300 L222,280 L232,292 L244,272 L252,300 Z" fill="var(--pillar-color, var(--color-brand))" opacity="0.85" />
          <circle cx="246" cy="276" r="4" fill="var(--pillar-color, var(--color-brand))" />
        </g>

        {/* mono labels */}
        <g fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle">
          <text className="mob-label" x="230" y="174" fill="var(--color-gray-light)" letterSpacing="0.06em">SIGNAL</text>
          <text className="mob-label" x="230" y="253" fill="var(--color-gray)" letterSpacing="0.08em">AQI</text>
          <text className="mob-label" x="230" y="328" fill="var(--color-gray-light)" letterSpacing="0.04em">MINTED</text>
        </g>
        <text
          className="mob-label" x="40" y="200" transform="rotate(-90 40 200)" textAnchor="middle"
          fill="var(--color-gray)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em"
        >
          iOS · ANDROID
        </text>
      </svg>
    </figure>
  )
}

const css = `
.mob .mob-frame { stroke-dasharray: 1; stroke-dashoffset: 1; }
.mob .mob-arc { stroke-dasharray: 1; stroke-dashoffset: 1; }
.mob .mob-pin, .mob .mob-gauge, .mob .mob-tile, .mob .mob-label { opacity: 0; }
.mob .mob-ring { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .mob .mob-frame { animation: mobDraw 1.2s cubic-bezier(0.65,0,0.35,1) 0.1s forwards; }
  .mob .mob-pin { animation: mobFade 0.5s ease-out 0.7s forwards; }
  .mob .mob-r1 { animation: mobPulse 1.8s ease-out 0.9s infinite; }
  .mob .mob-r2 { animation: mobPulse 1.8s ease-out 1.2s infinite; }
  .mob .mob-r3 { animation: mobPulse 1.8s ease-out 1.5s infinite; }
  .mob .mob-gauge { animation: mobFade 0.5s ease-out 1.0s forwards; }
  .mob .mob-arc { animation: mobDraw 0.9s cubic-bezier(0.16,1,0.3,1) 1.2s forwards; }
  .mob .mob-tile { animation: mobFade 0.6s ease-out 1.4s forwards; }
  .mob .mob-label { animation: mobFade 0.6s ease-out 1.1s forwards; }
  @keyframes mobDraw { to { stroke-dashoffset: 0; } }
  @keyframes mobFade { to { opacity: 1; } }
  @keyframes mobPulse {
    0% { opacity: 0; transform: scale(0.6); transform-origin: 230px 138px; }
    40% { opacity: 0.5; }
    100% { opacity: 0; transform: scale(1); transform-origin: 230px 138px; }
  }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .mob .mob-frame, .mob .mob-arc { stroke-dashoffset: 0; }
  .mob .mob-pin, .mob .mob-gauge, .mob .mob-tile, .mob .mob-label { opacity: 1; }
  .mob .mob-ring { opacity: 0.3; }
}
`
