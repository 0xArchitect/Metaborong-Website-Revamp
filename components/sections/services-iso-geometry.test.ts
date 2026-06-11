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
    expect(f.top).toBe('0,0 65,37 130,0 65,-37')
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
      expect(f.left.startsWith('0,0 65,37')).toBe(true)
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
