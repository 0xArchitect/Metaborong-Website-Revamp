'use client'

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react'
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

      {/* Mobile (lg-): static stack with section padding. */}
      <div className="lg:hidden px-[16px] sm:px-[24px] md:px-[40px] py-[56px] md:py-[72px]">
        <div className="mx-auto max-w-[1280px]">
          <MobileStack />
        </div>
      </div>

      {/* Desktop (lg+): full-bleed single-viewport pinned scrolltelling. */}
      <div ref={wrapRef} data-services-anchor-wrap className="hidden lg:block relative h-[260vh]">
        <div
          className="sticky overflow-hidden flex flex-col border-t border-b border-border"
          style={{ top: NAV_OFFSET, height: `calc(100svh - ${NAV_OFFSET}px)` }}
        >
          <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col min-h-0 px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]">
            {/* Bar */}
            <div className="flex flex-shrink-0 items-center gap-[14px] pt-[24px] pb-[18px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-light">
              <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 bg-brand" />
              <span>What we build</span>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
              <span className="tabular-nums tracking-[0.06em] text-dark">
                <span style={{ color: active.color }}>{active.num}</span>
                <span className="text-gray-light"> / 03</span>
              </span>
            </div>

            {/* Content */}
            <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[40px] pb-[12px] xl:gap-[56px]">
              {/* LEFT: H2 + handoff-style blocks */}
              <div className="flex min-h-0 flex-col">
                <h2 className="services-h2 max-w-[20ch] flex-shrink-0 text-balance text-[clamp(24px,2.4vw,33px)] font-bold leading-[1.08] tracking-[-0.03em] text-dark">
                  A small, senior team.{' '}
                  <span key={active.id} className="services-h2-phrase" style={{ color: active.color }}>
                    {H2_PHRASE[active.id]}
                  </span>
                </h2>

                <div className="mt-[20px] flex min-h-0 flex-col overflow-y-auto">
                  {pillars.map((pillar, idx) => {
                    const isActive = idx === activeIndex
                    const children = getPublishedLeaves(pillar)
                    return (
                      <div
                        key={pillar.id}
                        className="svc-block"
                        data-active={isActive}
                        style={{ '--cat': pillar.color } as React.CSSProperties}
                      >
                        <span aria-hidden="true" className="svc-block-rule" data-active={isActive} />
                        <button
                          type="button"
                          onClick={() => { setActiveIndex(idx); scrollToPillar(idx) }}
                          aria-expanded={isActive}
                          aria-controls={`pillar-body-${pillar.id}`}
                          className="svc-block-head focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                        >
                          <span className="svc-num">[{pillar.num}]</span>
                          <span className="svc-block-body">
                            <span className="svc-cat">{pillar.label}</span>
                            <span className="svc-h3">{pillar.headline}</span>
                          </span>
                        </button>

                        <div
                          id={`pillar-body-${pillar.id}`}
                          role="region"
                          className="svc-panel"
                          data-active={isActive}
                        >
                          <div className="svc-panel-inner">
                            <p className="svc-body">{pillar.body}</p>
                            <ul className="svc-sublist">
                              {children.map((child) => (
                                <li key={child.slug}>
                                  <Link
                                    href={`${pillar.hubHref}${child.slug}/`}
                                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                                  >
                                    <span>{child.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={pillar.hubHref}
                              className="svc-foot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                            >
                              See all {pillar.label} services
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* RIGHT: iso stage */}
              <div className="relative min-h-0">
                <ServicesIsoStage rises={rises} activeIndex={activeIndex} />
              </div>
            </div>
          </div>

          {/* Scroll hint — bottom-right, aligned to the full-bleed edge padding */}
          <div className="pointer-events-none absolute bottom-[18px] right-[16px] flex items-center gap-[10px] font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-light sm:right-[24px] md:right-[40px] lg:right-[48px] xl:right-[80px] 2xl:right-[128px]">
            <span>Scroll</span>
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
      /* Handoff svc-block: every pillar shows num + category + headline; the
         active one un-dims, draws a coloured top rule, and expands its panel. */
      .svc-block {
        position: relative;
        border-top: 1px solid var(--color-border, #e5e7eb);
        opacity: 0.4;
        transition: opacity var(--duration-base, 400ms) cubic-bezier(0.16,1,0.3,1);
      }
      .svc-block:last-child { border-bottom: 1px solid var(--color-border, #e5e7eb); }
      .svc-block[data-active="true"] { opacity: 1; }
      .svc-block-rule {
        position: absolute; left: 0; top: -1px; height: 1px; width: 0;
        background: var(--cat); pointer-events: none;
        transition: width var(--duration-slow, 620ms) cubic-bezier(0.16,1,0.3,1);
      }
      .svc-block-rule[data-active="true"] { width: 100%; }

      .svc-block-head {
        display: grid; grid-template-columns: 44px 1fr; gap: 14px;
        width: 100%; text-align: left; padding: 16px 0;
        background: transparent; cursor: pointer;
      }
      .svc-num {
        font-family: var(--font-mono); font-size: 11px; font-weight: 700;
        letter-spacing: 0.14em; color: var(--color-gray-light, #9ca3af);
        padding-top: 3px; transition: color var(--duration-fast, 250ms);
      }
      .svc-block[data-active="true"] .svc-num { color: var(--cat); }
      .svc-block-body { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
      .svc-cat {
        font-family: var(--font-mono); font-size: 11px; font-weight: 700;
        letter-spacing: 0.14em; text-transform: uppercase;
        color: var(--color-gray, #676767); transition: color var(--duration-fast, 250ms);
      }
      .svc-block[data-active="true"] .svc-cat { color: var(--cat); }
      .svc-h3 {
        font-family: var(--font-brand); font-weight: 700;
        font-size: clamp(17px, 1.7vw, 21px); letter-spacing: -0.025em;
        line-height: 1.18; color: var(--color-dark, #303030);
      }

      .svc-panel {
        display: grid; grid-template-rows: 0fr; opacity: 0;
        transition:
          grid-template-rows var(--duration-slow, 620ms) cubic-bezier(0.16,1,0.3,1),
          opacity var(--duration-base, 400ms) cubic-bezier(0.16,1,0.3,1);
      }
      .svc-block[data-active="true"] .svc-panel { grid-template-rows: 1fr; opacity: 1; }
      .svc-panel-inner {
        overflow: hidden; min-height: 0;
        display: flex; flex-direction: column; gap: 12px;
        padding-left: 58px; padding-bottom: 18px;
      }
      .svc-body { font-size: 13.5px; line-height: 1.55; color: var(--color-gray, #676767); max-width: 56ch; }

      .svc-sublist {
        list-style: none; margin: 0; padding: 0;
        display: grid; grid-template-columns: 1fr 1fr;
        border-top: 1px solid var(--color-border-subtle, #f3f4f6);
      }
      .svc-sublist li {
        border-bottom: 1px solid var(--color-border-subtle, #f3f4f6);
        transition: border-color var(--duration-instant, 150ms);
      }
      .svc-sublist li:nth-child(odd)  { border-right: 1px solid var(--color-border-subtle, #f3f4f6); padding-right: 12px; }
      .svc-sublist li:nth-child(even) { padding-left: 12px; }
      .svc-sublist a {
        display: flex; align-items: center; justify-content: space-between; gap: 8px;
        min-height: 40px; padding: 8px 0; font-size: 13px; font-weight: 500;
        color: var(--color-dark, #303030); letter-spacing: -0.005em; text-decoration: none;
        transition: color var(--duration-instant, 150ms), padding-left var(--duration-instant, 150ms);
      }
      .svc-sublist a::after {
        content: '→'; font-family: var(--font-mono); color: var(--color-gray-light, #9ca3af);
        font-size: 12px; transition: transform var(--duration-instant, 150ms), color var(--duration-instant, 150ms);
      }
      .svc-sublist a:hover { color: var(--cat); padding-left: 4px; }
      .svc-sublist a:hover::after { color: var(--cat); transform: translateX(3px); }
      .svc-sublist li:hover { border-bottom-color: var(--cat); }

      .svc-foot {
        display: inline-flex; align-items: center; gap: 6px; align-self: flex-start;
        font-family: var(--font-mono); font-size: 11px; font-weight: 700;
        letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-dark, #303030);
        text-decoration: none; transition: color var(--duration-instant, 150ms), gap var(--duration-instant, 150ms);
      }
      .svc-foot::after { content: '→'; transition: transform var(--duration-instant, 150ms); }
      .svc-foot:hover { color: var(--cat); gap: 10px; }
      .svc-foot:hover::after { transform: translateX(2px); }

      .services-h2-phrase { display: inline-block; animation: services-fade-in var(--duration-fast, 250ms) ease-out; }
      @keyframes services-fade-in {
        from { opacity: 0; transform: translateY(3px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .svc-block, .svc-panel, .svc-block-rule, .svc-num, .svc-cat,
        .svc-sublist a, .svc-sublist a::after, .svc-foot, .svc-foot::after {
          transition: none !important;
        }
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
