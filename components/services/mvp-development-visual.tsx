// Signature visual for the MVP Development leaf hero (DESIGN.md: one signature
// visual per section, blueprint grammar, one-shot motion). An ascending sprint
// staircase — four rising two-week-sprint step blocks climbing left-to-right
// with a drawn progress line tracing their tops, ending at a launch flag the
// copy's "live production launch" references. Pure SVG; the stroke-draw plays
// once on mount (hero is above the fold) and short-circuits to the final state
// under prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function MvpDevelopmentVisual() {
  return (
    <figure className="mvpv relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* ground rail the staircase rises from */}
        <line
          className="mvpv-grid"
          x1="50"
          y1="320"
          x2="430"
          y2="320"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {/* four ascending sprint step blocks (each a two-week sprint) */}
        <g fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2">
          <rect className="mvpv-step mvpv-s1" x="50" y="248" width="80" height="72" rx="2" />
          <rect className="mvpv-step mvpv-s2" x="140" y="192" width="80" height="128" rx="2" />
          <rect className="mvpv-step mvpv-s3" x="230" y="136" width="80" height="184" rx="2" />
          <rect className="mvpv-step mvpv-s4" x="320" y="80" width="80" height="240" rx="2" />
        </g>

        {/* rising progress line tracing the step tops up to launch */}
        <path
          className="mvpv-progress"
          pathLength={1}
          d="M50,248 H130 L140,192 H220 L230,136 H310 L320,80 H400"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* progress waypoint nodes at each sprint corner */}
        <g className="mvpv-nodes" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2">
          <circle cx="90" cy="248" r="3.5" />
          <circle cx="180" cy="192" r="3.5" />
          <circle cx="270" cy="136" r="3.5" />
        </g>

        {/* launch flag at the summit */}
        <g className="mvpv-flag">
          <line x1="360" y1="80" x2="360" y2="36" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
          <path d="M360,40 L392,49 L360,58 Z" fill="var(--color-brand)" />
          <circle cx="360" cy="80" r="4" fill="var(--color-brand)" />
        </g>

        {/* sprint labels (JetBrains Mono via --font-mono) */}
        <g className="mvpv-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" textAnchor="middle">
          <text x="90" y="340">SPRINT 1</text>
          <text x="180" y="340">SPRINT 2</text>
          <text x="270" y="340">SPRINT 3</text>
          <text x="360" y="340">SPRINT N</text>
        </g>
        <text
          className="mvpv-flag-label"
          x="360" y="28" textAnchor="middle"
          fill="var(--color-brand)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        >
          LAUNCH
        </text>

        {/* the artefact handed forward — cadence note under the rail */}
        <g className="mvpv-foot" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.04em">
          <text x="50" y="362" fill="var(--color-gray-light)">{'// 2-week sprints · weekly demos'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.mvpv .mvpv-progress { stroke-dasharray: 1; stroke-dashoffset: 1; }
.mvpv .mvpv-step { opacity: 0; transform: translateY(16px); transform-box: fill-box; transform-origin: bottom; }
.mvpv .mvpv-nodes, .mvpv .mvpv-flag, .mvpv .mvpv-label, .mvpv .mvpv-flag-label, .mvpv .mvpv-foot { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .mvpv .mvpv-s1 { animation: mvpvRise 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s forwards; }
  .mvpv .mvpv-s2 { animation: mvpvRise 0.5s cubic-bezier(0.16,1,0.3,1) 0.35s forwards; }
  .mvpv .mvpv-s3 { animation: mvpvRise 0.5s cubic-bezier(0.16,1,0.3,1) 0.55s forwards; }
  .mvpv .mvpv-s4 { animation: mvpvRise 0.5s cubic-bezier(0.16,1,0.3,1) 0.75s forwards; }
  .mvpv .mvpv-progress { animation: mvpvDraw 1.3s cubic-bezier(0.65,0,0.35,1) 0.3s forwards; }
  .mvpv .mvpv-nodes { animation: mvpvFade 0.6s ease-out 0.9s forwards; }
  .mvpv .mvpv-label { animation: mvpvFade 0.6s ease-out 0.7s forwards; }
  .mvpv .mvpv-flag { animation: mvpvFade 0.5s ease-out 1.25s forwards; }
  .mvpv .mvpv-flag-label { animation: mvpvFade 0.5s ease-out 1.4s forwards; }
  .mvpv .mvpv-foot { animation: mvpvFade 0.6s ease-out 1.1s forwards; }
  @keyframes mvpvDraw { to { stroke-dashoffset: 0; } }
  @keyframes mvpvFade { to { opacity: 1; } }
  @keyframes mvpvRise { to { opacity: 1; transform: translateY(0); } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .mvpv .mvpv-progress { stroke-dashoffset: 0; }
  .mvpv .mvpv-step { opacity: 1; transform: none; }
  .mvpv .mvpv-nodes, .mvpv .mvpv-flag, .mvpv .mvpv-label, .mvpv .mvpv-flag-label, .mvpv .mvpv-foot { opacity: 1; }
}
`
