'use client'

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { pillars, getPublishedLeaves, type PillarId } from '@/components/sections/services-data'
import { ServicesIsoStage } from '@/components/sections/services-iso-stage'
import { activeIndexFromProgress, riseForCube } from '@/components/sections/services-scroll'

const TOP_N = 5
const NAV_OFFSET = 56

const H2_PHRASE: Record<PillarId, string> = {
  'web3': 'Web3 protocols.',
  'ai': 'Production AI.',
  'product-studio': 'End-to-end products.',
}

export function ServicesPillars() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })

  const rise0 = useTransform(scrollYProgress, (p) => riseForCube(0, p, pillars.length))
  const rise1 = useTransform(scrollYProgress, (p) => riseForCube(1, p, pillars.length))
  const rise2 = useTransform(scrollYProgress, (p) => riseForCube(2, p, pillars.length))
  const rises = [rise0, rise1, rise2]

  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = activeIndexFromProgress(p, pillars.length)
    setActiveIndex((cur) => (cur === next ? cur : next))
  })

  const active = pillars[activeIndex]

  const scrollToPillar = (i: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const target = sectionTop + (wrap.offsetHeight / pillars.length) * (i + 0.5) - window.innerHeight / 2
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <>
      <ScopedStyle />

      <div className="lg:hidden mt-[48px]">
        <MobileStack />
      </div>

      <div ref={wrapRef} data-services-anchor-wrap className="hidden lg:block relative h-[260vh]">
        <div
          className="sticky overflow-hidden flex flex-col"
          style={{ top: NAV_OFFSET, height: `calc(100svh - ${NAV_OFFSET}px)` }}
        >
          <div className="flex items-center justify-between px-[24px] py-[12px] border-b border-border-subtle flex-shrink-0">
            <span className="section-h-eyebrow-inline font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-light">
              What we build
            </span>
            <span className="font-mono text-[11px] font-bold tracking-[0.06em]">
              <span style={{ color: active.color }}>{active.num}</span>
              <span className="text-gray-light"> / 03</span>
            </span>
          </div>

          <div className="flex-1 grid grid-cols-[minmax(300px,42%)_1fr] min-h-0">
            <div className="flex flex-col min-h-0 border-r border-border-subtle px-[28px] py-[24px]">
              <h2 className="services-h2 text-[clamp(26px,2.6vw,38px)] font-bold tracking-[-0.03em] leading-[1.1] text-dark flex-shrink-0">
                A small, senior team.{' '}
                <span key={active.id} className="services-h2-phrase" style={{ color: active.color }}>
                  {H2_PHRASE[active.id]}
                </span>
              </h2>

              <ol className="mt-[20px] flex-1 min-h-0 overflow-y-auto">
                {pillars.map((pillar, idx) => {
                  const isActive = idx === activeIndex
                  const isLast = idx === pillars.length - 1
                  const visibleChildren = getPublishedLeaves(pillar).slice(0, TOP_N)
                  return (
                    <li
                      key={pillar.id}
                      className={`relative ${isLast ? '' : 'border-b border-border-subtle'}`}
                      style={{ '--pillar-color': pillar.color } as React.CSSProperties}
                    >
                      <span
                        aria-hidden="true"
                        className="services-row-bar absolute left-0 top-0 bottom-0 w-[3px]"
                        data-active={isActive}
                        style={{ backgroundColor: pillar.color }}
                      />
                      <button
                        type="button"
                        onClick={() => { setActiveIndex(idx); scrollToPillar(idx) }}
                        aria-expanded={isActive}
                        aria-controls={`pillar-body-${pillar.id}`}
                        className="services-row-button w-full text-left py-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                        data-active={isActive}
                      >
                        <span
                          className="font-mono text-[12px] font-bold tracking-[0.06em] block services-row-num"
                          data-active={isActive}
                          style={isActive ? { color: pillar.color } : undefined}
                        >
                          [{pillar.num}]
                        </span>
                        <span className="block mt-[6px] text-[16px] font-bold tracking-[-0.005em] uppercase services-row-label">
                          {pillar.label}
                        </span>
                      </button>

                      <div
                        id={`pillar-body-${pillar.id}`}
                        className="services-row-body"
                        data-active={isActive}
                        role="region"
                      >
                        <div className="services-row-body-inner">
                          <ul role="list" className="pb-[16px] space-y-[2px]">
                            {visibleChildren.map((child) => (
                              <li key={child.slug}>
                                <Link
                                  href={`${pillar.hubHref}${child.slug}/`}
                                  className="group flex items-center justify-between gap-[12px] min-h-[44px] -mx-[8px] px-[10px] rounded-sm hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-[var(--duration-instant)]"
                                >
                                  <span className="text-[14px] font-medium tracking-[-0.005em] text-dark">
                                    {child.name}
                                  </span>
                                  <ArrowUpRight className="shrink-0 text-gray-light group-hover:text-[var(--pillar-color)] transition-colors duration-[var(--duration-instant)]" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="pb-[14px]">
                            <Link
                              href={pillar.hubHref}
                              className="inline-flex items-center gap-[8px] text-[13px] font-medium hover:opacity-80 transition-opacity duration-[var(--duration-instant)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                              style={{ color: pillar.color }}
                            >
                              <span>See all {pillar.label} services</span>
                              <ArrowRight />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="relative min-h-0">
              <ServicesIsoStage rises={rises} activeIndex={activeIndex} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-[8px] py-[8px] border-t border-border-subtle flex-shrink-0 text-gray-light">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em]">Scroll</span>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  )
}

function MobileStack() {
  return (
    <div className="flex flex-col gap-[8px] bg-white border border-border rounded-lg p-[16px] sm:p-[24px]">
      {pillars.map((pillar, i) => (
        <details
          key={pillar.id}
          id={`pillar-${pillar.id}-mobile`}
          className={i > 0 ? 'pt-[12px] pb-[4px] border-t border-dashed border-border group' : 'pb-[4px] group'}
          style={{ '--pillar-color': pillar.color } as React.CSSProperties}
        >
          <summary className="flex items-center justify-between cursor-pointer py-[14px] [touch-action:manipulation] list-none [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-[12px]">
              <span className="text-[13px] font-mono text-gray tabular-nums">[{pillar.num}]</span>
              <span
                aria-hidden="true"
                className="w-[9px] h-[9px] outline outline-[1.5px] outline-offset-[1.5px]"
                style={{ background: pillar.color, outlineColor: pillar.color }}
              />
              <h3 className="text-[18px] font-bold tracking-[-0.025em] leading-[1.2] text-dark">
                {pillar.label}
              </h3>
            </div>
            <ChevronDown size={18} className="shrink-0 text-gray transition-transform duration-[var(--duration-instant)] group-open:rotate-180" />
          </summary>
          <div className="mt-[24px]">
            <h4
              id={`pillar-${pillar.id}-mobile-heading`}
              className="text-[20px] font-bold tracking-[-0.025em] leading-tight text-dark mb-[12px]"
            >
              {pillar.headline}
            </h4>
            <p className="text-[15px] leading-[1.65] text-gray mb-[20px]">{pillar.body}</p>
            <ul role="list" className="space-y-[8px]">
              {getPublishedLeaves(pillar).slice(0, TOP_N).map((child) => (
                <li key={child.slug}>
                  <Link
                    href={`${pillar.hubHref}${child.slug}/`}
                    className="group flex items-center justify-between gap-[12px] min-h-[44px] px-[16px] py-[12px] border border-border bg-white hover:border-[var(--pillar-color)] transition-colors duration-[var(--duration-instant)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <span className="text-[13px] font-bold uppercase tracking-[0.02em] text-dark leading-tight">
                      {child.name}
                    </span>
                    <ArrowUpRight className="shrink-0 text-gray-light group-hover:text-[var(--pillar-color)] transition-colors duration-[var(--duration-instant)]" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-[16px]">
              <Link
                href={pillar.hubHref}
                className="inline-flex items-center gap-[8px] text-[14px] font-medium"
                style={{ color: pillar.color }}
              >
                <span>See all {pillar.label} services</span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}

function ScopedStyle() {
  return (
    <style precedence="default">{`
      .services-row-button { background: transparent; cursor: pointer; padding-left: 16px; }
      .services-row-num { color: #999; transition: color var(--duration-fast, 250ms); }
      .services-row-label { color: #676767; transition: color var(--duration-fast, 250ms); }
      .services-row-button[data-active="true"] .services-row-label { color: #303030; }
      .services-row-bar { opacity: 0; transition: opacity var(--duration-fast, 250ms); }
      .services-row-bar[data-active="true"] { opacity: 1; }
      .services-row-body {
        display: grid; grid-template-rows: 1fr; padding-left: 16px;
        transition: grid-template-rows var(--duration-base, 400ms) cubic-bezier(0.16,1,0.3,1),
                    opacity var(--duration-base, 400ms) cubic-bezier(0.16,1,0.3,1);
        opacity: 1;
      }
      .services-row-body[data-active="false"] { grid-template-rows: 0fr; opacity: 0; }
      .services-row-body-inner { min-height: 0; overflow: hidden; }
      .services-h2-phrase { display: inline-block; animation: services-fade-in var(--duration-fast, 250ms) ease-out; }
      @keyframes services-fade-in {
        from { opacity: 0; transform: translateY(3px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .services-row-button, .services-row-num, .services-row-label,
        .services-row-bar, .services-row-body { transition: none !important; }
        .services-h2-phrase { animation: none !important; }
      }
    `}</style>
  )
}

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
