# Services section redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the trefoil hub-and-spoke services section with a pillars-as-containers layout per `docs/superpowers/specs/2026-05-11-section-services-redesign.md`. Copy lock in `docs/content/sections/services.md`. Visual direction sourced from Figma frame `1707481126` at task 2.

**Architecture:** Net-new section component `components/sections/services-pillars.tsx` renders 3 pillars side-by-side (or sibling-row on mobile) as containers; each pillar owns its 14 child-service links inline plus a hub CTA. `services-data.ts` strings updated from copy lock; slugs stable. `services-trefoil.tsx` and `services-glyphs.tsx` deleted post-migration. `services-mobile.tsx` either deleted (if unified component is responsive enough) or rewritten. `services.tsx` becomes a thin wrapper. AEO Q&A emits as `FAQPage` JSON-LD via a `<Script type="application/ld+json">` in the section. No new dependencies.

**Tech Stack:** Next.js 16 / React 19 / TypeScript / Tailwind v4. No icons (lucide-react not needed for this section; pillars are typography-driven). No new globals.css additions (parallel-session rule).

**Verification posture:** `npx tsc --noEmit` + `npm run build` + manual browser QA on `PORT=3001` at desktop (≥1280px), tablet (768px), and mobile (375px) widths. No unit tests for visual section components — matches Session 7/10/12 pattern in `CHANGELOG.md`. `impeccable critique` + `design-review` skills run separately at steps 9 + 12 of Context A1.

**Parallel-session rules carried into every task:**
- Must not edit `CHANGELOG.md`, `DESIGN.md`, `app/globals.css` (beyond section-scoped CSS if any), or `MEMORY.md`.
- Before `/impeccable` or `/design-review`: print `🔒 BROWSER LOCKED — running <command>`. After: print `🔓 BROWSER FREE`.
- Dev server on `PORT=3001`.

---

## Task 1: Update `services-data.ts` to copy-lock strings

**Files:**
- Modify: `components/sections/services-data.ts`

The shape of `Pillar` and `ChildService` stays. Update the string fields to exactly match `docs/content/sections/services.md`. Slugs do NOT change — `/services/<pillar>/<slug>` routes must keep resolving.

- [ ] **Step 1: Diff existing strings against `docs/content/sections/services.md` and edit in place**

Changes (per copy lock):
- Pillar 01 (`web3`):
  - `body` → `DeFi protocols, NFT marketplaces, wallets, and DAO systems — smart-contract engineering across EVM, Solana, and Cosmos.`
  - `hubCta` → `Open Web3`
  - Child `defi-protocol-development.description` → `Lending, AMM, perp-DEX, and yield infrastructure spec'd for third-party audit.`
  - Other Web3 child descriptions: match lock verbatim.
- Pillar 02 (`ai-agents`):
  - `body` → `Agentic pipelines, RAG systems, voice agents, generative products, and workflow automation — production-grade, not demos.`
  - `hubCta` → `Open AI`
  - Child descriptions: match lock verbatim.
- Pillar 03 (`product-studio`):
  - `headline` unchanged.
  - `hubCta` → `Open Studio`
  - Child description: match lock verbatim.

Keep `id`, `num`, `label`, `color`, `hubHref`, slug values exactly as they are today.

- [ ] **Step 2: Verify typecheck**

`npx tsc --noEmit` — expected PASS. No type changes; only string content.

---

## Task 2: Pull Figma frame and lock layout deviations into the spec

**Files:**
- Modify: `docs/superpowers/specs/2026-05-11-section-services-redesign.md` (fill the "Pending deviation log" section)

Pull the Figma frame. Adapt it to project stack (Next.js 16 / React 19 / Tailwind v4 / DESIGN.md tokens) — Figma output is a REFERENCE, not final code. The spec's three remaining open decisions (layout shape, signature accent, mobile layout) get resolved from Figma here.

- [ ] **Step 1: Call Figma get_design_context**

```
mcp__claude_ai_Figma__get_design_context
  fileKey: mQsbMuw0spVgIu7jXirr3o
  nodeId: 112:289
  clientFrameworks: react,next.js
  clientLanguages: typescript,css
```

- [ ] **Step 2: Decode the layout from the returned screenshot + reference code**

Note the layout shape (columns vs sibling-rows), the signature accent (oversized 01/02/03 numerals? hairline rule? eyebrow mark?), and the mobile treatment. Ignore Figma-emitted tokens that conflict with `DESIGN.md` — use project tokens instead.

- [ ] **Step 3: Update the spec's "Pending deviation log" with concrete decisions**

Fill in:
- Signature accent description (one line + rationale).
- Any motion deviation (must be one-shot).
- Any spacing/layout deviation from `<Section maxWidth="wide">` grammar.

If Figma introduces zero deviations from the master grammar, write that explicitly — `No deviations from DESIGN.md. Section uses standard <Section> + Tailwind grid + Eyebrow + Button primitives.`

- [ ] **Step 4: Decide mobile component strategy**

If Figma's mobile and desktop layouts are structurally similar (e.g., grid collapses to stack), unify into one component (`services-pillars.tsx`). If mobile diverges (e.g., desktop = 3-column grid, mobile = collapsed cards), keep two files (`services-pillars.tsx` for lg+ and `services-mobile.tsx` rewritten). Record the choice in the spec.

---

## Task 3: Build `services-pillars.tsx`

**Files:**
- Create: `components/sections/services-pillars.tsx`

Net-new server component (no client interactivity required at the section level — pillar hub CTAs are plain links; child services are plain links; AEO blockquote is static; JSON-LD is server-rendered). If any state is needed (none anticipated), mark `'use client'`.

Component anatomy (informed by Figma at task 2):

```
<section id="services" aria-labelledby="services-heading">
  <header>
    <Eyebrow as="p">What we build</Eyebrow>
    <h2 id="services-heading">A small, senior team. Three pillars. End to end.</h2>
    <p className="lede">…</p>
    <blockquote className="aeo-blockquote">Metaborong is a boutique engineering studio…</blockquote>
  </header>
  <div className="pillars-grid">  {/* grid template from Figma */}
    {pillars.map(pillar => (
      <section aria-labelledby={`pillar-${pillar.id}-heading`} className="pillar">
        {/* signature accent from Figma — e.g., oversized num */}
        <Eyebrow as="p" className="pillar-num">{pillar.num} — {pillar.label}</Eyebrow>
        <h3 id={`pillar-${pillar.id}-heading`}>{pillar.headline}</h3>
        <p>{pillar.body}</p>
        <ul role="list" className="children">
          {pillar.children.map(child => (
            <li key={child.slug}>
              <Link href={`${pillar.hubHref}${child.slug}/`}>
                <span className="child-name">{child.name}</span>
                <span className="child-desc">{child.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Button href={pillar.hubHref} variant="primary" size="md">
          {pillar.hubCta}
        </Button>
      </section>
    ))}
  </div>
</section>
```

- [ ] **Step 1: Implement the component scaffolding above with Tailwind classes derived from Figma + DESIGN.md tokens**

Use `<Section bg="subtle" maxWidth="wide" id="services">` from `components/ui/section.tsx` rather than authoring a bare `<section>`. The Section primitive handles padding scale + Reveal wrapping.

Pillar color application: each pillar gets `style={{ '--pillar-color': pillar.color } as React.CSSProperties}` on its container so child styles can reference `var(--pillar-color)` without prop drilling. Used by: child-link hover text color, button bg (if pillar-tinted hub CTA per Figma), eyebrow num color.

Tap targets: child link rows must be ≥44×44px. If the layout looks visually tighter than 44px, pad the link interior (don't shrink rows).

- [ ] **Step 2: Add the `FAQPage` JSON-LD script**

Inside the section (NOT in `<head>`, to keep section self-contained for graduation later), emit:

```tsx
<Script
  id="services-faq-jsonld"
  type="application/ld+json"
  // eslint-disable-next-line react/no-danger
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What does Metaborong build?', acceptedAnswer: { '@type': 'Answer', text: '…' } },
      { '@type': 'Question', name: 'How does Metaborong differ from a freelancer marketplace?', acceptedAnswer: { '@type': 'Answer', text: '…' } },
      { '@type': 'Question', name: 'What blockchain ecosystems does Metaborong support?', acceptedAnswer: { '@type': 'Answer', text: '…' } },
    ],
  })}}
/>
```

Q&A text copied verbatim from `docs/content/sections/services.md` section 7.

- [ ] **Step 3: Verify typecheck**

`npx tsc --noEmit` — expected PASS.

---

## Task 4: Rewire `services.tsx` to use the new component

**Files:**
- Modify: `components/sections/services.tsx`

Trim `services.tsx` to a thin wrapper that renders the new component. If task-2 mobile decision is "unify," delete the `<ServicesTrefoil className="hidden lg:grid" />` + `<ServicesMobile className="lg:hidden" />` split and import the unified `<ServicesPillars />`. If "keep split," import both `<ServicesPillars className="hidden lg:grid" />` and the rewritten `<ServicesMobile className="lg:hidden" />`.

- [ ] **Step 1: Edit the import + body**

The intro block (eyebrow + H2 + lede) currently lives in `services.tsx`. Decide: keep there and pass to the new component as children, OR move into the new component. Recommend moving into the new component so all section content lives in one file — `services.tsx` becomes a 5-line wrapper.

- [ ] **Step 2: Verify typecheck**

`npx tsc --noEmit` — expected PASS.

---

## Task 5: Delete obsolete files

**Files:**
- Delete: `components/sections/services-trefoil.tsx`
- Delete: `components/sections/services-glyphs.tsx`
- Conditionally delete: `components/sections/services-mobile.tsx` (if task 2 decided "unify")

- [ ] **Step 1: Confirm no other imports**

```bash
grep -r "services-trefoil\|services-glyphs\|ServicesTrefoil\|ServicesGlyphs" --include="*.tsx" --include="*.ts" -l
```

Expected: only `services.tsx` (which we already rewired in task 4) and the deleted files themselves. If anything else references them, fail loud and audit.

- [ ] **Step 2: Delete the files**

`rm components/sections/services-trefoil.tsx components/sections/services-glyphs.tsx`

If unified, also `rm components/sections/services-mobile.tsx`.

- [ ] **Step 3: Verify build**

`npm run build` — expected PASS. No broken imports.

---

## Task 6: Manual QA on `PORT=3001`

**Files:**
- None (verification only)

- [ ] **Step 1: Start dev server**

```bash
PORT=3001 npm run dev
```

- [ ] **Step 2: Browse the section at three widths**

- 1280px+ — three pillars side-by-side (or per Figma layout). All 14 child links visible. Hub CTAs visible per pillar.
- 768px — tablet treatment per Figma. No horizontal scroll. Tap targets feel ≥44px.
- 375px — mobile. All 14 child links rendered in SSR HTML (view-source confirms). No `display:none` swallowing content.

- [ ] **Step 3: Keyboard nav**

Tab through the section. Expected order: eyebrow → H2 → lede → blockquote (non-interactive, skipped) → pillar 01 num/heading/body (non-interactive) → child 1 link → child 2 link → … → child 7 link → pillar 01 hub CTA → pillar 02 first child → … . Focus ring (brand 2px, 2px offset) visible on every focus.

- [ ] **Step 4: reduced-motion**

Toggle System Preferences → Accessibility → Reduce Motion. Reload. Section Reveal short-circuits to visible immediately; no animation.

- [ ] **Step 5: View-source the page**

Confirm SSR contains: H2 text, blockquote text, all 14 child names + descriptions, JSON-LD `<script>` block with 3 questions.

---

## Task 7: Commit checkpoints

Per parallel-session rules: commit frequently to `section/what-we-build-redesign`. Do not merge to `design-revamp`.

Suggested checkpoints:
1. After task 1 (data lock).
2. After task 2 (Figma adapted + spec deviation log filled).
3. After task 3 (new component lands).
4. After task 4 + 5 (rewire + cleanup).
5. After task 6 (QA passes).

---

## Out of scope (deferred / parallel session)

- DESIGN.md grammar additions — graduates serially after parallel `section/problem-redesign` also lands.
- CHANGELOG.md decision log entry — same gating.
- Any `app/globals.css` change beyond section-scoped CSS modules — parallel-session rule.
- New design tokens — none required if Figma stays within DESIGN.md grammar (verify at task 2).
- Visible FAQ rendering — owned by dedicated FAQ section.
- Entity-disambiguation copy (founding year, location, founders) — owned by Founders section.
- Proof anchors for "audit-ready" / "senior team" — owned by Trust + Founders sections.
- New routes — services hub + child pages already exist as noindex stubs.

## Risks

- **Figma layout introduces a deviation from DESIGN.md** — handled by spec deviation log; if motion is introduced it must be one-shot.
- **Pillar 03 (1 child) looks empty** — design problem. Mitigations: (a) Figma may show this is fine because pillar 03 gets the same container weight; (b) if it reads thin, add a single inline note ("Single-track studio practice. 4–12 week engagements." or similar — only with user approval, since this introduces new copy).
- **Mobile re-renders all 14 links and bloats DOM** — acceptable; SSR HTML weight is small (~3KB compressed).
