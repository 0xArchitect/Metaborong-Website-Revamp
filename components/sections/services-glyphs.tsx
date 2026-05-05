type GlyphProps = {
  active: boolean
  primed?: boolean
  reducedMotion?: boolean
}

const baseClass = 'transition-[opacity,transform] duration-300 ease-out'

const stateClass = (primed: boolean, active: boolean) => {
  if (!primed) return 'opacity-0'
  return active ? 'opacity-100' : 'opacity-40'
}

const SOFT_SHADOW = (
  <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
    <feOffset dx="0" dy="2" result="off" />
    <feComponentTransfer><feFuncA type="linear" slope="0.18" /></feComponentTransfer>
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
)

export function Web3Glyph({ active, primed, reducedMotion }: GlyphProps) {
  return (
    <svg
      viewBox="-40 -40 80 80"
      width="80"
      height="80"
      className={`${baseClass} ${stateClass(primed ?? false, active)}`}
      data-active={active}
      data-primed={primed ?? false}
      data-reduced-motion={reducedMotion ?? false}
      aria-hidden="true"
    >
      <defs>{SOFT_SHADOW}</defs>
      <g filter="url(#soft-shadow)">
        <polygon points="12.12,-7 0,-14 -12.12,-7 -12.12,7 0,14 12.12,7" fill="#204AF8" fillOpacity="0.18" stroke="#204AF8" strokeWidth="1" />
        <g transform="translate(21.65, 12.5)"><polygon points="8.66,-5 0,-10 -8.66,-5 -8.66,5 0,10 8.66,5" fill="#204AF8" fillOpacity="0.10" stroke="#204AF8" strokeWidth="1" /></g>
        <g transform="translate(0, 25)"><polygon points="8.66,-5 0,-10 -8.66,-5 -8.66,5 0,10 8.66,5" fill="#204AF8" fillOpacity="0.10" stroke="#204AF8" strokeWidth="1" /></g>
        <g transform="translate(-21.65, 12.5)"><polygon points="8.66,-5 0,-10 -8.66,-5 -8.66,5 0,10 8.66,5" fill="#204AF8" fillOpacity="0.10" stroke="#204AF8" strokeWidth="1" /></g>
        <g transform="translate(-21.65, -12.5)"><polygon points="8.66,-5 0,-10 -8.66,-5 -8.66,5 0,10 8.66,5" fill="#204AF8" fillOpacity="0.10" stroke="#204AF8" strokeWidth="1" /></g>
        <g transform="translate(0, -25)"><polygon points="8.66,-5 0,-10 -8.66,-5 -8.66,5 0,10 8.66,5" fill="#204AF8" fillOpacity="0.10" stroke="#204AF8" strokeWidth="1" /></g>
        <g transform="translate(21.65, -12.5)"><polygon points="8.66,-5 0,-10 -8.66,-5 -8.66,5 0,10 8.66,5" fill="#204AF8" fillOpacity="0.10" stroke="#204AF8" strokeWidth="1" /></g>
        <g stroke="#204AF8" strokeWidth="0.5" opacity="0.6">
          <line x1="6.5" y1="3.75" x2="15.15" y2="8.75" />
          <line x1="0" y1="7" x2="0" y2="18" />
          <line x1="-6.5" y1="3.75" x2="-15.15" y2="8.75" />
          <line x1="-6.5" y1="-3.75" x2="-15.15" y2="-8.75" />
          <line x1="0" y1="-7" x2="0" y2="-18" />
          <line x1="6.5" y1="-3.75" x2="15.15" y2="-8.75" />
        </g>
      </g>
    </svg>
  )
}

export function AIAgentsGlyph({ active, primed, reducedMotion }: GlyphProps) {
  return (
    <svg
      viewBox="-40 -40 80 80"
      width="80"
      height="80"
      className={`${baseClass} ${stateClass(primed ?? false, active)}`}
      data-active={active}
      data-primed={primed ?? false}
      data-reduced-motion={reducedMotion ?? false}
      aria-hidden="true"
    >
      <defs>
        {SOFT_SHADOW}
        <radialGradient id="ai-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="14" fill="url(#ai-halo)" />
      <circle cx="0" cy="0" r="4" fill="#10b981" />
      <circle cx="0" cy="0" r="13" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.7" />
      <circle cx="0" cy="0" r="22" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
      <g filter="url(#soft-shadow)">
        <circle cx="0" cy="-28" r="2.8" fill="#10b981" />
        <circle cx="26.63" cy="-8.65" r="2.8" fill="#10b981" />
        <circle cx="16.46" cy="22.65" r="2.8" fill="#10b981" />
        <circle cx="-16.46" cy="22.65" r="2.8" fill="#10b981" />
        <circle cx="-26.63" cy="-8.65" r="2.8" fill="#10b981" />
      </g>
      <g stroke="#10b981" strokeWidth="0.5" fill="none" opacity="0.4">
        <path d="M 0 0 Q 4 -16 0 -28" />
        <path d="M 0 0 Q 16 -8 26.63 -8.65" />
        <path d="M 0 0 Q 12 14 16.46 22.65" />
        <path d="M 0 0 Q -12 14 -16.46 22.65" />
        <path d="M 0 0 Q -16 -8 -26.63 -8.65" />
      </g>
    </svg>
  )
}

export function ProductStudioGlyph({ active, primed, reducedMotion }: GlyphProps) {
  return (
    <svg
      viewBox="-40 -40 80 80"
      width="80"
      height="80"
      className={`${baseClass} ${stateClass(primed ?? false, active)}`}
      data-active={active}
      data-primed={primed ?? false}
      data-reduced-motion={reducedMotion ?? false}
      aria-hidden="true"
    >
      <defs>{SOFT_SHADOW}</defs>
      <g filter="url(#soft-shadow)">
        <polygon points="0,-22 22,-14 0,-6 -22,-14" fill="#F6851B" fillOpacity="0.28" stroke="#F6851B" strokeWidth="1" />
        <polygon points="0,-4 26,6 0,16 -26,6" fill="#F6851B" fillOpacity="0.18" stroke="#F6851B" strokeWidth="1" />
        <polygon points="0,14 30,26 0,38 -30,26" fill="#F6851B" fillOpacity="0.12" stroke="#F6851B" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function PillarGlyph({
  pillarId,
  active,
  primed,
  reducedMotion,
}: {
  pillarId: 'web3' | 'ai-agents' | 'product-studio'
  active: boolean
  primed?: boolean
  reducedMotion?: boolean
}) {
  if (pillarId === 'web3') return <Web3Glyph active={active} primed={primed} reducedMotion={reducedMotion} />
  if (pillarId === 'ai-agents') return <AIAgentsGlyph active={active} primed={primed} reducedMotion={reducedMotion} />
  return <ProductStudioGlyph active={active} primed={primed} reducedMotion={reducedMotion} />
}
