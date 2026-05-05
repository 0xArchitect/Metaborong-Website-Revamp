type GlyphProps = {
  active: boolean
  primed?: boolean
  reducedMotion?: boolean
}

const baseClass = 'transition-[opacity,transform] duration-300 ease-out'

const stateClass = (primed: boolean, active: boolean) => {
  if (!primed) return 'opacity-0'
  return active ? 'opacity-100' : 'opacity-45'
}

// Web3 — nested hex with diamond core. Block-chain reference without 7-hex CAD energy.
export function Web3Glyph({ active, primed, reducedMotion }: GlyphProps) {
  return (
    <svg
      viewBox="-40 -40 80 80"
      width="104"
      height="104"
      className={`${baseClass} ${stateClass(primed ?? false, active)}`}
      data-active={active}
      data-primed={primed ?? false}
      data-reduced-motion={reducedMotion ?? false}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="web3-fill" x1="0" y1="-30" x2="0" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#204AF8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#204AF8" stopOpacity="0.04" />
        </linearGradient>
        <filter id="web3-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="0" dy="2" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.22" /></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#web3-shadow)">
        {/* Outer hex — solid presence */}
        <polygon
          points="26,0 13,-22.5 -13,-22.5 -26,0 -13,22.5 13,22.5"
          fill="url(#web3-fill)"
          stroke="#204AF8"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        {/* Inner inset hex — geometric depth */}
        <polygon
          points="15,0 7.5,-13 -7.5,-13 -15,0 -7.5,13 7.5,13"
          fill="none"
          stroke="#204AF8"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinejoin="round"
        />
        {/* Diamond core — sharp accent */}
        <rect
          x="-3.5"
          y="-3.5"
          width="7"
          height="7"
          fill="#204AF8"
          transform="rotate(45)"
        />
      </g>
    </svg>
  )
}

// AI Agents — luminous core with asymmetric orbit. Aperture/lens, not radial diagram.
export function AIAgentsGlyph({ active, primed, reducedMotion }: GlyphProps) {
  return (
    <svg
      viewBox="-40 -40 80 80"
      width="104"
      height="104"
      className={`${baseClass} ${stateClass(primed ?? false, active)}`}
      data-active={active}
      data-primed={primed ?? false}
      data-reduced-motion={reducedMotion ?? false}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ai-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#10b981" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ai-dot" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5be3b3" stopOpacity="1" />
          <stop offset="60%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#0a8a62" stopOpacity="1" />
        </radialGradient>
        <filter id="ai-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
          <feOffset dx="0" dy="1.5" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.32" /></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Ambient halo — generous, brighter so it survives at small scale */}
      <circle cx="0" cy="0" r="34" fill="url(#ai-core)" />
      {/* Outer ring — full circle, hairline, low opacity for atmosphere */}
      <circle
        cx="0"
        cy="0"
        r="24"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Inner ring with intentional break — gives the mark dynamism */}
      <path
        d="M 16 0 A 16 16 0 1 1 -13.86 -8"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      {/* Asymmetric satellites — 2, intentional placement, with subtle glow */}
      <g filter="url(#ai-shadow)">
        <circle cx="24" cy="-13" r="3.2" fill="#10b981" />
        <circle cx="-20" cy="15" r="2" fill="#10b981" opacity="0.75" />
      </g>
      {/* Core — solid presence, gradient volume, white pinhole highlight */}
      <circle cx="0" cy="0" r="8" fill="url(#ai-dot)" filter="url(#ai-shadow)" />
      <circle cx="-2" cy="-3" r="1.8" fill="#FFFFFF" fillOpacity="0.65" />
    </svg>
  )
}

// Product Studio — real iso cube with three-face gradient shading. Volumetric, not flat.
export function ProductStudioGlyph({ active, primed, reducedMotion }: GlyphProps) {
  return (
    <svg
      viewBox="-40 -40 80 80"
      width="104"
      height="104"
      className={`${baseClass} ${stateClass(primed ?? false, active)}`}
      data-active={active}
      data-primed={primed ?? false}
      data-reduced-motion={reducedMotion ?? false}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ps-top" x1="0" y1="-22" x2="0" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB068" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F6851B" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="ps-right" x1="0" y1="-10" x2="0" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F6851B" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#C56612" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="ps-left" x1="0" y1="-10" x2="0" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C56612" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7E4309" stopOpacity="0.4" />
        </linearGradient>
        <filter id="ps-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.8" />
          <feOffset dx="0" dy="3" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.22" /></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#ps-shadow)">
        {/* Left face (deepest shadow) */}
        <polygon
          points="-22,-10 -22,14 0,26 0,2"
          fill="url(#ps-left)"
          stroke="#7E4309"
          strokeWidth="0.75"
          strokeOpacity="0.5"
          strokeLinejoin="round"
        />
        {/* Right face (mid-tone) */}
        <polygon
          points="22,-10 22,14 0,26 0,2"
          fill="url(#ps-right)"
          stroke="#C56612"
          strokeWidth="0.75"
          strokeOpacity="0.55"
          strokeLinejoin="round"
        />
        {/* Top face (lit) */}
        <polygon
          points="0,-22 22,-10 0,2 -22,-10"
          fill="url(#ps-top)"
          stroke="#F6851B"
          strokeWidth="0.75"
          strokeOpacity="0.7"
          strokeLinejoin="round"
        />
        {/* Highlight accent on top face — craft mark */}
        <line
          x1="-14"
          y1="-7"
          x2="-2"
          y2="-13"
          stroke="#FFFFFF"
          strokeWidth="0.6"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
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
