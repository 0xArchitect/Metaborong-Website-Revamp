// Pure isometric cube geometry as a function of `rise` (0..1). Origin is the
// floor diamond's LEFT vertex; the cube extrudes UP by h = rise*100 while the
// floor vertices stay fixed, so the base never leaves the grid (grounded —
// unlike a design that floats the body off a separate baseplate).

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
  return clamp(rise, 0, 1) * -H_MAX || 0
}

// Glyph fades in only after the cube is ~35% risen (matches the design).
export function glyphOpacity(rise: number): number {
  return clamp((clamp(rise, 0, 1) - 0.35) * (1 / 0.65), 0, 1)
}

// Contact shadow darkens as the cube rises.
export function shadowOpacity(rise: number): number {
  return clamp(rise, 0, 1) * 0.12
}
