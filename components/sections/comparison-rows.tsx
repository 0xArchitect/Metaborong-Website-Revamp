'use client'

import { useEffect, useRef, useState } from 'react'

type Row = { label: string; mb: string; large: string; free: string }

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
      {rows.map((r, i) => (
        <tr
          key={r.label}
          style={reduced ? undefined : { transitionDelay: `${i * 60}ms` }}
          className={`border-b border-border-subtle ${i % 2 === 0 ? 'bg-bg-subtle/60' : 'bg-transparent'} ${
            reduced
              ? ''
              : `transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'
                }`
          }`}
        >
          <th scope="row" className="px-[16px] py-[14px] text-left text-[13px] font-medium text-gray">{r.label}</th>
          <td className="px-[16px] py-[14px] font-semibold text-dark">{r.mb}</td>
          <td className="px-[16px] py-[14px] text-gray">{r.large}</td>
          <td className="px-[16px] py-[14px] text-gray">{r.free}</td>
        </tr>
      ))}
    </tbody>
  )
}
