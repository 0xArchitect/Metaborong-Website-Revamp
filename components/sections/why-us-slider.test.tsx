// components/sections/why-us-slider.test.tsx
// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { WhyUsSlider } from './why-us-slider'

vi.mock('motion/react', () => ({
  useScroll: () => ({ scrollYProgress: { on: () => () => {}, get: () => 0 } }),
  useMotionValueEvent: () => {},
  useReducedMotion: () => false,
}))
vi.mock('./clutch-widget', () => ({ ClutchWidget: () => <div data-testid="clutch" /> }))

describe('WhyUsSlider', () => {
  it('renders all three reasons content server-side (crawlable)', () => {
    const { getAllByText, getByText } = render(<WhyUsSlider />)
    expect(getByText('First working version in weeks')).toBeTruthy()
    expect(getByText('We stress-test the brief before we build')).toBeTruthy()
    expect(getByText('Multichain Web3 and production-grade AI agents')).toBeTruthy()
    expect(getAllByText('Product thinking').length).toBeGreaterThan(0)
  })
})
