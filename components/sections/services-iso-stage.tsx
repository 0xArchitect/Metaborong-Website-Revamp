'use client'

import { useEffect, useRef } from 'react'
import { type MotionValue } from 'motion/react'
import { type PillarId } from '@/components/sections/services-data'
import { cubeFaces, topPlateCenterY, glyphOpacity, shadowOpacity, FLOOR_DIAMOND } from './services-iso-geometry'

// Pillars left->right on the iso floor, one diamond-step apart.
const PILLAR_ORDER: PillarId[] = ['web3', 'ai', 'product-studio']
const CAT: Record<PillarId, 'web3' | 'ai' | 'studio'> = {
  'web3': 'web3', 'ai': 'ai', 'product-studio': 'studio',
}
const LABEL: Record<PillarId, string> = { 'web3': 'WEB3', 'ai': 'AI', 'product-studio': 'STUDIO' }
// X translate per cube within the 680-wide viewBox (floor left vertex).
const CUBE_X = [120, 310, 500]
const CUBE_Y = 412

export function ServicesIsoStage({
  rises,
  activeIndex,
}: {
  rises: MotionValue<number>[]
  activeIndex: number
}) {
  return (
    <div className="iso-stage-wrap">
      <ScopedStyle />
      <svg viewBox="0 0 680 612" aria-hidden="true" className="iso-stage-svg">
        <defs>
          <linearGradient id="svc-floor" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#fafbff" stopOpacity="0" />
            <stop offset="1" stopColor="#eef1f8" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svc-fade" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="svc-grid-mask">
            <rect x="-100" y="-100" width="900" height="900" fill="url(#svc-fade)" />
          </mask>
        </defs>

        <rect x="-100" y="100" width="900" height="500" fill="url(#svc-floor)" />

        <g mask="url(#svc-grid-mask)" strokeLinecap="square">
          <g className="iso-grid-line">
            <path d="M -120 580 L 800  76" /><path d="M -120 640 L 800 136" />
            <path d="M -120 520 L 800  16" /><path d="M -120 460 L 800 -44" />
            <path d="M -120 400 L 800 -104" /><path d="M -120 700 L 800 196" />
            <path d="M -120 760 L 800 256" /><path d="M -120 820 L 800 316" />
            <path d="M -120 880 L 800 376" />
          </g>
          <g className="iso-grid-line">
            <path d="M -120  76 L 800 580" /><path d="M -120 136 L 800 640" />
            <path d="M -120  16 L 800 520" /><path d="M -120 -44 L 800 460" />
            <path d="M -120 -104 L 800 400" /><path d="M -120 196 L 800 700" />
            <path d="M -120 256 L 800 760" /><path d="M -120 316 L 800 820" />
            <path d="M -120 376 L 800 880" />
          </g>
        </g>

        {PILLAR_ORDER.map((id, i) => (
          <g key={`base-${id}`} transform={`translate(${CUBE_X[i]}, ${CUBE_Y})`}>
            <polygon className="cube-floor" points={FLOOR_DIAMOND} />
          </g>
        ))}

        {PILLAR_ORDER.map((id, i) => (
          <Cube key={id} id={id} index={i} rise={rises[i]} active={i === activeIndex} />
        ))}

        <g>
          {PILLAR_ORDER.map((id, i) => (
            <text
              key={`lbl-${id}`}
              x={CUBE_X[i] + 65}
              y={498}
              className="cube-label"
              data-active={i === activeIndex}
              data-cat={CAT[id]}
            >
              {LABEL[id]}
            </text>
          ))}
        </g>
        <g>
          {PILLAR_ORDER.map((id, i) => (
            <text key={`idx-${id}`} x={CUBE_X[i] + 65} y={514} className="cube-index">
              {String(i + 1).padStart(2, '0')}
            </text>
          ))}
        </g>
      </svg>
    </div>
  )
}

function Cube({
  id, index, rise, active,
}: {
  id: PillarId
  index: number
  rise: MotionValue<number>
  active: boolean
}) {
  const leftRef = useRef<SVGPolygonElement>(null)
  const rightRef = useRef<SVGPolygonElement>(null)
  const topRef = useRef<SVGPolygonElement>(null)
  const edgeRef = useRef<SVGPathElement>(null)
  const glyphRef = useRef<SVGGElement>(null)
  const shadowRef = useRef<SVGEllipseElement>(null)

  useEffect(() => {
    const apply = (r: number) => {
      const f = cubeFaces(r)
      leftRef.current?.setAttribute('points', f.left)
      rightRef.current?.setAttribute('points', f.right)
      topRef.current?.setAttribute('points', f.top)
      edgeRef.current?.setAttribute('d', f.edge)
      glyphRef.current?.setAttribute('transform', `translate(65, ${topPlateCenterY(r)})`)
      glyphRef.current?.style.setProperty('opacity', String(glyphOpacity(r)))
      shadowRef.current?.style.setProperty('opacity', String(shadowOpacity(r)))
    }
    apply(rise.get())
    const unsub = rise.on('change', apply)
    return () => unsub()
  }, [rise])

  const cat = CAT[id]
  const x = CUBE_X[index]

  return (
    <>
      <ellipse ref={shadowRef} className="cube-shadow" cx={x + 65} cy={CUBE_Y + 43} rx="66" ry="14" />
      <g transform={`translate(${x}, ${CUBE_Y})`}>
        <g className="cube" data-cat={cat} data-active={active}>
          <polygon ref={leftRef} className="face left" points={cubeFaces(0).left} />
          <polygon ref={rightRef} className="face right" points={cubeFaces(0).right} />
          <polygon ref={topRef} className="face top" points={cubeFaces(0).top} />
          <path ref={edgeRef} className="edge" d={cubeFaces(0).edge} />
          <g ref={glyphRef} className="cube-glyph" data-cat={cat} transform="translate(65, 0)" style={{ opacity: 0 }}>
            <CubeGlyph cat={cat} />
          </g>
        </g>
      </g>
    </>
  )
}

function CubeGlyph({ cat }: { cat: 'web3' | 'ai' | 'studio' }) {
  if (cat === 'web3') {
    const unit = (
      <>
        <polygon className="gleft" points="-11,0 -11,-18 0,-24 0,-6" />
        <polygon className="gright" points="11,0 11,-18 0,-24 0,-6" />
        <polygon className="gtop" points="-11,-18 0,-12 11,-18 0,-24" />
        <path className="gedge" d="M -11,0 L -11,-18 L 0,-24 L 11,-18 L 11,0 L 0,6 Z M -11,-18 L 0,-12 L 11,-18 M 0,-12 L 0,6" />
      </>
    )
    return (
      <>
        <g transform="translate(-22,-13)">{unit}</g>
        <g transform="translate(-22,13)">{unit}</g>
        <g transform="translate(22,-13)">{unit}</g>
        <g transform="translate(22,13)">{unit}</g>
      </>
    )
  }
  if (cat === 'ai') {
    return (
      <>
        <path className="gline" d="M -22,-12 L 0,6 M -22,-12 L 22,-12 M 0,6 L 22,-12 M -22,-12 L 0,-22 M 22,-12 L 0,-22 M 0,-22 L 0,6" />
        <circle className="gnode" cx="0" cy="-22" r="4.5" />
        <circle className="gnode" cx="-22" cy="-12" r="4.5" />
        <circle className="gnode" cx="22" cy="-12" r="4.5" />
        <circle className="gnode" cx="0" cy="6" r="4.5" />
      </>
    )
  }
  return (
    <>
      <polygon className="gtop" points="-32,-2 0,-20 32,-2 0,16" />
      <path className="gedge" d="M -32,-2 L 0,-20 L 32,-2 L 0,16 Z" />
      <polygon className="gmid" points="-20,-2 0,-13 20,-2 0,9" />
      <path className="gedge" d="M -20,-2 L 0,-13 L 20,-2 L 0,9 Z" />
      <polygon className="gcore" points="-6,-2 0,-5.5 6,-2 0,1.5" />
    </>
  )
}

function ScopedStyle() {
  return (
    <style precedence="default">{`
      .iso-stage-wrap { position: absolute; inset: 0; }
      .iso-stage-svg { width: 100%; height: 100%; overflow: visible; }
      .iso-grid-line { stroke: #d8dce4; stroke-width: 1; fill: none; }
      .cube-floor { fill: #f3f4f6; stroke: #c8ccd3; stroke-width: 1; }

      .cube .face { transition: fill var(--duration-base, 400ms) cubic-bezier(0.16,1,0.3,1); }
      .cube .top   { fill: #ECEEF2; }
      .cube .left  { fill: #C8CCD3; }
      .cube .right { fill: #A8ADB6; }
      .cube .edge  { stroke: #98a0ac; stroke-width: 1; fill: none;
                     transition: stroke var(--duration-base, 400ms); }

      .cube[data-active="true"][data-cat="web3"]   .top  { fill: #6FA3FF; }
      .cube[data-active="true"][data-cat="web3"]   .left { fill: #296ff0; }
      .cube[data-active="true"][data-cat="web3"]   .right{ fill: #1A3FDB; }
      .cube[data-active="true"][data-cat="web3"]   .edge { stroke: #0F2EB8; }
      .cube[data-active="true"][data-cat="ai"]     .top  { fill: #4FB3A8; }
      .cube[data-active="true"][data-cat="ai"]     .left { fill: #0F766E; }
      .cube[data-active="true"][data-cat="ai"]     .right{ fill: #0B5953; }
      .cube[data-active="true"][data-cat="ai"]     .edge { stroke: #074039; }
      .cube[data-active="true"][data-cat="studio"] .top  { fill: #F08A4F; }
      .cube[data-active="true"][data-cat="studio"] .left { fill: #C2410C; }
      .cube[data-active="true"][data-cat="studio"] .right{ fill: #9A340A; }
      .cube[data-active="true"][data-cat="studio"] .edge { stroke: #6E2607; }

      .cube-shadow { fill: #000; opacity: 0; }
      .cube-glyph { transition: opacity var(--duration-base, 400ms); }
      .cube-glyph .gtop { fill: #fff; }
      .cube-glyph[data-cat="web3"]   .gleft { fill: #B7CEFF; }
      .cube-glyph[data-cat="web3"]   .gright{ fill: #6FA3FF; }
      .cube-glyph[data-cat="web3"]   .gedge { stroke: #1A3FDB; stroke-width: 0.6; fill: none; }
      .cube-glyph[data-cat="ai"]     .gline { stroke: #fff; stroke-width: 1.2; fill: none; }
      .cube-glyph[data-cat="ai"]     .gnode { fill: #fff; stroke: #074039; stroke-width: 0.5; }
      .cube-glyph[data-cat="studio"] .gmid  { fill: #F08A4F; }
      .cube-glyph[data-cat="studio"] .gcore { fill: #fff; }
      .cube-glyph[data-cat="studio"] .gedge { stroke: #6E2607; stroke-width: 0.6; fill: none; }

      .cube-label {
        font-family: var(--font-mono); font-size: 11px; font-weight: 700;
        letter-spacing: 0.14em; text-anchor: middle; fill: #9ca3af;
        text-transform: uppercase; transition: fill var(--duration-base, 400ms);
      }
      .cube-label[data-active="true"][data-cat="web3"]   { fill: #296ff0; }
      .cube-label[data-active="true"][data-cat="ai"]     { fill: #0F766E; }
      .cube-label[data-active="true"][data-cat="studio"] { fill: #C2410C; }
      .cube-index {
        font-family: var(--font-mono); font-size: 9px; font-weight: 700;
        letter-spacing: 0.08em; text-anchor: middle; fill: #c4c8d0;
      }

      @media (prefers-reduced-motion: reduce) {
        .cube .face, .cube .edge, .cube-glyph, .cube-label { transition: none; }
      }
    `}</style>
  )
}
