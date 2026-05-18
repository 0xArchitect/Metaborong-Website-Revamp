# Hero — Full-Bleed Landscape Redesign (Design Spec)

**Date:** 2026-05-18
**Section:** Hero (`components/sections/hero.tsx`)
**Master spec:** `DESIGN.md`
**Supersedes:** the *visual* portions of `docs/superpowers/specs/2026-05-10-section-hero.md`
(ASCII video + right-column treatment). That file's copy/SSR constraints still hold; its
§1a deviation is retired by this redesign (see Deviations).
**Context:** brainstorming session, user-directed. Re-opens the 2026-05-04 "Hero unchanged"
visual lock with explicit user approval.

## Intent

Replace the two-column hero (left copy / right 43% ASCII video) with a single **full-bleed
landscape image** stage. Keep the three glassmorphic "proof" windows registered exactly on
the flower cluster, as they currently sit on the ASCII art. Recolor the copy so it stays
WCAG-AA legible over the image. No copy wording changes (A3-locked).

## Asset

- **Source of truth:** `docs/Gemini_Generated_Image_i6ni71i6ni71i6ni.png` — 2754×1536
  (aspect ≈ 1.793), 7.5 MB. Stays in `docs/` as the master; never shipped raw.
- **Shipped asset:** optimized WebP in `public/` (e.g. `public/hero-bg.webp`), served via
  Next `<Image fill priority>` (this is the LCP element). Target ≤ ~250 KB. Solid
  `#0a0e1a` background behind it to avoid load flash.
- The image already contains a baked-in HUD line ("ECOSYSTEM OPERATING SYSTEM [LIVE]
  [GRID 7-0]") — kept as-is; it threads the "instrumented system" theme through the new art.

## Layout — the aspect-locked cover stage (core requirement)

The hard requirement from the user: **the three cards must stay exactly on the flowers at
every viewport size**, the way they currently lock to the ASCII art. Viewport-anchored
cards would drift off the flowers because `object-cover` crops differently per aspect
ratio. Solution: image and cards share ONE coordinate space.

```
<section> (relative, overflow-hidden, min-h-screen, bg #0a0e1a)
  └─ Stage (absolute, centered via top/left 50% + translate(-50%,-50%),
            aspect-ratio 2754/1536, sized to COVER the section: the dimension
            that would underfill is set to 100% and the other overflows and is
            clipped — i.e. the object-cover equivalence, but applied to a real
            element so children share its space. Exact CSS is the plan's job.)
        ├─ Image      — fills stage 100%×100% (object-fill; stage already carries ratio)
        ├─ Scrim      — fills stage 100%×100% (L1 gradient, see below)
        └─ Cards ×3   — absolutely positioned at % of the STAGE (= image space)
  └─ Copy block (absolute/flex over the section, NOT in the stage — see below)
  └─ Scroll cue (absolute, section-anchored, unchanged position)
```

Because the stage carries the image's intrinsic ratio and is scaled to cover as a single
unit, any child positioned in stage-% maps to the same image feature regardless of
viewport — pure CSS, no per-frame JS. This generalizes today's behavior (cards are %
children of the constrained image box) to full-bleed.

**Copy block placement:** the copy is anchored to the **section** (left padding scale
`px-[24] md:px-[48] lg:px-[96] xl:px-[128]`, vertically centered, `max-w-[620px]`), NOT
to the stage. Copy must track the readable left zone / scrim, which is viewport-relative;
only the cards need image-space registration.

### Card registration

Three `HeroOverlayCard`s, preserving the current low / high / low 3-point stagger, each
sitting on a distinct bloom group of the new image's right-side cluster. Starting
stage-% coordinates (live-tuned during implementation against the real render):

| Card | Pillar | Lands on | start `left` / `top` |
|------|--------|----------|----------------------|
| 1 | AI (`w₁ 0.83, ∑ 0.44`) | large central anemone | ~55% / ~50% |
| 2 | Web3 (`0x4a7f...`) | upper blooms by the tree | ~70% / ~16% |
| 3 | SaaS (`/v1/deploy`) | lower-right rock blooms | ~80% / ~62% |

Card visual finish, the loading→result cycle, IO-gating, reduced-motion short-circuit, and
`aria-hidden` stay **exactly as today** — behavior unchanged, only the anchor space and
coordinates change.

## Legibility — L1 (chosen)

Left-anchored dark scrim, copy off-white. No box.

- Scrim (over the stage): `linear-gradient(90deg, rgba(8,12,24,0.82) 0%, rgba(8,12,24,0.56)
  30%, rgba(8,12,24,0.12) 52%, transparent 64%)`. **Starting values** — must be tuned and
  AA-verified against the real image pixels in the copy zone at implementation (sample the
  actual left-region luminance; raise opacity/extent until pass).
- Mobile/tablet: copy centers rather than sitting left-only, so the scrim becomes a
  stronger near-full veil (vertical or full) at `< lg`. AA verified at 375px.

## Copy recolor (wording untouched — A3 locked; treatment/color only)

| Element | Now | New |
|---|---|---|
| Eyebrow chip | `bg-bg border-border`, gray-light text | **Structure kept** (respects last session's revert). Recolor: `bg-white/7 border-white/25`, text off-white ~78%. |
| H1 | `text-dark #303030` | `--color-off-white` (#FEFEFE) |
| H1 accent "Shipped." | `text-brand #296ff0` | Keep brand; **if** it fails AA-large vs the scrimmed pixels, lift to a lightened brand tint. Decided at impl with a contrast check. |
| Blockquote | `text-gray #676767` | off-white ~86% |
| Primary CTA | brand fill, white text | unchanged (fill already AA) |
| Ghost CTA | border + dark text | light outline `border-white/45 text-white`, hover `bg-white/10`, flat/no-shadow (Bauhaus button rule preserved) |
| Scroll cue | `text-gray-light` | `text-white/70` |

## Motion

- Background is a **static image**. The ASCII-video turbulence ("glitch") is gone with the
  video. Net: one fewer infinite-animation deviation (compliance gain).
- Copy keeps the existing one-shot `<Reveal>`.
- Cards keep their existing cycle + IO-gate + reduced-motion behavior, unchanged.
- No new infinite animations introduced.

## Removed (dead after this change)

- `public/hero-ascii.mp4`, `public/hero-ascii-poster.png`.
- In `hero.tsx`: the `asciiBoxRef`/`videoRef` refs, the `video.playbackRate` /
  IntersectionObserver `useEffect` driving the video, and the two-column grid wrapper.

## Accessibility / SEO

- Copy (eyebrow, H1, blockquote, CTAs) stays server-rendered text — no SEO/AEO regression.
- Background image is decorative: `alt=""`, `aria-hidden`. Not SEO content.
- Cards remain `aria-hidden`, non-interactive — focus order unaffected.
- Contrast: scrim tuned so eyebrow + H1 + blockquote meet AA (body ≥4.5:1, large ≥3:1)
  against the real image, desktop and 375px. This is an acceptance gate, not a guess.
- `prefers-reduced-motion`: static bg is inherently safe; card behavior unchanged.

## Deviations from `DESIGN.md` (to log at graduation)

Recorded in `docs/superpowers/specs/2026-05-10-section-hero.md` (deviation log for this
section) + `CHANGELOG.md`:

- **D1 — Full-bleed decorative imagery.** Departs from "no decorative imagery / Swiss
  restraint, blueprint accents." Rationale: user-directed hero identity change with
  supplied reference + asset; baked-in HUD keeps the instrumented thread.
- **D2 — On-dark hero copy on a light site.** Off-white over a dark scrim. Rationale:
  legibility over full-bleed imagery; uses the existing `--color-off-white` token.
- **D3 — Left-anchored scrim gradient.** New section-level treatment; justified by AA.
- **Compliance gain:** §1a (ASCII shimmer/turbulence infinite) is retired entirely.
  §1b (card cycle) unchanged.
- Supersedes the 2026-05-04 "Hero unchanged" memory lock (user re-opened explicitly).

## Out of scope

- All copy wording (H1, blockquote, eyebrow text) — A3-locked.
- Deferred reconciles: site-wide chain count, DESIGN.md approved-infinite count.
- Card content/labels and cycle timing — unchanged.

## Acceptance criteria

1. Hero is one full-bleed image stage; no `57fr/43fr` grid; no ASCII video/poster refs.
2. The 3 cards visually sit on the same bloom groups at 1280, 1440, 1920, 2560 widths and
   at 1024/768/375 — verified, no drift off the flowers.
3. Eyebrow, H1, blockquote all pass WCAG AA against the real rendered pixels at desktop
   and 375px (measured, not assumed).
4. Shipped image asset ≤ ~250 KB WebP; hero LCP not regressed vs current.
5. No new infinite animations; `prefers-reduced-motion` honored; cards behave as before.
6. Copy still present in server-rendered HTML (view-source check).
7. Deviations D1–D3 logged; §1a retired; CHANGELOG entry written.
8. `pnpm tsc --noEmit` clean. Dev verified via `pnpm dev` (no clean build).
