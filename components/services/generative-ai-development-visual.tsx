// Signature visual for the Generative AI Development leaf hero. A prompt grounded
// by a retrieval chip feeds a model node that streams validated output, gated by
// an output-validation check — the "build the feature, not a demo" pipeline the
// copy describes. AI signature grammar: one-shot draw + fade, reduced-motion
// final-state fallback, var(--color-*) tokens (teal = --color-ai), mono labels,
// aria-hidden, 460x380 viewBox.

export function GenerativeAiDevelopmentVisual() {
  return (
    <figure className="gad relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="gad-ar" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* flow connectors */}
        <g className="gad-edge" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="gad-draw" pathLength={1} d="M44,128 V172 H72" markerEnd="url(#gad-ar)" />
          <path className="gad-draw" pathLength={1} d="M180,190 H214" markerEnd="url(#gad-ar)" />
          <path className="gad-draw" pathLength={1} d="M324,190 H360" markerEnd="url(#gad-ar)" />
        </g>

        {/* retrieval chip */}
        <g className="gad-node" style={{ ['--d' as string]: '0.2s' }}>
          <rect x="36" y="92" width="78" height="30" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="75" y="111" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-gray)">retrieval</text>
        </g>

        {/* prompt block */}
        <g className="gad-node" style={{ ['--d' as string]: '0.35s' }}>
          <rect x="36" y="160" width="144" height="60" rx="6" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <text x="50" y="184" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-ai)">prompt</text>
          <line x1="50" y1="198" x2="166" y2="198" stroke="var(--color-gray-light)" strokeWidth="1.25" />
          <line x1="50" y1="208" x2="140" y2="208" stroke="var(--color-gray-light)" strokeWidth="1.25" />
        </g>

        {/* model node */}
        <g className="gad-node" style={{ ['--d' as string]: '0.6s' }}>
          <rect x="214" y="160" width="110" height="60" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x="214" y="160" width="110" height="24" rx="6" fill="var(--color-ai)" opacity="0.9" />
          <text x="228" y="177" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-off-white)">model</text>
          <circle cx="269" cy="202" r="3" fill="var(--color-ai)" />
          <circle cx="283" cy="202" r="3" fill="var(--color-ai)" opacity="0.5" />
          <circle cx="297" cy="202" r="3" fill="var(--color-ai)" opacity="0.25" />
        </g>

        {/* streaming validated output */}
        <g className="gad-out" style={{ ['--d' as string]: '1.1s' }}>
          <line x1="364" y1="172" x2="424" y2="172" stroke="var(--color-ai)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="364" y1="186" x2="414" y2="186" stroke="var(--color-ai)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="364" y1="200" x2="424" y2="200" stroke="var(--color-ai)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="364" y1="214" x2="402" y2="214" stroke="var(--color-gray-light)" strokeWidth="2.5" strokeLinecap="round" />
          {/* validation check */}
          <circle cx="396" cy="132" r="11" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <path d="M390,132 l4,4 l8,-9" fill="none" stroke="var(--color-ai)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* labels */}
        <g className="gad-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="36" y="64">{'// generate · validate · stream'}</text>
          <text x="364" y="246">on-spec output</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.gad .gad-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.gad .gad-node, .gad .gad-out, .gad .gad-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .gad .gad-node { animation: gadFade 0.5s ease-out var(--d) forwards; }
  .gad .gad-out { animation: gadFade 0.5s ease-out var(--d) forwards; }
  .gad .gad-draw { animation: gadDraw 0.5s cubic-bezier(0.65,0,0.35,1) forwards; }
  .gad .gad-draw:nth-of-type(1) { animation-delay: 0.5s; }
  .gad .gad-draw:nth-of-type(2) { animation-delay: 0.75s; }
  .gad .gad-draw:nth-of-type(3) { animation-delay: 1.0s; }
  .gad .gad-label { animation: gadFade 0.6s ease-out 1.3s forwards; }
  @keyframes gadDraw { to { stroke-dashoffset: 0; } }
  @keyframes gadFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .gad .gad-draw { stroke-dashoffset: 0; }
  .gad .gad-node, .gad .gad-out, .gad .gad-label { opacity: 1; }
}
`
