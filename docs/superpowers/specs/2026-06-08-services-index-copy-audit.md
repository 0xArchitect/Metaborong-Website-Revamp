# /services index — copy audit + keyword lock (baseline before rewrite)

Date: 2026-06-08 · Scope: top-level `/services` index (`components/services/services-overview.tsx`).
Companion plan: `~/.claude/plans/smooth-enchanting-papert.md`.

## Keyword lock

**Cannibalization guardrail.** The three pillar hubs own the single-pillar head terms
(`/services/ai` = "AI development services", `/services/web3` = "Web3 development",
`/services/product-studio` = "product development"). The index must NOT compete on those.
It owns the **multi-pillar / studio-category** intent.

- **Primary head:** `AI and blockchain development company`
- **Secondary (T1–T2):** Web3 and AI development agency · blockchain and AI development services ·
  boutique software development studio · engineering studio for startups ·
  AI, Web3 and product development company
- **AEO questions this page owns:**
  1. What does Metaborong do? → entity-definition sentence (becomes the hero AEO block) + 3-pillar list
  2. Is there a development studio that builds both AI and Web3 products? → direct yes + definition
  3. What services does Metaborong offer? → named 3-pillar list (maps to OfferCatalog schema)
  4. How do I choose a development studio for an AI or Web3 product? → criteria list (FAQ)
  5. What's the difference between an AI studio, a Web3 studio, and a product studio? → "one team for all three" (FAQ)

## Baseline scorecard (current copy)

| Category | Score | Issues |
|---|---|---|
| AEO / answer-engine | 3/10 | No 40–60w answer block; definition buried in a 165w lede; zero JSON-LD; FAQs visible-only |
| SEO on-page | 4/10 | H1 "What we build" keyword-blind; primary term absent; title leads with weak "Services \|" |
| E-E-A-T | 7/10 | Strong proof (PredictRAM, SunsetML, GovTech/UIDAI, chains) but unscannable + no schema binding |
| Readability / structure | 5/10 | Hero is one 165w block; two self-describing sentences waste words |
| Keyword optimization | 3/10 | Head terms appear nowhere; "engineering studio" once |
| **Composite** | **4.4/10** | Rewrite target: ≥ 8/10 |

## Severity-ranked fixes
- **P0** Add 40–60w entity-definition AEO block after H1 (answers Q1; primary citation lever).
- **P0** Emit BreadcrumbList + Service/OfferCatalog + FAQPage JSON-LD (workstream C).
- **P1** Carry the head term in the AEO block + a pillar/H2 intro; reconsider H1 to include entity terms.
- **P1** Trim the hero lede to ~90–110w supporting role; cut the two self-referential sentences.
- **P2** Reorder title toward the category term (meta-description-generator step, post-copy-lock).
- **P2** Drop the EngagementStrip (removes the third "one senior team owns…" repeat).

## Re-score (rewrite draft, `docs/content/services/index.md`)

| Category | Baseline | Rewrite |
|---|---|---|
| AEO / answer-engine | 3 | 9 (48w citable block + 6 FAQs, 2 AEO-targeted; schema in workstream C) |
| SEO on-page | 4 | 8 (head term in AEO block + H1 entity terms + title/meta) |
| E-E-A-T | 7 | 9 (proof scannable + choose/difference FAQs; schema binding planned) |
| Readability / structure | 5 | 9 (short answer + 83w lede; self-ref sentences cut) |
| Keyword optimization | 3 | 8 (primary + secondary placed naturally) |
| **Composite** | **4.4** | **8.6** ✓ beats ≥8 target |

**Gates:** writing-guardrails — PASS (no banned words, no -ing significance tails, contrast
constructions earned/spread). copywriting claim-gate — PASS (all proof traces to the locked library;
no fabrication; Clutch stays a live iframe). seo-authority-builder — choose/difference FAQs + scannable
shipped proof add the E-E-A-T this trust-bearing page needs.
