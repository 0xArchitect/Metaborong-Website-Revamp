// Signature visual for the /services/ai HUB hero (pillar-level, NOT a single
// leaf). An agent graph: a central model node calling out to three tools, with a
// dashed observe→plan feedback loop — the agentic pattern the AI pillar leads on.
// Mirrors the web3 hub visual's grammar: one-shot stroke-draw + fade on mount
// (hero is above the fold), final-state fallback under prefers-reduced-motion,
// var(--color-*) tokens only (AI teal = --color-ai), JetBrains Mono labels,
// aria-hidden, ~460x380 viewBox.

export function AiHubVisualAgents() {
  const tools = [
    { y: 86, label: 'retrieve', active: false },
    { y: 174, label: 'tools', active: true },
    { y: 262, label: 'write', active: false },
  ]
  // connector start (agent right edge) → each tool chip left edge (x=318)
  const links = [
    'M176,184 Q250,150 318,109',
    'M176,198 H318',
    'M176,212 Q250,250 318,285',
  ]
  return (
    <figure className="aihub-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{agentCss}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        {/* connectors: agent → tools */}
        <g className="aihub-link" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          {links.map((d, i) => (
            <path key={i} className="aihub-draw" pathLength={1} d={d} />
          ))}
        </g>
        <g className="aihub-node" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5">
          <circle cx="318" cy="109" r="5" />
          <circle cx="318" cy="197" r="5" />
          <circle cx="318" cy="285" r="5" />
        </g>

        {/* dashed observe → plan feedback loop */}
        <path
          className="aihub-feedback"
          d="M374,308 Q120,360 70,246"
          fill="none"
          stroke="var(--color-gray-light)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />

        {/* central agent block */}
        <g className="aihub-block" style={{ ['--d' as string]: '0.2s' }}>
          <rect x="36" y="150" width="140" height="96" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x="36" y="150" width="140" height="26" rx="6" fill="var(--color-ai)" opacity="0.9" />
          <text x="48" y="167" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em" fill="var(--color-off-white)">
            agent
          </text>
          <g stroke="var(--color-gray-light)" strokeWidth="1">
            <line x1="48" y1="196" x2="164" y2="196" />
            <line x1="48" y1="212" x2="140" y2="212" />
            <line x1="48" y1="228" x2="156" y2="228" />
          </g>
        </g>

        {/* tool chips */}
        {tools.map((t, i) => (
          <g key={t.label} className="aihub-chip" style={{ ['--d' as string]: `${0.55 + i * 0.18}s` }}>
            <rect
              x="318"
              y={t.y}
              width="112"
              height="46"
              rx="6"
              fill="var(--color-bg)"
              stroke={t.active ? 'var(--color-ai)' : 'var(--color-border)'}
              strokeWidth={t.active ? 1.5 : 1}
            />
            <text
              x="374"
              y={t.y + 28}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
              fill={t.active ? 'var(--color-ai)' : 'var(--color-gray)'}
            >
              {t.label}
            </text>
          </g>
        ))}

        {/* labels */}
        <g className="aihub-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="36" y="128" fill="var(--color-gray-light)">{'// plan · act · observe'}</text>
          <text x="248" y="352" textAnchor="middle" fill="var(--color-gray-light)">{'observe → plan'}</text>
        </g>
      </svg>
    </figure>
  )
}

const agentCss = `
.aihub-viz .aihub-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.aihub-viz .aihub-feedback { stroke-dasharray: 4 5; stroke-dashoffset: 220; }
.aihub-viz .aihub-block,
.aihub-viz .aihub-chip,
.aihub-viz .aihub-node,
.aihub-viz .aihub-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .aihub-viz .aihub-block { animation: aihubFade 0.5s ease-out var(--d) forwards; }
  .aihub-viz .aihub-chip { animation: aihubFade 0.5s ease-out var(--d) forwards; }
  .aihub-viz .aihub-draw { animation: aihubDraw 0.55s cubic-bezier(0.65,0,0.35,1) forwards; }
  .aihub-viz .aihub-draw:nth-of-type(1) { animation-delay: 0.45s; }
  .aihub-viz .aihub-draw:nth-of-type(2) { animation-delay: 0.6s; }
  .aihub-viz .aihub-draw:nth-of-type(3) { animation-delay: 0.75s; }
  .aihub-viz .aihub-node { animation: aihubFade 0.4s ease-out 0.95s forwards; }
  .aihub-viz .aihub-feedback { animation: aihubDrawDash 0.8s ease-out 1.1s forwards; }
  .aihub-viz .aihub-label { animation: aihubFade 0.6s ease-out 1.2s forwards; }
  @keyframes aihubDraw { to { stroke-dashoffset: 0; } }
  @keyframes aihubDrawDash { from { opacity: 0; } to { opacity: 1; stroke-dashoffset: 0; } }
  @keyframes aihubFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .aihub-viz .aihub-draw { stroke-dashoffset: 0; }
  .aihub-viz .aihub-feedback { stroke-dashoffset: 0; }
  .aihub-viz .aihub-block,
  .aihub-viz .aihub-chip,
  .aihub-viz .aihub-node,
  .aihub-viz .aihub-label { opacity: 1; }
}
`
