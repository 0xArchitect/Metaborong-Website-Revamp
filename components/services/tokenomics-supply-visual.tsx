// Signature visual for the Tokenomics Design leaf hero (DESIGN.md: one signature
// visual per section, blueprint grammar, one-shot motion). A circulating-supply
// / emission curve with a vesting-cliff step, wrapped in the faint envelope of
// the 10,000-trajectory simulation the copy references. Pure SVG; the stroke-draw
// plays once on mount (hero is above the fold) and short-circuits to the final
// state under prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function TokenomicsSupplyVisual() {
  return (
    <figure className="tok-supply relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* plot frame */}
        <g className="tok-grid" stroke="var(--color-border)" strokeWidth="1">
          <line x1="60" y1="40" x2="60" y2="320" />
          <line x1="60" y1="320" x2="440" y2="320" />
          {/* horizontal gridlines */}
          <line x1="60" y1="264" x2="440" y2="264" strokeDasharray="2 5" />
          <line x1="60" y1="208" x2="440" y2="208" strokeDasharray="2 5" />
          <line x1="60" y1="152" x2="440" y2="152" strokeDasharray="2 5" />
          <line x1="60" y1="96" x2="440" y2="96" strokeDasharray="2 5" />
        </g>

        {/* simulation envelope — spread of the 10k trajectories, widening over time */}
        <path
          className="tok-envelope"
          d="M60,300 C120,286 200,210 250,150 C310,96 380,58 440,40 L440,78 C380,96 310,128 250,166 C200,196 120,278 60,304 Z"
          fill="var(--color-brand)"
        />

        {/* a few individual faint trajectories inside the band */}
        <g className="tok-traj" stroke="var(--color-brand)" fill="none" strokeWidth="1">
          <path d="M60,300 C120,280 190,205 250,156 C320,100 380,70 440,52" />
          <path d="M60,302 C130,288 210,206 250,160 C300,120 380,82 440,66" />
          <path d="M60,299 C110,278 200,200 250,148 C330,92 390,60 440,46" />
        </g>

        {/* main circulating-supply / emission curve with a cliff step at month 12 */}
        <path
          className="tok-curve"
          pathLength={1}
          d="M60,298 C95,288 125,276 155,260 L156,212 C185,196 222,156 250,142 C300,116 322,98 345,90 C382,74 410,62 440,54"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* cliff marker */}
        <g className="tok-cliff">
          <line x1="155" y1="40" x2="155" y2="320" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="155" cy="260" r="3.5" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="156" cy="212" r="3.5" fill="var(--color-brand)" />
        </g>

        {/* axis labels (JetBrains Mono via --font-mono) */}
        <g className="tok-label" fill="var(--color-gray-light)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em">
          <text x="60" y="338">0</text>
          <text x="148" y="338">12</text>
          <text x="242" y="338">24</text>
          <text x="337" y="338">36</text>
          <text x="424" y="338">48</text>
          <text x="60" y="356" fill="var(--color-gray)">MONTHS</text>
          <text x="155" y="30" textAnchor="middle" fill="var(--color-brand)">CLIFF</text>
        </g>
        <text
          className="tok-label" x="24" y="180" transform="rotate(-90 24 180)" textAnchor="middle"
          fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        >
          CIRCULATING SUPPLY
        </text>
      </svg>
    </figure>
  )
}

const css = `
.tok-supply .tok-envelope { opacity: 0; }
.tok-supply .tok-traj path,
.tok-supply .tok-curve { stroke-dasharray: 1; stroke-dashoffset: 1; }
.tok-supply .tok-traj { opacity: 0.16; }
.tok-supply .tok-cliff, .tok-supply .tok-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .tok-supply .tok-curve {
    animation: tokDraw 1.25s cubic-bezier(0.65,0,0.35,1) 0.15s forwards;
  }
  .tok-supply .tok-traj path {
    animation: tokDraw 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
  }
  .tok-supply .tok-envelope {
    animation: tokFade 0.9s ease-out 0.5s forwards;
  }
  .tok-supply .tok-cliff { animation: tokFade 0.5s ease-out 1.1s forwards; }
  .tok-supply .tok-label { animation: tokFade 0.6s ease-out 0.7s forwards; }
  @keyframes tokDraw { to { stroke-dashoffset: 0; } }
  @keyframes tokFade { to { opacity: 1; } }
  .tok-supply .tok-envelope { animation-name: tokFadeEnv; }
  @keyframes tokFadeEnv { to { opacity: 0.06; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .tok-supply .tok-traj path,
  .tok-supply .tok-curve { stroke-dashoffset: 0; }
  .tok-supply .tok-envelope { opacity: 0.06; }
  .tok-supply .tok-cliff, .tok-supply .tok-label { opacity: 1; }
}
`
