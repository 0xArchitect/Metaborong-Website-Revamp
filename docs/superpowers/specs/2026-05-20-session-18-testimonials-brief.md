# Session 18-testimonials — Section Brief

**Worktree:** `../mb-website-testimonials`
**Branch:** `section/testimonials-redesign`
**Dev port:** `PORT=3097 pnpm dev`
**Chain:** **A2 (visual polish on the shipped Clutch-strip + 3-card layout, migrate padding chain) + A3 (Clutch content fill from official widget code the user will paste mid-session)**.
**Figma node:** *no Figma — keep the shipped Clutch-strip + 3-card layout shape; user will hand you the official Clutch widget code when you reach the A3 content step.*

---

## Inherits (read in order, don't re-derive)

1. `docs/superpowers/specs/2026-05-20-session-18-handoff.md` — §5 hard constraints (note §5.1 padding chain + §5.2 Web3-AND-AI positioning + em-dash scope), §6 references, §7 deliverable shape.
2. `DESIGN.md` (full) — note Decisions Log 2026-05-19 Why-Us row for the locked Clutch-widget pattern (always-on + `sr-only` SEO fallback + `aria-hidden` visual). Same pattern applies here.
3. `docs/superpowers/SESSIONS.md` — Context A2 (95–119) **and** Context A3 (123–170).
4. `docs/content/homepage.md` §[TESTIMONIALS] (~lines 242–288) — current copy with `USER_INPUT:` markers you'll be filling.
5. `lib/links.ts` — `clutchProfileUrl` constant for the section-level CTA.

MEMORY: `feedback-em-dash-guardrail-scope`, `positioning-web3-and-ai-equal`, `feedback-brand-color-caveats`, `feedback-no-push-after-every-change`, `feedback-visual-placement-candidates`, `feedback-coordinator-preview-and-verify` (re: dev-server first-poll timing).

---

## This section's specifics

### Current state
- **JSX:** `components/sections/testimonials.tsx` (131 lines, `'use client'` — adds drag/scroll lane via `useRef`, added in PR #33 mobile-resp pass 2026-05-20).
- **Wiring:** `app/page.tsx:74` — `<TestimonialsSection />` (BEFORE `<ComparisonSection />`).
- **H2:** `## Reviewed and verified on Clutch` (locked 2026-05-14 — keep; replaces previous "Voices of trust" agency-speak).
- **Content state:** **7 `[TODO: …]` placeholders** for rating, review count, profile URL, 3 quotes verbatim + reviewer names + deep-link URLs. Section currently CANNOT ship without these.

### Locked decisions (from DESIGN.md Decisions Log + Session 16 locks — preserve)
1. **Clutch widget is the primary trust marker** (Session 16 lock). Use the **official Clutch widget**, always-on, with `sr-only` SEO/a11y fallback text + `aria-hidden` on the visual widget. Same pattern as Why-Us.
2. **Each card whole-link to Clutch**, `target="_blank" rel="noopener"`.
3. **Per-quote deep-link** rendered as `Read on Clutch →`.
4. **Section-level CTA below the grid:** `View all reviews on Clutch →` linking to `clutchProfileUrl`.
5. **Web3 AND AI equally** — when describing what was delivered, do NOT frame as Web3-only or AI-only (memory `positioning-web3-and-ai-equal`).

### Pre-resolved decisions from D1–D8

- **D3 — no Figma:** Keep the shipped Clutch-strip + 3-card layout. A2 polish only — no full redesign. Surface area: padding chain migration + a11y/focus pass + drag-scroll lane review.
- **D4 — Clutch content arrives mid-session:** when you reach A3 step 2 (homepage.md edit), `AskUserQuestion` the user with: *"Ready for the Clutch content. Please paste: (1) the official Clutch widget embed code from Clutch's site, (2) aggregate rating, (3) verified review count, (4) top 3 review quotes verbatim, (5) reviewer name + company + deep-link URL per quote."* Block here until the user provides it. Do NOT fabricate placeholder content.
- **D6 — 7-vs-4-chains drift stays DEFERRED:** if a Clutch quote happens to mention chains, leave the quote verbatim. Do NOT edit reviewer-supplied content.

### Drift to fix in passing (inside this section only)
- **Padding chain migration (handoff §2.3):** the `<section>` element in `testimonials.tsx` currently hand-rolls the OLD four-step padding chain `sm:px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px]` instead of consuming `<Section>` or the new PR #33 six-step chain `px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]`. **Migrate to `<Section bg="subtle" maxWidth="xwide">`** during the A2 pass. This preserves the section alternation pattern (Testimonials = subtle, Comparison = default, FAQ = subtle/default — confirm by reading the in-flight Comparison worker brief if needed).
- **`'use client'` drag-scroll lane:** the lane was added 2026-05-20 in PR #33 to make the 3-card grid scrollable on narrow viewports. Preserve this behavior — don't remove `'use client'` or the `useRef` lane during A2. `impeccable critique` step will confirm scrollable lane has proper `tabIndex`, keyboard nav (arrow keys or shift+wheel), and a `prefers-reduced-motion` short-circuit.

### Hard blocker
- **A3 step 2 blocks on user Clutch input.** Do not proceed past the homepage.md edit step without verbatim quotes + reviewer names + deep-link URLs + the widget embed code from the user.

---

## Chain to run (A2 visual prep FIRST, A3 layered with content-fill gate)

### Phase 1 — A2 visual prep (no user input needed; pre-work the padding-chain + Clutch-widget integration)
1. `impeccable critique components/sections/testimonials.tsx` — a11y of the drag-scroll lane, focus management, role/aria, card-as-link semantics (avoid nested interactive elements — quote deep-link inside whole-card link is a nesting bug), tap targets, `prefers-reduced-motion` for any motion.
2. `impeccable layout` — verify rhythm + spacing match the rest of the page (Why-Us, Founders neighbors). Section alternation: `bg="subtle"`.
3. Migrate `<section>` → `<Section bg="subtle" maxWidth="xwide">`. Drop the hand-rolled px chain.
4. Integrate the **Clutch widget shell** (`aria-hidden` visual + `sr-only` SEO text scaffold) — the widget embed code itself is pasted in Phase 2 from the user. Pre-build the structure so it's drop-in ready.

### Phase 2 — A3 content fill (BLOCKED on user input)
1. `seo-content-auditor` audit pass on the existing `[TODO:]`-laden copy → `docs/superpowers/specs/2026-05-21-testimonials-copy-audit.md`. Baseline score will be low because of placeholders; that's expected.
2. **AskUserQuestion gate** — request the Clutch widget code + rating + review count + 3 verbatim quotes + reviewer names + deep-link URLs. Block until provided.
3. Edit `docs/content/homepage.md` §[TESTIMONIALS] FIRST — replace every `USER_INPUT:` / `[TODO:]` with the verbatim content from the user. Add per-quote deep-link URLs.
4. `seo-aeo-landing-page-writer` (scoped) — generate the section's connective tissue (intro/lede, section-CTA microcopy) around the locked quotes. Do NOT paraphrase quotes — verbatim only.
5. `seo-content-auditor` — re-score. Must beat baseline.
6. `seo-authority-builder` — **DO RUN this one** (testimonials are E-E-A-T-trust-heavy per A3 gating rules; same justification as Founders).
7. `copywriting` claim-gate.
8. `writing-guardrails.md` vet on connective tissue ONLY; do NOT vet user-supplied quotes (they're external content, not Metaborong voice).
9. Sync `homepage.md` → `components/sections/testimonials.tsx` — quote strings, reviewer names, URLs, rating, review count.

### Phase 3 — Final A2 polish + verification
1. `impeccable polish` if a visual placement decision is subjective (ASCII candidate pattern).
2. `frontend-design components/sections/testimonials.tsx` — surgical execution.
3. `verification-before-completion` — `npx tsc --noEmit` exit 0 + SSR smoke (`curl -s localhost:3097 | grep -o '<one of the reviewer names>'`). Per memory `feedback-coordinator-preview-and-verify`: give the dev server enough time to compile + scroll lazy images in before declaring assets broken.
4. `design-review` live QA at 1440/1280/375. Verify drag-scroll lane, Clutch widget renders, deep-links open in new tab, focus ring on every card.
5. `simplify`. Commit.

---

## Deliverables

- `docs/superpowers/specs/2026-05-21-section-testimonials.md` — design intent, anatomy, token map, deviations, scorecard, critique entries, GRADUATION DRAFT.
- `docs/superpowers/plans/2026-05-21-section-testimonials.md` — writing-plans format.
- `docs/superpowers/specs/2026-05-21-testimonials-copy-audit.md` — A3 audit with baseline + rewrite scores.

---

## Definition of done (report back to orchestrator)

- [ ] `npx tsc --noEmit` exit 0
- [ ] SSR smoke green on `PORT=3097` (one of the verbatim reviewer names found in server HTML)
- [ ] Clutch widget renders client-side; `sr-only` SEO fallback verified in server HTML; `aria-hidden` on visual widget
- [ ] Every `[TODO:]` / `USER_INPUT:` marker resolved with user-supplied content
- [ ] Padding chain migrated to `<Section bg="subtle" maxWidth="xwide">`
- [ ] Drag-scroll lane behavior preserved (and a11y'd)
- [ ] impeccable critique applied
- [ ] design-review entry committed
- [ ] simplify pass committed
- [ ] final commit SHA on `section/testimonials-redesign`
- [ ] one-line PR-style summary: `testimonials: <what changed in 1 sentence>`
- [ ] cross-file edits list (expect: `homepage.md`; possibly `lib/links.ts` if a new constant is added)

Reply to user with:
> **Testimonials merge-ready on `section/testimonials-redesign`@`<sha>`** — `<one-line summary>`. Cross-file edits: `<list>`. A3 audit baseline `<x>` → rewrite `<y>`.

---

## Do NOT

- Touch `DESIGN.md`, `CHANGELOG.md`, or other sections' files (Comparison, FAQ, Hero, Why-Us, Founders, ContactCta, Footer, schema).
- Push your branch.
- Graduate.
- Fabricate Clutch quotes, reviewer names, ratings, or review counts. Block on user input.
- Paraphrase user-supplied quotes — verbatim only.
- Remove `'use client'` or the drag-scroll lane (added 2026-05-20 in PR #33).
- Strip em-dashes from visible body copy. Em-dashes are endorsed (DESIGN.md:37). Em-dash strip is `alt`/`aria-label`-scoped only.
- Frame the section as Web3-only or AI-only — both pillars carry equal weight (memory `positioning-web3-and-ai-equal`).
- Run a full `npm run build` — expected to fail at `/blog/rss.xml`. Use `npx tsc --noEmit`.
