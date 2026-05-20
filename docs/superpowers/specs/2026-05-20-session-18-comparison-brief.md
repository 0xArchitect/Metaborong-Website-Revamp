# Session 18-comparison — Section Brief

**Worktree:** `../mb-website-comparison`
**Branch:** `section/comparison-redesign`
**Dev port:** `PORT=3099 pnpm dev`
**Chain:** **A2 (visual polish) + full A3 (copy chain)** — the 2026-05-14 table copy lock is **explicitly reopened** by the user; the entire row set is in scope, not just one row.
**Figma node:** *no Figma — use the shipped 47-line JSX as baseline.*

---

## Inherits (read in order, don't re-derive)

1. `docs/superpowers/specs/2026-05-20-session-18-handoff.md` — §5 hard constraints, §6 reference set, §7 deliverable shape, §3 chain definitions.
2. `DESIGN.md` (full) — pay attention to the 2026-05-20 padding-chain re-tune row in the Decisions Log.
3. `docs/superpowers/SESSIONS.md` — Context A2 (lines 95–119) **and** Context A3 (lines 123–170) chain definitions.
4. `docs/content/homepage.md` §[COMPARISON] (~lines 367–397) — current locked copy you are about to rewrite.
5. `docs/writing-guardrails.md` — A3 step-7 vet criteria.

MEMORY entries auto-loaded from the orchestrator handoff §6 — pay specific attention to: `feedback-em-dash-guardrail-scope`, `positioning-web3-and-ai-equal`, `feedback-brand-color-caveats`, `feedback-no-push-after-every-change`.

---

## This section's specifics

### Current state
- **JSX:** `components/sections/comparison.tsx` (47 lines, server component — no `'use client'`). Module-const `rows[]` of 6 objects (`label`, `mb`, `large`, `free`); rendered as a `<table>`.
- **Wiring:** `app/page.tsx:77` — `<ComparisonSection />` renders AFTER `<TestimonialsSection />`.
- **H2:** `How Metaborong compares` (current, locked 2026-05-14 — re-evaluate in A3).
- **Intro:** 16w `"If you're choosing between us, a large agency, or a freelance team — here's the honest read."` (re-evaluate in A3).

### Locked claims to PRESERVE verbatim (do NOT touch in A3)
- **`7 chains — Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, Avalanche`** — the comparison row is the ONLY place on the homepage where the full chain list lives. **Do not touch this string.** Treat as a hard constraint inherited from §5 of the handoff.

### Pre-resolved decisions from D1–D8

- **D1 — no Figma:** A2 polish on the shipped 47-line JSX; do NOT pull Figma MCP for this section. Visual baseline = current `components/sections/comparison.tsx`.
- **D1 follow-up — full A3 reopened:** the user explicitly reopened the 2026-05-14 copy lock. *"The UX copy is too aggressive — I want to make it professional and SEO optimised."* The entire `rows[]` array, H2, intro, and any inline text in the JSX is in scope. Tone target: **professional, technical, citation-ready**, not defensive/cheeky. Match the page voice established by Why-Us and Founders (Session 16/17).
- **D5 — Track-record row → `25+ products in production`:** Replace the current `DeFi · AI · SaaS shipped` row content. **Important:** this number is higher than the doc-shipped `8+ products` in TRUST SIGNALS (homepage.md). User has verified `25+` as ground truth. Use `25+ products in production` in the Comparison table; do NOT alter the TRUST SIGNALS section in this worker (that's a different section's drift; flag it in your A3 audit doc for graduation). Pair this with the `8+ products` drift in your reported cross-file edits.
- **D6 — 7-vs-4-chains drift stays DEFERRED:** the row `7 chains — Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, Avalanche` is the canonical claim. Do NOT also "fix" the Hero blockquote (`EVM chains and Solana`) or TRUST SIGNALS (`4 chains`) — those are out of scope for this worker. Preserve them as-is. Drift will be resolved in a future focused session.

### Drift to fix in passing (inside this section only)
- **Padding-chain check:** confirm `comparison.tsx` consumes `<Section>` (or applies the new PR #33 six-step chain `px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]`). Currently a `<section>` element exists — verify it's not hand-rolling the older 4-step chain. If it is, migrate to `<Section bg="default" maxWidth="xwide">` during the A2 pass.
- **Default `<Section bg>`:** Comparison currently follows `<TestimonialsSection>`. Testimonials worker (running in parallel) is migrating Testimonials to `bg="subtle"`. To preserve section alternation, Comparison should be `bg="default"` (white). Confirm and apply.

### Hard blocker
- None. Comparison can run end-to-end without external content.

---

## Chain to run (A2 first, then A3 layered on top)

Per `SESSIONS.md`:

### Phase 1 — A3 audit (do this FIRST so visual polish doesn't lock in copy you're about to rewrite)
1. `seo-content-auditor` + `copywriting` audit pass → write findings to `docs/superpowers/specs/2026-05-21-comparison-copy-audit.md`. Score baseline (5 categories, 1–10 each). Surface the "too aggressive" tone.
2. Edit `docs/content/homepage.md` §[COMPARISON] FIRST — source of truth before JSX. Lock new H2, intro, all 6 row labels + `mb`/`large`/`free` columns. **Preserve the 7-chain string verbatim.** Apply the D5 Track-record replacement (`25+ products in production`).
3. `seo-aeo-landing-page-writer` (scoped to §[COMPARISON]) — generate the rewrite against locked keywords + AEO targets. Tone = professional, technical, citation-ready.
4. `seo-content-auditor` — re-score the rewrite. Must beat the step-1 baseline.
5. **Skip step 5 (`seo-authority-builder`)** — Comparison is not a trust-heavy E-E-A-T section per A3 gating rules (only Founders/Why-Us/hubs qualify).
6. `copywriting` claim-gate. Block on any unverifiable claim.
7. `writing-guardrails.md` vet — banned words, significance inflation, -ing tails, padded tricolons. **Keep em-dashes in visible body copy** (DESIGN.md:37 endorses them).
8. Sync `homepage.md` → `components/sections/comparison.tsx` — `rows[]` array + H2 + intro must match doc verbatim.

### Phase 2 — A2 visual polish (now that copy is locked)
1. `impeccable critique components/sections/comparison.tsx` — a11y, focus, role/aria, tap targets, table semantics (`<thead>`/`<tbody>`/`scope=`).
2. `impeccable layout` — only if rhythm/spacing/hierarchy off. Cross-ref `web-design-guidelines`.
3. `impeccable polish` — only if visual sharpness needs work. 2–3 ASCII variants per memory `feedback-visual-placement-candidates` if you reach this step.
4. `frontend-design components/sections/comparison.tsx` — surgical execution against the locked spec from steps 1–3.
5. `verification-before-completion` — `npx tsc --noEmit` exit 0 + SSR smoke (`curl -s localhost:3099 | grep -o '25+ products in production'`).
6. `design-review` on the live diff at `PORT=3099 pnpm dev`. Manual QA at 1440/1280/375.
7. `simplify` — tighten the diff. Commit.

---

## Deliverables (per handoff §7)

- `docs/superpowers/specs/2026-05-21-section-comparison.md` — design intent, anatomy, token map, deviations 1–N, plan-design-review scorecard (≥8.5), impeccable critique entry, design-review entry, **GRADUATION DRAFT** at the end (will be lifted into DESIGN.md row + CHANGELOG.md entry by the orchestrator).
- `docs/superpowers/plans/2026-05-21-section-comparison.md` — writing-plans format, 2–5 min steps, each with file + exact code/command + verification + expected result.
- `docs/superpowers/specs/2026-05-21-comparison-copy-audit.md` — A3 audit doc with baseline + post-rewrite scores. Include a row flagging the `8+ products` → `25+ products` drift in TRUST SIGNALS for the orchestrator's graduation pass.

---

## Definition of done (report back to orchestrator)

- [ ] `npx tsc --noEmit` exit 0
- [ ] SSR smoke green on `PORT=3099` for the comparison content (`curl -s localhost:3099 | grep -o '<expected-string>'` lands)
- [ ] impeccable critique applied
- [ ] design-review entry committed in the spec
- [ ] simplify pass committed
- [ ] final commit SHA on `section/comparison-redesign` branch
- [ ] one-line PR-style summary: `comparison: <what changed in 1 sentence>`
- [ ] list of any cross-file edits (`docs/content/homepage.md` is expected; flag the `8+ products` drift in TRUST SIGNALS as a future-session item, do not edit it here)

Reply to the user with:
> **Comparison merge-ready on `section/comparison-redesign`@`<sha>`** — `<one-line summary>`. Cross-file edits: `<list>`. A3 audit baseline `<x>` → rewrite `<y>`.

---

## Do NOT

- Touch `DESIGN.md`, `CHANGELOG.md`, or any other section's files (FAQ, Testimonials, Hero, TRUST SIGNALS, schema, footer, etc.).
- Push your branch — orchestrator handles end-of-session push.
- Graduate — orchestrator does this once for all three sections after merge.
- "Fix" the `7-vs-4-chains` site-wide drift (D6 says deferred). Preserve the 7-chain string in Comparison; preserve the 4-chain string in TRUST SIGNALS untouched.
- Re-introduce em-dash stripping in visible body copy (`feedback-em-dash-guardrail-scope`). Em-dashes are endorsed in visible prose per DESIGN.md:37.
- Run a full `npm run build` — it's expected to fail at `/blog/rss.xml` (PR #26 env hold). Use `npx tsc --noEmit` for the typecheck gate.
