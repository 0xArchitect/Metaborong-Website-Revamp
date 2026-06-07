// Signature visual for the AI Knowledge Base leaf hero (flagship = the LLM-Wiki
// / compounding-memory pattern). Scattered source documents on the left are
// compiled into a maintained, interlinked library of notes on the right — the
// graph the copy contrasts against chunk-only vector RAG. One teal note lights
// as the cited answer source. Mirrors the AI signature grammar: one-shot
// stroke-draw + fade on mount, final-state fallback under prefers-reduced-motion,
// var(--color-*) tokens only (teal = --color-ai), JetBrains Mono labels,
// aria-hidden, 460x380 viewBox.

export function AiKnowledgeBaseVisual() {
  // scattered raw sources (left)
  const sources = [
    { x: 30, y: 96, w: 66, h: 40, r: -6 },
    { x: 44, y: 168, w: 66, h: 40, r: 4 },
    { x: 30, y: 244, w: 66, h: 40, r: -3 },
  ]
  // interlinked library notes (right cluster)
  const notes = [
    { id: 'n1', cx: 300, cy: 108, active: false },
    { id: 'n2', cx: 388, cy: 152, active: false },
    { id: 'n3', cx: 268, cy: 196, active: true },
    { id: 'n4', cx: 372, cy: 238, active: false },
    { id: 'n5', cx: 304, cy: 296, active: false },
  ]
  // cross-links between notes (the interlinking)
  const edges = [
    'M300,108 L388,152', 'M300,108 L268,196', 'M268,196 L372,238',
    'M388,152 L372,238', 'M268,196 L304,296', 'M372,238 L304,296',
  ]
  // compile connectors: each source → library
  const feeds = ['M96,116 H236', 'M110,188 H236', 'M96,264 Q180,250 236,210']
  return (
    <figure className="akb relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        {/* compile feed: sources → library */}
        <g className="akb-feed" stroke="var(--color-gray-light)" strokeWidth="1.5" fill="none" strokeLinecap="round">
          {feeds.map((d, i) => <path key={i} className="akb-draw" pathLength={1} d={d} />)}
        </g>

        {/* scattered raw sources */}
        {sources.map((s, i) => (
          <g key={i} className="akb-src" style={{ ['--d' as string]: `${0.1 + i * 0.12}s` }} transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="3" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
            <line x1={s.x + 10} y1={s.y + 14} x2={s.x + s.w - 12} y2={s.y + 14} stroke="var(--color-gray-light)" strokeWidth="1.5" />
            <line x1={s.x + 10} y1={s.y + 24} x2={s.x + s.w - 20} y2={s.y + 24} stroke="var(--color-gray-light)" strokeWidth="1.5" />
          </g>
        ))}

        {/* interlinking edges */}
        <g className="akb-edge" stroke="var(--color-ai)" strokeWidth="1.5" fill="none" opacity="0.7">
          {edges.map((d, i) => <path key={i} className="akb-draw2" pathLength={1} d={d} />)}
        </g>

        {/* library notes */}
        {notes.map((n, i) => (
          <g key={n.id} className="akb-note" style={{ ['--d' as string]: `${0.9 + i * 0.1}s` }}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r="11"
              fill={n.active ? 'var(--color-ai)' : 'var(--color-bg)'}
              stroke="var(--color-ai)"
              strokeWidth={n.active ? 0 : 1.75}
            />
          </g>
        ))}

        {/* labels */}
        <g className="akb-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="30" y="78" fill="var(--color-gray-light)">{'// sources'}</text>
          <text x="236" y="78" fill="var(--color-ai)">{'maintained library'}</text>
          <text x="30" y="346" fill="var(--color-gray-light)">{'// compiled · interlinked · cited'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.akb .akb-draw, .akb .akb-draw2 { stroke-dasharray: 1; stroke-dashoffset: 1; }
.akb .akb-src, .akb .akb-note, .akb .akb-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .akb .akb-src { animation: akbFade 0.5s ease-out var(--d) forwards; }
  .akb .akb-draw { animation: akbDraw 0.5s cubic-bezier(0.65,0,0.35,1) 0.45s forwards; }
  .akb .akb-draw2 { animation: akbDraw 0.5s cubic-bezier(0.65,0,0.35,1) forwards; }
  .akb .akb-draw2:nth-of-type(1) { animation-delay: 1.15s; }
  .akb .akb-draw2:nth-of-type(2) { animation-delay: 1.25s; }
  .akb .akb-draw2:nth-of-type(3) { animation-delay: 1.35s; }
  .akb .akb-draw2:nth-of-type(4) { animation-delay: 1.45s; }
  .akb .akb-draw2:nth-of-type(5) { animation-delay: 1.55s; }
  .akb .akb-draw2:nth-of-type(6) { animation-delay: 1.65s; }
  .akb .akb-note { animation: akbFade 0.4s ease-out var(--d) forwards; }
  .akb .akb-label { animation: akbFade 0.6s ease-out 1.7s forwards; }
  @keyframes akbDraw { to { stroke-dashoffset: 0; } }
  @keyframes akbFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .akb .akb-draw, .akb .akb-draw2 { stroke-dashoffset: 0; }
  .akb .akb-src, .akb .akb-note, .akb .akb-label { opacity: 1; }
}
`
