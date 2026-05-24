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
    // Both the static stack and the desktop pin render in happy-dom (CSS show/hide
    // does not apply), so each title appears in both — assert presence, not uniqueness.
    const { getAllByText } = render(<WhyUsSlider />)
    expect(getAllByText('First working version in weeks').length).toBeGreaterThan(0)
    expect(getAllByText('We stress-test the brief before we build').length).toBeGreaterThan(0)
    expect(getAllByText('Multichain Web3 and production-grade AI agents').length).toBeGreaterThan(0)
    expect(getAllByText('Product thinking').length).toBeGreaterThan(0)
  })
})
