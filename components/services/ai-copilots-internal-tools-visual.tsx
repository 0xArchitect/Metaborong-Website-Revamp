// Signature visual for the AI Copilots & Internal Tools leaf hero. A copilot
// panel grounded in a data store, wired into the team's tools (one active) — the
// "deployed copilot wired into Slack, your CRM, or a custom interface" the copy
// promises. AI signature grammar: one-shot draw + fade, reduced-motion
// final-state fallback, var(--color-*) tokens (teal = --color-ai), mono labels,
// aria-hidden, 460x380 viewBox.

export function AiCopilotsInternalToolsVisual() {
  const tools = [
    { y: 104, label: 'slack', active: false },
    { y: 166, label: 'crm', active: true },
    { y: 228, label: 'custom', active: false },
  ]
  return (
    <figure className="cop relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        {/* wires: panel → tools */}
        <g className="cop-wire" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="cop-draw" pathLength={1} d="M196,150 Q280,118 330,119" />
          <path className="cop-draw" pathLength={1} d="M196,168 H330" />
          <path className="cop-draw" pathLength={1} d="M196,186 Q280,243 330,243" />
        </g>

        {/* copilot panel */}
        <g className="cop-panel" style={{ ['--d' as string]: '0.2s' }}>
          <rect x="44" y="96" width="152" height="150" rx="8" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <rect x="44" y="96" width="152" height="26" rx="8" fill="var(--color-ai)" opacity="0.9" />
          <text x="58" y="113" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-off-white)">copilot</text>
          {/* message bubbles */}
          <rect x="58" y="138" width="92" height="20" rx="5" fill="var(--color-bg-subtle)" />
          <rect x="90" y="166" width="92" height="20" rx="5" fill="var(--color-ai)" opacity="0.14" />
          <rect x="58" y="194" width="74" height="20" rx="5" fill="var(--color-bg-subtle)" />
          {/* input row */}
          <rect x="58" y="222" width="124" height="14" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
        </g>

        {/* grounding data store */}
        <g className="cop-data" style={{ ['--d' as string]: '0.5s' }}>
          <line x1="120" y1="246" x2="120" y2="278" stroke="var(--color-gray-light)" strokeWidth="1.25" strokeDasharray="3 3" />
          <ellipse cx="120" cy="284" rx="38" ry="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <path d="M82,284 v18 a38,8 0 0 0 76,0 v-18" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="120" y="322" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray-light)">your data</text>
        </g>

        {/* tool chips */}
        {tools.map((t, i) => (
          <g key={t.label} className="cop-chip" style={{ ['--d' as string]: `${1.0 + i * 0.14}s` }}>
            <rect x="330" y={t.y} width="96" height="38" rx="6" fill="var(--color-bg)"
              stroke={t.active ? 'var(--color-ai)' : 'var(--color-border)'} strokeWidth={t.active ? 1.5 : 1} />
            <text x="378" y={t.y + 23} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={t.active ? 'var(--color-ai)' : 'var(--color-gray)'}>{t.label}</text>
          </g>
        ))}

        {/* labels */}
        <g className="cop-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="44" y="76">{'// grounded copilot'}</text>
          <text x="330" y="92">wired into tools</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.cop .cop-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.cop .cop-panel, .cop .cop-data, .cop .cop-chip, .cop .cop-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .cop .cop-panel { animation: copFade 0.5s ease-out var(--d) forwards; }
  .cop .cop-data { animation: copFade 0.5s ease-out var(--d) forwards; }
  .cop .cop-chip { animation: copFade 0.45s ease-out var(--d) forwards; }
  .cop .cop-draw { animation: copDraw 0.5s cubic-bezier(0.65,0,0.35,1) forwards; }
  .cop .cop-draw:nth-of-type(1) { animation-delay: 0.8s; }
  .cop .cop-draw:nth-of-type(2) { animation-delay: 0.9s; }
  .cop .cop-draw:nth-of-type(3) { animation-delay: 1.0s; }
  .cop .cop-label { animation: copFade 0.6s ease-out 1.5s forwards; }
  @keyframes copDraw { to { stroke-dashoffset: 0; } }
  @keyframes copFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .cop .cop-draw { stroke-dashoffset: 0; }
  .cop .cop-panel, .cop .cop-data, .cop .cop-chip, .cop .cop-label { opacity: 1; }
}
`
