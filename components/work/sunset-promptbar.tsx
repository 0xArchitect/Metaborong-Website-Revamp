'use client'

import { useEffect, useRef, useState } from 'react'

// Animated mock of SunsetML's Contextual PromptBar: a writer highlights a
// phrase in the editor, the in-flow PromptBar rises, and a rewrite streams in
// word by word. Scroll-triggered; reduced-motion + no-JS show the final frame.
// Pure transform/opacity — no layout animation. The one signature motion moment
// on the page (impeccable overdrive: focus, not excess).

const DOC_LEAD = 'The new editor is '
const SELECTED = 'good and people seem to like using it.'
const RESULT = 'fast, focused, and quietly addictive.'
const RESULT_WORDS = RESULT.split(' ')

type Phase = 'idle' | 'select' | 'prompt' | 'stream' | 'hold'

export function SunsetPromptBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [revealed, setRevealed] = useState(0)
  const [animated, setAnimated] = useState(false) // false → static final frame

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return // keep static final frame

    let timers: ReturnType<typeof setTimeout>[] = []
    let running = false

    const cycle = () => {
      timers.forEach(clearTimeout)
      timers = []
      setAnimated(true)
      setRevealed(0)
      setPhase('idle')
      const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
      at(400, () => setPhase('select'))
      at(1200, () => setPhase('prompt'))
      at(2000, () => setPhase('stream'))
      RESULT_WORDS.forEach((_, i) => at(2100 + i * 150, () => setRevealed(i + 1)))
      at(2100 + RESULT_WORDS.length * 150 + 1600, () => setPhase('hold'))
      at(2100 + RESULT_WORDS.length * 150 + 2600, () => cycle())
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
          setRevealed(0)
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

  // Static (reduced-motion / pre-JS): the rewrite is already resolved.
  const highlighted = animated && (phase === 'select' || phase === 'prompt')
  const struck = !animated || phase === 'stream' || phase === 'hold'
  const showPrompt = !animated || phase === 'prompt' || phase === 'stream' || phase === 'hold'
  const streaming = !animated || phase === 'stream' || phase === 'hold'
  const wordsShown = !animated ? RESULT_WORDS.length : revealed

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-[14px] border border-border bg-canvas shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]"
      aria-hidden="true"
    >
      {/* editor chrome */}
      <div className="flex items-center gap-[8px] border-b border-border/70 bg-bg-subtle px-[16px] py-[11px]">
        <span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="h-[10px] w-[10px] rounded-full bg-border" />
        <span className="ml-[8px] font-mono text-[11px] tracking-[0.04em] text-gray-light">launch-note.md</span>
      </div>

      {/* document body */}
      <div className="px-[20px] py-[22px] sm:px-[26px] sm:py-[28px]">
        <p className="text-[15px] leading-[1.7] tracking-[-0.01em] text-dark sm:text-[16px]">
          {DOC_LEAD}
          <span
            className={`rounded-[3px] px-[2px] transition-colors duration-300 ${
              highlighted ? 'bg-brand/15 text-dark' : ''
            } ${struck ? 'text-gray-light line-through decoration-gray-light/50' : ''}`}
          >
            {SELECTED}
          </span>
        </p>

        {/* streamed rewrite */}
        <p
          className={`mt-[10px] text-[15px] font-medium leading-[1.7] tracking-[-0.01em] text-dark transition-opacity duration-300 sm:text-[16px] ${
            streaming || !animated ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {RESULT_WORDS.map((w, i) => (
            <span
              key={i}
              className="transition-all duration-200"
              style={{
                opacity: i < wordsShown ? 1 : 0,
                transform: i < wordsShown ? 'translateY(0)' : 'translateY(3px)',
              }}
            >
              {w}
              {i < RESULT_WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
          {streaming && wordsShown < RESULT_WORDS.length && (
            <span className="ml-[1px] inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-brand align-baseline [animation:sbpb-caret_900ms_steps(1)_infinite]" />
          )}
        </p>

        {/* in-flow PromptBar */}
        <div
          className={`mt-[18px] inline-flex items-center gap-[10px] rounded-full border border-border bg-bg-raised py-[7px] pl-[12px] pr-[7px] shadow-sm transition-all duration-300 ${
            showPrompt ? 'translate-y-0 opacity-100' : 'translate-y-[6px] opacity-0'
          }`}
        >
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">✦</span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dark">Rewrite</span>
          <span className="text-[11px] text-gray-light">·</span>
          <span className="text-[12px] text-gray">sharper</span>
          <kbd className="ml-[4px] rounded-[4px] border border-border bg-bg px-[6px] py-[2px] font-mono text-[10px] text-gray">↵</kbd>
        </div>
      </div>

      <style>{`
        @keyframes sbpb-caret { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @media (prefers-reduced-motion: reduce) {
          [class*="sbpb-caret"] { animation: none !important }
        }
      `}</style>
    </div>
  )
}
