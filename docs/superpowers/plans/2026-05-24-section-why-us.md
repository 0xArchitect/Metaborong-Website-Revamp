# Why-Us A1 Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static Why-Us 3-card grid with the handoff's 320vh horizontal pinned card-slide (three full-viewport cards sliding in from the right), keeping the iso `whyus/*.webp` (downscaled), the live Clutch badge, and the rich client-proof copy.

**Architecture:** Mirror the Services split — a pure tested math module (`why-us-slide.ts`), a shared data module (`why-us-data.ts`), a client pin component (`why-us-slider.tsx`, plain `'use client'` so its card text is server-rendered/crawlable — NOT `ssr:false`), and a server shell (`why-us.tsx`) carrying the `sr-only` lede + Clutch rating. `motion` (`motion/react`) `useScroll` drives per-card `translateX` imperatively via a CSS var (no re-render on scroll); the active pillar is discrete state. The pin is gated behind `useReducedMotion()` and `<lg`, both falling back to a static stacked column.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript, Tailwind v4, `motion@^12` (`motion/react`), Vitest. Reuses the pinned-section pattern proven in `services-pillars.tsx` / `services-scroll.ts`.

**Reference:** spec `docs/superpowers/specs/2026-05-24-section-why-us.md`; master `DESIGN.md`.

**Constraints (all tasks):** Commit locally on `design-revamp`, never push/force-push. Verify with `npx tsc --noEmit` (NOT `npm run build` — rss.xml fails on the PR #26 env hold). Co-author trailer `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`. Subagents: read-only git except their own exact `git add`/`commit`; never stash/reset/checkout/restore/clean/pop.

---

### Task 1: Pure scroll math (`why-us-slide.ts`)

**Files:**
- Create: `components/sections/why-us-slide.ts`
- Test: `components/sections/why-us-slide.test.ts`

The handoff windows: card 1 (index 0) is always at the back (`x: 0%`); card 2 slides in over progress `[0.20, 0.45]`; card 3 over `[0.55, 0.80]`. `x` is the translateX percentage (100% = fully off to the right, 0% = covering). Active index flips at `0.33` / `0.67`. Pillar-nav click targets dwell centers `[0.10, 0.50, 0.90]`.

- [ ] **Step 1: Write the failing test**

```ts
// components/sections/why-us-slide.test.ts
import { describe, it, expect } from 'vitest'
import { cardXForProgress, activeIndexFromProgress, dwellCenter } from './why-us-slide'

describe('cardXForProgress', () => {
  it('keeps card 0 covering at all progress', () => {
    expect(cardXForProgress(0, 0)).toBe(0)
    expect(cardXForProgress(0, 0.5)).toBe(0)
    expect(cardXForProgress(0, 1)).toBe(0)
  })
  it('slides card 1 in over [0.20,0.45]', () => {
    expect(cardXForProgress(1, 0.20)).toBeCloseTo(100, 5) // off-right before window
    expect(cardXForProgress(1, 0.10)).toBeCloseTo(100, 5)
    expect(cardXForProgress(1, 0.325)).toBeCloseTo(50, 5) // smoothstep(0.5)=0.5
    expect(cardXForProgress(1, 0.45)).toBeCloseTo(0, 5)   // fully covering
    expect(cardXForProgress(1, 0.9)).toBeCloseTo(0, 5)
  })
  it('slides card 2 in over [0.55,0.80]', () => {
    expect(cardXForProgress(2, 0.5)).toBeCloseTo(100, 5)
    expect(cardXForProgress(2, 0.675)).toBeCloseTo(50, 5)
    expect(cardXForProgress(2, 0.80)).toBeCloseTo(0, 5)
  })
})

describe('activeIndexFromProgress', () => {
  it('flips at 0.33 / 0.67', () => {
    expect(activeIndexFromProgress(0)).toBe(0)
    expect(activeIndexFromProgress(0.32)).toBe(0)
    expect(activeIndexFromProgress(0.34)).toBe(1)
    expect(activeIndexFromProgress(0.66)).toBe(1)
    expect(activeIndexFromProgress(0.68)).toBe(2)
    expect(activeIndexFromProgress(1)).toBe(2)
  })
  it('clamps out of range', () => {
    expect(activeIndexFromProgress(-1)).toBe(0)
    expect(activeIndexFromProgress(2)).toBe(2)
  })
})

describe('dwellCenter', () => {
  it('returns the three dwell centers', () => {
    expect(dwellCenter(0)).toBe(0.10)
    expect(dwellCenter(1)).toBe(0.50)
    expect(dwellCenter(2)).toBe(0.90)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/why-us-slide.test.ts`
Expected: FAIL — "Cannot find module './why-us-slide'" / functions not defined.

- [ ] **Step 3: Write the implementation**

```ts
// components/sections/why-us-slide.ts
// Pure scroll math for the Why-Us pinned horizontal card-slide. No React, no
// DOM — keeps the slide windows unit-testable in isolation (mirrors
// services-scroll.ts). x = translateX % for a card: 100 = off to the right,
// 0 = fully covering the stack.

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const smoothstep = (t: number) => t * t * (3 - 2 * t)

// Progress window each card slides in over. Card 0 is the back of the stack
// (always covering). Cards 1 and 2 slide in from the right.
const WINDOWS: Array<[number, number] | null> = [null, [0.20, 0.45], [0.55, 0.80]]

export function cardXForProgress(index: number, p: number): number {
  const win = WINDOWS[index]
  if (!win) return 0
  const [start, end] = win
  const t = clamp((clamp(p, 0, 1) - start) / (end - start), 0, 1)
  return (1 - smoothstep(t)) * 100
}

// Active pillar (drives the nav highlight) for progress p across 3 reasons.
export function activeIndexFromProgress(p: number): number {
  const c = clamp(p, 0, 1)
  if (c < 0.33) return 0
  if (c < 0.67) return 1
  return 2
}

// Scroll dwell-center (fraction of the stage) a pillar button jumps to.
export function dwellCenter(index: number): number {
  return [0.10, 0.50, 0.90][clamp(index, 0, 2)]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/sections/why-us-slide.test.ts`
Expected: PASS (all cases).

- [ ] **Step 5: Commit**

```bash
git add components/sections/why-us-slide.ts components/sections/why-us-slide.test.ts
git commit -m "feat(why-us): pure scroll math for the card-slide (tested)"
```

---

### Task 2: Shared data module (`why-us-data.ts`)

**Files:**
- Create: `components/sections/why-us-data.ts`

Extract the three reasons + the external-link helper from the current `why-us.tsx` verbatim (locked A3 copy + real client links). Both the slider and the static fallback consume this.

- [ ] **Step 1: Create the data module (copy the current `reasons` + `ext` verbatim)**

```tsx
// components/sections/why-us-data.ts
import type { ReactNode } from 'react'

export const ext = (label: string, href: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-brand underline decoration-brand/40 decoration-1 underline-offset-[3px]"
  >
    {label}
  </a>
)

export type Reason = { tag: string; image: string; title: string; body: ReactNode }

export const reasons: Reason[] = [
  {
    tag: 'Speed',
    image: '/whyus/speed.webp',
    title: 'First working version in weeks',
    body: (
      <>
        Lean senior team, no account-manager layer. {ext('AbsolveMe', 'https://www.absolveme.ai/')} needed its launch site live before the liquidity window closed. Site, content, and design support shipped in 2 days. The Solana–NEAR cross-chain layer followed in 5 more.
      </>
    ),
  },
  {
    tag: 'Product thinking',
    image: '/whyus/product-thinking.webp',
    title: 'We stress-test the brief before we build',
    body: (
      <>
        Spec gaps get named. Simpler approaches get raised. {ext('SunsetML', 'https://www.sunsetml.com/')} came to us with an AI writing-tool concept. We iterated the architecture with the founder across multiple planning rounds, and stayed on as equity co-founders.
      </>
    ),
  },
  {
    tag: 'Niche depth',
    image: '/whyus/niche-depth.webp',
    title: 'Multichain Web3 and production-grade AI agents',
    body: (
      <>
        Smart contracts shipped on Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, and Avalanche, including {ext('OrbitXPay', 'https://orbitxpay.com/')}&rsquo;s DeFi-banking module with multi-layer orchestration. AI agent orchestration in production at {ext('SunsetML', 'https://www.sunsetml.com/')} and {ext('PredictRAM', 'https://predictram.com/')}.
      </>
    ),
  },
]

// One-line sr-only lede, kept crawlable (SEO/AEO) though dropped from the
// visible header. Verbatim from the prior visible lede.
export const LEDE =
  'Founders pick Metaborong over larger Web3 and AI agencies for three reasons: shorter time to a first working version, sharper push-back on the brief, and the specialist depth — multichain protocols and AI agent orchestration — most studios don’t have.'
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: clean (no errors). Note: `.ts` with JSX requires the file to be `.tsx`. **Rename to `why-us-data.tsx`** if tsc complains about JSX in `.ts` (it will — the `ext` helper returns JSX). Use `why-us-data.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/why-us-data.tsx
git commit -m "feat(why-us): extract reasons + lede into a shared data module"
```

---

### Task 3: Client pin component (`why-us-slider.tsx`)

**Files:**
- Create: `components/sections/why-us-slider.tsx`
- Test: `components/sections/why-us-slider.test.tsx` (SSR/a11y smoke, happy-dom)

The pin: 320vh outer → sticky `calc(100svh-56px)` frame, `grid-rows-[auto_1fr_auto]` (header / card stack / pillar nav). Cards are absolutely positioned, `transform: translateX(var(--x))`, no transition on transform (scrub is 1:1 with scroll). `useScroll` updates `--x` imperatively + sets active index. Gated behind `useReducedMotion()` and `<lg` → `<WhyUsStatic>`.

- [ ] **Step 1: Write the SSR/a11y smoke test (happy-dom)**

```tsx
// components/sections/why-us-slider.test.tsx
// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { WhyUsSlider } from './why-us-slider'

// motion/react hooks need a minimal stub in jsdom/happy-dom.
vi.mock('motion/react', () => ({
  useScroll: () => ({ scrollYProgress: { on: () => () => {}, get: () => 0 } }),
  useMotionValueEvent: () => {},
  useReducedMotion: () => false,
}))
// ClutchWidget pulls next/script; stub it to a placeholder.
vi.mock('./clutch-widget', () => ({ ClutchWidget: () => <div data-testid="clutch" /> }))

describe('WhyUsSlider', () => {
  it('renders all three reasons content server-side (crawlable)', () => {
    const { getAllByText, getByText } = render(<WhyUsSlider />)
    expect(getByText('First working version in weeks')).toBeTruthy()
    expect(getByText('We stress-test the brief before we build')).toBeTruthy()
    expect(getByText('Multichain Web3 and production-grade AI agents')).toBeTruthy()
    // pillar nav buttons present and keyboard-operable
    expect(getAllByText('Product thinking').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run components/sections/why-us-slider.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/why-us-slider.tsx
'use client'

import { useRef, useState } from 'react'
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

function Header({ active }: { active?: number }) {
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
        <div className="mx-auto max-w-[1280px] flex flex-col gap-[32px]">
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
              <Header active={active} />

              {/* Card stack */}
              <div className="relative min-h-0 overflow-hidden border border-border">
                {reasons.map((r, i) => (
                  <article
                    key={r.tag}
                    ref={cardRefs[i]}
                    className="why-card absolute inset-0 bg-bg"
                    data-active={i === active}
                    style={{ ['--x' as string]: i === 0 ? '0%' : '100%', zIndex: i + 1 }}
                  >
                    <CardInner r={r} i={i} />
                  </article>
                ))}
              </div>

              {/* Pillar nav */}
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
```

- [ ] **Step 4: Run the smoke test to verify it passes**

Run: `npx vitest run components/sections/why-us-slider.test.tsx`
Expected: PASS — all three titles render server-side; pillar buttons present.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean. (If the `['--x' as string]` inline CSS-var cast errors, use `as React.CSSProperties` on the `style` object.)

- [ ] **Step 6: Commit**

```bash
git add components/sections/why-us-slider.tsx components/sections/why-us-slider.test.tsx
git commit -m "feat(why-us): pinned horizontal card-slide client component"
```

---

### Task 4: Server shell rewrite (`why-us.tsx`) + crawlable lede

**Files:**
- Modify (rewrite): `components/sections/why-us.tsx`
- Verify: `app/page.tsx` (call site `<WhyUsSection />` unchanged; Work already precedes Why-Us)

Replace the entire static grid implementation. The shell stays a Server Component: it renders the `sr-only` lede (crawlable, SEO-safe) + the `sr-only` Clutch rating line (the existing crawlable-proof pattern), then mounts the client slider. The slider SSRs its own card text, so no other crawlable duplication is needed.

- [ ] **Step 1: Rewrite `why-us.tsx`**

```tsx
// components/sections/why-us.tsx
import { clutchProfileUrl } from '@/lib/links'
import { WhyUsSlider } from '@/components/sections/why-us-slider'
import { LEDE } from '@/components/sections/why-us-data'

export function WhyUsSection() {
  return (
    <section id="why-us" aria-labelledby="why-us-heading" className="bg-bg">
      <h2 id="why-us-heading" className="sr-only">Why founders choose Metaborong</h2>
      {/* Crawlable summary (visible lede dropped for the single-viewport pin). */}
      <p className="sr-only">{LEDE}</p>
      <a href={clutchProfileUrl} target="_blank" rel="noopener noreferrer" className="sr-only">
        Metaborong is rated 4.9 out of 5 on Clutch
      </a>
      <WhyUsSlider />
    </section>
  )
}
```

- [ ] **Step 2: Confirm the call site and anchor**

Run: `grep -n "WhyUsSection\|id=\"why-us\"\|id=\"work\"" app/page.tsx components/sections/why-us.tsx`
Expected: `app/page.tsx` imports + renders `<WhyUsSection />` after `<WorkPreviewSection />` and the `AsciiSeam seed={1}`; `why-us.tsx` now owns `id="why-us"`. No `app/page.tsx` edit needed (the Work→Why-Us order + seam are already in place from `1f1ed23`). If a stray `#why-us` anchor `<span>` exists in `app/page.tsx`, leave it (harmless) or remove only if duplicated.

- [ ] **Step 3: Typecheck + run the full suite**

Run: `npx tsc --noEmit && npx vitest run components/sections/why-us-slide.test.ts components/sections/why-us-slider.test.tsx`
Expected: tsc clean; tests PASS.

- [ ] **Step 4: Commit**

```bash
git add components/sections/why-us.tsx
git commit -m "feat(why-us): server shell with sr-only lede; mount the slider"
```

---

### Task 5: Live verification, single-viewport fit, impeccable layout + polish

**Files:**
- Tune (as needed): `components/sections/why-us-slider.tsx`

Build correctness is structural; this task is the **premium-finish + verification** pass the user mandated (`impeccable layout` then `impeccable polish`) plus the agent-browser self-check across every state. No new files; only spacing/finish tuning in the slider, each change re-verified live.

- [ ] **Step 1: Serve + capture the three slide states (desktop)**

The dev server runs on :3000. With agent-browser, set `mb_consent=accepted`, then for each card scroll to its dwell center within the 320vh stage and screenshot to `./screenshots/`:
```
agent-browser open "http://localhost:3000/" && agent-browser eval 'document.cookie="mb_consent=accepted; path=/"' && agent-browser open "http://localhost:3000/" && agent-browser wait --load networkidle && agent-browser wait 800
```
Then locate `[data-whyus-anchor]` top + height via `getBoundingClientRect().top + scrollY`, and `window.scrollTo(0, top + height*dwell - innerHeight/2)` for dwell ∈ {0.10, 0.50, 0.90}; screenshot each. Confirm: card 1 covers at dwell 0.10; card 2 has slid over by dwell 0.50; card 3 by dwell 0.90; active pillar highlight matches; eyebrow sits above H2; Clutch badge + chips in the header; webp crisp (never upscaled past 800px).

- [ ] **Step 2: Single-viewport fit (Playwright matrix)**

Write a one-off `@playwright/test` script (cookie `mb_consent=accepted`, `waitForSelector('[data-whyus-anchor]')`) at widths 1024/1280/1440/1920 × heights 768/800/900/1080. Assert the sticky frame's `scrollHeight <= clientHeight` (no internal overflow) and that the pillar nav + header are not clipped. If a tall header (H2 at clamp max + eyebrow) overflows the shortest viewport, reduce the H2 clamp max (e.g. 48→44) and re-verify; if it still conflicts, log a single-viewport H2 deviation in the section spec (the Services precedent).

- [ ] **Step 3: Reduced-motion + mobile fallback**

Playwright with `reducedMotion: 'reduce'` (desktop width): assert `[data-whyus-anchor]` is **absent** and the three reason titles render in a static stack. At 390px width: assert the static stack renders, pillar nav hidden, webp above text, all card text present. Screenshot both to `./screenshots/`.

- [ ] **Step 4: `impeccable layout` then `impeccable polish`**

Run `impeccable layout` on the slider (spacing rhythm, header/card/nav balance, whitespace consistency vs the Services pin and the canonical edge chain), apply, re-verify live. Then `impeccable polish` (final craft: card seams, tag/tick treatment, pillar-nav active finish, type hierarchy). Keep all values token-driven; honor the bans (no side-stripe borders — the pillar active uses an inset top box-shadow, not a left stripe; no gradient text). Re-screenshot after changes.

- [ ] **Step 5: Full gate**

Run: `npx tsc --noEmit && npx vitest run components/sections/why-us-slide.test.ts components/sections/why-us-slider.test.tsx && npx eslint components/sections/why-us.tsx components/sections/why-us-slider.tsx components/sections/why-us-slide.ts components/sections/why-us-data.tsx`
Expected: tsc clean; tests PASS; lint clean (or only pre-existing nits, noted).

- [ ] **Step 6: Commit**

```bash
git add components/sections/why-us-slider.tsx
git commit -m "style(why-us): impeccable layout + polish pass; single-viewport fit verified"
```

---

### Task 6: Delete the retired assets reference + graduate

**Files:**
- Modify: `DESIGN.md`, `CHANGELOG.md`, `docs/superpowers/specs/2026-05-24-section-why-us.md`

The `whyus/*.webp` files **stay** (we kept them by decision). Graduation only updates docs.

- [ ] **Step 1: DESIGN.md — Motion/pin entry + Decisions Log**

Add a "Pin 2 — Why-Us (shipped 2026-05-24)" paragraph under the Scroll-driven layer section (mirror the "Pin 1 — Services" entry): 320vh horizontal card-slide, `motion` `useScroll` → per-card `translateX` via CSS var (imperative, no re-render), active pillar discrete state, reduced-motion/`<lg` → static stack. Note the **anchor-#06 deviation** (retained iso raster, user-accepted) here and in a new Decisions Log row dated 2026-05-24. Confirm the pin budget note now reads "2 of 2 used (Services, Why-Us)".

- [ ] **Step 2: CHANGELOG.md — Section 5 entry**

Add a `## 2026-05-24 — Section 5: Why-Us (A1 rebuild)` block above the Section 4 entry: card-slide rebuild, kept iso webp (deviation), eyebrow-above-H2, Clutch badge + chips, lede→sr-only, brand-blue active nav, reduced-motion/mobile static stack, tests + agent-browser verification, impeccable layout+polish. List commits.

- [ ] **Step 3: Spec — confirm the Deviations section reflects shipped reality**

If Step 2 of Task 5 logged an H2 single-viewport deviation, ensure it's recorded in the spec's "Deviations from master plan".

- [ ] **Step 4: Commit**

```bash
git add DESIGN.md CHANGELOG.md docs/superpowers/specs/2026-05-24-section-why-us.md
git commit -m "docs(why-us): graduate Section 5 — pin entry, deviations, changelog"
```

---

## Self-Review

**Spec coverage:** imagery=keep webp (T2,3,4 CardInner img + Task 6 deviation log) ✓; 320vh/100vh pin (T3) ✓; eyebrow-above-H2 (T3 Header) ✓; Clutch badge kept (T3) ✓; lede sr-only (T2 LEDE + T4 shell) ✓; stat chips in header (T3) ✓; rich card bodies kept (T2) ✓; brand-blue active accent (T3 ScopedStyle) ✓; server/client/pure-module split (T1–T4) ✓; reduced-motion + mobile static (T3 + T5 Step 3) ✓; whitespace/edge-chain consistency (T3 px chain + T5 layout) ✓; single-viewport budget (T5 Step 2) ✓; a11y/SSR crawlable (T3 SSR + T4 sr-only + T3 buttons/focus-visible) ✓; impeccable layout+polish (T5) ✓; agent-browser review before shipped (T5) ✓; deviation logged (T6) ✓.

**Placeholder scan:** No TBD/TODO; every code step has full code; commands have expected output.

**Type consistency:** `cardXForProgress(index,p)`, `activeIndexFromProgress(p)`, `dwellCenter(index)` used identically in T1 + T3. `reasons`/`Reason`/`LEDE`/`ext` defined in T2, consumed in T3/T4. `WhyUsSlider`/`WhyUsStatic`/`Header`/`CardInner` consistent within T3. `data-whyus-anchor` set in T3, queried in T5. Note flagged: `why-us-data` must be `.tsx` (JSX) — imports in T3/T4 use the extensionless `@/components/sections/why-us-data` path, which resolves to `.tsx`.
