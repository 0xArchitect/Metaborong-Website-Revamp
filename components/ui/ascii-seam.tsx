'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

// Connective ASCII motif (Session 20): a thin decorative band that sits in the
// space between two sections. The glyph field is a deterministic smooth function
// of (row, col) — identical on server and client (no hydration mismatch) — so it
// reads as designed topographic texture, not random noise. On viewport entry it
// stamps in once via a left-to-right mask wipe, then holds static. Decorative and
// aria-hidden; reduced-motion shows the static texture with no wipe.

const RAMP = ' ·∙•'
const ROWS = 5
const COLS = 240

function buildField(seed: number): string {
  const mid = (ROWS - 1) / 2
  const lines: string[] = []
  for (let y = 0; y < ROWS; y++) {
    // Vertical falloff: densest mid-band, fading toward the top/bottom edges so
    // the texture dissolves into the surrounding white space.
    const edge = 1 - Math.abs((y - mid) / mid)
    let line = ''
    for (let x = 0; x < COLS; x++) {
      const n =
        Math.sin(x * 0.16 + seed) +
        Math.sin(y * 0.9 + x * 0.04) +
        Math.sin((x + y) * 0.11 + seed * 0.5)
      const v = ((n + 3) / 6) * (0.35 + 0.65 * edge)
      const idx = Math.min(RAMP.length - 1, Math.max(0, Math.floor(v * RAMP.length)))
      line += RAMP[idx]
    }
    lines.push(line)
  }
  return lines.join('\n')
}

export function AsciiSeam({ seed = 0, className = '' }: { seed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  const [reduced, setReduced] = useState(false)
  const field = useMemo(() => buildField(seed), [seed])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduced(true)
      setOn(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry], o) => {
        if (entry.isIntersecting) {
          setOn(true)
          o.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`ascii-seam ${on ? 'is-on' : ''} ${reduced ? 'is-reduced' : ''} ${className}`}
    >
      <pre className="ascii-seam__grid">{field}</pre>
    </div>
  )
}
