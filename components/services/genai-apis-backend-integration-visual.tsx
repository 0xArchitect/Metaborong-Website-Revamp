// Signature visual for the GenAI APIs & Backend Integration leaf hero. A product
// calls through rate-limit / cost guards into a router that fans out to multiple
// providers — one primary path solid, fallbacks dashed — with an observability
// tap. The "hardened LLM layer routing across providers" the copy describes. AI
// signature grammar: one-shot draw + fade, reduced-motion final-state fallback,
// var(--color-*) tokens (teal = --color-ai), mono labels, aria-hidden, 460x380.

export function GenaiApisBackendIntegrationVisual() {
  const providers = [
    { y: 92, label: 'A', primary: true },
    { y: 166, label: 'B', primary: false },
    { y: 240, label: 'C', primary: false },
  ]
  return (
    <figure className="gab relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="gab-ar" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* product → router */}
        <path className="gab-draw gab-edge" pathLength={1} d="M132,180 H168" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round" markerEnd="url(#gab-ar)" />

        {/* router → providers (primary solid, fallback dashed) */}
        {providers.map((p, i) => (
          <path key={p.label} className={p.primary ? 'gab-draw gab-edge' : 'gab-fallback'} pathLength={1}
            d={`M278,${p.primary ? 165 : 180} Q320,${p.primary ? 140 : 180} 350,${p.y + 21}`}
            stroke={p.primary ? 'var(--color-ai)' : 'var(--color-gray-light)'} strokeWidth={p.primary ? 2 : 1.5}
            fill="none" strokeLinecap="round" strokeDasharray={p.primary ? undefined : '4 4'} style={{ ['--d' as string]: `${1.0 + i * 0.12}s` }} />
        ))}

        {/* product */}
        <g className="gab-node" style={{ ['--d' as string]: '0.2s' }}>
          <rect x="36" y="150" width="96" height="60" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="84" y="185" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">product</text>
        </g>

        {/* guard chips on the input edge */}
        <g className="gab-guard" style={{ ['--d' as string]: '0.45s' }}>
          <rect x="138" y="120" width="48" height="22" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="162" y="135" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">rate</text>
          <rect x="138" y="218" width="48" height="22" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="162" y="233" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">cost</text>
        </g>

        {/* router */}
        <g className="gab-node" style={{ ['--d' as string]: '0.65s' }}>
          <rect x="168" y="146" width="110" height="68" rx="6" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <rect x="168" y="146" width="110" height="24" rx="6" fill="var(--color-ai)" opacity="0.9" />
          <text x="182" y="163" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-off-white)">router</text>
          <text x="223" y="196" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-gray)">fallback</text>
        </g>

        {/* providers */}
        {providers.map((p, i) => (
          <g key={p.label} className="gab-prov" style={{ ['--d' as string]: `${0.85 + i * 0.1}s` }}>
            <rect x="350" y={p.y} width="74" height="42" rx="6" fill="var(--color-bg)"
              stroke={p.primary ? 'var(--color-ai)' : 'var(--color-border)'} strokeWidth={p.primary ? 1.5 : 1} />
            <text x="387" y={p.y + 26} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={p.primary ? 'var(--color-ai)' : 'var(--color-gray)'}>{`model ${p.label}`}</text>
          </g>
        ))}

        {/* observability tap */}
        <g className="gab-obs" style={{ ['--d' as string]: '1.4s' }}>
          <line x1="223" y1="214" x2="223" y2="300" stroke="var(--color-gray-light)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="223" cy="306" r="5" fill="var(--color-bg)" stroke="var(--color-gray-light)" strokeWidth="1.25" />
          <text x="223" y="332" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray-light)">observe</text>
        </g>

        {/* labels */}
        <g className="gab-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="36" y="96">{'// route · fallback · observe'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.gab .gab-draw, .gab .gab-fallback { stroke-dasharray: 1; stroke-dashoffset: 1; }
.gab .gab-fallback { stroke-dasharray: 4 4; }
.gab .gab-node, .gab .gab-guard, .gab .gab-prov, .gab .gab-obs, .gab .gab-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .gab .gab-node { animation: gabFade 0.5s ease-out var(--d) forwards; }
  .gab .gab-guard { animation: gabFade 0.5s ease-out var(--d) forwards; }
  .gab .gab-prov { animation: gabFade 0.45s ease-out var(--d) forwards; }
  .gab .gab-obs { animation: gabFade 0.5s ease-out var(--d) forwards; }
  .gab .gab-edge.gab-draw { animation: gabDraw 0.5s cubic-bezier(0.65,0,0.35,1) forwards; }
  .gab .gab-edge.gab-draw:nth-of-type(1) { animation-delay: 0.4s; }
  .gab .gab-fallback { animation: gabDrawDash 0.6s ease-out var(--d) forwards; }
  .gab .gab-label { animation: gabFade 0.6s ease-out 1.55s forwards; }
  @keyframes gabDraw { to { stroke-dashoffset: 0; } }
  @keyframes gabDrawDash { from { opacity: 0; stroke-dashoffset: 60; } to { opacity: 1; stroke-dashoffset: 0; } }
  @keyframes gabFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .gab .gab-draw, .gab .gab-fallback { stroke-dashoffset: 0; opacity: 1; }
  .gab .gab-node, .gab .gab-guard, .gab .gab-prov, .gab .gab-obs, .gab .gab-label { opacity: 1; }
}
`
