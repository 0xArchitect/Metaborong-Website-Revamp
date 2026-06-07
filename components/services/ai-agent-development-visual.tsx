// Signature visual for the AI Agent Development leaf hero. A plan → act →
// observe control loop with a human-in-the-loop checkpoint on the act→observe
// edge and a deterministic tool layer under the act node — the explicit
// checkpoints + tool layer + HITL the copy promises (distinct from the hub's
// agent-graph). AI signature grammar: one-shot stroke-draw + fade, reduced-motion
// final-state fallback, var(--color-*) tokens (teal = --color-ai), mono labels,
// aria-hidden, 460x380 viewBox.

export function AiAgentDevelopmentVisual() {
  const stages = [
    { id: 'plan', x: 56, y: 78, label: 'plan', d: '0.2s' },
    { id: 'act', x: 296, y: 78, label: 'act', d: '0.35s' },
    { id: 'observe', x: 176, y: 252, label: 'observe', d: '0.5s' },
  ]
  const tools = ['fetch', 'write', 'exec']
  return (
    <figure className="aad relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="aad-arrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* loop edges (clockwise) */}
        <g className="aad-edge" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="aad-draw" pathLength={1} d="M164,101 H290" markerEnd="url(#aad-arrow)" />
          <path className="aad-draw" pathLength={1} d="M350,124 Q344,212 290,250" markerEnd="url(#aad-arrow)" />
          <path className="aad-draw" pathLength={1} d="M176,266 Q72,238 104,124" markerEnd="url(#aad-arrow)" />
        </g>

        {/* human-in-the-loop checkpoint diamond on act→observe */}
        <g className="aad-hitl" style={{ ['--d' as string]: '1.25s' }}>
          <rect x="318" y="176" width="26" height="26" rx="3" transform="rotate(45 331 189)" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.75" />
          <text x="331" y="222" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">human?</text>
        </g>

        {/* stage nodes */}
        {stages.map((s) => (
          <g key={s.id} className="aad-node" style={{ ['--d' as string]: s.d }}>
            <rect x={s.x} y={s.y} width="108" height="46" rx="6" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
            <text x={s.x + 54} y={s.y + 28} textAnchor="middle" fontSize="13" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-ai)">{s.label}</text>
          </g>
        ))}

        {/* deterministic tool layer inside the loop */}
        <g className="aad-tools" style={{ ['--d' as string]: '0.9s' }}>
          <line x1="300" y1="124" x2="262" y2="162" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 3" />
          {tools.map((t, i) => (
            <rect key={t} x={176 + i * 38} y="162" width="32" height="22" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          ))}
          <text x="230" y="200" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray-light)">tool layer</text>
        </g>

        {/* labels */}
        <g className="aad-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="56" y="60" fill="var(--color-gray-light)">{'// plan · act · observe'}</text>
          <text x="56" y="346" fill="var(--color-gray-light)">{'checkpoints · retries · idempotent'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.aad .aad-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.aad .aad-node, .aad .aad-tools, .aad .aad-hitl, .aad .aad-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .aad .aad-node { animation: aadFade 0.5s ease-out var(--d) forwards; }
  .aad .aad-tools { animation: aadFade 0.5s ease-out var(--d) forwards; }
  .aad .aad-hitl { animation: aadFade 0.5s ease-out var(--d) forwards; }
  .aad .aad-draw { animation: aadDraw 0.55s cubic-bezier(0.65,0,0.35,1) forwards; }
  .aad .aad-draw:nth-of-type(1) { animation-delay: 0.65s; }
  .aad .aad-draw:nth-of-type(2) { animation-delay: 1.0s; }
  .aad .aad-draw:nth-of-type(3) { animation-delay: 1.4s; }
  .aad .aad-label { animation: aadFade 0.6s ease-out 1.55s forwards; }
  @keyframes aadDraw { to { stroke-dashoffset: 0; } }
  @keyframes aadFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .aad .aad-draw { stroke-dashoffset: 0; }
  .aad .aad-node, .aad .aad-tools, .aad .aad-hitl, .aad .aad-label { opacity: 1; }
}
`
