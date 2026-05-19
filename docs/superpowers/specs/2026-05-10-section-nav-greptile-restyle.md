# Section Spec — Nav restyle (greptile-inspired)

- **Date:** 2026-05-10
- **Section:** `components/layout/nav.tsx`
- **Reference:** https://www.greptile.com/ (analyzed live 2026-05-10 via agent-browser)
- **Master spec:** `DESIGN.md`
- **Authority:** locked intent for the nav signature pass; archive on completion.

## Intent

One sentence: bring the nav into the **Bauhaus-restraint, technical-blueprint** posture
already locked in `DESIGN.md` by adopting greptile.com's two structural ideas — an
off-white surface with a dashed bottom border, and a flat full-width mega-menu in place
of the floating dropdown card — without changing typography or CTA cardinality.

## What stays

- **Type:** nav links remain Satoshi sentence-case (no mono uppercase). Current
  `text-sm tracking-[-0.01em] text-gray hover:text-dark` rule is unchanged.
- **CTAs:** one primary `<Button arrow="→">Let's Talk</Button>` on the right. No
  secondary CTA, no sign-up button.
- **Logo:** `<Logo size="sm" />` on the far left, unchanged.
- **Sticky behavior:** fixed top, full-width.
- **Dropdown trigger label + chevron:** `Services ▾` with chevron rotation on open.
- **Esc-to-close + outside-click-to-close** on dropdown and mobile menu.
- **Mobile hamburger** position and toggle pattern.

## Trigger interaction model

- **Click-to-toggle, click-outside-to-close.** No hover-open.
  Rationale: a flush full-width strip would cover the top ~280px of the hero on
  every accidental cursor sweep across "Services". Drop the existing
  `onMouseEnter/onMouseLeave` handlers.
- Hover on the trigger still applies color shift + underline grow (existing
  pattern). Open requires explicit click.
- Esc closes; click outside the strip closes; click trigger again closes.

## Breakpoints

- Whole desktop nav (links, dropdown trigger, CTA) renders at **`lg:`** and up.
  Below `lg`, only logo + hamburger render, mobile menu handles all nav content.
  Replaces the current `md:flex` / `md:hidden` split.
- Matches greptile's `lg:flex` pattern and removes the undefined 768–1023px
  middle state for the mega-menu.

## What changes

### 1. Surface + border (deviation — see Deviations log)

- **At-top and scrolled state are identical.** Single visual state, not a scroll-toggle.
- Background: `var(--color-bg-subtle)` (`#f5f7ff`).
  - Reverts the current `bg-white/95` + `bg-white/80` scroll-state pair.
  - Removes `backdrop-blur-md` (no glass — flat fill matches greptile + Bauhaus posture).
- Bottom border: **1px dashed** in `var(--color-border)` (`#e5e7eb`), always on.
  - Replaces `border-b border-border shadow-[var(--shadow-sm)]` (drops the shadow too).
- No box-shadow at any state.
- Height stays `h-14` (56px).

### 2. Services dropdown → full-width mega-menu

- Trigger element unchanged (`Services ▾`, hover + click open).
- On open, panel renders as a **full-width strip beneath the nav bar**, not a floating
  300px card.
- Strip:
  - `position: absolute`, `left-0 right-0 top-full`.
  - Background `var(--color-bg)` (`#ffffff`), border-bottom 1px dashed
    `var(--color-border)` (matches nav's border treatment).
  - Padding mirrors nav horizontal padding: `px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px]`.
  - Vertical padding `py-[32px]` (`space.6`).
- Layout: 3-column grid, `grid-cols-3 gap-[48px]` (`space.7`).
- Each column:
  - Top: pillar marker matching the **services-trefoil tab pattern**
    (`services-trefoil.tsx:311-312`): mono number (`01`, `02`, `03`) in
    `var(--color-gray)` + a small colored dot in the pillar's hue. Identical
    grammar; reused so the mega-menu reads as the same vocabulary as the trefoil.
    - **Pulsating dot.** Unlike the trefoil's static dot, the mega-menu dot
      pulses continuously — opacity 1 → 0.4 → 1 over 1800ms ease-in-out, infinite.
      Subtle (low-contrast amplitude); reads as a "live" telemetry indicator,
      consistent with the technical-blueprint posture. Logged as a 4th approved
      infinite animation in Deviations.
    - **Primitive change required:** extend `components/ui/eyebrow.tsx` with a
      `tone?: 'default' | PillarId` prop (default unchanged) for the number text
      tone (kept gray for now — pillar tinting moves to the dot, not the text).
      Default behavior preserved for all current consumers. Add to DESIGN.md
      primitives table on graduate.
  - H3 (pillar name) — Satoshi 20px / weight 700 / tracking `-0.025em` per
    `font.size.h3`, in `var(--color-dark)`.
  - One-line lede in `var(--color-gray)` at `font.size.sm` (14px).
  - 3–5 child links per column (from `services-data.ts`) at `font.size.sm`,
    `text-gray` → `text-dark` on hover. Stack vertically with `gap-[8px]`.
  - Bottom CTA: `<a href="/services/<pillar>/">All <pillar> services →</a>` in
    pillar hue at `font.size.xs` mono.
- **No bottom "Explore all services" row.** The per-column hub CTAs already cover
  this; a global row is redundant chrome.
- **No card chrome:** no rounded panel, no shadow, no border around the strip itself
  beyond the bottom dashed line.
- **No animated arrow** on enter (`absolute left-[18px] top-[7px] rotate-45` chevron
  artifact deleted) — flat strip, no pointer mark.

### 3. Mobile

- Hamburger pattern unchanged.
- Open menu surface: switch from current `bg-white` panel to **same off-white
  `var(--color-bg-subtle)`** for parity. Top border **1px solid** `var(--color-border)`
  (not dashed — at sub-pixel mobile DPRs and 3:1 contrast the dashes vanish or anti-alias
  to a 0.5px line; documented as intentional asymmetry in Deviations).
- Pillar list inside mobile menu becomes the mega-menu collapsed:
  - Each pillar gets its own block: pillar number eyebrow (tinted) + H3 name + 1-line
    lede + child link list (vertical stack, `font.size.sm`).
  - Separator between pillars: 1px dashed.
- Nav links (`Work / Team / FAQ`) stay as a separate group below.
- "Let's Talk" CTA stays at bottom.

## Tokens used (no new tokens)

- Surface: `--color-bg-subtle` (`#f5f7ff`)
- Border: `--color-border` (`#e5e7eb`) — applied dashed via `border-dashed`
- Brand hues: `--color-brand`, `--color-ai`, `--color-accent` (already in
  `services-data.ts`)
- Type: existing scale — `font.size.sm`, `font.size.xs`, `font.size.h3`, eyebrow rule
- Motion: `--duration-instant` for color transitions, `--duration-fast` for chevron
  rotation. Mega-menu opens with the same `--duration-fast` opacity 0→1 (no slide).

## Animation

Same grammar as the current dropdown — IO-gated nothing (nav is always-mounted). On
open: opacity 0→1 over `--duration-fast` (250ms). Reduced-motion: instant swap. No
infinite animations, no per-row stagger (drops the existing `animationDelay` per row,
which was a card-specific affordance not needed in a flat strip).

## ARIA

- Trigger: `aria-haspopup="menu"`, `aria-expanded={open}`, `aria-controls="mega-services"`.
- Strip: `role="menu"`, `id="mega-services"`.
- Each child link: `role="menuitem"`.
- Pillar headings: `role="presentation"` on the H3 (purely structural inside menu).
- Keyboard: Tab cycles through child links; Esc closes; arrow keys not required (not a
  combobox).

## Acceptance criteria

- [ ] Nav bg is `--color-bg-subtle` always; no scroll-state visual change.
- [ ] Bottom border is 1px dashed `--color-border` always.
- [ ] No `backdrop-blur` anywhere on `<header>`.
- [ ] No box-shadow anywhere on `<header>` or mega-menu.
- [ ] Services dropdown is a full-width strip, not a floating card.
- [ ] Mega-menu uses 3 equal columns at `lg+`; child links visible without further
      interaction.
- [ ] Pillar number eyebrows are tinted in pillar hue (web3=brand, ai=#10b981,
      product=#F6851B).
- [ ] Mobile menu surface matches nav (off-white + dashed top border).
- [ ] Single `<Button>` CTA in nav is the split-arrow primary.
- [ ] Focus-visible ring renders on every interactive element (global rule).
- [ ] `prefers-reduced-motion: reduce` short-circuits the open animation.
- [ ] Typecheck + build clean.
- [ ] No raw hex outside the pillar hue mapping that already lives in `services-data.ts`.

## Deviations from master plan

1. **Dashed bottom border on the nav and mega-menu strip (desktop only).**
   Rationale: technical-blueprint posture borrowed from greptile.com — solid 1px reads
   as standard SaaS chrome; dashed reads as engineering schematic, consistent with the
   trefoil's hub-and-spoke aesthetic. Visual decoration only; no semantic meaning.
   Honors hard constraints: contrast (border color unchanged), reduced-motion (static),
   focus-visible (unchanged).
   **Mobile keeps solid 1px** because dashed sub-pixel borders disappear or anti-alias
   to a half-line at typical mobile DPRs — the dashed signal would be invisible. Logged
   as intentional asymmetry, not a drift.
2. **Pulsating mega-menu pillar dot — 4th approved infinite animation.**
   DESIGN.md restricts infinite animations to three exceptions (trust-bar marquee,
   orb HUD blink, hero scroll-cue bounce). The mega-menu pillar dot adds a fourth:
   a 1800ms ease-in-out opacity pulse (1 → 0.4 → 1, infinite). Rationale: dot reads
   as a live telemetry indicator under the pillar number, reinforcing the
   technical-blueprint / engineering-instrument posture. Subtle amplitude — does
   not draw attention or compete with content. Honors `prefers-reduced-motion`
   (animation short-circuited to opacity 1). Folds into DESIGN.md core motion
   exceptions list on graduate.
3. **Mega-menu strip replaces floating card.** Not a global pattern — nav-only.
   Rationale: a floating 300px card sits awkwardly under a flat-fill nav and re-introduces
   shadow/elevation we explicitly dropped. A flush full-width strip preserves the
   Bauhaus restraint and gives the dropdown more room to expose child links (better SEO
   visibility in DOM than the current sub/icon row).
4. **Content capped to `max-w-[1280px]` + 16px mobile base (2026-05-19 graduate).**
   Supersedes this spec's full-width-content / 24px-mobile-base detail. The nav bar,
   the mega-menu columns, and the mobile menu now sit inside the canonical `<Section>`
   grid: `max-w-[1280px]` within the `px-[16px] sm:px-[24px] md:px-[48px] lg:px-[96px]
   xl:px-[128px]` chain. The `<header>` background/borders and the mega-menu **strip
   surface** stay full-bleed (`absolute inset-x-0`), so the "full-width strip, not a
   floating card" signature (#3) is preserved — only the *content* is constrained.
   Rationale: left/right negative space is now identical across nav, hero, and every
   page section at 1440/1280/375; mobile gutter unified to 16px. Shipped on
   `design-revamp`.

Both will be folded into `DESIGN.md` after the section ships, per the Graduate step in
`SESSIONS.md`.

## Out of scope

- Adding a second CTA (sign-up, demo, etc.) — single CTA stays.
- Mono uppercase nav-link typography — Satoshi sentence-case stays.
- Resources / Blog / Docs dropdowns — we don't have the content.
- Scroll-state visual changes (we explicitly remove the existing scroll toggle).
- Color-mode / dark-mode handling — site is light-only per `DESIGN.md`.
