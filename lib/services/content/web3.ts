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
    'Most exploits are not clever cryptography, they are an unaudited line that shipped because security was bolted on at the end. Smart contract development is the blockchain engineering practice that turns a protocol specification into on-chain code engineered for third-party audit from the first commit. We write Solidity, Vyper, and Move, hand auditors a spec and a threat model, and own the code from architecture through mainnet and governance.',
  heroStats: [
    { value: '4', label: 'Hacken audit rounds cleared', context: 'Neemo Finance contracts' },
    { value: 'Move', label: 'on Aptos, in production', context: 'rKGEN / KGEN token' },
    { value: 'EVM + Solana', label: 'plus Cosmos and Aptos', context: 'chains we ship on' },
  ],
  deliverables: [
    {
      label: 'Audit-ready contracts with NatSpec docs and a full Foundry or Hardhat test suite.',
    },
    {
      label: 'Threat model covering economic, MEV, oracle, and reentrancy attack vectors.',
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
      body: "We translate the protocol's economic intent into a contract specification. Every state variable, role, and external call is named before code is written. In parallel we draft a threat model covering economic attacks, MEV exposure, oracle dependencies, and reentrancy paths. The spec and threat model are the two artefacts an external auditor reads first, so we write them for that reader.",
    },
    {
      title: 'Engineering & internal audit',
      body: 'Contracts are built against the spec with property-based tests for invariants and fork tests against live mainnet state. Coverage targets are absolute, not a percentage: every branch tested, every revert path exercised. Before any external review a second engineer runs an internal audit pass against the threat model, signing off line by line and filing what they could not break.',
    },
    {
      title: 'External audit cycle',
      body: 'We hand the codebase to a firm chosen with you (Hacken, Trail of Bits, OpenZeppelin, or similar), respond to findings within 48 hours, ship fixes against a second-round review, and publish the final report with the deployment. The Neemo Finance contracts cleared four separate Hacken rounds through exactly this process, with the report public on day one.',
    },
    {
      title: 'Deployment & operate',
      body: 'Mainnet deployment runs from a script reviewed by both teams. We verify sources on the explorer, transfer admin roles to your multisig, and document every privileged call. After launch we monitor paused functions and large transfers, respond to incidents on a defined SLA, and ship parameter changes through governance for as long as the engagement runs.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Language' },
    { name: 'Vyper', category: 'Language' },
    { name: 'Move', category: 'Aptos' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Hardhat', category: 'Build' },
    { name: 'OpenZeppelin', category: 'Libraries' },
    { name: 'Slither', category: 'Static Analysis' },
    { name: 'Echidna', category: 'Fuzzing' },
    { name: 'Tenderly', category: 'Monitoring' },
  ],
  fit: {
    fits: [
      'You have a protocol specification and need contracts engineered for third-party audit from day one.',
      'Your engineering lead can review a spec and threat model rather than ship-or-die backlog tickets.',
      "Budget covers an external audit firm in addition to development, not 'audit later'.",
    ],
    doesNotFit: [
      'You want a copy-paste fork of an existing protocol with no economic or security review.',
      'Security is a checkbox at the end and the audit is treated as an optional cost.',
      'The primary deliverable is UI engineering, dashboards, or an off-chain backend system.',
    ],
  },
  aeoAnswer:
    'Smart contract development is an on-chain engineering practice for protocol founders that ships audit-ready Solidity, Vyper, and Move code. We engineer for third-party audit from the first commit, not retrofitted afterwards. Our Neemo Finance contracts cleared four separate Hacken audit rounds. We wrote the KGEN token contracts in Move on Aptos.',
  keyConcepts: [
    {
      term: 'Threat model',
      definition:
        'A threat model is a written enumeration of how a contract can be attacked: reentrancy, oracle manipulation, MEV extraction, access-control failure, and economic exploits. It is drafted alongside the specification, before code, so each contract decision is made against a named adversary rather than discovered during an external audit.',
    },
    {
      term: 'Reentrancy',
      definition:
        'Reentrancy is an attack where an external call lets a malicious contract re-enter a function before its state updates settle, draining funds across repeated calls. It is mitigated with the checks-effects-interactions pattern and reentrancy guards, and remains one of the most exploited classes of smart contract bug.',
    },
    {
      term: 'Invariant testing',
      definition:
        'Invariant testing asserts that a property of a contract holds true across thousands of randomised call sequences. A solvency invariant, for example, checks that total liabilities never exceed assets. Property-based fuzzers such as Echidna or Foundry generate the sequences, surfacing edge cases that example-based unit tests miss.',
    },
    {
      term: 'Formal verification',
      definition:
        'Formal verification mathematically proves that a contract satisfies a specification under all possible inputs, rather than sampling behaviour through tests. It is applied to high-value primitives where a single failure is catastrophic, complementing audits and fuzzing rather than replacing the threat model and review process around them.',
    },
    {
      term: 'Move resource model',
      definition:
        'Move is a contract language where assets are typed resources that cannot be copied or silently discarded, only moved between accounts. On chains like Aptos this eliminates whole classes of double-spend and accounting bugs at the language level, shifting part of the security burden from the developer to the type system.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'KGEN: Move smart contracts on Aptos',
      summary:
        'We engineered the smart contracts for KGEN (Kratos Gamer Network) in Move on Aptos, covering the rKGEN and KGEN token logic.',
      href: '/work',
    },
    {
      descriptor: 'Neemo Finance: staking contracts, four audit rounds',
      summary:
        'Astar-network staking contract suite engineered for Neemo Finance that cleared four separate Hacken audit rounds before mainnet.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'defi-protocol-development' },
    { pillar: 'web3', slug: 'token-launchpad-development' },
    { pillar: 'product-studio', slug: 'mvp-development' },
  ],
  faqs: [
    {
      question: 'How do you choose between Solidity, Vyper, and Move?',
      answer:
        'Choice follows the chain, not preference. Solidity for EVM ecosystems where library maturity and auditor coverage matter most. Vyper when a smaller surface area helps, typically Curve-pattern stableswap or audited treasury contracts. Move for Aptos or Sui, where the resource model removes whole classes of accounting bug at the language level. We document the decision so the auditor sees rationale, not preference.',
    },
    {
      question: 'Do you run the security audit yourselves?',
      answer:
        'No, the external audit is always a separate firm. We engineer for audit and run an internal audit pass, where a second engineer reviews against the threat model line by line, but the external auditor is the signal a serious investor or DAO trusts. The Neemo Finance contracts we wrote were audited by Hacken across four rounds, and we coordinate the engagement directly with the firm you choose.',
    },
    {
      question: 'What happens after mainnet deployment?',
      answer:
        'Mainnet is the start of the operate phase, not the end. We monitor pause functions, role changes, and large transfers through Tenderly alerts, respond to incidents on a defined SLA, ship parameter changes through your governance process, and document every privileged call. The engagement runs as long as you need it, with hand-off documentation so an in-house team can take over cleanly.',
    },
    {
      question: "Can you upgrade an existing protocol's contracts?",
      answer:
        'Yes, when an upgrade path exists. We work on proxy-based upgradeable systems, write migration scripts for non-upgradeable patterns, and reason about the storage layout before any change ships. Migrations are tested on a mainnet fork against historical state. We do not fork an unfamiliar contract and ship: we read the original audit, the deployment history, and the open issues first.',
    },
    {
      question: 'Do you write contracts in Move for Aptos and Sui?',
      answer:
        'Yes. We wrote the KGEN (Kratos Gamer Network) token contracts in Move on Aptos, covering the rKGEN and KGEN logic in production. Move treats assets as typed resources that cannot be copied or dropped, which removes a class of accounting bug before audit. We choose Move when the resource model materially reduces attack surface, and document why for the auditor.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// defi-protocol-development
// ---------------------------------------------------------------------------

export const defiProtocolDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'defi-protocol-development',
  heroLede:
    'Most DeFi protocols fail at the mechanism, not the code: an interest-rate curve that runs insolvent, an AMM that bleeds liquidity to arbitrage, a liquidation path that never fires. DeFi protocol development services turn that mechanism design into a live, audited product. We engineer the lending markets, AMM pools, perpetual exchanges, and yield vaults that hold real money, plus the keepers and oracles that keep them solvent.',
  heroStats: [
    { value: '1 month', label: 'Yield + banking module', context: 'OrbitXpay' },
    { value: '4', label: 'Hacken audit rounds', context: 'Neemo Finance' },
    { value: 'EVM · Solana · Cosmos', label: 'Chains we ship on' },
  ],
  deliverables: [
    {
      label: 'Core mechanism contracts: lending, AMM, perp, or vault logic.',
    },
    {
      label: 'Oracle integration with fallback feeds and circuit-breaker thresholds.',
    },
    {
      label: 'Keeper infrastructure for liquidations, settlements, and rebalancing.',
    },
    {
      label: 'Subgraph or indexer powering health metrics and frontend data.',
    },
    {
      label: 'Mainnet deployment scripts, multisig handover, and a parameter runbook.',
    },
  ],
  phases: [
    {
      title: 'Mechanism spec',
      body: 'We translate the economic intent into a written specification: interest-rate curves, collateral factors, the constant-product or stableswap invariant, funding-rate logic, liquidation incentives, and fee splits. Each parameter carries a stated range, a rationale, and a failure mode. The spec becomes the engineering brief and the first document the external auditor reads.',
    },
    {
      title: 'Contracts & off-chain',
      body: 'We build the mechanism contracts against the spec while the keepers, indexer, and oracle layer go in parallel. Property-based tests assert the invariants that matter: solvency, accounting conservation, and role isolation. Fork tests replay the protocol against historical mainnet state, so liquidation and settlement paths are exercised before mainnet, not after.',
    },
    {
      title: 'Audit & hardening',
      body: 'The contract suite goes to a firm chosen with you. We respond to findings within 48 hours and ship fixes against a second-round review. Our Neemo Finance lending and AMM contracts cleared four separate Hacken audit rounds on Astar. Oracle assumptions, keeper failure modes, and admin-role boundaries are documented for the auditor before review opens.',
    },
    {
      title: 'Launch & operate',
      body: 'Mainnet deployment runs from a reviewed script. We verify sources on the explorer, transfer admin to your multisig, and start keeper and indexer services under monitoring. After launch we run incident response on a defined SLA, ship parameter changes through governance, and hand over runbooks. For OrbitXpay we delivered yield protocols and a banking module inside one month.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Language' },
    { name: 'Vyper', category: 'Language' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Chainlink', category: 'Oracles' },
    { name: 'Pyth', category: 'Oracles' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'Gelato', category: 'Keepers' },
    { name: 'Tenderly', category: 'Monitoring' },
    { name: 'Slither', category: 'Static Analysis' },
  ],
  fit: {
    fits: [
      'You have a lending, AMM, perp, or vault mechanism and need the contracts, keepers, and oracles built together.',
      'External audit is part of the launch budget, and solvency under stress is a hard requirement.',
      'The protocol has a definable oracle source, liquidation model, and admin-role boundary.',
    ],
    doesNotFit: [
      'You want to fork an existing AMM or lending market and rebrand it without economic review.',
      'The token needs a launchpad or sale mechanic, not an operating financial protocol.',
      'Off-chain keeper and indexer work is expected to be handled by a separate vendor.',
    ],
  },
  aeoAnswer:
    'DeFi protocol development services are an on-chain financial engineering practice for protocol founders that ships audited lending, AMM, perpetual, and yield-vault mechanisms with the keepers and oracles that keep them solvent. Our Neemo Finance lending and AMM contracts cleared four separate Hacken audit rounds on Astar. For OrbitXpay we delivered yield protocols and a banking module in one month.',
  keyConcepts: [
    {
      term: 'Constant-product market maker',
      definition:
        'A constant-product market maker is an automated market maker that prices a swap so the product of its two pool reserves stays constant: x times y equals k. Each trade moves reserves along the curve, and the price is the ratio of reserves. Larger trades against a thin pool incur more slippage, which is the basis of AMM price discovery.',
    },
    {
      term: 'Health factor',
      definition:
        'A health factor is the ratio of a borrower’s collateral value, weighted by its liquidation threshold, to the value they have borrowed. A health factor above one means the position is solvent; at or below one the position becomes liquidatable. Lending protocols read this value continuously to decide when keepers may seize and repay collateral.',
    },
    {
      term: 'Liquidation',
      definition:
        'Liquidation is the process by which a lending or perpetual protocol closes an undercollateralised position to protect solvency. A keeper or liquidator repays part of the debt and seizes collateral plus a bonus. Reliable liquidation depends on a fresh oracle price and a keeper that fires before the position goes underwater.',
    },
    {
      term: 'Yield vault',
      definition:
        'A yield vault is a smart contract that pools deposits and routes them into a strategy that earns return, then distributes that return to depositors as share appreciation. Vaults abstract gas and rebalancing away from the user. The core risks are strategy failure, oracle manipulation on the share price, and the keeper that triggers compounding.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'OrbitXpay: on-chain yield and banking module',
      summary:
        'Yield protocols and an integrated banking module delivered in one month, pairing DeFi mechanism contracts with a user-facing balance and payments layer.',
      href: '/work/orbitx',
    },
    {
      descriptor: 'Neemo Finance: Astar lending and AMM protocol',
      summary:
        'Lending and AMM contract suite for a DeFi protocol on Astar that cleared four separate Hacken audit rounds before mainnet.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'liquid-staking-vaults' },
    { pillar: 'web3', slug: 'tokenomics-design' },
  ],
  faqs: [
    {
      question: 'What are DeFi protocol development services?',
      answer:
        'DeFi protocol development services build the on-chain financial mechanism a protocol runs on: lending markets, AMM pools, perpetual exchanges, or yield vaults. The work covers the mechanism specification, the contracts that enforce it, the oracles that price collateral, and the keepers that handle liquidations and settlements. We engineer for third-party audit from the first commit rather than retrofitting it later.',
    },
    {
      question: 'How long does a DeFi protocol take from spec to mainnet?',
      answer:
        'Most protocols ship to mainnet 12 to 20 weeks from a written spec. The mechanism spec and threat model take 2 to 3 weeks. Contracts and off-chain infrastructure run 6 to 10 weeks in parallel. External audit and hardening add 4 to 6 weeks depending on findings. For OrbitXpay we delivered yield protocols and a banking module inside one month against a tightly scoped mechanism.',
    },
    {
      question: 'Which chains do you work on?',
      answer:
        'We ship across EVM chains, Solana, and Cosmos. Chain choice follows the protocol: liquidity depth, oracle availability, transaction cost, and the wallet ecosystem your users already hold. We do not push founders toward a chain we prefer. For protocols that must live on more than one chain, we engineer for it from the spec rather than retrofitting a bridge later.',
    },
    {
      question: 'How do you keep a lending or perp protocol solvent?',
      answer:
        'Solvency is engineered into the mechanism, not bolted on. We model interest-rate and funding curves so the protocol stays collateralised under stress, integrate oracles with fallback feeds and circuit breakers, and run keepers that liquidate before a position goes underwater. Property-based tests assert solvency as an invariant, and fork tests replay the liquidation path against real historical market moves.',
    },
    {
      question: 'Who chooses the audit firm?',
      answer:
        'You do, with our recommendation. We have worked with Hacken across four audit rounds on the Neemo Finance lending and AMM contracts and can introduce firms whose specialism matches your mechanism, whether that is lending, AMMs, or perpetuals. We do not bundle audit cost into our fee or take a referral cut. The audit is a separate line item paid directly to the firm.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// tokenomics-design
// ---------------------------------------------------------------------------

export const web3TokenomicsDesign: LeafContent = {
  pillar: 'web3',
  slug: 'tokenomics-design',
  heroLede:
    'Most tokenomics models hold up in the whitepaper and break under real participant behaviour. We simulate supply, emissions, and incentives against thousands of self-interested actors, then stress-test the economics until the design holds and is defended before launch, not patched after.',
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
      body: 'We write down what the token is for (coordination, governance, fee accrual, or distribution), then capture constraints: fundraise size, investor vesting, regulatory posture, and target-chain economics. The output is a one-page brief every model variant has to pass.',
    },
    {
      title: 'Model & stress-test',
      body: 'We build an agent-based simulation in Python with stylised actors: long-term holders, mercenary stakers, governance voters, and arbitrageurs. Supply curves, emissions, and fees run against 10,000 trajectories, naming where the protocol turns inflationary, where governance captures, and where staking yields collapse.',
    },
    {
      title: 'Paper, defence & handoff',
      body: 'We write the tokenomics paper and defend it in founder sessions against challenge questions: cliff-edge dumps, governance capture, runaway emissions. On sign-off we map emissions, vesting cliffs, and fee splits to the contracts that enforce them.',
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
      'The token is decorative: no staking, no governance, no fee accrual, no real economic role.',
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
        'An agent-based simulation models a token economy by simulating individual participants (long-term holders, mercenary stakers, governance voters, arbitrageurs) and observing emergent outcomes. Unlike closed-form models, it surfaces second-order effects such as governance capture, mercenary capital flight, and feedback loops between incentives and behaviour.',
    },
    {
      term: 'Sensitivity analysis',
      definition:
        'A sensitivity analysis tests how protocol outcomes change when input parameters move. In tokenomics it identifies the parameters most likely to destabilise the model: emission rates, staking yields, vesting cliffs, fee splits. The analysis surfaces which assumptions a launch is most exposed to.',
    },
  ],
  relatedWork: [],
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
        'In practice the two terms are used interchangeably. Tokenomics is the practical economic design of a single token: its supply, distribution, vesting, emissions, fee accrual, and governance. Token economics is the broader academic discipline that studies token-based systems, including market structure, network effects, and incentive design. Founders shopping for a vendor are almost always asking for tokenomics work.',
    },
    {
      question: 'Do I need a tokenomics audit before launching a token?',
      answer:
        "If you're raising or listing, yes. A tokenomics audit is the analytical companion to a smart-contract audit: it stress-tests the economic model against participant behaviour, so the supply curve, emission schedule, and vesting design defend themselves under attack. Investors and exchanges increasingly request it. The audit either confirms the existing design or surfaces the parameters that need to change before launch.",
    },
    {
      question: 'How much does a tokenomics engagement cost?',
      answer:
        'Cost follows scope. The main drivers are how many token mechanisms we model (staking, governance, fee accrual, vesting), how many scenario trajectories and stress dimensions the simulation covers, and whether the work is bundled with smart-contract engineering. We quote a fixed price after the intent-and-constraints week, once the model surface is known. We do not publish a flat rate because a single-mechanism token and a multi-mechanism protocol are different bodies of work.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// nft-marketplace-development
// ---------------------------------------------------------------------------

export const nftMarketplaceDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'nft-marketplace-development',
  heroLede:
    'Most NFT marketplaces are forked storefronts that leak royalties, break under a high-volume drop, and never pass a security review. NFT marketplace development is the full-stack engineering practice that builds the contracts, indexer, frontend, and operator tooling a creator platform trades on, with royalty enforcement and lazy minting designed in and engineered for third-party audit.',
  heroStats: [
    { value: 'EVM', label: 'chains we engineer on', context: 'Polygon and other EVM networks' },
    { value: '4,444', label: 'NFTs shipped on-chain', context: 'Pluto Misfits collection, Polygon' },
    { value: 'Audit-ready', label: 'contract suites', context: 'engineered for third-party review' },
  ],
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
      label: 'Marketplace frontend with wallet, mint, list, bid, and operator dashboard.',
    },
    {
      label: 'Moderation and curation tooling for editorial drops, takedowns, and royalty disputes.',
    },
  ],
  phases: [
    {
      title: 'Marketplace spec & economics',
      body: 'We start with what the marketplace sells. Curated drops, open editions, secondary trading, creator royalties, fees, and dispute handling each carry different contract and operations implications. We write a spec that pins down every policy: the royalty enforcement model, fee splits, takedown rules, and KYC posture. The spec is the brief for engineering and the operator playbook.',
    },
    {
      title: 'Contracts & indexer',
      body: 'Contracts are built against the spec: escrow, lazy-mint, royalty hook, operator roles, and bidding logic, with property-based and fork tests. In parallel we build the indexer and search layer. Listings, transfers, and metadata are read from chain into a search index the frontend hits, so the frontend never reads chain directly and stays fast under load.',
    },
    {
      title: 'Audit & frontend',
      body: 'The contract suite goes to a firm chosen with you while we ship the marketplace frontend, the operator dashboard, and the moderation tools. Audit findings ship into the suite before mainnet, and the frontend release is gated on the audit clearing. Wallet integration covers MetaMask and WalletConnect, and creator onboarding flows live behind feature flags.',
    },
    {
      title: 'Launch & operate',
      body: 'Mainnet launch starts with a private window for creators and curators, then opens publicly once the operator has handled the first wave of moderation, fee disputes, and curation. We monitor the indexer, the contracts, and search latency. We ship feature work and operator tooling for the length of the engagement, with handover documentation at the end.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Contracts' },
    { name: 'ERC-721 / 1155', category: 'Token Standards' },
    { name: 'Polygon / EVM', category: 'Chains' },
    { name: 'IPFS', category: 'Metadata' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'Meilisearch', category: 'Search' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'WalletConnect', category: 'Wallets' },
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
    'NFT marketplace development is a full-stack engineering service for creator platforms that produces audit-ready marketplace contracts, an indexer, a frontend, and operator tooling. Royalty enforcement and lazy minting are designed into the contract layer, not bolted on afterwards. We engineer NFT contracts on Polygon and other EVM chains, including the 4,444-piece Pluto Misfits collection.',
  keyConcepts: [
    {
      term: 'Royalty enforcement',
      definition:
        'Royalty enforcement is the mechanism that pays a creator a percentage of each secondary sale of their NFT. EIP-2981 declares the royalty on-chain, but most chains do not force marketplaces to honour it. A marketplace enforces royalties at its own contract layer, paying creators on every sale routed through it.',
    },
    {
      term: 'Lazy minting',
      definition:
        'Lazy minting is a pattern where an NFT is not written to chain until it is first bought. The creator signs an off-chain coupon describing the token; the buyer redeems it, and the mint and the sale settle in one transaction. It lets creators list large collections without paying gas up front.',
    },
    {
      term: 'NFT indexer',
      definition:
        'An NFT indexer reads ownership, listing, transfer, and metadata events from chain into a queryable database. Marketplaces use an indexer so the frontend can filter, sort, and search collections in milliseconds rather than scanning the chain. It is the layer that makes discovery and per-collection analytics possible.',
    },
    {
      term: 'Token standard',
      definition:
        'A token standard is the contract interface an NFT implements. ERC-721 represents unique single-edition tokens; ERC-1155 represents multi-edition and mixed fungible-and-non-fungible tokens in one contract. The standard a collection chooses determines how it mints, transfers, and reports royalties, and which marketplaces can list it.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'Pluto Misfits: 4,444-piece NFT collection on Polygon',
      summary:
        'A 4,444-supply NFT collection engineered and shipped on Polygon: contract, minting, and on-chain metadata for the full edition.',
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
      question: 'Have you built an NFT marketplace before?',
      answer:
        'We build marketplaces on the same foundation our other Web3 work stands on: audited smart contracts and full-stack product engineering. Our direct NFT experience is contract and collection work, including Pluto Misfits, a 4,444-piece collection on Polygon. The marketplace layer, escrow, royalties, lazy minting, and the indexer, is engineered from that contract foundation, not forked from an existing storefront.',
    },
    {
      question: "Do you support royalty enforcement on chains that don't enforce it?",
      answer:
        "Yes, within the limits of the chain. On chains that ignore EIP-2981 by default, we enforce royalties at the marketplace contract layer: listings created on your marketplace honour the royalty, listings created elsewhere cannot. We document the limit so creators understand what the marketplace can and cannot guarantee, and operators set listing policy explicitly rather than implying a guarantee that the chain won't keep.",
    },
    {
      question: 'What chains do you build NFT marketplaces on?',
      answer:
        "We engineer on EVM chains, including Polygon, where we shipped the Pluto Misfits collection. Chain choice follows your creator base, gas profile, and the wallet ecosystem your users already use. Multi-chain marketplaces are engineered from the contract layer up, with the indexer and frontend abstracting the chain so users don't manage a chain switcher. We won't push a chain we prefer over the one your audience is on.",
    },
    {
      question: 'How do you handle moderation and takedowns?',
      answer:
        'Operator-controlled and contractually scoped. Operators can pause listings, freeze a token, or remove a listing through a role-gated function, and the contract logs every moderation action on-chain so creators can audit operator behaviour. The moderation dashboard handles queueing, review notes, and the takedown reasons the operator publishes alongside the moderated content. Moderation power is bounded by the spec, not unlimited admin control.',
    },
    {
      question: 'Do you build the operator dashboard, or do you expect us to?',
      answer:
        "Included. The operator dashboard is core scope: listing management, the moderation queue, fee splits, royalty disputes, and per-collection analytics. We don't ship a marketplace and leave you to build the back office. The dashboard is engineered for your moderators and curators as a working operations surface, not a developer-facing console, so the team running the marketplace can run it without us.",
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// liquid-staking-vaults
// ---------------------------------------------------------------------------

export const liquidStakingVaults: LeafContent = {
  pillar: 'web3',
  slug: 'liquid-staking-vaults',
  heroLede:
    'Most liquid staking forks copy the receipt token and skip the part that breaks: slashing-aware accounting under real validator load. Liquid staking and vault development is the smart-contract practice that issues a transferable receipt token for staked assets, then routes validators, tracks the exchange rate, and defends the vault against slashing before mainnet.',
  heroStats: [
    { value: '~$20M', label: 'TVL engineered', context: 'nsASTR on Astar' },
    { value: '4', label: 'Hacken audit rounds', context: 'cleared on staking work' },
    { value: 'Memestakes', label: 'in-house vault product', context: 'tax-funded meme staking' },
  ],
  deliverables: [
    {
      label: 'Vault contracts with validator routing and slashing-aware exchange-rate accounting.',
    },
    {
      label: 'Liquid receipt token: rebasing or wrapped, composable by downstream DeFi.',
    },
    {
      label: 'Restaking and validator-rotation logic with an exit-queue model.',
    },
    {
      label: 'Oracle and exchange-rate feed plus risk controls for slashing and depeg.',
    },
    {
      label: 'Mainnet deployment scripts, multisig handover, and a parameter runbook.',
    },
  ],
  phases: [
    {
      title: 'Validator & vault spec',
      body: 'We pin down the receipt-token mechanic and the validator-set strategy first. Rebasing or wrapped, in-protocol or external validator selection, exit-queue model, restaking posture, and how the exchange rate accrues are decided here. The spec covers routing logic, fee splits, and the slashing boundary between the vault and the staking layer. It is the document the auditor reads first.',
    },
    {
      title: 'Contracts & keepers',
      body: 'We build the vault contracts and the off-chain keepers in parallel. Property-based tests cover the accounting invariants: total receipt supply, validator-side balance, and exchange-rate monotonicity. Fork tests run the vault against real validator data and simulated slashing. Keepers handle rotation, restaking, and exit-queue processing, and the two pieces are tested as one system before audit.',
    },
    {
      title: 'Audit & integration',
      body: 'The contract suite goes to external audit while we ship the operator dashboard and the integration SDK. Downstream DeFi composing your receipt token needs the exchange-rate adapter and a clear guide, so that lands with the audit rather than after. Findings feed a second-round review; our staking contracts have cleared four Hacken audit rounds on prior work.',
    },
    {
      title: 'Mainnet & operate',
      body: 'Mainnet deployment runs from a reviewed script. Validators are routed to, the receipt token is live, the oracle feed publishes, and keepers run under monitoring. We respond to slashing events, validator-set changes, and exit-queue load through the operate phase. nsASTR currently runs at roughly twenty million dollars in TVL on Astar, the operating envelope we engineer for.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Contracts' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Astar / EVM', category: 'Chains' },
    { name: 'Gelato', category: 'Keepers' },
    { name: 'Chainlink', category: 'Oracles' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'Tenderly', category: 'Monitoring' },
    { name: 'TypeScript', category: 'SDK' },
  ],
  fit: {
    fits: [
      "You're shipping a liquid staking or restaking product and need contracts, keepers, and oracle wiring in one engagement.",
      'Receipt-token composability matters: DeFi protocols integrate your token and need an exchange-rate adapter and SDK.',
      'Budget covers external audit and the operate-phase keeper, oracle, and monitoring work, not just contract delivery.',
    ],
    doesNotFit: [
      'You want to fork an existing liquid staking codebase and deploy it on a new chain unchanged.',
      'Validator selection is fixed to one operator with no rotation, no restaking, and no exit queue.',
      'The vault is a throwaway mechanic for a token launch with no long-term operate-phase requirement.',
    ],
  },
  aeoAnswer:
    'Liquid staking and vault development is a smart-contract practice for protocol founders that issues a transferable receipt token in exchange for staked assets while keeping them liquid. Metaborong engineered nsASTR, a liquid staking product at roughly twenty million dollars in TVL on Astar, and built Memestakes, an in-house meme-coin staking vault. Our staking contracts have cleared four Hacken audit rounds.',
  keyConcepts: [
    {
      term: 'Liquid staking token',
      definition:
        'A liquid staking token (LST) is a transferable receipt minted when an asset is staked. It represents the staked principal plus accrued rewards, so holders earn yield while keeping a tradable token they can lend, supply as collateral, or use across DeFi instead of locking the underlying.',
    },
    {
      term: 'Restaking',
      definition:
        'Restaking is the reuse of an already-staked asset, or its liquid staking token, to secure additional protocols in exchange for extra rewards. A liquid restaking token (LRT) represents this layered position. It raises yield but compounds slashing exposure, since one position now backs more than one network.',
    },
    {
      term: 'Validator routing',
      definition:
        'Validator routing is the vault logic that distributes staked assets across a validator set and rebalances over time. Routing targets uptime, decentralization, and slashing risk rather than raw yield. An exit queue governs unstaking so withdrawals settle in order without forcing the vault to unwind every validator at once.',
    },
    {
      term: 'Exchange rate',
      definition:
        'The exchange rate is the ratio between a liquid staking token and the underlying staked asset. It rises as rewards accrue and falls when slashing burns value. A non-rebasing vault holds the receipt supply fixed and lets this rate climb; an oracle publishes it so downstream protocols price the token correctly.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'nsASTR liquid staking vault on Astar',
      summary:
        'Liquid staking vault issuing the nsASTR receipt token on Astar, operating at roughly twenty million dollars in TVL with validator routing and slashing-aware accounting.',
      href: '/work',
    },
    {
      descriptor: 'Memestakes in-house meme-coin vault',
      summary:
        'Metaborong-built liquid staking vault for meme coins, funding rewards from token tax and issuing a liquid vault token holders can trade while staked.',
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
      question: 'What is the difference between liquid staking and a vault?',
      answer:
        'Liquid staking is the mechanic: you stake an asset and receive a transferable receipt token that keeps earning rewards. The vault is the smart-contract system that makes it work, holding the staked assets, routing validators, tracking the exchange rate, and processing the exit queue. A liquid restaking vault adds a layer, reusing the staked position to secure extra protocols for additional yield.',
    },
    {
      question: 'How do you handle slashing risk in the receipt token?',
      answer:
        'Slashing-aware accounting is part of the vault contracts from day one. When a validator is slashed, the loss propagates into the exchange rate through an accounting hook rather than being deferred or socialized opaquely. The vault logs every slashing event on-chain so depositors and downstream DeFi see exactly what happened. Validator routing spreads exposure across the set, and insurance integration is optional, not assumed.',
    },
    {
      question: 'Do you run the validators?',
      answer:
        'No. Validator operations sit with your team, an in-house operator, or a delegate set you choose. We engineer the vault, the keepers, the receipt token, the oracle feed, and the integrations. We document the interface contracts between the vault and the validator layer so an operator can plug in without contract changes, and the routing logic targets uptime and decentralization rather than a single operator.',
    },
    {
      question: 'How does the receipt token integrate with downstream DeFi?',
      answer:
        'Two paths. Rebasing, where the balance changes as rewards accrue, shipped with adapter contracts for integrations that do not handle rebasing natively. Or wrapped non-rebasing, where a wrapper holds the rebasing token and exposes a fixed-supply share whose exchange rate climbs. An oracle publishes that rate so lending markets and DEXes price it correctly. We ship the SDK and integration docs so DeFi teams adopt the token without back-and-forth.',
    },
    {
      question: 'Can you migrate or upgrade an existing liquid staking vault?',
      answer:
        'Yes, when an upgrade path or migration contract is feasible. We audit the existing vault, draft a migration plan that preserves user balances and downstream integrations, and run the migration against a forked node before mainnet. We have shipped both proxy-based upgrades and migration-contract approaches across our staking work, including nsASTR on Astar and our in-house Memestakes vault.',
    },
  ],
  lastReviewed: '2026-06-04',
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
    'Most identity systems force a trade between proving who a user is and protecting what they reveal. Decentralized identity and ZKP development is the engineering practice that issues claims as W3C verifiable credentials a user holds, then proves them with zero-knowledge against a DID-anchored key, so a verifier trusts the claim without the raw data. We build the DID methods, credential layer, and ZK circuits that make it work.',
  heroStats: [
    { value: 'Sedax', label: 'ZKP + DID infrastructure', context: 'partner build we delivered' },
    { value: 'W3C VC', label: 'verifiable credential model', context: 'portable across identity systems' },
    { value: 'Aadhaar', label: 'live eKYC integration', context: 'one angle, not the ceiling' },
  ],
  deliverables: [
    {
      label: 'Verifiable credential issuer wired to your trusted source, including Aadhaar eKYC.',
    },
    {
      label: 'DID resolver and method, chain-anchored or key-based, in the W3C VC format.',
    },
    {
      label: 'Zero-knowledge circuits for selective disclosure of credential attributes.',
    },
    {
      label: 'Credential revocation, status registry, and holder wallet integration.',
    },
    {
      label: 'Operator dashboard for issuance, revocation, and audit-log review.',
    },
  ],
  phases: [
    {
      title: 'Identity model & spec',
      body: 'We map the trust model first: who issues, who holds, who verifies, which attributes need proving, and what must never be disclosed. Where a regulated source such as Aadhaar is in scope, the UIDAI access pattern, KUA or AUA classification, residency, and consent flows are pinned here. The output is a spec engineering, compliance, and audit teams sign off before any code starts.',
    },
    {
      title: 'DID & credential layer',
      body: 'We build the DID resolver, the verifiable-credential issuer, and the verifier. Credentials follow the W3C VC data model with proof formats portable across identity systems. The DID method is chosen by context: chain-anchored where on-chain attestation matters, key-based where it does not. This is the layer we engineered with Sedax, whose ZKP and DID infrastructure we built end to end.',
    },
    {
      title: 'ZKP & selective disclosure',
      body: 'We write the zero-knowledge circuits so a holder proves a claim without revealing the data behind it: age over 18, residency, or a verified eKYC status. On our live Aadhaar integration that means proving an attribute without exposing the number or document. Hardening covers replay protection on signed attestations, enumeration rate-limits, and issuer key rotation.',
    },
    {
      title: 'Pilot & scale',
      body: 'We launch behind a feature flag with a controlled cohort. The operator dashboard surfaces issuance volume, verification latency, revocation activity, and audit-log queries. Verification is local against the issuer DID key, so it scales without a live call to the source on every check. The system ships ready for production workloads and the audit posture they require.',
    },
  ],
  techStack: [
    { name: 'W3C VC', category: 'Standards' },
    { name: 'did:ethr / did:key', category: 'DID Methods' },
    { name: 'Circom', category: 'ZK Circuits' },
    { name: 'snarkjs', category: 'ZK Proving' },
    { name: 'Aadhaar eKYC', category: 'Identity Rail' },
    { name: 'Solidity', category: 'Anchoring' },
    { name: 'Node.js', category: 'Issuer' },
    { name: 'Postgres', category: 'Audit Log' },
    { name: 'TypeScript', category: 'SDK' },
  ],
  fit: {
    fits: [
      'You need privacy-preserving identity: verifiable credentials and zero-knowledge proofs instead of raw data exchange.',
      'A regulated or eKYC-backed source such as Aadhaar must be provable without storing or re-sending the record.',
      'Consent, revocation, and audit logging are first-order requirements, not afterthoughts.',
    ],
    doesNotFit: [
      'You want a national-ID system built from scratch, an identity-source replacement rather than integration.',
      'Raw identity data must be stored on chain or in plaintext for analytics or business logic.',
      'There is no compliance workstream and the engagement assumes a clean regulatory path.',
    ],
  },
  aeoAnswer:
    'Decentralized identity and ZKP development is a verifiable-credentials engineering service for teams that need identity proofs without exposing raw data. We build DID methods, W3C verifiable credentials, and zero-knowledge selective-disclosure circuits. We built the ZKP and DID infrastructure for our partner Sedax, including a live Aadhaar-scale eKYC integration that proves attributes without revealing the record.',
  keyConcepts: [
    {
      term: 'Verifiable credential',
      definition:
        "A verifiable credential is a tamper-evident digital claim, defined by the W3C, that an issuer signs and a holder stores and presents. A verifier checks the issuer signature cryptographically without contacting the issuer, so the raw record stays in the issuer's custody while the proof travels with the user.",
    },
    {
      term: 'Decentralized identifier',
      definition:
        'A decentralized identifier (DID) is a globally unique identifier that resolves to a DID document holding public keys and service endpoints, with no central registry required. DID methods such as did:ethr anchor to a chain, while did:key stay off-chain. The DID-anchored key is what a verifier uses to check a credential signature.',
    },
    {
      term: 'Zero-knowledge proof',
      definition:
        'A zero-knowledge proof is a cryptographic method by which one party proves a statement is true without revealing the data behind it. In identity work, a ZK circuit can attest that a holder is over 18 or resident in a state without disclosing the date of birth or address itself, keeping attributes private at verification time.',
    },
    {
      term: 'Selective disclosure',
      definition:
        'Selective disclosure is the ability to reveal only the specific attributes a verifier needs from a credential, hiding the rest. A holder can present proof of state residency without exposing the full address or identifier. It is implemented with zero-knowledge proofs or signature schemes built for partial revelation.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'Sedax: ZKP and DID infrastructure',
      summary:
        "As a partner we built Sedax's zero-knowledge-proof and decentralized-identity infrastructure: the credential layer, DID methods, and ZK circuits behind selective disclosure, including a live Aadhaar eKYC integration.",
      href: '/work/sedax',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
    { pillar: 'product-studio', slug: 'b2b-multi-tenant-platforms' },
  ],
  faqs: [
    {
      question: 'What is decentralized identity and how do verifiable credentials work?',
      answer:
        "Decentralized identity lets a user hold their own credentials instead of a provider holding them. An issuer signs a W3C verifiable credential, the holder stores it, and a verifier checks the issuer's signature against a DID-anchored key with no call back to the issuer. The raw data stays in the issuer's custody while the proof travels with the user.",
    },
    {
      question: 'How do zero-knowledge proofs keep identity attributes private?',
      answer:
        'A zero-knowledge proof lets a holder prove a statement, age over 18, residency, or a verified eKYC status, without revealing the underlying data. We write the circuits so the verifier learns only the answer, not the document or number behind it. This is the ZKP infrastructure we built for our partner Sedax, applied on a live Aadhaar integration.',
    },
    {
      question: 'Does this work with Aadhaar and other national-ID systems?',
      answer:
        'Yes. The DID and verifiable-credentials layer is portable across identity systems; Aadhaar is the most demanding integration we ship, not the only one. The same credential layer supports passport, driver-license, and institution-issued credentials. For Aadhaar specifically we integrate UIDAI eKYC, OTP, and offline QR through your authorized KUA or AUA registration.',
    },
    {
      question: 'Do you work directly with UIDAI?',
      answer:
        "We integrate against UIDAI's published interfaces, eKYC, OTP, and offline-mode QR, through your authorized KUA or AUA registration. We do not claim direct UIDAI partnership. The compliance and access registration is owned by your team or your KUA partner; we engineer against the access pattern they secure and document the integration cleanly for audit review.",
    },
    {
      question: 'What does a decentralized identity engagement cost?',
      answer:
        'Cost follows scope. The main drivers are how many credential types you issue, whether zero-knowledge selective disclosure is in scope, the DID method and chain anchoring, and the depth of any regulated-source or compliance workstream. We quote a fixed price after the spec phase, once the verification surface is set. We do not publish a flat rate.',
    },
  ],
  lastReviewed: '2026-06-04',
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
    'Most token launches break at the contract that holds the money: a forked sale with no audit, weak anti-bot defence, and a vesting calendar that does not match the whitepaper. Token launchpad development is the smart-contract engineering practice that builds the platform a project sells and distributes its token through, from bonding-curve or fair-launch sale mechanics to the on-chain vesting calendar, engineered for third-party audit.',
  heroStats: [
    { value: 'Anti-bot', label: 'sale protection', context: 'allowlist + per-wallet caps' },
    { value: 'EVM + Solana', label: 'chains we ship on' },
    { value: 'Coin-it', label: 'launchpad shipped', context: 'bonding curve to DEX' },
  ],
  deliverables: [
    {
      label: 'Token sale contracts: fixed-price, fair-launch, or bonding-curve, with allowlist and per-wallet caps.',
    },
    {
      label: 'Vesting and distribution contracts mapping the cliff and unlock calendar on-chain.',
    },
    {
      label: 'Anti-bot and anti-snipe controls, rate limits, and KYC or allowlist gating.',
    },
    {
      label: 'Sale frontend, claim portal, and operator dashboard for caps, phases, and treasury.',
    },
    {
      label: 'Secondary-market graduation: liquidity bootstrap and DEX listing once the curve completes.',
    },
  ],
  phases: [
    {
      title: 'Sale & distribution spec',
      body: 'We pin down the sale model (fixed price, fair launch, or bonding curve) plus vesting, per-wallet caps, allowlist policy, KYC posture, and the graduation path to a DEX. Each parameter carries a stated range and a failure mode. The spec is the document an auditor reads first.',
    },
    {
      title: 'Contracts & frontend',
      body: 'We build the sale, vesting, and distribution contracts against the spec with property-based and fork tests, alongside the sale frontend, claim portal, and operator dashboard. Anti-bot and anti-snipe controls are exercised against simulated sniping before the contracts go to audit.',
    },
    {
      title: 'Audit, launch & graduation',
      body: 'The contract suite goes to a firm chosen with you. We respond to findings against a second-round review and run the sale from a reviewed deployment script. When a bonding-curve sale completes, we bootstrap secondary-market liquidity and migrate trading to a DEX, the path we built for Coin-it.',
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
    { name: 'Uniswap', category: 'DEX' },
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
      'There is no tokenomics model behind the sale yet: start with tokenomics design first.',
    ],
  },
  aeoAnswer:
    'Token launchpad development is a smart-contract engineering service for teams launching a token that need the sale, vesting, and distribution contracts built and audited rather than forked. It covers fair-launch, bonding-curve, and allowlist mechanics with anti-bot controls. We built Coin-it, a bonding-curve launchpad that graduates each token to a secondary DEX once the curve completes.',
  keyConcepts: [
    {
      term: 'Bonding curve',
      definition:
        "A bonding curve is a smart-contract pricing mechanism where a token's price is a fixed mathematical function of its circulating supply. Each purchase mints tokens and moves the price up the curve; each sale burns tokens and moves it down. Launchpads use bonding curves to bootstrap liquidity without an order book.",
    },
    {
      term: 'Fair launch',
      definition:
        'A fair launch is a token distribution where no tokens are pre-sold or pre-allocated to insiders before the public sale. Supply is released to all participants on equal terms at launch (often through a bonding curve or a capped public sale) to avoid concentrated early ownership.',
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
    {
      term: 'Graduation',
      definition:
        'Graduation is the point at which a bonding-curve token migrates from the launchpad to a public DEX. Once the curve reaches a funding threshold, the accumulated liquidity is deployed to a trading pool, for example on Uniswap, and price discovery moves from the curve to the open market.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'Coin-it: bonding-curve token launchpad',
      summary:
        'A pump.fun-style launchpad with bonding-curve pricing that graduates each token to a secondary DEX like Uniswap once the curve completes.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'tokenomics-design' },
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
  ],
  faqs: [
    {
      question: 'What is a token launchpad?',
      answer:
        'A token launchpad is the on-chain platform a project uses to sell and distribute its token. It handles the sale mechanics (fixed price, fair launch, or bonding curve) plus allowlists, per-wallet caps, vesting, and the claim flow after the sale. We build launchpads as audited smart-contract systems, not forks.',
    },
    {
      question: 'What does it cost to build a token launchpad?',
      answer:
        'Cost follows scope. The main drivers are the sale model (a fixed-price sale is simpler than a bonding curve that graduates to a DEX), whether vesting, anti-bot controls, and a claim portal are in scope, and whether the launch contracts go to external audit. We quote a fixed price after the spec phase, once the sale mechanics and audit scope are set. We do not publish a flat rate.',
    },
    {
      question: 'What happens when the bonding curve completes?',
      answer:
        'At a set funding threshold the token graduates: the liquidity accumulated on the curve is deployed to a public DEX pool, for example on Uniswap, and trading moves from the launchpad to the open market. We built this bonding-curve-to-DEX graduation for Coin-it. The threshold, the pool, and the fee tier are parameters set in the spec phase.',
    },
    {
      question: 'How do you prevent bots and snipers in a token sale?',
      answer:
        'Through contract-level controls: per-wallet and per-transaction caps, allowlist gating, and commit-reveal or batch-auction patterns where they fit the sale. We exercise these against simulated sniping before audit. No control is absolute, so we document the trade-offs and tune them to the sale model rather than promising a bot-proof launch.',
    },
    {
      question: 'Is the launch contract audited?',
      answer:
        'Yes. Launch contracts hold sale proceeds and enforce vesting, so they go to an external audit before the public sale, the same process behind the four Hacken audit rounds our smart-contract work has cleared. We respond to findings and ship fixes against a second-round review.',
    },
  ],
  lastReviewed: '2026-06-04',
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
