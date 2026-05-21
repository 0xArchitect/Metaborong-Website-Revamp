# Session 18-faq — Section Brief

**Worktree:** `../mb-website-faq`
**Branch:** `section/faq-redesign`
**Dev port:** `PORT=3098 pnpm dev`
**Chain:** **A2 (visual polish using `FAQReference.jpeg` as a static reference) + full A3 (re-open all 7 Q&As for SEO/AEO)** — the 2026-05-14 copy lock is explicitly reopened by the user.
**Figma node:** *no Figma — `docs/FAQReference.jpeg` is a non-canonical visual reference, NOT a live Figma frame.*

---

## Inherits (read in order, don't re-derive)

1. `docs/superpowers/specs/2026-05-20-session-18-handoff.md` — §5 hard constraints, §6 references, §7 deliverable shape.
2. `DESIGN.md` (full).
3. `docs/superpowers/SESSIONS.md` — Context A2 (lines 95–119) **and** Context A3 (lines 123–170) chain definitions.
4. `docs/content/homepage.md` §[FAQ] (~lines 413–449) — current 7 Q&As you're rewriting.
5. `docs/writing-guardrails.md` — A3 step-7 vet criteria.

MEMORY: `feedback-em-dash-guardrail-scope`, `positioning-web3-and-ai-equal`, `feedback-brand-color-caveats`, `feedback-no-push-after-every-change`, `feedback-figma-use-skill-absent`.

---

## This section's specifics

### Current state
- **JSX:** `components/sections/faq.tsx` (41 lines, `'use client'` — uses `useState` for accordion expand/collapse).
- **Data:** `components/sections/faq-data.ts` — 7 Q&As, each answer ≤50 words, self-contained for AI extraction.
- **Wiring:** `app/page.tsx:79` — `<FaqSection />`.
- **Schema mirror:** `lib/schema.ts` `faqSchema` (FAQPage JSON-LD) — **MUST stay byte-consistent with `faq-data.ts` at every commit**. Drift breaks rich-result eligibility.

### Visual reference
- `docs/FAQReference.jpeg` (1898×898, untracked at repo root) — your visual baseline for the A2 pass.
- **Action:** move it to `docs/superpowers/assets/2026-05-20-faq-reference.jpeg` early in the session and `git add` it. Do NOT ship it in `public/`.

### Pre-resolved decisions from D1–D8

- **D2 — no Figma:** A2 polish using the JPEG as a static reference image. Do NOT pull Figma MCP (the JPEG is not from the locked file). Implement the visual treatment that matches the JPEG's layout intent (likely two-column or accordion grid — confirm by reading the JPEG).
- **D2 follow-up — full A3 reopened:** *"I need actual FAQ questions that bring SEO, AEO there."* Re-open all 7 Q&As. Goal: each Q is a real search query (AEO question target), each A is a self-contained ≤50w answer that an AI overview could lift verbatim with attribution.
- **D6 — 7-vs-4-chains drift stays DEFERRED:** if a current FAQ answer mentions chains, do NOT "fix" it to match the Comparison row's 7-chain list. Preserve existing language. Drift gets a focused future session.

### Drift to fix in passing (inside this section only)
- **Schema mirror invariant:** every answer edit MUST mirror into `lib/schema.ts` `faqSchema` in the same commit. This is a hard constraint, not optional. Test with: `node -e "const s = require('./lib/schema.ts'); console.log(s.faqSchema.mainEntity.length)"` — must equal `faq-data.ts` length.
- **homepage.md drift:** `homepage.md:558` AEO checklist still says `FAQ: 8 Q&As`; body has 7. After your A3 settles on a final count, update both the body §[FAQ] and the AEO checklist line.
- **Padding chain / `<Section>` usage:** confirm `faq.tsx` consumes `<Section>` with the new PR #33 six-step padding chain. Migrate if it doesn't.

### Hard blocker
- None — FAQ can run end-to-end without external content.

---

## Chain to run (A3 first, A2 layered on top)

### Phase 1 — A3 audit + rewrite (FIRST — visual polish locks in the wrong content otherwise)
1. `seo-content-auditor` audit pass on the existing 7 Q&As → `docs/superpowers/specs/2026-05-21-faq-copy-audit.md`. Score baseline (5 categories, 1–10 each). Flag AEO weaknesses: vague questions, answers that backref ("as above"), questions that aren't real search queries.
2. `seo-aeo-keyword-research` scoped to the FAQ — pull actual question-form queries Web3/AI/SaaS founders search for. Use these as the Q seeds.
3. Edit `docs/content/homepage.md` §[FAQ] FIRST — rewrite all 7 (or adjust count up/down based on AEO research, but keep ≤8). Each A ≤50 words, self-contained, lead with the entity definition where applicable.
4. `seo-aeo-landing-page-writer` (scoped to §[FAQ]) — generate the rewritten Q&As against the locked AEO queries.
5. `seo-content-auditor` — re-score. Must beat step-1 baseline.
6. **Skip step 5 (`seo-authority-builder`)** — FAQ is informational, not trust-heavy E-E-A-T.
7. `copywriting` claim-gate. Block on unverifiable claims (especially around chain count — defer to existing wording per D6).
8. `writing-guardrails.md` vet. Em-dashes OK in visible body; strip from any `alt`/`aria-label` (none expected here).
9. **Sync homepage.md → both `faq-data.ts` AND `lib/schema.ts` `faqSchema` in the same commit.** This is the schema invariant. Sentence-start variety target: ≤1 of 7 starting with `A Web3…` or any other pattern.
10. Also update `homepage.md:558` AEO checklist to reflect final Q&A count.

### Phase 2 — A2 visual polish
1. `impeccable critique components/sections/faq.tsx` — a11y of the accordion (keyboard: Enter/Space/Arrow/Home/End; aria-expanded; focus management on expand), role/aria, tap targets ≥44×44px.
2. `impeccable layout` — match the JPEG's layout intent (two-column? full-width accordion? confirm by reading the JPEG). Cross-ref `web-design-guidelines`.
3. `impeccable polish` — only if visual sharpness needs work. ASCII variants if a placement decision is subjective.
4. `frontend-design components/sections/faq.tsx` — surgical execution. Keep `'use client'` accordion behavior; visual changes only.
5. `verification-before-completion` — `npx tsc --noEmit` exit 0 + SSR smoke (`curl -s localhost:3098 | grep -o '<expected Q1 text>'`).
6. `design-review` on the live diff. Manual QA at 1440/1280/375. Verify accordion keyboard nav.
7. `simplify` — tighten diff. Commit.

---

## Deliverables

- `docs/superpowers/specs/2026-05-21-section-faq.md` — design intent, anatomy, token map, deviations, scorecard, critique entries, GRADUATION DRAFT.
- `docs/superpowers/plans/2026-05-21-section-faq.md` — writing-plans format.
- `docs/superpowers/specs/2026-05-21-faq-copy-audit.md` — A3 audit with baseline + rewrite scores.
- Asset move: `docs/superpowers/assets/2026-05-20-faq-reference.jpeg` (from repo root).

---

## Definition of done (report back to orchestrator)

- [ ] `npx tsc --noEmit` exit 0
- [ ] SSR smoke green on `PORT=3098`
- [ ] `faq-data.ts` and `lib/schema.ts` `faqSchema` are **byte-consistent** (same Q&A count, same strings)
- [ ] `homepage.md:558` AEO checklist line updated to match final count
- [ ] impeccable critique applied + accordion a11y verified
- [ ] design-review entry committed
- [ ] simplify pass committed
- [ ] final commit SHA on `section/faq-redesign`
- [ ] one-line PR-style summary: `faq: <what changed in 1 sentence>`
- [ ] cross-file edits list (expect: `homepage.md`, `faq-data.ts`, `lib/schema.ts`, asset move)

Reply to user with:
> **FAQ merge-ready on `section/faq-redesign`@`<sha>`** — `<one-line summary>`. Cross-file edits: `<list>`. A3 audit baseline `<x>` → rewrite `<y>`.

---

## Do NOT

- Touch `DESIGN.md`, `CHANGELOG.md`, or any other section's files (Comparison, Testimonials, Hero, TRUST SIGNALS, etc.).
- Push your branch.
- Graduate.
- Let `faq-data.ts` and `faqSchema` drift apart, even for a single commit. They must move together.
- "Fix" the 7-vs-4-chains drift if it surfaces inside an FAQ answer (D6 deferred).
- Strip em-dashes from visible body copy (DESIGN.md:37 endorses them).
- Run a full `npm run build` — expected to fail at `/blog/rss.xml`. Use `npx tsc --noEmit`.
