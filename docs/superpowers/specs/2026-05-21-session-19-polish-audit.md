# Session 19 — Whole-Page Polish Audit (punch-list)

**Date:** 2026-05-21 · **Branch:** `design-revamp` · **Baseline:** `.gstack/benchmark-reports/baselines/baseline.json` (FCP 668ms, full load 916ms, **CLS 0.0**, 41 req).
**Method:** live desktop walk-through at 1440 (browse daemon), DESIGN.md grammar + seven-state matrix as the rubric. Mobile (375) + reduced-motion + hover/focus to be verified per-section during polish, not at audit time.

Scope guard: **motion + visual sharpness only.** No copy, no structure. Anything that needs copy/structure is flagged, not done.

---

## Overall read

The page is structurally correct and consistent — the `<Section>` padding chain, type ramp, and bg alternation hold across all 11 sections. It does **not** read as AI-slop: the iso-cube Services canvas, the Problem trend-chart, the blueprint founder frames, and the ghost-wordmark footer are all distinctive, intentional marks. The weakness is the one the handoff predicted: **the motion gradient is front-loaded.** Hero / Problem / Services carry rich signature motion; the entire tail (Why-Us → Contact-CTA) is `<Reveal>` fade-up and nothing else. Premiumness here comes from adding *considered, restrained* choreography to the tail — not more effects up front.

One genuine **visual** weakness (not just motion): the Work-Preview cards render with empty light-blue image panels (~40% of each card), which reads as a broken/placeholder thumbnail. This is the single most slop-adjacent thing on the page.

---

## P0 — visual sharpness (fix regardless of motion brainstorm)

| # | Section | Issue | Proposed fix | Risk |
|---|---|---|---|---|
| P0-1 | Work-Preview | 4 cards have empty blue image panels — reads as broken/unfinished thumbnail. | Give each card image area a deliberate treatment keyed to its pillar color (gradient + iso motif / monogram), so the absence of a photo looks intentional, not broken. **Borders structural — needs user sign-off on direction.** | med |
| P0-2 | All | Verify the seven-state matrix on every interactive element touched (focus-visible ring, active, hover) — esp. Work-Preview "Read more", Founders social buttons, FAQ accordion triggers, nav. | Audit + fill gaps during per-section polish. | low |

## P1 — new signature moments (candidates for the brainstorm gate, §7 step 3)

Each needs a DESIGN.md deviation log + user approval before shipping. Listed best-value first.

| # | Section | Candidate moment | Why it earns its place | Cost |
|---|---|---|---|---|
| P1-1 | Founders | Card hover: blueprint corner-frame "draws"/accent-tints + photo subtle scale, 250ms. | Highest-impact tail moment; the blueprint frame is already a signature, hover completes it. Low risk. | low |
| P1-2 | Comparison | Staggered row-reveal — Metaborong column cells cascade/stamp in on viewport entry (compose with Reveal `delay`). | Turns a static table into a choreographed read; reinforces the "our column" emphasis. | low |
| P1-3 | Work-Preview | Lane affordance — drag/scroll cue + card hover lift; pairs with P0-1 card treatment. | Makes the horizontal lane legible as interactive; fixes a discoverability gap. | med |
| P1-4 | FAQ | Accordion expand easing polish — height/opacity choreography on the disclosure (currently functional, not premium). | Small, the page tail's one interactive surface; tighten the easing. | low |
| P1-5 | Why-Us | Stagger the 3 illustration cards (Reveal `delay` 0/80/160). | Cheap rhythm add; the illustrations deserve a sequenced entry. | low |

## P2 — refinements (do inside per-section polish if cheap)

- P2-1 Problem: AEO accordion ("Common questions about the trend window") is a thin disclosure row — align its expand easing with the FAQ accordion decision so they match.
- P2-2 Services: the left-panel accordion expand/collapse shows a brief content-overlap mid-state when switching pillars — tighten the collapse easing so panels don't visually bleed.
- P2-3 Contact-CTA / Hero: confirm the painterly/photo backgrounds aren't causing layout shift on load (reserve dimensions). CLS is 0.0 at baseline — keep it there.

---

## Constraints carried into polish (from handoff §6)

- `prefers-reduced-motion: reduce` must short-circuit **every** new motion.
- Animate `transform`/`opacity` only — no layout-property animation, no reflow on scroll.
- No new infinite animations (approved infinites: trust-bar marquee, orb blink, hero scroll-cue).
- Brand-color discipline: flag raw `#296ff0` / `#204AF8` / `THREE.Color` / SVG `fill=` bypassing `--color-brand`.
- CLS stays 0.0; no LCP cost. `benchmark` re-run at the end.

## LOCKED DECISIONS (2026-05-21, user gate)

- **Scroll:** native CSS smooth-scroll only (`scroll-behavior: smooth` already at globals.css:127). No Lenis, no GSAP, no scroll-snap. Verify `scroll-margin` offsets for the fixed nav.
- **New moments (3):** Founders card hover (P1-1), Comparison row-reveal (P1-2), Work-Preview lane + monogram tiles (P1-3). FAQ easing / Why-Us stagger deferred unless cheap.
- **Work-Preview cards (P0-1):** empty panels → **monogram / wordmark tiles** (footer ghost-wordmark idiom, pillar-keyed). Not photos.
- **Section framing (user adds #1/#2/#5/#6) → Direction B: labeled seam bands, LABEL ONLY (no counter).** A full-width bordered band at the top of each section with a left-aligned mono uppercase label. Sharp `--color-border` borders, generous whitespace. Replaces the 4+ divergent eyebrow treatments (plain `<Eyebrow>`, services rounded mono pill, why-us square mono pill, `problem-chip`, work-preview semibold `<p>`). Emulates supermemory.ai's section-seam device to make the page read as one continuous document (#5) with consistent storytelling labels (#6) and sharp borders (#2).
- **Founder/team images (#3):** too large on mobile — optimize sizing/layout at 375.
- **Eyebrow token bypass:** `eyebrow.tsx` uses raw `#10b981`/`#F6851B`; migrate to `--color-ai`/`--color-accent` tokens when touched.

## Deviations from master plan (Session 19 — shipped)

Master spec: `DESIGN.md`. Each item honors SSR/SEO, ARIA, mobile fallback, `prefers-reduced-motion`, brand-color discipline, focus-visible.

1. **Seam-band `SectionLabel` (new section primitive).** `components/ui/section.tsx` gains an optional `label` prop rendering a full-width bordered band (`border-y border-border`) with a left-aligned mono uppercase title (`font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-gray`) at the section's top edge. Replaces the five divergent eyebrow treatments (plain `<Eyebrow>`, services rounded-mono pill, why-us square-mono pill, `problem-chip`, work-preview semibold `<p>`) with one canonical device. Applied to: Problem, Services, Why-Us, Work, Testimonials, Founders, Comparison, FAQ, Contact-CTA. Trust-bar keeps its existing `border-y` marquee band (already in the language); Hero stays label-less (page opener). Emulates supermemory.ai's section-seam device → unifies borders (#2), section seams (#5), eyebrow consistency (#6). Section content padding bumped 48/64/72 → **56/72/88** for more, consistent whitespace (#1).
2. **Founders card hover** (`founders.tsx`). On hover/`focus-within`: blueprint dashed ticks + inset frame tint to `--color-brand`, portrait zooms `scale(1.04)` within its `overflow-hidden` frame, tile lifts `-3px`. transform/color only, 250ms (zoom 400ms), zoom + lift `motion-safe:`-gated. Keyboard-reachable via `group-focus-within` (social buttons).
3. **Comparison staggered row-reveal** (`comparison-table.tsx`, new client island). Table extracted to a client component; IO-gated, rows cascade `opacity 0→1` + `translateY(10px→0)` at `i*55ms` stagger, 450ms out-expo. Short-circuits to visible under reduced-motion. Table a11y (scope/caption/sr-only `Dimension`) unchanged.
4. **Work-Preview monogram tiles + lane** (`work-preview.tsx`). Empty `bg-bg-subtle` placeholder panels → pillar-keyed ghost-wordmark tiles (footer idiom): tinted tile + bleeding ghost wordmark + logo-square accent. Card hover matches DESIGN.md card spec (`-translate-y-[2px]` + pillar-tint border + `shadow.sm`, 250ms, motion-safe). Mobile cards narrowed to `78vw` to show a peek (the lane affordance). Migrated from hand-rolled `<section>` to `<Section label="Our work">` (fixes #1 whitespace inconsistency). Raw hex `#296ff0`/`#10b981` → `--color-brand`/`--color-ai` pillar tokens. Dropped `'use client'` + dead `useEffect`/`useRef`.
5. **Founder mobile image fix (#3).** Cards narrowed `100vw-32px` → `74vw max-w-[300px]` (sm/md scaled) so the square portrait shrinks ~24% and adjacent cards peek (doubles as swipe affordance).
6. **Removed infinite-pulse swipe arrows** from Founders + Work-Preview (`animate-[pulse…infinite]` — undocumented infinite, violated the locked grammar). The card peek now provides the affordance. Resolves an existing grammar violation.
7. **Smooth-scroll reduced-motion guard** — added `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }` to `globals.css` (native smooth-scroll, no library; user-approved over Lenis/GSAP/scroll-snap).
8. **Eyebrow token fix** — `eyebrow.tsx` tone classes `text-[#10b981]`/`text-[#F6851B]` → `text-ai`/`text-accent` tokens.

**Verification:** `npx tsc --noEmit` exit 0. CLS **0.0000** (baseline) → **0.0000** (post-motion) — no layout-shift regression; all new motion is transform/opacity. Visual QA at 1440 + 375. Reduced-motion short-circuits by construction (matchMedia gates + `motion-safe:` prefixes + the new `scroll-behavior` guard).

## Sequencing recommendation

1. **Brainstorm gate (§7 step 3):** user picks which of P1-1…P1-5 to pursue (target 1-3) + decides P0-1 direction.
2. Per-section `impeccable` (critique→layout→polish) → `frontend-design`, P0 first, then approved P1, then cheap P2.
3. Candidate-pick subjective placement live (per `feedback-visual-placement-candidates`).
4. Verify (reduced-motion, 1440/1280/375, seven-state) → `benchmark` re-run → graduate (DESIGN.md Decisions Log + CHANGELOG).
