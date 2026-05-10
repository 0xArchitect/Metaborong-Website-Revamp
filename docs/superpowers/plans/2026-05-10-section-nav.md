# Nav restyle (greptile-inspired) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle `components/layout/nav.tsx` to a flat off-white surface + dashed bottom border + full-width 3-column mega-menu strip, per `docs/superpowers/specs/2026-05-10-section-nav-greptile-restyle.md`.

**Architecture:** Two file touches — extend `<Eyebrow>` with a pillar-tone prop, then rewrite `nav.tsx` end-to-end (single client component, no new files). Mega-menu is a sibling of the nav bar (`<header>` wraps both) so it can render full-width while the nav bar stays inside the padded row. Click-to-toggle interaction (no hover-open). Single `lg:` breakpoint splits desktop / mobile.

**Tech Stack:** Next.js 16 / React 19 / TypeScript / Tailwind v4 / lucide-react. No new dependencies.

**Verification posture:** No unit tests for nav — there are none today and the changes are purely visual/structural. Verification is `pnpm tsc --noEmit` + `pnpm build` + manual browser QA via `agent-browser` at desktop + mobile widths. Matches Session 7/10 verification pattern in `CHANGELOG.md`.

---

## Task 1: Extend `<Eyebrow>` with pillar-tone prop

**Files:**
- Modify: `components/ui/eyebrow.tsx`

The mega-menu needs pillar-tinted numbered eyebrows (`01 / 03` in brand-blue, etc.). Eyebrow is hardcoded to `text-gray-light` today. Add a `tone` prop typed against `services-data.ts` `PillarId` plus `'default'`. No other consumers change.

The pillar tone here is for the *number text* (kept gray-light by default; the consumer can elevate to a pillar hue if needed). Pillar tinting in the mega-menu actually lands on the colored dot, not the text — but adding the prop as a typed extension matches what's specified in the spec and keeps Eyebrow flexible for future use.

- [ ] **Step 1: Replace the file with the extended version**

```tsx
import { type HTMLAttributes } from 'react'
import { type PillarId } from '@/components/sections/services-data'

type EyebrowTone = 'default' | PillarId

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'div' | 'p'
  tone?: EyebrowTone
}

const toneClass: Record<EyebrowTone, string> = {
  'default':        'text-gray-light',
  'web3':           'text-brand',
  'ai-agents':      'text-[#10b981]',
  'product-studio': 'text-[#F6851B]',
}

export function Eyebrow({
  as: Tag = 'span',
  tone = 'default',
  className = '',
  children,
  ...props
}: EyebrowProps) {
  return (
    <Tag
      className={`text-[11px] font-bold uppercase tracking-[0.1em] leading-none ${toneClass[tone]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
```

- [ ] **Step 2: Verify typecheck — no consumer regressions**

Run: `pnpm tsc --noEmit`
Expected: PASS. The `tone` prop is optional with `'default'` fallback, so every existing call site (services-trefoil.tsx, services.tsx, etc.) keeps the gray-light tone unchanged.

---

## Task 2: Rewrite `nav.tsx` — flat surface, mega-menu strip, lg: breakpoint

**Files:**
- Modify: `components/layout/nav.tsx` (full rewrite — delete current contents, replace with below)

Current file imports `Boxes, ChevronDown, Layers, Menu, Sparkles, X, ArrowRight` from lucide-react. We drop the per-icon pillar mapping (mega-menu has no icons) and the `Boxes / Layers / Sparkles` imports. Keep `ChevronDown, Menu, X, ArrowRight`.

The `<header>` becomes a 2-row flex container — nav bar row + mega-menu strip — so the strip can span full width without being clipped by the nav bar's padded row.

- [ ] **Step 1: Replace the file**

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { pillars } from '@/components/sections/services-data'

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Team', href: '/#founders' },
  { label: 'FAQ',  href: '/#faq' },
]

export function Nav() {
  const [megaOpen, setMegaOpen]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Esc closes mega-menu + mobile menu
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [megaOpen, mobileOpen])

  // Click outside <header> closes mega-menu
  useEffect(() => {
    if (!megaOpen) return
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [megaOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-bg-subtle border-b border-dashed border-border"
    >
      {/* Nav bar row */}
      <nav className="flex h-14 w-full items-center gap-[32px] px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px]">
        <Logo size="sm" />

        {/* Desktop: links + dropdown trigger (lg+) */}
        <div className="hidden lg:flex flex-1 items-center gap-[24px]">
          <button
            type="button"
            aria-expanded={megaOpen}
            aria-haspopup="menu"
            aria-controls="mega-services"
            data-active={megaOpen}
            onClick={() => setMegaOpen(v => !v)}
            className="relative flex cursor-pointer items-center gap-[4px] border-0 bg-transparent p-0 text-sm tracking-[-0.01em] text-gray transition-colors duration-[var(--duration-instant)] hover:text-dark data-[active=true]:text-dark after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-0 after:bg-brand after:transition-[width] after:duration-[var(--duration-fast)] hover:after:w-full data-[active=true]:after:w-full"
          >
            Services
            <ChevronDown
              size={14}
              className={`transition-transform duration-[var(--duration-instant)] ${megaOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm tracking-[-0.01em] text-gray no-underline transition-colors duration-[var(--duration-instant)] hover:text-dark after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-0 after:bg-brand after:transition-[width] after:duration-[var(--duration-fast)] hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA (lg+) */}
        <div className="hidden lg:inline-flex">
          <Button href="/#contact" size="sm" arrow="→">Let&apos;s Talk</Button>
        </div>

        {/* Mobile hamburger (<lg) */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          className="ml-auto cursor-pointer border-0 bg-transparent p-[4px] text-gray transition-colors duration-[var(--duration-instant)] hover:text-dark lg:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Desktop mega-menu strip (full-width, lg+) */}
      {megaOpen && (
        <div
          id="mega-services"
          role="menu"
          className="hidden lg:block absolute inset-x-0 top-full bg-white border-b border-dashed border-border animate-[mega-in_var(--duration-fast)_ease-out_forwards] motion-reduce:animate-none"
        >
          <div className="grid grid-cols-3 gap-[48px] px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px] py-[32px]">
            {pillars.map((p, i) => (
              <div key={p.id}>
                <div className="flex items-center gap-[10px]">
                  <span className="text-[13px] font-mono text-gray tabular-nums">{p.num}</span>
                  <span
                    aria-hidden="true"
                    className="w-[8px] h-[8px] rounded-full animate-[nav-dot-pulse_1800ms_ease-in-out_infinite] motion-reduce:animate-none"
                    style={{ background: p.color }}
                  />
                </div>
                <h3
                  role="presentation"
                  className="mt-[12px] text-[20px] font-bold tracking-[-0.025em] leading-[1.2] text-dark"
                >
                  {p.label}
                </h3>
                <p className="mt-[6px] text-sm leading-[1.5] text-gray">{p.headline}</p>

                <ul className="mt-[16px] flex flex-col gap-[8px]">
                  {p.children.slice(0, 5).map(c => (
                    <li key={c.slug}>
                      <a
                        href={`/services/${p.id}/${c.slug}/`}
                        role="menuitem"
                        onClick={() => setMegaOpen(false)}
                        className="text-sm text-gray no-underline transition-colors duration-[var(--duration-instant)] hover:text-dark"
                      >
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href={p.hubHref}
                  role="menuitem"
                  onClick={() => setMegaOpen(false)}
                  style={{ color: p.color }}
                  className="mt-[20px] inline-flex items-center gap-[4px] font-mono text-[11px] uppercase tracking-[0.1em] no-underline group"
                >
                  All {p.hubCta}
                  <ArrowRight size={12} className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-[2px]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu (<lg) */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-bg-subtle border-t border-border px-[24px] md:px-[48px] py-[24px] flex flex-col gap-[24px]"
        >
          {/* Pillar blocks */}
          {pillars.map((p, i) => (
            <div
              key={p.id}
              className={i > 0 ? 'pt-[24px] border-t border-dashed border-border' : ''}
            >
              <div className="flex items-center gap-[10px]">
                <span className="text-[13px] font-mono text-gray tabular-nums">{p.num}</span>
                <span
                  aria-hidden="true"
                  className="w-[8px] h-[8px] rounded-full animate-[nav-dot-pulse_1800ms_ease-in-out_infinite] motion-reduce:animate-none"
                  style={{ background: p.color }}
                />
              </div>
              <h3 className="mt-[10px] text-[18px] font-bold tracking-[-0.025em] leading-[1.2] text-dark">
                {p.label}
              </h3>
              <p className="mt-[4px] text-sm leading-[1.5] text-gray">{p.headline}</p>

              <ul className="mt-[12px] flex flex-col gap-[8px]">
                {p.children.slice(0, 5).map(c => (
                  <li key={c.slug}>
                    <a
                      href={`/services/${p.id}/${c.slug}/`}
                      onClick={closeMobile}
                      className="text-sm text-gray no-underline"
                    >
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={p.hubHref}
                onClick={closeMobile}
                style={{ color: p.color }}
                className="mt-[12px] inline-flex items-center gap-[4px] font-mono text-[11px] uppercase tracking-[0.1em] no-underline"
              >
                All {p.hubCta} <ArrowRight size={12} />
              </a>
            </div>
          ))}

          {/* Nav links group */}
          <div className="pt-[24px] border-t border-dashed border-border flex flex-col gap-[12px]">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="text-sm text-gray no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div>
            <Button href="/#contact" size="sm" arrow="→">Let&apos;s Talk</Button>
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Add the `mega-in` keyframe to `app/globals.css`**

The mega-menu fade uses a one-shot keyframe (250ms opacity 0→1), in line with existing motion grammar (services trefoil, phrase-stamp). Add after the trust-bar marquee keyframes block.

Find the `@keyframes` block in `app/globals.css` (currently around the trust-bar marquee), and add:

```css
@keyframes mega-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes nav-dot-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
```

If either keyframe already exists, leave it.

---

## Task 3: Verification

- [ ] **Step 1: Typecheck**

Run: `pnpm tsc --noEmit`
Expected: PASS, no errors.

- [ ] **Step 2: Build**

Run: `pnpm build`
Expected: PASS. Note from CHANGELOG: prior builds were blocked by a missing `tw-animate-css` dependency in `globals.css`. If that's still the case, that's a pre-existing issue out of scope; typecheck-clean is sufficient and dev-server QA confirms runtime behavior.

- [ ] **Step 3: Dev server + visual QA via agent-browser**

```bash
pnpm dev
```

Then in a separate shell:

```bash
mkdir -p ./screenshots
agent-browser open http://localhost:3000 && agent-browser wait --load networkidle && agent-browser screenshot ./screenshots/nav-desktop-closed.png
```

Click the Services trigger and capture the open mega-menu:

```bash
agent-browser eval "document.querySelector('button[aria-controls=mega-services]').click()" && agent-browser wait 300 && agent-browser screenshot ./screenshots/nav-desktop-megaopen.png
```

- [ ] **Step 4: Verify each acceptance criterion against screenshots**

Visually confirm against `screenshots/nav-desktop-closed.png` and `screenshots/nav-desktop-megaopen.png`:

- [ ] Nav bg is off-white (`#f5f7ff`) at all scroll positions
- [ ] Bottom border is dashed
- [ ] No backdrop blur, no shadow
- [ ] Mega-menu is full-width strip (not floating card)
- [ ] 3 columns; each shows mono number (`01`, `02`, `03`) + colored dot (brand-blue / `#10b981` / `#F6851B`); dot pulses ~1.8s
- [ ] Pulse animation respects reduced-motion (no animation when emulated in DevTools)
- [ ] "Let's Talk" CTA is split-arrow primary
- [ ] Esc closes the mega-menu (test: open menu, press Esc, snapshot)
- [ ] Click outside closes the mega-menu (test: open menu, click on hero area, snapshot)

- [ ] **Step 5: Mobile QA**

Resize via DevTools or test at 375px directly. Cannot programmatically resize headless Chromium in agent-browser, so do visual check via `--headed`:

```bash
agent-browser --headed open http://localhost:3000
```

Then in DevTools, set viewport to 375×812. Click hamburger. Confirm:

- [ ] Hamburger appears, desktop links hidden
- [ ] Mobile menu surface is off-white, top border is **solid** (not dashed)
- [ ] Each pillar block shows: tinted number eyebrow + label + headline + child links + tinted "All X services →" CTA
- [ ] Pillar separators between blocks are dashed
- [ ] "Let's Talk" CTA at bottom is split-arrow primary

- [ ] **Step 6: Reduced-motion**

In DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Open mega-menu. Confirm: no fade animation; menu appears instantly.

- [ ] **Step 7: Close dev server, close agent-browser**

```bash
agent-browser close
# Ctrl+C the dev server
```

---

## Task 4: Commit

- [ ] **Step 1: Stage and commit**

```bash
git add components/ui/eyebrow.tsx components/layout/nav.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat(nav): flat off-white surface + dashed border + mega-menu strip

Restyles nav per docs/superpowers/specs/2026-05-10-section-nav-greptile-restyle.md.
Off-white surface with dashed bottom border, services dropdown becomes a flush
full-width 3-column mega-menu strip, click-to-toggle, single lg: breakpoint for
desktop/mobile split. Mobile menu picks up the off-white surface with a solid
top border (dashed sub-pixel borders are invisible at typical mobile DPRs).

Eyebrow primitive gains a `tone` prop typed against PillarId for pillar-tinted
numbered eyebrows (`01 / 03` etc.) in the mega-menu and mobile blocks.
EOF
)"
```

Do NOT update DESIGN.md or CHANGELOG.md in this commit — those are the Graduate step (handled separately after design-review on the live site).

---

## Self-Review

**Spec coverage check:**

| Spec section / acceptance criterion | Task |
|---|---|
| Off-white surface, no scroll-state | Task 2 — `bg-bg-subtle` always-on, no scroll listener |
| Dashed bottom border (desktop) | Task 2 — `border-b border-dashed border-border` on `<header>` |
| No backdrop-blur | Task 2 — removed |
| No box-shadow | Task 2 — removed |
| Full-width mega-menu strip | Task 2 — sibling of nav bar, `absolute inset-x-0` |
| 3-column grid | Task 2 — `grid-cols-3 gap-[48px]` |
| Pillar-tinted numbered eyebrows | Task 1 (primitive) + Task 2 (consumer) |
| H3 + lede + child links + hub CTA per column | Task 2 |
| No "Explore all services" bottom row | Task 2 — omitted |
| Click-to-toggle, no hover-open | Task 2 — `onClick` only, no mouse handlers |
| Esc closes; click-outside closes | Task 2 — two effects |
| Mobile off-white + solid top border | Task 2 — `bg-bg-subtle border-t border-border` (no `border-dashed` on top) |
| Mobile pillars w/ dashed separators | Task 2 — `border-t border-dashed border-border` between blocks |
| Single CTA `Let's Talk` split-arrow | Task 2 — unchanged |
| `lg:` breakpoint split | Task 2 — `hidden lg:flex` / `lg:hidden` throughout |
| ARIA: aria-haspopup, aria-expanded, aria-controls, role=menu, role=menuitem | Task 2 |
| Reduced-motion short-circuit | Task 2 — `motion-reduce:animate-none` |
| Open animation: opacity 0→1, 250ms | Task 2 + globals.css keyframe |
| No raw hex outside `services-data.ts` colors | Task 1 (Eyebrow) inlines `#10b981` and `#F6851B` because Tailwind v4 doesn't ship arbitrary `text-ai`/`text-accent` utilities; pillar.color used inline-style for hub CTAs (sourced from data) |
| Typecheck + build clean | Task 3 |

**Placeholder scan:** none.

**Type consistency:** `EyebrowTone = 'default' | PillarId` (`'web3' | 'ai-agents' | 'product-studio'`). All consumer `tone={p.id}` calls pass `PillarId` directly — type-safe. `ChildService.slug` used as URL segment matches the existing `app/services/[pillar]/[slug]/page.tsx` route pattern.

**Known minor deviations from spec text:**
- Spec example said `tone?: 'default' | 'web3' | 'ai' | 'product'`. Implemented as `'default' | PillarId` (i.e., `'web3' | 'ai-agents' | 'product-studio'`) for type-safety against the data source. No semantic difference.
- Spec said child links capped 3–5 per column; implemented as `slice(0, 5)` (Web3 has 7, AI has 6, Product Studio has 1 — Product Studio shows its single link, the others cap at 5). The hub CTA covers the rest.
