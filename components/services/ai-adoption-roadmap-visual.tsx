// Signature visual for the AI Adoption Roadmap leaf hero. A sequenced track of
// four numbered phase milestones with effort bars above and a governance gate at
// the end — the phased, ordered plan the copy delivers. AI signature grammar:
// one-shot draw + fade, reduced-motion final-state fallback, var(--color-*)
// tokens (teal = --color-ai), mono labels, aria-hidden, 460x380 viewBox.

export function AiAdoptionRoadmapVisual() {
  const phases = [
    { cx: 84, h: 40, label: 'P1' },
    { cx: 188, h: 64, label: 'P2' },
    { cx: 292, h: 52, label: 'P3' },
    { cx: 396, h: 32, label: 'P4' },
  ]
  const trackY = 224
  return (
    <figure className="arm relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="arm-ar" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* effort bars (one per phase) */}
        {phases.map((p, i) => (
          <g key={p.label} className="arm-bar" style={{ ['--d' as string]: `${0.9 + i * 0.12}s` }}>
            <rect x={p.cx - 20} y={trackY - 26 - p.h} width="40" height={p.h} rx="2"
              fill={i === 1 ? 'var(--color-ai)' : 'var(--color-bg)'} stroke="var(--color-ai)" strokeWidth="1.5"
              opacity={i === 1 ? 0.9 : 1} />
          </g>
        ))}

        {/* track */}
        <path className="arm-track arm-draw" pathLength={1} d={`M48,${trackY} H378`}
          stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round" markerEnd="url(#arm-ar)" />

        {/* milestone nodes */}
        {phases.map((p, i) => (
          <g key={p.label} className="arm-node" style={{ ['--d' as string]: `${0.5 + i * 0.12}s` }}>
            <circle cx={p.cx} cy={trackY} r="13" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.75" />
            <text x={p.cx} y={trackY + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-ai)">{i + 1}</text>
            <text x={p.cx} y={trackY + 34} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">{p.label}</text>
          </g>
        ))}

        {/* governance finish gate after the final milestone */}
        <g className="arm-gate" style={{ ['--d' as string]: '1.5s' }}>
          <line x1="420" y1="210" x2="420" y2="240" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="429" y1="210" x2="429" y2="240" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <text x="424" y="202" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-gray-light)">govern</text>
        </g>

        {/* labels */}
        <g className="arm-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="48" y="56">{'// sequenced adoption'}</text>
          <text x="48" y="352">owners · budgets · governance</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.arm .arm-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.arm .arm-bar, .arm .arm-node, .arm .arm-gate, .arm .arm-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .arm .arm-draw { animation: armDraw 0.7s cubic-bezier(0.65,0,0.35,1) 0.2s forwards; }
  .arm .arm-node { animation: armFade 0.45s ease-out var(--d) forwards; }
  .arm .arm-bar { animation: armRise 0.5s ease-out var(--d) forwards; transform-origin: bottom; }
  .arm .arm-gate { animation: armFade 0.5s ease-out var(--d) forwards; }
  .arm .arm-label { animation: armFade 0.6s ease-out 1.6s forwards; }
  @keyframes armDraw { to { stroke-dashoffset: 0; } }
  @keyframes armFade { to { opacity: 1; } }
  @keyframes armRise { from { opacity: 0; transform: scaleY(0.6); } to { opacity: 1; transform: scaleY(1); } }
}
@media (prefers-reduced-motion: reduce) {
  .arm .arm-draw { stroke-dashoffset: 0; }
  .arm .arm-bar, .arm .arm-node, .arm .arm-gate, .arm .arm-label { opacity: 1; }
}
`
