// Signature visual for the /services/product-studio HUB hero (pillar-level, NOT
// a single leaf). A layered product stack — infra → services → app → product —
// assembling in depth, then a one-shot ship arrow to a live node: the full-stack,
// one-senior-team, architecture-to-deployment story the pillar leads on.
// Mirrors the ai/web3 hub grammar: one-shot stroke-draw + fade on mount, final-
// state fallback under prefers-reduced-motion, var(--color-*) tokens only
// (product-studio orange = --color-accent), JetBrains Mono labels, aria-hidden,
// ~460x380 viewBox.

export function ProductStudioHubVisualStack() {
  // Bottom → top; each plate offset to fake isometric depth. The top plate is
  // the shipped product surface (accent header).
  const plates = [
    { label: 'infra', x: 40, y: 250 },
    { label: 'services', x: 68, y: 208 },
    { label: 'app', x: 96, y: 166 },
  ]
  const plateW = 180
  const plateH = 42
  // Seams linking each plate's top-left to the next plate's bottom-left.
  const seams = [
    'M40,250 L68,250',
    'M68,208 L96,208',
    'M96,166 L124,166',
  ]
  return (
    <figure className="pshub-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{stackCss}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        {/* depth seams: each plate rests on the one below */}
        <g className="pshub-seam" stroke="var(--color-gray-light)" strokeWidth="1.5" fill="none">
          {seams.map((d, i) => (
            <path key={i} className="pshub-draw" pathLength={1} d={d} />
          ))}
        </g>

        {/* base plates */}
        {plates.map((p, i) => (
          <g key={p.label} className="pshub-plate" style={{ ['--d' as string]: `${0.2 + i * 0.16}s` }}>
            <rect
              x={p.x}
              y={p.y}
              width={plateW}
              height={plateH}
              rx="6"
              fill="var(--color-bg)"
              stroke="var(--color-border)"
              strokeWidth="1"
            />
            <text
              x={p.x + 16}
              y={p.y + 26}
              fontSize="11"
              fontFamily="var(--font-mono)"
              letterSpacing="0.06em"
              fill="var(--color-gray)"
            >
              {p.label}
            </text>
          </g>
        ))}

        {/* product surface — the shipped top plate (accent) */}
        <g className="pshub-plate" style={{ ['--d' as string]: '0.68s' }}>
          <rect x="124" y="124" width={plateW} height={plateH} rx="6" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
          <rect x="124" y="124" width={plateW} height="22" rx="6" fill="var(--color-accent)" opacity="0.9" />
          <text x="140" y="139" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em" fill="var(--color-off-white)">
            product
          </text>
          <g stroke="var(--color-gray-light)" strokeWidth="1">
            <line x1="140" y1="158" x2="288" y2="158" />
            <line x1="140" y1="170" x2="252" y2="170" />
          </g>
        </g>

        {/* ship arrow: product → live */}
        <path
          className="pshub-ship pshub-draw"
          pathLength={1}
          d="M304,138 Q372,128 392,108"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g className="pshub-node">
          <circle cx="396" cy="104" r="6" fill="var(--color-accent)" />
          <text x="386" y="86" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray)">
            live
          </text>
        </g>

        {/* labels */}
        <g className="pshub-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="40" y="100" fill="var(--color-gray-light)">{'// discover · build · scale'}</text>
          <text x="40" y="328" fill="var(--color-gray-light)">{'architecture → deployment'}</text>
        </g>
      </svg>
    </figure>
  )
}

const stackCss = `
.pshub-viz .pshub-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.pshub-viz .pshub-plate,
.pshub-viz .pshub-node,
.pshub-viz .pshub-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .pshub-viz .pshub-plate { animation: pshubFade 0.5s ease-out var(--d) forwards; }
  .pshub-viz .pshub-seam .pshub-draw { animation: pshubDraw 0.4s cubic-bezier(0.65,0,0.35,1) forwards; }
  .pshub-viz .pshub-seam .pshub-draw:nth-of-type(1) { animation-delay: 0.36s; }
  .pshub-viz .pshub-seam .pshub-draw:nth-of-type(2) { animation-delay: 0.52s; }
  .pshub-viz .pshub-seam .pshub-draw:nth-of-type(3) { animation-delay: 0.68s; }
  .pshub-viz .pshub-ship { animation: pshubDraw 0.55s cubic-bezier(0.65,0,0.35,1) 0.9s forwards; }
  .pshub-viz .pshub-node { animation: pshubFade 0.4s ease-out 1.2s forwards; }
  .pshub-viz .pshub-label { animation: pshubFade 0.6s ease-out 1.3s forwards; }
  @keyframes pshubDraw { to { stroke-dashoffset: 0; } }
  @keyframes pshubFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .pshub-viz .pshub-draw { stroke-dashoffset: 0; }
  .pshub-viz .pshub-plate,
  .pshub-viz .pshub-node,
  .pshub-viz .pshub-label { opacity: 1; }
}
`
