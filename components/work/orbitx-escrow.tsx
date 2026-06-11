'use client'

import { useEffect, useRef, useState } from 'react'

// Animated mock of OrbitX's escrow lifecycle: a buyer funds escrow, a milestone
// is met, and funds auto-release to the seller. Scroll-triggered; reduced-motion
// + no-JS show the final ("released") frame. Transform/opacity only. The one
// signature motion moment on the OrbitX page.

type Phase = 'idle' | 'funded' | 'milestone' | 'released'

export function OrbitxEscrow() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timers: ReturnType<typeof setTimeout>[] = []
    let running = false

    const cycle = () => {
      timers.forEach(clearTimeout)
      timers = []
      setAnimated(true)
      setProgress(0)
      setPhase('idle')
      const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
      at(400, () => setPhase('funded'))
      at(1100, () => { setPhase('milestone'); setProgress(100) })
      at(2500, () => setPhase('released'))
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e.isIntersecting && !running) { running = true; cycle() }
        else if (!e.isIntersecting && running) { running = false; timers.forEach(clearTimeout); timers = []; setPhase('idle'); setProgress(0) }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  const funded = !animated || phase === 'funded' || phase === 'milestone' || phase === 'released'
  const released = !animated || phase === 'released'
  const fill = !animated ? 100 : progress

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-[14px] border border-border bg-bg shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]" aria-hidden="true">
      <div className="flex items-center gap-[8px] border-b border-border/70 bg-bg-subtle px-[16px] py-[11px]">
        <span className="h-[10px] w-[10px] rounded-full bg-border" /><span className="h-[10px] w-[10px] rounded-full bg-border" /><span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="ml-[8px] font-mono text-[11px] tracking-[0.04em] text-gray">orbitx · escrow</span>
      </div>

      <div className="px-[20px] py-[22px] sm:px-[24px] sm:py-[26px]">
        <div className="flex items-center gap-[10px]">
          <div className="flex flex-col items-center gap-[5px]">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-border bg-bg-subtle text-[12px] font-bold text-gray">B</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-gray">buyer</span>
          </div>
          <span className={`h-[2px] flex-1 rounded-full transition-colors duration-300 ${funded ? 'bg-[#0e7490]/60' : 'bg-border'}`} />
          <div className={`flex flex-col items-center gap-[5px] rounded-[10px] border px-[12px] py-[8px] transition-colors duration-300 ${funded ? 'border-[#0e7490] bg-[#0e7490]/[0.05]' : 'border-border'}`}>
            <span className={`flex h-[20px] w-[20px] items-center justify-center rounded-full text-[10px] font-bold ${released ? 'bg-[#0e7490] text-white' : 'text-[#0e7490]'}`}>{released ? '✓' : '$'}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-gray">{released ? 'released' : 'escrow'}</span>
          </div>
          <span className={`h-[2px] flex-1 rounded-full transition-colors duration-300 ${released ? 'bg-[#0e7490]/60' : 'bg-border'}`} />
          <div className="flex flex-col items-center gap-[5px]">
            <span className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border text-[12px] font-bold transition-colors duration-300 ${released ? 'border-[#0e7490] text-[#0e7490]' : 'border-border text-gray'}`}>S</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-gray">seller</span>
          </div>
        </div>

        <div className="mt-[18px]">
          <div className="mb-[6px] flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Milestone</span>
            <span className="font-mono text-[10px] text-gray">PO-4821</span>
          </div>
          <div className="h-[8px] w-full overflow-hidden rounded-full bg-border">
            <span className="block h-full w-full origin-left rounded-full bg-[#0e7490] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `scaleX(${fill / 100})` }} />
          </div>
        </div>

        <div className="mt-[14px] flex items-center gap-[8px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">
          {released ? (
            <><span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#0e7490] text-[9px] text-white">✓</span><span className="text-dark">Auto-released to seller</span></>
          ) : funded ? (
            <><span className="h-[8px] w-[8px] rounded-full bg-[#0e7490] [animation:obx-pulse_1s_ease-in-out_infinite]" /><span className="text-gray">Milestone in progress…</span></>
          ) : (
            <><span className="h-[8px] w-[8px] rounded-full bg-border" /><span className="text-gray">Awaiting funds</span></>
          )}
        </div>
      </div>

      <style>{`@keyframes obx-pulse{0%,100%{opacity:1}50%{opacity:.3}} @media (prefers-reduced-motion: reduce){[class*="obx-pulse"]{animation:none !important}}`}</style>
    </div>
  )
}
