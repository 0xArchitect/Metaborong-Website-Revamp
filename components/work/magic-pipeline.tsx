'use client'

import { useEffect, useRef, useState } from 'react'

// Animated mock of MAGIC's image-to-video pipeline: one product image is
// ingested, then video frames render in sequentially until the clip is ready.
// Scroll-triggered; reduced-motion + no-JS show the final ("ready") frame.
// Pure transform/opacity, no layout animation. The signature motion moment.

const FRAMES = 4
type Phase = 'idle' | 'ingest' | 'render' | 'ready'

export function MagicPipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [frames, setFrames] = useState(0)
  const [animated, setAnimated] = useState(false) // false → static final frame

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
      setFrames(0)
      setPhase('idle')
      const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
      at(400, () => setPhase('ingest'))
      at(1100, () => setPhase('render'))
      for (let i = 0; i < FRAMES; i++) at(1300 + i * 320, () => setFrames(i + 1))
      at(1300 + FRAMES * 320 + 500, () => setPhase('ready'))
      // Plays once and holds on the rendered clip; replays only when the reader
      // scrolls away and back (the IO resets `running` on exit).
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e.isIntersecting && !running) {
          running = true
          cycle()
        } else if (!e.isIntersecting && running) {
          running = false
          timers.forEach(clearTimeout)
          timers = []
          setPhase('idle')
          setFrames(0)
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const ingesting = animated && (phase === 'ingest' || phase === 'render' || phase === 'ready')
  const ready = !animated || phase === 'ready'
  const shown = !animated ? FRAMES : frames

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-[14px] border border-border bg-bg shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]"
      aria-hidden="true"
    >
      {/* chrome */}
      <div className="flex items-center gap-[8px] border-b border-border/70 bg-bg-subtle px-[16px] py-[11px]">
        <span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="ml-[8px] font-mono text-[11px] tracking-[0.04em] text-gray">magic · render</span>
      </div>

      <div className="px-[20px] py-[22px] sm:px-[24px] sm:py-[26px]">
        {/* source → pipeline */}
        <div className="flex items-center gap-[14px]">
          <div className="flex flex-col items-center gap-[6px]">
            <div
              className={`relative h-[58px] w-[58px] overflow-hidden rounded-[10px] border transition-colors duration-300 ${ingesting ? 'border-[#6d28d9]' : 'border-border'}`}
              style={{ background: 'linear-gradient(135deg,#f4f1fb,#e9e3f7)' }}
            >
              <span className="absolute bottom-[10px] left-1/2 h-[26px] w-[16px] -translate-x-1/2 rounded-[5px] bg-[#6d28d9]/30" />
              <span className="absolute bottom-[30px] left-1/2 h-[8px] w-[8px] -translate-x-1/2 rounded-full bg-[#6d28d9]/40" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-gray">source</span>
          </div>

          <div className="flex flex-1 flex-col items-center gap-[5px]">
            <div className="flex w-full items-center gap-[4px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`h-[2px] flex-1 rounded-full transition-colors duration-300 ${ingesting ? 'bg-[#6d28d9]/60' : 'bg-border'}`} />
              ))}
              <span className={`text-[11px] transition-colors duration-300 ${ingesting ? 'text-[#6d28d9]' : 'text-gray'}`}>▶</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-gray">{ready ? 'image → video' : ingesting ? 'rendering' : 'image → video'}</span>
          </div>
        </div>

        {/* filmstrip */}
        <div className="mt-[16px] grid grid-cols-4 gap-[6px]">
          {Array.from({ length: FRAMES }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] overflow-hidden rounded-[7px] border border-border"
              style={{
                opacity: i < shown ? 1 : 0.5,
                transform: i < shown ? 'translateY(0)' : 'translateY(4px)',
                transition: 'opacity 240ms ease, transform 240ms ease',
                background: i < shown ? 'linear-gradient(135deg,#efe9fb,#ddd2f4)' : '#f5f5f7',
              }}
            >
              {i < shown && <span className="absolute bottom-[6px] left-1/2 h-[40%] w-[28%] -translate-x-1/2 rounded-[3px] bg-[#6d28d9]/30" />}
            </div>
          ))}
        </div>

        {/* status */}
        <div className="mt-[16px] flex items-center justify-between">
          <span className="inline-flex items-center gap-[8px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">
            {ready ? (
              <>
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#6d28d9] text-[9px] text-white">▶</span>
                <span className="text-dark">Ready · 4 formats</span>
              </>
            ) : (
              <>
                <span className="h-[8px] w-[8px] rounded-full bg-[#6d28d9] [animation:mgp-pulse_1s_ease-in-out_infinite]" />
                <span className="text-gray">Generating product video…</span>
              </>
            )}
          </span>
          <span className="font-mono text-[10px] text-gray">{shown}/{FRAMES}</span>
        </div>
      </div>

      <style>{`
        @keyframes mgp-pulse { 0%,100% { opacity: 1 } 50% { opacity: .3 } }
        @media (prefers-reduced-motion: reduce) { [class*="mgp-pulse"] { animation: none !important } }
      `}</style>
    </div>
  )
}
