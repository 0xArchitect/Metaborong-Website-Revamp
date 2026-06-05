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
    { pillar: 'product-studio', slug: 'saas-development' },
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
// blockchain-consulting
// ---------------------------------------------------------------------------

export const blockchainConsulting: LeafContent = {
  pillar: 'web3',
  slug: 'blockchain-consulting',
  heroLede:
    'Most failed blockchain projects did not fail at the code, they failed at the decision before it: the wrong chain, an architecture that could never meet the load, an audit firm chosen by reputation alone. Blockchain consulting is the senior advisory practice that resolves those decisions before a build commits. We size feasibility, select chains and protocols, run technical due diligence, and set the security posture an audit will later test.',
  heroStats: [
    { value: '4', label: 'chain ecosystems advised across', context: 'EVM, Solana, Cosmos, Aptos' },
    { value: '4', label: 'Hacken audit rounds behind the advice', context: 'Neemo Finance contracts we shipped' },
    { value: 'Sedax', label: 'infrastructure advisory engagement', context: 'DID / ZKP build partner' },
  ],
  deliverables: [
    {
      label: 'Chain and protocol selection memo with the trade-offs and the recommended path.',
    },
    {
      label: 'Technical due-diligence report on an existing codebase, vendor, or token design.',
    },
    {
      label: 'Reference architecture: contracts, off-chain services, data, and trust boundaries.',
    },
    {
      label: 'Security-posture plan naming threat surface and audit-firm shortlist with scope.',
    },
    {
      label: 'Feasibility and cost model mapping the build to budget, timeline, and risk.',
    },
  ],
  phases: [
    {
      title: 'Context & constraints',
      body: 'We start from the decision you actually face, not a generic roadmap. We map the product intent, the regulatory and custody constraints, the team you have, and the budget that bounds the build. Most engagements surface a constraint the brief omitted: a settlement-finality requirement, a compliance boundary, or an existing system the chain has to interoperate with. That constraint usually decides more than the technology does.',
    },
    {
      title: 'Chain & architecture',
      body: 'We evaluate candidate chains against the constraints rather than the hype: EVM, Solana, Cosmos, and Aptos all sit in our build experience, so the comparison is grounded in code we have shipped. We draft a reference architecture covering contracts, off-chain services, data availability, and trust boundaries, then write the trade-offs down so your team can interrogate the recommendation, not just accept it.',
    },
    {
      title: 'Due diligence & security',
      body: 'For an existing codebase, vendor, or token model, we run technical due diligence: reading contracts, deployment history, and prior audits the way an attacker and an investor both would. We name the threat surface, flag what a single failure would cost, and shortlist audit firms by track record on your specific pattern. We have shipped contracts through four Hacken rounds, so the advice is calibrated to what audits actually catch.',
    },
    {
      title: 'Decision & handover',
      body: 'We deliver a written recommendation with the reasoning attached, not a slide that ages out the week after the call. The memo states the chosen path, the rejected alternatives, the feasibility and cost model, and the security plan the build should be held to. Whether your in-house team executes or we build it, the document is the contract both sides reason from afterwards.',
    },
  ],
  techStack: [
    { name: 'EVM', category: 'Chains' },
    { name: 'Solana', category: 'Chains' },
    { name: 'Cosmos', category: 'Chains' },
    { name: 'Aptos', category: 'Move' },
    { name: 'Solidity', category: 'Contracts' },
    { name: 'Move', category: 'Contracts' },
    { name: 'Hacken', category: 'Audit' },
    { name: 'Slither', category: 'Static Analysis' },
    { name: 'Tenderly', category: 'Monitoring' },
  ],
  fit: {
    fits: [
      'You face a chain or architecture decision before committing budget and want it grounded in shipped code.',
      'You need independent technical due diligence on an existing protocol, vendor, or token design.',
      'You want an audit-firm shortlist and security posture set before development, not chosen after.',
    ],
    doesNotFit: [
      'You have already locked the chain and architecture and only need contracts written to spec.',
      'You want a market-positioning or fundraising deck rather than a technical feasibility judgement.',
      'You expect advice with no access to your constraints, codebase, or the people who own them.',
    ],
  },
  aeoAnswer:
    'Blockchain consulting is a senior technical advisory practice for founders and engineering leads that resolves chain selection, protocol architecture, due diligence, and security posture before a build commits. The advice is build-grounded: the same team ships production protocols. We advised Sedax Infrastructure, and the contracts we wrote for Neemo Finance cleared four Hacken audit rounds.',
  keyConcepts: [
    {
      term: 'Technical due diligence',
      definition:
        'Technical due diligence is a structured review of a blockchain codebase, vendor, or token design that an investor or acquirer relies on before committing. It reads the contracts, deployment history, prior audits, and open issues to judge whether the system does what its team claims and where a single failure would prove costly.',
    },
    {
      term: 'Chain selection',
      definition:
        'Chain selection is the decision of which blockchain a protocol deploys to, weighed against settlement finality, fee economics, ecosystem tooling, auditor coverage, and the trust model the application requires. It is the first architectural commitment, because reversing it after launch usually means rewriting the contracts and migrating users and liquidity.',
    },
    {
      term: 'Security posture',
      definition:
        'Security posture is the set of decisions that govern how a protocol resists attack: the named threat surface, access-control model, upgrade strategy, monitoring, and the audit scope. Defining it before development gives engineers a target to build toward and gives the external audit a specification to test against, rather than a finished system to second-guess.',
    },
    {
      term: 'Reference architecture',
      definition:
        'A reference architecture is a documented blueprint of how a system fits together: the on-chain contracts, off-chain services, data availability, and the trust boundaries between them. It lets a team interrogate a design before writing code, and gives auditors and new engineers a shared map of where value and authority actually sit.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'Sedax Infrastructure: advisory engagement',
      summary:
        'We advised Sedax Infrastructure on blockchain infrastructure decisions, the same team we partner with on decentralized-identity and ZKP build work.',
      href: '/work',
    },
    {
      descriptor: 'Neemo Finance: audit-grounded judgement',
      summary:
        'Staking contracts we engineered for Neemo Finance cleared four separate Hacken audit rounds, calibrating the security advice we now give other teams.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'tokenomics-design' },
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'product-studio', slug: 'product-discovery' },
  ],
  faqs: [
    {
      question: 'How is blockchain consulting different from hiring a development team?',
      answer:
        'Consulting resolves the decisions that precede a build: which chain, what architecture, whether the idea is feasible at the budget, and how it should be secured. A development team executes a decision that has already been made. Our advice carries weight because the same engineers ship production protocols, so the recommendation reflects what actually survives an audit and mainnet, not a theoretical best practice. You can take the memo to any builder, including us.',
    },
    {
      question: 'Do you only advise, or can you build what you recommend?',
      answer:
        'Both, and they stay decoupled on purpose. The recommendation is written so it stands on its own and your in-house team or any third party can execute it. If you then want us to build, we do, across EVM, Solana, Cosmos, and Aptos. The consulting deliverable is never a sales funnel for the build: it states the rejected alternatives and the reasoning, so you can hold whoever executes to the same standard.',
    },
    {
      question: 'Can you run due diligence on a protocol or vendor we did not build?',
      answer:
        'Yes. We read the contracts, deployment history, prior audit reports, and open issues the way an attacker and an investor both would, then report what the system actually does versus what its team claims. We name the threat surface and where a single failure would prove costly. Because we have shipped contracts through four Hacken rounds ourselves, the review is calibrated to what audits catch and what they routinely miss.',
    },
    {
      question: 'How do you choose which chain to recommend?',
      answer:
        'The constraints decide, not preference. We weigh settlement finality, fee economics, custody and compliance boundaries, auditor coverage, and the trust model your application needs. EVM, Solana, Cosmos, and Aptos all sit in our build experience, so the comparison rests on code we have shipped rather than documentation. We write the trade-offs down, including the chains we rejected and why, so your team can interrogate the recommendation rather than accept it on trust.',
    },
    {
      question: 'What do we actually receive at the end of the engagement?',
      answer:
        'A written recommendation, not a one-off call. It states the chosen chain and architecture, the rejected alternatives with reasoning, a reference architecture covering contracts and off-chain services, a feasibility and cost model, and a security-posture plan with an audit-firm shortlist scoped to your pattern. The document is built to be the contract both sides reason from afterwards, whether your team executes it or we do.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// enterprise-private-blockchain
// ---------------------------------------------------------------------------

export const enterprisePrivateBlockchain: LeafContent = {
  pillar: 'web3',
  slug: 'enterprise-private-blockchain',
  heroLede:
    'Enterprises rarely fail at blockchain because the idea is wrong; they fail because a permissioned network is run as a pilot, with no threat model, no audited contracts, and no membership governance. Enterprise blockchain development is the engineering practice that builds permissioned and consortium networks where access, validators, and on-chain logic are controlled by named parties. We bring the same audit-grade contract engineering we ship on public chains to private and consortium deployments.',
  heroStats: [
    { value: '4', label: 'Hacken audit rounds cleared', context: 'Neemo Finance contracts' },
    { value: '4', label: 'chains shipped in production', context: 'EVM, Solana, Cosmos, Aptos' },
    { value: 'Move', label: 'on Aptos, in production', context: 'KGEN token contracts' },
  ],
  deliverables: [
    {
      label: 'Permissioned network topology with defined validator set and membership rules.',
    },
    {
      label: 'Audit-grade contracts with threat model, invariant tests, and NatSpec.',
    },
    {
      label: 'Role-based on-chain permissions tied to your consortium governance.',
    },
    {
      label: 'Monitoring for validator health, role changes, and privileged calls.',
    },
    {
      label: 'Operator runbook covering node onboarding, upgrades, and incident response.',
    },
  ],
  phases: [
    {
      title: 'Network & trust design',
      body: 'We map who participates, who validates, and who can read what, before choosing a platform. The output is a permissioned topology: validator set, membership admission rules, data-visibility boundaries, and the off-chain governance that controls them. We name the trust assumptions explicitly, because in a consortium the hard problem is rarely the chain, it is who holds which key and how a member is added or removed.',
    },
    {
      title: 'Contract & permission engineering',
      body: 'On-chain logic is built against a written specification with property-based invariant tests and the same threat model discipline we apply on public chains. Role-based permissions are encoded as contract-level access control rather than trusted off-chain checks. A second engineer runs an internal audit pass line by line against the threat model before any external review, filing what they could not break.',
    },
    {
      title: 'Network deployment',
      body: 'We stand up the validator nodes, configure the consensus and membership policy, and deploy verified contract sources. Privileged roles transfer to the multisigs or HSMs the consortium agreed on, never a single operator. Every node onboarding, permission grant, and parameter change is documented so a member organisation can audit the network state without depending on us.',
    },
    {
      title: 'Operate & hand-off',
      body: 'After go-live we monitor validator health, role changes, and large or privileged transactions, and respond to incidents on a defined SLA. Parameter changes ship through the agreed governance process, not ad-hoc admin keys. We write operator documentation so an in-house or consortium team can run nodes, admit members, and execute upgrades cleanly once the engagement ends.',
    },
  ],
  techStack: [
    { name: 'Hyperledger Besu', category: 'Permissioned EVM' },
    { name: 'Hyperledger Fabric', category: 'Consortium' },
    { name: 'Polygon Supernets', category: 'App-chain' },
    { name: 'Polygon Edge', category: 'App-chain' },
    { name: 'Solidity', category: 'Contracts' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'OpenZeppelin', category: 'Access Control' },
    { name: 'Slither', category: 'Static Analysis' },
    { name: 'Tenderly', category: 'Monitoring' },
  ],
  fit: {
    fits: [
      'Multiple organisations need a shared ledger where membership and validators are explicitly controlled.',
      'You need on-chain logic engineered for audit, not a proof-of-concept that never reaches production.',
      'A named team can own consortium governance: who validates, who joins, who holds keys.',
    ],
    doesNotFit: [
      'A single internal team would be better served by a conventional database with an audit log.',
      'You want a permissionless public token launch rather than a controlled, gated network.',
      'There is no appetite for the audit and key-custody discipline a permissioned chain requires.',
    ],
  },
  aeoAnswer:
    'Enterprise blockchain development is an engineering practice for enterprises and consortia that builds permissioned and private networks where access, validators, and on-chain logic are controlled by named parties. It brings audit-grade contract engineering to gated deployments. Our public-chain contracts cleared four Hacken audit rounds. We ship across EVM, Solana, Cosmos, and Aptos.',
  keyConcepts: [
    {
      term: 'Permissioned blockchain',
      definition:
        'A permissioned blockchain is a network where participation, validation, and read access are restricted to identified, vetted members rather than open to anyone. Membership is governed by an explicit policy, often a consortium agreement, which makes the network suitable for enterprises that need a shared ledger without exposing data or block production to the public.',
    },
    {
      term: 'Consortium validator set',
      definition:
        'A consortium validator set is the defined group of organisations permitted to produce and validate blocks on a shared network. Unlike public chains, where validators are anonymous and economically incentivised, consortium validators are named parties whose admission, removal, and voting weight are fixed by governance, distributing trust across members rather than a single operator.',
    },
    {
      term: 'Role-based on-chain permissions',
      definition:
        'Role-based on-chain permissions encode who may call which contract function as access-control logic on the chain itself, rather than as a trusted off-chain check. Roles such as admin, minter, or auditor are granted to specific addresses and changes are recorded on-ledger, so every privileged action is attributable and verifiable by any member.',
    },
    {
      term: 'Threat model',
      definition:
        'A threat model is a written enumeration of how a system can be attacked: access-control failure, key compromise, economic exploit, and consensus-level collusion in a consortium. It is drafted alongside the specification, before code, so each design decision is made against a named adversary rather than discovered during an external audit.',
    },
  ],
  relatedWork: [],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'decentralized-identity-did-integration' },
    { pillar: 'product-studio', slug: 'b2b-multi-tenant-platforms' },
  ],
  faqs: [
    {
      question: 'What is the difference between a private and a permissioned blockchain?',
      answer:
        'A private blockchain is operated by a single organisation that controls all nodes. A permissioned, or consortium, blockchain distributes validation across several named organisations under a shared governance policy. Both restrict who can participate, but a consortium network spreads trust so no single member can rewrite history alone. We design for whichever trust model the use case actually needs, and we name those assumptions before choosing a platform.',
    },
    {
      question: 'Have you built enterprise consortium networks before?',
      answer:
        'Our shipped record is on public and app-specific chains: audited DeFi and token contracts across EVM, Solana, Cosmos, and Aptos. Permissioned deployment is the same engineering discipline applied to a gated network, with validator and membership control added. We bring the audit-grade contract work and threat modelling that production demands, and platform expertise in Hyperledger Besu, Fabric, and Polygon Supernets, rather than a first-time pilot mindset.',
    },
    {
      question: 'Which permissioned platform should we use?',
      answer:
        'It follows the trust and tooling requirements, not preference. Hyperledger Besu suits teams that want EVM compatibility and existing Solidity tooling on a private network. Fabric fits when channels and fine-grained data isolation between members matter more than EVM portability. Polygon Supernets or Edge make sense when you want an app-specific chain that can later bridge to a public network. We document the decision so each consortium member sees the rationale.',
    },
    {
      question: 'How do you keep contracts on a private chain secure?',
      answer:
        'The chain being private does not lower the bar. We apply the same practice that cleared four Hacken rounds for Neemo Finance: a written specification, a threat model, property-based invariant tests, and an internal audit pass before external review. Role-based permissions are enforced on-chain, privileged keys live in multisigs or HSMs, and we monitor validator health and privileged calls after go-live on a defined SLA.',
    },
    {
      question: 'Can a permissioned network connect to a public chain later?',
      answer:
        'Yes, and we design for it when it is a stated goal. An app-specific or consortium chain can settle proofs or bridge assets to a public network once the membership and contract layers are stable. We treat the bridge as a separate, audited surface with its own threat model, because cross-chain messaging is a common exploit class. We do not bolt a bridge on without that review.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// rwa-tokenization
// ---------------------------------------------------------------------------

export const rwaTokenization: LeafContent = {
  pillar: 'web3',
  slug: 'rwa-tokenization',
  heroLede:
    'A tokenized asset that ignores who is allowed to hold it is a compliance incident waiting to settle on-chain. RWA tokenization development is the blockchain engineering practice that issues real-world assets as on-chain tokens with ownership, transfer rules, and redemption wired into the contract itself. We design the issuance, the on-chain registry, and the compliance logic that decides who can hold and trade each token.',
  heroStats: [
    { value: 'Assetize', label: 'live RWA tokenization platform', context: 'built by Metaborong' },
    { value: '4', label: 'Hacken audit rounds cleared', context: 'Neemo Finance contracts' },
    { value: 'Move', label: 'on Aptos, in production', context: 'audit-grade record' },
  ],
  deliverables: [
    {
      label: 'Asset-backed token contracts with on-chain ownership registry and supply controls.',
    },
    {
      label: 'Compliance-aware transfer logic: KYC allowlists, jurisdiction rules, holder caps.',
    },
    {
      label: 'Redemption and custody linkage tying each token to its off-chain asset.',
    },
    {
      label: 'Issuance and lifecycle flows for minting, transfer approval, and burn-on-redemption.',
    },
    {
      label: 'Audit-ready contract sources verified on the target chain explorer.',
    },
  ],
  phases: [
    {
      title: 'Asset & rule mapping',
      body: 'We map the real-world asset to an on-chain representation: what one token entitles a holder to, how ownership is recorded, and which off-chain documents back it. In parallel we capture the compliance rules that govern transfer, including KYC requirements, jurisdiction restrictions, and holder eligibility. This mapping is the contract specification, written before any token logic is built.',
    },
    {
      title: 'Compliance token design',
      body: 'We design the token standard and transfer logic so eligibility is enforced on-chain, not in a frontend. Allowlists, jurisdiction gates, and holder caps are checked inside the transfer path, so a non-compliant transfer reverts rather than settling. The registry records ownership and the rules that bind it, giving the issuer a single on-chain source of truth.',
    },
    {
      title: 'Issuance & redemption',
      body: 'We build the lifecycle flows that connect the token to its underlying asset: minting against verified backing, transfer approval through the compliance layer, and burn-on-redemption when a holder exits. Custody and off-chain attestation are linked so the on-chain supply reflects the assets actually held. Each flow is tested against the transfer rules defined earlier.',
    },
    {
      title: 'Audit & deploy',
      body: 'Contracts are engineered for third-party audit from the first commit and run through an internal audit pass against the threat model before external review. We deploy from a reviewed script, verify sources on the explorer, and transfer admin roles to your multisig. Our broader contract record, including four Hacken rounds and Move on Aptos, backs this security posture.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'Language' },
    { name: 'ERC-3643', category: 'Token Standard' },
    { name: 'ERC-20', category: 'Token Standard' },
    { name: 'OpenZeppelin', category: 'Libraries' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Hardhat', category: 'Build' },
    { name: 'Slither', category: 'Static Analysis' },
    { name: 'Tenderly', category: 'Monitoring' },
  ],
  fit: {
    fits: [
      'You hold a real-world asset and need it issued on-chain with compliance enforced in the contract.',
      'Transfer eligibility, KYC, and jurisdiction rules must hold on-chain, not only in a frontend.',
      'You need redemption and custody linked so on-chain supply matches the assets actually backing it.',
    ],
    doesNotFit: [
      'You need a token economic model, supply schedule, or vesting design rather than asset-backed issuance.',
      'You want a public token sale or launch platform rather than a compliance-gated asset token.',
      'There is no underlying asset and no custody arrangement to anchor the tokens against.',
    ],
  },
  aeoAnswer:
    'RWA tokenization development is an on-chain issuance practice for asset issuers that turns real-world assets into compliance-gated tokens. We wire ownership, transfer eligibility, and redemption into the contract itself, not a frontend. Metaborong built Assetize, a live real-world-asset tokenization platform. Our contract record includes four Hacken audit rounds on Neemo Finance.',
  keyConcepts: [
    {
      term: 'Compliance-aware token',
      definition:
        'A compliance-aware token is an asset token that enforces eligibility rules inside its transfer logic. Allowlists, jurisdiction gates, and holder caps are checked on-chain, so a transfer to an ineligible address reverts. This moves regulatory constraints from off-chain process into the contract, where they cannot be bypassed by a direct call.',
    },
    {
      term: 'On-chain registry',
      definition:
        'An on-chain registry is the contract record of who owns each unit of a tokenized asset and which rules bind that ownership. It serves as a single source of truth for the issuer, replacing reconciled off-chain ledgers and letting transfer eligibility be evaluated against current holders at the moment a transfer is attempted.',
    },
    {
      term: 'Redemption linkage',
      definition:
        'Redemption linkage is the connection between an on-chain token and the off-chain asset that backs it. When a holder redeems, the token is burned and the underlying claim is settled through custody, keeping on-chain supply equal to backed assets. Without it, token supply can drift from the assets it is supposed to represent.',
    },
    {
      term: 'Transfer restriction',
      definition:
        'A transfer restriction is a rule embedded in a token contract that conditions whether a transfer can settle. Common restrictions include KYC verification, jurisdiction allow or deny lists, lock-up periods, and maximum holder counts. Standards such as ERC-3643 formalise these checks so issuers can enforce them consistently across an asset class.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'Assetize: live RWA tokenization platform',
      summary:
        'We built Assetize, a live platform for tokenizing real-world assets, covering on-chain issuance and compliance-aware token logic.',
      href: '/work',
    },
    {
      descriptor: 'Neemo Finance: contracts, four audit rounds',
      summary:
        'Staking contract suite engineered for Neemo Finance that cleared four separate Hacken audit rounds before mainnet.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'tokenomics-design' },
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'product-studio', slug: 'saas-development' },
  ],
  faqs: [
    {
      question: 'How is RWA tokenization different from tokenomics design?',
      answer:
        'They solve different problems. RWA tokenization is asset-backed issuance: each token represents a claim on a real-world asset, and the work centres on ownership, compliance, and redemption. Tokenomics design is the economic model behind a native token, including supply schedule, emissions, and vesting. An asset token does not need an emission curve; it needs a registry and transfer rules. We run them as separate engagements and cross-link where a project needs both.',
    },
    {
      question: 'Do you handle the legal and regulatory side?',
      answer:
        'No, we are the engineering team, not your counsel. We build the on-chain logic that enforces the rules your legal advisors define: which jurisdictions are eligible, what KYC is required, and how holders are capped. You bring the regulatory framework and custody arrangement; we encode it into the token so the rules hold on-chain. We coordinate directly with your legal and compliance partners during the rule-mapping phase.',
    },
    {
      question: 'How are transfer restrictions enforced on-chain?',
      answer:
        'Eligibility is checked inside the transfer function, not in a frontend that a direct contract call could skip. The token consults an allowlist and rule set before a transfer settles, and reverts if the recipient fails any check, such as missing KYC or a blocked jurisdiction. Standards like ERC-3643 structure this so the same checks apply whether a transfer originates from your app, a wallet, or another contract.',
    },
    {
      question: 'How do you keep token supply matched to the real asset?',
      answer:
        'Through redemption linkage and controlled issuance. Tokens are minted only against verified backing, and redemption burns the token as the underlying claim is settled through custody. The on-chain registry records supply against attested backing so the two do not drift. The custody and attestation arrangement is yours; we build the contract flows that bind minting and burning to it.',
    },
    {
      question: 'Are the contracts audited?',
      answer:
        'We engineer for third-party audit from the first commit and run an internal audit pass against a written threat model before any external review. The external audit is always a separate firm chosen with you. Our broader contract record backs this posture: the Neemo Finance contracts cleared four separate Hacken rounds, and we wrote the KGEN token contracts in Move on Aptos in production.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// crypto-wallet-development
// ---------------------------------------------------------------------------

export const cryptoWalletDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'crypto-wallet-development',
  heroLede:
    'Seed phrases lose users at the door and one lost backup loses the funds forever, so wallet UX is where most on-chain products quietly bleed retention. Crypto wallet development is the engineering practice that builds key management and transaction UX into a non-custodial product. We build account-abstraction smart-account wallets on ERC-4337, with gas sponsorship, social and multisig recovery, session keys, and batched transactions.',
  heroStats: [
    { value: 'ERC-4337', label: 'account abstraction standard', context: 'smart-account wallets' },
    { value: 'Nero Chain', label: 'AA wallet in production', context: 'aa-platform.nerochain.io' },
    { value: 'Non-custodial', label: 'keys stay with the user', context: 'no custody of funds' },
  ],
  deliverables: [
    {
      label: 'ERC-4337 smart-account wallet with gasless transactions via a paymaster.',
    },
    {
      label: 'Social and multisig recovery flows that replace single seed-phrase risk.',
    },
    {
      label: 'Session keys for scoped, time-bound signing without per-action prompts.',
    },
    {
      label: 'Batched transactions that approve and execute in a single user operation.',
    },
    {
      label: 'Bundler and paymaster integration with deployment scripts and monitoring.',
    },
  ],
  keyConcepts: [
    {
      term: 'Account abstraction',
      definition:
        'Account abstraction is a design where a smart contract, not an externally owned key, governs an account. On ERC-4337 it lets a wallet define its own signing, recovery, and gas rules, so behaviour like social recovery or sponsored gas lives in code rather than being fixed by the protocol.',
    },
    {
      term: 'ERC-4337',
      definition:
        'ERC-4337 is the Ethereum standard that adds account abstraction without changing the base protocol. Users sign a UserOperation that a bundler submits through a singleton EntryPoint contract. A smart-account wallet implements the standard, enabling paymasters, session keys, and recovery while keeping the account non-custodial.',
    },
    {
      term: 'Paymaster',
      definition:
        'A paymaster is an ERC-4337 contract that pays the gas for a user operation. It lets an application sponsor transactions so a new user transacts without holding the native token, or accepts gas payment in a stablecoin. Sponsorship rules and spending limits are enforced on-chain by the paymaster.',
    },
    {
      term: 'Session key',
      definition:
        'A session key is a scoped, temporary signing key a smart-account wallet authorises for a limited set of actions and a fixed time window. It lets a user approve a session once, then transact without re-signing each action, while the smart account enforces the limits the key was granted.',
    },
  ],
  phases: [
    {
      title: 'Account model & scope',
      body: 'We map the wallet to the product: which actions need a signature, what recovery the user expects, and whether gas is sponsored, paid in a stablecoin, or paid normally. From that we choose the smart-account implementation and the bundler and paymaster setup. The output is an account model and threat surface the rest of the build is engineered against.',
    },
    {
      title: 'Smart account & recovery',
      body: 'We implement the ERC-4337 smart-account contracts: the validation logic, recovery module, and session-key permissions. Social and multisig recovery replace single seed-phrase risk, so a lost device does not mean lost funds. Contracts are tested against the threat model and engineered for external audit, with every privileged path named before code ships.',
    },
    {
      title: 'Paymaster & UX',
      body: 'We wire the paymaster so the application can sponsor gas or accept it in a token, with on-chain spending limits. The client builds and signs UserOperations, batches approve-and-execute into one step, and submits through the bundler. The result is a flow where a first-time user transacts without first acquiring the native gas token.',
    },
    {
      title: 'Deploy & operate',
      body: 'We deploy the contracts, verify sources on the explorer, and run the bundler and paymaster against the live chain. We monitor paymaster balance, recovery events, and failed user operations, and document every privileged role and limit. The Nero Chain AA wallet runs in production through exactly this path, and we hand over runbooks for in-house operation.',
    },
  ],
  techStack: [
    { name: 'ERC-4337', category: 'Standard' },
    { name: 'Solidity', category: 'Language' },
    { name: 'Nero Chain', category: 'Chain' },
    { name: 'EntryPoint', category: 'Contracts' },
    { name: 'Bundler', category: 'Infrastructure' },
    { name: 'Paymaster', category: 'Gas' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'viem', category: 'Client' },
  ],
  fit: {
    fits: [
      'You want an embedded non-custodial wallet where new users transact without first buying gas.',
      'Seed-phrase loss and signing friction are hurting onboarding or retention in your product.',
      'You need scoped session keys or sponsored gas that a standard externally owned account cannot provide.',
    ],
    doesNotFit: [
      'You want a custodial exchange wallet where your company holds and controls user funds.',
      'A standard externally owned account wallet already meets the product with no recovery or gas needs.',
      'The primary deliverable is exchange listing, market making, or off-chain treasury operations.',
    ],
  },
  aeoAnswer:
    'Crypto wallet development is an on-chain engineering practice for product teams that builds non-custodial key management and transaction UX. We build account-abstraction smart-account wallets on ERC-4337, with gas sponsorship, social recovery, and session keys. We built an account-abstraction wallet on Nero Chain, live at aa-platform.nerochain.io. Our contract work is engineered for external audit.',
  relatedWork: [
    {
      descriptor: 'Nero Chain: ERC-4337 account-abstraction wallet',
      summary:
        'We built an account-abstraction smart-account wallet on Nero Chain, using ERC-4337 with paymaster gas sponsorship, live at aa-platform.nerochain.io.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'decentralized-identity-did-integration' },
    { pillar: 'product-studio', slug: 'mvp-development' },
  ],
  faqs: [
    {
      question: 'What is the difference between a wallet and decentralized identity?',
      answer:
        'A wallet manages signing keys and transaction UX: it holds the keys that authorise on-chain actions and presents recovery, gas, and approval flows to the user. Decentralized identity manages credentials and verifiable claims about who someone is. They sit next to each other, since a wallet can hold identity credentials, but wallet work is key management and transaction signing, not credential issuance or verification.',
    },
    {
      question: 'What does account abstraction change for users?',
      answer:
        'Account abstraction moves account rules from the protocol into a smart contract, so the wallet defines its own behaviour. A user can recover access through social or multisig recovery instead of a single seed phrase, transact without holding the native gas token when a paymaster sponsors gas, and approve a session once rather than signing every action. The account stays non-custodial throughout.',
    },
    {
      question: 'Are ERC-4337 smart-account wallets non-custodial?',
      answer:
        'Yes. The user controls the smart account through their own signing keys, and no third party can move funds on their behalf. Account abstraction changes how signing and recovery work, not who holds the funds. Social recovery distributes the ability to restore access across guardians the user chooses, but neither the application nor we ever take custody of the assets in the account.',
    },
    {
      question: 'Do you audit the wallet contracts?',
      answer:
        'We engineer the smart-account contracts for external audit and run an internal audit pass against the threat model, but the external audit is a separate firm, as it should be. We name every privileged path before code ships and test against the threat model. Our smart-contract record includes a contract suite cleared across four Hacken audit rounds, and we coordinate the wallet audit with the firm you choose.',
    },
    {
      question: 'Can you add account abstraction to an existing wallet?',
      answer:
        'Often yes, depending on how the current wallet is built. We can add an ERC-4337 smart-account layer alongside an existing externally owned account, introduce a paymaster for sponsored gas, or add session keys and recovery without replacing the whole product. We read the current architecture, signing flow, and key handling first, then scope the smallest change that delivers the account-abstraction features you need.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// cross-chain-bridge-development
// ---------------------------------------------------------------------------

export const crossChainBridgeDevelopment: LeafContent = {
  pillar: 'web3',
  slug: 'cross-chain-bridge-development',
  heroLede:
    'Bridges hold more value than almost anything else in crypto, and they are the surface attackers hit first, because a single flaw in message verification can drain both sides at once. Cross-chain bridge development is the engineering practice of building the lock-and-mint contracts, relayers, and message verification that move assets and data between two chains while proving every transfer is genuine.',
  heroStats: [
    { value: 'NEAR + Solana', label: 'chains bridged in production', context: 'live NEAR-Solana bridge' },
    { value: '4', label: 'Hacken audit rounds cleared', context: 'Neemo Finance contracts' },
    { value: 'Move + EVM', label: 'plus Solana and NEAR', context: 'chains we ship on' },
  ],
  deliverables: [
    {
      label: 'Lock-and-mint or burn-and-mint contracts on both source and destination chains.',
    },
    {
      label: 'Relayer or attestation layer with replay protection and message ordering.',
    },
    {
      label: 'Message verification logic auditors can read against a stated trust model.',
    },
    {
      label: 'Liveness monitoring for stuck transfers, relayer health, and supply reconciliation.',
    },
    {
      label: 'Threat model and audit-ready spec for the full cross-chain message path.',
    },
  ],
  keyConcepts: [
    {
      term: 'Lock-and-mint',
      definition:
        'Lock-and-mint is a bridge pattern where an asset is locked in a contract on the source chain and an equivalent wrapped token is minted on the destination chain. Burning the wrapped token releases the original. Supply on both sides must reconcile exactly, or the wrapped token loses its backing.',
    },
    {
      term: 'Attestation',
      definition:
        'Attestation is the signed claim that a source-chain event actually happened, produced by relayers, validators, or an oracle network. The destination chain verifies these signatures before minting. The trust model of a bridge is largely the question of who attests and how many of them must collude to forge a transfer.',
    },
    {
      term: 'Replay protection',
      definition:
        'Replay protection prevents a single valid cross-chain message from being processed more than once. Each message carries a unique nonce that the destination chain records and rejects on a second submission. Without it, an attacker resubmits one legitimate mint instruction repeatedly to drain reserves.',
    },
    {
      term: 'Liveness',
      definition:
        'Liveness is the property that a bridge keeps processing transfers rather than stalling. A bridge can be safe yet unusable if relayers go offline or messages get stuck mid-flight. Monitoring tracks pending transfers, relayer health, and reconciliation so operators catch a halt before users do.',
    },
  ],
  phases: [
    {
      title: 'Trust model & spec',
      body: 'We decide who is allowed to attest that a source-chain event happened, and how many of them must collude before a forged transfer is possible. That choice, whether relayer set, validator quorum, or external network, defines the bridge security model. We write it as a spec with the lock-and-mint or burn-and-mint flow, message format, and nonce scheme named before any code.',
    },
    {
      title: 'Contracts & messaging',
      body: 'We build the source and destination contracts and the messaging layer that carries signed events between them. Replay protection is enforced with per-message nonces the destination records and rejects on reuse. Supply accounting is reconciled on both sides so locked collateral always backs minted tokens. Every external call and verification branch is written for an auditor to trace end to end.',
    },
    {
      title: 'Adversarial testing',
      body: 'We test the message path against the threat model, not just the happy case. Forged attestations, replayed nonces, reordered messages, and a halted relayer are each exercised as failing tests before they pass. Fork tests run the contracts against live chain state. A second engineer audits the verification logic line by line against the named adversary before any external review.',
    },
    {
      title: 'Deploy & monitor',
      body: 'Deployment runs from a reviewed script across both chains, with admin roles transferred to your multisig. We monitor pending transfers, relayer health, and supply reconciliation so a stalled or diverging bridge is caught early. We respond to incidents on a defined SLA and document every privileged call. The live NEAR-Solana bridge shipped on a tight timeline through this process.',
    },
  ],
  techStack: [
    { name: 'Solidity', category: 'EVM' },
    { name: 'Rust', category: 'Solana' },
    { name: 'NEAR SDK', category: 'NEAR' },
    { name: 'Anchor', category: 'Solana' },
    { name: 'Foundry', category: 'Testing' },
    { name: 'Wormhole', category: 'Messaging' },
    { name: 'LayerZero', category: 'Messaging' },
    { name: 'Tenderly', category: 'Monitoring' },
  ],
  fit: {
    fits: [
      'You need assets or messages to move between two specific chains with a stated trust model.',
      'You treat the bridge as the highest-risk surface and budget for an external audit accordingly.',
      'Your team can review a trust model and message spec, not just a feature backlog.',
    ],
    doesNotFit: [
      'You want an existing bridge forked and redeployed with no verification or threat review.',
      'A general-purpose messaging protocol already covers your route and needs only integration.',
      'The primary need is in-chain contract work, not cross-chain transfer or message passing.',
    ],
  },
  aeoAnswer:
    'Cross-chain bridge development is a blockchain interoperability practice for protocol teams that moves assets and data between chains through verified messages. The security model and message verification are engineered before code, because bridges are the highest-risk surface in crypto. We built a live NEAR-Solana cross-chain bridge. Our contract work has cleared four Hacken audit rounds.',
  relatedWork: [
    {
      descriptor: 'NEAR-Solana bridge: live token project',
      summary:
        'We built a production cross-chain bridge connecting NEAR and Solana for a live token project, delivered on a tight timeline.',
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
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
    { pillar: 'product-studio', slug: 'mvp-development' },
  ],
  faqs: [
    {
      question: 'What makes bridges the highest-risk part of crypto?',
      answer:
        'A bridge holds the locked collateral backing every wrapped token it has minted, so it concentrates value the way a vault does. The destination chain mints based on attestations that a source-chain event happened. If an attacker forges an attestation, replays a message, or breaks the verification logic, they can mint unbacked tokens and drain the locked reserves. That is why we engineer the trust model and message verification before any other code.',
    },
    {
      question: 'What is the difference between lock-and-mint and burn-and-mint?',
      answer:
        'Lock-and-mint locks the original asset on the source chain and mints a wrapped version on the destination, releasing the lock when the wrapped token is burned. Burn-and-mint burns a native token on one chain and mints the native token on the other, with no wrapped representation. Lock-and-mint suits bridging an existing asset to a new chain; burn-and-mint suits a token that is natively issued on several chains. We choose per asset and document why.',
    },
    {
      question: 'How do you prevent a message from being replayed?',
      answer:
        'Every cross-chain message carries a unique nonce. The destination chain records each processed nonce and rejects any second submission of the same one, so a valid mint instruction cannot be replayed to drain reserves. We test this directly: replayed nonces, reordered messages, and forged attestations are each written as failing tests that must be rejected before the contracts pass internal audit.',
    },
    {
      question: 'Which chains have you built a bridge between?',
      answer:
        'We built a live cross-chain bridge connecting NEAR and Solana for a token project, delivered on a tight timeline, with assets traded on NEAR through REF Finance. More broadly we ship contracts across EVM chains, Solana in Rust, NEAR, and Move on Aptos, so we can reason about the verification model on both sides of a route rather than treating one chain as a black box.',
    },
    {
      question: 'Do you run the security audit yourselves?',
      answer:
        'No, the external audit is always a separate firm. We engineer for audit and run an internal pass where a second engineer reviews the verification logic line by line against the threat model, but the external auditor is the signal investors and users trust on a bridge. Our contract work has cleared four Hacken rounds through this process, and we coordinate the engagement with the firm you choose.',
    },
  ],
  lastReviewed: '2026-06-04',
}

// ---------------------------------------------------------------------------
// blockchain-indexers-subgraphs
// ---------------------------------------------------------------------------

export const blockchainIndexersSubgraphs: LeafContent = {
  pillar: 'web3',
  slug: 'blockchain-indexers-subgraphs',
  heroLede:
    'Your contracts emit events, but a dApp cannot scan the chain log by log every time a user opens a page. Subgraph and blockchain indexer development is the data-layer practice that turns raw on-chain events and logs into a fast, queryable application API. We write event handlers, handle reorgs, build GraphQL and REST query layers, run backfills, and keep the index in sync with the chain head.',
  heroStats: [
    { value: 'Assetize', label: 'live RWA product we index', context: 'on-chain data layer' },
    { value: 'GraphQL', label: 'and REST query layers', context: 'how apps read the index' },
    { value: 'Reorg-safe', label: 'handlers that survive reorgs', context: 'chain-head sync' },
  ],
  deliverables: [
    {
      label: 'Subgraph or custom indexer mapping on-chain events to a queryable schema.',
    },
    {
      label: 'Event handlers with reorg handling and chain-head sync.',
    },
    {
      label: 'GraphQL and REST query layer over the indexed entities.',
    },
    {
      label: 'Backfill pipeline that replays historical blocks from genesis.',
    },
    {
      label: 'Monitoring for indexing lag, failed handlers, and head drift.',
    },
  ],
  phases: [
    {
      title: 'Schema & event mapping',
      body: 'We read your contracts and decide which events, logs, and call traces the application actually needs to read. From that we design the entity schema the front end will query, then map each on-chain event to a handler that writes those entities. The schema is the contract between chain and app, so we shape it around real query paths, not a raw mirror of every log.',
    },
    {
      title: 'Handlers & reorg safety',
      body: 'We write the handlers that transform events into entities, then make them survive reorgs. When the chain rolls back blocks, the index must roll back with it rather than serve stale or doubled data. We test handlers against forked mainnet state and replayed reorg scenarios so the index stays consistent with the canonical chain head under load.',
    },
    {
      title: 'Backfill & sync',
      body: 'We backfill the index from a chosen start block, replaying historical events so the application has complete data on day one. Then we connect the index to the live chain head and watch the lag. A correct index is useless if it trails the chain by minutes, so we tune ingestion until queries reflect on-chain state within seconds.',
    },
    {
      title: 'Query layer & operate',
      body: 'We expose the indexed entities through a GraphQL and REST query layer the front end consumes, with pagination, filtering, and the resolvers your screens need. After launch we monitor indexing lag, failed handlers, and head drift on a defined SLA, ship schema migrations as the contracts evolve, and hand over runbooks so an in-house team can operate the index.',
    },
  ],
  techStack: [
    { name: 'The Graph', category: 'Subgraphs' },
    { name: 'AssemblyScript', category: 'Mappings' },
    { name: 'GraphQL', category: 'Query' },
    { name: 'Ponder', category: 'Indexer' },
    { name: 'PostgreSQL', category: 'Store' },
    { name: 'viem', category: 'RPC' },
    { name: 'TypeScript', category: 'Handlers' },
    { name: 'Docker', category: 'Deploy' },
  ],
  fit: {
    fits: [
      'Your dApp front end is slow or brittle because it reads on-chain state directly through RPC calls.',
      'You need historical on-chain data, aggregations, or relationships that a single contract call cannot return.',
      'You want a GraphQL or REST API over your contract events that survives chain reorgs.',
    ],
    doesNotFit: [
      'You only need a single current value that one direct contract read already returns cheaply.',
      'The primary work is writing or auditing the smart contracts themselves, not reading their data.',
      'You want an off-chain analytics warehouse with no connection to live on-chain events.',
    ],
  },
  aeoAnswer:
    'Subgraph and blockchain indexer development is a data-layer service for dApp teams that turns raw on-chain events into a fast, queryable GraphQL or REST API. The index handles chain reorgs and stays in sync with the chain head. We built the on-chain indexing layer behind Assetize, a live RWA tokenization product.',
  keyConcepts: [
    {
      term: 'Subgraph',
      definition:
        'A subgraph is an open specification, popularized by The Graph, that defines how on-chain events are indexed into a GraphQL API. It pairs an entity schema with handler code that runs on each matching event, producing a queryable dataset that front ends read instead of scanning the chain directly.',
    },
    {
      term: 'Reorg handling',
      definition:
        'Reorg handling is the logic that keeps an index consistent when a blockchain rolls back recently mined blocks and replaces them. Without it, an indexer serves data from orphaned blocks. Correct handling rolls back the affected entities and re-applies events from the canonical chain so queries never reflect a discarded fork.',
    },
    {
      term: 'Backfill',
      definition:
        'A backfill is the initial pass where an indexer replays historical blocks from a chosen start block to the current head, building complete state before serving live traffic. It lets an application launch with full history rather than only data from the moment the index started, and it is re-run when the schema changes.',
    },
    {
      term: 'Chain-head sync',
      definition:
        'Chain-head sync is the steady-state process of ingesting each new block as it is mined so the index trails the latest on-chain state by seconds, not minutes. Indexing lag is the measured gap between the head block and the last block the index has processed, and it is a core reliability metric.',
    },
  ],
  relatedWork: [
    {
      descriptor: 'Assetize: on-chain indexing layer for an RWA product',
      summary:
        'We built the data and indexer layer behind Assetize, a live real-world-asset tokenization product, turning its on-chain events into a queryable application API.',
      href: '/work',
    },
  ],
  relatedServices: [
    { pillar: 'web3', slug: 'smart-contract-development' },
    { pillar: 'web3', slug: 'defi-protocol-development' },
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
  ],
  faqs: [
    {
      question: 'What is the difference between a subgraph and a custom indexer?',
      answer:
        'A subgraph follows The Graph specification: an entity schema plus event handlers that produce a hosted GraphQL API, which is the fastest path for most EVM dApps. A custom indexer is purpose-built code, often on Ponder or a dedicated service over PostgreSQL, used when you need control over the database, non-standard sources, or query shapes the subgraph model does not express. We pick based on your query paths and operational constraints.',
    },
    {
      question: 'Why not just read on-chain state directly from the contract?',
      answer:
        'Direct contract reads work for a single current value, but they cannot return history, aggregations, or relationships across many events without scanning the chain. That gets slow and expensive fast, and it ties your front end to RPC reliability. An index pre-computes those entities into a database, so a dApp queries an API in milliseconds instead of replaying logs on every page load.',
    },
    {
      question: 'How do you handle chain reorganizations?',
      answer:
        'When the chain rolls back recent blocks, the index must roll back with it. Our handlers track which entities each block produced, so a reorg reverts those entities and re-applies events from the canonical chain. We test this against replayed reorg scenarios on forked state. Without reorg handling, an index quietly serves data from orphaned blocks, which is one of the most common indexing bugs.',
    },
    {
      question: 'How fresh is the data, and what happens to history?',
      answer:
        'We backfill from a chosen start block so the application launches with complete history, then sync to the chain head and tune ingestion until queries reflect on-chain state within seconds. We monitor indexing lag as a core reliability metric. If the index falls behind the head, alerts fire before users see stale data, and the handlers catch up without losing or doubling events.',
    },
    {
      question: 'Have you built an indexing layer for a production product?',
      answer:
        'Yes. We built the on-chain data and indexer layer behind Assetize, a live real-world-asset tokenization product. That work covered mapping its contract events into a queryable schema, exposing the entities the application reads, and keeping the index in sync with the chain. The same engineering discipline behind our audited contract work backs how we build and operate an index.',
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
  'blockchain-consulting': blockchainConsulting,
  'enterprise-private-blockchain': enterprisePrivateBlockchain,
  'rwa-tokenization': rwaTokenization,
  'crypto-wallet-development': cryptoWalletDevelopment,
  'cross-chain-bridge-development': crossChainBridgeDevelopment,
  'blockchain-indexers-subgraphs': blockchainIndexersSubgraphs,
} satisfies Record<string, LeafContent>
