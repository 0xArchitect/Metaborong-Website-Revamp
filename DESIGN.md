# Design System — Metaborong Website

## Mission
Single source of truth for visual decisions on metaborong.com. Token-driven, extracted
from shipped state, optimized for consistency across sections built session-by-session.
Read this file before any UI change. If a section deviates, log it under
`docs/superpowers/specs/<date>-<section>.md` per the override rule below.

## Brand
- **Product:** Metaborong (metaborong.com)
- **Audience:** Web3 / AI / SaaS founders evaluating a senior dev studio
- **Surface:** Marketing site
- **Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4
- **Position:** Boutique studio between large agencies and freelancer marketplaces

## Aesthetic Direction
- **Direction:** Swiss-engineered modernism with technical/blueprint accents.
- **Decoration level:** Intentional — typography and structure carry most of the load;
  signature visuals (hero orb, services trefoil) carry the rest. No ambient blobs, no
  decorative gradients.
- **Mood:** Senior team, real engineering, no posturing. Tight grid, deliberate negative
  space, one signature visual per section, motion that happens once and stops.
- **Posture:** "Designed, not assembled." Every line in the SVGs has a structural job.
  Every spacing value comes from the scale below.

## Writing Tone
Direct, confident, technically precise. No marketing inflation — no "revolutionary",
"game-changing", or "best-in-class". Every claim verifiable. Body copy speaks to
engineers, not procurement. Section intros are citation-ready (130+ words for AEO
targets where applicable).

### Copy density rules
- **Primary CTAs must be ≤3 words.** Verb-first, action hints at outcome. Avoid the
  `Start | See | Explore | View` family — passive marketing verbs. Prefer
  `Get | Open | Read | Email | Talk | Ship`.
- **Section feature bullets must be ≤16 words.**
- **Default sentence target: 12–14 words.** Use em-dashes and colons in place of
  connective phrases. Telegraphic > flowery.
- **AEO blockquote: 40–60 words** with at least two verifiable facts (numerical,
  geographic, or organizational). Open with the entity-definition pattern
  (`X is a Y that Z`).

---

## Accessibility

- **Target:** WCAG 2.2 AA across all interactive surfaces.
- **Keyboard-first.** Every interactive element must be reachable and operable via
  keyboard alone. Tab order must follow visual reading order.
- **Focus-visible required.** Every interactive primitive must render a focus ring on
  `:focus-visible` (token below).
- **Contrast.** Body copy must meet AA (≥4.5:1). The `color.text.tertiary` token (`#999`)
  must never carry body copy — it is reserved for tertiary labels, disabled states, and
  decorative text where contrast is not load-bearing.
- **Reduced motion.** `prefers-reduced-motion: reduce` must short-circuit every
  non-essential animation. See Motion section.

### Focus ring token
```
focus.ring   = 2px solid var(--color-brand)
focus.offset = 2px
```
Applied via `:focus-visible` only — never `:focus`. Mandatory on `<Button>`, `<Card>`
(when interactive), `<a>`, accordion tabs, form controls.

---

## Typography

Loaded via Fontshare + Google Fonts in `app/globals.css:2-6`.

- **Display + Body:** Satoshi (300, 400, 500, 700, 900) — `--font-brand`.
- **Mono / data / eyebrows:** JetBrains Mono 400 — `--font-mono`.
- **Fallback:** Space Grotesk (system fallback only — never specify directly).

CSS vars (`globals.css:40-41`):
```css
--font-brand: 'Satoshi', 'Space Grotesk', sans-serif;
--font-mono:  'JetBrains Mono', 'Courier New', monospace;
```

Applied globally on `html` (`globals.css:79`). Must not add a second
`html { @apply font-sans }` elsewhere — Tailwind's default sans stack overrides Satoshi.

### Type scale

| Role             | Alias                 | Size  | Weight | Tracking | Use                             |
|------------------|-----------------------|-------|--------|----------|---------------------------------|
| Hero H1          | `font.size.display`   | 96px  | 900    | -0.04em  | Page-driver                     |
| Section H2       | `font.size.h2`        | 44–64px (tiered) | 700 | -0.03em | Section headers — see H2 tiers below |
| Card / Panel H3  | `font.size.h3`        | 20px  | 700    | -0.025em | Pillar headlines, FAQ           |
| Body large       | `font.size.lg`        | 18px  | 400    | -0.01em  | Lede paragraphs                 |
| Body             | `font.size.base`      | 16px  | 400    | -0.005em | Default                         |
| Small / meta     | `font.size.sm`        | 14px  | 400    | -0.005em | Card body, child link descriptions |
| Caption          | `font.size.xs`        | 13px  | 400    | -0.005em | Description text                |
| Eyebrow / number | `font.size.eyebrow`   | 11–13px font-mono, uppercase, `tracking-[0.10em]` to `tracking-[0.18em]`     |
| Body line-height | —                     | 1.5–1.75 (1.75 for prose blocks)                                              |

### H2 size tiers (Session 20)

Section H2 size encodes narrative importance — it is **not** flat. Three tiers, applied
as inline `text-[clamp(...)]` per the existing convention (no shared class):

| Tier | Clamp (min, vw, max) | Sections | Role |
|------|----------------------|----------|------|
| **T1** | `clamp(36px,4.6vw,64px)` | Services, Contact-CTA | Emotional peaks — the core offer + the close |
| **T2** | `clamp(32px,4vw,56px)`  | Why-Us, Founders | Standard section headers |
| **T3** | `clamp(28px,3.5vw,44px)`| Work-Preview, Testimonials, Comparison, FAQ | Utility / supporting |

Problem is exempt — its heading lives **inside** the blue diagnostic card (`.problem-h2`,
32px), not as a full-width section banner, so it sits outside the tier system.

**Casing (Session 20 audit):** all section H2s are **sentence case**. The earlier
Figma-derived UPPERCASE on Why-Us, Founders, Contact-CTA (and `.problem-h2`) was unified to
sentence case for one consistent system — supersedes the "UPPERCASE headings" notes in the
2026-05-19 Why-Us / Founders / ContactCta Decisions Log rows.

The `Eyebrow` primitive (`components/ui/eyebrow.tsx`) is the canonical eyebrow style:
`text-[11px] font-bold uppercase tracking-[0.1em] leading-none text-gray-light`.

---

## Color

Tokens defined in `@theme` block, `globals.css:17-37`. Must reference by token (alias or
CSS var), never raw hex.

### Semantic alias layer

Use the alias when speaking about role; map to the CSS var when writing code. Both are
canonical.

#### Brand
| Alias                 | CSS var          | Hex       | Use                                          |
|-----------------------|------------------|-----------|----------------------------------------------|
| `color.brand.primary` | `--color-brand`  | `#296ff0` | Web3 pillar, primary CTA, hub                |
| `color.brand.accent`  | `--color-accent` | `#F6851B` | Product Studio pillar, HUD                   |
| `color.brand.ai`      | `--color-ai`     | `#10b981` | AI Agents pillar (only)                      |

#### Text
| Alias                  | CSS var               | Hex       | Use                                       |
|------------------------|-----------------------|-----------|-------------------------------------------|
| `color.text.primary`   | `--color-dark`        | `#303030` | Body, headings                            |
| `color.text.secondary` | `--color-gray`        | `#676767` | Secondary text                            |
| `color.text.tertiary`  | `--color-gray-light`  | `#999999` | Tertiary, disabled — never body copy      |
| `color.text.divider`   | `--color-gray-subtle` | `#D9D9D9` | Quiet dividers                            |
| `color.text.inverse`   | `--color-off-white`   | `#FEFEFE` | Text on dark surfaces                     |

#### Surface
| Alias                  | CSS var               | Hex       | Use                                       |
|------------------------|-----------------------|-----------|-------------------------------------------|
| `color.surface.base`   | `--color-bg`          | `#ffffff` | Default canvas                            |
| `color.surface.subtle` | `--color-bg-subtle`   | `#f5f7ff` | Section alternation, secondary buttons    |
| `color.surface.raised` | `--color-bg-raised`   | `#fafbff` | Elevated cards on subtle backgrounds *(NEW — add to `globals.css` when first consumed)* |
| `color.surface.dark`   | `--color-canvas`      | `#0a0a0a` | Hero canvas                               |

#### Border
| Alias                   | CSS var                 | Hex       | Use                                     |
|-------------------------|-------------------------|-----------|-----------------------------------------|
| `color.border.default`  | `--color-border`        | `#e5e7eb` | 1px borders, card outlines              |
| `color.border.subtle`   | `--color-border-subtle` | `#f3f4f6` | Internal dividers, hover backgrounds    |

### Pillar color rule
Pillars own their color globally — Web3 is brand-blue, AI is `#10b981`, Product Studio
is `#F6851B`. Must not introduce new pillar-tinted UI without updating `services-data.ts`.

### Inactive / structural slate
Used for inactive glyphs and dashed spokes in `services-glyphs.tsx`. Component-local,
not global tokens:
- Stroke: `#cbd5e1` · Fill: `#e2e8f0` · Dot/accent: `#94a3b8`

### Dark mode
A `.dark` token block exists (`globals.css:303-335`) but is not currently activated. The
site ships light-only. If reintroduced, surfaces must be redesigned — must not just
invert.

---

## Spacing

Custom scale defined in `@theme`, `globals.css:43-53`. Must use these tokens via
`gap-[Npx]`, `p-[Npx]`, `mb-[Npx]` etc. Must not invent intermediate values.

| Alias       | Token | px  | Use                                         |
|-------------|-------|-----|---------------------------------------------|
| `space.1`   | `1`   | 4   | Tight inner gaps                            |
| `space.2`   | `2`   | 8   | Icon-to-text gap                            |
| `space.3`   | `3`   | 12  | Tight rhythm                                |
| `space.4`   | `4`   | 16  | Default body spacing                        |
| `space.5`   | `5`   | 24  | Section internal padding                    |
| `space.6`   | `6`   | 32  | Card padding, large gap                     |
| `space.7`   | `7`   | 48  | Section column gaps                         |
| `space.8`   | `8`   | 64  | Major block separators                      |
| `space.9`   | `9`   | 96  | Section vertical padding (default)          |
| `space.10`  | `10`  | 128 | XL breakpoint horizontal padding            |

## Radii

| Alias        | Token       | px  | Use                    |
|--------------|-------------|-----|------------------------|
| `radius.sm`  | `radius-sm` | 4   | Small chips, inputs    |
| `radius.md`  | `radius-md` | 8   | Buttons, panels, boxes |
| `radius.lg`  | `radius-lg` | 12  | Default cards          |
| `radius.xl`  | `radius-xl` | 20  | Featured cards         |

**Card radius rule.** `<Card variant="default">` and `<Card variant="quote">` must use
`radius.lg`. `<Card variant="featured">` must use `radius.xl`. No exceptions.

## Elevation / Shadow

Use sparingly — Swiss-engineering posture is borders-first. Shadows are reserved for
surfaces that genuinely lift off the canvas (hover affordance on cards, overlays, modals).
*(Tokens to be added to `globals.css` when first consumed.)*

| Alias       | Value                                                                          | Use                          |
|-------------|--------------------------------------------------------------------------------|------------------------------|
| `shadow.sm` | `0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)`                 | Card hover                   |
| `shadow.md` | `0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -1px rgb(0 0 0 / 0.04)`          | Dropdown menus, popovers     |
| `shadow.lg` | `0 12px 32px -8px rgb(0 0 0 / 0.12), 0 6px 16px -4px rgb(0 0 0 / 0.06)`        | Modals, mega-menu            |

---

## Layout

- **Section primitive:** `components/ui/section.tsx` — wraps every section.
  - Vertical padding: `py-[56px] md:py-[72px] lg:py-[96px]` (Session 19 redo, 2026-05-21 — premium rhythm; supersedes the earlier `py-[48px] md:py-[64px] lg:py-[72px]`).
  - Horizontal padding: `px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]` (PR #33 mobile-resp pass, 2026-05-20 — supersedes the 2026-05-19 four-step `…md:px-[48px] lg:px-[96px] xl:px-[128px]` chain).
  - Max-width variants: `wide` (1120), `xwide` (1280), `narrow` (880), `prose` (720).
  - `divider` prop: adds an edge-to-edge `border-t border-border` top hairline — the **section-seam idiom** (Session 19 redo). Applied to every section that has no other separator above it (Why-Us, Work-Preview, Testimonials, Founders, Comparison, FAQ, Contact-CTA). Not applied to Problem (Trust-bar `border-y` sits above) or Services (keeps its gradient bridge).
  - Auto-wraps children in `<Reveal>`.
- **Section-bypass surfaces.** Hero (full-viewport grid) and Trust-bar (full-bleed marquee) keep bespoke wrappers but use the canonical 6-step `px` chain. Work-Preview was routed back through `<Section maxWidth="xwide" divider>` (Session 19 redo) — its prior no-op `'use client'`/`scrollRef` was removed.
- **Canonical horizontal padding token:** `var(--section-px)` (`app/globals.css`). **Drift flag (2026-05-20):** the CSS variable still resolves to the older 24/48/72/96 chain at sm/md/lg/xl and has *not* been migrated to the new six-step chain — keep using the Tailwind class chain above as the source of truth; only the (very few) surfaces that can't consume Tailwind should fall back to `var(--section-px)` until it is re-aligned.
- **Two-column sections** (services, founders, contact) use
  `grid-cols-1 lg:grid-cols-2 gap-[48px]`.
- **Mobile breakpoint discipline.** Mobile fallbacks must render server-side. Must not
  use `display:none` to hide content that has SEO value. See `services.tsx` — `<Card>`
  list shown on mobile while `services-trefoil.tsx` shows on lg+.

---

## Motion

Locked grammar. Originally specified in (now archived)
`archive/specs/2026-05-04-session-5.5-global-motion.md`.

### Core rules
1. **One-shot.** Must not loop indefinitely outside three approved exceptions:
   the trust-bar marquee, the orb HUD label cursor blink, and the hero scroll-cue
   bounce (auto-fades at `scrollY > 100`, so effectively at-top-only).
2. **IntersectionObserver-gated first paint.** Sections must be invisible at SSR and
   fade in once viewport enters them. Pattern lives in `components/ui/reveal.tsx` (used
   everywhere via `<Section>`) and in `phrase-stamp.tsx` for staggered text reveals.
3. **`prefers-reduced-motion: reduce` always honored.** Reveal must short-circuit to
   visible. SVG sections must kill animations via
   `@media (prefers-reduced-motion: reduce)`.
4. **CSS over JS for media queries.** Must not use `matchMedia` if a CSS query suffices.
   SVG sections use inline `<style precedence="default">` blocks to avoid hydration cost.

### Duration tokens

| Alias                         | Value    | Use                                  |
|-------------------------------|----------|--------------------------------------|
| `motion.duration.instant`     | 150ms    | Hover state changes, tooltip in/out  |
| `motion.duration.fast`        | 250ms    | Button press, accordion expand       |
| `motion.duration.base`        | 400ms    | Reveal, default transitions          |
| `motion.duration.slow`        | 620ms    | Stroke-draw, halo-in                 |
| `motion.duration.deliberate`  | 900ms    | Pulse-dot travel, spoke s-curve      |
| `motion.duration.marquee`     | 24000ms  | Trust-bar (linear, infinite)         |

### Easing palette

| Curve                                       | Use                                  | Typical duration  |
|---------------------------------------------|--------------------------------------|-------------------|
| `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo)  | Reveal, halo-in, hero scroll         | base–slow         |
| `cubic-bezier(0.32, 0, 0.16, 1)` (s-curve)  | Spoke transitions, pulse travel      | base–deliberate   |
| `cubic-bezier(0.65, 0, 0.35, 1)` (in-out)   | Stroke-draw on glyph activation      | slow              |
| `ease-out`                                  | Atmospheric backdrop fade            | slow              |
| `linear`                                    | Trust-bar marquee, orb scan          | marquee           |

### Patterns currently in use
- **Reveal** (`components/ui/reveal.tsx`): `opacity 0→1` + `translateY(8px→0)` over
  `motion.duration.base` on viewport entry. Optional `delay` for staggered reveals.
  **Selective (Session 20):** `<Section reveal={false}>` opts a section out of the auto-wrap
  so first-paint motion stays deliberate, not template-applied. Off on **Comparison** (it owns
  its `comparison-rows.tsx` per-row reveal — avoids double-animating) and **Testimonials** (the
  async Clutch widget reads better static). On everywhere else by default.
- **ASCII connective seam** (`components/ui/ascii-seam.tsx`, Session 20): a decorative
  `aria-hidden` texture band in the space between sections. The glyph field is a deterministic
  smooth function of (row, col) — identical SSR/client, no hydration mismatch, reads as designed
  topographic texture (ramp ` ·∙•`, mono, `--color-gray-light` @ 0.5 opacity, vertical density
  falloff + horizontal edge-fade mask). On IO entry it stamps in **once** via a left-to-right
  `mask-position` wipe (1100ms out-expo) + opacity fade, then holds static (honors the no-infinite
  rule). Fixed 88px height reserves space (no CLS). `prefers-reduced-motion` → static texture, no
  wipe. Placed at 4 rhythmic seams (Problem→Services, Why-Us→Work, Founders→Comparison,
  FAQ→Contact); those followers drop their `divider` hairline so the band is the only seam.
- **phrase-stamp** (`components/sections/phrase-stamp.tsx`): per-word stagger, IO-gated,
  600ms after entry; reference for any first-paint-with-delay pattern.
- **Services trefoil** (`components/sections/services-trefoil.tsx`):
  - Atmospheric backdrop opacity fade (`0→1`, slow ease-out) on first activation.
  - Stroke-draw on glyph activation (`stroke-dashoffset` per `[data-draw]`, slow in-out).
  - Halo behind active node (`opacity 0→0.10`, `scale 0.7→1`, base with 200ms delay).
  - Pulse dot travels hub→active-node via `transform: translate(var(--dx), var(--dy))`,
    deliberate s-curve.
  - Spoke style transition (color, opacity, width), instant.
- **Trust-bar marquee** (`globals.css:62-67`): `translateX(0 → -50%)` linear marquee
  infinite. Only approved infinite animation.
- **Lenis smooth-scroll** (`components/providers/smooth-scroll.tsx`, Session 19 redo):
  page-level inertia scroll (`lerp: 0.1`), mounted in `app/layout.tsx`. **Not initialized**
  under `prefers-reduced-motion: reduce` (native instant scroll). The global
  `html { scroll-behavior: smooth }` was removed so it can't fight Lenis; in-page anchor
  clicks are delegated to `lenis.scrollTo(target, { offset: -64 })` (matches `scroll-mt-[64px]`).
  Horizontal lanes carry `data-lenis-prevent` so trackpad gestures scroll the lane.
- **Section-start snap** (`lenis/snap`, `type: 'mandatory'`, Session 19 redo): the scroll
  settles at each substantive section's start (offset by the 64px nav). Soft landing —
  `duration: 2.8`, ease-in-out quart (user-picked over firmer presets). Snap points are the
  top-level `<main>` sections ≥ 0.4 viewport tall (the short Trust-bar marquee is excluded).
  **Crucially, snapping is suspended whenever the scroll is > 0.6 viewport from any section
  start** (a `lenis.on('scroll')` gate calls `snap.stop()`/`start()`), so tall scroll-through
  sections — Services' 260vh scrolltelling, Why-Us, Founders — scroll freely once you're past
  their start instead of being trapped. Recomputed on resize + after media settles.
  Reduced-motion: no Lenis ⇒ no snap.
- **Founders card hover** (`founders.tsx`, lg+ pointer): photo tile `-translate-y-[2px]` +
  `border-brand/30`, portrait `scale-[1.03]`, `250ms`. `motion-reduce` neutralizes the transforms.
- **Comparison row-reveal** (`comparison-rows.tsx`): IO-gated, per-row staggered
  `opacity 0→1` + `translateY(6px→0)` (`delay = i*60ms`, base/out-expo). Row text is in the SSR
  DOM (opacity only) so it stays crawlable; reduced-motion → all rows visible immediately.
- **Work-Preview card hover + blueprint-hairline tiles** (`work-preview.tsx`): card
  `-translate-y-[2px]` + `border-brand/30` + `shadow.sm` (250ms, `motion-reduce` neutralized);
  the placeholder tile is a faint diagonal blueprint-hairline panel (pillar hue) with a small
  corner monogram — a deliberate placeholder until case-study art lands.

> **Removed (Session 19 redo):** the undocumented infinite `animate-[pulse]` on the
> Founders + Work-Preview swipe-hint arrows (violated the no-infinite-animation rule) — arrows
> are now static affordances.

---

## Components

### Primitives (`components/ui/`)

| File                  | Variants                                     | Notes                                                                                              |
|-----------------------|----------------------------------------------|----------------------------------------------------------------------------------------------------|
| `section.tsx`         | bg: default/subtle/dark; mw: wide/xwide/narrow/prose; `divider`; `reveal` | Wraps every section. Auto-Reveal unless `reveal={false}` (Session 20).                             |
| `ascii-seam.tsx`      | `seed`                                       | Decorative connective ASCII texture band between sections (Session 20). One-shot mask-wipe stamp-in, reduced-motion static, `aria-hidden`, fixed 88px (CLS-safe). |
| `card.tsx`            | default / featured / quote                   | `featured` adds 3px left border, takes `accentColor` prop. Hover: -0.5 translate, brand/30 border, `shadow.sm`. |
| `button.tsx`          | primary / ghost / secondary; sm / md / lg    | Inline-style. Brand-blue primary.                                                                  |
| `pill.tsx`            | as: span/div/p; tone: default/inverse        | **Canonical section label** (Session 19 redo). Bordered mono pill, sharp/squared corners: `border rounded-[2px] px-[12px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.1em]`. `default` = white bg / dark text; `inverse` = `border-white/60 bg-white/10 text-off-white` for colored/dark surfaces (Problem card). Used by every section eyebrow. |
| `eyebrow.tsx`         | as: span/div/p                               | 11px bold uppercase 0.1em tracking, gray-light. No longer used for section labels (see `pill.tsx`); still used for sub-labels (footer headings, founder role chip). |
| `reveal.tsx`          | optional `delay`                             | The IO+motion gate. Used by `<Section>`.                                                           |
| `section-header.tsx`  | —                                            | Eyebrow + H2 + lede composition.                                                                   |
| `logo.tsx`            | sm / md                                      | Brand-blue square + wordmark.                                                                      |
| `badge.tsx`           | —                                            | Pill chips.                                                                                        |

### Required component states
Every interactive primitive must document and implement these seven states:

| State              | Trigger             | Visual                                                                       |
|--------------------|---------------------|------------------------------------------------------------------------------|
| **default**        | Idle                | Token-driven base                                                            |
| **hover**          | Pointer over        | Token-driven hover (e.g., card `-0.5 translate + brand/30 border + shadow.sm`)|
| **focus-visible**  | Keyboard focus      | `2px solid var(--color-brand)` ring, `2px` offset                            |
| **active**         | Pressed             | Pressed-down feel (slight scale or darker fill)                              |
| **disabled**       | `disabled` attr     | Opacity ~0.5, `cursor: not-allowed`, no hover                                |
| **loading**        | Async work          | Spinner or pulsing skeleton; trigger disabled                                |
| **error**          | Validation/failure  | Brand-coded error fill or border, screen-reader-announced message            |

### Edge cases (must document per component)
- Long-content overflow (truncation or wrap rule)
- Empty state (placeholder text or skeletal layout)
- Keyboard interaction (Tab, Enter, Space, Esc, Arrow as applicable)
- Pointer interaction (click, hover, drag if applicable)
- Touch interaction (tap target ≥44×44px on mobile)

### Visual signature

Decisions that give the system its specific edge. Restraint-driven, benchmarked against
supermemory.ai (live computed CSS, 2026-05-06).

**Button finish — Bauhaus restraint, single signature mark.**
- Radius: `0` (square corners). No rounding on any button variant.
- No box-shadow on default state. No inset highlights. No gradients. Flat fills only.
- Transition: `var(--duration-instant)` (150ms) on `background-color`, `border-color`,
  `color` only. No `transform` on hover. No shadow growth.
- Hover: bg darkens (~10%) on primary; bg/border tint shift on ghost/secondary. No motion.
- Active: bg darkens further (~15%). No transform.
- Focus-visible: brand ring via global `:focus-visible` rule.
- Type: `15px / weight 600 / -0.01em tracking` (md and lg). `13px` for sm.

**Split-arrow primary signature.** Primary CTAs that include an arrow must use the
two-span split-button pattern: text span (solid brand bg) + arrow span (`bg: rgba(255,255,255,0.10)` overlay) separated by `border-left: 1px solid rgba(255,255,255,0.15)`. The arrow span has its own padding. This is our single distinctive button mark — do not apply to ghost or secondary.

**Tabular numerals.** All buttons (and any numeric UI: counters, prices, tables, stats)
must use `font-feature-settings: 'tnum'` (Tailwind: `tabular-nums`). Numerical alignment
is part of the technical-blueprint posture.

**Micro-interaction discipline.** Buttons and inline links transition at 150ms
(`var(--duration-instant)`). Card hover at 250ms (`var(--duration-fast)`). Reveal /
section enter at 400ms (`var(--duration-base)`). Signature visuals (orb, trefoil) at
620–900ms. Above 900ms is reserved for one-shot signature moments — never on text or buttons.

### Section patterns
- **Services boxing pattern** (`services-trefoil.tsx`, panel column): right-side accordion
  lives in a `rounded-md border border-border bg-white` box. Top eyebrow row shows
  `THREE PILLARS [01 / 03]` with the active number in the active pillar's hue. Each tab
  row gets a `border-b border-border`. The pillar-colored 3px bar lives **inside the
  active panel only**, starting at the H2
  (`absolute left-0 top-[4px] bottom-[24px] w-[3px]`). Inspired by supermemory.ai's
  section enclosure.
- **Card variants:** `default` for grids (`why-us.tsx`, `comparison.tsx`); `featured`
  with `accentColor` for highlighted single cards (mobile services fallback,
  active-pillar hint); `quote` for testimonials.
- **Phrase stamp** (`phrase-stamp.tsx`): used in hero and problem sections for
  high-impact per-word reveals.

### SVG signature visuals
- **Hero orb:** `app/globals.css:115-183` (label HUD) + canvas component. Brand-blue +
  accent orange "instrumented" reveal label.
- **Services trefoil:** `services-trefoil.tsx` + `services-glyphs.tsx`. Hub-and-spoke
  topology, per-pillar SVG glyphs (Web3 hex lattice, AI Agents halo+rings+dots, Product
  Studio stacked iso-planes), `<foreignObject>`-wrapped buttons. Inactive uses two-tone
  slate.

---

## Rules

### Do
- **Must** reference tokens (alias or CSS var), never raw hex/px values.
- **Must** document all seven states for every interactive primitive.
- **Must** render mobile fallbacks server-side when content has SEO value.
- **Must** honor `prefers-reduced-motion: reduce`.
- **Must** apply the focus-visible ring on every interactive primitive.
- **Must** keep tap targets ≥44×44px on touch surfaces.
- **Should** prefer borders over shadows for separation.
- **Should** prefer CSS over JS where a media query suffices.
- **Should** add a section-level deviation log entry before breaking master grammar.

### Don't
- **Must not** introduce one-off spacing or typography exceptions.
- **Must not** hardcode horizontal section padding in inline styles (e.g., `padding: '96px 80px'`). Use the Section primitive or `var(--section-px)`.
- **Must not** use `color.text.tertiary` (#999) for body copy — only tertiary/disabled.
- **Must not** add a second `html { @apply font-sans }` — Tailwind override breaks Satoshi.
- **Must not** use `display:none` to hide content that has SEO value.
- **Must not** introduce new pillar-tinted UI without updating `services-data.ts`.
- **Must not** ship infinite animations outside the trust-bar marquee and orb HUD blink.
- **Must not** invert dark mode — surfaces must be redesigned if reintroducing dark.
- **Must not** use `oklab()` or other non-hex notations — use hex via tokens.

---

## Per-section override rule

The master grammar above locks the design baseline. Sections may deviate when a signature
visual demands it (e.g., the trefoil's atmospheric backdrop is a section-level addition,
not a global pattern). When deviating:

1. Add a `## Deviations from master plan` heading to the section's spec at
   `docs/superpowers/specs/<date>-section-<name>.md` and list each change with rationale.
2. Reference this file (`DESIGN.md`) as the master spec.
3. Honor hard constraints regardless: SSR/SEO viability, ARIA semantics, mobile fallback,
   `prefers-reduced-motion`, brand color discipline, focus-visible.

Historical deviation logs (now archived):
- `docs/superpowers/archive/specs/2026-05-04-section-services-design.md` — services
  trefoil polish #1, #2.
- `docs/superpowers/archive/specs/2026-05-02-section-hero-redesign.md` — hero orb HUD.

---

## Authoring workflow

When adding a new section, primitive, or rule to this doc:

1. Restate design intent in one sentence.
2. Define foundations and tokens (use the alias layer).
3. Define component anatomy, variants, interactions, and the seven states.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns and edge-case handling.
6. End the addition with a QA checklist entry where appropriate.

---

## QA checklist

Run before marking a section shipped.

- [ ] All values use tokens (no raw hex/px)
- [ ] Seven states implemented for every interactive primitive
- [ ] Focus-visible ring renders on keyboard nav
- [ ] Tab order matches visual reading order
- [ ] Body copy contrast ≥4.5:1 (AA)
- [ ] `color.text.tertiary` used only for tertiary/disabled
- [ ] Mobile fallback renders server-side if SEO-relevant
- [ ] `prefers-reduced-motion: reduce` short-circuits all non-essential motion
- [ ] No infinite animations introduced
- [ ] Tap targets ≥44×44px on touch
- [ ] Pillar colors match `services-data.ts`
- [ ] Long-content / empty / error states defined
- [ ] Deviations logged in section spec

---

## Decisions Log

| Date       | Decision                                                                                                                                                  | Rationale                                                                                  |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| 2026-05-22 | **Design-review audit fixes (Session 20 cont.).** Acted on a `/design-review` audit (B+). (1) **Space Grotesk leak removed** — `.problem-h2`, `.problem-chart-lane-label`, `.problem-chart-status`, and the services iso-canvas `.iso-label` specified `'Space Grotesk'` (or an undefined `--font-grotesk`) as the *primary* face, rendering in Grotesk while every other heading was Satoshi; all repointed to `var(--font-brand)` (Grotesk stays the fallback inside the token). (2) **H2 casing unified to sentence case** (see Typography → H2 size tiers). (3) **Problem AEO accordion question** (`.problem-aeo-q`) 14px → 16px (the `base` token) for a clearer Q/A hierarchy in the collapsed disclosure; the primary FAQ questions were already 16–17px (no change). (4) **Consent banner** restructured to a compact summary + `<details>` "How it works" expander (full disclosure verbatim, progressively disclosed) with Accept/Reject bumped to ≥44px tap targets — fixes the mobile case where the full-text card buried both hero CTAs. `tsc` clean; no copy removed (consent text marked NEED LEGAL REVIEW kept verbatim in the expander). | Page now reads as one typographic system (single heading face + casing), the collapsed AEO block has correct hierarchy, and the mobile first impression is the hero (not a wall of legal text) while the legal disclosure stays one tap away. |
| 2026-05-21 | **Homepage A+ pass — intentionality + earned richness (Session 20).** Pushes the Session-19-redo B+ toward A in two movements. **Movement 1 (subtractive intentionality):** (1a) **H2 size tiers** — section H2 now encodes narrative importance via a 3-tier clamp scale (T1 64 / T2 56 / T3 44) instead of the prior ad-hoc 44–56 spread: Services + Contact-CTA → 64 (peaks), Why-Us + Founders → 56, Work-Preview demoted 52→44 to join Testimonials/Comparison/FAQ (utility); Problem exempt (card-internal 32). (1b) **Selective Reveal** — new `Section reveal={false}` prop; turned off on Comparison (was double-animating over its own `comparison-rows` per-row reveal) and Testimonials (async Clutch widget reads better static). The **pill-reduction lever was deliberately dropped** — all 9 unified pills kept (de-risks the prior pill revert). **Movement 2 (earned richness):** new `components/ui/ascii-seam.tsx` connective ASCII texture band placed at 4 rhythmic seams (Problem→Services, Why-Us→Work, Founders→Comparison, FAQ→Contact); deterministic smooth glyph field (no hydration mismatch), one-shot left-to-right mask-wipe stamp-in then static, `aria-hidden`, fixed 88px (CLS-safe), reduced-motion static; those four followers dropped their `divider` hairline so the band is the sole seam. A **count-up** on figures was evaluated and **rejected** — the only standalone numeric display is the Testimonials 4.9 rating, and a lone decimal count-up on a non-accumulating metric read as gimmick, not earned. All motion transform/opacity/mask-only + reduced-motion-gated; `tsc --noEmit` clean; no CWV-measurable risk (fixed-height bands, IO + GPU transitions). | Section hierarchy now reads as designed (clear 64/56/44 rhythm), first-paint motion is deliberate rather than applied to every block, and the page gains a single restrained signature motif — the ASCII connective tissue — without the pill regression or a weak template flourish. |
| 2026-05-21 | **Homepage beautification / smooth-scroll / premiumness pass (Session 19 REDO).** Redo of the reverted `ca604ea` (reverted `b8339c9` for process: skipped sign-off + altered the pills). **(1) Unified label pill:** new `components/ui/pill.tsx` (bordered mono, sharp/squared `rounded-[2px]` corners — picked live over rounded-md and a dot/rounded-full variant; `default`/`inverse` tones) replaces 5 divergent eyebrow treatments — applied to Hero, Problem (`inverse`, replaces `.problem-chip` — CSS removed), Services, Why-Us, Founders, Testimonials, Comparison, FAQ, Work-Preview. `eyebrow.tsx` retained for sub-labels (footer, founder role chip). **(2) Lenis smooth-scroll:** `components/providers/smooth-scroll.tsx` in `app/layout.tsx`; reduced-motion disables it; `html{scroll-behavior:smooth}` removed; anchor clicks → `lenis.scrollTo(offset -64)`; lanes get `data-lenis-prevent`. **Section-start snap** (`lenis/snap`, mandatory, soft 2.8s ease-in-out — added after the user asked for stops at each section) lands the scroll at every substantive section start, but a `lenis.on('scroll')` gate suspends it >0.6vp from any start so tall sections (Services 260vh, Why-Us, Founders) scroll through freely. **(3) Section seams:** `Section` gains a `divider` prop (edge-to-edge `border-t`) applied to Why-Us, Work-Preview, Testimonials, Founders, Comparison, FAQ, Contact-CTA. **(4) Whitespace:** Section py `48/64/72`→`56/72/96`; Work-Preview routed back through `<Section>` (no-op `'use client'`/`scrollRef` removed); Trust-bar px aligned to the 6-step chain. **(5) Three motion moments:** Founders card hover + portrait zoom + mobile peek widths; Comparison IO-staggered row-reveal (`comparison-rows.tsx` client island); Work-Preview blueprint-hairline tiles + card hover (ghost-monogram candidate rejected live). Removed undocumented infinite swipe-arrow pulses. **(6) Copy:** the patch's 4 invented Work-Preview blurbs were **removed** (they fabricated the per-card outcomes `docs/content/homepage.md` defers until case studies land); added one true AEO sentence to Testimonials stating the 4.9/9 verified-review figures in prose. No locked copy touched. Subjective forks (pill style, section seam, work tiles, motion) were all picked live by the user; seam kept as the subtle `border-border` hairline. All motion transform/opacity-only + reduced-motion-gated; `tsc --noEmit` clean. | Page now reads as one continuous premium document — one sharp pill, subtle seams, inertia scroll, consistent rhythm — with three earned motion moments, without the prior attempt's pill regression or unreviewed copy/structure churn. |
| 2026-05-21 | **Comparison redesigned (Session 18, no Figma; baseline = shipped 47-line JSX):** migrated to canonical `<Section bg="default" maxWidth="xwide">` grid (was hand-rolled 4-step padding on `bg-bg-subtle`, max-w-960); eyebrow + Section primitives consumed; table gains a11y (`scope="col"`/`scope="row"`, `sr-only <caption>`, `Dimension` sr-only header); striping migrated to `bg-bg-subtle/60` against the new white section bg; footnote + competitor cells `text-gray-light` → `text-gray` (DESIGN.md a11y line 248). **Two-pass A3 copy rewrite** (2026-05-14 lock reopened by user; mid-session angle shift to lean / integrated-delivery positioning): H2 = `How Metaborong's integrated Web3 and AI delivery compares to large agencies and freelance teams`; 29w AEO definition intro; 6 row labels rewritten (`DeFi depth` → `Multichain coverage`; `Speed to delivery` → `Delivery timeline`; `AI-native services` → `AI engineering depth`; `Product thinking` → `Process and project management`); 18 cells rewritten as parallel professional noun phrases; `7 chains — Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, Avalanche`, `25+ products in production`, `4–12 weeks per engagement` preserved verbatim. Original 5.2 → first-pass 8.4 → second-pass **8.8** (`docs/superpowers/specs/2026-05-21-comparison-copy-audit.md`). Cross-file drift flagged: TRUST SIGNALS `8+ products` vs `25+`. Deviations 1–9 in `docs/superpowers/specs/2026-05-21-section-comparison.md`. | Section grammar now matches nav / hero / why-us / founders / contact-cta. Table is citation-ready for AEO with two extractable definition blocks (intro + footnote) and three numeric citation targets. Lean / integrated-delivery angle reinforced across H2, intro, row labels, cells, and footnote. |
| 2026-05-21 | **FAQ section redesigned (Session 18, A2 polish layered on full A3 copy rewrite):** single-column accordion → **two-column layout with sticky title rail (md+) + helper card** consuming canonical `<Section bg="default" maxWidth="xwide">` (PR #33 six-step padding chain). All 7 Q&As rewritten as real third-person AEO search queries (every Q is a real query, every A ≤50w, self-contained); 2026-05-14 copy lock reopened by user. Component split into `faq.tsx` (server, `<Section>`) + `faq-accordion.tsx` (client). Accordion a11y hardened: `focus-visible` outline, `aria-controls`/`aria-labelledby`/`role="region"` quartet, panels rendered with `hidden` attribute (all 7 answers in SSR HTML for AEO extraction), tap target 56px, first item default-open. `lib/schema.ts` `faqSchema` mirror auto-honored via existing `faqs.map()` derivation in `lib/schema.ts:1` (no edit needed). `homepage.md:558` AEO-checklist count corrected 8 → 7. A3 audit 6.4 → **8.8** (`docs/superpowers/specs/2026-05-21-faq-copy-audit.md`). Deviations 1–5 in `docs/superpowers/specs/2026-05-21-section-faq.md`. | FAQ now carries the highest extract-rate potential of the page tail with every Q tuned to real query language and every A citation-ready. Schema invariant satisfied automatically (data → schema via `.map()` derivation), so the worker did not have to dual-edit and risk drift. |
| 2026-05-21 | **Testimonials rebuilt as a widget-only trust block (Session 18, no Figma):** migrated to `<Section bg="subtle" maxWidth="wide">` — the official Clutch type-8 reviews widget (`h=420`, 6 curated review IDs `457842,454740,453781,439014,438481,437747`) in a white card with neutral border + 12px radius is the **only** review surface; an `sr-only` outbound link carries the SSR-crawlable rating/count fallback (Why-Us pattern from 2026-05-19 Decisions Log row). `<ClutchWidget>` parameterised (`widgetType`, `height`, `reviews`, `className`); Why-Us defaults preserved. **Section narrowed to `wide` (1120)** to match the Clutch type-8 iframe's natural ~1100 content cap and avoid dead right-side whitespace at ≥xl. Mid-session iteration kept 3 SSR-fallback quote cards + drag-scroll lane — dropped per user direction because they duplicated widget content and reintroduced the per-card "Read on Clutch →" idiom we're moving away from. Padding chain migrated from hand-rolled 4-step to canonical 6-step. Seven `[TODO:]` placeholders eliminated. A3 audit baseline 3.4 → rewrite **8.0** (`docs/superpowers/specs/2026-05-21-testimonials-copy-audit.md`). Deviations 4–5 in `docs/superpowers/specs/2026-05-21-section-testimonials.md`. | Replaces the seven `[TODO:]` placeholders with a single verifiable live trust marker; eliminates content duplication between SSR cards and the widget; consolidates with the Why-Us Clutch widget pattern; the narrower Section is a deliberate cost paid to keep the widget reading as a clean integrated primitive instead of a centered island. |
| 2026-05-19 | **Why-Us redesigned to Figma `mQsbMuw0spVgIu7jXirr3o`/`112:1787`** on the canonical `<Section>` grid; visible copy frozen (SSR-verified diff). Section deviations logged in `docs/superpowers/specs/2026-05-19-section-why-us.md` (raster isometric illustrations + gradient fade, UPPERCASE headings, bordered eyebrow chip, flush zero-radius 3-column card grid, mono kicker = frozen tag). Adds the site's **first third-party embed**: official Clutch widget (always-on, `sr-only` SEO/a11y fallback, `aria-hidden` visual) replacing the static 4.9 badge. | Figma-faithful redesign; Clutch text→widget user-directed; the `sr-only` fallback satisfies the copy-frozen + a11y hard constraints; deviations sanctioned via the override rule. |
| 2026-05-19 | Founders section redesigned (Figma `mQsbMuw0spVgIu7jXirr3o` / `142:516`): black placeholder → light team E-E-A-T anchor on the canonical `<Section bg=default maxWidth=xwide>` grid. Hero-consistent eyebrow chip; H2 with brand-blue "the work"; A3 lede kept; 3 founder cards = square portrait/monogram in a pure-CSS dashed **blueprint frame** + name + bordered role chip + bio + a social row of brand-blue **square (radius-0)** LinkedIn + X buttons (shared `SocialButton`; X uses the same `bg-brand`, no X-black; per-button graceful no-URL degrade). DiceBear avatars removed; monogram fallback (`role="img"`) for founders without a photo. Deviations 1–7 logged in `docs/superpowers/specs/2026-05-19-section-founders.md`. | Founders now follows the same Section grammar as nav/hero/every section (edges 128/1312 @1440, 128/1152 @1280, 16/359 @375, no overflow). The team/trust section finally carries real E-E-A-T (named, reachable, technical co-founders) instead of placeholder copy. |
| 2026-05-19 | Hero + Nav adopt the canonical `<Section>` grid: content capped to `max-w-[1280px]` inside the `px-[16px] sm:px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px]` chain. Hero ASCII right-pinned with `lg:justify-end`; eyebrow green dot removed; overlay card 3 reseated `74%/34.8%`→`66%/34%` onto the rightmost bloom. `<header>` + mega-menu strip surfaces stay full-bleed (signature preserved) — only content is capped. **Supersedes the 2026-05-14 hero row below** (`var(--section-px)` / `xl:px-[144px]→128` / ASCII inset-from-right). | Left/right negative space is now identical across nav, hero, and every section at all breakpoints; mobile gutter unified to 16px. Nav/hero follow the same Section grammar as the rest of the page instead of bespoke full-width/inset math. |
| 2026-05-19 | ContactCta redesigned (Figma `mQsbMuw0spVgIu7jXirr3o`/`233:261`): **dark `#0a0a0a` → light `--color-bg`** on the canonical `<Section bg=default maxWidth=xwide>` grid; centered uppercase H2 + A3 sub + brand-blue **split-arrow `<Button>` primitive** (project signature kept over Figma's plain button; CTA "Email us" kept over Figma's 4-word "Start a conversation") + a project-sourced static ASCII-hills raster as a **normal-flow bottom band** (live-QA fix: an absolute backdrop blanketed the H2 at desktop). A3 copy re-run 7.6→8.1. Deviations 1–5 in `docs/superpowers/specs/2026-05-19-section-contact-cta.md`. `--color-canvas` "contact CTA" usage removed from the color table; `section.tsx` doc gains `xwide`. | Page tail now matches the light Section grammar of every other section; the convert moment leverages founder-reachability; the dark-surface grammar matches what shipped. |
| 2026-05-19 | Footer redesigned (Figma `mQsbMuw0spVgIu7jXirr3o`/`237:359`): single dark row → **light expanded sitemap footer** on the site edge grid. Standard IA — Company / Services / Offices / Get-in-touch columns (canonical `<Eyebrow>` headings) + 16-word positioning line + giant `METABORONG` as live text (not raster) + dynamic-year bottom bar. Figma placeholder "ARNAB RAY ×4" card grid dropped (user); Dribbble dropped; offices = user-verified NAP; Behance/Medium/Discord → `/` temp (no `rel=me`). Footer is SSR-visible chrome, not IO-gated. Deviations 1–7 in `docs/superpowers/specs/2026-05-19-section-footer.md`; schema NAP (`lib/schema.ts`) deferred. | The footer carries the sitemap + NAP + positioning a credible studio footer needs, on the same edge grammar as the rest of the page, without inventing the Figma placeholder content. |
| 2026-05-20 | ContactCta visual + copy reverted to Figma `233:261` after live review: H2 `Got a project in mind?`, sub verbatim from Figma (mid-word edit accident "…protocols, ATell us…" reconstructed to "AI agents, and SaaS products. Tell us…" per user confirmation), CTA `Start a conversation →` via the project's `<Button arrow="→">` primitive. ASCII-hills bottom-band asset **decommissioned**; replaced with a painterly ASCII-textured landscape from Figma `VE5DrIc8bHVLyW618jQUGp/1:19` (`public/contact/landscape.webp`, 2400×1707 q=84, 491 KB) as the section background in a 16:9 `aspect-[16/9] min-h-[440px]` container. White text-overlay with a centered radial dark vignette (`rgba(0,0,0,0.62→0.32→0)`) behind the text only + text-shadow safety for AA over bright cloud zones. Session-17 A3 result (7.6→8.1) **superseded** per user visual-vision call (brand-moment closer over tight CTA). 2026-05-20 revision logged in the contact-cta spec. | Page tail reframes as a painterly brand close; Figma fidelity wins over A3 score per user; AA cleared via local vignette without flattening the image globally. |
| 2026-05-20 | Footer wordmark row order corrected to Figma `237:359`: giant faded `METABORONG` live-text moved from above the sitemap grid to between the grid and the bottom bar. All UX copy unchanged. | Order now mirrors Figma exactly; the wordmark closes the footer visually instead of competing with the positioning paragraph at the top. |
| 2026-05-20 | **Section padding chain re-tuned for mobile/laptop (PR #33 "Mobile-resp", commit `3160fcf`)** — `px-[16px] sm:px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px]` → `px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]` (six steps; tighter at md/lg/xl, full 128 only at 2xl ≥1536px). Applied in `components/ui/section.tsx`, `components/sections/hero.tsx`, and `components/layout/footer.tsx`. **Supersedes the 2026-05-19 four-step lock row above.** Also from the same PR: footer grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` → `grid-cols-2 lg:grid-cols-4` (mobile is now 2-up, not 1-up); nav locks `body { overflow: hidden }` while the mobile menu is open; `services-pillars` swap fixed 560/600 heights for `70vh min-h-[500px] max-h-[700px]`; `testimonials` + `work-preview` add `'use client'` drag-scroll lanes; new founder portrait SVGs (`public/founders/{anik,arnab,soumojit}.svg`). Footer wordmark row (2026-05-20 row above) preserved through the merge. | Less negative-space at md/lg/xl on laptop-class viewports (the 96/128 was visibly cavernous on 13–15" screens); mobile gains a real 2-up footer instead of a tall 1-up stack; founder cards render their portraits instead of monogram fallbacks. Trades doc/code alignment for the 2026-05-19 four-step lock → re-graduated here. |
| 2026-05-14 | Homepage edge alignment fix — introduced `var(--section-px)` token (24/48/96/128 at sm/md/lg/xl). Migrated 7 inline-style sections + footer from hardcoded `padding: '96px 80px'`. Hero left copy column reduced from `xl:px-[144px]` to `xl:px-[128px]` for alignment with the rest of the page. Hero right column (ASCII video) now inset by `var(--section-px)` from viewport-right edge. | Inline-style sections were rendering 80px on both mobile and desktop (mobile bug + desktop staircase). Aligning all outer edges + reducing mobile to 24px per DESIGN.md. |
| 2026-05-14 | Brand blue refreshed from `#204AF8` → `#296ff0` (Figma source: file `mQsbMuw0spVgIu7jXirr3o`, node `60:910`, "Let's Talk" button + 1px outer ring). Token `--color-brand` updated; Web3 pillar follows. Replaces all hardcoded `#204AF8` hex and matching `rgba(32,74,248,*)` occurrences across components, globals.css, OG image. | Align live build to current Figma source-of-truth. New blue is lighter, more cyan-leaning. Web3 pillar stays unified with brand. |
| 2026-05-06 | DESIGN.md polish pass — semantic alias layer, A11y section, motion duration tokens, shadow scale, surface-raised, focus-visible token, seven-state matrix, Do/Don't rules, Card radius rule, QA checklist, authoring workflow. | Doc craft upgrade benchmarked against supermemory.ai; tightens authoring discipline without visual drift. |
| 2026-05-06 | DESIGN.md created from shipped state                                                                                                                      | Single source of truth was missing; consolidated tokens, primitives, motion grammar.        |
| 2026-05-05 | Services right column adopts boxing pattern (1px grey + colored bar from H2)                                                                              | supermemory.ai-style enclosure for sharpness; pillar accent moves into panel only.          |
| 2026-05-05 | Trefoil polish #2 — 120px glyphs, atmospheric backdrop, halo, traveling pulse dot                                                                         | Original 80px glyphs + 0.10 spokes read as toy diagram at section scale.                    |
| 2026-05-04 | Trefoil polish #1 — Swiss-engineering motion grammar, two-tone slate inactive                                                                             | Dashed-particle/scale-up-assembly looked cheap; one-shot motion locked.                     |
| 2026-04-28 | Project-wide design baseline locked                                                                                                                       | Master plan: Satoshi + JetBrains Mono, brand `#204AF8`, accent `#F6851B`, AI `#10b981`.     |
