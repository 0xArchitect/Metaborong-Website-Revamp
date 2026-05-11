# Services Section — Redesign Spec

**Date:** 2026-05-11
**Section:** Services / "What we build" (`components/sections/services.tsx` + `services-trefoil.tsx` + `services-glyphs.tsx` + `services-mobile.tsx` + `services-data.ts`)
**Master spec:** `DESIGN.md`
**Copy lock:** `docs/content/sections/services.md`
**Figma reference:** https://www.figma.com/design/mQsbMuw0spVgIu7jXirr3o/Metaborong-Portfolio?node-id=112-289 — Frame `1707481126` (fileKey `mQsbMuw0spVgIu7jXirr3o`, nodeId `112:289`). Pulled and adapted at step 8 of Context A1.
**Branch:** `section/what-we-build-redesign`
**Supersedes:** archived deviation logs `docs/superpowers/archive/specs/2026-05-04-section-services-design.md` (trefoil polish #1 + #2).

## Intent

Replace the trefoil hub-and-spoke topology and accordion-gated children with a **hybrid index**: clean scan-first structure carrying the three pillars and their children inline, with a single signature accent providing visual identity. Pillars must read in two seconds; child services must be skimmable without interaction; pillar hub CTAs must be primary visible affordances.

**Information posture.** Three pillars are co-equal categories. The section must not present them as a ranked list (primary+two-secondaries) — Metaborong is a multi-pillar studio, not a Web3-first studio with side practices. Layout treatment must reflect equal weight (three equal columns, or three sibling rows, not a hero pillar plus subordinates).

**Time-horizon read:**
- **First 5 seconds (visceral):** Eyebrow + H2 + pillar labels visible. The reader knows this is a studio that does three things and what they are.
- **5 minutes (behavioral):** Reader scans child services within the pillar they care about, sees the hub CTA, clicks through to the pillar hub.
- **5-year (reflective):** This section reads as the studio's catalog — must not date by referencing temporary trends (no "Web3 winter recovery", no specific model names).

## Rejected directions

- Hub-and-spoke / orbital / trefoil topology — the read it currently has.
- Accordion-gated child services — kills scan + GEO citability.
- Flat 9-card grid (3 pillars × 3 services) — collapses hierarchy, loses pillar voice.
- Multi-tab carousel — interaction tax on a passive-scan section.
- Ambient gradient / glow backdrops — violates DESIGN.md "no decorative gradients" rule.
- Per-child illustrations or icons — slop risk + maintenance burden across 14 children.
- **3-column feature grid (icon-in-colored-circle + bold title + 2-line description × 3)** — most recognized AI-generated layout. The pillars must not render as this pattern even if the column count matches.
- **Centered-everything composition** — text-align center on every heading + body. Hierarchy collapses; reads as template.
- **Colored-left-border cards as the pillar treatment** — directly conflicts with `Card variant="featured"` which already owns the 3px left-border accent for highlighted single cards. Re-using it here would dilute the featured-card signature.
- **System-ui / default font stacks for display copy** — DESIGN.md mandates Satoshi for display. No falling back to system fonts as a "minimalist" choice.

## Locked content shape

Source: `docs/content/sections/services.md`.

- 1 eyebrow + 1 H2 + 1 lede (above pillars, centered or left-aligned per Figma).
- 1 AEO blockquote — **renders as semantic `<blockquote>` after the lede and before pillar 01**. Must render in initial SSR HTML, must not be hidden behind toggle, must not depend on hydration to be readable.
- 3 pillars (`01 / 02 / 03`), each with: num, label, headline (≤8 words), body (1 sentence, ≤22 words), hubCta button (≤3 words verb-first), hubHref.
- Child services rendered inline per pillar (7 Web3 + 6 AI + 1 Product Studio = **14 entries**), each with name + description (≤16 words). **Locked: rendered as clickable links to existing slugs in `services-data.ts` (`/services/<pillar>/<slug>/`)**. The 17 noindex stub pages exist for crawl depth; not linking from this section wastes that depth.
- 3 AEO Q&A blocks — **locked: JSON-LD only at this section.** Emit as `FAQPage` schema embedded via `<Script type="application/ld+json">`. Do NOT render as visible HTML. Rationale: visible FAQ at section bottom would create a competing focal point against the index pattern; visible FAQ ships in its own dedicated section per project CHANGELOG.

## Hard constraints (DESIGN.md, non-negotiable)

- Tokens only — no raw hex, no raw px outside the scale. Section uses `<Section bg="subtle" maxWidth="wide" id="services">`. The `id="services"` is a deep-link target — must preserve.
- Pillar colors locked to `services-data.ts`: Web3 `#204AF8`, AI `#10b981`, Product Studio `#F6851B`.
- `color.text.tertiary` (`#999`) not allowed for body copy or child-service descriptions.
- Borders over shadows. Card hover follows DESIGN.md card hover spec.
- One-shot motion only — no infinite animations introduced. Reveal via `<Section>` IO gate.
- `prefers-reduced-motion: reduce` short-circuits any introduced animation.
- Tap targets ≥44×44px on all clickable rows (child-service links and pillar hub CTAs).
- Mobile fallback renders the same IA in SSR HTML (no `display:none` on SEO-relevant child links).
- Focus-visible ring on every interactive element (pillar hub CTAs, all 14 child-service links).
- Buttons: Bauhaus signature — `radius: 0`, flat fills, 150ms transitions, no transform on hover. Primary hub CTAs may use the split-arrow pattern (text + arrow span with 1px white-15 divider).
- **Typography:** no new `--font-*` introduced. Display copy uses `--font-brand` (Satoshi); the eyebrow + index numerals use `--font-mono` (JetBrains Mono) per existing eyebrow primitive.
- **Semantics:** section uses `aria-labelledby` pointing at the H2's `id`. Each pillar grouping uses `<section aria-labelledby="pillar-<id>-heading">` so screen readers expose three pillars as navigable landmarks. Child-service lists use `<ul role="list">` (Tailwind reset re-adds the role).
- **Card variant choice:** if pillars render as card-like containers, use `<Card variant="default">` per DESIGN.md (`radius.lg`, no left-border). The `featured` variant is reserved for single-card highlights and may not be repurposed here.

### Per-element interaction states (DESIGN.md seven-state matrix)

| Element | default | hover | focus-visible | active | disabled | loading | error |
|---|---|---|---|---|---|---|---|
| Pillar hub CTA (`<Button variant="primary" size="md">`) | brand fill / off-white text | bg darkens ~10% (150ms) | brand 2px ring, 2px offset | bg darkens ~15%, no transform | n/a (always enabled) | n/a (links not async) | n/a |
| Child-service row link | dark text + gray-light description | text shifts to pillar color (150ms); subtle bg shift `bg-subtle → bg-raised` if rendered as boxed row | brand 2px ring, 2px offset | text darker pillar tone | n/a | n/a | n/a |
| Eyebrow / H2 / lede / blockquote | static (non-interactive) | — | — | — | — | — | — |

## Open decisions (resolve at step 7 — plan)

1. **Pillar layout shape** — three equal columns vs. three sibling rows (full-width per pillar). Both honor the "co-equal" posture. Resolve from Figma at step 8. **Topology constraint locked:** pillars render as **containers** (each pillar owns its children visually as a column/row container), not as section-dividers above a single shared index. This isolates pillar identity, supports scan-by-pillar, and keeps the hub CTA legible per pillar. Pillar 03 (Product Studio, 1 child) needs a treatment that doesn't read as empty — see plan.
2. **Signature accent** — exactly one. Candidates: oversized index numerals (`01/02/03` in display-size mono), structural rule between pillars (1px hairline with pillar-color tick), or a single typographic mark in the eyebrow row. Locked from Figma at step 8.
3. **Mobile layout** — keep current `services-mobile.tsx` `<Card>` list pattern with new copy, or unify into a single component that responsive-shifts? Recommend unify if Figma's mobile layout is structurally similar to desktop; keep split if mobile diverges (e.g., desktop is row, mobile is collapsed list with inline expansion).

### Resolved at this gate (no longer open)

- ~~Child-service interaction~~ — **locked: clickable links to existing slugs.** (No real design tradeoff; crawl depth is load-bearing.)
- ~~AEO Q&A render~~ — **locked: JSON-LD only.** (Visible FAQ would compete; dedicated FAQ section owns visible Q&A.)

## Component graph (post-redesign target)

| File | Role | Change |
|---|---|---|
| `components/sections/services.tsx` | Section wrapper | Replace trefoil/mobile-fork with new layout component. |
| `components/sections/services-data.ts` | Pillar + child data | Update strings to match `docs/content/sections/services.md`. Keep slugs stable. |
| `components/sections/services-trefoil.tsx` | Trefoil visual | **Delete** after migration. |
| `components/sections/services-glyphs.tsx` | Per-pillar SVG glyphs | **Delete** unless a glyph is reused as the signature accent (decided at step 8). |
| `components/sections/services-mobile.tsx` | Mobile fallback | Either delete (if unified) or rewrite to match new IA. |
| `components/sections/services-pillars.tsx` *(new)* | New layout component | Render 3 pillars + inline children + hub CTAs. |

## Content gaps (do NOT fabricate, defer to other sections)

Flagged by step-3 audits:

1. **Entity disambiguation** — no founding year, location, or founder names in section copy. Both audits flagged for GEO citation strength. **Decision:** intentionally deferred to Founders section. Section copy stays capability-dense.
2. **Proof anchors for "audit-ready" / "senior team" / "production-grade"** — these claims need verification from Trust/Founders sections (audit-partner logos, named founders, shipped client work). **Decision:** record dependency; no edits in this section.
3. **Footnote/proof links on pillar bodies** — out of scope for the redesign. Revisit when Trust section ships.

## Deviations from master plan

None introduced by this spec. The redesign is an exercise in *removing* a deviation (the trefoil's atmospheric backdrop, traveling pulse dot, halo-on-active, and slate inactive scheme — all section-level DESIGN.md additions logged in the now-archived 2026-05-04 spec) and returning the section to the master grammar plus one new signature accent. The single new signature accent will be logged below once locked from Figma at step 8.

### Pending deviation log (filled at step 8)

- _Reserved: signature accent description._
- _Reserved: any motion deviation introduced (must be one-shot)._
- _Reserved: any spacing/layout deviation from the standard `<Section maxWidth="wide">` two-column or three-column grammar._

## QA checklist (carried into step 11)

- [ ] All values use tokens (no raw hex/px outside scale).
- [ ] Seven states implemented for pillar hub CTA and child-service links.
- [ ] Focus-visible ring renders on keyboard nav for every interactive element.
- [ ] Tab order: eyebrow → H2 → lede → AEO blockquote → pillar 01 (CTA → child 1 → child 2 …) → pillar 02 → pillar 03.
- [ ] Body copy contrast ≥4.5:1 (AA).
- [ ] `color.text.tertiary` used only for tertiary/disabled.
- [ ] Mobile fallback renders all child-service names + descriptions in SSR HTML.
- [ ] `prefers-reduced-motion: reduce` short-circuits any new motion.
- [ ] No infinite animations.
- [ ] Tap targets ≥44×44px on touch.
- [ ] Pillar colors match `services-data.ts`.
- [ ] AEO blockquote in initial SSR HTML, not hidden behind interaction.
- [ ] Deviations logged below (filled at step 8 once Figma is pulled).

## Parallel-session note

This branch (`section/what-we-build-redesign`) runs in parallel with `section/problem-redesign`. Per session rules: must not edit `CHANGELOG.md`, `DESIGN.md`, `app/globals.css` beyond section-scoped styles, or `MEMORY.md` in this session. Those graduate serially once both sections land on `design-revamp`.
