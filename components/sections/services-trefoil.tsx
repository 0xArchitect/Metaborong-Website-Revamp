'use client'

import { useEffect, useRef, useState } from 'react'
import { pillars } from '@/components/sections/services-data'
import type { PillarId } from '@/components/sections/services-data'
import { PillarGlyph } from '@/components/sections/services-glyphs'

type Props = {
  className?: string
}

const HUB = { x: 250, y: 250 }
const SPOKE_LENGTH = 150
const NODE_SIZE = 104
const NODE_HALF = NODE_SIZE / 2
// Spokes terminate at the glyph perimeter, not the glyph center — clean visual seal.
const SPOKE_TERMINUS = SPOKE_LENGTH - NODE_HALF * 0.55
const NODE_OFFSETS: Record<PillarId, { x: number; y: number }> = {
  web3: { x: HUB.x, y: HUB.y - SPOKE_LENGTH },
  'ai-agents': { x: HUB.x - SPOKE_LENGTH * Math.cos(Math.PI / 6), y: HUB.y + SPOKE_LENGTH * Math.sin(Math.PI / 6) },
  'product-studio': { x: HUB.x + SPOKE_LENGTH * Math.cos(Math.PI / 6), y: HUB.y + SPOKE_LENGTH * Math.sin(Math.PI / 6) },
}

export function ServicesTrefoil({ className = '' }: Props) {
  const [activeId, setActiveId] = useState<PillarId | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            window.setTimeout(() => setActiveId('web3'), 600)
          }
        }
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const primed = activeId !== null

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const idx = pillars.findIndex((p) => p.id === activeId)
    let next = idx
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % pillars.length
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (idx - 1 + pillars.length) % pillars.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = pillars.length - 1
    setActiveId(pillars[next].id)
    const newTabId = `services-tab-${pillars[next].id}`
    const el = document.getElementById(newTabId)
    el?.focus()
  }

  return (
    <>
      <style precedence="default">{`
        .services-spoke {
          transition: stroke-opacity 320ms cubic-bezier(0.4, 0, 0.2, 1),
                      stroke-width   320ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .services-spoke-active   { stroke-opacity: 0.7; stroke-width: 1.5; }
        .services-spoke-inactive { stroke-opacity: 0.18; stroke-width: 1; }

        .services-hub-glow {
          transform-origin: center;
          animation: services-hub-breath 7s ease-in-out infinite;
        }
        @keyframes services-hub-breath {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.04); }
        }
        [data-reduced-motion="true"] .services-hub-glow { animation: none; }

        [data-primed="true"][data-active="true"][data-reduced-motion="false"] {
          animation: services-glyph-in 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes services-glyph-in {
          from { transform: scale(0.88); filter: blur(1px); }
          to   { transform: scale(1);    filter: blur(0); }
        }

        .services-node-btn:focus-visible svg {
          outline: 2px solid var(--color-brand);
          outline-offset: 4px;
          border-radius: 50%;
        }
      `}</style>
      <div
        ref={rootRef}
        data-reduced-motion={reducedMotion}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-[48px] ${className}`}
      >
      <div className="relative aspect-square max-h-[520px] w-full">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          <defs>
            {/* Iso ground glow — wide, flat ellipse beneath the trefoil. Real atmosphere. */}
            <radialGradient id="services-ground" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#204AF8" stopOpacity="0.16" />
              <stop offset="55%" stopColor="#204AF8" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#204AF8" stopOpacity="0" />
            </radialGradient>
            {/* Hub multi-stop glow — concentrated, premium */}
            <radialGradient id="services-hub-radial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#204AF8" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#204AF8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#204AF8" stopOpacity="0" />
            </radialGradient>
            {/* Spoke gradient — vivid at hub, fading toward node. Light-beam quality. */}
            <linearGradient id="spoke-fade-top" x1="250" y1="250" x2="250" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#204AF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#204AF8" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="spoke-fade-ll" x1="250" y1="250" x2={NODE_OFFSETS['ai-agents'].x} y2={NODE_OFFSETS['ai-agents'].y} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#204AF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#204AF8" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="spoke-fade-lr" x1="250" y1="250" x2={NODE_OFFSETS['product-studio'].x} y2={NODE_OFFSETS['product-studio'].y} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#204AF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#204AF8" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Iso elliptical ground glow — anchors the trefoil, gives the figure a stage */}
          <ellipse cx="250" cy="305" rx="195" ry="42" fill="url(#services-ground)" aria-hidden="true" />

          {/* Spokes — terminate before the glyph perimeter so the line doesn't pierce the mark */}
          {pillars.map((p) => {
            const node = NODE_OFFSETS[p.id]
            const isActive = p.id === activeId
            const gradId =
              p.id === 'web3' ? 'spoke-fade-top'
              : p.id === 'ai-agents' ? 'spoke-fade-ll'
              : 'spoke-fade-lr'
            const dx = node.x - HUB.x
            const dy = node.y - HUB.y
            const len = Math.hypot(dx, dy)
            const tx = HUB.x + (dx * SPOKE_TERMINUS) / len
            const ty = HUB.y + (dy * SPOKE_TERMINUS) / len
            return (
              <line
                key={`spoke-${p.id}`}
                x1={HUB.x}
                y1={HUB.y}
                x2={tx}
                y2={ty}
                stroke={`url(#${gradId})`}
                strokeLinecap="round"
                className={`services-spoke ${isActive ? 'services-spoke-active' : 'services-spoke-inactive'}`}
                aria-hidden="true"
              />
            )
          })}

          {/* Hub — three layers: breathing outer glow → ring → solid core */}
          <circle
            className="services-hub-glow"
            cx={HUB.x}
            cy={HUB.y}
            r="38"
            fill="url(#services-hub-radial)"
            aria-hidden="true"
          />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="14"
            fill="none"
            stroke="#204AF8"
            strokeWidth="1"
            strokeOpacity="0.35"
            aria-hidden="true"
          />
          <circle cx={HUB.x} cy={HUB.y} r="6.5" fill="#204AF8" aria-hidden="true" />
          <circle cx={HUB.x} cy={HUB.y} r="2.5" fill="#FFFFFF" fillOpacity="0.7" aria-hidden="true" />

          {pillars.map((p) => {
            const node = NODE_OFFSETS[p.id]
            const isActive = p.id === activeId
            return (
              <foreignObject
                key={`node-${p.id}`}
                x={node.x - NODE_HALF}
                y={node.y - NODE_HALF}
                width={NODE_SIZE}
                height={NODE_SIZE}
                style={{ overflow: 'visible' }}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  aria-label={`Activate ${p.label} pillar`}
                  className="services-node-btn w-full h-full bg-transparent border-0 p-0 cursor-pointer focus:outline-none rounded-full"
                >
                  <PillarGlyph pillarId={p.id} active={isActive} primed={primed} reducedMotion={reducedMotion} />
                </button>
              </foreignObject>
            )
          })}
        </svg>
      </div>

      <div className="flex flex-col" role="tablist" aria-orientation="vertical" onKeyDown={handleTabKeyDown}>
        {pillars.map((p) => {
          const isActive = p.id === activeId
          const panelId = `services-panel-${p.id}`
          const tabId = `services-tab-${p.id}`
          return (
            <div
              key={p.id}
              className={`border-b border-border-subtle last:border-b-0 ${isActive ? 'border-l-[3px] pl-[24px]' : 'border-l-0 pl-[27px]'}`}
              style={isActive ? { borderLeftColor: p.color } : undefined}
            >
              <button
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(p.id)}
                className="w-full flex items-center gap-[16px] py-[20px] bg-transparent border-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <span className="text-[12px] font-mono text-gray-light">{p.num}</span>
                <span className="w-[8px] h-[8px] rounded-full" style={{ background: p.color }} />
                <span
                  className="text-[18px] font-semibold tracking-[-0.02em] text-dark"
                  style={isActive ? { color: p.color } : undefined}
                >
                  {p.label}
                </span>
                <span className="ml-auto text-gray-light" aria-hidden="true">{isActive ? '▴' : '▾'}</span>
              </button>
              {isActive && (
                <div
                  role="tabpanel"
                  id={panelId}
                  aria-labelledby={tabId}
                  className="pb-[24px] pr-[8px]"
                >
                  <h3 className="text-[20px] font-bold tracking-[-0.025em] leading-[1.2] text-dark mb-[12px]">
                    {p.headline}
                  </h3>
                  <p className="text-[14px] text-gray leading-[1.75] tracking-[-0.005em] mb-[20px]">
                    {p.body}
                  </p>
                  <ul className="flex flex-col gap-[10px] list-none p-0 m-0 mb-[20px]">
                    {p.children.map((c) => (
                      <li key={c.slug}>
                        <a
                          href={`${p.hubHref}${c.slug}/`}
                          className="group flex flex-col gap-[2px] no-underline"
                        >
                          <span className="flex items-center gap-[6px] text-[14px] font-semibold text-dark">
                            {c.name}
                            <span aria-hidden="true">→</span>
                          </span>
                          <span className="text-[13px] text-gray leading-[1.5]">
                            {c.description}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.hubHref}
                    className="text-[14px] font-semibold tracking-[-0.01em] no-underline"
                    style={{ color: p.color }}
                  >
                    {p.hubCta} →
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
