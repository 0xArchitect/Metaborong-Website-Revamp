# Section spec — Services (A1 rebuild)

**Date:** 2026-05-24
**Branch:** design-revamp
**Context:** Phase 1 spine, Section 3. Adopts the Claude-Design v1.0 handoff
(`docs/design_handoff_homepage_revamp/Homepage.html`) as reference, not a pixel target.
Supersedes the current CSS iso-canvas implementation.

## Goal

Rebuild the Services section as a **single-viewport pinned scrolltelling**: a left accordion
of three pillars + a right SVG isometric stage whose cubes rise out of a shared grid as you
scroll. Replace the current CSS-transform iso-canvas (`services-iso-canvas.tsx`) with one SVG
stage so grid and cubes share a coordinate space. Everything visible fits in one
`100svh`-minus-nav frame; the tall scroll container only drives the pin.

## Locked decisions (brainstorm 2026-05-23/24)

1. **Cube rendering:** rebuild in **SVG**, geometry from the handoff, but **grounded** — no
   detached floating baseplate. The cube's bottom diamond stays pinned on a grid
   intersection; the cube **extrudes upward** (faces grow in height, top plate lifts) driven
   by a `--rise` 0→1. It grows *out of* the grid.
2. **Rise mechanism:** **continuous scroll-linked** via `framer-motion` `useScroll`. The
   active pillar's cube rises to full; others sit flat; transitions crossfade the rise
   between outgoing/incoming cube. Glyph fades in past ~35% rise.
3. **Header (handoff treatment), moved inside the pin:** left-aligned `section-h-eyebrow`
   "What we build" (mono 11px, hairline rule before). H2 left-aligned, trailing phrase swaps
   **text + color** per active pillar:
   - Web3 → "Web3 protocols." (`#296ff0`)
   - AI → "Production AI." (`#0F766E`)
   - Studio → "End-to-end products." (`#C2410C`)
   Base/default phrase before scroll = Web3 (first pillar).
4. **Left accordion:** keep current structure (`[0n]` num / pillar label / expand →
   subservice links + "See all"). **No tech-stack pills.** Subservice rows get larger
   spacing, ≥44px targets.
5. **Eyebrow numbering:** label only ("What we build") + internal **01/03** pillar step
   counter in the bar. No site-wide "X / 04" scheme.
6. **Single viewport:** bar → (H2 + accordion | iso stage) → scroll hint, all inside
   `calc(100svh - 56px nav)`. The intro lede paragraph is **dropped** (equivalent copy
   preserved in the FAQ JSON-LD for SEO/AEO).
7. **Data:** `services-data.ts:227` Studio headline changed to
   `End-to-end product engineering`.

## Components

- `services.tsx` — drop the centered intro header block + lede. Keep `<Section>` wrapper,
  FAQ JSON-LD (verify it still carries the studio/boutique framing copy). Render
  `ServicesPillarsLazy`.
- `services-pillars.tsx` — the pinned orchestrator. Replaces IO-driven active state with
  `framer-motion useScroll` progress → derived active index (`floor(progress × 3)`, clamped)
  → feeds H2 phrase/color, open accordion row, and per-cube `--rise`. Header (eyebrow + H2)
  moves **into** the sticky frame's left column. Accordion click → scroll to that segment.
- `services-iso-stage.tsx` — **new**, replaces `services-iso-canvas.tsx`. One `<svg>`:
  floor gradient + iso grid lines + edge-fade mask (from handoff defs), three grounded cubes
  (`left`/`right`/`top` faces + edge path), top-plate glyphs (web3 cube-cluster, ai
  node-graph, studio layered-diamond), contact shadows, `WEB3/AI/STUDIO` labels + `01/02/03`
  indices. Each cube accepts a `rise` (0→1) and `active` prop. `--rise` drives face height,
  top-plate Y, glyph opacity (`(rise - 0.35) × 1.8`), shadow opacity.
- `services-pillars-lazy.tsx` — unchanged dynamic import seam.
- Mobile `MobileStack` (in `services-pillars.tsx`) — **kept as-is** (accordion, no pin, no
  SVG stage).

## Geometry (grounded cube)

Reuse the handoff iso projection: top diamond `0,0 65,37 130,0 65,-37` (130 wide × 74 tall),
floor diamond at the cube's grid intersection. Cube faces:
- `left`  parallelogram, height `H = rise × 100`, anchored at floor left edge.
- `right` parallelogram, height `H`, anchored at floor front edge.
- `top`   diamond translated up by `H`.
At `rise = 0` the cube is a flat floor diamond on the grid; at `rise = 1` it's a full cube
whose **bottom edge is still on the grid intersection** (extrude up, never translate the
whole body up). This is the key difference from the handoff (which floats the cube off a
separate baseplate, leaving the gap the user rejected).

Three cubes on iso-horizontal grid intersections one cube-edge apart (carry the current
build's spacing: ±173.2px screen-X), so plates nearly touch. Grid + cubes in the **same SVG
viewBox** → alignment is structural, not eyeballed.

## Active-pillar logic

Single source: scroll progress `p` (0→1) over the pinned container.
`activeIndex = clamp(floor(p × 3), 0, 2)`. Per-cube rise = a smooth bump centered on its
segment (active cube → 1, neighbors → 0, crossfaded across the boundary). Active index also
selects H2 phrase+color and the expanded accordion row. Accordion-row click computes the
segment's scroll target and `scrollTo` smooth (port current logic).

## Motion / dependency

- Install `framer-motion` (roadmap-sanctioned, first use; scoped to this section + Why-Us).
  **Verify the correct current package** (`framer-motion` vs the renamed `motion` /
  `motion/react`) via ctx7 before adding — do not assume.
- `prefers-reduced-motion: reduce`: no scroll-link; rise snaps to the active cube discretely;
  glyph shown for active only; no crossfade.

## Single-viewport budget (must verify)

Within `calc(100svh - 56px)` at 720 / 768 / 800 / 900px viewport heights, no internal
scroll/overflow:
- bar (~44px) + scroll hint (~32px)
- left: eyebrow + H2 (~2 lines) + 3 accordion rows, one expanded with ≤5 subservices + "See all"
- right: iso stage fills remaining height; cubes + labels not clipped
Cap the accordion body (`max-h` + internal scroll only if a pillar exceeds budget) and the
SVG stage height; confirm cube apex + labels stay inside the frame at min height.

## Accessibility / SEO

- Accordion rows are real `<button>`s (`aria-expanded`/`aria-controls`), subservices real
  `<a>` to `/services/<pillar>/<slug>/`. SVG `aria-hidden`.
- Crawlable SSR: all three pillars' subservice links present in DOM (not gated behind scroll
  JS). Active state is presentational only.
- FAQ JSON-LD retained; confirm dropped-lede copy is represented there.
- focus-visible rings, ≥44px targets, keyboard reachable, full-width scroll segment doesn't
  trap focus.

## Verification

- agent-browser live throughout cube work (user-mandated): full-page + rise states at each
  pillar; confirm grounded base (no float gap), glyph fade, H2 color swap.
- Playwright one-off (`mb_consent=accepted` cookie): measured single-viewport fit (no
  overflow) + grid-alignment deltas at 720/768/800/900.
- `npx tsc --noEmit` clean (not `npm run build`).
- Reduced-motion + mobile (<lg static stack) + keyboard pass.

## Out of scope

- Why-Us rebuild (next A1), Work reorder, parallel tail.
- Site-wide eyebrow numbering scheme.
- Dark mode.

## Deviations from master plan (graduated 2026-05-24)

Logged per the DESIGN.md per-section override rule. Master spec: `DESIGN.md`. Hard
constraints (SSR/SEO, ARIA, reduced-motion, focus-visible, brand discipline) are honored.

1. **H2 below the T1 tier.** DESIGN.md tiers Services H2 at T1 (`clamp(36px,4.6vw,64px)`,
   an "emotional peak"). The pinned `calc(100svh-56px)` frame has a vertical budget the tier
   system didn't anticipate, so the H2 uses `clamp(27px,min(4.2svh,3.5vw),44px)` — sized to
   keep the whole section in one viewport (the locked single-viewport requirement). Accepted
   single-viewport deviation, not a regression.
2. **Desktop subservice links 38px (< 44px).** The lg+ pinned variant floors sublink height
   at `clamp(38px,…)` to fit the single-viewport budget on short screens. This is a pointer
   (lg+) surface; the touch/mobile `<details>` stack already uses `min-h-[44px]`. Accepted
   single-viewport deviation on the pointer surface.
3. **Component-local structural hex.** `services-iso-stage.tsx` uses component-local hex for
   the iso render (cube neutral faces, grid lines, floor diamond, white-shaded glyph ramp,
   contact shadow) and lighten/darken shade steps of the pillar token hexes for the active
   cube faces/glyph marks. Same sanctioned precedent as the trefoil "structural slate" — the
   canonical pillar token hexes (`#296ff0` / `#0F766E` / `#C2410C`) remain the mid-tone
   anchors; the tints are local and not promoted to global tokens.
4. **Reduced-motion → static stack** (v1.0 pin hard-constraint, satisfied): the desktop pin
   is gated behind `useReducedMotion()` and renders the static `MobileStack` instead of the
   scroll-scrubbed pin.

### Post-rebuild visual refinements (2026-05-24)

- Cube-top glyphs extruded to 3D iso solids, rendered **white** (grey-shaded for form):
  **Web3 = Ethereum mark** (flat faceted, no prism depth), **AI = node-graph with cube
  nodes**, **Studio = framed product block**. Per-pillar marks; user-picked.
- **AI (centre) cube seated one grid cell up** (`CUBE_DY = [0,-74,0]`, one lattice step) for
  clean spacing above its apex; stays grounded; axis labels stay on the shared baseline.
- Iso grid is a **feathered atmospheric plane** dissolving into the section grey (no white
  panel/border); lower edge trimmed to fade just below the cube labels.
- QA: impeccable critique **35/40** (not AI-slop); deterministic detector clean except the
  rule-draw `width` animation, since changed to `transform: scaleX`.
