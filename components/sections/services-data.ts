export type PillarId = 'ai' | 'web3' | 'product-studio'

export type SubGroupId =
  // web3 + product-studio (delivery-mode spine)
  | 'strategy'
  | 'product'
  | 'engineering'
  // ai (buyer-outcome spine)
  | 'consulting'
  | 'generative-ai'
  | 'ai-agents'
  | 'business-automation'
  | 'ai-engineering'

export type LeafStatus = 'published' | 'coming-soon'

export type ChildService = {
  name: string
  description: string
  slug: string
  status: LeafStatus
  // Curated surfacing rank (1-based display order) for the nav mega-menu and
  // homepage services section. Decouples the featured sets from taxonomy order
  // + the old slice(0,5) cap. Optional: leaves without a rank fall back behind
  // ranked ones (in taxonomy order) via getFeaturedLeaves(). See the Web3 spec
  // (docs/superpowers/specs/2026-06-02-web3-services-taxonomy-design.md).
  featuredNav?: number
  featuredHome?: number
}

export type SubGroup = {
  id: SubGroupId
  label: string
  children: ChildService[]
}

export type Pillar = {
  id: PillarId
  num: string
  label: string
  color: string
  headline: string
  body: string
  hubHref: string
  hubCta: string
  subGroups: SubGroup[]
}

// Data array order preserved from the prior taxonomy so existing rendering
// (homepage accordion numbering [01/02/03], nav mega-menu column order)
// stays visually identical through the refactor.
export const pillars: Pillar[] = [
  {
    id: 'web3',
    num: '01',
    label: 'Web3',
    color: '#296ff0',
    headline: 'Decentralised protocol engineering',
    body: 'Smart contracts, DeFi protocols, NFT marketplaces, tokenomics, and DID integration. Multichain across EVM, Solana, and Cosmos.',
    hubHref: '/services/web3/',
    hubCta: 'Web3 services',
    subGroups: [
      {
        id: 'strategy',
        label: 'Strategy',
        children: [
          {
            name: 'Tokenomics Design',
            description: 'Token supply, distribution, emissions, and governance modelling stress-tested against on-chain behaviour.',
            slug: 'tokenomics-design',
            status: 'published',
            featuredNav: 5,
          },
          {
            name: 'Blockchain Consulting',
            description: 'Chain selection, protocol architecture, and technical due diligence for teams building on-chain.',
            slug: 'blockchain-consulting',
            status: 'published',
          },
        ],
      },
      {
        id: 'product',
        label: 'Product',
        children: [
          {
            name: 'NFT Marketplace Development',
            description: 'Custom marketplaces with royalties, lazy-mint, curated drops, and multi-chain support.',
            slug: 'nft-marketplace-development',
            status: 'published',
            featuredNav: 3,
          },
          {
            name: 'Token Launchpad Development',
            description: 'Token sale and distribution platforms: fair launch, vesting, bonding curves, and allowlists, engineered for audit.',
            slug: 'token-launchpad-development',
            status: 'published',
          },
          {
            name: 'Crypto Wallet Development',
            description: 'Account-abstraction and smart-account wallets with gasless flows and social recovery.',
            slug: 'crypto-wallet-development',
            status: 'published',
          },
          {
            name: 'RWA Tokenization',
            description: 'Real-world asset tokenization: on-chain issuance, ownership records, and compliance-aware token design.',
            slug: 'rwa-tokenization',
            status: 'published',
          },
        ],
      },
      {
        id: 'engineering',
        label: 'Engineering',
        children: [
          {
            name: 'Smart Contract Development',
            description: 'Solidity, Vyper, and Move contracts engineered for third-party audit, with tests and monitoring.',
            slug: 'smart-contract-development',
            status: 'published',
            featuredNav: 1,
          },
          {
            name: 'DeFi Protocol Development',
            description: 'Lending, perpetuals, yield, and vault infrastructure spec\'d for third-party audit.',
            slug: 'defi-protocol-development',
            status: 'published',
            featuredNav: 2,
          },
          {
            name: 'Liquid Staking & Restaking Vaults',
            description: 'LST and LRT vault systems with restaking, validator routing, and risk controls.',
            slug: 'liquid-staking-vaults',
            status: 'published',
            featuredNav: 4,
          },
          {
            name: 'Decentralized Identity & ZKP',
            description: 'Verifiable credentials, DID resolvers, and zero-knowledge selective disclosure. Live Aadhaar eKYC integration, portable across identity systems.',
            slug: 'decentralized-identity-did-integration',
            status: 'published',
            featuredHome: 5,
          },
          {
            name: 'Cross-Chain Bridges & Interoperability',
            description: 'Bridges and cross-chain messaging engineered for safe asset and data transfer between chains.',
            slug: 'cross-chain-bridge-development',
            status: 'published',
          },
          {
            name: 'Blockchain Indexers & Subgraphs',
            description: 'Subgraphs and custom indexers that turn on-chain events into fast, queryable application data.',
            slug: 'blockchain-indexers-subgraphs',
            status: 'published',
          },
          {
            name: 'Enterprise & Private Blockchain',
            description: 'Permissioned and private-chain deployments built on the audited contract engineering we ship to public chains.',
            slug: 'enterprise-private-blockchain',
            status: 'published',
          },
        ],
      },
    ],
  },
  {
    id: 'ai',
    num: '02',
    label: 'AI',
    color: '#0F766E',
    headline: 'Production AI capability',
    body: 'AI agents, copilots, generative AI, knowledge bases, and business-process automation. We add production AI capability to existing products and teams.',
    hubHref: '/services/ai/',
    hubCta: 'AI services',
    subGroups: [
      {
        id: 'consulting',
        label: 'AI Consulting',
        children: [
          {
            name: 'AI Consulting & Strategy',
            description: 'Use-case mapping, feasibility, and a sequenced adoption plan scoped to impact and operating cost.',
            slug: 'ai-consulting',
            status: 'published',
            featuredNav: 5,
          },
          {
            name: 'AI Adoption Roadmap',
            description: 'A phased plan from audit findings to deployment, with team enablement and governance built in.',
            slug: 'ai-adoption-roadmap',
            status: 'published',
            featuredNav: 10,
          },
        ],
      },
      {
        id: 'generative-ai',
        label: 'Generative AI Solutions',
        children: [
          {
            name: 'Generative AI Development',
            description: 'GenAI built into your product: content generation, enrichment, and backend integration.',
            slug: 'generative-ai-development',
            status: 'published',
            featuredNav: 7,
          },
          {
            name: 'AI Copilots & Internal Tools',
            description: 'Custom copilots for support, sales, and ops teams, grounded in your data and wired into your stack.',
            slug: 'ai-copilots-internal-tools',
            status: 'published',
            featuredNav: 2,
            featuredHome: 2,
          },
          {
            name: 'Conversational AI & Voice Agents',
            description: 'Chat and voice agents that handle real workflows: discovery, support, and scheduling.',
            slug: 'conversational-ai-voice-agents',
            status: 'published',
            featuredNav: 3,
            featuredHome: 3,
          },
          {
            name: 'AI Video Generation',
            description: 'Generative video pipelines engineered into products: scripted, templated, and API-driven.',
            slug: 'ai-video-generation',
            status: 'published',
            featuredNav: 12,
          },
        ],
      },
      {
        id: 'ai-agents',
        label: 'Custom AI Agents',
        children: [
          {
            name: 'AI Agent Development',
            description: 'Custom autonomous and multi-agent systems that plan, use tools, and report, with evals and guardrails.',
            slug: 'ai-agent-development',
            status: 'published',
            featuredNav: 1,
            featuredHome: 1,
          },
        ],
      },
      {
        id: 'business-automation',
        label: 'AI for Business Automation',
        children: [
          {
            name: 'AI Business Process Automation',
            description: 'Automate document, email, and reporting workflows, with CRM, ERP, and third-party integration.',
            slug: 'ai-business-process-automation',
            status: 'published',
            featuredNav: 9,
          },
          {
            name: 'AI Knowledge Base',
            description: 'A compounding, LLM-maintained knowledge base your teams and agents query in seconds.',
            slug: 'ai-knowledge-base',
            status: 'published',
            featuredNav: 8,
          },
        ],
      },
      {
        id: 'ai-engineering',
        label: 'AI Engineering',
        children: [
          {
            name: 'GenAI APIs & Backend Integration',
            description: 'Architect, integrate, and harden LLMs in your stack: auth, routing, fallback, cost controls, observability.',
            slug: 'genai-apis-backend-integration',
            status: 'published',
            featuredNav: 4,
          },
          {
            name: 'RAG & Retrieval Pipelines',
            description: 'Retrieval pipelines that ground LLMs in your data: embeddings, vector stores, reranking, evaluations.',
            slug: 'rag-retrieval-pipelines',
            status: 'published',
            featuredNav: 6,
          },
          {
            name: 'AI Evaluation & Monitoring',
            description: 'Production evals, drift detection, and observability for live LLM and agent systems.',
            slug: 'ai-evaluation-monitoring',
            status: 'published',
            featuredNav: 11,
          },
        ],
      },
    ],
  },
  {
    id: 'product-studio',
    num: '03',
    label: 'Product Studio',
    color: '#C2410C',
    headline: 'End-to-end product engineering',
    body: 'MVP, SaaS, and B2B multi-tenant platforms for founders without a CTO. One senior team owns architecture through deployment.',
    hubHref: '/services/product-studio/',
    hubCta: 'Product Studio services',
    subGroups: [
      {
        id: 'strategy',
        label: 'Strategy',
        children: [
          {
            name: 'Product Discovery & Validation',
            description: 'Tight-loop discovery sprints: problem framing, hypothesis tests, and a clickable prototype in weeks.',
            slug: 'product-discovery-validation',
            status: 'published',
          },
          {
            name: 'Technical Architecture Planning',
            description: 'Pre-build architecture, data-model, and infrastructure planning for production SaaS.',
            slug: 'technical-architecture-planning',
            status: 'coming-soon',
          },
          {
            name: 'MVP Scoping & Roadmapping',
            description: 'Scope reduction, milestone planning, and engineering estimates for founder-led MVPs.',
            slug: 'mvp-scoping-roadmapping',
            status: 'coming-soon',
          },
        ],
      },
      {
        id: 'product',
        label: 'Product',
        children: [
          {
            name: 'MVP Development',
            description: 'Zero-to-launch product builds - founder-led scope through first paying users.',
            slug: 'mvp-development',
            status: 'published',
          },
          {
            name: 'SaaS Product Development',
            description: 'End-to-end SaaS builds with multi-tenancy, billing, and observability baked in.',
            slug: 'saas-product-development',
            status: 'published',
          },
          {
            name: 'B2B Multi-Tenant Platforms',
            description: 'Multi-tenant B2B platforms with SSO, role-based access, audit trails, and admin tooling.',
            slug: 'b2b-multi-tenant-platforms',
            status: 'published',
          },
        ],
      },
      {
        id: 'engineering',
        label: 'Engineering',
        children: [
          {
            name: 'Frontend Engineering',
            description: 'Production React and Next.js frontends with accessibility, SEO, and performance built in.',
            slug: 'frontend-engineering',
            status: 'coming-soon',
          },
          {
            name: 'Backend & API Engineering',
            description: 'API and data-layer engineering across Postgres, MongoDB, and event-driven systems.',
            slug: 'backend-api-engineering',
            status: 'coming-soon',
          },
          {
            name: 'Design Systems & Component Libraries',
            description: 'Token-driven design systems and component libraries owned by your product team.',
            slug: 'design-systems-component-libraries',
            status: 'coming-soon',
          },
        ],
      },
    ],
  },
]

// Flatten a pillar's sub-groups into a single ordered list of leaves.
// Used by route generation, schema emitters, and llms.txt - anywhere the
// pillar-level view of "every leaf under this pillar" is the natural shape.
export function getAllLeaves(pillar: Pillar): ChildService[] {
  return pillar.subGroups.flatMap((sg) => sg.children)
}

// v1 published leaves only - used by surfaces that must hide coming-soon
// stubs from users and crawlers (mega-menu, homepage accordion, schema
// OfferCatalog). See SERVICES_PLAN.md § Risk 3.
export function getPublishedLeaves(pillar: Pillar): ChildService[] {
  return getAllLeaves(pillar).filter((c) => c.status === 'published')
}

// Curated featured leaves for a surface (nav mega-menu / homepage services
// section). Flagged leaves come first (in taxonomy order), then the list is
// topped up from the remaining published leaves and capped at `count`. Pillars
// with no flags fall back to published order, preserving the prior slice(0,N)
// behaviour. As new leaves publish with their featured flag set, they take
// their slot automatically. See the Web3 taxonomy spec.
export function getFeaturedLeaves(
  pillar: Pillar,
  surface: 'nav' | 'home',
  count: number,
): ChildService[] {
  const published = getPublishedLeaves(pillar)
  const rankOf = (c: ChildService) => (surface === 'nav' ? c.featuredNav : c.featuredHome)
  const flagged = published
    .filter((c) => rankOf(c) != null)
    .sort((a, b) => rankOf(a)! - rankOf(b)!)
  const rest = published.filter((c) => rankOf(c) == null)
  return [...flagged, ...rest].slice(0, count)
}
