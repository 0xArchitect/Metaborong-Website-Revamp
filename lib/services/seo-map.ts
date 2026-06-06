// SEO metadata for v1 service leaf pages.
//
// One entry per published leaf. Coming-soon leaves are NOT in this map | their
// route renders a noindex stub with a generic title (see
// SERVICES_PLAN.md § 4 and § Risk 3).
//
// Each entry pins three SEO surfaces:
//   - keyword:     the canonical long-tail query the leaf is engineered to
//                  answer. Matches the slug; H1 echoes it verbatim.
//   - title:       <title> tag. ≤60 chars where possible; truncated by Google
//                  at ~60 chars desktop / ~78 mobile. Always ends with
//                  ` | Metaborong` for brand consistency.
//   - description: <meta name="description">. 130–160 chars, verb-first,
//                  includes one concrete deliverable. No marketing inflation
//                  (`revolutionary`, `cutting-edge`, etc. are banned per
//                  DESIGN.md § Writing Tone).
//
// Pillar IDs and sub-group IDs are imported from the data layer
// (services-data.ts) | single source of truth after the v2 refactor.

import type { PillarId, SubGroupId } from '@/components/sections/services-data'

export type { PillarId, SubGroupId }

export type LeafSeoEntry = {
  pillar: PillarId
  subGroup: SubGroupId
  slug: string
  keyword: string
  title: string
  description: string
}

export const v1LeafSeo: readonly LeafSeoEntry[] = [
  // ── AI ──────────────────────────────────────────────────────────────────────
  {
    pillar: 'ai',
    subGroup: 'consulting',
    slug: 'ai-consulting',
    keyword: 'ai consulting services',
    title: 'AI Consulting & Strategy Services',
    description:
      'Map AI use cases, test feasibility, and ship a sequenced adoption roadmap scoped to impact and operating cost. Senior AI team, India + global.',
  },
  {
    pillar: 'ai',
    subGroup: 'generative-ai',
    slug: 'ai-copilots-internal-tools',
    keyword: 'ai copilots and internal tools development',
    title: 'AI Copilots & Internal Tools Development',
    description:
      'Custom AI copilots and internal tools for support, sales, and ops teams. Grounded in your data, wired into your stack, shipped in weeks not quarters.',
  },
  {
    pillar: 'ai',
    subGroup: 'generative-ai',
    slug: 'conversational-ai-voice-agents',
    keyword: 'conversational ai and voice agent development',
    title: 'Conversational AI & Voice Agents',
    description:
      'Build chat and voice agents that handle real workflows: support, scheduling, qualification. Production LLM, retrieval, and telephony infrastructure.',
  },
  {
    pillar: 'ai',
    subGroup: 'ai-agents',
    slug: 'ai-agent-development',
    keyword: 'custom ai agent development',
    title: 'Custom AI Agent Development',
    description:
      'Build custom autonomous and multi-agent systems that plan, use tools, and report results. Production orchestration, evals, and guardrails included.',
  },
  {
    pillar: 'ai',
    subGroup: 'ai-engineering',
    slug: 'rag-retrieval-pipelines',
    keyword: 'rag pipeline development',
    title: 'RAG & Retrieval Pipeline Development',
    description:
      'Retrieval pipelines that ground LLMs in your proprietary data. Embeddings, vector stores, reranking, and evaluations | production-tuned, not demoware.',
  },
  {
    pillar: 'ai',
    subGroup: 'ai-engineering',
    slug: 'genai-apis-backend-integration',
    keyword: 'genai api and backend integration',
    title: 'GenAI APIs & Backend Integration',
    description:
      'Architect and harden LLMs inside your stack: model routing, auth, fallback, cost controls, and observability. GenAI APIs wired into your backend.',
  },
  {
    pillar: 'ai',
    subGroup: 'generative-ai',
    slug: 'generative-ai-development',
    keyword: 'generative ai development services',
    title: 'Generative AI Development Services',
    description:
      'Build generative AI features into your product: content generation, enrichment, and drafting with output validation, evaluation, and cost controls.',
  },
  {
    pillar: 'ai',
    subGroup: 'business-automation',
    slug: 'ai-knowledge-base',
    keyword: 'ai knowledge base',
    title: 'AI Knowledge Base Development',
    description:
      'Build an AI knowledge base answering from your docs, wikis, and tickets with cited, access-controlled responses and a compounding LLM knowledge library.',
  },
  {
    pillar: 'ai',
    subGroup: 'business-automation',
    slug: 'ai-business-process-automation',
    keyword: 'ai business process automation',
    title: 'AI Business Process Automation',
    description:
      'Automate document, email, and reporting workflows with language models, integrated into your CRM and ERP, with human checkpoints and an audit trail.',
  },
  {
    pillar: 'ai',
    subGroup: 'generative-ai',
    slug: 'ai-video-generation',
    keyword: 'ai video generation',
    title: 'AI Video Generation Pipelines',
    description:
      'Engineer AI video generation pipelines into your product: model orchestration, templating, brand and policy checks, render queuing, and cost controls.',
  },
  {
    pillar: 'ai',
    subGroup: 'consulting',
    slug: 'ai-adoption-roadmap',
    keyword: 'ai adoption roadmap',
    title: 'AI Adoption Roadmap',
    description:
      'Turn scored AI opportunities into a sequenced adoption plan with phases, owners, budgets, team enablement, and governance. Founder-led, India + global.',
  },
  {
    pillar: 'ai',
    subGroup: 'ai-engineering',
    slug: 'ai-evaluation-monitoring',
    keyword: 'llm evaluation and monitoring',
    title: 'AI Evaluation & Monitoring',
    description:
      'Catch LLM quality regressions before deploy and monitor production for drift, failures, latency, and cost. Labelled eval harness wired into your CI.',
  },

  // ── Web3 ────────────────────────────────────────────────────────────────────
  {
    pillar: 'web3',
    subGroup: 'engineering',
    slug: 'smart-contract-development',
    keyword: 'smart contract development services',
    title: 'Smart Contract Development Services',
    description:
      'Solidity, Vyper, and Move smart contracts engineered for third-party audit. Specs, tests, deployment, and post-deploy monitoring all included.',
  },
  {
    pillar: 'web3',
    subGroup: 'engineering',
    slug: 'defi-protocol-development',
    keyword: 'defi protocol development services',
    title: 'DeFi Protocol Development | Lending, AMM',
    description:
      'DeFi protocol development services for lending, AMM, perp, and yield-vault mechanisms. Audited contracts, keepers, and oracles across EVM, Solana, and Cosmos.',
  },
  {
    pillar: 'web3',
    subGroup: 'strategy',
    slug: 'tokenomics-design',
    keyword: 'tokenomics design',
    title: 'Tokenomics Design & Simulation Services',
    description:
      'Tokenomics design: agent-based simulation, supply, vesting, emissions, and governance modelling, stress-tested before launch. Hacken-audited team.',
  },
  {
    pillar: 'web3',
    subGroup: 'product',
    slug: 'token-launchpad-development',
    keyword: 'token launchpad development',
    title: 'Token Launchpad & Bonding Curve Development',
    description:
      'Token sale and distribution platforms built end-to-end: fair launch, vesting, bonding curves, allowlists, and anti-bot controls. Audit-ready, Hacken-audited team.',
  },
  {
    pillar: 'web3',
    subGroup: 'product',
    slug: 'nft-marketplace-development',
    keyword: 'nft marketplace development',
    title: 'NFT Marketplace Development',
    description:
      'Custom NFT marketplaces engineered for audit: royalty enforcement, lazy minting, curated drops, secondary trading, and an indexer. Multi-chain across EVM.',
  },
  {
    pillar: 'web3',
    subGroup: 'engineering',
    slug: 'liquid-staking-vaults',
    keyword: 'liquid staking and vault development',
    title: 'Liquid Staking & Vault Development',
    description:
      'Liquid staking and vault development: LST/LRT receipt tokens, validator routing, restaking, and slashing-aware risk controls. nsASTR (~$20M TVL) team.',
  },
  {
    // Decentralized identity + ZKP is the headline capability (global). Aadhaar
    // DID is one live-project angle (Sedax), not the leaf's primary frame | see
    // SERVICES_PLAN.md § Risk 7. AEO answer still references the Aadhaar-scale
    // deployment as one of its two verifiable facts.
    pillar: 'web3',
    subGroup: 'engineering',
    slug: 'decentralized-identity-did-integration',
    keyword: 'decentralized identity and zkp development',
    title: 'Decentralized Identity & ZKP Development',
    description:
      'Decentralized identity and ZKP development: W3C verifiable credentials, DID resolvers, and zero-knowledge selective disclosure. Live Aadhaar eKYC project.',
  },
  {
    pillar: 'web3',
    subGroup: 'strategy',
    slug: 'blockchain-consulting',
    keyword: 'blockchain consulting services',
    title: 'Blockchain Consulting Services',
    description:
      'Blockchain consulting: chain selection, protocol architecture, and technical due diligence for teams building on-chain. Senior engineers, India and global.',
  },
  {
    pillar: 'web3',
    subGroup: 'strategy',
    slug: 'enterprise-private-blockchain',
    keyword: 'enterprise blockchain development',
    title: 'Enterprise & Private Blockchain',
    description:
      'Enterprise and private blockchain development: permissioned networks built on the audited contract engineering we ship to public chains. India and global.',
  },
  {
    pillar: 'web3',
    subGroup: 'strategy',
    slug: 'rwa-tokenization',
    keyword: 'rwa tokenization development',
    title: 'RWA Tokenization Development',
    description:
      'RWA tokenization: issue real-world assets on-chain with compliance-aware token design and ownership records. Built for the live Assetize platform.',
  },
  {
    pillar: 'web3',
    subGroup: 'product',
    slug: 'crypto-wallet-development',
    keyword: 'crypto wallet development',
    title: 'Crypto Wallet Development',
    description:
      'Crypto wallet development: account-abstraction and smart-account wallets with gasless transactions and social recovery. ERC-4337, live on Nero Chain.',
  },
  {
    pillar: 'web3',
    subGroup: 'engineering',
    slug: 'cross-chain-bridge-development',
    keyword: 'cross-chain bridge development',
    title: 'Cross-Chain Bridge Development',
    description:
      'Cross-chain bridge development and interoperability: secure asset and message transfer between chains. We built a live NEAR-to-Solana bridge.',
  },
  {
    pillar: 'web3',
    subGroup: 'engineering',
    slug: 'blockchain-indexers-subgraphs',
    keyword: 'subgraph and blockchain indexer development',
    title: 'Blockchain Indexers & Subgraphs',
    description:
      'Subgraph and blockchain indexer development: turn on-chain events into fast, queryable application data. Built the indexing layer for Assetize.',
  },

  // ── Product Studio ──────────────────────────────────────────────────────────
  {
    pillar: 'product-studio',
    subGroup: 'strategy',
    slug: 'product-discovery-validation',
    keyword: 'product discovery and validation services',
    title: 'Product Discovery & Validation',
    description:
      'Tight-loop discovery sprints for founders: problem framing, hypothesis tests, technical feasibility, and a shipped clickable prototype in weeks.',
  },
  {
    pillar: 'product-studio',
    subGroup: 'product',
    slug: 'mvp-development',
    keyword: 'mvp development services',
    title: 'MVP Development Services | Founder-Led Builds',
    description:
      'Zero-to-launch product builds for founders without an in-house CTO. Architecture, engineering, design, and deployment from one senior team.',
  },
  {
    pillar: 'product-studio',
    subGroup: 'product',
    slug: 'saas-product-development',
    keyword: 'saas product development services',
    title: 'SaaS Product Development Services',
    description:
      'End-to-end SaaS builds with multi-tenancy, billing, and observability baked in. Senior team owns architecture through deployment, no vendor fragmentation.',
  },
  {
    pillar: 'product-studio',
    subGroup: 'product',
    slug: 'b2b-multi-tenant-platforms',
    keyword: 'b2b multi-tenant platform development',
    title: 'B2B Multi-Tenant Platform Development',
    description:
      'Multi-tenant B2B platforms with SSO, role-based access, audit trails, and admin tooling | built for enterprise procurement from day one.',
  },
] as const

// Pre-built key for O(1) lookup by `${pillar}/${slug}` (the canonical
// pillar-leaf composite identifier used in route params and BreadcrumbList).
const byCompositeKey = new Map<string, LeafSeoEntry>(
  v1LeafSeo.map((e) => [`${e.pillar}/${e.slug}`, e]),
)

/**
 * Look up SEO meta for a v1 leaf. Returns `undefined` for coming-soon
 * leaves, unknown pillars, and unknown slugs | callers must handle the
 * undefined case (typically by emitting a noindex stub).
 *
 * Used by `app/services/[pillar]/[slug]/page.tsx` inside `generateMetadata`.
 */
export function getLeafSeo(pillar: string, slug: string): LeafSeoEntry | undefined {
  return byCompositeKey.get(`${pillar}/${slug}`)
}

/**
 * Iterate every v1 entry filtered to a single pillar | useful for the
 * pillar-hub page's related-services rail and for schema OfferCatalog
 * generation.
 */
export function getV1LeavesForPillar(pillar: PillarId): readonly LeafSeoEntry[] {
  return v1LeafSeo.filter((e) => e.pillar === pillar)
}
