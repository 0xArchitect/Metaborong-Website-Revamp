# Section 5 — Why-Us (A1 rebuild) — Design Spec

**Date:** 2026-05-24 · **Section:** Why-Us · **Type:** A1 rebuild (pinned scrolltelling)
**Master spec:** `DESIGN.md` (operational authority). Handoff reference:
`docs/design_handoff_homepage_revamp/` (Homepage.html "Why Us", README §3).

## Intent

Replace the static 3-card grid (`why-us.tsx`) with the handoff's **320vh horizontal
pinned card-slide**: three full-viewport cards (Speed / Product thinking / Niche depth)
that slide in from the right over each other as the user scrolls, with a pillar nav strip
at the bottom. This is the **second and final sanctioned pin** (Services is the first; the
v1.0 motion budget caps pins at 2). Horizontal motion deliberately contrasts the Services
vertical pin so the two don't read as the same trick.

Keep what's strong in the current section — the rich, client-proof body copy and the live
Clutch badge — and adopt the handoff's motion, viewport budget, and composition.

## Decisions locked in brainstorm (2026-05-24)

1. **Imagery = keep the iso `whyus/*.webp`** (user decision, D). This is a **deviation from
   anchor #06** (which bans raster isometric illustration and names this exact set "retired").
   User explicitly accepted the deviation; logged below. Images are **downscaled to fit**
   (they are 800×800; the card column is ≤ ~760px, so display is downscale-only — no quality
   loss, no upscaling).
2. **Motion / viewport** = adopt the handoff card-slide (320vh stage, sticky 100vh pin).
3. **Eyebrow above the H2** (compact header so the frame fits one viewport).
4. **Clutch badge** = keep the current widget (type 2 compact badge, ~300×45), unchanged.
5. **Lede paragraph** = dropped from the visible header, **retained as `sr-only`** in the
   SSR DOM (no SEO/AEO loss — the citation-ready summary stays crawlable).
6. **Stat chips** ("Reply within 12h", "4–12 weeks to ship") = kept in the header right
   cluster, beneath the Clutch badge.
7. **Card bodies** = keep the current rich copy with real client links (AbsolveMe / SunsetML /
   OrbitXPay / PredictRAM) — locked proof, A3.
8. **Active accent = brand blue** (`--color-brand`). Speed/Product/Depth are not the
   Web3/AI/Studio pillars, so per anchor #01 the three category colors do not apply here.

## Architecture (files)

Mirror the Services split (server shell + client pin + pure math module):

- **`components/sections/why-us.tsx`** (server) — `<Section>`-less bespoke wrapper (full-bleed
  pin like Services), renders: the `sr-only` lede + `sr-only` Clutch rating line (crawlable
  proof), and mounts the client slider. All three cards' textual content is rendered in the
  SSR DOM for crawlability.
- **`components/sections/why-us-slider.tsx`** (`'use client'`) — the pin: 320vh outer +
  sticky 100vh inner frame; `useScroll` over the outer container drives per-card `translateX`
  imperatively (no React re-render on scroll); active index is discrete React state off the
  same progress; pillar-nav click-to-jump. Gated behind `useReducedMotion()`.
- **`components/sections/why-us-slide.ts`** (pure, unit-tested) — `cardXForProgress(index, p)`
  (returns translateX % per card over the handoff windows) and `activeIndexFromProgress(p)`.
  Mirrors `services-scroll.ts`; tested in `*.test.ts`.
- **`components/sections/why-us-data.ts`** (optional) — the three reasons (tag, image, title,
  body) extracted from the current inline array, so the server shell and slider share one
  source. Keeps the `ext()` client-link helper.
- **`app/page.tsx`** — no order change (Work already precedes Why-Us as of `1f1ed23`); the
  `<WhyUsSection>` call site is unchanged. The ASCII seam already sits Work→Why-Us.

## Layout — pinned frame (sticky 100vh, three grid rows)

`grid-template-rows: auto 1fr auto`. Outer container `height: 320vh`; inner
`position: sticky; top: 56px; height: calc(100svh - 56px)` (same nav offset + svh frame as
Services; **keep the frame free of `overflow:hidden` ancestors** — that broke the Services
sticky seat). Horizontal padding = the canonical six-step chain
(`px-[16px] sm:px-[24px] md:px-[40px] lg:px-[40px] xl:px-[72px] 2xl:px-[112px]`, matching the
Services pin) inside a `max-w-[1440px]` centered container — **whitespace consistency** with
Services and the rest of the page.

**Backgrounds:** section/header/content = white (`--color-bg`), matching the handoff (Why-Us
is white to break from grey Services); the card **visual column = `bg-subtle`** (`#f5f7ff`) so
the iso webp sits in a tinted well (consistent with the Services grid-plane grey). The
Work→Why-Us ASCII seam already separates the two white sections.

1. **Header (auto):** left = `Pill "Why us"` then H2 "Why founders choose **Metaborong**"
   (brand-blue wordmark, T2 tier `clamp(32px,4vw,56px)`); right = Clutch badge then the two
   stat chips (compact, stacked, `tabular-nums`). Lede is `sr-only`.
2. **Card stack (1fr):** `position: relative; overflow: hidden`. Each card
   `position: absolute; inset: 0; transform: translateX(var(--x))`, z-index 1/2/3. Card 1
   `--x: 0%` always (back of stack). 2-col grid `1.1fr / 1fr`:
   - **Left (visual):** iso `*.webp` `object-contain` on `bg-subtle`, max display 800px (no
     upscale), centered; white corner-crop ticks; dark `[0n] TAG` chip top-left.
   - **Right (content):** mono eyebrow (tag) + H3 (`clamp(20px,1.6vw,24px)`, sentence case per
     the Session-20 casing rule) + rich body (`text-gray`, real client links).
3. **Pillar nav (auto):** 3 equal columns, hairline divider between, each a `<button>`
   (click-to-jump to dwell centers). Active = brand-blue text + 2px brand top border +
   `bg-subtle` fill; inactive = `text-gray`.

## Motion

- `useScroll({ target: outerRef, offset: ['start start','end end'] })` → progress `p`.
- Card 2 slides over `[0.20, 0.45]`, card 3 over `[0.55, 0.80]` (smoothstep), translateX
  `100% → 0%`. Card 1 fixed at 0%.
- Active index flips at `p` thresholds 0.33 / 0.67.
- Pillar-button click → `window.scrollTo` the dwell center (`[0.10, 0.50, 0.90]` of the
  320vh stage), matching the Services click-to-jump pattern.
- Applied **imperatively** to the SVG/DOM (style.setProperty on `--x`) so scroll causes no
  React re-render; active index is the only state update.
- **Reduced motion:** gate the desktop pin behind `useReducedMotion()` → render the static
  stacked fallback (all three cards in a column), no scroll-scrub. (The Services pin
  constraint, reused — `920882d`.)
- **Easing/duration:** card-color/active transitions use the documented tokens; no infinite
  animation introduced.

## Single-viewport budget (must verify)

Within `calc(100svh - 56px)` at 768 / 800 / 900 / 1080px heights, no internal overflow:
- header (eyebrow + 2-line H2 + right cluster) ≈ auto
- card stack fills 1fr; the webp + content + tag/ticks not clipped
- pillar nav (~64px) ≈ auto
Verify the webp never exceeds its 800px natural size (no upscale blur) and the card content
(H3 + ~3-line body) fits the 1fr row at min height. agent-browser + a Playwright matrix.

## Responsive / mobile

- `<lg` (and reduced-motion at any width): pin disables → static stacked column; each card
  `position: relative; transform: none`; pillar nav hidden; cards render full content with
  the webp above the text. Server-rendered (SEO-safe), no `display:none` on real content.

## Accessibility / SEO

- All three cards' text is in the SSR DOM (crawlable); lede + Clutch rating kept `sr-only`.
- webp `alt=""` (decorative; the meaning is in the adjacent text).
- Pillar nav are real `<button>`s, keyboard-operable, `aria-current`/`aria-controls` on the
  active card region; focus-visible rings (brand, 2px) on all interactives.
- Client links: real `<a target="_blank" rel="noopener noreferrer">`.
- Reduced-motion + mobile fallbacks above. Tap targets ≥44px (pillar buttons, links).

## Deviations from master plan

Per the `DESIGN.md` override rule. Honor hard constraints regardless (SSR/SEO, ARIA, mobile
fallback, reduced-motion, focus-visible, brand discipline).

1. **Anchor #06 (Imagery) — retained iso raster `whyus/*.webp`.** The v1.0 system bans raster
   isometric illustration and explicitly lists this set as "retired." **User explicitly chose
   to keep and adapt them** (downscaled into the card visual column). Accepted, eyes-open
   deviation; not a regression introduced unknowingly. Revisit if/when compliant
   code-rendered SVG or real photography is commissioned.

## Build / QA flow (A1)

`/writing-plans` → subagent-driven execution → `/frontend-design` build → `impeccable layout`
then `impeccable polish` (premium finish, user-requested) → agent-browser self-check (all 3
card states + mobile + reduced-motion) → `impeccable critique` + `tsc --noEmit` (not build) →
`/design-review` → graduate (DESIGN.md motion/pin entry + Decisions Log + CHANGELOG).

## Out of scope

- Commissioning compliant imagery (SVG/photography) to replace the webp — future.
- Testimonials / Founders / the rest of the parallel tail.
- Eyebrow numbering scheme (`04/04`) site-wide.
- Dark mode.

## Verification

- `npx tsc --noEmit` clean (not `npm run build` — PR #26 env hold).
- agent-browser live: all 3 card slide states + active pillar + click-to-jump; grounded
  single-viewport fit; webp sharpness (no upscale).
- Playwright one-off (`mb_consent=accepted`): single-viewport fit at 768–1080 heights +
  mobile (<lg) static stack + reduced-motion static stack.
- Unit tests for `why-us-slide.ts` (card-X windows, active thresholds).
- Keyboard + focus-visible + reduced-motion pass.
