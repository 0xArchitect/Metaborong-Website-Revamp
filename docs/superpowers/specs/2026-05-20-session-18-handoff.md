# Session 18 — Orchestrator Handoff Brief

**Date:** 2026-05-20
**Scope:** Comparison + FAQ + Social-Proof (Testimonials) sections, **redesigned in three parallel section-sessions coordinated by an orchestrator session**.
**Branch state:** `design-revamp` @ `8a870ca` (pushed to origin). Tree clean except untracked `docs/FAQReference.jpeg` (visual ref for FAQ; not yet committed).
**Predecessors:** Session 17 (ContactCta + Footer Figma redesigns, graduated 2026-05-19) → Session 17 follow-up (2026-05-20 ContactCta refit to Figma landscape + footer wordmark reorder + PR #33 mobile-resp pass graduated).
**This doc is the source-of-truth seed for the orchestrator — read first, before anything else.**

---

## Architecture — orchestrator + 3 section-sessions

Session 18 is **not** one long session. It splits into:

- **Session 18-orchestrator** (this prompt opens here) — reads this handoff, asks D1–D8 via AskUserQuestion, sets up three worktrees, drafts a per-section mini-brief for each worker, hands off the launch prompts, waits for each section's merge-ready report, merges in order, runs the single end-of-session graduation.
- **Session 18-comparison** (terminal #2, `../mb-website-comparison`, port 3099) — runs the Comparison chain end-to-end.
- **Session 18-faq** (terminal #3, `../mb-website-faq`, port 3098) — runs the FAQ chain.
- **Session 18-testimonials** (terminal #4, `../mb-website-testimonials`, port 3097) — runs the Testimonials chain (gated on D4 Clutch content).

Why this shape: per-section context isolation, AskUserQuestion gates inside each section's own scratchpad, failure isolation (Testimonials blocked on Clutch doesn't stall the others), Session-16's proven parallel-worktree pattern scaled from 2 to 3 with an explicit orchestrator/worker split.

---

## 0. TL;DR

Three homepage sections need a Session-17-style redesign + copy pass, **in parallel** (three worktrees, three section-sessions, one orchestrator session). Each section gets the same gstack chain we've now run six times in a row: A1 (redesign) and/or A3 (copy chain), then plan-design-review → writing-plans → executing-plans → impeccable critique → design-review → simplify → report-ready-for-merge. Orchestrator merges all three at the end, runs the single Session-18 graduation.

**Sections:**
1. **Comparison** (`components/sections/comparison.tsx`, 47 lines) — user kept it after explicit pushback (Session 17 close). Most likely an A1 visual redesign + light A3 polish on one row (Track record).
2. **FAQ** (`components/sections/faq.tsx` + `faq-data.ts`, 7 Q&As) — design ref dropped at `docs/FAQReference.jpeg` (untracked, 1898×898 JPEG). A1 + likely no copy change (7 answers already gated through writing-guardrails on 2026-05-14).
3. **Social Proof / Testimonials** (`components/sections/testimonials.tsx`, 131 lines) — **A3 create-shaped: 7 `[TODO: …]` Clutch placeholders block the section.** Copy is the unlock; visual redesign happens after the Clutch content arrives. **Cannot ship without USER_INPUT** (rating, review count, 3 quotes verbatim + reviewer names + deep-links).

---

## 1. Pre-work the user owes the next session

Don't open Session 18 without these. Save a turn by collecting them now.

### 1a. Figma node IDs (or "no Figma — use existing JSX as baseline")

The locked Figma file is `mQsbMuw0spVgIu7jXirr3o` (Metaborong-Portfolio) — same file used for Hero, Why-Us, Founders, ContactCta, Footer. Confirm whether Comparison / FAQ / Testimonials have target frames in there:

- **Comparison:** node id = `?` (or `no Figma — keep current JSX structure, just visual polish pass`)
- **FAQ:** node id = `?` (the `docs/FAQReference.jpeg` is presumably an export from this — confirm the source frame id so we can pull live design context)
- **Testimonials:** node id = `?` (or "keep the shipped Clutch-strip + 3-card layout")

If a section has no Figma frame, that's fine — the existing JSX is the baseline. The chain becomes A2-polish-shaped rather than A1-redesign-shaped (see §3 below).

### 1b. Clutch content (Testimonials blocker)

The shipped testimonials section is full of `[TODO: …]` placeholders. Pull from the Clutch profile (`@/lib/links` exports `clutchProfileUrl`):

- **Aggregate rating** (e.g. `4.9`)
- **Verified review count** (current count today)
- **Top 3 review quotes verbatim** + reviewer name, company, deep-link URL per review

Without this, Testimonials cannot be graduated. Comparison + FAQ can ship in parallel and Testimonials lands when the Clutch content arrives.

### 1c. Comparison "Track record" row decision

Track record row currently reads `DeFi · AI · SaaS shipped`. It's the only vague row in an otherwise concrete table. Three options the user should pre-decide so Session 18 doesn't stall:

- **A)** Drop the row entirely (6 → 5 rows).
- **B)** Replace with a number (e.g. `8+ products in production` from existing TRUST SIGNALS).
- **C)** Keep as-is.

---

## 2. Section-by-section current state

### 2.1 Comparison

- **JSX:** `components/sections/comparison.tsx` (47 lines, server component — no `'use client'`). Module-const `rows[]` of 6 objects (`label`, `mb`, `large`, `free`); rendered as a `<table>`. Wired into `app/page.tsx:77` (`<ComparisonSection />` rendered AFTER `<TestimonialsSection />`).
- **Copy:** lives in JSX (rows[] array) AND in `docs/content/homepage.md` §[COMPARISON] (lines ~367–397). Both are A3-locked as of 2026-05-14 (homepage copy audit). H2: `How Metaborong compares`. Section intro: 16w "If you're choosing between us, a large agency, or a freelance team — here's the honest read."
- **Locked concrete claim:** `7 chains — Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, Avalanche`. This is the ONLY place on the homepage where the chain list lives in full. Do not touch.
- **Pre-existing flag:** there is a site-wide 7-chains-vs-4-chains drift (Hero blockquote says "EVM chains and Solana"; TRUST SIGNALS says "Ethereum, Solana, Base, Arbitrum (confirm with team)"; Comparison says 7). Was deferred during Session 17. Decide whether to resolve in Session 18 (touches `lib/schema.ts`, FAQ, Hero blockquote) or keep deferred.
- **DESIGN.md status:** no row in the Decisions Log yet. Will be added at graduation.
- **Likely shape:** A1 visual redesign + tiny A3 (Track-record row only). Audit should be quick — table copy was already gated.

### 2.2 FAQ

- **JSX:** `components/sections/faq.tsx` (41 lines, `'use client'` — uses `useState` for accordion expand/collapse) + `components/sections/faq-data.ts` (data file with 7 Q&As). Wired into `app/page.tsx:79`.
- **Copy:** `docs/content/homepage.md` §[FAQ] (lines ~413–449). 7 Q&As, each answer ≤50 words, self-contained for AI extraction. Sentence-start variety locked 2026-05-14 (only 1/7 starts with `A Web3…`). All under 50 words. Cut from 8 to 7 on 2026-05-14.
- **Visual ref:** `docs/FAQReference.jpeg` (1898×898, untracked) — drop this into the spec asset folder when starting (move to `docs/superpowers/assets/2026-05-21-faq-figma.png` or similar, do NOT ship in `public/`).
- **Pre-existing drift to fix in passing:** the AEO checklist at `homepage.md:558` still says `FAQ: 8 Q&As`; doc body has 7. Flag-only since 2026-05-17; resolve at graduation.
- **AEO note:** FAQ has the highest extract-rate potential of the page tail — answers must stay ≤50w and self-contained (no "as above" / "see Services" backrefs).
- **Hard constraints:** `FAQPage` JSON-LD lives in `lib/schema.ts` (`faqSchema`) and mirrors `faq-data.ts` — keep them byte-consistent at all times. Schema drift breaks rich results.

### 2.3 Social Proof / Testimonials

- **JSX:** `components/sections/testimonials.tsx` (131 lines, `'use client'` — adds drag/scroll lane via `useRef` per PR #33). Wired into `app/page.tsx:74` (BEFORE Comparison).
- **Padding-chain drift (2026-05-20):** this section's `<section>` still hand-rolls the old four-step chain (`sm:px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px]`) instead of consuming `<Section>` or the new PR #33 six-step chain. Likely should migrate to `<Section bg="subtle" maxWidth="xwide">` at redesign time. Flag.
- **Copy:** `docs/content/homepage.md` §[TESTIMONIALS] (lines ~242–288). Heavy `USER_INPUT:` markers — rating, review count, profile URL, 3 quotes, deep-links. Section is **blocked on Clutch content** until those arrive.
- **Locked decisions:** (a) Section uses the **official Clutch widget** as primary trust marker (Session 16 lock, see DESIGN.md Decisions Log 2026-05-19 Why-Us row); a static text/badge fallback with `sr-only` SEO content is the a11y/SEO pair. (b) Each card whole-link to Clutch; `target="_blank" rel="noopener"`. (c) Per-quote deep-link as `Read on Clutch →`. (d) Section-level `View all reviews on Clutch →` below the grid.
- **Heading:** `## Reviewed and verified on Clutch` (locked 2026-05-14; replaces previous "Voices of trust" agency-speak).

---

## 3. Methodology — which context per section

Reference: `docs/superpowers/SESSIONS.md` for the full per-context skill chain. The skeleton:

### A1 — new homepage section, from scratch (or full redesign)
brainstorming → frontend-design / design-shotgun → plan-design-review (spec gate) → writing-plans → executing-plans → impeccable critique → design-review → simplify → graduate (DESIGN.md + CHANGELOG.md + scorecard).

### A2 — polish iteration on a shipped section (the Session-12 nav flow)
critique → layout → polish → frontend-design — for existing-section polish passes. **Default for the Comparison + Testimonials visual redesigns** if there's no Figma frame.

### A3 — copy-only change on a shipped section (the copy chain)
seo-content-auditor (audit FIRST) → write to `homepage.md` → seo-aeo-landing-page-writer (rewrite) → seo-content-auditor (re-score — must beat the baseline) → seo-authority-builder (only on trust-heavy pages — Founders, Testimonials yes; Comparison/FAQ no) → copywriting (claim-gate) → writing-guardrails vet (AI-slop / em-dash / banned words).

### Per-section recipe

| Section | Context | Notes |
|---|---|---|
| **Comparison** | A2 (visual polish) + tiny A3 (Track-record row only, if user picks B from §1c) | Copy table mostly locked since 2026-05-14; skip full audit; targeted single-row rewrite. |
| **FAQ** | A1 if `FAQReference.jpeg` is a real Figma redesign; A2 if it's just a layout polish brief | Copy already gated; do NOT re-run A3 unless a question's answer is being rewritten. Mirror any answer edit into `lib/schema.ts` `faqSchema`. |
| **Testimonials** | A3 (create — Clutch content fill) **plus** A1 (visual redesign if Figma frame exists; else A2 polish) | Cannot start without Clutch content (§1b). Visual + copy interleave — quote content shapes card aspect, so do A3 first, A1 after. |

---

## 4. Orchestrator workflow + 3 section-sessions

Memory `feedback-coordinator-preview-and-verify` says the parallel-worktree merge-back pattern worked in Session 16 (Why-Us + Founders in parallel). Session 18 scales it to 3 with an explicit orchestrator/worker split.

### 4.1 Orchestrator's job (in order)

1. **Read this handoff + the §6 reference set.** Don't skim.
2. **Ask D1–D8 (§8) via AskUserQuestion** with decision briefs (ELI10, recommendation, pros/cons per option per the gstack AskUserQuestion format). One question per call, in the order listed in §8 — earlier answers shape later questions (e.g. D1 "no Figma" makes D5 fall to the Comparison worker's spec instead of being a pre-emptive call).
3. **Set up three worktrees** with the commands in §4.3.
4. **Write three section-scoped mini-briefs** to `docs/superpowers/specs/2026-05-20-session-18-<section>-brief.md` (template in §4.4). Each mini-brief is the section-session's input — it inherits this handoff's hard constraints (§5) by reference + adds the section-specific Figma node id, A1/A2/A3 chain pick, and any user-resolved decisions from D1–D8.
5. **Hand off the launch prompts** (§4.5) — give the user one paste-ready prompt per terminal.
6. **Wait for section-session reports.** Each section-session runs its chain, finishes with `tsc 0 + design-review PASS + simplify done`, commits to its branch, and reports "merge-ready on `section/<name>-redesign`@`<sha>`" back to the user. Orchestrator does not poll — the user relays each report into the orchestrator session.
7. **Merge in order** (§4.6) once each section reports ready.
8. **Single end-of-session graduation** (§4.7).

### 4.2 What the orchestrator does NOT do

- **Does not run the section chains itself.** No specs, no plans, no impeccable critiques, no design-review live QA for the three sections. That's section-session work.
- **Does not host a dev server.** Section-sessions run their own `pnpm dev` on their port. Orchestrator only does git ops + reads merged state via `curl` after each merge.
- **Does not push.** Default = end-of-session push per `feedback-no-push-after-every-change` (unless D8 says otherwise).
- **Does not modify DESIGN.md / CHANGELOG.md / docs/content/homepage.md** before all three sections are merged. Graduation is one commit, not three.

### 4.3 Worktree setup

```bash
# Orchestrator terminal, from /Users/zephyr/Claude-Workspace/projects/mb-website (main checkout, on design-revamp)
git fetch origin
git worktree add ../mb-website-comparison    -b section/comparison-redesign    design-revamp
git worktree add ../mb-website-faq           -b section/faq-redesign           design-revamp
git worktree add ../mb-website-testimonials  -b section/testimonials-redesign  design-revamp
```

### 4.4 Section-brief template (one per section, written by orchestrator after D1–D8)

```markdown
# Session 18-<section> — Section Brief

**Worktree:** ../mb-website-<section>
**Branch:** section/<section>-redesign
**Dev port:** PORT=30XX pnpm dev    (comparison=3099, faq=3098, testimonials=3097)
**Chain:** <A1 | A2 | A3 | A1+A3 | A2+A3>   (per §3 of the handoff; orchestrator picks based on D1–D3)
**Figma node:** <id from D1/D2/D3, or "no Figma — use existing JSX as baseline">

## Inherits (read in order, don't re-derive)
1. docs/superpowers/specs/2026-05-20-session-18-handoff.md (§5 hard constraints, §6 references, §7 deliverable shape)
2. DESIGN.md (full)
3. docs/superpowers/SESSIONS.md (the chain definitions for your context)
4. docs/content/homepage.md §[<SECTION>] (current locked copy)

## This section's specifics
- Current JSX state: <paths + line counts from §2.<n>>
- Locked claims to preserve: <e.g. 7-chains list for Comparison>
- Drift to fix in passing: <e.g. FAQ AEO-checklist 8→7, testimonials padding chain migration>
- Pre-resolved decisions from D1–D8: <copy in whatever D# applies>
- Hard blocker: <e.g. Testimonials needs D4 Clutch content before A3 step 3>

## Deliverables (per §7)
- docs/superpowers/specs/2026-05-21-section-<section>.md
- docs/superpowers/plans/2026-05-21-section-<section>.md
- (if A3) docs/superpowers/specs/2026-05-21-<section>-copy-audit.md
- (if Figma asset) docs/superpowers/assets/2026-05-21-<section>-figma.png + optimized public/<section>/<asset>.webp

## Definition of done (report back to orchestrator)
- npx tsc --noEmit exit 0
- SSR smoke green on PORT=30XX for the section's content
- impeccable critique applied
- design-review entry in spec
- simplify pass committed
- final commit SHA on section/<section>-redesign branch
- one-line PR-style summary: "<section>: <what changed in 1 sentence>"
- list of any cross-file edits (e.g. lib/schema.ts for FAQ, app/page.tsx if render order changed)

## Do NOT
- Touch DESIGN.md, CHANGELOG.md, or any other section's files
- Push your branch
- Graduate (orchestrator does this once for all three)
```

### 4.5 Launch prompt template (orchestrator gives the user one of these per terminal)

> Open Session 18-<section>. Read `docs/superpowers/specs/2026-05-20-session-18-<section>-brief.md` first, then the inherited docs it points to. Run the `<A1|A2|A3|A1+A3|A2+A3>` chain end-to-end against the section listed in the brief. Dev server: `PORT=30XX pnpm dev` (port in the brief). When done, commit to `section/<section>-redesign` and reply with the final SHA + the merge-ready report described in §"Definition of done" of the brief. Do not push. Do not touch DESIGN.md/CHANGELOG.md/homepage.md outside your section's block.

### 4.6 Merge-back (orchestrator does this, in order)

When a section reports merge-ready:

```bash
# Orchestrator terminal, on design-revamp
git fetch . section/<section>-redesign     # picks up the worker's commits via the worktree
git merge --no-ff section/<section>-redesign -m "Merge section/<section>: <one-line summary from the report>"
npx tsc --noEmit
# SSR smoke on the merged tree (start orchestrator's own dev server on a free port if needed, OR rely on user's terminal)
```

**Merge order:** Comparison first (smallest surface) → FAQ second (data file + schema mirror) → Testimonials last (largest surface + Clutch wiring + potential `app/page.tsx` render-order touch). Each merge gets a `tsc --noEmit` + SSR string-grep before the next. If a merge conflict appears (unlikely since the three sections don't overlap), resolve and re-tsc before continuing.

### 4.7 Single end-of-session graduation

After all three are merged, orchestrator writes one graduation commit:
- **DESIGN.md** Decisions Log: 3 rows (one per section) for 2026-05-21 (or whatever the merge date is).
- **CHANGELOG.md:** one `## 2026-05-21 — Session 18` entry covering all three (sub-bullets per section, mirrors the Session-17 entry shape).
- **Copy-audit scorecard:** rows for sections that ran A3 (likely Testimonials + maybe Comparison's Track-record row if D5 picked B).
- Each section's spec + plan + (if A3) copy-audit was committed in its worktree before merge — already in the tree.
- Push only if D8 says push-at-end. Otherwise hand off the final SHA to the user.

### 4.8 Worktree teardown (after graduation merges)

```bash
git worktree remove ../mb-website-comparison
git worktree remove ../mb-website-faq
git worktree remove ../mb-website-testimonials
git branch -d section/comparison-redesign section/faq-redesign section/testimonials-redesign   # only if all merged into design-revamp
```

---

## 5. Hard constraints (do not violate without explicit user approval)

These are project locks — every Session-17 prompt enforced them, every Session 18 prompt must too.

### 5.1 DESIGN.md

- **Always read `DESIGN.md` before any visual/UI decision.** Fonts, colors, spacing, motion grammar, primitive variants, section patterns. (CLAUDE.md rule.)
- **Section primitive padding chain (post PR #33 graduation 2026-05-20):** `px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]`. Six steps. Full `128` only at `2xl ≥1536px`. Source of truth = `components/ui/section.tsx:36`. CSS variable `--section-px` is **drifted** (still 24/48/72/96 at sm/md/lg/xl) — flagged in DESIGN.md Layout section; class chain wins.
- **Section primitive max-width variants:** `wide` (1120), `xwide` (1280), `narrow` (880), `prose` (720). Default to `xwide` unless content demands otherwise.
- **`<Button>` primitive** (`components/ui/button.tsx`): variants `primary | ghost | secondary`, sizes `sm | md | lg`, `arrow` prop = split-arrow Bauhaus signature. Hover = `bg-[#1a3fdb]`. **Radius-0.** Never hand-roll a split-arrow.
- **`<Eyebrow>` primitive** (`components/ui/eyebrow.tsx`): `text-[11px] font-bold uppercase tracking-[0.1em] leading-none text-gray-light`. `!`-override convention for size/color tweaks (e.g. `text-[12px]! text-dark!` — see footer.tsx).
- **DESIGN.md a11y rule:** `#999` / `text-gray-light` is **forbidden on load-bearing copy** (only tertiary labels, disabled state, decorative `aria-hidden`). WCAG AA contrast everywhere else.

### 5.2 Copy guardrails

- **Em-dashes are ENDORSED in visible body copy** per `DESIGN.md:37`. The "no em-dash" voice in gstack writing-skills (seo-aeo-landing-page-writer, copywriting) is **overridden by DESIGN.md** per CLAUDE.md instruction priority. The guardrail is **alt/ARIA-scoped only** — strip em-dashes from screen-reader-announced text (`alt`, `aria-label`) but keep them in visible prose. Memory `feedback-em-dash-guardrail-scope`. **Don't over-correct.**
- **Positioning is Web3 AND AI, equal.** Memory `positioning-web3-and-ai-equal`. Never frame Metaborong as "Web3-first" or competition as "Web3 agencies" alone. Every claim line carries both pillars when both are relevant.
- **Brand color discipline.** Memory `feedback-brand-color-caveats`. Flag any raw `#296ff0` / `#204AF8` hex, R3F `new THREE.Color()`, or SVG `fill=` that bypasses `--color-brand` at write time — not at the next refresh.

### 5.3 Process

- **Don't push after every change.** Memory `feedback-no-push-after-every-change`. Commit locally to `design-revamp` (or the worktree branch) in logical units; push only when the user explicitly says so.
- **Subjective visual placement → candidate-pick.** Memory `feedback-visual-placement-candidates`. Render 2–3 labeled variants on the live page and let the user choose. Don't burn reject cycles on pixel-detection or eyeballing.
- **Never `rm -rf .next` while the dev server is running.** Memory `feedback-dev-server-next-cache`. Corrupts served CSS with no error.
- **`.env.local` `$` escapes.** Escape every `$` as `\$` — Next dotenv-expand substitutes `$token` with empty string, silently mangling secrets. Backslash is the only escape (single quotes do nothing).
- **`/figma-use` skill is absent.** Memory `feedback-figma-use-skill-absent`. Call Figma MCP read tools directly (`get_design_context`, `get_screenshot`). Retry on first rejection. Figma text ≠ authoritative copy (always go through A3).

### 5.4 Verification posture

- Section components are **visually QA'd**, not unit-tested. `tsc --noEmit` exit 0 + dev QA at **1440 / 1280 / 375** is the bar. **No Vitest** for presentational sections.
- `npm run build` is **expected to fail at `/blog/rss.xml`** — that's the PR #26 env hold (memory `project-cms-merge-and-build-env`), NOT a regression.
- SSR smoke: `curl -s localhost:30XX | grep -o '<expected-string>'` — confirm the change is in the server HTML before declaring done. Memory `feedback-coordinator-preview-and-verify` warns about the "first dev-server poll too short" trap.

### 5.5 Schema mirror

- `lib/schema.ts` is the **JSON-LD source of truth**: `Organization` (homepage), `FAQPage` (FAQ), `Question/Answer` (Why-Us standalone AEO block). Any answer edit in `faq-data.ts` MUST mirror into `faqSchema` in the same commit. Drift breaks rich results.

---

## 6. Files / memories to load on Session 18 start

Read in this order:

1. **`docs/superpowers/specs/2026-05-20-session-18-handoff.md`** (this doc).
2. **`CLAUDE.md`** (project root) — agentic gotchas: Next 16 → `proxy.ts`, `.env.local` `$` escapes, no `rm -rf .next` mid-dev.
3. **`DESIGN.md`** — full read. Pay attention to the new Decisions Log rows for 2026-05-19 (Why-Us, Founders, Hero+Nav, ContactCta, Footer) and 2026-05-20 (ContactCta refit, footer wordmark order, PR #33 chain re-tune).
4. **`docs/superpowers/SESSIONS.md`** — context skeletons + skill cheat sheet.
5. **`docs/content/homepage.md`** §§ COMPARISON, TESTIMONIALS, FAQ (current locked copy).
6. **`docs/writing-guardrails.md`** — the A3 step-7 vet criteria.
7. **MEMORY.md** entries (auto-loaded via the session-start memory pointer):
   - `visual-direction-and-workflow` (2026-05-04 lock + Session-15 hero supersession)
   - `workflow-impeccable-frontend-design-stack` (Session-12 proven chain)
   - `workflow-copy-chain-a3` (A3 routing)
   - `project-metaborong-website` (all locked decisions, services, competitor intel)
   - `feedback-em-dash-guardrail-scope`
   - `feedback-brand-color-caveats`
   - `positioning-web3-and-ai-equal`
   - `feedback-visual-placement-candidates`
   - `feedback-parallel-worktree-dev-ports`
   - `feedback-coordinator-preview-and-verify`
   - `feedback-no-push-after-every-change`
   - `feedback-dev-server-next-cache`
   - `feedback-figma-use-skill-absent`
   - `project-cms-merge-and-build-env`

Reference docs (read selectively as the task requires):

- `db/README.md` (only if a section starts to need data-layer changes — none planned).
- `lib/schema.ts` (FAQ schema mirror; will be edited).
- `lib/links.ts` (Clutch profile URL constant).
- `app/page.tsx` (render order — `TestimonialsSection` → `ComparisonSection` → `FaqSection` → `ContactCtaSection`).

---

## 7. Deliverable shape per section (the artifact set)

For each section, the chain produces these files (mirrors Sessions 15–17):

- **Spec:** `docs/superpowers/specs/YYYY-MM-DD-section-<name>.md`
  - Design intent (1–2 paragraphs)
  - Anatomy (Figma node → project component mapping)
  - Token map (every visual primitive grounded in DESIGN.md)
  - Deviations 1–N (each explicitly logged with WHY)
  - Hard constraints
  - plan-design-review scorecard (≥8.5 to proceed)
  - impeccable critique entry (added later)
  - design-review entry (added later)
  - GRADUATION DRAFT (added at the end, copy-pasted into DESIGN.md row + CHANGELOG.md entry)
- **Plan:** `docs/superpowers/plans/YYYY-MM-DD-section-<name>.md`
  - Tasks broken to 2–5-minute steps (writing-plans skill format)
  - Each step has: file, exact code/command, verification, expected result
  - Self-review section at the end
- **(A3 only) Copy audit:** `docs/superpowers/specs/YYYY-MM-DD-<section>-copy-audit.md`
  - Baseline score with rubric (5 categories, 1–10 each)
  - Drift items
  - A3 Scorecard table (added at graduation)
- **Asset capture:** `docs/superpowers/assets/YYYY-MM-DD-<section>-figma.png` (raw Figma export, **local-only, do NOT ship**; provenance is the Figma node id).

Optimized assets (webp from raw PNG via `sharp`) go to `public/<section>/<asset>.webp`. Target ≤500 KB, q=80–86, 2000–2400 px wide.

---

## 8. Decisions the orchestrator asks the user at session open (NOT pre-filled)

These are AskUserQuestion gates inside the orchestrator session, **not paste-line answers in the opening message**. Each gets a decision brief (ELI10, recommendation, pros/cons per option). Order matters — earlier answers shape later questions.

| # | Decision | Asked when | Why it matters |
|---|---|---|---|
| D1 | **Comparison Figma node id** (or `no Figma — use existing JSX as baseline`) | Step 2, first question | Determines A1 vs A2 chain for the Comparison section-session. |
| D2 | **FAQ Figma node id** (the source of `docs/FAQReference.jpeg`) | Step 2 | Same for FAQ. |
| D3 | **Testimonials Figma node id** (or `keep current Clutch-strip + 3-card layout`) | Step 2 | Same for Testimonials. |
| D4 | **Clutch content delivery** — paste now / I'll deliver mid-session / Testimonials waits until I have it | Step 2 | Blocks Testimonials section-session. If "wait", orchestrator launches only Comparison + FAQ workers now and queues Testimonials. |
| D5 | **Comparison "Track record" row** — drop / replace with `8+ products` / keep as-is | Step 2, only if D1 != `no Figma` (if it is `no Figma`, push this into the Comparison worker's spec instead) | Pre-empts a mid-A3 question in the Comparison section-session. |
| D6 | **7-vs-4-chains site-wide drift** — resolve in Session 18 (cross-cutting: `lib/schema.ts` + Hero blockquote + FAQ + TRUST SIGNALS) OR keep deferred | Step 2, before launching workers | If "resolve", orchestrator owns the cross-cutting edit (it touches files outside any one section's brief); workers are told the canonical chain count. If "deferred", workers preserve the existing inconsistency. Recommend keep deferred for Session 18 — the cross-cutting fix wants its own context. |
| D7 | **Execution sub-pattern** — (a) three actual terminal sessions / (b) one orchestrator session dispatching `general-purpose` subagents | Step 2 | Recommend (a) — Session 16 ran 2 terminals successfully; subagents can't AskUserQuestion the user mid-task or host dev servers, so (a) is the safer scale-up. |
| D8 | **Push cadence** — push per merge or once at end-of-session | Step 2 | Default = end-of-session per `feedback-no-push-after-every-change`. |

---

## 9. Out-of-scope reminders

Don't let these sneak into Session 18:

- PR #26 (CMS merge → main) is still **open / held on env**. Memory `project-cms-merge-and-build-env`. Don't act on it without explicit instruction.
- `lib/schema.ts` Organization `PostalAddress` ×3 (NAP from footer offices) is deferred from Session 17. Not Session 18 scope unless a section explicitly needs it.
- `--section-px` CSS variable drift (24/48/72/96 vs. the new 16/24/40/48/80/128) — flagged, not Session 18 scope unless something breaks.
- Real Behance / Medium / Discord URLs for footer (currently `/` redirects) — deferred.
- 17 MB repo bloat (raw Figma PNG + Gemini PNG committed upstream by `5a41d7e`) — pre-existing, no history rewrite planned (collaborative repo).
- Service-page noindex strategy / reindexing — separate follow-up, not Session 18.

---

## 10. Tone reminders

- **Keep responses short and concise** (user's global preference). No trailing recaps.
- **No emojis** unless explicitly requested.
- **Push back when warranted.** This session's Comparison-keep decision came from honest pushback — repeat the pattern.
- **Match existing voice.** Don't soften concrete claims to be "safer" — the page already chose to be specific (7 chains, named clients, named founders).

---

## 11. Session-open commands

### 11.1 Orchestrator session (paste into the first new terminal)

> Start Session 18 — you are the orchestrator. Read `docs/superpowers/specs/2026-05-20-session-18-handoff.md` end-to-end, then `DESIGN.md` and `docs/superpowers/SESSIONS.md`. Follow §4 (orchestrator workflow): ask D1–D8 via AskUserQuestion in the order in §8, set up the three worktrees, write the three section briefs from the §4.4 template using my D1–D8 answers, then hand me the launch prompts for the section terminals. Do not run the section chains yourself. Do not push.

### 11.2 Section session launch prompts

The orchestrator generates one per terminal after §11.1 — see the §4.5 template. Each is a one-paragraph paste-ready prompt that points the section-session at its `2026-05-20-session-18-<section>-brief.md`.
