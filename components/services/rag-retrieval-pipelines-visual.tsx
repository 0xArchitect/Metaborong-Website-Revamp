// Signature visual for the RAG & Retrieval Pipelines leaf hero. A document is
// chunked, embedded into vectors, indexed, then retrieved + reranked to ground a
// cited answer — the ingestion→retrieval pipeline the copy engineers. AI
// signature grammar: one-shot draw + fade, reduced-motion final-state fallback,
// var(--color-*) tokens (teal = --color-ai), mono labels, aria-hidden, 460x380.

export function RagRetrievalPipelinesVisual() {
  const stageY = 150
  return (
    <figure className="rag relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="rag-ar" markerWidth="8" markerHeight="8" refX="5.5" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* connectors */}
        <g className="rag-edge" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="rag-draw" pathLength={1} d="M84,150 H104" markerEnd="url(#rag-ar)" />
          <path className="rag-draw" pathLength={1} d="M168,150 H188" markerEnd="url(#rag-ar)" />
          <path className="rag-draw" pathLength={1} d="M248,150 H268" markerEnd="url(#rag-ar)" />
          <path className="rag-draw" pathLength={1} d="M322,150 H342" markerEnd="url(#rag-ar)" />
        </g>

        {/* doc */}
        <g className="rag-node" style={{ ['--d' as string]: '0.2s' }}>
          <rect x="32" y={stageY - 28} width="52" height="56" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <line x1="42" y1={stageY - 14} x2="74" y2={stageY - 14} stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="42" y1={stageY - 4} x2="74" y2={stageY - 4} stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="42" y1={stageY + 6} x2="66" y2={stageY + 6} stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <text x="58" y={stageY + 44} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">docs</text>
        </g>

        {/* chunks grid */}
        <g className="rag-node" style={{ ['--d' as string]: '0.4s' }}>
          {[0, 1].map((r) => [0, 1].map((c) => (
            <rect key={`${r}${c}`} x={108 + c * 30} y={stageY - 26 + r * 30} width="24" height="24" rx="2" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.25" opacity="0.85" />
          )))}
          <text x="138" y={stageY + 44} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">chunk</text>
        </g>

        {/* embed (vector dots) */}
        <g className="rag-node" style={{ ['--d' as string]: '0.6s' }}>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="208" cy={stageY - 20 + i * 20} r="5" fill="var(--color-ai)" opacity={0.9 - i * 0.22} />
          ))}
          <text x="208" y={stageY + 44} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">embed</text>
        </g>

        {/* vector store */}
        <g className="rag-node" style={{ ['--d' as string]: '0.8s' }}>
          <ellipse cx="295" cy={stageY - 24} rx="27" ry="7" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <path d={`M268,${stageY - 24} v40 a27,7 0 0 0 54,0 v-40`} fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <text x="295" y={stageY + 44} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">index</text>
        </g>

        {/* rerank + answer */}
        <g className="rag-node" style={{ ['--d' as string]: '1.0s' }}>
          <rect x="342" y={stageY - 26} width="86" height="52" rx="6" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <text x="385" y={stageY - 6} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-ai)">rerank</text>
          <path d="M356,158 l5,5 l10,-11" fill="none" stroke="var(--color-ai)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="385" y={stageY + 44} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">answer</text>
        </g>

        {/* labels */}
        <g className="rag-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="32" y="92">{'// chunk · embed · retrieve · rerank'}</text>
          <text x="32" y="246">grounded · evaluated for recall</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.rag .rag-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.rag .rag-node, .rag .rag-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .rag .rag-node { animation: ragFade 0.45s ease-out var(--d) forwards; }
  .rag .rag-draw { animation: ragDraw 0.4s cubic-bezier(0.65,0,0.35,1) forwards; }
  .rag .rag-draw:nth-of-type(1) { animation-delay: 0.35s; }
  .rag .rag-draw:nth-of-type(2) { animation-delay: 0.55s; }
  .rag .rag-draw:nth-of-type(3) { animation-delay: 0.75s; }
  .rag .rag-draw:nth-of-type(4) { animation-delay: 0.95s; }
  .rag .rag-label { animation: ragFade 0.6s ease-out 1.25s forwards; }
  @keyframes ragDraw { to { stroke-dashoffset: 0; } }
  @keyframes ragFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .rag .rag-draw { stroke-dashoffset: 0; }
  .rag .rag-node, .rag .rag-label { opacity: 1; }
}
`
