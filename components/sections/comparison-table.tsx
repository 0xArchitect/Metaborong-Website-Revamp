'use client'

import { useEffect, useRef, useState } from 'react'

export type ComparisonRow = { label: string; mb: string; large: string; free: string }

/**
 * The comparison table with an IO-gated staggered row cascade (Session 19 signature
 * moment). Each row fades + lifts in sequence on viewport entry, drawing the eye
 * down the table and the emphasised Metaborong column. opacity/transform only;
 * short-circuits to visible under prefers-reduced-motion. a11y semantics
 * (scope, caption, sr-only headers) are unchanged from the prior server table.
 */
export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  const ref = useRef<HTMLTableElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduced(true)
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const rowMotion = (i: number) =>
    reduced
      ? ''
      : `transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
        }`

  return (
    <div className="overflow-x-auto">
      <table ref={ref} className="min-w-[720px] w-full border-collapse text-[14px]">
        <caption className="sr-only">
          Comparison of Metaborong, large Web3 or AI agencies, and freelance teams across seven operational dimensions: team access, AI-native operations, engineering standards, delivery timeline, documentation and handover, process and project management, and track record.
        </caption>
        <thead>
          <tr className="border-b-2 border-border">
            <th scope="col" className="w-[22%] px-[16px] py-[12px] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-gray-light">
              <span className="sr-only">Dimension</span>
            </th>
            <th scope="col" className="w-[26%] px-[16px] py-[12px] text-left text-[13px] font-bold text-brand">Metaborong</th>
            <th scope="col" className="w-[26%] px-[16px] py-[12px] text-left text-[13px] font-bold text-gray">Large Web3 or AI Agency</th>
            <th scope="col" className="w-[26%] px-[16px] py-[12px] text-left text-[13px] font-bold text-gray">Freelance Team</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.label}
              style={reduced ? undefined : { transitionDelay: visible ? `${i * 55}ms` : '0ms' }}
              className={`border-b border-border-subtle ${i % 2 === 0 ? 'bg-bg-subtle/60' : 'bg-transparent'} ${rowMotion(i)}`}
            >
              <th scope="row" className="px-[16px] py-[14px] text-left text-[13px] font-medium text-gray">{r.label}</th>
              <td className="px-[16px] py-[14px] font-semibold text-dark">{r.mb}</td>
              <td className="px-[16px] py-[14px] text-gray">{r.large}</td>
              <td className="px-[16px] py-[14px] text-gray">{r.free}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
