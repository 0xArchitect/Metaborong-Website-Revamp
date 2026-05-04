# Problem Section Signature (Phrase Stamp) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a typographic "phrase stamp" signature moment to the Problem section's bridge phrase — weight shift gray→dark + brand-blue hairline underline draw, fired ~600ms after the section enters the viewport. Keep the existing global `<Reveal>` for whole-section entry; stamp adds on top.

**Architecture:** One small client component (`PhraseStamp`) replaces the existing `<strong>` wrapper around the phrase `treats the project like a ticket in a queue`. The component owns its own `IntersectionObserver` (fires once), reads `prefers-reduced-motion` once at mount, and toggles a single boolean state that drives CSS transitions on color, font-weight, and a `background-image` linear-gradient underline.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (arbitrary-value classes are project convention).

**Spec:** `docs/superpowers/specs/2026-05-04-section-problem-signature.md`

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `components/sections/phrase-stamp.tsx` | **create** | Client component. Wraps children in `<strong>`. Owns the intersection observer, reduced-motion check, and the played/not-played state. Renders Tailwind classes that drive the color/weight/underline transition. |
| `components/sections/problem.tsx` | **modify** | Replace the inline `<strong className="font-medium text-dark">…</strong>` with `<PhraseStamp>…</PhraseStamp>`. No other changes. |

`PhraseStamp` is **section-local** (lives at `components/sections/`, not `components/ui/`) because it encodes a Problem-specific signature. If a second section ever wants the same treatment, it gets promoted then — not preemptively.

**No `app/globals.css` change.** All styling is Tailwind arbitrary classes on the component (project convention per CLAUDE.md and Session 1 decisions). The underline is a `background-image: linear-gradient` with `background-size` transitioning `0% 1px → 100% 1px` — chosen over `::after` + `transform: scaleX` because it lives entirely in inline styles / utility classes (no `globals.css` rule needed) and was validated in the brainstorm mockup with no CLS or jitter.

---

## Decisions locked in this plan

1. **Location:** `components/sections/phrase-stamp.tsx` (section-local).
2. **Underline mechanism:** `background-image: linear-gradient(to right, var(--color-brand), var(--color-brand))` + `background-size: 0% 1px → 100% 1px` + `background-position: 0 100%` + `background-repeat: no-repeat`. Lives on the `<strong>` element. No layout shift.
3. **CSS placement:** Tailwind arbitrary-value classes on the element via class toggle. No `globals.css` edit. No `<style jsx>`.
4. **Intersection observer:** registered by `PhraseStamp` itself. `rootMargin: "0px 0px -50px 0px"`, `threshold: 0.1`. Unobserves on first intersection. 600ms `setTimeout` from intersection before flipping `played` state.
5. **`prefers-reduced-motion`:** read once at mount via `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If `true`, set `played=true` immediately; transitions are still set in CSS but with `transition-none` applied via a conditional class so the final state appears instantly.

---

## Task 1: Create the PhraseStamp client component

**Files:**
- Create: `components/sections/phrase-stamp.tsx`

- [ ] **Step 1: Create the file with the full component**

```tsx
'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function PhraseStamp({ children }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [played, setPlayed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) {
      setReducedMotion(true)
      setPlayed(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            window.setTimeout(() => setPlayed(true), 600)
          }
        }
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const base =
    'bg-[linear-gradient(to_right,var(--color-brand),var(--color-brand))] bg-no-repeat [background-position:0_100%]'
  const motion = reducedMotion
    ? 'transition-none'
    : 'transition-[color,font-weight,background-size] duration-[350ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]'
  const restState = played
    ? 'text-dark font-medium [background-size:100%_1px]'
    : 'text-gray font-normal [background-size:0%_1px]'

  return (
    <strong
      ref={ref}
      className={`${base} ${motion} ${restState}`}
    >
      {children}
    </strong>
  )
}
```

- [ ] **Step 2: Verify type-check passes**

Run: `pnpm exec tsc --noEmit`
Expected: PASS, no errors in `components/sections/phrase-stamp.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/phrase-stamp.tsx
git commit -m "feat(problem): add PhraseStamp client component for signature moment"
```

---

## Task 2: Wire PhraseStamp into the Problem section

**Files:**
- Modify: `components/sections/problem.tsx`

- [ ] **Step 1: Replace the `<strong>` with `<PhraseStamp>`**

Current state (lines 16–18):

```tsx
Most founders end up choosing between two bad options: a large agency that{' '}
<strong className="font-medium text-dark">treats the project like a ticket in a queue</strong>
, or a freelance team that lacks the architectural depth to ship something that scales. Either way, timelines slip and technical debt piles up before launch.
```

New state — replace those lines with:

```tsx
Most founders end up choosing between two bad options: a large agency that{' '}
<PhraseStamp>treats the project like a ticket in a queue</PhraseStamp>
, or a freelance team that lacks the architectural depth to ship something that scales. Either way, timelines slip and technical debt piles up before launch.
```

Add the import at the top of the file (alongside existing `Section`/`Eyebrow` imports):

```tsx
import { PhraseStamp } from '@/components/sections/phrase-stamp'
```

- [ ] **Step 2: Verify type-check still passes**

Run: `pnpm exec tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Verify build succeeds**

Run: `pnpm build`
Expected: build completes; `/` page in build output. No warnings about `'use client'` boundaries.

- [ ] **Step 4: Commit**

```bash
git add components/sections/problem.tsx
git commit -m "feat(problem): apply PhraseStamp to bridge phrase"
```

---

## Task 3: Visual verification (entry animation)

**No code changes.** Manual verification against the spec.

- [ ] **Step 1: Start dev server**

Run: `pnpm dev`
Open: `http://localhost:3000`

- [ ] **Step 2: Verify entry sequence**

1. Scroll to top, then slowly scroll down to the Problem section (`#problem`).
2. As the section enters the viewport, observe:
   - Section fades+rises as one block (~400ms via existing `<Reveal>` on `<Section>`).
   - At ~600ms after section intersection, the bridge phrase animates: text color shifts gray → dark, font weight shifts regular → medium, brand-blue underline draws left → right beneath the phrase over ~350ms.
3. Phrase rests in final state (dark, medium weight, full-width underline).

Expected timing reference: total signature lands ~1100ms after section enters viewport.

- [ ] **Step 3: Verify fires-once behavior**

Scroll past the section, then scroll back up. The stamp should remain in its final state — no replay.

- [ ] **Step 4: Verify no console errors**

Open DevTools → Console. Should be clean. No hydration warnings, no observer errors.

- [ ] **Step 5: Verify no CLS**

DevTools → Performance → record a scroll-through. Check for layout shift around the Problem section. Expected: zero CLS contribution from the underline (it's a `background-image`, not a layout-affecting border).

---

## Task 4: Reduced-motion verification

**No code changes.** Verify the `prefers-reduced-motion` branch.

- [ ] **Step 1: Enable reduced motion in DevTools**

DevTools → ⋮ → More tools → Rendering → Emulate CSS media feature `prefers-reduced-motion` → `reduce`.

- [ ] **Step 2: Hard reload**

`Cmd+Shift+R` to clear any cached state.

- [ ] **Step 3: Scroll to Problem section**

Expected: the bridge phrase appears already in its **final state** on first paint — dark color, medium weight, full-width underline. No transitions visible. No 600ms delay.

The rest of the section's `<Reveal>` should also be static (existing `<Reveal>` already respects reduced motion).

- [ ] **Step 4: Disable emulation when done**

Set `prefers-reduced-motion` back to `no-preference` in DevTools.

---

## Task 5: Semantic and accessibility verification

**No code changes.** Confirm semantic structure preserved.

- [ ] **Step 1: View page source**

Open DevTools → Elements. Locate the Problem section. The bridge phrase must be wrapped in `<strong>…</strong>` (semantic emphasis preserved).

- [ ] **Step 2: Verify accessible name unchanged**

The phrase reads as emphasized text in screen-reader semantics. No `aria-hidden`, no role override.

- [ ] **Step 3: Final commit if any tweaks were needed**

If steps 3 or 4 surfaced visual issues that required CSS tweaks to `phrase-stamp.tsx`, commit them now:

```bash
git add components/sections/phrase-stamp.tsx
git commit -m "fix(problem): adjust PhraseStamp [specific change]"
```

Otherwise: nothing to commit; signature is complete.

---

## Self-review checklist (run after implementation)

- [ ] Spec section "At rest" — phrase ends with weight 500, color `text-dark`, brand-blue 1px underline. ✓ Task 1 final-state CSS.
- [ ] Spec section "Motion (entry sequence)" — 600ms delay from intersection, then 350ms color/weight + 500ms underline. **Note:** The plan uses a single 350ms transition duration on all three properties (`color`, `font-weight`, `background-size`) for simplicity. The spec called for 350ms on color/weight and 500ms on the underline. If the unified 350ms feels too snappy on the underline during Task 3 verification, split the transition: `transition-[color,font-weight] duration-[350ms]` plus a separate `transition-[background-size] duration-[500ms]` (both with the same easing). This is a tuning step, not a structural change — adjust in Task 3 if needed.
- [ ] Spec section "Reduced motion" — final state on mount, no transitions. ✓ Task 1 reduced-motion branch + Task 4 verification.
- [ ] Spec "Component shape" — `<strong>` preserved, semantic emphasis intact. ✓ Task 1 returns `<strong>`; Task 5 verifies in DOM.
- [ ] Spec "Tokens used" — `--color-brand`, `--color-dark`, `--color-gray`, existing easing. ✓ Used via Tailwind utilities and the linear-gradient CSS variable.
- [ ] Spec "What does NOT change" — copy, layout, top accent rule, eyebrow, H2, section bg rhythm, Hero/Nav/Trust untouched. ✓ Task 2 only swaps `<strong>` for `<PhraseStamp>`.
- [ ] Spec "Verification" — all five bullets covered by Tasks 3, 4, 5. ✓

## Files touched (final)

- `components/sections/phrase-stamp.tsx` (create, ~50 lines)
- `components/sections/problem.tsx` (modify, +1 import, 1 element swap)

## Risks

- **Tailwind v4 arbitrary class compilation** — the long `bg-[linear-gradient(...)]` and `transition-[color,font-weight,background-size]` classes are uncommon. If Tailwind doesn't compile them, fall back to a single inline `style={{ backgroundImage, backgroundSize, transition }}` object on the `<strong>`. The component's structure is unchanged either way.
- **Underline pacing** — covered by the self-review note above. Tune in Task 3.

## Out of scope

- `/design-shotgun` and `/plan-design-review` — next steps in the workflow chain, not part of implementation.
- Any changes to other sections, the `<Reveal>` primitive, or the master plan.
