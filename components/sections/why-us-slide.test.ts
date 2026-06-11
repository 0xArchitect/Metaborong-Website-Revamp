// components/sections/why-us-slide.test.ts
import { describe, it, expect } from 'vitest'
import { cardXForProgress, activeIndexFromProgress, dwellCenter } from './why-us-slide'

describe('cardXForProgress', () => {
  it('keeps card 0 covering at all progress', () => {
    expect(cardXForProgress(0, 0)).toBe(0)
    expect(cardXForProgress(0, 0.5)).toBe(0)
    expect(cardXForProgress(0, 1)).toBe(0)
  })
  it('slides card 1 in over [0.20,0.45]', () => {
    expect(cardXForProgress(1, 0.20)).toBeCloseTo(100, 5)
    expect(cardXForProgress(1, 0.10)).toBeCloseTo(100, 5)
    expect(cardXForProgress(1, 0.325)).toBeCloseTo(50, 5)
    expect(cardXForProgress(1, 0.45)).toBeCloseTo(0, 5)
    expect(cardXForProgress(1, 0.9)).toBeCloseTo(0, 5)
  })
  it('slides card 2 in over [0.55,0.80]', () => {
    expect(cardXForProgress(2, 0.5)).toBeCloseTo(100, 5)
    expect(cardXForProgress(2, 0.675)).toBeCloseTo(50, 5)
    expect(cardXForProgress(2, 0.80)).toBeCloseTo(0, 5)
  })
})

describe('activeIndexFromProgress', () => {
  it('flips at 0.33 / 0.67', () => {
    expect(activeIndexFromProgress(0)).toBe(0)
    expect(activeIndexFromProgress(0.32)).toBe(0)
    expect(activeIndexFromProgress(0.34)).toBe(1)
    expect(activeIndexFromProgress(0.66)).toBe(1)
    expect(activeIndexFromProgress(0.68)).toBe(2)
    expect(activeIndexFromProgress(1)).toBe(2)
  })
  it('clamps out of range', () => {
    expect(activeIndexFromProgress(-1)).toBe(0)
    expect(activeIndexFromProgress(2)).toBe(2)
  })
})

describe('dwellCenter', () => {
  it('returns the three dwell centers', () => {
    expect(dwellCenter(0)).toBe(0.10)
    expect(dwellCenter(1)).toBe(0.50)
    expect(dwellCenter(2)).toBe(0.90)
  })
})
