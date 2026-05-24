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
// Per-cube vertical offset. The centre (AI) cube hops up exactly one grid cell
// (-74 == one lattice step diagonally, since 65*74 = STEP) so it seats in the
// polygon above with clean spacing while staying grounded on the grid. Labels
// stay on the shared baseline below.
const CUBE_DY = [0, -74, 0]
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
            <stop offset="1" stopColor="#e7ecf6" stopOpacity="0.6" />
          </linearGradient>
          {/* Feathered rectangle: the grid reads as a soft-edged plane that
              dissolves into the section grey (no hard white panel/border) while
              keeping defined, horizontal top and bottom edges. */}
          <filter id="svc-feather" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
          {/* Lower edge ends just below the cube labels (the feather makes it
              dissolve there) rather than running to the section bottom. */}
          <mask id="svc-grid-mask">
            <rect x="6" y="14" width={VB_W - 12} height={422} rx="24" fill="#fff" filter="url(#svc-feather)" />
          </mask>
        </defs>

        {/* Atmospheric grid — masked to fade into the grey; cubes stay crisp. */}
        <g mask="url(#svc-grid-mask)">
          <rect x="-200" y={VB_H * 0.42} width={VB_W + 400} height={VB_H * 0.7} fill="url(#svc-floor)" />
          <g className="iso-grid-line">
            {GRID.a.map((d, i) => <path key={`ga${i}`} d={d} />)}
            {GRID.b.map((d, i) => <path key={`gb${i}`} d={d} />)}
          </g>
          {PILLAR_ORDER.map((id, i) => (
            <g key={`base-${id}`} transform={`translate(${CUBE_X[i]}, ${CUBE_Y + CUBE_DY[i]})`}>
              <polygon className="cube-floor" points={FLOOR_DIAMOND} />
            </g>
          ))}
        </g>

        {PILLAR_ORDER.map((id, i) => (
          <Cube key={id} id={id} index={i} rise={rises[i]} active={i === activeIndex} />
        ))}

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
  const y = CUBE_Y + CUBE_DY[index]

  return (
    <>
      <ellipse ref={shadowRef} className="cube-shadow" cx={x + 65} cy={y + 43} rx="64" ry="13" />
      <g transform={`translate(${x}, ${y})`}>
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

// Glyph diamond keeps the cube's top-plate proportions (half-w / half-h = 65/37).
const GLYPH_WH = 65 / 37
const join = (pts: number[][]) => pts.map((q) => q.join(',')).join(' ')

// An extruded iso slab: top diamond at (cx,cy) with half-width W, dropped by
// thickness t. Three visible faces, shaded like the parent cube.
function isoSlab(cx: number, cy: number, W: number, t: number, key: string) {
  const H = W / GLYPH_WH
  const Lx = cx - W, Rx = cx + W, Fy = cy + H
  return [
    <polygon key={`${key}l`} className="gf-left" points={`${Lx},${cy} ${cx},${Fy} ${cx},${Fy + t} ${Lx},${cy + t}`} />,
    <polygon key={`${key}r`} className="gf-right" points={`${cx},${Fy} ${Rx},${cy} ${Rx},${cy + t} ${cx},${Fy + t}`} />,
    <polygon key={`${key}t`} className="gf-top" points={`${Lx},${cy} ${cx},${Fy} ${Rx},${cy} ${cx},${cy - H}`} />,
  ]
}

function CubeGlyph({ cat }: { cat: 'web3' | 'ai' | 'studio' }) {
  // W1 — flat faceted Ethereum mark (facet shading only, no extruded depth).
  if (cat === 'web3') {
    const T = [0, -30], L = [-18, -3], R = [18, -3], C = [0, 4], B = [0, 30]
    return (
      <>
        <polygon className="gf-lite" points={join([T, L, C])} />
        <polygon className="gf-top" points={join([T, C, R])} />
        <polygon className="gf-left" points={join([C, L, B])} />
        <polygon className="gf-right" points={join([C, R, B])} />
        <polyline className="gf-seam" points={`${L[0]},${L[1]} ${R[0]},${R[1]}`} />
        <polyline className="gf-seam" points={`${T[0]},${T[1]} ${C[0]},${C[1]} ${B[0]},${B[1]}`} />
      </>
    )
  }
  // A1 — node-graph with extruded cube nodes.
  if (cat === 'ai') {
    const nodes = [[0, -24], [-24, -6], [24, -6], [0, 16]]
    const edges = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]
    return (
      <>
        {edges.map(([i, j], k) => (
          <line key={`e${k}`} className="gf-wire" x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} />
        ))}
        {nodes.map((n, k) => isoSlab(n[0], n[1], 8, 6, `n${k}`))}
      </>
    )
  }
  // S2 — framed product block with an inset top recess.
  const iW = 18, iH = iW / GLYPH_WH, iy = -2
  return (
    <>
      {isoSlab(0, 0, 32, 18, 'o')}
      <polygon className="gf-dark" points={`${-iW},${iy} 0,${iy + iH} ${iW},${iy} 0,${iy - iH}`} />
    </>
  )
}

function ScopedStyle() {
  return (
    <style precedence="default">{`
      .iso-stage-wrap { position: absolute; inset: 0; }
      .iso-stage-svg { width: 100%; height: 100%; display: block; }
      .iso-grid-line { stroke: #d7ddea; stroke-width: 1; fill: none; }
      .cube-floor { fill: #eef2fa; stroke: #cfd5e4; stroke-width: 1; }

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
      /* White solid; greys give it iso form against the coloured cube top. */
      .cube-glyph {
        transition: opacity var(--duration-base, 400ms);
        --gtop:#ffffff; --glite:#eef1f6; --gleft:#d7dce6; --gright:#b8bfcc; --gdark:#9aa2b2;
      }
      .cube-glyph polygon { stroke: var(--gdark); stroke-width: 0.5; stroke-linejoin: round; }
      .cube-glyph .gf-top   { fill: var(--gtop); }
      .cube-glyph .gf-lite  { fill: var(--glite); }
      .cube-glyph .gf-left  { fill: var(--gleft); }
      .cube-glyph .gf-right { fill: var(--gright); }
      .cube-glyph .gf-dark  { fill: var(--gdark); }
      .cube-glyph .gf-wire  { stroke: #ffffff; stroke-width: 1.6; fill: none; }
      .cube-glyph .gf-seam  { stroke: var(--gdark); stroke-width: 0.7; fill: none; }

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
