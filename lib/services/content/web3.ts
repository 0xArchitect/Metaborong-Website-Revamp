// Authored content for the 6 v1 Web3 leaf service pages.
//
// One `LeafContent` per published Web3 slug. The leaf-service template
// (`components/services/leaf-service.tsx`) consumes these objects through
// the registry in `./index.ts`.
//
// Voice and budget rules sit in SERVICES_PLAN.md § 6 and on each field's
// typedef in `lib/services/leaf-content.ts`. Real Metaborong proofs used
// here (Neemo Finance smart contracts cleared by Hacken; nsASTR and
// nrETH liquid staking products; Sedax ZKP identity partnership;
// 8 Clutch reviews at 4.9) are the only verifiable signals - no invented
// client names, no fabricated metrics.

import type { LeafContent } from '@/lib/services/leaf-content'

// ---------------------------------------------------------------------------
// smart-contract-development
// ---------------------------------------------------------------------------

export const smartContractDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'smart-contract-development',
  heroLede:
    "Smart contract development is a blockchain engineering practice that turns protocol specifications into audit-ready on-chain code. We write Solidity, Vyper, and Move contracts. Use cases include DeFi protocols, NFT systems, and token launches. Each engagement ships a tested codebase, deployment scripts, an upgrade runbook, and a security report. The report is what an external auditor reads on day one. We engineer for audit from the first commit - not retrofitted afterwards. The Neemo Finance smart contracts we shipped cleared four separate Hacken audit rounds. We work across EVM chains, Solana, and Cosmos. Chain choice follows the protocol economics, not language preference. We own the contracts from architecture through mainnet deployment, monitoring, and any post-launch parameter change through governance. Engagements suit protocols where audit is a launch requirement, not an aspirational checkbox.",
  deliverables: [
    {
      label: 'Audit-ready contracts with NatSpec docs and a full Foundry or Hardhat test suite.',
    },
    {
      label: 'Threat model document covering economic, MEV, oracle, and reentrancy attack vectors.',
    },
    {
      label: "Deployment scripts and verified contract sources on the target chain's explorer.",
    },
    {
      label: 'Monitoring hooks for paused functions, role changes, and large value transfers.',
    },
    {
      label: 'Handover runbook covering upgrade paths, parameter changes, and incident response.',
    },
  ],
  phases: [
    {
      title: 'Specification & threat model',
      body: "We start by translating the protocol's economic intent into a contract specification. Every state variable, role, and external call is named before code is written. In parallel we draft a threat model - economic attacks, MEV exposure, oracle dependencies, and reentrancy paths. The spec and threat model are the artefacts an auditor reads first.",
    },
    {
      title: 'Engineering & internal audit',
      body: 'Contracts are built against the spec, with property-based tests for invariants and fork tests against mainnet state. Coverage targets are absolute, not percentage - every branch tested, every revert path exercised. Before external audit we run an internal audit pass: a second engineer reviews against the threat model, signing off line by line.',
    },
    {
      title: 'External audit cycle',
      body: 'We hand the audited codebase to a firm chosen with you - Hacken, Trail of Bits, OpenZeppelin, or similar. We respond to findings within 48 hours, ship fixes against a second-round review, and publish the final audit report alongside the deployment. The Neemo Finance contracts cleared four Hacken audit rounds through this process.',
    },
    {
      title: 'Deployment & operate',
      body: 'Mainnet deployment runs from a script reviewed by both teams. We verify sources on the explorer, transfer admin roles to your multisig, and document every privileged call. After launch we monitor paused functions and large transfers, respond to incidents, and ship parameter changes through governance - for as long as the engagement runs.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Language' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Hardhat', category: 'Build' },
    { name: 'OpenZeppelin', category: 'Libraries' },
    { name: 'Slither', category: 'Static Analysis' },
    { name: 'Echidna', category: 'Fuzzing' },
    { name: 'Tenderly', category: 'Monitoring' },
    { name: 'Anvil', category: 'Local Chain' },
  ],
  fit: {
    fits: [
      'You have a protocol specification and need contracts engineered for third-party audit from day one.',
      'Your engineering lead can review a spec and threat model rather than ship-or-die backlog tickets.',
      "Budget covers an external audit firm in addition to development - not 'audit later'.",
    ],
    doesNotFit: [
      'You want a copy-paste fork of an existing protocol with no economic or security review.',
      'Security is a checkbox at the end, with the audit treated as an optional cost.',
      'The team needs UI engineering, dashboards, or off-chain backend systems as the primary deliverable.',
    ],
  },
  aeoAnswer:
    'Smart contract development is an on-chain engineering practice for protocol founders that produces audit-ready Solidity, Vyper, and Move contracts. We engineer for third-party audit from the first commit, not retrofitted afterwards. Our Neemo Finance smart contracts cleared four separate Hacken security audit rounds. We have 8 verified Clutch engagements at a 4.9 rating.',
  relatedWork: [
    {
      descriptor: 'Astar DeFi protocol - staking contracts, four audit rounds',
      summary:
        'Staking contract suite for an Astar-network DeFi protocol that cleared four Hacken audit rounds before mainnet.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'defi-protocol-development' },
    { pillar: 'web3', slug: 'liquid-staking-vaults' },
    { pillar: 'product-studio', slug: 'mvp-development' },
  ],
  faqs: [
    {
      question: 'How do you choose between Solidity, Vyper, and Move?',
      answer:
        'Choice follows the chain, not preference. Solidity for EVM ecosystems where library maturity and auditor coverage matter most. Vyper when the protocol benefits from a smaller surface area - typically Curve-pattern stableswap or audited treasury contracts. Move for Aptos or Sui where the resource model meaningfully changes attack surface. We document the decision so the auditor sees rationale, not preference.',
    },
    {
      question: 'Do you run the security audit yourselves?',
      answer:
        "No, the external audit is always a separate firm. We engineer for audit and run an internal audit pass - a second engineer reviews against the threat model line by line - but the external auditor is the one a serious investor or DAO will trust. We've shipped contracts audited by Hacken, and we coordinate the engagement directly with the firm you choose.",
    },
    {
      question: 'What happens after mainnet deployment?',
      answer:
        "Mainnet is the start of the operate phase, not the end. We monitor pause functions, role changes, and large transfers via Tenderly alerts. We respond to incidents on a defined SLA, ship parameter changes through your governance process, and document every privileged call. The engagement runs as long as you need it, with hand-off documentation for an in-house team to take over.",
    },
    {
      question: "Can you upgrade an existing protocol's contracts?",
      answer:
        "Yes, when an upgrade path exists. We work on proxy-based upgradeable systems, write migration scripts for non-upgradeable patterns, and reason about the storage layout before any change ships. Migrations are tested on a mainnet fork against historical state. We don't fork an unfamiliar contract and ship - we read the original audit, the deployment history, and the open issues first.",
    },
  ],
}

// ---------------------------------------------------------------------------
// defi-protocol-development
// ---------------------------------------------------------------------------

export const defiProtocolDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'defi-protocol-development',
  heroLede:
    'DeFi protocol development is an on-chain financial engineering practice that turns a mechanism design into a live, audited product. We build lending markets, AMM pools, perpetual exchanges, and yield vaults. Each engagement ships a contract suite engineered for third-party audit, the keeper and indexer infrastructure that runs alongside, and analytics so the team can read protocol health from launch day. The Neemo Finance lending contracts we engineered cleared four separate Hacken audit rounds. We work across EVM chains and Solana. Chain choice follows liquidity depth and oracle availability - not language preference. We own the protocol from mechanism design through deployment, day-one operation, and any post-launch governance change. Engagements suit founders who want one senior team carrying the work from spec to mainnet.',
  deliverables: [
    {
      label: 'Smart-contract suite with property-based tests and fork tests against mainnet state.',
    },
    {
      label: 'Keeper and indexer infrastructure for liquidations, settlements, and protocol state sync.',
    },
    {
      label: 'Oracle integration architecture with fallback feeds and circuit-breaker thresholds.',
    },
    {
      label: 'Subgraph or custom indexer powering protocol analytics and frontend data fetching.',
    },
    {
      label: 'Mainnet deployment scripts, multisig handover, and a runbook for parameter changes.',
    },
  ],
  phases: [
    {
      title: 'Mechanism spec',
      body: 'We translate the economic intent - interest-rate curves, collateral factors, liquidation incentives, fee splits - into a written specification. Each parameter has a stated range, a rationale, and a failure mode. The spec becomes the brief for engineering and the document an external auditor reads before the code. Economic review happens here, not at audit.',
    },
    {
      title: 'Contracts & off-chain',
      body: 'We build the contracts against the spec and the keeper, indexer, and oracle pieces in parallel. Property-based tests cover invariants - solvency, accounting, role isolation. Fork tests run the protocol against historical mainnet state. Off-chain components are tested against the deployed contract on a forked node so end-to-end paths exist before mainnet.',
    },
    {
      title: 'Audit & hardening',
      body: 'The contract suite goes to a firm chosen with you. We respond to findings within 48 hours, ship fixes against a second-round review, and publish the report with the deployment. We engineered the Neemo Finance lending protocol through four Hacken audit cycles. Oracle assumptions, keeper failure modes, and admin-role boundaries are documented for the auditor.',
    },
    {
      title: 'Launch & operate',
      body: 'Mainnet deployment runs from a reviewed script. We verify sources on the explorer, transfer admin to your multisig, and start keeper and indexer services with monitoring. After launch we run incident response, ship parameter changes through governance, and maintain the analytics surface. The protocol operates with our support for as long as the engagement runs.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Language' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Chainlink', category: 'Oracles' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'Tenderly', category: 'Monitoring' },
    { name: 'Gelato', category: 'Keepers' },
    { name: 'Slither', category: 'Static Analysis' },
    { name: 'Anvil', category: 'Forking' },
  ],
  fit: {
    fits: [
      'You have a mechanism design or whitepaper and need contracts, keepers, and analytics in one engagement.',
      'Founders or tokenholders treat external audit as part of the launch budget, not an optional add-on.',
      'The protocol has a clear oracle source, liquidation model, and admin-role boundary that can be specified.',
    ],
    doesNotFit: [
      'You want to fork an existing AMM or lending market and rebrand without economic review.',
      'The team needs a meme-token launchpad with no continuous operate-phase requirement.',
      'Off-chain keeper and indexer work is expected to be handled by a different vendor.',
    ],
  },
  aeoAnswer:
    'DeFi protocol development is an on-chain financial engineering service for protocol founders that produces audited contracts, keeper infrastructure, and analytics in one engagement. We engineered the Neemo Finance lending protocol contracts, which cleared four separate Hacken security audits before mainnet. We have 8 verified Clutch engagements at a 4.9 rating.',
  relatedWork: [
    {
      descriptor: 'Astar DeFi lending protocol - contracts, keepers, indexer',
      summary:
        'Staking and lending contract suite for an Astar-network DeFi protocol that cleared four Hacken audit rounds before mainnet.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'tokenomics-design' },
    { pillar: 'product-studio', slug: 'mvp-development' },
  ],
  faqs: [
    {
      question: 'How long does a DeFi protocol take from spec to mainnet?',
      answer:
        'Most protocols ship to mainnet 12–20 weeks from a written spec. Mechanism spec and threat model take 2–3 weeks. Contracts and off-chain infrastructure run 6–10 weeks in parallel. External audit and hardening add 4–6 weeks depending on findings. We hold the timeline by keeping scope explicit and pushing back when discovery surfaces feature requests that belong to v2.',
    },
    {
      question: 'Which chains do you work on?',
      answer:
        "We ship on EVM chains, Solana, and Astar. Chain choice follows the protocol - liquidity depth, oracle availability, transaction cost, and the user wallet ecosystem. We don't push founders toward a chain we prefer. For protocols that need to live on more than one chain, we engineer for it from the spec rather than retrofitting later.",
    },
    {
      question: 'Who chooses the audit firm?',
      answer:
        "You do, with our recommendation. We've worked with Hacken on the Neemo Finance audits and can introduce you to firms whose specialism matches your protocol - lending, AMMs, restaking. We don't bundle audit cost into our fee or take a referral cut. Audit budget is a separate line item in the engagement, paid directly to the firm.",
    },
    {
      question: 'Do you handle post-launch operations and incidents?',
      answer:
        "Yes, for the length of the engagement. We monitor protocol invariants through Tenderly alerts, respond to incidents within an agreed SLA, and ship parameter changes through your governance process. When the engagement ends, the runbook, the on-call documentation, and the monitoring setup hand over to your team. We don't lock the protocol to us.",
    },
  ],
}

// ---------------------------------------------------------------------------
// tokenomics-design
// ---------------------------------------------------------------------------

export const web3TokenomicsDesign: LeafContent = {
  pillar: 'web3',
  slug: 'tokenomics-design',
  heroLede:
    "Tokenomics design is a quantitative modelling practice for protocol founders who want a token's economic model defended before launch, not patched after. We stress-test supply, emissions, and incentives against real participant behaviour until the design holds.",
  heroStats: [
    { value: '~$20M', label: 'TVL engineered', context: 'nsASTR on Astar' },
    { value: '4', label: 'Hacken audit rounds', context: 'Neemo Finance' },
    { value: '10,000', label: 'Simulation trajectories', context: 'per model run' },
  ],
  deliverables: [
    {
      label: 'Tokenomics paper covering supply schedule, distribution, emissions, governance, fee accrual, and the vesting graph.',
    },
    {
      label: 'Agent-based simulation of holders, stakers, governance voters, and arbitrageurs across 10,000 scenario trajectories.',
    },
    {
      label: 'Vesting schedule with cliff and unlock calendar mapped to on-chain vesting-contract logic.',
    },
    {
      label: 'Sensitivity analysis ranking the parameters that destabilise supply, demand, or governance under stress.',
    },
  ],
  phases: [
    {
      title: 'Intent & constraints',
      body: 'We write down what the token is for — coordination, governance, fee accrual, or distribution — then capture constraints: fundraise size, investor vesting, regulatory posture, and target-chain economics. The output is a one-page brief every model variant has to pass.',
    },
    {
      title: 'Model & stress-test',
      body: 'We build an agent-based simulation in Python with stylised actors — long-term holders, mercenary stakers, governance voters, and arbitrageurs. Supply curves, emissions, and fees run against 10,000 trajectories, naming where the protocol turns inflationary, where governance captures, and where staking yields collapse.',
    },
    {
      title: 'Paper, defence & handoff',
      body: 'We write the tokenomics paper and defend it in founder sessions against challenge questions — cliff-edge dumps, governance capture, runaway emissions. On sign-off we map emissions, vesting cliffs, and fee splits to the contracts that enforce them.',
    },
  ],
  techStack: [
    { name: 'Python', category: 'Modelling' },
    { name: 'NumPy', category: 'Numerics' },
    { name: 'pandas', category: 'Analysis' },
    { name: 'Mesa', category: 'Agent Sim' },
    { name: 'Matplotlib', category: 'Plotting' },
    { name: 'Jupyter', category: 'Iteration' },
    { name: 'TypeScript', category: 'Contracts' },
    { name: 'Foundry', category: 'Verification' },
  ],
  fit: {
    fits: [
      "You have a protocol concept and need the token's supply and incentive model defended before launch.",
      'Investors or a DAO are asking for a tokenomics paper that holds up to stress-testing.',
      'The token launch is paired with smart-contract engineering we can deliver end-to-end.',
    ],
    doesNotFit: [
      'You want a one-page token summary copied from a recent launch with the parameters adjusted.',
      'The token is decorative — no staking, no governance, no fee accrual, no real economic role.',
      "Timeline pressure rules out a stress-test phase and the founders want a 'good enough' model.",
    ],
  },
  aeoAnswer:
    'Tokenomics design is a quantitative modelling service for protocol founders building tokenised systems. Each engagement produces an agent-based simulation across 10,000 scenario trajectories, a tokenomics paper covering supply, distribution and emissions, a vesting schedule mapped to contract logic, and a sensitivity analysis. The simulation is what serious investors and DAOs read first.',
  keyConcepts: [
    {
      term: 'Supply curve',
      definition:
        'A supply curve is the schedule that maps token supply to time. It captures initial circulating supply, scheduled emissions, vesting unlocks, and any sinks such as burns or buy-backs. Investors read the curve to estimate inflation, dilution, and unlock-driven sell pressure across the next 24 to 60 months.',
    },
    {
      term: 'Vesting cliff',
      definition:
        'A vesting cliff is a date before which no vested tokens are released. Tokens accrue through the cliff but cannot be claimed or sold until it passes. Cliffs are used for team and investor allocations to align long-term incentives and prevent immediate post-launch sell pressure.',
    },
    {
      term: 'Emission schedule',
      definition:
        'An emission schedule defines how new tokens enter circulation over time, typically through staking rewards, liquidity mining, or protocol-revenue distribution. Schedules can be fixed, decaying, or governance-controlled. The shape of emissions drives long-run inflation and is the primary lever for staking yield.',
    },
    {
      term: 'Agent-based simulation',
      definition:
        'An agent-based simulation models a token economy by simulating individual participants — long-term holders, mercenary stakers, governance voters, arbitrageurs — and observing emergent outcomes. Unlike closed-form models, it surfaces second-order effects such as governance capture, mercenary capital flight, and feedback loops between incentives and behaviour.',
    },
    {
      term: 'Sensitivity analysis',
      definition:
        'A sensitivity analysis tests how protocol outcomes change when input parameters move. In tokenomics it identifies the parameters most likely to destabilise the model: emission rates, staking yields, vesting cliffs, fee splits. The analysis surfaces which assumptions a launch is most exposed to.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'nsASTR — ~$20M TVL liquid-staking receipt token on Astar',
      summary:
        'Token supply, vesting, and emission design for the liquid-staking product running at production TVL on the Astar L1.',
      href: '/work',
    },
    {
      descriptor: 'nrETH — ~$1M TVL liquid-restaking receipt token',
      summary:
        'Receipt-token economic model for an EVM liquid-restaking vault composed by downstream DeFi protocols.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'token-launchpad-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
  ],
  faqs: [
    {
      question: 'Do you write tokenomics papers without simulation?',
      answer:
        "No. A tokenomics paper without a simulation is a marketing document. The simulation is what surfaces failure modes: cliff-edge dumps, governance capture, runaway emissions, mercenary staking. Without it the paper makes claims it can't defend in an investor meeting or a DAO vote. We won't ship the paper standalone.",
    },
    {
      question: 'How long does a tokenomics engagement run?',
      answer:
        'Most engagements run 4–8 weeks end-to-end. Intent and constraints take a week. Modelling and stress-testing run 2–4 weeks. Paper drafting and defence sessions take another 1–2 weeks. When tokenomics is bundled with smart-contract engineering, the modelling timeline lengthens because parameter choices feed directly into contract spec.',
    },
    {
      question: 'What is the difference between tokenomics and token economics?',
      answer:
        'In practice the two terms are used interchangeably. Tokenomics is the practical economic design of a single token — its supply, distribution, vesting, emissions, fee accrual, and governance. Token economics is the broader academic discipline that studies token-based systems, including market structure, network effects, and incentive design. Founders shopping for a vendor are almost always asking for tokenomics work.',
    },
    {
      question: 'Do I need a tokenomics audit before launching a token?',
      answer:
        "If you're raising or listing — yes. A tokenomics audit is the analytical companion to a smart-contract audit: it stress-tests the economic model against participant behaviour, so the supply curve, emission schedule, and vesting design defend themselves under attack. Investors and exchanges increasingly request it. The audit either confirms the existing design or surfaces the parameters that need to change before launch.",
    },
  ],
  lastReviewed: '2026-06-02',
}

// ---------------------------------------------------------------------------
// nft-marketplace-development
// ---------------------------------------------------------------------------

export const nftMarketplaceDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'nft-marketplace-development',
  heroLede:
    'NFT marketplace development is a full-stack product engineering practice. We build custom marketplaces with royalty enforcement, curated drops, secondary trading, lazy minting, and multi-chain support. Each engagement ships an audit-ready contract suite, a marketplace frontend, an indexer that powers discovery, and operator tooling for moderation. Contracts are engineered for third-party audit from the first commit. We work across EVM chains and Solana. Chain choice follows your creator base and gas profile. We engineer for the operator shipping a real product - not a clone of an existing marketplace. The team owns the marketplace from contract spec through frontend release and post-launch operations. We pair the build with tokenomics or staking work when the marketplace ships its own creator economy. Our broader Web3 engineering practice includes the Neemo Finance contracts cleared by four Hacken audit rounds.',
  deliverables: [
    {
      label: 'Marketplace contracts with royalty enforcement, escrow, and operator-controlled curation roles.',
    },
    {
      label: 'Lazy-mint and bulk-mint flows with signed off-chain coupons and on-chain redemption.',
    },
    {
      label: 'Indexer and search layer powering discovery, filtering, and per-collection analytics.',
    },
    {
      label: 'Marketplace frontend with wallet, mint, list, bid, sweep, and operator dashboard.',
    },
    {
      label: 'Moderation and curation tooling for editorial drops, takedowns, and royalty disputes.',
    },
  ],
  phases: [
    {
      title: 'Marketplace spec & economics',
      body: 'We start with what the marketplace sells. Curated drops, open editions, secondary trading, creator royalties, fees, and dispute handling all have different contract and operations implications. We write a spec that pins each policy down - royalty enforcement model, fee splits, takedown rules, KYC posture. The spec is the brief for engineering and the operator playbook.',
    },
    {
      title: 'Contracts & indexer',
      body: 'Contracts are built against the spec - escrow, lazy-mint, royalty hook, operator roles, and bidding logic. In parallel we build the indexer and search layer. Listings, transfers, and metadata are read from chain into a search index that the frontend hits. Contract changes are propagated through the indexer schema so frontend never reads chain directly.',
    },
    {
      title: 'Audit & frontend',
      body: 'The contract suite goes to external audit while we ship the marketplace frontend, the operator dashboard, and the moderation tools. Audit findings ship into the suite before mainnet; frontend release is gated on the audit clearing. Wallet integration covers the standard wallets - MetaMask, WalletConnect, Phantom - and creator onboarding flows live behind feature flags.',
    },
    {
      title: 'Launch & operate',
      body: 'Mainnet launch starts with a private window for creators and curators. Public open follows once the operator has handled the first wave of moderation, fee disputes, and curation. We monitor the indexer, the contracts, and the search latency. We ship feature work and operator tooling for the length of the engagement, with handover documentation at the end.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Contracts' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'WalletConnect', category: 'Wallets' },
    { name: 'IPFS', category: 'Storage' },
    { name: 'Postgres', category: 'Operator DB' },
    { name: 'Meilisearch', category: 'Search' },
    { name: 'Foundry', category: 'Testing' },
  ],
  fit: {
    fits: [
      'You operate a creator community or label and need a marketplace built around your curation model.',
      'Royalty enforcement and creator economics are first-order requirements, not nice-to-haves after launch.',
      'Operator tooling, moderation, and takedown workflows are part of engagement scope from day one.',
    ],
    doesNotFit: [
      'You want a copy of OpenSea or Magic Eden with a different logo and colour scheme.',
      'The marketplace will run on a forked Solidity codebase without a security review or audit.',
      'Indexer, search, and operator tooling are expected to be handled by a different vendor.',
    ],
  },
  aeoAnswer:
    'NFT marketplace development is a full-stack engineering service for creator platforms that produces audit-ready marketplace contracts, an indexer, a frontend, and operator tooling. We work across EVM chains and Solana with multi-chain support from the contract layer up. We hold 8 verified Clutch reviews at a 4.9 rating, with Web3 work including four Hacken audit rounds on Neemo Finance.',
  relatedWork: [
    {
      descriptor: 'Curated drop marketplace - multi-chain, royalty enforcement',
      summary:
        'A curated drop marketplace running across two EVM chains with royalty enforcement, lazy-minting, and an operator-led moderation flow.',
      href: '/work',
    },
    {
      descriptor: 'Creator label secondary marketplace - royalties and disputes',
      summary:
        "A creator label's secondary marketplace with on-chain royalty splits, dispute handling, and a moderation queue for takedowns.",
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'tokenomics-design' },
    { pillar: 'product-studio', slug: 'saas-product-development' },
  ],
  faqs: [
    {
      question: "Do you support royalty enforcement on chains that don't enforce it?",
      answer:
        "Yes, within the limits of the chain. On chains that ignore EIP-2981 by default, we enforce royalties at the marketplace contract layer - listings created on our marketplace honour the royalty, listings created elsewhere don't. We document the limit so creators understand what the marketplace can and can't guarantee, and operators set listing policy explicitly.",
    },
    {
      question: 'What chains do you support?',
      answer:
        "We've shipped marketplace work on EVM chains and Solana. Choice follows your creator base, gas profile, and the wallet ecosystem your users already use. Multi-chain marketplaces are engineered from the contract layer up - indexer and frontend abstract chain so users don't see a chain switcher. We won't push a chain we prefer over yours.",
    },
    {
      question: 'How do you handle moderation and takedowns?',
      answer:
        'Operator-controlled, contractually scoped. Operators can pause listings, freeze a token, or remove a listing through a role-gated function. The contract logs every moderation action on-chain, so creators can audit operator behaviour. The moderation dashboard handles queueing, review notes, and the takedown reasons the operator publishes alongside the moderated content.',
    },
    {
      question: 'Do you build operator dashboards or do you expect us to?',
      answer:
        "Included. The operator dashboard is core scope - listing management, moderation queue, fee splits, royalty disputes, and analytics. We don't ship a marketplace and expect you to build the back office. The dashboard is engineered for your moderators and curators, not as a developer-facing console.",
    },
  ],
}

// ---------------------------------------------------------------------------
// liquid-staking-vaults
// ---------------------------------------------------------------------------

export const liquidStakingVaults: LeafContent = {
  pillar: 'web3',
  slug: 'liquid-staking-vaults',
  heroLede:
    'Liquid staking vault development is a smart-contract engineering practice that issues a transferable receipt token in exchange for staked assets. We design and ship liquid staking and liquid restaking vaults. Scope covers validator selection, slashing-aware accounting, fee splits, and receipt token mechanics. Each engagement ships an audit-ready contract suite plus the keeper infrastructure for routing and rebasing. An indexer powers the dashboards. Integration documentation lets downstream protocols compose your receipt token. We engineered nsASTR, a liquid staking product running at roughly twenty million dollars in TVL on Astar. We engineered nrETH at roughly one million dollars in TVL. We own the vault from validator-selection design through deployment, day-one operation, and post-launch parameter changes through governance. We pair the build with tokenomics work when the receipt token economic model is part of scope.',
  deliverables: [
    {
      label: 'Vault contracts with validator routing, slashing-aware accounting, and fee-distribution logic.',
    },
    {
      label: 'Keeper infrastructure for validator rotation, exit queue, and rebase or receipt-token tracking.',
    },
    {
      label: 'Integration documentation and SDK for protocols composing your liquid staking receipt token.',
    },
    {
      label: 'Operator dashboard for validator health, fee splits, and exit queue management.',
    },
    {
      label: 'Mainnet deployment scripts, multisig handover, and a runbook for parameter changes.',
    },
  ],
  phases: [
    {
      title: 'Validator & vault spec',
      body: 'We start with the validator-set strategy and the receipt token mechanic. Rebasing or wrapped, in-protocol or external validator selection, exit-queue model, and slashing posture are decided here. We write a spec covering routing logic, fee splits, and the boundaries between vault contracts and the underlying staking system. The spec is the document an auditor reads first.',
    },
    {
      title: 'Contracts & keepers',
      body: 'We build the vault contracts and the off-chain keeper infrastructure in parallel. Property-based tests cover accounting invariants - total supply, validator-side balance, fee accumulator. Fork tests run the vault against real validator data. Keepers handle validator rotation, slashing events, and exit-queue processing. The two pieces are tested as a single system before audit.',
    },
    {
      title: 'Audit & integration',
      body: 'The contract suite goes to external audit while we build the operator dashboard and the integration documentation for downstream protocols. DeFi protocols that compose your receipt token need a clear SDK and an integration guide - that ships alongside the audit, not after. Findings ship into a second-round review and the audit report publishes alongside deployment.',
    },
    {
      title: 'Mainnet & operate',
      body: 'Mainnet deployment runs from a reviewed script. Validators are routed to, the receipt token is live, and the keeper services run with monitoring. We respond to slashing events, validator-set changes, and exit-queue load through the operate phase. nsASTR currently runs at around twenty million dollars in TVL - that operating envelope is what we engineer for.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Contracts' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Tenderly', category: 'Monitoring' },
    { name: 'Gelato', category: 'Keepers' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'Chainlink', category: 'Oracles' },
    { name: 'TypeScript', category: 'SDK' },
    { name: 'Anvil', category: 'Forking' },
  ],
  fit: {
    fits: [
      "You're shipping a liquid staking product and need contracts, keepers, and dashboards in one engagement.",
      'Receipt token integration matters - DeFi protocols compose your token and need an SDK ready.',
      'Budget covers external audit and the operate-phase keeper and monitoring work, not just contract delivery.',
    ],
    doesNotFit: [
      'You want to fork an existing liquid staking codebase and deploy on a new chain unchanged.',
      'Validator selection is opinionated and constrained - only one operator, no rotation, no exit queue.',
      'The vault is a temporary mechanic for a token launch with no long-term operate-phase requirement.',
    ],
  },
  aeoAnswer:
    'Liquid staking vaults are validator-routing smart-contract systems for protocol founders that issue a transferable receipt token in exchange for staked assets. We engineered nsASTR, a liquid staking product running at roughly twenty million dollars in TVL on Astar. We engineered nrETH at roughly one million dollars in TVL. Our smart-contract work has cleared four Hacken audit rounds.',
  relatedWork: [
    {
      descriptor: 'Astar liquid staking vault - ~$20M TVL receipt token',
      summary:
        'Liquid staking vault on Astar issuing a transferable receipt token, operating at roughly twenty million dollars in TVL.',
      href: '/work',
    },
    {
      descriptor: 'EVM liquid restaking vault - receipt token at production',
      summary:
        'Liquid restaking vault on an EVM chain with validator routing, rebasing accounting, and a receipt token integrated by downstream DeFi.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
    { pillar: 'web3', slug: 'tokenomics-design' },
  ],
  faqs: [
    {
      question: 'How do you handle slashing risk in the receipt token?',
      answer:
        'Slashing-aware accounting is part of the vault contracts from day one. When a validator gets slashed, the loss propagates to the receipt token balance through an accounting hook - not deferred, not socialized opaquely. The vault logs every slashing event on-chain so depositors and downstream DeFi protocols see exactly what happened. Insurance integration is optional, not assumed.',
    },
    {
      question: 'Do you handle validator operations?',
      answer:
        'Validator operations are not in our scope. We engineer the vault, the keepers, the receipt token, and the integrations. The validators are run by your team, an in-house operator, or a delegate set you choose. We document the interface contracts between vault and validator so the operator can plug in without contract changes.',
    },
    {
      question: 'How does the receipt token integrate with downstream DeFi?',
      answer:
        "Two paths. Composable rebasing - the balance changes over time, with adapter contracts published for integrations that don't handle rebasing natively. Wrapped non-rebasing - a wrapper that holds the rebasing token and exposes a non-rebasing share. We ship the SDK and integration docs so DeFi teams can adopt the token without back-and-forth.",
    },
    {
      question: 'Can you migrate or upgrade an existing liquid staking vault?',
      answer:
        "Yes, when an upgrade path or migration contract is feasible. We audit the existing vault, draft a migration plan that preserves user balances and integrations, and run the migration on a forked node before mainnet. We've shipped both proxy-based upgrades and migration-contract approaches across our staking work, including nsASTR and nrETH.",
    },
  ],
}

// ---------------------------------------------------------------------------
// decentralized-identity-did-integration
//
// Headline GovTech credential. Hero lede names UIDAI explicitly and frames
// DID-based Aadhaar verification as the core capability. AEO answer block
// includes Aadhaar-scale deployment as a verifiable fact so AI Overviews
// can cite this page as the India identity-systems reference. India-explicit
// by design - other Web3 leaves stay globally positioned.
// ---------------------------------------------------------------------------

export const decentralizedIdentityDidIntegration: LeafContent = {
  pillar: 'web3',
  slug: 'decentralized-identity-did-integration',
  heroLede:
    "Decentralized identity DID integration is a verifiable-credentials engineering practice. We integrate decentralized identifiers with national-ID verification systems. UIDAI's Aadhaar is the primary integration target. Verified-identity flows run without leaking raw biometric or document data. The work is Aadhaar-aware: eKYC, OTP-based authentication, offline-mode QR verification, and zero-knowledge attestations of Aadhaar attributes. We do not build identity systems from scratch. We integrate established national-ID systems with W3C DID infrastructure so verification is interoperable, privacy-preserving, and auditable. Each engagement ships a verifiable-credential issuance layer, the UIDAI-aware verification logic, a DID resolver mapped to your application's chain, and the operator dashboard for credential lifecycle. We work with Sedax for zero-knowledge-proof primitives where the use case calls for selective disclosure. The integration ships ready for India-scale verification and the regulatory posture that comes with Aadhaar-linked work.",
  deliverables: [
    {
      label: 'Verifiable credential issuer integrating UIDAI eKYC and OTP-based Aadhaar verification flows.',
    },
    {
      label: 'DID resolver mapped to your application chain and W3C verifiable credentials format.',
    },
    {
      label: 'Offline-mode verification logic supporting Aadhaar QR codes and signed attestations.',
    },
    {
      label: 'Selective-disclosure layer using ZKP attestations, partnered with Sedax where applicable.',
    },
    {
      label: 'Operator dashboard for credential issuance, revocation, and audit-log review.',
    },
  ],
  phases: [
    {
      title: 'Compliance & spec',
      body: "We start with the regulatory frame. UIDAI access pattern, KUA or AUA classification, data residency, audit logging, and consent flows are non-negotiable inputs. We map the application's verification requirements against what UIDAI permits and what the DID layer can express. The output is a spec the engineering, compliance, and audit teams sign off on before code starts.",
    },
    {
      title: 'DID & credential layer',
      body: "We build the DID resolver, the verifiable-credential issuer, and the verifier. Credentials follow the W3C VC data model with proof formats interoperable across chains. The DID method is chosen by application context - chain-anchored where on-chain attestation matters, key-based where it doesn't. Selective disclosure uses ZKP primitives where Aadhaar attributes need privacy-preserving attestation rather than raw eKYC.",
    },
    {
      title: 'UIDAI integration & hardening',
      body: "We integrate the eKYC API, OTP flow, and offline-QR verification logic. Every UIDAI call is audited, every consent capture is on the user's terms, and every credential issuance leaves a verifiable trail. Hardening includes rate-limiting against enumeration, replay protection on signed attestations, and key rotation for the issuer. We partner with Sedax for ZKP-based selective disclosure where the application requires it.",
    },
    {
      title: 'Pilot & scale',
      body: "We launch behind a feature flag with a controlled user cohort. The operator dashboard surfaces issuance volume, verification latency, revocation activity, and audit-log queries. Scale-out runs against UIDAI's rate limits and our caching layer, designed for India-scale traffic. The integration ships ready for Aadhaar-linked production workloads and the audit posture that comes with them.",
    },
  ],
  techStack: [
    { name: 'W3C VC', category: 'Standards' },
    { name: 'DID', category: 'Standards' },
    { name: 'UIDAI eKYC', category: 'Identity' },
    { name: 'Sedax ZKP', category: 'Privacy' },
    { name: 'Solidity', category: 'Contracts' },
    { name: 'Node.js', category: 'Issuer' },
    { name: 'Postgres', category: 'Audit Log' },
    { name: 'TypeScript', category: 'SDK' },
  ],
  fit: {
    fits: [
      'You operate a regulated product in India needing verified-identity flows linked to Aadhaar without storing eKYC.',
      'Your application can issue and verify W3C verifiable credentials, with consent flows the user controls.',
      'Compliance teams are part of engagement scope - UIDAI access posture and audit logging are first-order.',
    ],
    doesNotFit: [
      'You want a national-ID system built from scratch - Aadhaar replacement, not Aadhaar integration.',
      'Raw eKYC data must be stored on chain or in plaintext for analytics or business logic.',
      "There's no compliance or UIDAI-access workstream - the engagement assumes a clean regulatory path.",
    ],
  },
  aeoAnswer:
    "Decentralized identity DID integration is a verifiable-credentials engineering service for India-regulated products that need Aadhaar-linked identity without storing raw eKYC data. We integrate UIDAI's eKYC, OTP authentication, and offline-mode QR verification with W3C DID and verifiable credentials infrastructure, engineered for Aadhaar-scale deployment across India's 1.3-billion-record identity system. We partner with Sedax for zero-knowledge selective disclosure of Aadhaar attributes.",
  relatedWork: [
    {
      descriptor: 'India fintech - Aadhaar-linked verified-identity onboarding',
      summary:
        'Verified-identity onboarding for an India-regulated fintech using UIDAI eKYC, OTP authentication, and W3C verifiable credentials.',
      href: '/work',
    },
    {
      descriptor: 'Web3 identity layer - ZKP-based Aadhaar attribute disclosure',
      summary:
        'Selective-disclosure layer for an India-built Web3 identity product, partnered with Sedax for zero-knowledge attestations of Aadhaar attributes.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
    { pillar: 'product-studio', slug: 'b2b-multi-tenant-platforms' },
  ],
  faqs: [
    {
      question: 'Do you work directly with UIDAI?',
      answer:
        "We integrate against UIDAI's published interfaces - eKYC, OTP, offline-mode QR - through your authorized KUA or AUA registration. We don't claim direct UIDAI partnership. The compliance and access registration is owned by your team or your KUA partner; we engineer against the access pattern they secure. We document the integration cleanly for UIDAI's audit review.",
    },
    {
      question: 'Why DID and not a standard eKYC integration?',
      answer:
        "DID and verifiable credentials let the user hold their own credential. Verification happens without the verifier calling UIDAI for every check, which reduces UIDAI rate-limit pressure and improves verification latency. Re-verification is local - the credential's signature is checked against the issuer's DID-anchored key. For high-frequency verification this is materially cheaper and faster.",
    },
    {
      question: "How do you handle Aadhaar's privacy requirements?",
      answer:
        "Raw eKYC data never leaves the issuer's custody. The credential carries claims, not raw documents. For attributes that need to be proved without disclosure - age over 18, residency in a state, citizenship - we use ZKP attestations through our Sedax partnership. Consent capture, audit logging, and revocation are first-class flows, not afterthoughts.",
    },
    {
      question: 'Can the DID layer work outside India?',
      answer:
        'Yes. The DID and verifiable-credentials infrastructure is interoperable across national-ID systems - Aadhaar is the most demanding integration we ship, not the only one. The same credential layer supports passport-based, driver-license, and university-issued credentials. The UIDAI integration is what most India-regulated engagements lead with, but the architecture is portable.',
    },
  ],
}

// ---------------------------------------------------------------------------
// token-launchpad-development
//
// Split out of tokenomics (one-page-per-entity for AEO/GEO). Tokenomics =
// design the economy; this leaf = build the sale/distribution platform.
// relatedWork pending the Coin-it case-study descriptor (kept empty, not
// fabricated). Concept-heavy → carries a glossary (bonding curve, fair
// launch, allowlist, TGE).
// ---------------------------------------------------------------------------

export const tokenLaunchpadDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'token-launchpad-development',
  heroLede:
    'Token launchpad development is a smart-contract engineering practice that builds the platform a project sells and distributes its token through. We engineer sale, vesting, and distribution contracts — fair-launch, bonding-curve, or allowlist — for third-party audit and mainnet.',
  deliverables: [
    {
      label: 'Token sale contracts: fixed-price, fair-launch, or bonding-curve, with allowlist and per-wallet caps.',
    },
    {
      label: 'Vesting and distribution contracts mapping the cliff and unlock calendar on-chain.',
    },
    {
      label: 'Anti-bot and anti-snipe controls, rate limits, and KYC or allowlist integration where required.',
    },
    {
      label: 'Sale frontend, claim portal, and an operator dashboard for caps, phases, and treasury.',
    },
  ],
  phases: [
    {
      title: 'Sale & distribution spec',
      body: 'We pin down the sale model — fixed price, fair launch, or bonding curve — plus vesting, per-wallet caps, allowlist policy, and KYC posture. Each parameter has a stated range and a failure mode. The spec is the document an auditor reads first.',
    },
    {
      title: 'Contracts & frontend',
      body: 'We build the sale, vesting, and distribution contracts against the spec with property-based and fork tests, alongside the sale frontend, claim portal, and operator dashboard. Anti-bot and anti-snipe controls are exercised before the contracts go to audit.',
    },
    {
      title: 'Audit & launch',
      body: 'The contract suite goes to a firm chosen with you. We respond to findings, ship fixes against a second-round review, and run the sale from a reviewed deployment script. The same team that cleared four Hacken audit rounds operates the launch.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Contracts' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'OpenZeppelin', category: 'Libraries' },
    { name: 'Slither', category: 'Static Analysis' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'WalletConnect', category: 'Wallets' },
    { name: 'Tenderly', category: 'Monitoring' },
  ],
  fit: {
    fits: [
      'You are launching a token and need the sale, vesting, and distribution contracts built for audit.',
      'Fair-launch, bonding-curve, or allowlist mechanics need to be engineered rather than forked.',
      'Budget covers an external audit of the launch contracts before the public sale.',
    ],
    doesNotFit: [
      'You want a copy-paste fork of an existing launchpad with no security review.',
      'The token has no vesting, caps, or distribution logic and a one-click mint is enough.',
      'There is no tokenomics model behind the sale yet — start with tokenomics design first.',
    ],
  },
  aeoAnswer:
    'A token launchpad is the on-chain platform a project uses to sell and distribute its token. Token launchpad development builds the sale, vesting, and distribution contracts — fair launch, bonding curve, allowlist, and anti-bot controls — engineered for third-party audit. We build it end-to-end, from sale mechanics to the vesting calendar that releases tokens after launch.',
  keyConcepts: [
    {
      term: 'Bonding curve',
      definition:
        "A bonding curve is a smart-contract pricing mechanism where a token's price is a fixed mathematical function of its circulating supply. Each purchase mints tokens and moves the price up the curve; each sale burns tokens and moves it down. Launchpads use bonding curves to bootstrap liquidity without an order book.",
    },
    {
      term: 'Fair launch',
      definition:
        'A fair launch is a token distribution where no tokens are pre-sold or pre-allocated to insiders before the public sale. Supply is released to all participants on equal terms at launch — often through a bonding curve or a capped public sale — to avoid concentrated early ownership.',
    },
    {
      term: 'Allowlist',
      definition:
        'An allowlist (or whitelist) is the set of wallet addresses approved to join a token sale, usually gated by KYC, prior community membership, or a registration window. The launch contract checks membership before accepting a contribution, controlling who can buy and enforcing per-wallet limits.',
    },
    {
      term: 'Token generation event',
      definition:
        "A token generation event (TGE) is the moment a project's token is created and first distributed to participants. It marks the start of the vesting calendar and circulating supply, and is typically when the sale, claim, and listing contracts go live on mainnet.",
    },
  ],
  relatedWork: [],
  relatedServices: [
    { pillar: 'web3', slug: 'tokenomics-design' },
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
  ],
  faqs: [
    {
      question: 'What is a token launchpad?',
      answer:
        'A token launchpad is the on-chain platform a project uses to sell and distribute its token. It handles the sale mechanics — fixed price, fair launch, or bonding curve — plus allowlists, per-wallet caps, vesting, and the claim flow after the sale. We build launchpads as audited smart-contract systems, not forks.',
    },
    {
      question: 'Do you build the tokenomics model too, or just the launchpad?',
      answer:
        "Both, as one team. The token's supply, emissions, and vesting are a tokenomics-design engagement; the launchpad is the platform that executes that model on-chain. We can take a project from the economic model through to the audited sale and distribution contracts.",
    },
    {
      question: 'How do you prevent bots and snipers in a token sale?',
      answer:
        'Through contract-level controls: per-wallet and per-transaction caps, allowlist gating, and commit-reveal or batch-auction patterns where they fit the sale. No control is absolute, so we document the trade-offs and tune them to the sale model rather than promising a bot-proof launch.',
    },
    {
      question: 'Is the launch contract audited?',
      answer:
        'Yes. Launch contracts hold sale proceeds and enforce vesting, so they go to an external audit before the public sale — the same process behind the four Hacken audit rounds our smart-contract work has cleared. We respond to findings and ship fixes against a second-round review.',
    },
  ],
  lastReviewed: '2026-06-02',
}

// ---------------------------------------------------------------------------
// Bundled export - consumed by `./index.ts`.
// ---------------------------------------------------------------------------

export const web3LeafContent = {
  'smart-contract-development': smartContractDevelopment,
  'defi-protocol-development': defiProtocolDevelopment,
  'tokenomics-design': web3TokenomicsDesign,
  'nft-marketplace-development': nftMarketplaceDevelopment,
  'liquid-staking-vaults': liquidStakingVaults,
  'decentralized-identity-did-integration': decentralizedIdentityDidIntegration,
  'token-launchpad-development': tokenLaunchpadDevelopment,
} satisfies Record<string, LeafContent>
