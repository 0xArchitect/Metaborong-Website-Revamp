'use client'

import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Zap, CalendarDays } from 'lucide-react'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { Pill } from '@/components/ui/pill'
import { ClutchWidget } from '@/components/sections/clutch-widget'
import { reasons } from '@/components/sections/why-us-data'
import { cardXForProgress, activeIndexFromProgress, dwellCenter } from '@/components/sections/why-us-slide'

const NAV_OFFSET = 56
const stats = [
  { Icon: Zap, label: 'Reply within 12h' },
  { Icon: CalendarDays, label: '4–12 weeks to ship' },
]

const chip =
  'inline-flex min-h-[40px] items-center justify-center gap-[8px] border border-border bg-bg px-[14px] text-[13px] font-semibold tabular-nums tracking-[-0.005em] text-dark'

function Header() {
  return (
    <div className="flex flex-shrink-0 flex-col gap-[20px] pt-[clamp(20px,3svh,32px)] pb-[clamp(14px,2svh,22px)] lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-[12px]">
        <Pill>Why us</Pill>
        <h2 className="text-balance text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.05] tracking-[-0.035em] text-dark">
          Why founders choose <span className="text-brand">Metaborong</span>
        </h2>
      </div>
      <div className="flex flex-col gap-[12px] lg:items-end">
        <ClutchWidget />
        <div className="flex flex-wrap gap-[10px] lg:justify-end">
          {stats.map(({ Icon, label }) => (
            <span key={label} className={chip}>
              <Icon aria-hidden="true" className="size-[15px] shrink-0 text-gray" strokeWidth={2} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CardInner({ r, i }: { r: (typeof reasons)[number]; i: number }) {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden items-center justify-center bg-bg-subtle lg:flex">
        <img
          src={r.image}
          alt=""
          loading="lazy"
          decoding="async"
          width={800}
          height={800}
          className="max-h-[78%] max-w-[78%] object-contain"
        />
        <span className="absolute left-[16px] top-[16px] border border-border bg-bg px-[8px] py-[3px] font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-dark">
          [{String(i + 1).padStart(2, '0')}] {r.tag}
        </span>
        <span aria-hidden="true" className="absolute right-[12px] top-[12px] size-[18px] border-r-2 border-t-2 border-gray-subtle" />
        <span aria-hidden="true" className="absolute bottom-[12px] left-[12px] size-[18px] border-b-2 border-l-2 border-gray-subtle" />
      </div>
      <div className="flex flex-col justify-center gap-[16px] px-[clamp(16px,3vw,48px)] py-[32px]">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray">{r.tag}</span>
        <h3 className="text-balance text-[clamp(20px,1.7vw,26px)] font-bold leading-[1.15] tracking-[-0.025em] text-dark">{r.title}</h3>
        <p className="max-w-[460px] text-[clamp(14px,1.05vw,16px)] leading-[1.65] tracking-[-0.005em] text-gray">{r.body}</p>
      </div>
    </div>
  )
}

function WhyUsStatic() {
  return (
    <div className="flex flex-col gap-[16px]">
      {reasons.map((r, i) => (
        <article key={r.tag} className="overflow-hidden border border-border bg-bg">
          <CardInner r={r} i={i} />
        </article>
      ))}
    </div>
  )
}

export function WhyUsSlider() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const r0 = useRef<HTMLDivElement>(null)
  const r1 = useRef<HTMLDivElement>(null)
  const r2 = useRef<HTMLDivElement>(null)
  const cardRefs = [r0, r1, r2]
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    cardRefs.forEach((ref, i) => ref.current?.style.setProperty('--x', `${cardXForProgress(i, p)}%`))
    const next = activeIndexFromProgress(p)
    setActive((cur) => (cur === next ? cur : next))
  })

  const jumpTo = (i: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const top = wrap.getBoundingClientRect().top + window.scrollY
    const target = top + wrap.offsetHeight * dwellCenter(i) - window.innerHeight / 2
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <>
      <ScopedStyle />

      {/* Static stack — mobile (lg-) always, plus all widths under reduced motion. */}
      <div className={`${reduce ? '' : 'lg:hidden'} px-[16px] sm:px-[24px] md:px-[40px] py-[56px] md:py-[72px]`}>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-[32px]">
          <Header />
          <WhyUsStatic />
        </div>
      </div>

      {/* Desktop (lg+): 320vh pinned horizontal card-slide. Not under reduced motion. */}
      {!reduce && (
        <div ref={wrapRef} data-whyus-anchor className="hidden lg:block relative h-[320vh]">
          <div
            className="sticky overflow-hidden border-t border-b border-border bg-bg"
            style={{ top: NAV_OFFSET, height: `calc(100svh - ${NAV_OFFSET}px)` }}
          >
            <div className="mx-auto grid h-full w-full max-w-[1440px] grid-rows-[auto_1fr_auto] px-[16px] sm:px-[24px] md:px-[40px] lg:px-[40px] xl:px-[72px] 2xl:px-[112px]">
              <Header />

              <div className="relative min-h-0 overflow-hidden border border-border">
                {reasons.map((r, i) => (
                  <article
                    key={r.tag}
                    ref={cardRefs[i]}
                    className="why-card absolute inset-0 bg-bg"
                    data-active={i === active}
                    style={{ ['--x']: i === 0 ? '0%' : '100%', zIndex: i + 1 } as CSSProperties}
                  >
                    <CardInner r={r} i={i} />
                  </article>
                ))}
              </div>

              <div className="grid flex-shrink-0 grid-cols-3 border-t border-border">
                {reasons.map((r, i) => (
                  <button
                    key={r.tag}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={i === active ? 'true' : undefined}
                    className="why-pill flex min-h-[56px] flex-col justify-center gap-[2px] border-l border-border px-[16px] py-[12px] text-left first:border-l-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                    data-active={i === active}
                  >
                    <span className="why-pill-idx font-mono text-[10px] font-bold tracking-[0.12em]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="why-pill-name text-[clamp(12px,1vw,14px)] font-bold tracking-[-0.01em]">{r.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ScopedStyle() {
  return (
    <style precedence="default">{`
      .why-card { transform: translateX(var(--x, 100%)); }
      .why-pill-idx  { color: var(--color-gray-light); transition: color var(--duration-base,400ms); }
      .why-pill-name { color: var(--color-gray); transition: color var(--duration-base,400ms); }
      .why-pill[data-active="true"] { background: var(--color-bg-subtle); box-shadow: inset 0 2px 0 0 var(--color-brand); }
      .why-pill[data-active="true"] .why-pill-idx,
      .why-pill[data-active="true"] .why-pill-name { color: var(--color-brand); }
      @media (prefers-reduced-motion: reduce) {
        .why-pill-idx, .why-pill-name { transition: none; }
      }
    `}</style>
  )
}
