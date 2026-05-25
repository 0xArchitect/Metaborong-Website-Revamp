// components/sections/why-us-slide.ts
// Pure scroll math for the Why-Us pinned horizontal card-slide. No React, no
// DOM — keeps the slide windows unit-testable in isolation (mirrors
// services-scroll.ts). x = translateX % for a card: 100 = off to the right,
// 0 = fully covering the stack.

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const smoothstep = (t: number) => t * t * (3 - 2 * t)

// Progress window each card slides in over. Card 0 is the back of the stack
// (always covering). Cards 1 and 2 slide in from the right.
const WINDOWS: Array<[number, number] | null> = [null, [0.20, 0.45], [0.55, 0.80]]

export function cardXForProgress(index: number, p: number): number {
  const win = WINDOWS[index]
  if (!win) return 0
  const [start, end] = win
  const t = clamp((clamp(p, 0, 1) - start) / (end - start), 0, 1)
  return (1 - smoothstep(t)) * 100
}

// Active pillar (drives the nav highlight) for progress p across 3 reasons.
export function activeIndexFromProgress(p: number): number {
  const c = clamp(p, 0, 1)
  if (c < 0.33) return 0
  if (c < 0.67) return 1
  return 2
}

// Scroll dwell-center (fraction of the stage) a pillar button jumps to.
export function dwellCenter(index: number): number {
  return [0.10, 0.50, 0.90][clamp(index, 0, 2)]
}
