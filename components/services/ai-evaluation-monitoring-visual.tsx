// Signature visual for the AI Evaluation & Monitoring leaf hero. A labelled eval
// gate (pass/fail bars) sits in CI above a production monitoring line that trends
// flat then spikes — a drift alert firing. The "evals wired into CI + production
// monitoring that flags drift" the copy delivers. AI signature grammar: one-shot
// draw + fade, reduced-motion final-state fallback, var(--color-*) tokens
// (teal = --color-ai), mono labels, aria-hidden, 460x380 viewBox.

export function AiEvaluationMonitoringVisual() {
  // eval bars: height + pass flag
  const evals = [
    { h: 40, pass: true }, { h: 28, pass: true }, { h: 16, pass: false },
    { h: 44, pass: true }, { h: 34, pass: true }, { h: 22, pass: true },
  ]
  const baseY = 150
  return (
    <figure className="evm relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        {/* eval gate baseline */}
        <line className="evm-draw" pathLength={1} x1="44" y1={baseY} x2="300" y2={baseY} stroke="var(--color-border)" strokeWidth="1.5" />

        {/* eval bars */}
        {evals.map((e, i) => (
          <g key={i} className="evm-bar" style={{ ['--d' as string]: `${0.4 + i * 0.09}s` }}>
            <rect x={56 + i * 40} y={baseY - e.h} width="26" height={e.h} rx="2"
              fill={e.pass ? 'var(--color-ai)' : 'var(--color-bg)'} stroke={e.pass ? 'var(--color-ai)' : 'var(--color-gray-light)'}
              strokeWidth="1.25" opacity={e.pass ? 0.9 : 1} strokeDasharray={e.pass ? undefined : '3 3'} />
          </g>
        ))}

        {/* CI gate chip */}
        <g className="evm-gate" style={{ ['--d' as string]: '1.0s' }}>
          <rect x="316" y={baseY - 34} width="100" height="34" rx="6" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <path d="M328,150 l4,4 l8,-9" fill="none" stroke="var(--color-ai)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,-19)" />
          <text x="378" y={baseY - 12} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-ai)">CI gate</text>
        </g>

        {/* monitoring chart axes */}
        <g className="evm-axis" stroke="var(--color-border)" strokeWidth="1.25" fill="none">
          <path className="evm-draw" pathLength={1} d="M56,232 V322 H416" />
        </g>

        {/* monitoring line: flat then drift spike */}
        <path className="evm-line evm-draw" pathLength={1}
          d="M64,300 L120,298 L176,302 L232,296 L288,300 L330,250 L360,300"
          fill="none" stroke="var(--color-ai)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* drift alert marker */}
        <g className="evm-alert" style={{ ['--d' as string]: '1.7s' }}>
          <circle cx="330" cy="250" r="12" fill="none" stroke="var(--color-ai)" strokeWidth="1.5" opacity="0.5" />
          <circle cx="330" cy="250" r="5" fill="var(--color-ai)" />
          <text x="330" y="234" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-ai)">drift</text>
        </g>

        {/* labels */}
        <g className="evm-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="44" y="92">{'// evals · drift · cost'}</text>
          <text x="56" y="346">production monitoring · alerts</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.evm .evm-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.evm .evm-bar, .evm .evm-gate, .evm .evm-alert, .evm .evm-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .evm .evm-bar { animation: evmFade 0.4s ease-out var(--d) forwards; }
  .evm .evm-gate { animation: evmFade 0.5s ease-out var(--d) forwards; }
  .evm .evm-alert { animation: evmFade 0.5s ease-out var(--d) forwards; }
  .evm .evm-draw { animation: evmDraw 0.6s cubic-bezier(0.65,0,0.35,1) forwards; }
  .evm .evm-draw:nth-of-type(1) { animation-delay: 0.2s; }
  .evm .evm-draw:nth-of-type(2) { animation-delay: 1.1s; }
  .evm .evm-draw:nth-of-type(3) { animation-delay: 1.3s; }
  .evm .evm-label { animation: evmFade 0.6s ease-out 1.9s forwards; }
  @keyframes evmDraw { to { stroke-dashoffset: 0; } }
  @keyframes evmFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .evm .evm-draw { stroke-dashoffset: 0; }
  .evm .evm-bar, .evm .evm-gate, .evm .evm-alert, .evm .evm-label { opacity: 1; }
}
`
