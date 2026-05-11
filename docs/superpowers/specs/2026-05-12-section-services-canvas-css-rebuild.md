# Services Canvas — CSS Iso Rebuild (Handoff)

**Date:** 2026-05-12
**Section:** Services / "What we build" — right-panel canvas only
**Branch:** `section/what-we-build-redesign` (worktree at `mb-website-services/`)
**Supersedes (canvas portion only):** `docs/superpowers/specs/2026-05-11-section-services-redesign.md` Deviation #2 (R3F-based 3D iso accent). The pillar layout, child-service rendering, accordion, sticky pin, and SEO/AEO obligations from the 05-11 spec all still hold — this doc only swaps the visual engine for the canvas.
**Figma reference:** Frame `1707481128` (canvas-only view) inside file `mQsbMuw0spVgIu7jXirr3o`. Earlier reference Frame `1707481126` (full section view) still valid for the surrounding accordion + canvas layout.

## Status

**Shipped (uncommitted on this branch):** Right-panel canvas rebuilt from R3F/WebGL to pure CSS 2D isometric transforms. Renders 3 pillar cubes/plates on an iso grid, animates the active pillar (extrude + colour cross-fade), labels float outside each diamond parallel to back edges. No 3D libraries used by this component.

**Not committed** at handoff — diff lives on `section/what-we-build-redesign` in the working tree. `git status` shows only `components/sections/services-iso-canvas.tsx` modified plus the new specs/docs from this handoff.

## Why CSS instead of R3F

1. **The Figma design is fake-3D, not real-3D.** Each face uses flat fills with hand-painted gradients (`#296ff0` top + `inset 0 50px 80px rgba(255,255,255,0.24)` shine; side faces baked gradient images). R3F's directional lighting always reads as "WebGL-y" — too smooth, too gradient-aware. We spent 3 sessions fighting this.
2. **Text quality.** Labels rendered as HTML get perfect antialiasing. R3F's SDF text was fuzzy at 22px.
3. **Bundle weight.** Three + drei adds ~250KB gzipped. The marketing site doesn't use 3D anywhere else *for this section*. R3F is still in package.json because `components/hero-orb/` uses it — don't remove the dep.
4. **CSS borders are trivial.** Figma's `border-[0.667px] border-white` on the cube top is one line in CSS, painful in R3F.

## Architecture

### Coordinate system

Single iso grid is the source of truth for positions. Cubes are objects at integer grid lattice points; the grid uses the cube's iso transform so cube edges run parallel to grid lines.

**Grid transform** (matches cube top face exactly):
```css
transform: translate(-50%, -50%) rotate(-30deg) skewX(30deg) scaleY(0.866);
```

Read right-to-left in CSS application order:
1. `scaleY(0.866)` — compress vertically
2. `skewX(30deg)` — tilt
3. `rotate(-30deg)` — final orientation
4. `translate(-50%, -50%)` — centre on canvas

Under this transform:
- Grid axis (1, 0) maps to screen (0.866, -0.5) — going up-right
- Grid axis (0, 1) maps to screen (0.866, +0.5) — going down-right
- Grid diagonal (1, 1) maps to screen (1.732, 0) — **pure horizontal**

Three pillars sit at grid `(-1,-1)`, `(0,0)`, `(+1,+1)` for cell size 100px → screen offsets `-173.2, 0, +173.2` from canvas centre. Each cube's bottom diamond fits exactly inside a 1×1 grid cell.

### Cube assembly

Each pillar is a 173.2 × 200 div containing three face divs:

| Face | CSS transform | Notes |
|---|---|---|
| `iso-face--top` | `translateY(0) rotate(-30) skewX(30) scaleY(0.866)` | 100×100 div → iso diamond |
| `iso-face--left` | `translateY(0) skewY(30) scaleX(0.866)` | parallelogram, anchored to diamond's L vertex |
| `iso-face--right` | `translateY(0) skewY(-30) scaleX(0.866)` | parallelogram, anchored to diamond's F vertex |

**Active state** sets `translateY(-100px)` on all three faces (top lifts, sides grow from `height: 0 → 100px`). One `transition: height/transform/background/box-shadow 520ms cubic-bezier(0.16, 1, 0.3, 1)` declaration handles every state change.

**Plate state** = same DOM, just no `data-active="true"` → side faces collapse to 0 height, top face is grey, no white shine.

### Colour matrix

Top face = pillar colour (`#296ff0` / `#10b981` / `#F6851B`).
Side faces use `color-mix(in srgb, var(--pillar-color) X%, black)`:
- LEFT face (front-left of cube): 78% (medium dark)
- RIGHT face (front-right of cube): 62% (darker — receives less light in iso lighting convention)

Plate top face: solid `#c7ccd1` with `box-shadow: inset 0 -8px 16px rgba(0,0,0,0.08)` for subtle depth.

### Labels

HTML text (perfect AA), positioned absolutely inside each pillar with an iso-plane transform that makes the text appear to lie on the iso surface.

- **Left-orientation** (AI, WEB3): `rotate(-30deg) skewX(-30deg) scaleY(0.866)` — text slants up-right, parallel to the diamond's back-LEFT edge.
- **Right-orientation** (PRODUCT only): `rotate(30deg) skewX(30deg) scaleY(0.866)` — text slants down-right, parallel to the diamond's back-RIGHT edge.

Labels float **outside** the diamond, not on its surface. Asymmetric `top` values (left:108 vs right:70) because the rotation direction is opposite, so the same `top` puts the bbox at different visual heights.

WEB3 gets a special override (`data-pillar-id="web3"`) shifting ~30px along the back-left edge toward the back vertex, so when AI rises on the left the AI cube doesn't collide with the WEB3 label bbox.

When the pillar becomes active, the label `translateY(-100px)` so it rides up with the cube, preserving its outside-the-block stance.

## File map

| File | Role |
|---|---|
| `components/sections/services.tsx` | Section wrapper (FAQ JSON-LD, eyebrow, H2, lede, AEO blockquote). Unchanged in this rebuild. |
| `components/sections/services-pillars.tsx` | Scrolltelling layout — 260vh sticky pin on lg+, IntersectionObserver drives `activeId`. Renders `<LeftAccordion>` and `<RightCanvas>` which embeds `<ServicesIsoCanvas>`. Unchanged. |
| `components/sections/services-iso-canvas.tsx` | **The rebuild.** ~300 LOC. CSS isometric scene, three pillars, animation. |
| `components/sections/services-data.ts` | Pillar + child data. Unchanged. |

R3F packages stay in `package.json` because `components/hero-orb/` still uses them.

## Open work (carry into next session)

Visual polish only — no architectural changes needed:

1. **Cube top label collision check.** When the cube is at its tallest, labels can come close to the section's top edge of the canvas (which has `overflow: hidden`). On narrow viewports the WEB3 active label's bbox top extends to canvas-y ≈ 12.5px. Acceptable now but verify at smaller breakpoints.
2. **PRODUCT label overhang.** Right-orientation label extends past the PRODUCT cube's right vertex. On viewports < 1100px wide the label can clip against the canvas right edge. Either tighten `left:110px` or accept slight clip — design call.
3. **Grid extent.** Currently 14×14 cells = 1400×1400 transformed area. On very wide viewports the grid edges may show as a visible boundary. Either grow the grid or fade the edges with a mask.
4. **Mid-transition feel.** 520ms cubic-bezier is good. If feels slow during fast scroll, try 420ms or `ease-out`.
5. **Reduced-motion path.** Already short-circuits transitions via media query, but verify by toggling System Prefs.

## How to resume

```bash
cd /Users/zephyr/Claude-Workspace/projects/mb-website-services
git status        # confirm only services-iso-canvas.tsx + new docs modified
PORT=3001 npm run dev
```

Open `http://localhost:3001/`, scroll into the "What we build" section. The three pillars are at scroll positions roughly 30/50/70% of the sticky-pinned 260vh range.

### Verifying visually with agent-browser

```bash
agent-browser open http://localhost:3001/
agent-browser eval "document.querySelectorAll('button').forEach(b => {if (b.textContent?.trim() === 'Reject') b.click();}); 'ok'"
agent-browser scrollintoview "#services" && agent-browser scroll down 800
agent-browser wait 1500
agent-browser screenshot screenshots/handoff-web3.png
```

Then scroll up/down 300-500px to toggle active states. Compare against `screenshots/figma-canvas-fresh.png` (downloaded from Figma asset URL on 2026-05-12).

### Browser-lock convention (parallel session)

A second Claude session is on `section/problem-redesign` in the main repo. Before any browser-using skill in this worktree, print `🔒 BROWSER LOCKED — running <command>`. After, print `🔓 BROWSER FREE`.

### Don't touch (still locked by parallel-session rule)

- `CHANGELOG.md`
- `DESIGN.md`
- `app/globals.css` (beyond section-scoped CSS, which is fine inside the canvas component's `<style precedence="default">`)
- `MEMORY.md` (project-level; auto-memory is per-user and OK to update)

These graduate serially once both `section/what-we-build-redesign` and `section/problem-redesign` land on `design-revamp`.

## What changed from the 05-11 spec deviation log

The 05-11 spec's Deviation #2 said "Each pillar panel contains a self-contained SVG isometric scene… active pillar's shape is rendered as a raised cube via R3F/WebGL". This handoff supersedes:

- **Engine:** R3F + Three.js → pure CSS 2D transforms
- **Animation duration:** ~motion.duration.slow (620ms) → 520ms cubic-bezier(0.16, 1, 0.3, 1) (faster, snappier)
- **Cube colour:** `#204AF8` (brand blue from `services-data.ts`) → `#296ff0` (Figma-specific lighter blue for the cube top, so the white inset shine reads). The brand `#204AF8` is preserved everywhere else (accordion bar, hub link).
- **Lighting model:** baked R3F directional lights → flat fills + Figma's `inset 0 50px 80px rgba(255,255,255,0.24)` shine + side-face `color-mix(... black)` darkening
- **Labels:** R3F SDF text inside canvas → HTML text positioned absolutely with iso-plane CSS transforms, floating outside the diamonds parallel to back edges

All other deviations (#1 sticky-rail layout, #3 top-5 children + hub link, #4 text-link hub CTA, #5 boxed-pill eyebrow, #6 hard constraints) carry forward unchanged.

## Reference screenshots (local only — gitignored)

- `screenshots/figma-canvas-fresh.png` — Figma reference, WEB3 active state at 1240×594
- `screenshots/css-v8-web3.png` — final implementation, WEB3 plate state (AI active)
- `screenshots/css-v8-web3-active.png` — final implementation, WEB3 active state
- 80+ earlier iterations document the path; safe to delete if cleaning.

## Key insights for the next session

1. **The grid and cubes must share a transform.** This is the realisation that fixed most of the visual problems. If you ever change one transform, change the other in lock-step.
2. **Tailwind composes transforms in a fixed order** regardless of class order in `className`. CSS string order ≠ Tailwind class order. Always test the rendered matrix.
3. **Asymmetric label transforms produce asymmetric bboxes.** Left-orientation extends bbox UP from origin; right-orientation extends DOWN. Compensate with different `top` values per orientation, not a single shared value.
4. **`color-mix(in srgb, var(--x) N%, black)` is widely supported now** (Chrome 111+, Firefox 113+, Safari 16.2+). Use it instead of computed-per-pillar variables.
5. **Don't use the selector form `agent-browser screenshot ".iso-canvas"`** — it returns empty/white. Use full-viewport screenshots and crop with `sips` if needed.
