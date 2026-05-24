'use client'

import { useEffect, useRef, useState } from 'react'

export type Row = {
  label: string
  /** Brand-bold lead phrase of the Metaborong cell (per handoff `<b>`). */
  mbBold: string
  /** Remainder of the Metaborong cell, normal weight. */
  mbRest: string
  large: string
  free: string
  /** Track-record row: the alternative carries the structural-advantage ✓. */
  largeCheck?: boolean
}

const cell = 'px-[20px] py-[18px] align-top'

// Client island: IO-gated, staggered row reveal (opacity + translateY), mirroring
// components/ui/reveal.tsx. Row text is always in the SSR DOM (opacity only) so it
// stays crawlable; reduced-motion short-circuits to fully visible.
export function ComparisonRows({ rows }: { rows: Row[] }) {
  const ref = useRef<HTMLTableSectionElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduced(true)
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry], o) => {
        if (entry.isIntersecting) {
          setVisible(true)
          o.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <tbody ref={ref}>
      {rows.map((r, i) => {
        const last = i === rows.length - 1
        const edge = last ? '' : 'border-b border-border'
        return (
          <tr
            key={r.label}
            style={reduced ? undefined : { transitionDelay: `${i * 60}ms` }}
            className={
              reduced
                ? ''
                : `transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'
                  }`
            }
          >
            <th
              scope="row"
              className={`${cell} ${edge} text-left font-mono text-[12px] font-bold uppercase tracking-[0.04em] text-dark`}
            >
              {r.label}
            </th>
            <td className={`${cell} ${edge} bg-brand/[0.04] font-medium text-dark`}>
              <b className="font-bold text-brand">{r.mbBold}</b>
              {r.mbRest}
            </td>
            <td className={`${cell} ${edge} text-gray`}>
              {r.large}
              {r.largeCheck && (
                <span aria-hidden="true" className="ml-[6px] font-bold text-accent">
                  ✓
                </span>
              )}
            </td>
            <td className={`${cell} ${edge} text-gray`}>{r.free}</td>
          </tr>
        )
      })}
    </tbody>
  )
}
