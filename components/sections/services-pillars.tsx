'use client'

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
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

  // v1.0 pin constraint: degrade to the static stack under reduced motion
  // (no scroll-scrubbed pin). null (pre-hydration) keeps the motion default.
  const reduceMotion = useReducedMotion()

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

      {/* Static stack — mobile (lg-) always, plus all widths under reduced motion. */}
      <div className={`${reduceMotion ? '' : 'lg:hidden'} mt-[40px] md:mt-[56px]`}>
        <div className="mx-auto max-w-[1280px]">
          <MobileStack />
        </div>
      </div>

      {/* Desktop (lg+): full-bleed single-viewport pinned scrolltelling. Not rendered
          under reduced motion — the static stack above takes over. */}
      {!reduceMotion && (
        <div ref={wrapRef} data-services-anchor-wrap className="hidden lg:block relative h-[260vh]">
          <div
            className="sticky overflow-hidden flex flex-col border-b border-border"
            style={{ top: NAV_OFFSET, height: `calc(100svh - ${NAV_OFFSET}px)` }}
          >
            <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col min-h-0 px-[16px] sm:px-[24px] md:px-[40px] lg:px-[40px] xl:px-[72px] 2xl:px-[112px]">
              {/* Bar */}
              <div className="flex flex-shrink-0 items-center gap-[14px] pt-[clamp(18px,2.6svh,28px)] pb-[clamp(14px,2svh,22px)] font-mono text-[clamp(11px,1.4svh,13px)] font-bold uppercase tracking-[0.14em] text-gray-light">
                <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 bg-brand" />
                <span>What we build</span>
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
                <span className="tabular-nums tracking-[0.06em] text-dark">
                  <span style={{ color: active.color }}>{active.num}</span>
                  <span className="text-gray-light"> / 03</span>
                </span>
              </div>

              {/* Content */}
              <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[1.3fr_0.7fr] lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] gap-[32px] pb-[12px] xl:gap-[56px] 2xl:gap-[72px]">
                {/* LEFT: H2 + handoff-style blocks */}
                <div className="flex min-h-0 flex-col">
                  <h2 className="services-h2 max-w-[20ch] flex-shrink-0 text-balance text-[clamp(27px,min(4.2svh,3.5vw),44px)] font-bold leading-[1.05] tracking-[-0.03em] text-dark">
                    A small, senior team.{' '}
                    <span key={active.id} className="services-h2-phrase" style={{ color: active.color }}>
                      {H2_PHRASE[active.id]}
                    </span>
                  </h2>

                  <div className="mt-[clamp(12px,2.4svh,28px)] flex min-h-0 flex-col overflow-y-auto pr-[8px] lg:pr-0 [scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden lg:[scrollbar-width:auto] lg:[&::-webkit-scrollbar]:auto">
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
                                {children.map((child, ci) => (
                                  <li key={child.slug}>
                                    <Link
                                      href={`${pillar.hubHref}${child.slug}/`}
                                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                                    >
                                      <span className="svc-sub-idx" aria-hidden="true">{String(ci + 1).padStart(2, '0')}</span>
                                      <span className="svc-sub-name">{child.name}</span>
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

                {/* RIGHT: iso stage — atmospheric grid faded into the section grey */}
                <div className="relative min-h-0 overflow-hidden">
                  <ServicesIsoStage rises={rises} activeIndex={activeIndex} />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
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
        position: absolute; left: 0; top: -1px; height: 1px; width: 100%;
        background: var(--cat); pointer-events: none;
        transform: scaleX(0); transform-origin: left;
        transition: transform var(--duration-slow, 620ms) cubic-bezier(0.16,1,0.3,1);
      }
      .svc-block-rule[data-active="true"] { transform: scaleX(1); }

      .svc-block-head {
        display: grid; grid-template-columns: 44px 1fr; gap: 14px;
        width: 100%; text-align: left; padding: clamp(10px, min(1.7svh, 1.5vw), 18px) 0;
        background: transparent; cursor: pointer;
      }
      .svc-num {
        font-family: var(--font-mono); font-size: clamp(11px, 1.35svh, 13px); font-weight: 700;
        letter-spacing: 0.14em; color: var(--color-gray-light, #9ca3af);
        padding-top: 4px; transition: color var(--duration-fast, 250ms);
      }
      .svc-block[data-active="true"] .svc-num { color: var(--cat); }
      .svc-block-body { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
      .svc-cat {
        font-family: var(--font-mono); font-size: clamp(11px, 1.35svh, 13px); font-weight: 700;
        letter-spacing: 0.14em; text-transform: uppercase;
        color: var(--color-gray, #676767); transition: color var(--duration-fast, 250ms);
      }
      .svc-block[data-active="true"] .svc-cat { color: var(--cat); }
      .svc-h3 {
        font-family: var(--font-brand); font-weight: 700;
        font-size: clamp(17px, min(2.7svh, 2.4vw), 27px); letter-spacing: -0.025em;
        line-height: 1.16; color: var(--color-dark, #303030);
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
        display: flex; flex-direction: column; gap: clamp(9px, 1.5svh, 15px);
        padding-left: 58px; padding-bottom: clamp(10px, 1.7svh, 16px);
      }
      .svc-body { font-size: clamp(13px, min(1.85svh, 1.5vw), 16.5px); line-height: 1.5; color: var(--color-gray, #676767); max-width: 56ch; }

      .svc-sublist {
        list-style: none; margin: 0; padding: 0;
        display: grid; grid-template-columns: 1fr; gap: 6px;
      }
      @media (min-width: 1024px) {
        .svc-sublist { grid-template-columns: 1fr 1fr; }
      }
      .svc-sublist li { display: flex; }
      .svc-sublist a {
        display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 11px; width: 100%;
        min-height: clamp(38px, min(5.2svh, 4.2vw), 50px); padding: 8px 11px;
        font-size: clamp(12.5px, min(1.85svh, 1.45vw), 16px); font-weight: 500;
        color: var(--color-dark, #303030); letter-spacing: -0.005em; text-decoration: none;
        border: 1px solid var(--color-border, #e5e7eb); border-radius: 6px;
        background: color-mix(in oklab, var(--cat) 4%, var(--color-bg, #fff));
        transition: background-color var(--duration-instant, 150ms), border-color var(--duration-instant, 150ms), color var(--duration-instant, 150ms);
      }
      .svc-sub-idx {
        font-family: var(--font-mono); font-size: clamp(10px, 1.2svh, 11.5px); font-weight: 700;
        letter-spacing: 0.06em; color: var(--cat);
        font-variant-numeric: tabular-nums; opacity: 0.85;
        transition: opacity var(--duration-instant, 150ms);
      }
      .svc-sub-name { transition: transform var(--duration-instant, 150ms); }
      .svc-sublist a::after {
        content: '→'; font-family: var(--font-mono); color: var(--color-gray-light, #9ca3af);
        font-size: 12px; transition: transform var(--duration-instant, 150ms), color var(--duration-instant, 150ms);
      }
      .svc-sublist a:hover {
        border-color: color-mix(in oklab, var(--cat) 45%, var(--color-border, #e5e7eb));
        background-color: color-mix(in oklab, var(--cat) 7%, var(--color-bg, #fff));
        color: var(--cat);
      }
      .svc-sublist a:hover .svc-sub-idx { color: var(--cat); }
      .svc-sublist a:hover .svc-sub-name { transform: translateX(2px); }
      .svc-sublist a:hover::after { color: var(--cat); transform: translateX(3px); }

      .svc-foot {
        display: inline-flex; align-items: center; gap: 6px; align-self: flex-start;
        font-family: var(--font-mono); font-size: clamp(11px, 1.35svh, 13px); font-weight: 700;
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
        .svc-sub-idx, .svc-sub-name,
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
