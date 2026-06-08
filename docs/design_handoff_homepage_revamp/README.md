# Handoff: Metaborong Homepage Revamp

## Overview

This bundle is the design reference for the Metaborong.com homepage revamp. It includes:
- A complete HTML mock of the new homepage (`Homepage.html`)
- The locked v1.0 design system (`design-system.html`) — your single source of truth for tokens, motion, color, type, spacing
- All `public/` assets referenced by the design

**Scope of the redesign:** Three sections were redesigned with new interactions. The rest of the page (hero, problem, social proof, team, comparison, FAQ, contact) is structurally unchanged and only needs a token-conformance pass to match the locked design system.

The new interactions are:
1. **Services / What we build** — pinned vertical scroll with rising isometric SVG cubes; per-pillar accordion on the left
2. **Our Work** — background changed from `--color-bg-subtle` to `--color-bg` (white)
3. **Why Us** — pinned horizontal scroll; three landscape cards slide in from right, covering each other; pillar nav strip at the bottom

Section ordering changed too: **Our Work now precedes Why Us** (it didn't before).

---

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly.

Your task is to **recreate these designs in the existing Next.js codebase** using its established patterns (React 19 components, Tailwind v4 utilities, the existing `globals.css` token layer). Do not import the HTML wholesale.

When in doubt about a token, color, or motion curve, **the locked design system (`design-system.html`) wins** — that document was the source for every value in the HTML mock, and it's also the source the codebase should already be aligned with.

---

## Fidelity

**High-fidelity (hifi).** All colors, typography, spacing, motion curves, and interaction timings are final. Recreate pixel-by-pixel using the codebase's existing libraries and Tailwind utilities. The locked tokens (`design-system.html` :17–53) drive every value.

---

## Codebase Target

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Styling:** Tailwind v4 + a CSS variable layer in `app/globals.css` containing the locked tokens
- **Fonts:** Switzer (Fontshare, self-hosted .woff2 from `/public/fonts`) + JetBrains Mono (Google Fonts, OFL)
- **Image:** Next.js `<Image>` component with WebP sources

---

## Implementation Order (Recommended)

Ship in this order to minimize risk:

1. **Token audit pass** — confirm `globals.css` has all tokens from `design-system.html` :17–53. Fix any drift.
2. **Our Work background → white** — single class swap, no interaction change. Smallest possible PR. Ship and verify.
3. **Section order swap** — move `<OurWork />` above `<WhyUs />`. Eyebrow numbering updates: Our Work becomes `03 / 04`, Why Us becomes `04 / 04`.
4. **Services / What we build (pinned vertical)** — new component. See spec below.
5. **Why Us (pinned horizontal)** — new component. See spec below.
6. **Final pass** — token conformance on the unchanged sections (Hero, Problem, Social Proof, Team, Comparison, FAQ, Contact).

---

## Section Specs

### 1. Services / "What we build" — Pinned Vertical Scroll with Isometric Cubes

**File reference:** `Homepage.html` — search for `<!-- ─── SERVICES / WHAT WE BUILD (pinned isometric scroll) ─── -->`

**Concept:** As the user scrolls through a 380vh stage, the section pins to the viewport. The left panel is a 3-step accordion (Web3 / AI / Product Studio). The right panel is an isometric grid with three cubes. The active service's cube rises out of the grid in its category color; the inactive cubes sit grey at the base. Scrolling advances the active step.

**Why this design:** The cubes literalize the "three pillars" message. Pinning lets the user dwell on each pillar without the cubes scrolling away. The accordion on the left holds real SEO-routed subservice anchors (6 per category) so the section earns its scroll budget.

**Layout:**
- `<section>` is `height: 380vh`, `background: --color-bg-subtle`
- Inner sticky pin (`position: sticky; top: 0; height: 100vh`)
- Grid: top bar (auto), main content (1fr), scroll hint (auto)
- Main content: 2-column grid, `0.95fr 1.05fr` (left accordion, right iso-stage)

**Top bar contents:**
- Eyebrow text: `What we build · 02 / 04`
- 3-segment progress bar (each segment = one pillar; segment fills proportionally as you scroll its third)
- Step counter: `01 / 03` etc.

**Left panel (accordion):**
- H2: `A small, senior team. <em>{phrase}</em>` where the `<em>` swaps text per active step:
  - Step 1: "Three pillars. Engineered."
  - Step 2: "Three pillars. Agentic."
  - Step 3: "Three pillars. End to end."
- 3 stacked `<svc-block>` rows, top-border hairline between each. Active row at opacity 1, inactive at 0.38.
- Each row when **active** expands to show: body paragraph + tech-stack chip ribbon + 6 subservice anchors in a 2-col hairline grid + "See all X services →" CTA.
- The expanding panel uses `grid-template-rows: 0fr → 1fr` for a smooth, height-measurement-free expand.

**Right panel (isometric stage):**
- Single inline SVG, `viewBox="0 0 680 612"`
- Components inside the SVG:
  - Isometric floor grid (two crossing line groups, mask-faded into the back)
  - Three cube baseplates (rhombus diamonds) — tinted with the active category color when active
  - Three cubes (each a `<g>` with three `<polygon>` faces: top, left, right + an edge path)
  - Three drop-shadow ellipses
  - A glyph on each cube's top face that fades in once the cube rises past ~35%:
    - Web3 → 4 mini iso-blocks (one raised as the keystone)
    - AI → 4 nodes in a triangular-feedforward graph with connecting lines
    - Studio → nested isometric window frames with a center dot
  - Labels under each baseplate: `WEB3 / AI / STUDIO` with index ticks `01 / 02 / 03`
- **Cube positioning gotcha:** each cube needs an OUTER `<g transform="translate(X, Y)">` wrapper for SVG positioning, and an INNER `<g class="cube">` for the CSS `transform: translateY()` from the rise animation. CSS transform on an SVG element overrides the SVG `transform` attribute — keep them on separate elements.

**Animation logic (JS):**
- Compute scroll progress `p` through the stage: `p = max(0, -rect.top) / (stageH - vh)`, clamped 0..1
- For each cube `i`, compute rise using smoothstep peaked at `(i + 0.5) / 3`:
  ```js
  function cubeRise(i, p) {
    const center = (i + 0.5) / 3;   // 0.167, 0.5, 0.833
    const half = 1 / 6;
    const d = Math.abs(p - center);
    if (d >= half) return 0;
    return smoothstep(1 - d / half);
  }
  ```
- Apply rise as a CSS custom property: `cube.style.setProperty('--rise', r)` and CSS does `transform: translateY(calc(var(--rise) * -86px))`
- Active index: `Math.floor(p * 3)` clamped 0..2
- All updates wrapped in `requestAnimationFrame`, scroll listener is `{ passive: true }`

**Subservice URLs (6 per category):** Already encoded in `Homepage.html`. SEO-routed paths like `/services/web3/web3-tokenomics-design`. **Do not change these slugs without consulting SEO.**

---

### 2. Our Work — Background Change Only

**File reference:** `Homepage.html` — search for `<!-- ─── OUR WORK ─── -->`

**Change:** Remove the `section--subtle` class so the section uses white (`--color-bg`) instead of grey (`--color-bg-subtle`).

**Why:** Creates a clean visual break between Services (grey) and Why Us (white). Without this, both Services and Our Work were grey and visually merged.

**Content unchanged.** 4 work cards (KGeN, DATA3 AI, Bionic, Bayan) + CTA strip.

---

### 3. Why Us — Pinned Horizontal Scroll

**File reference:** `Homepage.html` — search for `<!-- ─── WHY US (horizontal pinned) ─── -->`

**Concept:** A 320vh stage pins to the viewport. The bottom strip shows three pillars (Speed / Product thinking / Niche depth) with the active one highlighted in its category color. As the user scrolls, Card 2 slides in from the right covering Card 1; further scrolling, Card 3 slides in from the right covering Card 2. Each card has a photo on the left and content (eyebrow + H3 + body paragraph) on the right.

**Why this design:** Equal pillars stay equal because the pillar strip at the bottom always shows all three. Pinning gives each card a luxurious full-viewport stage. Horizontal motion differentiates from the Services vertical pin so the two pinned sections don't feel like the same trick twice. Our Work between them is the release valve.

**Layout:**
- `<section>` `height: 320vh`, `background: --color-bg`
- Inner sticky pin (`position: sticky; top: 0; height: 100vh`)
- 4 rows: top bar (auto), header (auto), card stack (1fr), pillar nav (auto)
- The stack is `position: relative; overflow: hidden`. Cards are `position: absolute; inset: 0; transform: translateX(var(--x, 100%))`. Card 1 has `--x: 0%` always. JS animates `--x` on cards 2 and 3 based on scroll progress.

**Card structure:**
- Top ribbon: `REF · 01 / 03 ··· Outcome · {Launch | Equity | Multichain}`
- Main 2-col grid: photo (left, `1.15fr`) | content (right, `1fr`)
- Photo: full-bleed in its column, 4 corner-crop ticks in white at the photo edges, dark category tag in top-left (`[01] Speed` etc.)
- Content: category eyebrow + large H3 + body paragraph, centered vertically
- No bottom evidence strip, no stat counter (these were removed during iteration)

**Pillar nav at bottom:**
- 3 equal columns, hairline divider between
- Each is a `<button>` for click-to-jump
- Active pillar gets the category color + 2px top border accent + `--color-bg-subtle` background

**Animation logic (JS):**
- Compute scroll progress `p` through the stage (same pattern as Services)
- Card 1 always at `--x: 0%` (it's the back of the stack)
- Card 2 slides in over progress window `[0.20, 0.45]`:
  ```js
  const t1 = clamp((p - 0.20) / 0.25, 0, 1);
  cards[1].style.setProperty('--x', `${(1 - smoothstep(t1)) * 100}%`);
  ```
- Card 3 slides in over progress window `[0.55, 0.80]`
- Active index transitions at progress thresholds `0.325` and `0.675`
- Pillar buttons jump to dwell centers `[0.10, 0.50, 0.90]` of stage scroll on click

**Z-index stacking:**
- Card 1: `z-index: 1`
- Card 2: `z-index: 2`
- Card 3: `z-index: 3`
- The pillar nav sits in a separate grid row, so cards don't need to clear it

**Mobile fallback (`<900px`):**
- Pin disables (sticky → static, height → auto)
- Stack becomes a flex column, cards become `position: relative; transform: none`
- Pillar nav hides

---

## Interactions & Behavior (cross-cutting)

### Reveal-on-scroll for unchanged sections
- `IntersectionObserver` adds `.is-visible` to elements with `.reveal` class
- Threshold: `0.05`; rootMargin: `0px 0px -10% 0px`
- One-shot per element (unobserve after first intersection)
- Initial state: `opacity: 0; transform: translateY(8px)`; ends at `opacity: 1; transform: none`
- Duration: `--duration-base` (400ms); easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Reduced motion
- `prefers-reduced-motion: reduce` MUST kill every animation: count-up, slide, cube rise, accordion expand, image scale, draw-in.
- The locked design system requires this (anchor #05).

### Animation anchor enforcement (from `design-system.html`)
- **#01 Color:** `#296ff0` is the only color allowed in brand chrome. Category colors (`#0F766E` AI / `#C2410C` Studio) only appear *inside* their pillar contexts.
- **#03 Surface:** Borders before shadows. No idle-state shadow. No glow. Card hover gets `--shadow-sm` only.
- **#05 Motion:** Animations play once and stop. IO-gated. Reduced-motion safe. The only continuous-motion exceptions are the trust-bar marquee, the orb HUD blink, and the at-top scroll cue.
- **#06 Imagery:** Real photographs of real people. Code-rendered SVG (the iso cubes qualify). ASCII art. No stock, no AI imagery, no 3D renders, no isometric raster.

---

## Design Tokens (verbatim from `design-system.html` :17–53)

All tokens are defined as CSS variables on `:root`. Reference them; do not hard-code hex.

```css
/* brand */
--color-brand:        #296ff0;
--color-accent:       #C2410C;     /* aka --color-cat-studio in Homepage.html */
--color-ai:           #0F766E;     /* aka --color-cat-ai in Homepage.html */

/* text */
--color-dark:         #303030;
--color-gray:         #676767;
--color-gray-light:   #999999;
--color-gray-subtle:  #D9D9D9;
--color-off-white:    #FEFEFE;

/* surface */
--color-bg:           #ffffff;
--color-bg-subtle:    #f5f7ff;
--color-bg-raised:    #fafbff;
--color-canvas:       #0a0a0a;

/* border */
--color-border:         #e5e7eb;
--color-border-subtle:  #f3f4f6;

/* type */
--font-brand: 'Switzer','Inter','Helvetica Neue',sans-serif;
--font-mono:  'JetBrains Mono','Courier New',monospace;

/* spacing */
--spacing-1: 4px;   --spacing-2: 8px;   --spacing-3: 12px;  --spacing-4: 16px;
--spacing-5: 24px;  --spacing-6: 32px;  --spacing-7: 48px;  --spacing-8: 64px;
--spacing-9: 96px;  --spacing-10: 128px;

/* radius */
--radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;

/* shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / .04), 0 1px 3px 0 rgb(0 0 0 / .06);
--shadow-md: 0 4px 12px -2px rgb(0 0 0 / .08), 0 2px 6px -1px rgb(0 0 0 / .04);
--shadow-lg: 0 12px 32px -8px rgb(0 0 0 / .12), 0 6px 16px -4px rgb(0 0 0 / .06);

/* motion */
--duration-instant: 150ms;
--duration-fast: 250ms;
--duration-base: 400ms;
--duration-slow: 620ms;
--duration-deliberate: 900ms;

/* horizontal section padding (responsive) */
--section-px: 16px;
@media (min-width: 640px)  { --section-px: 24px; }
@media (min-width: 768px)  { --section-px: 40px; }
@media (min-width: 1024px) { --section-px: 48px; }
@media (min-width: 1280px) { --section-px: 80px; }
@media (min-width: 1536px) { --section-px: 128px; }
```

**Canonical easing:** `cubic-bezier(0.16, 1, 0.3, 1)` is the "ride" curve. Use this for all entry / expand animations. Linear is for the immediate scroll-tracked transforms (the pinned-scroll card slides). Cubic-out for count-up.

---

## Assets

All assets used in the design are in `public/`:

```
public/
├── whyus/
│   ├── speed.webp           — Speed card photograph
│   ├── product-thinking.webp — Product thinking card photograph
│   └── niche-depth.webp     — Niche depth card photograph
├── hero-ascii-poster.webp   — Hero ASCII figure poster image
├── founders/
│   ├── arnab.svg            — Founder photo SVG (Arnab Ray)
│   └── anik.svg             — Founder photo SVG (Anik Ghosh)
├── contact/
│   └── landscape.webp       — Contact section background image
└── clients/                 — Client logo SVGs (multiple files)
```

When porting to Next.js, replace `<img src="...">` with `<Image src="..." />` and add `width` + `height` attributes. The `loading="lazy"` and `decoding="async"` hints in the mock are best-effort; Next.js `<Image>` handles these properly.

**Fonts** are referenced via Fontshare (Switzer) and Google Fonts (JetBrains Mono) in the HTML. Production should self-host `.woff2` from `/public/fonts/` per the design system's recommendation.

---

## Section Inventory (full page)

| # | Section | Status | Notes |
|---|---------|--------|-------|
| 01 | Hero | Unchanged | ASCII video + chips. Token-conformance pass only. |
| 02 | Trust bar | Unchanged | Client-logo marquee (continuous, allowed by anchor #05). |
| 03 | Problem | Unchanged | Trend-window chart + lede. |
| 04 | **Services / What we build** | **NEW interaction** | Pinned vertical scroll, iso cubes. Full spec above. |
| 05 | **Our Work** | **CHANGED bg** | White instead of grey. Now sits before Why Us. |
| 06 | **Why Us** | **NEW interaction** | Pinned horizontal scroll. Full spec above. |
| 07 | Social Proof / Clutch | Unchanged | |
| 08 | Team | Unchanged | |
| 09 | Comparison table | Unchanged | |
| 10 | FAQ | Unchanged | |
| 11 | Contact CTA | Unchanged | |
| — | Footer | Unchanged | |

Eyebrow numbering in the new order: Services `02 / 04`, Our Work `03 / 04`, Why Us `04 / 04`.

---

## Files in This Bundle

```
design_handoff_homepage_revamp/
├── README.md                     — This file
├── Homepage.html                 — Final design reference (all sections)
├── design-system.html            — Locked v1.0 design system (single source of truth)
└── public/                       — All assets referenced by Homepage.html
    ├── whyus/                    — Why Us section photographs
    ├── founders/                 — Team section avatars
    ├── contact/                  — Contact section background
    ├── clients/                  — Trust bar logos
    └── hero-ascii-poster.webp    — Hero poster
```

Open `Homepage.html` in a browser to see the live design. Open `design-system.html` in another tab — refer to it whenever you need a token, motion curve, or color reference.

---

## Open Questions for the Developer

1. **Subservice URLs in Services accordion** — the slugs are placeholders matching the existing site's routing pattern (`/services/web3/web3-tokenomics-design`). Confirm these match the actual Next.js routes before shipping, or update them in `Homepage.html` first if the routing has drifted.
2. **Why Us photo cropping** — the mock uses `object-fit: cover`. If a specific focal point matters per photo, set it via Next.js `<Image>` `objectPosition` per card.
3. **Mobile breakpoint for Why Us pin** — currently set to `900px`. If your codebase uses a different breakpoint (e.g., 768px or 1024px for desktop), align this value.
4. **Reduced motion** — verify your CI / a11y testing surface honors `prefers-reduced-motion`. Both new pinned sections degrade gracefully but must be verified in your environment.

---

## Suggested Claude Code Prompt

When you open this bundle in Claude Code, a good starting prompt is:

> Read `design_handoff_homepage_revamp/README.md` and `design-system.html` first. Then implement the changes section by section in the existing Next.js codebase, starting with the smallest (Our Work background → white), then the section reorder, then the two new pinned-scroll sections. Use the existing component patterns in `app/`. Stop after each section so I can review.

---

End of handoff.
