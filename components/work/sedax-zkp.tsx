'use client'

import { useEffect, useRef, useState } from 'react'

// Animated mock of SEDAX's Zero-Knowledge Proof verification: a verifier asks a
// question, a ZK proof is generated, and the result confirms the claim without
// revealing the underlying data. Scroll-triggered; reduced-motion + no-JS show
// the final ("verified") frame. The signature motion moment on the SEDAX page.

type Phase = 'idle' | 'request' | 'proving' | 'verified'

export function SedaxZkp() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
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
      setPhase('idle')
      const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
      at(400, () => setPhase('request'))
      at(1200, () => setPhase('proving'))
      at(2500, () => setPhase('verified'))
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e.isIntersecting && !running) { running = true; cycle() }
        else if (!e.isIntersecting && running) { running = false; timers.forEach(clearTimeout); timers = []; setPhase('idle') }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  const requested = !animated || phase !== 'idle'
  const proving = animated && phase === 'proving'
  const verified = !animated || phase === 'verified'

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-[14px] border border-border bg-bg shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]" aria-hidden="true">
      <div className="flex items-center gap-[8px] border-b border-border/70 bg-bg-subtle px-[16px] py-[11px]">
        <span className="h-[10px] w-[10px] rounded-full bg-border" /><span className="h-[10px] w-[10px] rounded-full bg-border" /><span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="ml-[8px] font-mono text-[11px] tracking-[0.04em] text-gray">sedax · verify</span>
      </div>

      <div className="px-[20px] py-[22px] sm:px-[24px] sm:py-[26px]">
        <div className={`rounded-[10px] border px-[12px] py-[10px] transition-opacity duration-300 ${requested ? 'opacity-100' : 'opacity-40'} border-border bg-bg-subtle`}>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Verifier asks</span>
          <p className="mt-[4px] text-[14px] font-semibold text-dark">Is this person over 18?</p>
        </div>

        <div className="my-[12px] flex items-center gap-[10px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">ZK proof</span>
          <span className="flex flex-1 items-center gap-[4px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-[4px] flex-1 rounded-full transition-colors duration-200 ${verified || proving ? 'bg-[#047857]' : 'bg-border'}`}
                style={proving ? { animation: `sdx-wave 1s ${i * 0.12}s ease-in-out infinite` } : undefined}
              />
            ))}
          </span>
        </div>

        <div className={`flex items-center justify-between rounded-[10px] border px-[12px] py-[11px] transition-colors duration-300 ${verified ? 'border-[#047857] bg-[#047857]/[0.05]' : 'border-border'}`}>
          <span className="flex items-center gap-[8px]">
            <span className={`flex h-[20px] w-[20px] items-center justify-center rounded-full text-[10px] text-white transition-colors ${verified ? 'bg-[#047857]' : 'bg-border'}`}>✓</span>
            <span className="text-[13px] font-semibold text-dark">{verified ? 'Verified' : 'Verifying…'}</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#047857]">no DOB shared</span>
        </div>
      </div>

      <style>{`@keyframes sdx-wave{0%,100%{opacity:.35}50%{opacity:1}} @media (prefers-reduced-motion: reduce){[style*="sdx-wave"]{animation:none !important}}`}</style>
    </div>
  )
}
