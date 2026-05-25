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
    expect(riseForCube(0, (0.5) / 3, 3)).toBeCloseTo(1, 5)
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
    const boundary = 1 / 3
    expect(riseForCube(0, boundary, 3)).toBeGreaterThan(0)
    expect(riseForCube(1, boundary, 3)).toBeGreaterThan(0)
  })
})
