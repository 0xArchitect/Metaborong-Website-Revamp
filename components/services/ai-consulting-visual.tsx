// Signature visual for the AI Consulting & Strategy leaf hero. An impact ×
// feasibility scoring quadrant: candidate workflows plotted as dots, the lead
// build candidate lit in the high-impact / high-feasibility corner — the scored
// opportunity map the copy delivers. AI signature grammar: one-shot draw + fade,
// reduced-motion final-state fallback, var(--color-*) tokens (teal = --color-ai),
// mono labels, aria-hidden, 460x380 viewBox.

export function AiConsultingVisual() {
  const dots = [
    { cx: 150, cy: 256 }, { cx: 196, cy: 214 }, { cx: 158, cy: 168 },
    { cx: 250, cy: 224 }, { cx: 300, cy: 168 }, { cx: 228, cy: 270 },
  ]
  return (
    <figure className="acv2 relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="acv2-ar" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--color-gray-light)" />
          </marker>
        </defs>

        {/* axes */}
        <g className="acv2-axis" stroke="var(--color-gray-light)" strokeWidth="1.5" fill="none">
          <path className="acv2-draw" pathLength={1} d="M96,300 V52" markerEnd="url(#acv2-ar)" />
          <path className="acv2-draw" pathLength={1} d="M96,300 H410" markerEnd="url(#acv2-ar)" />
        </g>
        {/* quadrant divider */}
        <g className="acv2-grid" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 4" fill="none">
          <line x1="253" y1="76" x2="253" y2="300" />
          <line x1="96" y1="176" x2="410" y2="176" />
        </g>

        {/* candidate dots */}
        {dots.map((d, i) => (
          <circle key={i} className="acv2-dot" style={{ ['--d' as string]: `${0.8 + i * 0.08}s` }}
            cx={d.cx} cy={d.cy} r="6" fill="var(--color-bg)" stroke="var(--color-gray)" strokeWidth="1.5" />
        ))}

        {/* lead candidate — high impact / high feasibility */}
        <g className="acv2-lead" style={{ ['--d' as string]: '1.45s' }}>
          <circle cx="344" cy="112" r="14" fill="none" stroke="var(--color-ai)" strokeWidth="1.5" opacity="0.5" />
          <circle cx="344" cy="112" r="8" fill="var(--color-ai)" />
          <text x="344" y="92" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-ai)">lead</text>
        </g>

        {/* axis + frame labels */}
        <g className="acv2-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="36" y="44">{'// opportunity map'}</text>
          <text transform="rotate(-90 64 200)" x="64" y="200" textAnchor="middle">impact</text>
          <text x="253" y="328" textAnchor="middle">feasibility</text>
          <text x="36" y="360">scored · build-vs-buy</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.acv2 .acv2-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.acv2 .acv2-dot, .acv2 .acv2-lead, .acv2 .acv2-grid, .acv2 .acv2-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .acv2 .acv2-draw { animation: acv2Draw 0.6s cubic-bezier(0.65,0,0.35,1) forwards; }
  .acv2 .acv2-draw:nth-of-type(1) { animation-delay: 0.2s; }
  .acv2 .acv2-draw:nth-of-type(2) { animation-delay: 0.45s; }
  .acv2 .acv2-grid { animation: acv2Fade 0.5s ease-out 0.7s forwards; }
  .acv2 .acv2-dot { animation: acv2Fade 0.4s ease-out var(--d) forwards; }
  .acv2 .acv2-lead { animation: acv2Fade 0.5s ease-out var(--d) forwards; }
  .acv2 .acv2-label { animation: acv2Fade 0.6s ease-out 1.6s forwards; }
  @keyframes acv2Draw { to { stroke-dashoffset: 0; } }
  @keyframes acv2Fade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .acv2 .acv2-draw { stroke-dashoffset: 0; }
  .acv2 .acv2-dot, .acv2 .acv2-lead, .acv2 .acv2-grid, .acv2 .acv2-label { opacity: 1; }
}
`
