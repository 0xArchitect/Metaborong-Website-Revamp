# /services Index Content
**URL:** `/services`
**Last updated:** 2026-06-08
**Status:** Restructure draft (A3 copy chain). 7→6 sections (EngagementStrip dropped). New hero AEO
block + rebalanced outcome strip (AI-first) + 6 FAQs (2 AEO-targeted). Pending: re-audit, copywriting
gate, guardrails vet, JSX sync, impeccable live on card rows, JSON-LD + raw.md (workstream C).

---

## SEO Meta Tags

**Primary keyword:** `AI and blockchain development company` (multi-pillar studio category)
**Secondary:** Web3 and AI development agency · blockchain and AI development services ·
boutique software development studio · engineering studio for startups
**Cannibalization guard:** the three pillar hubs own the single-pillar head terms; this page owns
the combined multi-pillar intent only.

**Title (candidate, finalize in meta step):**
```
AI & Blockchain Development Company | Metaborong
```
**Meta description (candidate, ~150 chars):**
```
Metaborong is an AI and blockchain development company building production AI systems, on-chain protocols, and SaaS products for founders. One senior team.
```

**Schema to implement (workstream C):** BreadcrumbList · Service + OfferCatalog (3 pillars) · FAQPage.

---

## 1. Hero (emphatic redesign — impeccable live, accepted 2026-06-08)

Typography-led, no right-side image. The 83-word supporting lede was dropped; the copy block stays
readable at `max-w-[1000px]` while a **full-width spec manifest** fills the hero width below it. Clutch
moved here from the old TrustBand.

**Eyebrow:** Services

**H1:** AI, Web3, and product, one senior team.

**AEO answer block (~40w — citable, entity-definition; canonical `AEO_ANSWER`, also in raw.md):**
> Metaborong is an AI and blockchain development company. We build production AI systems, on-chain
> protocols, and SaaS products, from architecture to deployment. Agentic AI runs in production at
> PredictRAM; DeFi ships audited across EVM, Solana, and Cosmos.

**CTAs:** `Talk to us` (mailto) · `Read case studies` (/#work)

**Spec manifest (full-width `<dl>`, 4 capability cells — not vanity metrics):**
`Pillars` = AI · Web3 · Product Studio · `Chains` = EVM · Solana · Cosmos ·
`Team` = Senior engineers, India + global · `Proof` = PredictRAM · SunsetML · GovTech DID.

**Below the manifest:** live Clutch widget (`widgetType="2"`, no hardcoded number) + mono line
`Shipped, not promised · audited across EVM, Solana, and Cosmos`.

---

## 2. Outcome strip

**Eyebrow:** By outcome
**H2:** Pick by problem, not capability
**Sub:** Each outcome routes to the closest live service or pillar hub.

**Cards (selected by pure search demand, 2026-06-08 brainstorm; pillars interleaved AI·Web3·Product·AI, every pillar present):**
1. **Add AI to your product** — LLMs, RAG, and copilots architected and hardened inside your existing stack.
   → `/services/ai/genai-apis-backend-integration/`
2. **Build a smart-contract system** — Audit-ready Solidity, Vyper, and Move across EVM, Solana, and Cosmos.
   → `/services/web3/smart-contract-development/`
3. **Launch a new product** — Zero-to-launch MVP and SaaS builds for founders without a CTO.
   → `/services/product-studio/mvp-development/`
4. **Build AI agents** — Production agentic systems that plan, act, and use your tools.
   → `/services/ai/ai-agent-development/`

*Demand-led swap: dropped the prior Token/DeFi-hub and verified-identity/DID cards (lower volume) for the
higher-demand smart-contract and AI-agent leaves. DID + DeFi remain reachable on their leaf pages + the Web3 hub.*

---

## 3. Pillar grid

**Eyebrow:** Three pillars
**H2:** AI, Web3, and Product Studio
**Intro (one team / no-handoffs differentiator — answers the AEO "difference" question):**
Three pillars, one senior team. Each groups its services into clear tracks, so a build can span AI,
on-chain, and product without handoffs.

*(Pillar headlines + bodies + leaf lists come from `services-data.ts` — not rewritten here.)*

---

## 4. Trust band
Unchanged: client logo marquee + live Clutch iframe (no hardcoded rating).

---

## 5. FAQ (6 entries; wired to FAQPage schema in workstream C)

**Q1. What's the difference between an AI studio, a Web3 studio, and a product studio?**
Most studios pick one. Metaborong runs all three with one senior team, so an AI feature, an on-chain
protocol, and the product around them ship without handoffs between vendors. You hire one accountable
team, not three coordinating contractors.

**Q2. How do I choose a development studio for an AI or Web3 product?**
Check for shipped work in your exact domain, senior engineers who own architecture rather than
ticket-takers, and clear IP transfer. Ask who writes the code and who you talk to when it breaks.
Metaborong answers: senior team, India-anchored, global delivery, code and IP yours on delivery.

**Q3. How do engagements start, and how long do they take?**
A 30-minute call to scope the problem, then a written approach you can act on or leave — no pitch
deck. Most builds run four to twelve weeks, milestoned and reviewed every two weeks. Smart-contract
and AI integrations often land in four to six.

**Q4. Where is the team based?**
Remote-first and globally distributed, with senior engineering anchored in India. We ship across EVM,
Solana, and Cosmos for global Web3 clients and run UIDAI- and Aadhaar-integrated DID work for Indian
GovTech. contact@metaborong.com reaches a founder.

**Q5. Who owns the IP and the code?**
You do, on delivery. Code, models, infrastructure, and credentials transfer to your team. We keep no
claim beyond referencing anonymised case studies, and only after explicit sign-off from the
engagement owner.

**Q6. Do you work on retainer or fixed-bid?**
Both. Fixed-bid for scoped deliverables — smart-contract suites, MVP builds, audit response, DID
rollouts. Retainer for ongoing work — AI monitoring, protocol upgrades, post-launch engineering. We
default to fixed-bid for first engagements so the brief is forced into clarity.

---

## 6. Contact CTA
Unchanged: `contact-cta.tsx` (Tell us what you are building + email + response-time promise).
