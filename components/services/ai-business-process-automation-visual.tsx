// Signature visual for the AI Business Process Automation leaf hero. A workflow
// runs left-to-right through automated steps, pauses at a human checkpoint, then
// hands off into the systems of record (CRM / ERP) — with an audit trail beneath.
// The "automate end to end, with human checkpoints where judgment matters" the
// copy promises. AI signature grammar: one-shot draw + fade, reduced-motion
// final-state fallback, var(--color-*) tokens (teal = --color-ai), mono labels,
// aria-hidden, 460x380 viewBox.

export function AiBusinessProcessAutomationVisual() {
  const steps = [
    { x: 96, label: 'intake' },
    { x: 196, label: 'process' },
  ]
  return (
    <figure className="bpa relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="bpa-ar" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* flow */}
        <g className="bpa-edge" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="bpa-draw" pathLength={1} d="M64,150 H92" markerEnd="url(#bpa-ar)" />
          <path className="bpa-draw" pathLength={1} d="M168,150 H196" markerEnd="url(#bpa-ar)" />
          <path className="bpa-draw" pathLength={1} d="M272,150 H300" markerEnd="url(#bpa-ar)" />
          <path className="bpa-draw" pathLength={1} d="M350,150 H392 V196" markerEnd="url(#bpa-ar)" />
        </g>

        {/* trigger */}
        <g className="bpa-node" style={{ ['--d' as string]: '0.2s' }}>
          <circle cx="44" cy="150" r="14" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <path d="M40,142 v16 l12,-8 z" fill="var(--color-ai)" />
          <text x="44" y="186" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--color-gray)">trigger</text>
        </g>

        {/* automated steps */}
        {steps.map((s) => (
          <g key={s.label} className="bpa-node" style={{ ['--d' as string]: s.label === 'intake' ? '0.4s' : '0.6s' }}>
            <rect x={s.x} y="128" width="72" height="44" rx="6" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
            <text x={s.x + 36} y="154" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-ai)">{s.label}</text>
          </g>
        ))}

        {/* human checkpoint */}
        <g className="bpa-hitl" style={{ ['--d' as string]: '0.85s' }}>
          <rect x="312" y="132" width="36" height="36" rx="4" transform="rotate(45 330 150)" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.75" />
          <text x="330" y="120" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.03em" fill="var(--color-gray)">review</text>
        </g>

        {/* systems of record */}
        <g className="bpa-sys" style={{ ['--d' as string]: '1.15s' }}>
          <rect x="356" y="196" width="72" height="34" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="392" y="217" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">CRM</text>
          <rect x="356" y="238" width="72" height="34" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="392" y="259" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">ERP</text>
        </g>

        {/* audit trail */}
        <g className="bpa-audit" style={{ ['--d' as string]: '1.35s' }}>
          <line x1="44" y1="308" x2="320" y2="308" stroke="var(--color-gray-light)" strokeWidth="1.25" strokeDasharray="2 5" />
          {[44, 130, 216, 302].map((x) => <circle key={x} cx={x} cy="308" r="2.5" fill="var(--color-gray-light)" />)}
          <text x="44" y="332" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray-light)">audit trail</text>
        </g>

        {/* labels */}
        <g className="bpa-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="44" y="100">{'// automate · checkpoint · hand-off'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.bpa .bpa-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.bpa .bpa-node, .bpa .bpa-hitl, .bpa .bpa-sys, .bpa .bpa-audit, .bpa .bpa-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .bpa .bpa-node { animation: bpaFade 0.5s ease-out var(--d) forwards; }
  .bpa .bpa-hitl { animation: bpaFade 0.5s ease-out var(--d) forwards; }
  .bpa .bpa-sys { animation: bpaFade 0.5s ease-out var(--d) forwards; }
  .bpa .bpa-audit { animation: bpaFade 0.6s ease-out var(--d) forwards; }
  .bpa .bpa-draw { animation: bpaDraw 0.45s cubic-bezier(0.65,0,0.35,1) forwards; }
  .bpa .bpa-draw:nth-of-type(1) { animation-delay: 0.35s; }
  .bpa .bpa-draw:nth-of-type(2) { animation-delay: 0.55s; }
  .bpa .bpa-draw:nth-of-type(3) { animation-delay: 0.75s; }
  .bpa .bpa-draw:nth-of-type(4) { animation-delay: 1.0s; }
  .bpa .bpa-label { animation: bpaFade 0.6s ease-out 1.5s forwards; }
  @keyframes bpaDraw { to { stroke-dashoffset: 0; } }
  @keyframes bpaFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .bpa .bpa-draw { stroke-dashoffset: 0; }
  .bpa .bpa-node, .bpa .bpa-hitl, .bpa .bpa-sys, .bpa .bpa-audit, .bpa .bpa-label { opacity: 1; }
}
`
