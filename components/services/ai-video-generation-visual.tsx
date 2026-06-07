// Signature visual for the AI Video Generation leaf hero. A prompt/asset input
// drives a generation model that emits a filmstrip of frames through a brand /
// policy check — the "pipeline, not one-off clips" the copy describes. AI
// signature grammar: one-shot draw + fade, reduced-motion final-state fallback,
// var(--color-*) tokens (teal = --color-ai), mono labels, aria-hidden, 460x380.

export function AiVideoGenerationVisual() {
  const frames = [266, 308, 350, 392]
  return (
    <figure className="avg relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="avg-ar" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* flow connectors */}
        <g className="avg-edge" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="avg-draw" pathLength={1} d="M122,190 H150" markerEnd="url(#avg-ar)" />
          <path className="avg-draw" pathLength={1} d="M250,190 H262" markerEnd="url(#avg-ar)" />
        </g>

        {/* prompt / asset input */}
        <g className="avg-node" style={{ ['--d' as string]: '0.2s' }}>
          <rect x="36" y="160" width="86" height="60" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="79" y="186" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-gray)">prompt</text>
          <text x="79" y="202" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-gray)">+ assets</text>
        </g>

        {/* generation model */}
        <g className="avg-node" style={{ ['--d' as string]: '0.45s' }}>
          <rect x="150" y="160" width="100" height="60" rx="6" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <rect x="150" y="160" width="100" height="24" rx="6" fill="var(--color-ai)" opacity="0.9" />
          <text x="164" y="177" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-off-white)">render</text>
          <text x="200" y="206" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--color-gray)">queue</text>
        </g>

        {/* filmstrip frames */}
        {frames.map((x, i) => (
          <g key={x} className="avg-frame" style={{ ['--d' as string]: `${0.85 + i * 0.12}s` }}>
            <rect x={x} y="158" width="36" height="64" rx="2" fill="var(--color-bg)"
              stroke={i === frames.length - 1 ? 'var(--color-ai)' : 'var(--color-border)'} strokeWidth={i === frames.length - 1 ? 1.5 : 1} />
            {/* sprocket holes */}
            <rect x={x + 4} y="162" width="6" height="5" rx="1" fill="var(--color-border)" />
            <rect x={x + 26} y="162" width="6" height="5" rx="1" fill="var(--color-border)" />
            <rect x={x + 4} y="213" width="6" height="5" rx="1" fill="var(--color-border)" />
            <rect x={x + 26} y="213" width="6" height="5" rx="1" fill="var(--color-border)" />
            <circle cx={x + 18} cy="190" r="7" fill="none" stroke="var(--color-ai)" strokeWidth="1.5" opacity={0.3 + i * 0.22} />
          </g>
        ))}

        {/* brand / policy check */}
        <g className="avg-check" style={{ ['--d' as string]: '1.4s' }}>
          <circle cx="410" cy="120" r="11" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <path d="M404,120 l4,4 l8,-9" fill="none" stroke="var(--color-ai)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="410" y1="131" x2="410" y2="156" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 3" />
        </g>

        {/* labels */}
        <g className="avg-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="36" y="132">{'// scripted · rendered · checked'}</text>
          <text x="262" y="252">brand · policy checks</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.avg .avg-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.avg .avg-node, .avg .avg-frame, .avg .avg-check, .avg .avg-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .avg .avg-node { animation: avgFade 0.5s ease-out var(--d) forwards; }
  .avg .avg-frame { animation: avgFade 0.45s ease-out var(--d) forwards; }
  .avg .avg-check { animation: avgFade 0.5s ease-out var(--d) forwards; }
  .avg .avg-draw { animation: avgDraw 0.5s cubic-bezier(0.65,0,0.35,1) forwards; }
  .avg .avg-draw:nth-of-type(1) { animation-delay: 0.4s; }
  .avg .avg-draw:nth-of-type(2) { animation-delay: 0.7s; }
  .avg .avg-label { animation: avgFade 0.6s ease-out 1.5s forwards; }
  @keyframes avgDraw { to { stroke-dashoffset: 0; } }
  @keyframes avgFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .avg .avg-draw { stroke-dashoffset: 0; }
  .avg .avg-node, .avg .avg-frame, .avg .avg-check, .avg .avg-label { opacity: 1; }
}
`
