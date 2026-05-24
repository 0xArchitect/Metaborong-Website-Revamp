'use client'

import { useEffect, useRef } from 'react'
import { type MotionValue } from 'motion/react'
import { type PillarId } from '@/components/sections/services-data'
import { cubeFaces, topPlateCenterY, glyphOpacity, shadowOpacity, FLOOR_DIAMOND } from './services-iso-geometry'

const PILLAR_ORDER: PillarId[] = ['web3', 'ai', 'product-studio']
const CAT: Record<PillarId, 'web3' | 'ai' | 'studio'> = {
  'web3': 'web3', 'ai': 'ai', 'product-studio': 'studio',
}
const LABEL: Record<PillarId, string> = { 'web3': 'WEB3', 'ai': 'AI', 'product-studio': 'STUDIO' }

// Portrait viewBox ~matching the tall right column so the grid (drawn with
// `slice`) covers it edge-to-edge. Cube base diamonds are 130x74.
const VB_W = 480
const VB_H = 600
// Cube base-left vertices, 130 apart so the three bases are three ADJACENT
// cells of the grid (centre cube centred at VB_W/2 = 240).
const CUBE_X = [45, 175, 305]
const CUBE_Y = 300
const LABEL_Y = CUBE_Y + 104
const INDEX_Y = CUBE_Y + 120

// The grid is two families of parallel lines along the cube-base edges
// (slopes -+37/65). A line of family A satisfies 37x+65y=c; family B 37x-65y=d.
// One cell step = 37*130 = 4810. Anchoring c0/d0 on the centre cube's left
// vertex (175,300) guarantees every cube base diamond coincides with one cell.
const STEP = 37 * 130
const C0 = 37 * 175 + 65 * CUBE_Y
const D0 = 37 * 175 - 65 * CUBE_Y

function isoGrid() {
  const X1 = -160
  const X2 = VB_W + 160
  const a: string[] = []
  const b: string[] = []
  for (let k = -9; k <= 9; k++) {
    const c = C0 + k * STEP
    a.push(`M ${X1} ${(c - 37 * X1) / 65} L ${X2} ${(c - 37 * X2) / 65}`)
  }
  for (let j = -9; j <= 9; j++) {
    const d = D0 + j * STEP
    b.push(`M ${X1} ${(37 * X1 - d) / 65} L ${X2} ${(37 * X2 - d) / 65}`)
  }
  return { a, b }
}
const GRID = isoGrid()

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
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="iso-stage-svg">
        <defs>
          <linearGradient id="svc-floor" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#eaeef7" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <g>
          <rect x="-200" y={VB_H * 0.42} width={VB_W + 400} height={VB_H * 0.7} fill="url(#svc-floor)" />

          {/* Iso diamond grid — cells coincide with the cube bases. */}
          <g className="iso-grid-line">
            {GRID.a.map((d, i) => <path key={`ga${i}`} d={d} />)}
            {GRID.b.map((d, i) => <path key={`gb${i}`} d={d} />)}
          </g>

          {/* The three pillar cells, filled so they read as occupied cells. */}
          {PILLAR_ORDER.map((id, i) => (
            <g key={`base-${id}`} transform={`translate(${CUBE_X[i]}, ${CUBE_Y})`}>
              <polygon className="cube-floor" points={FLOOR_DIAMOND} />
            </g>
          ))}

          {PILLAR_ORDER.map((id, i) => (
            <Cube key={id} id={id} index={i} rise={rises[i]} active={i === activeIndex} />
          ))}
        </g>

        <g>
          {PILLAR_ORDER.map((id, i) => (
            <text
              key={`lbl-${id}`}
              x={CUBE_X[i] + 65}
              y={LABEL_Y}
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
            <text key={`idx-${id}`} x={CUBE_X[i] + 65} y={INDEX_Y} className="cube-index">
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
      <ellipse ref={shadowRef} className="cube-shadow" cx={x + 65} cy={CUBE_Y + 43} rx="64" ry="13" />
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
      .iso-stage-svg { width: 100%; height: 100%; display: block; }
      .iso-grid-line { stroke: #e1e5f0; stroke-width: 1; fill: none; }
      .cube-floor { fill: #edf0f6; stroke: #d4d9e6; stroke-width: 1; }

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

      .cube-shadow { fill: #1a2540; opacity: 0; }
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
