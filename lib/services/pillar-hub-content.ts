// Authored copy for the pillar-hub template (Template B).
//
// One entry per pillar. Hero copy is 200-300 words and opens with the
// entity-definition pattern. Sub-group descriptions are one paragraph
// each. FAQs are 5-6 per pillar (15-18 total). Engagement-model vocab
// is pillar-tailored per SERVICES_PLAN.md § 3 Template B.
//
// Case-study placeholders use anonymized descriptors: no invented
// client names, no fabricated metrics. They link to /work.

import type { PillarId, SubGroupId } from '@/components/sections/services-data'

export type SubGroupCopy = {
  id: SubGroupId
  description: string
  /** Optional featured live-project panel. Omitted on hubs (e.g. web3) where
   * the leaf cards already link the real projects and the panel would just
   * re-point at leaves listed in the same manifest. */
  caseStudy?: { descriptor: string; outcome: string; href: string }
}

export type EngagementPhase = {
  label: string
  body: string
}

export type PillarFaq = { q: string; a: string }

export type PillarHubCopy = {
  id: PillarId
  /**
   * Optional keyworded H1 for the hub, overriding `pillar.headline` (which is
   * the editorial tagline reused on the homepage + schema). Lets the hub lead
   * with the primary search entity without changing the homepage copy.
   */
  heading?: string
  positioning: string
  /**
   * Optional entity-first direct answer (~40-60w) rendered as a highlighted
   * block after the H1 and serialized into the hub raw.md / schema. Mirrors
   * the leaf `aeoAnswer` pattern for AI-engine extraction. Fill per pillar as
   * each pillar's copy reaches the bar.
   */
  aeoAnswer?: string
  /** Prose hero proof paragraphs. Omitted on pillars whose hero carries a
   * signature visual instead (e.g. web3). */
  heroParagraphs?: string[]
  subGroups: SubGroupCopy[]
  engagement: EngagementPhase[]
  faqs: PillarFaq[]
}

export const pillarHubCopy: Record<PillarId, PillarHubCopy> = {
  ai: {
    id: 'ai',
    positioning: 'We add production AI capability to existing products and teams.',
    heroParagraphs: [
      'AI development at Metaborong is the work of adding production-grade language-model, retrieval, and agentic capability to products and teams that already exist. We do not run an ML research lab: we integrate, fine-tune, and harden off-the-shelf foundation models inside the stack you already ship. The pillar spans five areas: AI consulting for teams asking where AI fits; generative AI for copilots, conversational and voice agents, and content; custom AI agents; business-process automation and knowledge bases; and the AI engineering that integrates and hardens it all in production.',
      'Every engagement is owned by senior engineers. The same people who write the production code are the people in the discovery call. We ship behind evaluations, not vibes: production evals, drift monitoring, and cost controls are scoped from day one. Where a buyer arrives with a vague mandate, we open with an audit; where the brief is already concrete, we move straight to architecture and build. India + global delivery, with security and observability defaults already in the boilerplate.',
    ],
    subGroups: [
      {
        id: 'consulting',
        description:
          'Advisory work for teams sequencing AI adoption: use-case mapping, feasibility, and a roadmap anchored in operating cost, not hype. The output is a defensible plan, not a slide deck.',
        caseStudy: {
          descriptor: 'Mid-market SaaS: AI opportunity audit',
          outcome:
            'Inventoried 42 candidate workflows, scored against impact and feasibility, and shipped a 90-day adoption plan with team enablement built in.',
          href: '/work',
        },
      },
      {
        id: 'generative-ai',
        description:
          'Copilots, conversational and voice agents, content generation, and video engineered into products that already have users. The job is to add generative AI without breaking what already works.',
        caseStudy: {
          descriptor: 'Series-A support platform: RAG copilot',
          outcome:
            'Grounded copilot over 2.4M support tickets with retrieval, reranking, and citation. Eval harness and cost controls live in production from week one.',
          href: '/work',
        },
      },
      {
        id: 'ai-agents',
        description:
          'Custom autonomous and multi-agent systems that plan, use tools, write to your systems, and report, with evaluations, guardrails, and human-in-the-loop checkpoints scoped from the start.',
        caseStudy: {
          descriptor: 'Enterprise ops team: agentic workflow system',
          outcome:
            'Multi-step agent with tool use and human-in-the-loop checkpoints, deployed behind a production eval harness and per-tenant rate limits.',
          href: '/work',
        },
      },
      {
        id: 'business-automation',
        description:
          'Document, email, and reporting workflows automated and wired into CRMs, ERPs, and third-party tools, plus a compounding, LLM-maintained knowledge base your teams and agents query in seconds.',
      },
      {
        id: 'ai-engineering',
        description:
          'The production AI layer other features depend on: GenAI APIs and backend integration, retrieval pipelines, and evaluation and monitoring, with auth, routing, fallback, cost controls, and observability engineered in.',
      },
    ],
    engagement: [
      { label: 'Audit', body: 'Opportunity mapping, feasibility, and a sequenced roadmap before anyone writes code.' },
      { label: 'Build', body: 'Architecture, integration, evaluations, and a hardened path to production deployment.' },
      { label: 'Operate & Govern', body: 'Drift monitoring, eval regressions, cost controls, and per-tenant governance.' },
    ],
    faqs: [
      {
        q: 'Do you train custom AI models from scratch?',
        a: 'No. We integrate, fine-tune, and adapt off-the-shelf foundation models: OpenAI, Anthropic, open-weights through Hugging Face: inside your product. Custom pretraining is out of scope and rarely the right answer for the buyers we work with.',
      },
      {
        q: 'How do you handle evaluation and quality?',
        a: 'Every engagement scopes an evaluation harness at the architecture stage. We instrument retrieval quality, generation quality, and end-to-end task success, then wire those evals into CI so regressions are caught before they hit production.',
      },
      {
        q: 'What does an AI engagement typically cost?',
        a: 'AI audits land in the four-to-six week range. Copilot and RAG builds usually run eight to twelve weeks of senior engineering. Agentic systems and multi-tenant LLM platforms run longer. We scope fixed-bid or weekly capacity depending on which the buyer prefers.',
      },
      {
        q: 'Can you integrate AI into a product we already ship?',
        a: 'Yes. Most of our AI engineering work lands inside existing products: not greenfield. We harden auth, routing, fallback, cost controls, and observability around the LLM layer so the existing product keeps shipping while AI features layer in.',
      },
      {
        q: 'Which model providers do you work with?',
        a: 'OpenAI, Anthropic, Google, and open-weights via Hugging Face and self-hosted inference. We route per workload: different models for retrieval, generation, and agent planning: and engineer fallback paths between providers for resilience and cost.',
      },
      {
        q: 'Do you handle data security and compliance?',
        a: 'Yes. We engineer for the compliance posture your product already operates under: SOC 2, GDPR, India DPDP. PII handling, tenant isolation, audit logging, and data-residency choices are architecture decisions, not afterthoughts.',
      },
    ],
  },

  web3: {
    id: 'web3',
    heading: 'Web3 Development & Protocol Engineering',
    positioning: 'We advise, design, and ship on-chain protocols, products, and infrastructure.',
    aeoAnswer:
      'Web3 development is the design and engineering of blockchain protocols, on-chain products, and the infrastructure that connects them. Metaborong delivers it across three tracks: strategy, product, and engineering, shipping audit-ready smart contracts on EVM, Solana, Cosmos, Aptos, and NEAR. Live work spans a real-world-asset platform, an account-abstraction wallet, and a production NEAR-Solana bridge.',
    subGroups: [
      {
        id: 'strategy',
        description:
          'Advisory and design work that lands before any code: tokenomics modelling and blockchain consulting that produce a decision or model you can act on, each grounded in shipped engineering rather than a whitepaper written in isolation.',
      },
      {
        id: 'product',
        description:
          'On-chain products that ship with a surface users actually touch: accounts, storefront or sale mechanics, issuance flows, and the front-end users move through. NFT marketplaces, token launchpads, account-abstraction wallets, and real-world-asset tokenization platforms.',
      },
      {
        id: 'engineering',
        description:
          'Protocol and infrastructure primitives other systems build on, with no consumer-facing surface of their own. Smart contracts, DeFi protocols, liquid-staking vaults, decentralised identity, cross-chain bridges, indexers, and permissioned or private-chain deployments, every contract engineered for third-party audit and post-deploy monitoring.',
      },
    ],
    engagement: [
      { label: 'Design', body: 'Protocol architecture, tokenomics modelling, and pre-launch risk review before any code is written.' },
      { label: 'Engineer', body: 'Contracts and protocol systems engineered for audit, with tests, deployment, and post-deploy monitoring.' },
      { label: 'Audit & Operate', body: 'Audit support, post-deploy monitoring, governance tooling, and incident response.' },
    ],
    faqs: [
      {
        q: 'What does a Web3 development company actually do?',
        a: 'A Web3 development company designs, builds, audits, and operates blockchain products end to end: protocol and tokenomics design, smart contracts, the application layer, and post-launch operations. Our work spans three tracks (Strategy, Product, Engineering) across 13 services, so a project moves from concept through engineering, third-party audit, deployment, and ongoing operations without handing off between disconnected vendors.',
      },
      {
        q: 'How do you decide which blockchain to build on?',
        a: 'We are multichain by default and chain-agnostic: we pick the chain the protocol needs, not the loudest. We build across EVM (Ethereum and its L2s), Solana, Cosmos, Aptos, and NEAR, choosing based on your finality, throughput, cost, liquidity, and ecosystem requirements. We have shipped production systems on several of these, including a NEAR to Solana bridge, so the choice comes from delivery experience, not preference.',
      },
      {
        q: 'How much does Web3 development cost?',
        a: 'Cost depends on scope, not a fixed package: how many smart contracts, the chains involved, audit depth, application complexity, and how much protocol or tokenomics design is needed up front. We scope each engagement against your actual requirements rather than quoting a template price. Because senior engineers run scoping directly, the estimate reflects the real build, including audit support, not a sales figure.',
      },
      {
        q: 'How do you make sure smart contracts are secure?',
        a: 'We are audit-first. Every smart contract is specced, tested, fuzzed, and static-analysed, and engineered for third-party audit before it deploys. We coordinate directly with external audit firms and remediate findings in-band rather than treating the audit as a final checkbox. On-chain code is hard to change after launch, so security posture is built into the engineering process, not added at the end.',
      },
      {
        q: 'Why hire a Web3 development studio instead of building an in-house team?',
        a: 'Hiring senior blockchain engineers is slow and expensive, and a single in-house team rarely covers protocol design, multichain engineering, and audit readiness at once. A senior studio gives you that range immediately. We are founder-led and senior-engineer-led: the engineers who write the code are in every scoping call, so you get direct technical ownership without the multi-month cost of recruiting it.',
      },
      {
        q: 'Can you take a project from idea to a live mainnet product?',
        a: 'Yes. We work end to end across Strategy, Product, and Engineering: protocol and tokenomics design, smart contract and application engineering, third-party audit support, mainnet deployment, and post-launch operations. We have shipped live products this way, including Assetize for real-world-asset tokenization, an ERC-4337 account-abstraction wallet on Nero Chain, and Aadhaar-integrated decentralised identity at production scale.',
      },
      {
        q: 'How do you take over a Web3 project from another development team?',
        a: 'With a code review first. We run an internal review of the inherited codebase before committing to scope: inherited contracts sometimes need a security review or a refactor before new features can be added safely. If the code has known vulnerabilities, we scope remediation separately before any extension work begins.',
      },
    ],
  },

  'product-studio': {
    id: 'product-studio',
    positioning: 'We build the first version of your product, end-to-end.',
    heroParagraphs: [
      'Product Studio at Metaborong is greenfield product engineering for founders building from zero. The pillar exists for teams without an in-house CTO who need one senior engineering group to own the work from architecture through deployment, not a fragmented chain of specialists each handing off the last piece. It spans the full build: product discovery, MVP and SaaS development, web and mobile apps, B2B multi-tenant platforms, marketplaces, CRM and custom software, plus the product-design and DevOps disciplines underneath.',
      'Every build is shaped to ship to production, not to demo in a stand-up. Multi-tenancy, billing, observability, authentication, audit logging, and the operational defaults that enterprise procurement asks about are baked in from week one. Founders communicate directly with the engineers writing the code, and architecture decisions happen out in the open. We do not market modernisation, managed services, or v2/v3 retainers: Product Studio is intentionally a greenfield practice. Teams who already have a product can still reach us; we handle that conversation directly.',
    ],
    subGroups: [
      {
        id: 'plan',
        description:
          'Discovery and validation before a line of production code: problem framing, customer evidence, and a clickable prototype that de-risks the build.',
        caseStudy: {
          descriptor: 'Pre-seed founder: product discovery sprint',
          outcome:
            'Two-week discovery: problem framing, hypothesis tests, technical feasibility, and a clickable prototype the founder used to close the seed round.',
          href: '/work',
        },
      },
      {
        id: 'build',
        description:
          'The product itself, shipped end-to-end by one senior team: MVP and SaaS builds, web and mobile apps, multi-tenant platforms, marketplaces, and bespoke software, with production defaults baked in from week one.',
        caseStudy: {
          descriptor: 'B2B vertical SaaS: multi-tenant platform',
          outcome:
            'Multi-tenant platform with SSO, role-based access, audit trails, and admin tooling shipped to enterprise procurement readiness in fourteen weeks.',
          href: '/work',
        },
      },
      {
        id: 'operate',
        description:
          'The disciplines that keep a product shippable and scalable: product design systems, plus the CI/CD, observability, and cloud infrastructure underneath.',
        caseStudy: {
          descriptor: 'Founding-team React stack: design system rebuild',
          outcome:
            'Token-driven design system and component library rebuilt from a Figma reference set. Owned by the in-house team within six weeks of handoff.',
          href: '/work',
        },
      },
    ],
    engagement: [
      { label: 'Discover', body: 'Problem framing, hypothesis tests, technical feasibility, and a clickable prototype before the build starts.' },
      { label: 'Build', body: 'Architecture, engineering, design, and deployment from one senior team: through to first paying users.' },
      { label: 'Ship & Iterate', body: 'Production support, feature roadmap, and the iteration loop teams need post-launch.' },
    ],
    faqs: [
      {
        q: 'Do you work with non-technical founders?',
        a: 'Yes: that is the core buyer for the pillar. We translate founder intent into architecture, scope, and milestones, and we communicate trade-offs in plain language. Founders are in the room for every architecture call.',
      },
      {
        q: 'Who owns the IP and the codebase?',
        a: 'You do. Every engagement transfers full IP ownership of the code, design, and infrastructure to the engaging team. Source is in your repository, in your cloud account, under your team\'s control from day one.',
      },
      {
        q: 'How long does an MVP typically take?',
        a: 'Discovery is one to two weeks. A focused MVP build runs six to twelve weeks depending on scope. SaaS and B2B multi-tenant platforms run longer: fourteen to twenty weeks is the typical band when the scope includes enterprise-readiness defaults.',
      },
      {
        q: 'What is in scope for a build?',
        a: 'Architecture, engineering, design, deployment, observability, billing where the product needs it, and the operational defaults enterprise procurement asks about. One senior team owns all of it: no subcontracting across disciplines.',
      },
      {
        q: 'Do you help with the next phase after the MVP?',
        a: 'Yes: many teams retain us through v1, v2, and beyond. Product Studio is intentionally marketed as greenfield, but ongoing engineering for existing products is handled through direct conversation. Reach us through the contact form.',
      },
      {
        q: 'What stack do you build on?',
        a: 'Next.js, TypeScript, React, and Postgres or MongoDB depending on the data model. Hosted on Vercel, AWS, or whichever cloud the buyer already runs. We do not change stack on every project, which is how we deliver fast.',
      },
    ],
  },
}
