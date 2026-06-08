# Services Section (A1 rebuild) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage Services section as a single-viewport pinned scrolltelling — left accordion of three pillars + right SVG isometric stage whose grounded cubes extrude out of a shared grid as you scroll.

**Architecture:** One `260vh` scroll container drives a `sticky` `100svh` frame. `motion/react` `useScroll` gives scroll progress; pure helpers derive the active pillar index (discrete React state → H2 phrase/color + open accordion row + cube fill) and per-cube `rise` (continuous Motion values → imperative SVG geometry updates, no re-render). Cubes are authored as a pure function of `rise` so their bottom edge stays pinned to the grid (grounded, no floating baseplate). Replaces the CSS `services-iso-canvas.tsx`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, `motion` (new package name for framer-motion), Vitest (happy-dom for component tests).

---

## File Structure

- **Create** `components/sections/services-iso-geometry.ts` — pure cube/grid geometry as a function of `rise`. Unit-tested. No React.
- **Create** `components/sections/services-scroll.ts` — pure scroll math: `activeIndexFromProgress`, `riseForCube`. Unit-tested. No React.
- **Create** `components/sections/services-iso-stage.tsx` — the SVG stage. Renders grid + 3 grounded cubes + glyphs + labels; subscribes to per-cube `rise` Motion values and updates polygon `points`/transforms imperatively via refs; applies active fill via `data-active`/`data-cat` + CSS transitions.
- **Modify** `components/sections/services-pillars.tsx` — orchestrator: `useScroll`, derived active index, rise Motion values, header (eyebrow + per-pillar H2) **inside** the pin, accordion without tech pills, single-viewport layout, wires the new stage. Mobile `MobileStack` kept.
- **Delete** `components/sections/services-iso-canvas.tsx` — superseded by `services-iso-stage.tsx`.
- **Modify** `components/sections/services.tsx` — drop centered intro header + lede; keep `<Section>` + FAQ JSON-LD (ensure boutique/studio framing copy lives there).
- **Modify** `components/sections/services-data.ts:227` — Studio headline changed to `End-to-end product engineering`.
- **Unchanged:** `components/sections/services-pillars-lazy.tsx` (dynamic-import seam).

Geometry/scroll math is split from the React components so the risky math is testable in isolation; the SVG and orchestrator are verified live (agent-browser + Playwright) since their value is visual.

---

## Task 0: Install `motion`, baseline green

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Confirm package + install**

The legacy `framer-motion` is superseded by `motion` (imports from `motion/react`). Install the runtime dep:

Run: `npm install motion`
Expected: `motion` appears under `dependencies` in `package.json`; lockfile updated.

- [ ] **Step 2: Sanity-check the import resolves**

Run: `node -e "require.resolve('motion/react'); console.log('ok')"`
Expected: prints `ok`.

- [ ] **Step 3: Baseline typecheck**

Run: `npx tsc --noEmit`
Expected: clean (no errors). Do **not** run `npm run build` (rss.xml fails on the PR #26 env hold).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(services): add motion (framer-motion) for scroll-linked iso stage

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 1: Studio headline copy change

**Files:**
- Modify: `components/sections/services-data.ts:227`

- [ ] **Step 1: Change the headline**

In `components/sections/services-data.ts`, the `product-studio` pillar object, replace:

```ts
    headline: 'End-to-end product engineering',
```

with:

```ts
    headline: 'End-to-end product engineering',
```

- [ ] **Step 2: Verify no other references to the retired headline remain**

Run a case-insensitive search for the retired term across `components/ app/ lib/` (excluding `node_modules`).
Expected: no matches.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add components/sections/services-data.ts
git commit -m "copy(services): retire the old Product Studio headline

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Scroll math (pure, TDD)

**Files:**
- Create: `components/sections/services-scroll.ts`
- Test: `components/sections/services-scroll.test.ts`

- [ ] **Step 1: Write the failing test**

Create `components/sections/services-scroll.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { activeIndexFromProgress, riseForCube } from './services-scroll'

describe('activeIndexFromProgress', () => {
  it('maps the three thirds of progress to indices 0,1,2', () => {
    expect(activeIndexFromProgress(0.0, 3)).toBe(0)
    expect(activeIndexFromProgress(0.16, 3)).toBe(0)
    expect(activeIndexFromProgress(0.34, 3)).toBe(1)
    expect(activeIndexFromProgress(0.5, 3)).toBe(1)
    expect(activeIndexFromProgress(0.67, 3)).toBe(2)
    expect(activeIndexFromProgress(1.0, 3)).toBe(2)
  })
  it('clamps out-of-range progress', () => {
    expect(activeIndexFromProgress(-0.5, 3)).toBe(0)
    expect(activeIndexFromProgress(1.5, 3)).toBe(2)
  })
})

describe('riseForCube', () => {
  it('peaks at 1 when progress is centred on the cube segment', () => {
    expect(riseForCube(0, (0.5) / 3, 3)).toBeCloseTo(1, 5) // centre of seg 0
    expect(riseForCube(1, (1.5) / 3, 3)).toBeCloseTo(1, 5)
    expect(riseForCube(2, (2.5) / 3, 3)).toBeCloseTo(1, 5)
  })
  it('returns 0 far from the cube segment', () => {
    expect(riseForCube(2, 0.0, 3)).toBe(0)
    expect(riseForCube(0, 1.0, 3)).toBe(0)
  })
  it('stays within [0,1]', () => {
    for (let p = 0; p <= 1.0001; p += 0.05) {
      for (let i = 0; i < 3; i++) {
        const r = riseForCube(i, p, 3)
        expect(r).toBeGreaterThanOrEqual(0)
        expect(r).toBeLessThanOrEqual(1)
      }
    }
  })
  it('partially overlaps neighbours at a segment boundary (crossfade)', () => {
    const boundary = 1 / 3 // between seg 0 and seg 1
    expect(riseForCube(0, boundary, 3)).toBeGreaterThan(0)
    expect(riseForCube(1, boundary, 3)).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/sections/services-scroll.test.ts`
Expected: FAIL — cannot resolve `./services-scroll`.

- [ ] **Step 3: Implement the module**

Create `components/sections/services-scroll.ts`:

```ts
// Pure scroll math for the Services pinned scrolltelling. No React, no DOM —
// keeps the risky parts of the cube interaction unit-testable in isolation.

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

// Which pillar is "active" (drives H2 phrase/colour + open accordion row +
// cube fill) for a given scroll progress p in [0,1] across n pillars.
export function activeIndexFromProgress(p: number, n: number): number {
  return clamp(Math.floor(clamp(p, 0, 1) * n), 0, n - 1)
}

// Continuous rise (0->1) for cube `index`. A triangular bump centred on the
// cube's segment, slightly widened (divisor 0.42 > 1/(2n)=0.167) so adjacent
// cubes overlap at segment boundaries and crossfade rather than both dropping
// to zero. Tunable: widen the divisor for more overlap, narrow for crisper
// single-cube focus. Verify the feel live in agent-browser.
export function riseForCube(index: number, p: number, n: number): number {
  const center = (index + 0.5) / n
  const dist = Math.abs(clamp(p, 0, 1) - center)
  return clamp(1 - dist / 0.42, 0, 1)
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run components/sections/services-scroll.test.ts`
Expected: PASS (all cases).

- [ ] **Step 5: Commit**

```bash
git add components/sections/services-scroll.ts components/sections/services-scroll.test.ts
git commit -m "feat(services): pure scroll math for pillar active-index + cube rise

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Cube geometry (pure, TDD)

**Files:**
- Create: `components/sections/services-iso-geometry.ts`
- Test: `components/sections/services-iso-geometry.test.ts`

Coordinate system (cube-local, screen px, y-up-is-negative): origin at the floor
diamond's **left** vertex. Floor diamond vertices: left `(0,0)`, front `(65,37)`,
right `(130,0)`, back `(65,-37)` — a 130×74 iso rhombus (matches the handoff). The
cube extrudes **upward** by `h = rise * 100`; the floor diamond never moves, so the
base stays on the grid.

- [ ] **Step 1: Write the failing test**

Create `components/sections/services-iso-geometry.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { cubeFaces, topPlateCenterY, glyphOpacity, shadowOpacity, FLOOR_DIAMOND } from './services-iso-geometry'

describe('FLOOR_DIAMOND', () => {
  it('is the static 130x74 iso rhombus on the grid', () => {
    expect(FLOOR_DIAMOND).toBe('0,0 65,37 130,0 65,-37')
  })
})

describe('cubeFaces', () => {
  it('collapses to the floor diamond at rise 0 (grounded, no body)', () => {
    const f = cubeFaces(0)
    // top face coincides with the floor diamond
    expect(f.top).toBe('0,0 65,37 130,0 65,-37')
    // side faces have zero height (top edge == bottom edge)
    expect(f.left).toBe('0,0 65,37 65,37 0,0')
    expect(f.right).toBe('65,37 130,0 130,0 65,37')
  })
  it('is a full cube at rise 1 (bottom edge still on the grid)', () => {
    const f = cubeFaces(1)
    expect(f.left).toBe('0,0 65,37 65,-63 0,-100')
    expect(f.right).toBe('65,37 130,0 130,-100 65,-63')
    expect(f.top).toBe('0,-100 65,-63 130,-100 65,-137')
  })
  it('keeps the floor (bottom) vertices fixed for any rise', () => {
    for (const r of [0, 0.25, 0.5, 0.75, 1]) {
      const f = cubeFaces(r)
      // left face starts at the fixed left+front floor vertices
      expect(f.left.startsWith('0,0 65,37')).toBe(true)
      // right face starts at the fixed front+right floor vertices
      expect(f.right.startsWith('65,37 130,0')).toBe(true)
    }
  })
})

describe('top plate + glyph + shadow', () => {
  it('top plate centre Y rises linearly with rise', () => {
    expect(topPlateCenterY(0)).toBe(0)
    expect(topPlateCenterY(1)).toBe(-100)
    expect(topPlateCenterY(0.5)).toBe(-50)
  })
  it('glyph fades in only past ~35% rise', () => {
    expect(glyphOpacity(0)).toBe(0)
    expect(glyphOpacity(0.35)).toBe(0)
    expect(glyphOpacity(1)).toBeCloseTo(1, 5)
  })
  it('shadow opacity grows with rise', () => {
    expect(shadowOpacity(0)).toBe(0)
    expect(shadowOpacity(1)).toBeCloseTo(0.12, 5)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/sections/services-iso-geometry.test.ts`
Expected: FAIL — cannot resolve `./services-iso-geometry`.

- [ ] **Step 3: Implement the module**

Create `components/sections/services-iso-geometry.ts`:

```ts
// Pure isometric cube geometry as a function of `rise` (0..1). Origin is the
// floor diamond's LEFT vertex; the cube extrudes UP by h = rise*100 while the
// floor vertices stay fixed, so the base never leaves the grid (grounded —
// unlike the handoff which floats the body off a separate baseplate).

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const H_MAX = 100

// Static base rhombus, drawn once on the grid.
export const FLOOR_DIAMOND = '0,0 65,37 130,0 65,-37'

export type CubeFaces = { left: string; right: string; top: string; edge: string }

export function cubeFaces(rise: number): CubeFaces {
  const h = clamp(rise, 0, 1) * H_MAX
  // Bottom (floor) vertices: L(0,0) F(65,37) R(130,0) B(65,-37). Raised copies
  // sit h above each. Side faces span a floor edge up to its raised edge.
  const left = `0,0 65,37 65,${37 - h} 0,${-h}`
  const right = `65,37 130,0 130,${-h} 65,${37 - h}`
  const top = `0,${-h} 65,${37 - h} 130,${-h} 65,${-37 - h}`
  // Visible outline of the extruded cube.
  const edge =
    `M 0,${-h} L 0,0 L 65,37 L 130,0 L 130,${-h} L 65,${-37 - h} L 0,${-h} ` +
    `L 65,${37 - h} L 130,${-h} M 65,${37 - h} L 65,37`
  return { left, right, top, edge }
}

// Y of the raised top-plate centre — glyph group rides here.
export function topPlateCenterY(rise: number): number {
  return -clamp(rise, 0, 1) * H_MAX
}

// Glyph fades in only after the cube is ~35% risen (matches the handoff).
export function glyphOpacity(rise: number): number {
  return clamp((clamp(rise, 0, 1) - 0.35) * (1 / 0.65), 0, 1)
}

// Contact shadow darkens as the cube rises.
export function shadowOpacity(rise: number): number {
  return clamp(rise, 0, 1) * 0.12
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run components/sections/services-iso-geometry.test.ts`
Expected: PASS (all cases).

- [ ] **Step 5: Commit**

```bash
git add components/sections/services-iso-geometry.ts components/sections/services-iso-geometry.test.ts
git commit -m "feat(services): pure grounded iso-cube geometry (rise-driven)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: SVG iso stage component

**Files:**
- Create: `components/sections/services-iso-stage.tsx`

This renders one `<svg>` (grid + floor + 3 grounded cubes + glyphs + labels). It takes
per-cube `rise` Motion values and an `activeIndex`. Rise updates geometry **imperatively**
(ref + `motionValue.on('change')`) so there is no React re-render during scroll; active
fill is driven by `data-active`/`data-cat` + CSS transitions.

- [ ] **Step 1: Create the component**

Create `components/sections/services-iso-stage.tsx`:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { type MotionValue } from 'motion/react'
import { type PillarId } from '@/components/sections/services-data'
import { cubeFaces, topPlateCenterY, glyphOpacity, shadowOpacity, FLOOR_DIAMOND } from './services-iso-geometry'

// Pillars left->right on the iso floor, one diamond-step apart. Order matches
// the visual scene (AI, WEB3, STUDIO read left to right); active index from the
// orchestrator maps via PILLAR_ORDER.
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

        {/* Iso grid (from handoff); shares this SVG's coordinate space so cube
            floors land on grid lines structurally, not by eyeballing. */}
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

        {/* Static floor diamonds keep every cube visibly anchored to the grid. */}
        {PILLAR_ORDER.map((id, i) => (
          <g key={`base-${id}`} transform={`translate(${CUBE_X[i]}, ${CUBE_Y})`}>
            <polygon className="cube-floor" points={FLOOR_DIAMOND} />
          </g>
        ))}

        {/* Shadows + cubes. */}
        {PILLAR_ORDER.map((id, i) => (
          <Cube
            key={id}
            id={id}
            index={i}
            rise={rises[i]}
            active={i === activeIndex}
          />
        ))}

        {/* Labels + indices under each cube. */}
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

  // Imperative geometry update from the rise Motion value — no React re-render
  // during scroll. Reduced motion: the orchestrator passes a value that only
  // ever holds 0 or 1, so this still works (it just snaps).
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
      <ellipse
        ref={shadowRef}
        className="cube-shadow"
        cx={x + 65}
        cy={CUBE_Y + 43}
        rx="66"
        ry="14"
      />
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

// Top-plate glyph per pillar. Web3 = cube cluster, AI = node graph, Studio =
// layered diamond. Recoloured via CSS (.cube-glyph[data-cat]).
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
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean. (Component not yet rendered anywhere — wired in Task 5.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/services-iso-stage.tsx
git commit -m "feat(services): SVG iso stage with grounded rise-driven cubes + glyphs

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Orchestrator — scroll wiring, header in pin, accordion, single viewport

**Files:**
- Modify: `components/sections/services-pillars.tsx` (full rewrite of the desktop path)
- Modify: `components/sections/services.tsx` (drop intro header/lede)
- Delete: `components/sections/services-iso-canvas.tsx`

- [ ] **Step 1: Rewrite `services-pillars.tsx`**

Replace the entire file with:

```tsx
'use client'

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { pillars, getPublishedLeaves, type PillarId } from '@/components/sections/services-data'
import { ServicesIsoStage } from '@/components/sections/services-iso-stage'
import { activeIndexFromProgress, riseForCube } from '@/components/sections/services-scroll'

const TOP_N = 5
const NAV_OFFSET = 56

// H2 trailing phrase per pillar (text + colour swap as you scroll).
const H2_PHRASE: Record<PillarId, string> = {
  'web3': 'Web3 protocols.',
  'ai': 'Production AI.',
  'product-studio': 'End-to-end products.',
}

export function ServicesPillars() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })

  // Continuous per-cube rise (Motion values, no re-render on scroll).
  const rise0 = useTransform(scrollYProgress, (p) => riseForCube(0, p, pillars.length))
  const rise1 = useTransform(scrollYProgress, (p) => riseForCube(1, p, pillars.length))
  const rise2 = useTransform(scrollYProgress, (p) => riseForCube(2, p, pillars.length))
  const rises = [rise0, rise1, rise2]

  // Discrete active index (drives H2 phrase/colour + open accordion row + cube fill).
  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = activeIndexFromProgress(p, pillars.length)
    setActiveIndex((cur) => (cur === next ? cur : next))
  })

  const active = pillars[activeIndex]

  const scrollToPillar = (i: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const target = sectionTop + (wrap.offsetHeight / pillars.length) * (i + 0.5) - window.innerHeight / 2
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <>
      <ScopedStyle />

      {/* Mobile (lg-): compact stack, no pinning. */}
      <div className="lg:hidden mt-[48px]">
        <MobileStack />
      </div>

      {/* Desktop (lg+): single-viewport pinned scrolltelling. */}
      <div ref={wrapRef} data-services-anchor-wrap className="hidden lg:block relative h-[260vh]">
        <div
          className="sticky overflow-hidden flex flex-col"
          style={{ top: NAV_OFFSET, height: `calc(100svh - ${NAV_OFFSET}px)` }}
        >
          {/* Bar */}
          <div className="flex items-center justify-between px-[24px] py-[12px] border-b border-border-subtle flex-shrink-0">
            <span className="section-h-eyebrow-inline font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-light">
              What we build
            </span>
            <span className="font-mono text-[11px] font-bold tracking-[0.06em]">
              <span style={{ color: active.color }}>{active.num}</span>
              <span className="text-gray-light"> / 03</span>
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 grid grid-cols-[minmax(300px,42%)_1fr] min-h-0">
            {/* LEFT: H2 + accordion */}
            <div className="flex flex-col min-h-0 border-r border-border-subtle px-[28px] py-[24px]">
              <h2 className="services-h2 text-[clamp(26px,2.6vw,38px)] font-bold tracking-[-0.03em] leading-[1.1] text-dark flex-shrink-0">
                A small, senior team.{' '}
                <span
                  key={active.id}
                  className="services-h2-phrase"
                  style={{ color: active.color }}
                >
                  {H2_PHRASE[active.id]}
                </span>
              </h2>

              <ol className="mt-[20px] flex-1 min-h-0 overflow-y-auto">
                {pillars.map((pillar, idx) => {
                  const isActive = idx === activeIndex
                  const isLast = idx === pillars.length - 1
                  const visibleChildren = getPublishedLeaves(pillar).slice(0, TOP_N)
                  return (
                    <li
                      key={pillar.id}
                      className={`relative ${isLast ? '' : 'border-b border-border-subtle'}`}
                      style={{ '--pillar-color': pillar.color } as React.CSSProperties}
                    >
                      <span
                        aria-hidden="true"
                        className="services-row-bar absolute left-0 top-0 bottom-0 w-[3px]"
                        data-active={isActive}
                        style={{ backgroundColor: pillar.color }}
                      />
                      <button
                        type="button"
                        onClick={() => { setActiveIndex(idx); scrollToPillar(idx) }}
                        aria-expanded={isActive}
                        aria-controls={`pillar-body-${pillar.id}`}
                        className="services-row-button w-full text-left py-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                        data-active={isActive}
                      >
                        <span
                          className="font-mono text-[12px] font-bold tracking-[0.06em] block services-row-num"
                          data-active={isActive}
                          style={isActive ? { color: pillar.color } : undefined}
                        >
                          [{pillar.num}]
                        </span>
                        <span className="block mt-[6px] text-[16px] font-bold tracking-[-0.005em] uppercase services-row-label">
                          {pillar.label}
                        </span>
                      </button>

                      <div
                        id={`pillar-body-${pillar.id}`}
                        className="services-row-body"
                        data-active={isActive}
                        role="region"
                      >
                        <div className="services-row-body-inner">
                          {/* No tech-stack pills — spacious subservice list. */}
                          <ul role="list" className="pb-[16px] space-y-[2px]">
                            {visibleChildren.map((child) => (
                              <li key={child.slug}>
                                <Link
                                  href={`${pillar.hubHref}${child.slug}/`}
                                  className="group flex items-center justify-between gap-[12px] min-h-[44px] -mx-[8px] px-[10px] rounded-sm hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-[var(--duration-instant)]"
                                >
                                  <span className="text-[14px] font-medium tracking-[-0.005em] text-dark">
                                    {child.name}
                                  </span>
                                  <ArrowUpRight className="shrink-0 text-gray-light group-hover:text-[var(--pillar-color)] transition-colors duration-[var(--duration-instant)]" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="pb-[14px]">
                            <Link
                              href={pillar.hubHref}
                              className="inline-flex items-center gap-[8px] text-[13px] font-medium hover:opacity-80 transition-opacity duration-[var(--duration-instant)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                              style={{ color: pillar.color }}
                            >
                              <span>See all {pillar.label} services</span>
                              <ArrowRight />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* RIGHT: iso stage */}
            <div className="relative min-h-0">
              <ServicesIsoStage rises={rises} activeIndex={activeIndex} />
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-[8px] py-[8px] border-t border-border-subtle flex-shrink-0 text-gray-light">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em]">Scroll</span>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- MOBILE STACK (unchanged behaviour) ---------- */

function MobileStack() {
  return (
    <div className="flex flex-col gap-[8px] bg-white border border-border rounded-lg p-[16px] sm:p-[24px]">
      {pillars.map((pillar, i) => (
        <details
          key={pillar.id}
          id={`pillar-${pillar.id}-mobile`}
          className={i > 0 ? 'pt-[12px] pb-[4px] border-t border-dashed border-border group' : 'pb-[4px] group'}
          style={{ '--pillar-color': pillar.color } as React.CSSProperties}
        >
          <summary className="flex items-center justify-between cursor-pointer py-[14px] [touch-action:manipulation] list-none [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-[12px]">
              <span className="text-[13px] font-mono text-gray tabular-nums">[{pillar.num}]</span>
              <span
                aria-hidden="true"
                className="w-[9px] h-[9px] outline outline-[1.5px] outline-offset-[1.5px]"
                style={{ background: pillar.color, outlineColor: pillar.color }}
              />
              <h3 className="text-[18px] font-bold tracking-[-0.025em] leading-[1.2] text-dark">
                {pillar.label}
              </h3>
            </div>
            <ChevronDown size={18} className="shrink-0 text-gray transition-transform duration-[var(--duration-instant)] group-open:rotate-180" />
          </summary>
          <div className="mt-[24px]">
            <h4
              id={`pillar-${pillar.id}-mobile-heading`}
              className="text-[20px] font-bold tracking-[-0.025em] leading-tight text-dark mb-[12px]"
            >
              {pillar.headline}
            </h4>
            <p className="text-[15px] leading-[1.65] text-gray mb-[20px]">{pillar.body}</p>
            <ul role="list" className="space-y-[8px]">
              {getPublishedLeaves(pillar).slice(0, TOP_N).map((child) => (
                <li key={child.slug}>
                  <Link
                    href={`${pillar.hubHref}${child.slug}/`}
                    className="group flex items-center justify-between gap-[12px] min-h-[44px] px-[16px] py-[12px] border border-border bg-white hover:border-[var(--pillar-color)] transition-colors duration-[var(--duration-instant)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <span className="text-[13px] font-bold uppercase tracking-[0.02em] text-dark leading-tight">
                      {child.name}
                    </span>
                    <ArrowUpRight className="shrink-0 text-gray-light group-hover:text-[var(--pillar-color)] transition-colors duration-[var(--duration-instant)]" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-[16px]">
              <Link
                href={pillar.hubHref}
                className="inline-flex items-center gap-[8px] text-[14px] font-medium"
                style={{ color: pillar.color }}
              >
                <span>See all {pillar.label} services</span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}

/* ---------- SCOPED STYLES ---------- */

function ScopedStyle() {
  return (
    <style precedence="default">{`
      .services-row-button { background: transparent; cursor: pointer; padding-left: 16px; }
      .services-row-num { color: #999; transition: color var(--duration-fast, 250ms); }
      .services-row-label { color: #676767; transition: color var(--duration-fast, 250ms); }
      .services-row-button[data-active="true"] .services-row-label { color: #303030; }
      .services-row-bar { opacity: 0; transition: opacity var(--duration-fast, 250ms); }
      .services-row-bar[data-active="true"] { opacity: 1; }
      .services-row-body {
        display: grid; grid-template-rows: 1fr; padding-left: 16px;
        transition: grid-template-rows var(--duration-base, 400ms) cubic-bezier(0.16,1,0.3,1),
                    opacity var(--duration-base, 400ms) cubic-bezier(0.16,1,0.3,1);
        opacity: 1;
      }
      .services-row-body[data-active="false"] { grid-template-rows: 0fr; opacity: 0; }
      .services-row-body-inner { min-height: 0; overflow: hidden; }
      .services-h2-phrase { display: inline-block; animation: services-fade-in var(--duration-fast, 250ms) ease-out; }
      @keyframes services-fade-in {
        from { opacity: 0; transform: translateY(3px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .services-row-button, .services-row-num, .services-row-label,
        .services-row-bar, .services-row-body { transition: none !important; }
        .services-h2-phrase { animation: none !important; }
      }
    `}</style>
  )
}

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
```

- [ ] **Step 2: Drop the intro header + lede in `services.tsx`**

In `components/sections/services.tsx`, replace the wrapper block:

```tsx
      <div className="lg:rounded-lg lg:border lg:border-border lg:bg-white">
        <div className="lg:border-b lg:border-border lg:pt-[64px] lg:pb-[48px] lg:px-[48px]">
          <div className="max-w-[720px] mx-auto text-center">
            <Pill>What we build</Pill>
            <h2
              id="services-heading"
              className="mt-[24px] text-balance text-[clamp(36px,4.6vw,64px)] font-bold tracking-[-0.035em] leading-[1.05] text-dark"
            >
              A small, senior team.<br />Three pillars. End to end.
            </h2>
            <p className="mt-[20px] text-[16px] text-gray leading-[1.65] tracking-[-0.01em]">
              A boutique studio for founders without a CTO. We ship Web3 protocols, production AI agents, and full SaaS products with one senior team that owns the work from architecture to deployment. Every build is engineered for production, not stopped at a demo.
            </p>
          </div>
        </div>

        <ServicesPillarsLazy />
      </div>
```

with (header/lede removed; H2 now lives inside the pin; `id="services-heading"` moves to the section for `aria-labelledby`):

```tsx
      <div className="lg:rounded-lg lg:border lg:border-border lg:bg-white lg:overflow-hidden">
        <h2 id="services-heading" className="sr-only">What we build — a small, senior team across three pillars</h2>
        <ServicesPillarsLazy />
      </div>
```

Then remove the now-unused `Pill` import at the top of `services.tsx`:

```tsx
import { Pill } from '@/components/ui/pill'
```

Confirm the FAQ JSON-LD already carries the boutique/studio framing (it does — first Q "What does Metaborong build?"). No JSON-LD change needed.

- [ ] **Step 3: Delete the old canvas**

Run: `git rm components/sections/services-iso-canvas.tsx`
Expected: file removed. Confirm nothing else imports it:
Run: `grep -rn "services-iso-canvas" components/ app/ | grep -v node_modules`
Expected: no matches.

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add components/sections/services-pillars.tsx components/sections/services.tsx
git commit -m "feat(services): single-viewport pinned scrolltelling with SVG iso stage

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Live visual verification + tuning (agent-browser)

**Files:** none (verification + targeted tweaks only)

The dev server runs on :3000 from the working dir (not ours — don't kill it; HMR picks up edits). agent-browser is viewport-locked ~1280×633.

- [ ] **Step 1: Open Services and snapshot the default (Web3) state**

```bash
mkdir -p ./screenshots
agent-browser open "http://localhost:3000/#services" && agent-browser wait --load networkidle && agent-browser screenshot --full ./screenshots/svc-default.png
```

Expected (inspect the image): single-viewport frame; bar top, scroll-hint bottom; left H2 "A small, senior team. **Web3 protocols.**" (blue) + accordion with [01] WEB3 open; right SVG grid with the Web3 cube **risen and grounded** (bottom edge on the grid, no floating gap), cube-cluster glyph visible on the top plate; AI/STUDIO cubes flat on the grid.

- [ ] **Step 2: Scroll through the segments and capture each active pillar**

```bash
agent-browser eval 'window.scrollTo(0, document.querySelector("[data-services-anchor-wrap]").offsetTop + window.innerHeight*1.3)' && agent-browser wait 600 && agent-browser screenshot --full ./screenshots/svc-ai.png
agent-browser eval 'window.scrollTo(0, document.querySelector("[data-services-anchor-wrap]").offsetTop + window.innerHeight*2.3)' && agent-browser wait 600 && agent-browser screenshot --full ./screenshots/svc-studio.png
```

Expected: in `svc-ai.png` the H2 phrase reads "Production AI." (teal), [02] AI row open, AI cube risen with node-graph glyph, others lowering/flat. In `svc-studio.png`, "End-to-end products." (orange), [03] open, Studio cube risen with layered-diamond glyph.

- [ ] **Step 3: Judge the grounding + rise feel; tune if needed**

Inspect for: (a) cube bottom edge sits exactly on a grid intersection at all rise levels (grounded); (b) glyph fades in mid-rise, not abruptly; (c) crossfade between cubes reads smoothly, not a hard pop; (d) labels/cube apex not clipped by the frame. If grounding is off, adjust `CUBE_X`/`CUBE_Y` in `services-iso-stage.tsx`. If the rise feels too narrow/wide or cubes pop, tune the `0.42` divisor in `riseForCube` (`services-scroll.ts`) — re-run its unit tests after. If glyph timing is off, tune the `0.35`/`0.65` in `glyphOpacity` — re-run geometry tests. Re-screenshot after each tweak.

- [ ] **Step 4: Commit any tuning**

```bash
git add -A
git commit -m "fix(services): tune iso-cube grounding/rise/glyph timing from live review

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

(Skip the commit if Step 3 required no changes.)

---

## Task 7: Single-viewport fit + reduced-motion + responsive (Playwright)

**Files:**
- Create (temporary, untracked): `scripts/.svc-measure.mjs`

- [ ] **Step 1: Write the measurement script**

Create `scripts/.svc-measure.mjs`:

```js
import { chromium } from '@playwright/test'

const heights = [720, 768, 800, 900]
const browser = await chromium.launch()
for (const h of heights) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: h },
    deviceScaleFactor: 1,
  })
  await ctx.addCookies([{ name: 'mb_consent', value: 'accepted', domain: 'localhost', path: '/' }])
  const page = await ctx.newPage()
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  // Pin the Services frame at its sticky position.
  const wrap = page.locator('[data-services-anchor-wrap]')
  const top = await wrap.evaluate((el) => el.offsetTop)
  await page.evaluate((y) => window.scrollTo(0, y + 10), top)
  await page.waitForTimeout(400)
  const frame = wrap.locator(':scope > div').first()
  const box = await frame.boundingBox()
  const overflow = await frame.evaluate((el) => ({
    scrollH: el.scrollHeight, clientH: el.clientHeight,
    childOverflow: el.scrollHeight - el.clientHeight,
  }))
  console.log(`h=${h}  frameH=${box?.height?.toFixed(1)}  avail=${h - 56}  innerOverflow=${overflow.childOverflow}`)
  await ctx.close()
}
await browser.close()
```

- [ ] **Step 2: Run it**

Run: `node scripts/.svc-measure.mjs`
Expected: at each height, `frameH ≈ avail` (frame fits `100svh − 56`) and `innerOverflow` is `0` (no internal scrollbar in the pinned frame). If `innerOverflow > 0` at the shortest height (720), reduce vertical budget: tighten accordion row padding (`py-[14px]`→`py-[12px]`) and/or `TOP_N` cap, or reduce the H2 clamp max. Re-run until clean.

- [ ] **Step 3: Reduced-motion check**

Add to the script a second context with `reducedMotion: 'reduce'` (or run a quick manual check): the cubes should still show the active one risen (snap, no continuous tween), no crossfade, and no console errors. Confirm `useMotionValueEvent` still flips active index (reduced motion doesn't disable scroll math). Note: with reduced motion, the rise Motion values still update (CSS transitions are what's gated) — acceptable; the geometry just updates without the 400ms fill tween.

- [ ] **Step 4: Mobile fallback check**

```bash
node -e "0" # placeholder so the step is runnable; real check below
```
Run: `agent-browser open "http://localhost:3000/" && agent-browser wait --load networkidle`
Then resize via a Playwright one-off at width 390 (agent-browser is viewport-locked): extend `.svc-measure.mjs` viewport to `{ width: 390, height: 844 }` and assert the `lg:hidden` MobileStack renders (the `[data-services-anchor-wrap]` pinned block is `hidden lg:block`, so it should be absent/zero-size). Expected: accordion `<details>` stack present, no SVG stage, no pin.

- [ ] **Step 5: Clean up the temp script**

Run: `rm scripts/.svc-measure.mjs`
Expected: removed (it is untracked; nothing to commit).

---

## Task 8: Full-suite gate + graduate

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `DESIGN.md` (only if motion grammar changed — it did: first framer-motion/`motion` pinned section)

- [ ] **Step 1: Run the unit suite + typecheck**

Run: `npx vitest run components/sections/services-scroll.test.ts components/sections/services-iso-geometry.test.ts`
Expected: PASS.
Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 2: Lint the touched files**

Run: `npm run lint`
Expected: no new errors in the services files. (Pre-existing set-state-in-effect lint debt elsewhere is out of scope — do not fix unrelated files.)

- [ ] **Step 3: Update DESIGN.md motion note**

In `DESIGN.md`, under the scroll-motion section, confirm/append that the **Services** section now uses `motion` (framer-motion) `useScroll` for the pinned iso stage (first of the two sanctioned pins), grounded SVG cubes driven by a `rise` 0→1, reduced-motion degrades to discrete active-cube snap. Keep it to 1–2 lines, matching existing style.

- [ ] **Step 4: Add CHANGELOG entry**

Read `CHANGELOG.md` first (Edit requires it). Under a 2026-05-24 heading (or append to the existing in-progress entry), add a bullet: Services section rebuilt as a single-viewport pinned scrolltelling — left per-pillar color-changing H2 + accordion (tech pills dropped), right SVG isometric stage with grounded scroll-linked rising cubes + top-plate glyphs; old headline retired; intro lede dropped (copy retained in FAQ JSON-LD); adds `motion` dependency.

- [ ] **Step 5: Final live self-check before "shipped"**

```bash
agent-browser open "http://localhost:3000/#services" && agent-browser wait --load networkidle && agent-browser screenshot --full ./screenshots/svc-final.png
```
Expected: matches the design — single viewport, grounded rising cubes, color-changing H2, no tech pills, scroll hint. Keyboard: Tab reaches accordion buttons + subservice links; Enter on a row scrolls to that pillar.

- [ ] **Step 6: Commit the graduation**

```bash
git add CHANGELOG.md DESIGN.md
git commit -m "docs(services): graduate section rebuild (CHANGELOG + DESIGN motion note)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Self-review notes (author)

- **Spec coverage:** SVG grounded cubes (T3+T4), continuous scroll rise via `motion` (T0+T5), per-pillar text+colour H2 (T5), eyebrow label + 01/03 counter (T5), drop tech pills + spacious subservices (T5), single-viewport layout + budget (T5+T7), drop lede w/ JSON-LD retention (T5), Studio headline (T1), mobile stack kept (T5), reduced motion (T4+T5+T7), a11y/SSR crawlable (T5 — all links rendered, SVG aria-hidden). All spec sections map to a task.
- **No floating baseplate:** enforced by `cubeFaces` keeping floor vertices fixed (tested) + static `cube-floor` diamonds.
- **Package name:** `motion` (not `framer-motion`), import `motion/react` — verified via ctx7 before planning.
- **Verification is browser-first** for the visual parts (T6/T7) and unit-tested for the pure math (T2/T3), matching the codebase's actual test seams rather than faking DOM/scroll unit tests.
