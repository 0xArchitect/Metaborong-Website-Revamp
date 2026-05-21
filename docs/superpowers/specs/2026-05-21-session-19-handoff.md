# Session 19 — Homepage Beautification & Motion Pass — Handoff Brief

**Date:** 2026-05-21
**Branch state:** `design-revamp` @ `35a35c8` (pushed to origin). Tree clean. All Session-18 worktrees torn down, section branches deleted.
**Predecessor:** Session 18 (2026-05-21) — Comparison + FAQ + Testimonials redesigned in parallel (orchestrator + 3 section-sessions); graduated `35a35c8`.
**This doc is the source-of-truth seed for Session 19 — read it first, before anything else.**

---

## 0. TL;DR

Every homepage section now has its **structure and copy locked** (Sessions 5–18). Session 19 is a **whole-page beautification + motion + sharpness pass** — touch-ups and *premiumness*, **not** restructure. The aim: take a page that is structurally correct and make it *feel* like a senior studio built it — tighter motion choreography, sharper micro-interactions, considered hover states, spacing rhythm, and a few **new signature moments** where they earn their place.

**User's framing (verbatim intent):**
- *"The structure of each section is more or less set. Now I want to work on beautification and animation, sharpness of the whole homepage."*
- Scope: **all 11 sections**, but **not major changes — touch-ups and premiumness.** May or may not require parallel worktrees.
- Motion ambition: **open to new signature moments** (not polish-within-grammar only). New patterns are allowed but each one needs a DESIGN.md deviation-log entry + explicit user approval before it ships.
- Chain: **smart use of all relevant skills** — `impeccable` (critique→layout→polish), `frontend-design`, `design-review`, `/hallmark`, `web-design-guidelines`, `svg-animations`, `benchmark`. No single rigid spine; pick the right tool per section.

---

## 1. The page as it stands (render order, `app/page.tsx`)

11 sections + Nav + Footer. Render order and current motion inventory:

| # | Section | File | Lines | Type | Current motion / signature |
|---|---|---|---|---|---|
| — | Nav | `components/layout/nav.tsx` | — | client | Mega-menu dropdown (`navDropdownIn`/`navDropdownRowIn`), mobile body-scroll lock. **Locked, polished Session 17.** |
| 1 | Hero | `components/sections/hero.tsx` | 359 | client | Full-bleed static image; orb HUD label (`orbLabelIn`/`orbBlink`/`orbScan`), scroll-cue bounce, overlay-card pop (`heroCardPop`), typewriter. **Heaviest signature.** |
| 2 | Trust-bar | `components/sections/trust-bar.tsx` | 122 | server | Marquee (`trustBarScroll`, the one approved infinite anim). |
| 3 | Problem | `components/sections/problem.tsx` | 76 | server | `problem-sweep` chart draw; `problem-trend-chart.tsx` + `problem-aeo-accordion.tsx`. |
| 4 | Services | `components/sections/services.tsx` | 66 | server | Trefoil signature (`services-trefoil` referenced in DESIGN.md; current files: `services-pillars.tsx`, `services-iso-canvas.tsx` CSS-iso). Stroke-draw, halo, traveling pulse dot. **2nd-heaviest signature.** |
| 5 | Why-Us | `components/sections/why-us.tsx` | 117 | server | Reveal-only; Clutch widget embed. Redesigned Session 18-pre (Figma). |
| 6 | Work-Preview | `components/sections/work-preview.tsx` | 85 | client | Drag-scroll lane (PR #33). |
| 7 | Testimonials | `components/sections/testimonials.tsx` | 70 | client | Clutch type-8 widget only (`clutch-widget.tsx`). Reveal-only otherwise. **Just shipped Session 18.** |
| 8 | Founders | `components/sections/founders.tsx` | 258 | client | Blueprint-frame cards, social buttons. Reveal-only motion. |
| 9 | Comparison | `components/sections/comparison.tsx` | 60 | server | Table; reveal-only. **Just shipped Session 18.** |
| 10 | FAQ | `components/sections/faq.tsx` | 33 | server | Two-column; `faq-accordion.tsx` (client) disclosure. **Just shipped Session 18.** |
| 11 | Contact-CTA | `components/sections/contact-cta.tsx` | 58 | server | Painterly landscape bg + vignette. Reveal-only. |
| — | Footer | `components/layout/footer.tsx` | — | — | SSR chrome, sitemap. **Locked Session 17.** |

**The motion gradient is uneven.** Hero + Services + Problem carry rich signature motion; the tail (Why-Us → Contact-CTA) is almost entirely `<Reveal>` fade-up and nothing else. Part of Session 19's job is deciding where the tail *should* stay quiet (restraint is the brand) vs. where a considered micro-interaction would add premiumness without noise.

---

## 2. The motion system you're working inside

### `components/ui/reveal.tsx` (read it — it's short)
The universal entry animation. IO-gated, `opacity 0→1` + `translateY(8px→0)` over **400ms** `cubic-bezier(0.16,1,0.3,1)`, optional `delay` for stagger, hard short-circuit on `prefers-reduced-motion`. Auto-applied to every `<Section>` child. **This is the spine of all section-entry motion.** Any new entry choreography should compose with or extend Reveal, not bypass it.

### `app/globals.css` keyframes (the full inventory)
`trustBarScroll`, `mega-in`, `navDropdownIn`, `navDropdownRowIn`, `heroScrollBounce`, `heroCardPop`, `typewriterReveal`, `orbLabelIn`, `orbBlink`, `orbScan`, `problem-sweep`. All reduced-motion-gated.

### DESIGN.md Motion section (lines ~220–273) — the locked grammar
- **One-shot only.** No infinite animations outside trust-bar marquee + orb HUD blink + hero scroll-cue.
- **IO-gated first paint.** Invisible at SSR, fade in on viewport entry.
- **`prefers-reduced-motion: reduce` always honored.**
- **CSS over JS** for media queries; SVG sections use inline `<style precedence="default">`.
- **Duration tokens:** instant 150 / fast 250 / base 400 / slow 620 / deliberate 900 / marquee 24000ms.
- **Easing palette:** out-expo `(0.16,1,0.3,1)` for reveals; s-curve `(0.32,0,0.16,1)` for spoke/pulse; in-out `(0.65,0,0.35,1)` for stroke-draw.
- **Micro-interaction discipline:** buttons 150ms, card hover 250ms, reveal 400ms, signature visuals 620–900ms. **Above 900ms is reserved for one-shot signature moments — never on text or buttons.**

**Because the user opted into new signature moments:** you MAY extend this grammar, but every new infinite animation, scroll-linked effect, or >900ms moment requires (a) a `## Deviations from master plan` entry in that section's spec, (b) a DESIGN.md Decisions Log row at graduation, and (c) explicit user approval before it ships. Restraint is still the house style — earn each new moment.

---

## 3. Aim of Session 19 (the deliverable)

Make the whole homepage feel **premium and sharp** through:

1. **Motion choreography** — section-entry stagger, considered hover/focus micro-interactions, and 1–3 *new signature moments* where they elevate the page (candidate spots: Comparison row-reveal, FAQ accordion expand easing, Testimonials widget frame, Founders card hover, Work-Preview lane affordance). Restraint elsewhere.
2. **Visual sharpness** — spacing rhythm consistency across all 11 sections, alignment, hierarchy, border/shadow discipline, hover-state completeness (the seven-state matrix in DESIGN.md), tap-target sizing.
3. **Anti-AI-slop pass** — `/hallmark` + `design-review` to catch generic aesthetics, weak hierarchy, and slop patterns; replace with distinctive, intentional choices.
4. **No structural or copy changes.** Copy is locked (Session 18 graduated all tail sections). If a change starts needing copy edits, it's out of scope — flag it, don't do it.

**Definition of done:** every section visually QA'd at 1440 / 1280 / 375; `npx tsc --noEmit` exit 0; `prefers-reduced-motion` verified to short-circuit every new motion; no new infinite animations without a logged deviation; `benchmark` shows no Core-Web-Vitals regression (motion must not cost LCP/CLS); DESIGN.md + CHANGELOG graduated.

---

## 4. Skills — smart use, per the user's direction

No rigid spine. Pick per task:

| Skill | Use it for |
|---|---|
| `impeccable` (critique → layout → polish) | Per-section: a11y/focus/correctness first, then spacing rhythm, then visual sharpness with 2–3 ASCII variants the user picks. The default for shipped-section polish. |
| `frontend-design` | Surgical execution of a locked polish spec. No exploration. |
| `/hallmark` | Whole-page anti-AI-slop taste pass; distinctiveness audit. **Newly available — load it.** |
| `design-review` | Live-site QA loop: find inconsistency/spacing/hierarchy/slop, fix in source, before/after screenshots, atomic commits. Strong for the whole-page consistency sweep. |
| `web-design-guidelines` | Cross-ref inside `impeccable layout` — touch-action, animate transform/opacity only, etc. |
| `svg-animations` | If a new signature moment is SVG-based (likely for Services/Problem/Hero accents). |
| `benchmark` | Before/after Core Web Vitals — motion must not regress LCP/CLS/INP. Run at start (baseline) and end. |
| `brainstorming` | **Before** designing any net-new signature moment (the user opted into these — explore intent first). |
| `verification-before-completion` + `simplify` | Pre-graduation, every section. |

Per `feedback-visual-placement-candidates` (memory): for subjective placement/sharpness choices, render 2–3 labeled candidates on the live page and let the user pick — don't burn reject cycles eyeballing.

---

## 5. Files / docs to read on Session 19 start (total context)

Read in this order:

1. **This handoff** (`docs/superpowers/specs/2026-05-21-session-19-handoff.md`).
2. **`CLAUDE.md`** (project root) — Next 16 → `proxy.ts`, `.env.local` `$` escapes, **never `rm -rf .next` while dev server runs** (corrupts served CSS — caused a past false-alarm).
3. **`DESIGN.md`** — full read, especially the **Motion section** (~220–273), the **seven-state matrix** (~292–302), **micro-interaction discipline** (~333–336), and the **Decisions Log** (the 2026-05-21 Session-18 rows are the most recent state).
4. **`components/ui/reveal.tsx`** + **`components/ui/section.tsx`** — the entry-motion + layout spine.
5. **`app/globals.css`** — the keyframe inventory (search `@keyframes`), the `@theme` token block, and the reduced-motion guards.
6. **`docs/superpowers/SESSIONS.md`** — Context A2 (polish chain) is the closest fit; skill cheat sheet.
7. **`docs/superpowers/archive/specs/2026-05-04-session-5.5-global-motion.md`** — the original global motion spec (archived, historical, but the *why* behind the grammar).
8. **Per-section specs** (read the one for whatever section you're polishing):
   - `2026-05-10-section-hero.md`, `2026-05-10-section-nav-greptile-restyle.md`
   - `2026-05-11-section-problem.md`, `2026-05-11-section-services-redesign.md`, `2026-05-12-section-services-canvas-css-rebuild.md`
   - `2026-05-19-section-why-us.md`, `2026-05-19-section-founders.md`, `2026-05-19-section-contact-cta.md`, `2026-05-19-section-footer.md`
   - `2026-05-21-section-comparison.md`, `2026-05-21-section-faq.md`, `2026-05-21-section-testimonials.md`
9. **`CHANGELOG.md`** — top entry (2026-05-21 Session 18) is current state.

MEMORY entries (auto-loaded via session-start pointer) — pay attention to:
- `visual-direction-and-workflow` (signature visual + motion per section; rejected directions — **don't re-propose rejected motion**)
- `workflow-impeccable-frontend-design-stack` (the proven critique→layout→polish→frontend-design chain)
- `feedback-visual-placement-candidates` (candidate-pick for subjective choices)
- `feedback-dev-server-next-cache` (never `rm -rf .next` mid-dev)
- `feedback-brand-color-caveats` (flag raw hex / THREE.Color / SVG fill bypasses of `--color-brand` at write time)
- `feedback-coordinator-preview-and-verify` (dev-server poll timing; scroll lazy images in before calling them broken)
- `feedback-no-push-after-every-change` (commit locally; push only when asked)
- `feedback-em-dash-guardrail-scope` (em-dashes fine in visible copy; this session shouldn't touch copy anyway)

---

## 6. Hard constraints (do not violate without explicit user approval)

1. **No structural or copy changes.** Structure + copy are locked. Motion/visual only.
2. **`prefers-reduced-motion: reduce` short-circuits every motion** — new ones included. Non-negotiable (DESIGN.md a11y + WCAG 2.2 AA).
3. **No new infinite animations** without a logged deviation + user approval. The approved infinites are trust-bar marquee + orb HUD blink + hero scroll-cue only.
4. **Animate `transform`/`opacity` only** for 60fps — never animate layout properties (width/height/top/left) or trigger reflow on scroll. Cross-ref `web-design-guidelines`.
5. **Motion must not regress Core Web Vitals.** No CLS from entry animations (reserve space), no LCP cost from JS-driven hero motion. `benchmark` before + after.
6. **Brand-color discipline** — flag raw `#296ff0` / `#204AF8` / `THREE.Color` / SVG `fill=` that bypass `--color-brand` at write time (`feedback-brand-color-caveats`).
7. **Seven-state completeness** — any interactive element you touch must implement all seven states (default/hover/focus-visible/active/disabled/loading/error) per DESIGN.md.
8. **Don't push after every change** (`feedback-no-push-after-every-change`). Commit locally to the branch in logical units; push only when the user says so.
9. **Never `rm -rf .next` while the dev server runs** (`feedback-dev-server-next-cache`).
10. **`npm run build` is expected to fail at `/blog/rss.xml`** (PR #26 env hold) — that's not a regression. Use `npx tsc --noEmit` for the typecheck gate.

---

## 7. Execution shape — single session or parallel worktrees?

The user said *"may or may not require parallel worktrees."* Recommendation: **start single-session, sequential**, because:
- Motion/visual polish needs the **whole page open in one browser** to judge cross-section rhythm and consistency — the thing parallel worktrees make harder.
- A page-level anti-slop pass (`/hallmark`, `design-review`) is inherently holistic, not section-isolated.
- New signature moments need live candidate-picks with the user (`feedback-visual-placement-candidates`) — easier in one session.

**Escalate to parallel worktrees only if** the work decomposes into clearly independent per-section deep-dives (e.g., a heavy Services trefoil motion rebuild + a Hero motion rework that don't touch shared files). If so, follow the Session-18 orchestrator pattern (`2026-05-20-session-18-handoff.md` §4) — but that's the exception, not the default here.

**Suggested sequencing if single-session:**
1. `benchmark` baseline (capture current CWV before any motion is added).
2. Whole-page `design-review` + `/hallmark` audit → produce a prioritized punch-list spec (`docs/superpowers/specs/2026-05-21-session-19-polish-audit.md`).
3. `brainstorming` on the 1–3 candidate new signature moments → user approves which to pursue.
4. Per-section `impeccable` (critique→layout→polish) → `frontend-design`, top of the punch-list first.
5. `verification-before-completion` + `benchmark` re-run (no CWV regression) + `simplify`.
6. Graduate: DESIGN.md Decisions Log row(s) for any new motion + CHANGELOG Session-19 entry.

---

## 8. Out-of-scope reminders

- **PR #26** (CMS merge → main) is still open / held on env (`project-cms-merge-and-build-env`). Don't act on it.
- **7-vs-4-chains drift** (Hero blockquote vs Comparison vs TRUST SIGNALS) — deferred from Session 18 (D6). Copy-level; not this session.
- **`8+ products` vs `25+ products`** drift (TRUST SIGNALS vs Comparison) — deferred from Session 18. Copy-level; not this session.
- **`--section-px` CSS variable drift** (resolves to old 24/48/72/96 vs the six-step Tailwind chain) — flagged in DESIGN.md Layout. Only fix if a motion/visual change actually depends on it.
- **Service-page (`/services/**`) polish** — those are `noindex` stubs, separate surface. Homepage only.
- **Copy edits of any kind** — locked. Flag, don't touch.

---

## 9. Tone reminders

- **Short, concise responses; no trailing recaps; no emojis** (user global prefs).
- **Push back when warranted** — if a section is better left quiet (restraint = brand), say so rather than adding motion for motion's sake.
- **Candidate-pick subjective calls** — render 2–3 labeled variants live, let the user choose.
- **Premium ≠ busy.** The aesthetic is Swiss-engineered modernism. Sharpness comes from precision and restraint, not more effects.

---

## 10. Session-open command (paste into the new session)

> Start Session 19 — homepage beautification & motion pass. Read `docs/superpowers/specs/2026-05-21-session-19-handoff.md` end-to-end, then `CLAUDE.md`, `DESIGN.md` (especially Motion + seven-state matrix + Decisions Log), `components/ui/reveal.tsx`, and `app/globals.css` keyframes. Aim: touch-up + premiumness across all 11 homepage sections — motion choreography, visual sharpness, anti-AI-slop — **no structural or copy changes**. I'm open to 1–3 new signature moments (each needs a deviation log + my approval). Use the skills smartly per §4 (impeccable, frontend-design, design-review, /hallmark, web-design-guidelines, svg-animations, benchmark). Start single-session sequential per §7: benchmark baseline → whole-page audit → brainstorm the new moments with me → per-section polish. Don't push until I say so.
