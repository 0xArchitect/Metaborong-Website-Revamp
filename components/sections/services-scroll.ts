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
