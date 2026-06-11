// Copy + data for the /services index. Kept in a data module (no JSX) so the
// render component (services-overview.tsx), the JSON-LD/FAQPage schema in
// app/services/page.tsx, and the GEO markdown route (app/services/raw.md) all
// share one source of truth. Authoring source: docs/content/services/index.md.

// ~40-word citable AEO answer block. Entity-definition opener (`Metaborong is
// a…`) carrying the primary keyword `AI and blockchain development company`.
// Rendered as the hero <blockquote>; also the canonical short answer in the
// raw.md GEO export. Tightened with the emphatic hero (impeccable live V3,
// accepted 2026-06-08) — the prior 83-word supporting lede was dropped so the
// hero leads with the headline + this answer + a Clutch/proof strip.
export const AEO_ANSWER =
  'Metaborong is an AI and blockchain development company. We build production AI systems, on-chain protocols, and SaaS products, from architecture to deployment. Agentic AI runs in production at PredictRAM; DeFi ships audited across EVM, Solana, and Cosmos.'

export type Outcome = {
  title: string
  clarifier: string
  href: string
  kicker: string // pillar tag shown on the index router (AI / WEB3 / PRODUCT)
  accent: string // pillar accent as a --color-* token (not raw hex)
}

// Four outcome cards, selected by pure search demand (2026-06-08 brainstorm):
// the highest-intent service queries, each routing to a specific published leaf
// (better intent match than a hub). Pillars interleaved (AI · Web3 · Product · AI)
// so no two same-pillar cards sit adjacent and every pillar appears at least once
// (equal-weight floor, PRODUCT.md). Replaces the prior Token/DeFi-hub and DID
// cards, which were lower-volume; both stay reachable on their leaf + the Web3 hub.
export const OUTCOMES: Outcome[] = [
  {
    title: 'Add AI to your product',
    clarifier: 'LLMs, RAG, and copilots architected and hardened inside your existing stack.',
    href: '/services/ai/genai-apis-backend-integration/',
    kicker: 'AI',
    accent: 'var(--color-ai)',
  },
  {
    title: 'Build a smart-contract system',
    clarifier: 'Audit-ready Solidity, Vyper, and Move across EVM, Solana, and Cosmos.',
    href: '/services/web3/smart-contract-development/',
    kicker: 'WEB3',
    accent: 'var(--color-brand)',
  },
  {
    title: 'Launch a new product',
    clarifier: 'Zero-to-launch MVP and SaaS builds for founders without a CTO.',
    href: '/services/product-studio/mvp-development/',
    kicker: 'PRODUCT',
    accent: 'var(--color-accent)',
  },
  {
    title: 'Build AI agents',
    clarifier: 'Production agentic systems that plan, act, and use your tools.',
    href: '/services/ai/ai-agent-development/',
    kicker: 'AI',
    accent: 'var(--color-ai)',
  },
]

export type OverviewFaq = { q: string; a: string }

// Six services-overview FAQs. Q1–Q2 are AEO-citation targets (the "difference
// between an AI / Web3 / product studio" and "how to choose a studio" answer-
// engine queries the index owns); Q3–Q6 cover engagement start+length, location,
// IP, and pricing. Consumed by the FAQPage schema in app/services/page.tsx and
// the raw.md GEO export. Answers self-contained, verifiable, no inflation.
export const OVERVIEW_FAQS: OverviewFaq[] = [
  {
    q: 'What is the difference between an AI studio, a Web3 studio, and a product studio?',
    a: 'Most studios pick one. Metaborong runs all three with one senior team, so an AI feature, an on-chain protocol, and the product around them ship without handoffs between vendors. You hire one accountable team, not three coordinating contractors.',
  },
  {
    q: 'How do I choose a development studio for an AI or Web3 product?',
    a: 'Check for shipped work in your exact domain, senior engineers who own architecture rather than ticket-takers, and clear IP transfer. Ask who writes the code and who you talk to when it breaks. Metaborong answers: senior team, India-anchored, global delivery, code and IP yours on delivery.',
  },
  {
    q: 'How do engagements start, and how long do they take?',
    a: 'A 30-minute call to scope the problem, then a written approach you can act on or leave — no pitch deck. Most builds run four to twelve weeks, milestoned and reviewed every two weeks. Smart-contract and AI integrations often land in four to six.',
  },
  {
    q: 'Where is the team based?',
    a: 'Remote-first and globally distributed, with senior engineering anchored in India. We ship across EVM, Solana, and Cosmos for global Web3 clients and run UIDAI- and Aadhaar-integrated DID work for Indian GovTech. contact@metaborong.com reaches a founder.',
  },
  {
    q: 'Who owns the IP and the code?',
    a: 'You do, on delivery. Code, models, infrastructure, and credentials transfer to your team. We keep no claim beyond referencing anonymised case studies, and only after explicit sign-off from the engagement owner.',
  },
  {
    q: 'Do you work on retainer or fixed-bid?',
    a: 'Both. Fixed-bid for scoped deliverables — smart-contract suites, MVP builds, audit response, DID rollouts. Retainer for ongoing work — AI monitoring, protocol upgrades, post-launch engineering. We default to fixed-bid for first engagements so the brief is forced into clarity.',
  },
]
