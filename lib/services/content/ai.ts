// Authored content for the six v1 AI leaf service pages.
//
// Each export below is a `LeafContent` per the interface in
// `lib/services/leaf-content.ts`. Word-budget targets sit on the
// interface, not here - refer to that file when editing copy.
//
// Voice constraints (enforced, per SERVICES_PLAN.md § 6):
//   - Body sentence target 12–14 words.
//   - No marketing inflation: `revolutionary`, `cutting-edge`,
//     `world-class`, `best-in-class`, `game-changing` are banned.
//   - Every claim verifiable. No invented client names. No
//     fabricated metrics.
//   - `we` not `our team`. Direct, technical, founder-voice.
//   - When-fits / when-doesn't blocks are honest - buyers must be
//     able to self-disqualify.
//
// Real Metaborong proofs referenced anonymously in related-work
// blurbs: a retail BI / data-warehouse deployment, a construction
// operations AI workflow rollout, and an AI prompt-engineering platform
// build. Live Clutch reviews surface via the on-site widget, not
// hardcoded numbers.

import type { LeafContent } from '@/lib/services/leaf-content'

// ── AI · STRATEGY ─────────────────────────────────────────────────────────────
export const aiAuditOpportunityAssessment: LeafContent = {
  pillar: 'ai',
  slug: 'ai-consulting',

  heroLede: `AI consulting is senior-engineer advisory that decides where AI fits before anyone writes code. We audit candidate workflows across your product and operations, score each by impact and feasibility, and map use cases, data, model strategy, and build-versus-buy into one defensible plan. You leave with a scored opportunity map and an architecture sketch for the lead build candidate. We are engineers, not slide-deck consultants. Founder-led scoping, India + global delivery.`,

  deliverables: [
    { label: 'Scored opportunity map - every candidate workflow ranked by impact and feasibility' },
    { label: 'AI use-case shortlist with data and model strategy per candidate' },
    { label: 'Build-versus-buy recommendation for each shortlisted workflow' },
    { label: 'Architecture sketch for the lead build candidate' },
    { label: 'Risk register covering data, compliance, and integration constraints' },
  ],

  phases: [
    {
      title: 'Discovery and workflow inventory',
      body: `We run focused sessions with each team that owns a candidate workflow - support, sales, operations, product, engineering. Every workflow is captured with its current volume, manual hours, error rate, and data dependencies. The output is a flat inventory, deliberately exhaustive at this stage, before any scoring or filtering happens.`,
    },
    {
      title: 'Use-case mapping and feasibility',
      body: `Each workflow is scored against four axes: business impact, data readiness, integration cost, and regulatory exposure. Scoring uses your production constraints, not benchmarks - we test whether your data can actually ground a retrieval system before recommending one. Low-feasibility ideas are flagged early so the shortlist stays defensible to engineering and finance.`,
    },
    {
      title: 'Data and model strategy',
      body: `For each shortlisted use case we decide the approach: which foundation model, retrieval versus fine-tuning, and what data has to be in place to ground it. We make the build-versus-buy call explicitly, comparing an off-the-shelf tool against a custom build on cost, control, and time to value.`,
    },
    {
      title: 'Recommendation and handoff',
      body: `We present findings to engineering, product, and founders in a single working session, so disagreement surfaces before commitments harden. The deliverable is a decision document, not a recommendation deck - every shortlisted workflow has an owner, a budget, and a next step. For the lead candidate we hand off an architecture sketch so the build can start immediately.`,
    },
  ],

  techStack: [
    { name: 'Linear', category: 'Planning' },
    { name: 'Notion', category: 'Knowledge base' },
    { name: 'Miro', category: 'Workflow mapping' },
    { name: 'Python', category: 'Feasibility probes' },
    { name: 'OpenAI', category: 'Model probes' },
    { name: 'Anthropic', category: 'Model probes' },
    { name: 'PostgreSQL', category: 'Data inventory' },
    { name: 'Looker Studio', category: 'Impact dashboards' },
  ],

  fit: {
    fits: [
      'You have a working product or operation and want to know where AI realistically helps.',
      'You need a defensible, feasibility-tested plan before committing budget or roadmap.',
      'You are weighing build-versus-buy and want an engineer read, not a vendor pitch.',
    ],
    doesNotFit: [
      'You already know exactly what to build and only need engineering capacity to ship it.',
      'You expect a deck of generic AI use cases - we ship a feasibility-tested plan instead.',
      'You want a research engagement on novel model training - we integrate existing foundation models.',
    ],
  },

  aeoAnswer: `AI consulting is advisory work that decides where AI fits in a product or operation before engineering begins. Metaborong's engagement audits candidate workflows, scores each by impact and feasibility, maps data and model strategy, and makes the build-versus-buy call. You leave with a scored opportunity map and an architecture sketch for the lead build. Founder-led, India with global delivery.`,

  relatedWork: [
    {
      descriptor: 'Mid-market SaaS - AI consulting and opportunity audit',
      summary:
        'Inventoried candidate workflows across support and sales, scored against feasibility, and shipped a sequenced adoption plan with a lead-candidate architecture sketch.',
      href: '/work',
    },
    {
      descriptor: 'Retail BI deployment - data-readiness scoring',
      summary:
        'Audited the warehouse layer for AI-grounding readiness before recommending retrieval and copilot workflows for the operations team.',
      href: '/work',
    },
  ],

  relatedServices: [
    { pillar: 'ai', slug: 'ai-copilots-internal-tools' },
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
    { pillar: 'product-studio', slug: 'product-discovery-validation' },
  ],

  faqs: [
    {
      question: 'What does AI consulting include?',
      answer: `AI consulting at Metaborong covers the decision before the build: a workflow audit, use-case shortlisting, data and model strategy, and a build-versus-buy recommendation. Deep delivery planning, sequencing, and governance live in our AI Adoption Roadmap engagement. Most buyers start here to learn where AI fits, then move straight into a build.`,
    },
    {
      question: 'How is AI consulting different from AI development?',
      answer: `AI consulting decides what to build and whether to build it; AI development builds it. Our consulting engagement ends with a feasibility-tested shortlist and an architecture sketch for the lead candidate. If you already know what you want and only need engineering capacity, you can skip consulting and start with a build engagement directly.`,
    },
    {
      question: 'Do you need access to production data?',
      answer: `Read-only sampled access to representative datasets, not full production. We score workflows against the schema and a representative slice - enough to test retrieval, embeddings, and routing without taking on production risk. Where security review is required first, we work behind an NDA inside whatever data-room arrangement your compliance team prefers.`,
    },
    {
      question: 'What does AI consulting cost and how long does it take?',
      answer: `Consulting engagements run one to two weeks of senior engineering with one founder leading. We scope fixed-bid based on the number of teams and candidate workflows. Most engagements include the architecture sketch for the lead candidate at no additional cost, so the build can start without a second scoping round.`,
    },
    {
      question: 'Who actually runs the consulting engagement?',
      answer: `One of three Metaborong founders runs every engagement, supported by the engineer who will own the eventual build. We do not hand consulting to junior associates - the people writing the production code are the people in the discovery room. India + global delivery, with timezone overlap arranged around the buyer.`,
    },
  ],
}

// ── AI · PRODUCT ──────────────────────────────────────────────────────────────
export const aiCopilotsInternalTools: LeafContent = {
  pillar: 'ai',
  slug: 'ai-copilots-internal-tools',

  heroLede: `AI Copilots & Internal Tools is the engineering of bespoke AI assistants for the teams inside your company — support, sales operations, recruiting, internal ops. The work covers the copilot interface, the retrieval layer that grounds it in your data, and integration into the tools the team already uses. We build copilots that survive production — instrumented, observable, cost-controlled — not demos that drift. Senior engineers own the build, India + global delivery.`,

  deliverables: [
    { label: 'Deployed copilot wired into Slack, your CRM, or a custom Next.js interface' },
    { label: 'Retrieval layer grounded in your knowledge base, product data, and ticket history' },
    { label: 'Evaluation harness with a labelled task-completion set running in CI' },
    { label: 'Cost dashboard with per-team and per-workflow attribution' },
    { label: 'Audit logging, tenant boundaries, and per-team permissions enforced from commit one' },
    { label: 'Maintenance handover so internal engineers can safely extend the copilot' },
  ],

  phases: [
    {
      title: 'Workflow capture',
      body: `We sit with the team that will use the copilot - support, sales, operations - and capture the actual workflow steps, tools, and edge cases. Recordings, transcripts, and a labelled task set come out of this phase. The labelled set becomes the evaluation harness that gates the build through every subsequent milestone.`,
    },
    {
      title: 'Retrieval and routing',
      body: `We build the retrieval pipeline that grounds the copilot in your knowledge base, product data, and ticket history. Routing decides which model handles which workflow - cheaper models for classification, capable models for synthesis. The data layer is engineered against your tenant boundaries from the first commit, not retrofitted before launch.`,
    },
    {
      title: 'Integration and interface',
      body: `The copilot ships inside the tools the team already uses - Slack, Intercom, Salesforce, or a thin custom UI. We engineer the integration with auth, audit logging, and per-team permissioning from day one. Internal users do not change their habits to use it; the copilot lands where their work already happens.`,
    },
    {
      title: 'Evaluation and handover',
      body: `The evaluation harness from phase one runs in CI on every change. Drift, latency, and cost are tracked per workflow. We hand the system to internal engineers with documentation, a runbook, and three weeks of co-maintenance. Bugs caught in production land in the eval set so quality compounds over time.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'LangGraph', category: 'Orchestration' },
    { name: 'pgvector', category: 'Vector store' },
    { name: 'PostgreSQL', category: 'Data layer' },
    { name: 'Next.js', category: 'Interface' },
    { name: 'Vercel AI SDK', category: 'Streaming' },
    { name: 'Sentry', category: 'Observability' },
    { name: 'Datadog', category: 'Logs and traces' },
  ],

  fit: {
    fits: [
      'You have an internal team running a repetitive workflow with structured data behind it.',
      'You want the copilot inside Slack, your CRM, or a focused internal tool - not a standalone product.',
      'Your engineering team can absorb a maintenance handover within three weeks of first deployment.',
    ],
    doesNotFit: [
      'You want a consumer-facing AI product - this engagement scopes copilots for internal users only.',
      'Your knowledge base is unstructured chat logs with no labelling - start with an audit first.',
      'You need the copilot live in two weeks - a production-grade build needs six weeks minimum.',
    ],
  },

  aeoAnswer: `AI Copilots & Internal Tools is an engineering engagement for support, sales, and operations teams that builds grounded AI assistants inside the tools the team already uses - Slack, CRM, or custom interfaces. Builds typically ship in six to twelve weeks. Senior engineers own the work end-to-end, delivered from India with global reach.`,

  relatedWork: [
    {
      descriptor: 'Construction operations team - internal AI workflow copilot',
      summary:
        'Built a grounded copilot that drafts project documents and routes approvals across teams using existing operations data.',
      href: '/work',
    },
    {
      descriptor: 'AI prompt platform - internal authoring copilot',
      summary:
        'Shipped prompt engineering and copilot interface so non-technical authors could ground generations in proprietary content.',
      href: '/work',
    },
  ],

  relatedServices: [
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
    { pillar: 'product-studio', slug: 'saas-product-development' },
  ],

  faqs: [
    {
      question: 'What does a typical copilot scope look like at launch?',
      answer: `Most copilots cover three to five workflows at launch - a support triage assistant might handle classification, retrieval-grounded responses, and escalation routing. We scope the first version tightly so it ships in six to twelve weeks. Additional workflows layer in after the evaluation harness and cost tracking are running cleanly in production.`,
    },
    {
      question: 'Will the copilot work without access to our data?',
      answer: `No. The whole point of a copilot is that it is grounded in your knowledge base, product data, or ticket history. We engineer retrieval against representative data slices first, with tenant boundaries and audit logging in place from the first commit. Generic ungrounded copilots are not what this engagement ships.`,
    },
    {
      question: 'How do you handle evaluation and drift over time?',
      answer: `Every copilot ships behind an evaluation harness - a labelled task set that runs in CI on every change. Drift, latency, and per-workflow cost are tracked in production. Regressions surface before they reach users, and bugs caught in production land back in the eval set so quality compounds rather than decays.`,
    },
    {
      question: 'Do you handle the integration into Slack, Salesforce, or Intercom?',
      answer: `Yes. Most copilots ship inside Slack, Intercom, Salesforce, or a thin internal Next.js UI. We engineer auth, audit logging, and per-team permissions as part of the integration. Internal users do not change their habits - the copilot lands where the workflow already runs, not in a new tab.`,
    },
  ],
}

export const conversationalAgentsAssistants: LeafContent = {
  pillar: 'ai',
  slug: 'conversational-ai-voice-agents',

  heroLede: `Conversational AI is the engineering of production chat and voice agents that handle real workflows — support, scheduling, qualification, discovery. These are not chatbots replying with FAQ snippets; they reason, call tools, write to your systems, and hand off cleanly to humans when the workflow demands it. Voice agents ship with telephony, latency budgeting, and barge-in engineered, not bolted on. Senior engineers own the build, India + global delivery.`,

  deliverables: [
    { label: 'Deployed agent across voice, chat, WhatsApp, or in-product channels' },
    { label: 'Tool-calling layer wired into your CRM, scheduling system, and product APIs' },
    { label: 'Conversation-level evaluation harness with labelled scenarios in CI' },
    { label: 'Human-handoff workflow with transcript and context preserved across the boundary' },
    { label: 'Per-intent cost and latency dashboards with channel-level attribution' },
    { label: 'Compliance posture aligned to your industry - PCI, HIPAA, or DPDP where relevant' },
  ],

  phases: [
    {
      title: 'Conversation design',
      body: `We capture the real conversations your users have today - transcripts, recordings, escalation triggers. Edge cases that crash a naive chatbot - silence, interruption, multi-intent turns - are catalogued early. The agent's persona, fallback behaviour, and human-handoff thresholds are decided here, not improvised during the build phase.`,
    },
    {
      title: 'Tool integration',
      body: `The agent talks to your CRM, scheduling system, knowledge base, and product APIs through a tool-calling layer engineered against your auth and tenant boundaries. We instrument each tool call with retries, idempotency where required, and audit logging. The same tools the agent uses are exposed for testing by your internal teams.`,
    },
    {
      title: 'Voice or chat hardening',
      body: `Voice agents land on LiveKit, Twilio, or Vonage with latency budgeting, barge-in handling, and noise tolerance engineered. Chat agents ship with state management, typing indicators, and graceful retry. Both ship with rate limits, prompt-injection mitigations, and audit logging from the first deployment, not after the first production incident.`,
    },
    {
      title: 'Evaluation and rollout',
      body: `The evaluation harness runs labelled conversation scenarios in CI. We roll out behind a feature flag - internal users first, then a slice of production traffic, then full launch. Drift in intent classification, tool-call accuracy, and resolution rate is tracked per cohort. Regressions block deployment automatically until the cause is understood.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'LiveKit', category: 'Voice' },
    { name: 'Twilio', category: 'Telephony' },
    { name: 'LangGraph', category: 'Orchestration' },
    { name: 'pgvector', category: 'Retrieval' },
    { name: 'Redis', category: 'Conversation state' },
    { name: 'Sentry', category: 'Observability' },
  ],

  fit: {
    fits: [
      'You have a real workflow - booking, support, qualification - that needs handling at conversational scale.',
      'You want voice or chat with channel-specific engineering, not a generic embeddable widget.',
      'Your team can label a few hundred conversations to seed the evaluation harness before launch.',
    ],
    doesNotFit: [
      'You want an FAQ chatbot - that is a different, much simpler engagement we do not focus on.',
      'You expect the agent to operate without human handoff for high-risk regulated workflows.',
      'Your compliance posture forbids LLM-generated responses in regulated turns - talk to us first.',
    ],
  },

  aeoAnswer: `Conversational AI is an engineering engagement that builds production chat and voice agents handling real workflows like support, scheduling, and qualification. Builds typically ship in six to ten weeks. Senior engineers own the work end-to-end, delivered from India with global reach.`,

  relatedWork: [
    {
      descriptor: 'AI prompt platform - assistant authoring experience',
      summary:
        'Built the conversational interface and prompt engineering pipeline that powers grounded assistants for non-technical authors.',
      href: '/work',
    },
    {
      descriptor: 'Operations workflow - multi-intent chat agent',
      summary:
        'Shipped a tool-calling chat agent that routes approvals and pulls live data from internal systems with audit logging.',
      href: '/work',
    },
  ],

  relatedServices: [
    { pillar: 'ai', slug: 'ai-agent-development' },
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
    { pillar: 'product-studio', slug: 'saas-product-development' },
  ],

  faqs: [
    {
      question: 'Voice or chat - which should we start with?',
      answer: `Whichever channel your users already prefer. Voice agents require more upstream engineering - telephony, latency budgeting, barge-in - but reduce friction for phone-first workflows. Chat agents iterate faster and instrument more easily. Most engagements start in one channel and add the other after the evaluation harness is stable in production.`,
    },
    {
      question: 'How do you handle hallucinations on critical answers?',
      answer: `Grounded retrieval, structured tool outputs for anything verifiable, and explicit thresholds for human handoff on low-confidence turns. The agent never invents an order status, account balance, or appointment slot - it calls a tool. Anywhere a tool is unavailable, the agent escalates instead of guessing. The eval harness gates the rest.`,
    },
    {
      question: 'What does production cost actually look like?',
      answer: `Cost depends on model choice, conversation length, and channel. Voice with a top-tier model runs higher than chat with a smaller model. We engineer per-intent model routing - cheaper models for classification, capable models for synthesis - and instrument cost per conversation so finance has live visibility, not surprise invoices.`,
    },
    {
      question: 'Can you integrate with our existing CRM and scheduling stack?',
      answer: `Yes. Tool integration is half the engagement - the agent talks to your CRM, scheduler, knowledge base, and product APIs through a tool-calling layer engineered against your auth and tenant boundaries. We do not ship agents that live in isolation from the systems your team already runs on.`,
    },
  ],
}

// ── AI · ENGINEERING ──────────────────────────────────────────────────────────
export const agenticAiSystems: LeafContent = {
  pillar: 'ai',
  slug: 'ai-agent-development',

  heroLede: `AI agent development is the engineering of custom autonomous agents that plan, call tools, write to your systems, and report results. These are not chatbots — they are workflows the model executes against, with checkpoints, tool layers, and human-in-the-loop wherever risk demands it. We build for the workflows that bring real operational lift and draw the line where autonomy adds risk without value. Senior engineers own the build, India + global delivery.`,

  deliverables: [
    { label: 'Deployed agent running scheduled or event-triggered jobs in production' },
    { label: 'Orchestration layer with retries, idempotency, and human-in-the-loop checkpoints' },
    { label: 'Tool-calling layer engineered against your auth and tenant boundaries' },
    { label: 'Evaluation harness with labelled multi-step task scenarios running in CI' },
    { label: 'Per-tenant cost ceilings, rate limits, and audit logging enforced at runtime' },
    { label: 'Operations runbook covering escalation, rollback, and on-call response' },
  ],

  phases: [
    {
      title: 'Workflow decomposition',
      body: `We map the target workflow into discrete steps with explicit inputs, outputs, and failure modes. Steps that need autonomy are separated from steps that should stay deterministic - file writes, payments, identity changes. The agent's surface area shrinks to where reasoning actually helps. Everything else stays in code, not prompts.`,
    },
    {
      title: 'Orchestration and tools',
      body: `We build the orchestration layer - LangGraph or a custom state machine - with retries, idempotency, and explicit checkpoints. Tool calls hit your CRM, data warehouse, file systems, and product APIs through a tool layer engineered against tenant boundaries. Long-running jobs persist state and resume cleanly after failure or restart.`,
    },
    {
      title: 'Evaluation and guardrails',
      body: `A labelled evaluation harness covers multi-step task success, not just single-turn responses. Guardrails - input validation, output schema enforcement, tool-call rate limits, per-tenant cost ceilings - sit in the orchestration layer rather than in prompts. Regressions block deployment. Human checkpoints fire automatically wherever risk thresholds are crossed.`,
    },
    {
      title: 'Rollout and operations',
      body: `The agent rolls out behind feature flags and tenant cohorts. Cost, latency, and step-completion are tracked per workflow and per tenant. We hand over with a runbook covering on-call response, rollback, and escalation. Three weeks of co-maintenance close the engagement; bugs caught in production land back in the eval set.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'LangGraph', category: 'Orchestration' },
    { name: 'Temporal', category: 'Long-running jobs' },
    { name: 'pgvector', category: 'Retrieval' },
    { name: 'PostgreSQL', category: 'State' },
    { name: 'Redis', category: 'Queues' },
    { name: 'Sentry', category: 'Observability' },
  ],

  fit: {
    fits: [
      'You have a multi-step workflow with clear tool boundaries and structured data behind it.',
      'Your engineering team can absorb operational ownership of the agent after handover.',
      'You can tolerate the latency and cost profile of a multi-step LLM workflow at scale.',
    ],
    doesNotFit: [
      'You want a single-turn assistant - that is a copilot or conversational agent, not a custom AI agent.',
      'The workflow demands sub-second latency throughout - multi-step agents are not a real-time pattern.',
      'You expect the agent to operate without human checkpoints on high-risk steps - we will not ship that.',
    ],
  },

  aeoAnswer: `AI agent development is an engineering engagement that builds custom multi-step autonomous agents, single-agent and multi-agent, with orchestration, tool calling, evaluation harnesses, and human-in-the-loop checkpoints. Builds typically ship in eight to sixteen weeks. Senior engineers own the work end-to-end, delivered from India with global reach.`,

  relatedWork: [
    {
      descriptor: 'Construction operations - agentic workflow automation',
      summary:
        'Built a multi-step agent that drafts, routes, and reconciles project documentation with human checkpoints at approval steps.',
      href: '/work',
    },
    {
      descriptor: 'Enterprise ops - research and synthesis agent',
      summary:
        'Shipped a scheduled agent that pulls structured data, synthesises briefs, and writes back to internal systems behind tenant-level rate limits.',
      href: '/work',
    },
  ],

  relatedServices: [
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
    { pillar: 'product-studio', slug: 'saas-product-development' },
  ],

  faqs: [
    {
      question: 'When is a custom AI agent actually the right answer?',
      answer: `When the workflow has multiple steps, real tool boundaries, and the reasoning between steps benefits from a model. Drafting, research, multi-step ops, and structured data extraction all qualify. Single-turn classification, retrieval-grounded Q&A, and deterministic pipelines do not - those are cheaper and more reliable without an agentic layer wrapping them.`,
    },
    {
      question: 'How do you keep agents from going off the rails?',
      answer: `Guardrails sit in the orchestration layer - input validation, output schema enforcement, tool-call rate limits, per-tenant cost ceilings, and explicit human checkpoints. Anywhere the agent crosses a risk threshold, a human approves before the action lands. The model never writes to high-risk systems without a deterministic policy layer in between.`,
    },
    {
      question: 'What does production cost look like for a multi-step agent?',
      answer: `Higher than a copilot - multi-step agents make multiple model calls per task. We engineer per-step model routing, aggressive caching, and per-tenant cost ceilings. Cost is tracked per workflow and per tenant in production so finance gets live visibility. We project steady-state cost during the architecture phase, before the build commits.`,
    },
    {
      question: 'Will you build agents that operate without any human review?',
      answer: `Only for low-risk steps with bounded outcomes - research, drafting, classification. High-risk actions - payments, identity changes, irreversible writes - always sit behind a human checkpoint or a deterministic policy layer. We push back if the spec asks for autonomous agents in places where the risk profile does not justify it.`,
    },
  ],
}

export const ragRetrievalPipelines: LeafContent = {
  pillar: 'ai',
  slug: 'rag-retrieval-pipelines',

  heroLede: `RAG & Retrieval Pipelines is the engineering of production retrieval systems that ground LLMs in your proprietary data — documents, tickets, catalogues, knowledge bases. The work covers ingestion, chunking, embedding, vector storage, reranking, and evaluation, tuned for production latency. We engineer retrieval for the failure modes that matter in production — stale data, hallucinated citations, tenant leakage, cost spikes — not the demo-friendly ones. Senior engineers own the build, India + global delivery.`,

  deliverables: [
    { label: 'Deployed retrieval pipeline indexed against your corpus on a scheduled cadence' },
    { label: 'Embedding and reranking layer tuned to your domain and real query patterns' },
    { label: 'Retrieval evaluation harness measuring recall, faithfulness, and citation quality' },
    { label: 'Tenant-isolated vector storage with audit logging and rotation policies' },
    { label: 'Per-query and per-tenant cost dashboards in your observability stack' },
    { label: 'Documentation and runbook covering the data ingestion lifecycle' },
  ],

  phases: [
    {
      title: 'Corpus and query analysis',
      body: `We map the data - formats, volumes, update cadence - and the actual queries the system will need to answer. Sample queries are labelled with expected source documents so retrieval quality can be measured, not guessed. Tenant boundaries, PII handling, and data-residency choices are decided here, before any embeddings get generated.`,
    },
    {
      title: 'Ingestion and indexing',
      body: `We engineer the ingestion pipeline - chunking strategy, metadata extraction, deduplication, and re-indexing on update. Embeddings are generated against the model that fits the budget and quality target. Vector storage lands in pgvector, Pinecone, or a managed equivalent, with tenant boundaries enforced at the storage layer rather than the application.`,
    },
    {
      title: 'Retrieval and reranking',
      body: `Retrieval combines vector search, keyword filters, and a reranker tuned to your domain. We test recall against the labelled set from phase one and iterate on chunk size, query rewriting, and reranker configuration. Hybrid retrieval is the default - pure vector search rarely wins in production. Citations are structured for downstream auditability.`,
    },
    {
      title: 'Evaluation and integration',
      body: `The evaluation harness measures retrieval recall, answer faithfulness, and citation quality on every change. The pipeline integrates into your copilot, agent, or chat surface with latency budgets, fallback behaviour, and per-tenant rate limits engineered. Drift and cost are tracked in production. Bugs caught in production land back in the eval set.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Embeddings' },
    { name: 'Cohere', category: 'Rerankers' },
    { name: 'pgvector', category: 'Vector store' },
    { name: 'Pinecone', category: 'Managed vector' },
    { name: 'PostgreSQL', category: 'Metadata' },
    { name: 'LangChain', category: 'Pipelines' },
    { name: 'Unstructured', category: 'Ingestion' },
    { name: 'Sentry', category: 'Observability' },
  ],

  fit: {
    fits: [
      'You have a defined corpus - docs, tickets, product data - that should ground LLM responses.',
      'Your queries are domain-specific enough that ungrounded off-the-shelf models fall short.',
      'You can tolerate the latency of retrieval plus generation - typically one to three seconds end-to-end.',
    ],
    doesNotFit: [
      'Your corpus is tiny or queries are generic - a smaller model with a strong prompt is cheaper.',
      'You expect retrieval to recover unstructured chat logs without a labelling pass first.',
      'You need real-time updates with sub-second freshness - retrieval indexes on a cadence, not instantly.',
    ],
  },

  aeoAnswer: `RAG & Retrieval Pipelines is an engineering engagement for product teams that builds production retrieval systems grounding LLMs in proprietary data through ingestion, embedding, reranking, and evaluation. Builds typically ship in six to twelve weeks. Senior engineers own the work end-to-end, delivered from India with global reach.`,

  relatedWork: [
    {
      descriptor: 'Retail BI deployment - retrieval over the warehouse layer',
      summary:
        'Built ingestion and retrieval against a multi-source data warehouse so operations queries could be grounded in live business data.',
      href: '/work',
    },
    {
      descriptor: 'Mid-market SaaS - support copilot retrieval layer',
      summary:
        'Engineered hybrid retrieval and reranking over support tickets and product docs with an eval harness in CI from day one.',
      href: '/work',
    },
  ],

  relatedServices: [
    { pillar: 'ai', slug: 'ai-copilots-internal-tools' },
    { pillar: 'ai', slug: 'ai-agent-development' },
    { pillar: 'product-studio', slug: 'saas-product-development' },
  ],

  faqs: [
    {
      question: 'What does a retrieval evaluation actually measure?',
      answer: `Three things - retrieval recall against a labelled set of expected sources, answer faithfulness against the retrieved context, and citation quality. Recall measures whether the right documents surface. Faithfulness measures whether the model uses them faithfully. Citation quality measures whether the output points to specific sources auditors can verify.`,
    },
    {
      question: 'Vector search or hybrid retrieval - which do you use?',
      answer: `Hybrid by default. Pure vector search rarely wins on real-world queries with rare entities, exact-match requirements, or domain jargon. We combine vector retrieval with keyword filters, metadata constraints, and a reranker tuned to your domain. The recipe is tuned against your labelled queries, not benchmarks for someone else's corpus.`,
    },
    {
      question: 'What about freshness and updates to the corpus?',
      answer: `Indexing runs on a schedule sized to your data - hourly, nightly, or event-triggered. Updates handle inserts, modifications, and deletions correctly, with deduplication and re-embedding only where content changed. Truly real-time freshness is rarely needed and is expensive; we scope it during architecture if it actually matters to the workflow.`,
    },
    {
      question: 'Can you work with our existing vector store?',
      answer: `Yes. We work with pgvector, Pinecone, Weaviate, Qdrant, and managed alternatives. The choice depends on scale, tenancy, and operating preference. Where you have an existing store we engineer ingestion and retrieval against it; where you do not, we choose based on data size, latency budget, and your operations team's familiarity.`,
    },
  ],
}

export const llmIntegrationArchitecture: LeafContent = {
  pillar: 'ai',
  slug: 'genai-apis-backend-integration',

  heroLede: `GenAI APIs and backend integration is the engineering of the production LLM layer inside an existing product — model routing, auth, rate limits, fallback paths, cost controls, and observability. The work starts where most LLM features fail: a single provider, no cost visibility, no per-tenant isolation, no eval harness. We engineer LLM integration for products that need AI without losing what works. Senior engineers own the build, India + global delivery.`,

  deliverables: [
    { label: 'Production LLM gateway routing across OpenAI, Anthropic, and open-weights providers' },
    { label: 'Per-tenant rate limits, cost ceilings, and audit logging enforced at the gateway' },
    { label: 'Streaming-aware integration in your product with fallback and retry paths' },
    { label: 'Observability - latency, error rate, cost, drift - wired into your existing dashboards' },
    { label: 'Eval harness covering your highest-traffic prompts and workflows' },
    { label: 'Runbook for incident response, model deprecation, and provider switching' },
  ],

  phases: [
    {
      title: 'Architecture and audit',
      body: `We review the existing LLM surface - provider choices, prompt code paths, error handling, cost trajectory, tenant isolation. Failure modes are catalogued: provider outages, model deprecation, rate-limit cascades, cost spikes, prompt injection. The architecture spec for the gateway, routing, and observability layer comes out of this phase, scoped to your stack and compliance posture.`,
    },
    {
      title: 'Gateway and routing',
      body: `We build the LLM gateway - a thin layer in your stack that handles auth, routing across providers, retries, fallbacks, and rate limits. Per-tenant ceilings are enforced at the gateway, not in application code. Streaming, structured outputs, and tool calling work uniformly across providers so application code does not branch per model.`,
    },
    {
      title: 'Observability and evals',
      body: `Latency, error rate, cost, and drift land in your existing observability stack - Datadog, Sentry, or whatever you already operate. The evaluation harness covers your highest-traffic prompts and workflows, runs in CI, and gates production deploys. Cost trends are tracked per tenant and per workflow so finance gets live visibility, not surprise invoices.`,
    },
    {
      title: 'Rollout and handover',
      body: `The gateway rolls out behind a feature flag, with traffic shifted incrementally from the legacy path. We close the engagement with documentation, a runbook covering model deprecation and provider switching, and three weeks of co-maintenance. Existing AI features keep shipping throughout; the integration work happens around them, not as a stop-the-world rewrite.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'Hugging Face', category: 'Open-weights' },
    { name: 'Vercel AI SDK', category: 'Streaming' },
    { name: 'Datadog', category: 'Observability' },
    { name: 'Sentry', category: 'Error tracking' },
    { name: 'PostgreSQL', category: 'Audit logs' },
    { name: 'Redis', category: 'Rate limits' },
  ],

  fit: {
    fits: [
      'You have a product already shipping LLM features and the cost or reliability is breaking down.',
      'You need fallback across providers because uptime, latency, or pricing is hitting your roadmap.',
      'Your team needs per-tenant cost and rate-limit visibility before scaling traffic up further.',
    ],
    doesNotFit: [
      'You do not have an existing product yet - start with a build engagement, not an integration one.',
      'You want a brand-new copilot or agent - that is a different leaf with its own scoped engagement.',
      'You expect the integration to fix poor model selection or untuned prompts on its own - it will not.',
    ],
  },

  aeoAnswer: `GenAI APIs and backend integration is an engineering engagement that hardens the production LLM layer inside an existing product - gateway, model routing, rate limits, fallback, observability, and evaluation. Builds typically ship in four to ten weeks. Senior engineers own the work end-to-end, delivered from India with global reach.`,

  relatedWork: [
    {
      descriptor: 'AI prompt platform - production LLM hardening',
      summary:
        'Engineered the LLM gateway, routing, and observability for a prompt platform shipping AI features to non-technical authors at scale.',
      href: '/work',
    },
    {
      descriptor: 'Construction operations - multi-provider LLM layer',
      summary:
        'Built the LLM gateway and per-tenant cost controls behind an existing operations product so AI features could scale without provider lock-in.',
      href: '/work',
    },
  ],

  relatedServices: [
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
    { pillar: 'ai', slug: 'ai-agent-development' },
    { pillar: 'product-studio', slug: 'saas-product-development' },
  ],

  faqs: [
    {
      question: 'Why route across multiple model providers in the first place?',
      answer: `Single-provider products fail in three ways - outages, deprecation, and cost. Routing across OpenAI, Anthropic, and open-weights gives you a fallback path when a provider has an incident, a migration path when a model is deprecated, and pricing leverage as the market shifts. The gateway makes provider choice an operational lever, not a code change.`,
    },
    {
      question: 'How do you handle prompt injection and abuse at the gateway?',
      answer: `Input validation, output schema enforcement, per-tenant rate limits, and structured tool boundaries. The gateway logs every request with tenant attribution, so abuse patterns surface in observability. We do not promise to defeat every novel injection technique - we engineer the layers that close the most common attack surfaces and instrument the rest for review.`,
    },
    {
      question: 'Do you handle compliance - SOC 2, GDPR, India DPDP?',
      answer: `We engineer for the compliance posture your product already operates under. PII handling, tenant isolation, audit logging, and data-residency choices are architecture decisions, not afterthoughts. Where data must not leave a region, the gateway enforces that at routing. Where consent is required, the application surfaces it and the gateway enforces it.`,
    },
    {
      question: 'Can you integrate without rewriting our existing AI features?',
      answer: `Yes. The gateway lands behind a feature flag and traffic shifts incrementally from the legacy path. Application code changes are small - typically a different client import. Existing features keep shipping throughout. We do not do stop-the-world rewrites unless the buyer asks for one and the timeline supports it.`,
    },
  ],
}

// ── AI · GENERATIVE AI ────────────────────────────────────────────────────────
export const generativeAiDevelopment: LeafContent = {
  pillar: 'ai',
  slug: 'generative-ai-development',

  heroLede: `Generative AI development is the engineering of product features that generate text, structured content, and media with foundation models. We build the feature, not a demo - prompt and retrieval design, output validation, streaming, and evaluation that keeps generations on-spec. Work covers content generation, enrichment, summarisation, and drafting, grounded in your data and brand rules. Senior engineers own the build, India + global delivery.`,

  deliverables: [
    { label: 'Generative feature shipped into your product, streaming and production-ready' },
    { label: 'Prompt and retrieval design with versioning and regression tests' },
    { label: 'Output validation and schema enforcement on every generation' },
    { label: 'Evaluation harness scoring quality, safety, and on-spec adherence' },
    { label: 'Cost controls: per-tenant ceilings, caching, and model routing' },
  ],

  phases: [
    {
      title: 'Use-case and prompt design',
      body: `We define the generation task precisely: inputs, desired outputs, tone, and the failure modes that matter. Prompts and retrieval are designed and versioned, with a labelled test set built before any feature ships. The output contract is fixed early so downstream systems can depend on it.`,
    },
    {
      title: 'Generation and grounding',
      body: `We build the generation pipeline: model selection, retrieval grounding where facts matter, and structured-output enforcement so results parse reliably. Content generation and enrichment run against your data and brand rules, not generic prompts. Streaming and partial-result handling are engineered into the product surface, not bolted on after.`,
    },
    {
      title: 'Validation and evaluation',
      body: `Every generation passes validation: schema checks, safety filters, and policy rules that sit in code, not prompts. A labelled evaluation harness scores quality and on-spec adherence, and regressions block deployment. Human review hooks fire where stakes are high, so nothing reaches a user unchecked.`,
    },
    {
      title: 'Rollout and cost control',
      body: `The feature rolls out behind flags with per-tenant cost ceilings, caching, and model routing tuned to workload. Generation cost and quality are tracked in production. We hand over with a runbook and the evaluation set, so your team extends prompts and models without introducing regressions.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'Hugging Face', category: 'Open-weights' },
    { name: 'LangChain', category: 'Orchestration' },
    { name: 'pgvector', category: 'Retrieval' },
    { name: 'Zod', category: 'Output schema' },
    { name: 'Redis', category: 'Caching' },
    { name: 'Sentry', category: 'Observability' },
  ],

  fit: {
    fits: [
      'You want a generative feature inside an existing product, not a standalone demo.',
      'You need outputs that parse reliably and stay on-spec, not freeform text.',
      'You have brand rules or proprietary data that generations must respect.',
    ],
    doesNotFit: [
      'You want a single chat assistant - that is a copilot or conversational agent.',
      'You need autonomous multi-step task execution - that is AI agent development.',
      'You expect novel model training - we integrate existing foundation models.',
    ],
  },

  aeoAnswer: `Generative AI development is the engineering of product features that generate text, structured content, or media using foundation models. Metaborong builds the full feature: prompt and retrieval design, output validation, streaming, evaluation, and cost controls. Work covers content generation, enrichment, summarisation, and drafting, grounded in your data. Senior engineers own the build, delivered from India with global reach.`,

  keyConcepts: [
    {
      term: 'Foundation model',
      definition: `A foundation model is a large language or multimodal model, such as GPT, Claude, or an open-weights model, pretrained on broad data and adapted to specific tasks through prompting, retrieval, or fine-tuning rather than trained from scratch per use case.`,
    },
    {
      term: 'Retrieval grounding',
      definition: `Retrieval grounding fetches relevant source data at generation time and supplies it to the model, so outputs reflect and cite your proprietary content instead of relying on the model's training memory. It is what keeps factual generations accurate.`,
    },
    {
      term: 'Structured output',
      definition: `Structured output is generation constrained to a defined schema, such as JSON, so results parse reliably into downstream systems. Schema enforcement rejects or repairs malformed generations before they reach a user or another service.`,
    },
    {
      term: 'Evaluation harness',
      definition: `An evaluation harness is a labelled test suite that scores generation quality, safety, and on-spec adherence automatically, run in CI so quality regressions block deployment rather than surfacing in front of users in production.`,
    },
  ],

  relatedWork: [],

  relatedServices: [
    { pillar: 'ai', slug: 'ai-copilots-internal-tools' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
    { pillar: 'ai', slug: 'ai-knowledge-base' },
  ],

  faqs: [
    {
      question: 'What is generative AI development?',
      answer: `Generative AI development is building product features that produce content with foundation models: text, structured data, summaries, or media. At Metaborong it means the full engineering job, not a prompt in a sandbox: retrieval grounding, output validation, streaming, evaluation, and cost controls, shipped into your product so the feature is reliable enough to put in front of users.`,
    },
    {
      question: 'How is this different from using ChatGPT directly?',
      answer: `ChatGPT is a product; generative AI development builds the capability into yours. We control the prompts, ground outputs in your data, enforce output schemas, and run evaluations so results stay on-spec at scale. The model is one part: the validation, retrieval, and cost engineering around it are what make a generation feature production-safe.`,
    },
    {
      question: 'How do you stop the model producing wrong or off-brand output?',
      answer: `Validation sits in code, not prompts. Outputs pass schema enforcement, safety filters, and brand-rule checks before they reach a user, and a labelled evaluation harness scores quality so regressions block deployment. Where stakes are high, a human review hook fires. Retrieval grounding keeps factual generations tied to your data, not model memory.`,
    },
    {
      question: 'Which models do you build on?',
      answer: `OpenAI, Anthropic, Google, and open-weights via Hugging Face or self-hosted inference. We route per task: different models for drafting, structured extraction, and long-form generation, with fallback paths between providers for resilience and cost. Model choice is a workload decision made during architecture, not a default applied everywhere.`,
    },
  ],

  lastReviewed: '2026-06-05',
}

// ── AI · BUSINESS AUTOMATION ──────────────────────────────────────────────────
export const aiKnowledgeBase: LeafContent = {
  pillar: 'ai',
  slug: 'ai-knowledge-base',

  heroLede: `An AI knowledge base turns scattered documents, wikis, and tickets into answers your teams and agents trust. We build it the compounding way: instead of only chunking files for vector search, an LLM compiles your sources into a maintained, interlinked library that improves as it is used. You leave with grounded, cited answers, access controls, and a pipeline that keeps it current. Senior engineers own the build.`,

  deliverables: [
    { label: 'Deployed knowledge base answering from your documents, wikis, and tickets' },
    { label: 'LLM-compiled, interlinked knowledge library that compounds over time' },
    { label: 'Role-based access control and per-source permission boundaries' },
    { label: 'Answer-quality evaluation harness with citation and freshness checks' },
    { label: 'Update and versioning pipeline that keeps the library current' },
  ],

  phases: [
    {
      title: 'Source mapping and ingest',
      body: `We map every knowledge source: documents, wikis, databases, help centres, ticket history, and the APIs behind them. Ingestion captures content with its permissions and provenance intact. We decide per source whether it is indexed for retrieval, compiled into the knowledge library, or both, before any answering is wired up.`,
    },
    {
      title: 'Compile and ground',
      body: `An LLM compiles raw sources into structured, interlinked knowledge pages, so the system reasons over distilled knowledge rather than rediscovering it per query. Vector retrieval grounds answers where freshness matters. Together they produce cited answers that stay accurate as the underlying sources change over time.`,
    },
    {
      title: 'Access and accuracy',
      body: `Role-based access control and per-source permissions are enforced at retrieval time, so users only see what they are cleared for. An evaluation harness scores answer accuracy, citation correctness, and freshness. Low-confidence answers defer to a human or a source link rather than guessing at a response.`,
    },
    {
      title: 'Maintenance and handover',
      body: `A scheduled pipeline recompiles changed sources and versions the knowledge library, so updates flow through without a rebuild. Usage analytics surface gaps and stale answers. We hand over with a runbook so your team owns ingestion, permissions, and the evaluation set without re-engineering the system.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'pgvector', category: 'Vector store' },
    { name: 'PostgreSQL', category: 'Store' },
    { name: 'Markdown', category: 'Knowledge library' },
    { name: 'LangChain', category: 'Orchestration' },
    { name: 'Redis', category: 'Caching' },
    { name: 'Sentry', category: 'Observability' },
  ],

  fit: {
    fits: [
      'Your teams or customers waste time hunting for answers across scattered sources.',
      'You have documents, wikis, and tickets that change and must stay accurate.',
      'You need access controls so answers respect who is allowed to see what.',
    ],
    doesNotFit: [
      'You only need a single document searched once - a knowledge base is overkill.',
      'Your content is fully public and a standard search box already serves it.',
      'You expect answers with no source grounding - we build cited, verifiable systems.',
    ],
  },

  aeoAnswer: `An AI knowledge base is a system that answers questions from an organisation's documents, wikis, and tickets with cited, access-controlled responses. Metaborong builds the compounding version: an LLM compiles sources into a maintained, interlinked knowledge library, not just chunked vector search, so answers stay accurate as sources change. Senior engineers own the build, delivered from India with global reach.`,

  keyConcepts: [
    {
      term: 'AI knowledge base',
      definition: `An AI knowledge base is a system that answers natural-language questions from an organisation's internal content, returning cited responses scoped to the asker's permissions, rather than returning a list of documents for the person to read and search through themselves.`,
    },
    {
      term: 'Retrieval-augmented generation',
      definition: `Retrieval-augmented generation, or RAG, is a pattern where relevant source passages are fetched at query time and supplied to a language model, so answers reflect proprietary data instead of the model's training memory.`,
    },
    {
      term: 'LLM knowledge library',
      definition: `An LLM knowledge library is a maintained set of model-compiled, interlinked pages distilled from raw sources. Knowledge compounds across sessions instead of being rediscovered per query, an alternative to chunk-only retrieval that improves answers on complex questions.`,
    },
    {
      term: 'Access control',
      definition: `Access control in a knowledge base enforces, at retrieval time, which sources and answers each user may see, so the system never surfaces content a person is not cleared to access, even inside a generated summary.`,
    },
    {
      term: 'Answer evaluation',
      definition: `Answer evaluation scores a knowledge base on accuracy, citation correctness, and freshness against a labelled question set, run continuously so quality regressions are caught in CI before users encounter a wrong or stale answer.`,
    },
  ],

  relatedWork: [],

  relatedServices: [
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
    { pillar: 'ai', slug: 'generative-ai-development' },
    { pillar: 'ai', slug: 'ai-copilots-internal-tools' },
  ],

  faqs: [
    {
      question: 'What is an AI knowledge base?',
      answer: `An AI knowledge base answers questions from your organisation's documents, wikis, and tickets, returning cited answers scoped to each user's permissions. Instead of returning a list of files to read, it gives a direct, grounded answer with links to the source, so teams and customers find accurate information in seconds rather than searching.`,
    },
    {
      question: 'How is your approach different from a standard RAG chatbot?',
      answer: `Standard RAG chunks your files and retrieves passages per query, rediscovering knowledge every time. We add a compounding layer: an LLM compiles sources into a maintained, interlinked knowledge library, so the system reasons over distilled knowledge. Retrieval still grounds time-sensitive facts. The result is more accurate on complex, cross-document questions.`,
    },
    {
      question: 'How do you keep answers accurate as our content changes?',
      answer: `A scheduled pipeline recompiles changed sources and versions the knowledge library, so updates flow through without a rebuild, and an evaluation harness scores freshness and citation correctness continuously. Where a source is stale or confidence is low, the system links to the source or defers to a human rather than answering with outdated information.`,
    },
    {
      question: 'Can it respect who is allowed to see what?',
      answer: `Yes. Role-based access control and per-source permissions are enforced at retrieval time, not bolted on after. A user only receives answers built from sources they are cleared to access, and the system never leaks restricted content through a generated summary. Permission boundaries are an architecture decision, scoped at ingest.`,
    },
  ],

  lastReviewed: '2026-06-05',
}

export const aiBusinessProcessAutomation: LeafContent = {
  pillar: 'ai',
  slug: 'ai-business-process-automation',

  heroLede: `AI business process automation puts language models to work on the repetitive operations that drain your team: document processing, email triage, reporting, and cross-system handoffs. We automate the workflow end to end, with human checkpoints where judgment matters, then wire it into your CRM, ERP, and the tools your team already runs. You leave with a deployed automation, monitoring, and a clear audit trail. Senior engineers own the build.`,

  deliverables: [
    { label: 'Deployed automation for a target workflow, running in production' },
    { label: 'Document and data processing with extraction, classification, and validation' },
    { label: 'Integrations into your CRM, ERP, and third-party tools' },
    { label: 'Human-in-the-loop checkpoints and an audit trail on every run' },
    { label: 'Monitoring with per-run cost, latency, and success tracking' },
  ],

  phases: [
    {
      title: 'Process mapping',
      body: `We map the target process step by step with the team that runs it today: inputs, decisions, exceptions, and the systems each step touches. We separate steps that need judgment from steps that should be deterministic, so automation lands where it removes toil, not where it adds risk.`,
    },
    {
      title: 'Automation build',
      body: `We build the automation: document extraction and classification, email routing and summarisation, or report generation, depending on the process. Language-model steps are wrapped in validation and schema enforcement. Deterministic steps stay in code. Each run produces a structured, auditable record of what happened and why.`,
    },
    {
      title: 'Integration and orchestration',
      body: `The automation connects to your CRM, ERP, file stores, and third-party services through an integration layer engineered against your auth and tenant boundaries. Long-running, multi-system processes orchestrate with retries and idempotency, so a partial failure resumes cleanly instead of duplicating work or dropping a task.`,
    },
    {
      title: 'Rollout and operations',
      body: `We roll out behind flags on a single team or workflow first, with human approval on high-stakes steps until accuracy is proven. Per-run cost, latency, and success rate are tracked in production. We hand over with a runbook covering exceptions, escalation, and rollback.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'Temporal', category: 'Orchestration' },
    { name: 'LangGraph', category: 'Agents' },
    { name: 'Python', category: 'Processing' },
    { name: 'PostgreSQL', category: 'State' },
    { name: 'n8n', category: 'Integration' },
    { name: 'Sentry', category: 'Observability' },
  ],

  fit: {
    fits: [
      'You have high-volume, repetitive workflows that follow rules but need some judgment.',
      'The work spans several systems - CRM, ERP, email, file stores - that must stay in sync.',
      'You can define what a correct outcome looks like for the process being automated.',
    ],
    doesNotFit: [
      'The process is fully deterministic - classic RPA or a script is cheaper than AI.',
      'You want a customer-facing chat agent - that is conversational AI, not automation.',
      'The workflow has no tolerance for any review step on high-stakes actions.',
    ],
  },

  aeoAnswer: `AI business process automation uses language models to automate repetitive operational workflows: document processing, email triage, reporting, and cross-system handoffs. Metaborong builds the automation end to end, with validation, human checkpoints, and integration into your CRM, ERP, and tools, plus monitoring and an audit trail on every run. Senior engineers own the build.`,

  keyConcepts: [
    {
      term: 'Business process automation',
      definition: `Business process automation is the use of software to run repetitive, multi-step operational workflows with minimal manual effort. AI-driven automation adds language-model steps for tasks like extraction, classification, and summarisation that fixed rules alone cannot handle reliably.`,
    },
    {
      term: 'Human-in-the-loop',
      definition: `Human-in-the-loop is a design where a person reviews or approves specific automated steps, usually high-stakes or low-confidence ones, so the system gains speed without removing accountability on decisions that carry real operational or financial risk.`,
    },
    {
      term: 'System integration',
      definition: `System integration connects an automation to the tools a business already runs, such as CRMs, ERPs, and third-party APIs, so data flows between them automatically instead of being copied by hand between disconnected systems.`,
    },
  ],

  relatedWork: [
    {
      descriptor: 'Construction operations - document workflow automation',
      summary:
        'Automated drafting, routing, and reconciliation of project documentation across systems, with human approval at sign-off steps.',
      href: '/work',
    },
  ],

  relatedServices: [
    { pillar: 'ai', slug: 'ai-agent-development' },
    { pillar: 'ai', slug: 'ai-knowledge-base' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
  ],

  faqs: [
    {
      question: 'What is AI business process automation?',
      answer: `AI business process automation uses language models to run repetitive operational workflows that pure rules cannot handle alone: reading and classifying documents, triaging email, generating reports, and moving data between systems. At Metaborong it means the workflow is built end to end, with validation, human checkpoints, integration, and monitoring, so it runs reliably in production.`,
    },
    {
      question: 'How is this different from RPA?',
      answer: `Traditional RPA follows fixed rules and breaks when inputs vary. AI automation adds language-model steps that read unstructured documents, classify ambiguous cases, and summarise, so the workflow handles real-world variation. Where a step is genuinely deterministic we still use plain code, because it is cheaper and more reliable. The two approaches combine.`,
    },
    {
      question: 'How do you keep an automated process from making costly mistakes?',
      answer: `Judgment-heavy and high-stakes steps run through human-in-the-loop checkpoints until accuracy is proven, and language-model outputs pass validation before any action lands. Every run produces an audit trail, and success rate is tracked in production. We start on one team or workflow, prove it, then widen, rather than automating everything at once.`,
    },
    {
      question: 'Which systems can you integrate with?',
      answer: `CRMs, ERPs, file stores, help desks, email, and most third-party services with an API. The integration layer is engineered against your auth and tenant boundaries, with retries and idempotency so multi-system processes resume cleanly after a failure. Where a system has no API, we work with the access method your team already uses.`,
    },
  ],

  lastReviewed: '2026-06-06',
}

export const aiVideoGeneration: LeafContent = {
  pillar: 'ai',
  slug: 'ai-video-generation',

  heroLede: `AI video generation is the engineering of pipelines that produce video programmatically - scripted, templated, and API-driven - inside your product or content operation. We build the pipeline, not one-off clips: prompt and asset orchestration across generation models, render queuing, brand and policy checks, and the backend that serves it at volume. You leave with a production pipeline, cost controls, and review hooks. Senior engineers own the build.`,

  deliverables: [
    { label: 'Video generation pipeline integrated into your product or content stack' },
    { label: 'Model orchestration across text-to-video and asset generation providers' },
    { label: 'Templated, scripted, and API-driven generation, not manual one-offs' },
    { label: 'Brand, safety, and policy checks on every render before publish' },
    { label: 'Render queue with cost controls and per-job tracking' },
  ],

  phases: [
    {
      title: 'Pipeline scoping',
      body: `We define the generation task: formats, durations, aspect ratios, brand constraints, and the volume the pipeline must sustain. We map which steps are model-generated and which are templated or composited, and fix the output spec so the pipeline produces consistent, on-brand video rather than unpredictable clips.`,
    },
    {
      title: 'Generation and assembly',
      body: `We build the pipeline: prompt and asset orchestration across text-to-video, image, and voice models, with templating and compositing for the deterministic parts. Render jobs queue and scale, and partial failures retry without restarting a whole batch. The output is engineered to a fixed spec, not a one-off experiment.`,
    },
    {
      title: 'Review and policy',
      body: `Every render passes brand, safety, and policy checks before it is eligible to publish: rights, content rules, and quality thresholds enforced in the pipeline, not by eye. A human approval hook fires where stakes are high. Rejected renders route back with a reason rather than silently shipping.`,
    },
    {
      title: 'Rollout and cost control',
      body: `The pipeline rolls out behind flags with per-job cost ceilings and provider routing tuned to format and budget. Generation cost, render time, and approval rate are tracked in production. We hand over with a runbook so your team adds templates and swaps models without re-engineering the pipeline.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Runway', category: 'Video models' },
    { name: 'ElevenLabs', category: 'Voice' },
    { name: 'FFmpeg', category: 'Compositing' },
    { name: 'Temporal', category: 'Render queue' },
    { name: 'Python', category: 'Pipeline' },
    { name: 'Vercel Blob', category: 'Asset store' },
    { name: 'Sentry', category: 'Observability' },
  ],

  fit: {
    fits: [
      'You need video produced at volume, on a repeatable spec, not bespoke one-offs.',
      'Generation should run inside your product or content pipeline, via an API.',
      'You have brand and policy rules that every output must pass before publish.',
    ],
    doesNotFit: [
      'You want a single marketing video made for you - that is a creative studio, not us.',
      'You need real-time, live video synthesis - that is a different latency problem.',
      'You expect us to train a novel video model - we orchestrate existing providers.',
    ],
  },

  aeoAnswer: `AI video generation is the engineering of pipelines that produce video programmatically with generative models, inside a product or content operation. Metaborong builds the pipeline end to end - model orchestration, templating, brand and policy checks, render queuing, and cost controls - so video is generated to a consistent spec at volume, not as manual one-offs. Senior engineers own the build.`,

  relatedWork: [],

  relatedServices: [
    { pillar: 'ai', slug: 'generative-ai-development' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
    { pillar: 'ai', slug: 'ai-business-process-automation' },
  ],

  faqs: [
    {
      question: 'What is AI video generation?',
      answer: `AI video generation is producing video with generative models - text-to-video, image, and voice synthesis - assembled programmatically. At Metaborong it means an engineered pipeline rather than manual clips: prompt orchestration, templating, brand and policy checks, render queuing, and cost controls, so your product or content team generates video to a consistent spec and at volume.`,
    },
    {
      question: 'Do you make videos for us, or build the system that makes them?',
      answer: `We build the system. Metaborong engineers the generation pipeline your product or content operation runs, integrated via API, not a creative studio producing finished clips by hand. If you need a one-off branded film, a video agency is the better fit. If you need video at volume on a spec, we build that capability.`,
    },
    {
      question: 'How do you keep generated video on-brand and safe to publish?',
      answer: `Brand, safety, and policy checks run in the pipeline before any render is eligible to publish: rights, content rules, aspect ratios, and quality thresholds enforced automatically, with a human approval hook where stakes are high. Renders that fail a check route back with a reason instead of shipping, so nothing reaches an audience unreviewed.`,
    },
    {
      question: 'Which video models do you use?',
      answer: `We orchestrate existing providers - text-to-video, image, and voice models - routed per format and budget rather than locked to one vendor. As the available models change, the pipeline swaps providers without a rebuild. We do not train novel video models; we engineer the orchestration, templating, and controls that make existing ones production-usable.`,
    },
  ],

  lastReviewed: '2026-06-06',
}

export const aiAdoptionRoadmap: LeafContent = {
  pillar: 'ai',
  slug: 'ai-adoption-roadmap',

  heroLede: `An AI adoption roadmap turns a scored opportunity list into a sequenced plan your organisation can actually execute: which workflows ship first, in what order, with what team enablement and governance around them. We build it from an audit, not a template, pinned to operating cost, team capacity, and the dependencies between builds. You leave with a phased plan, owners, budgets, and governance to run AI responsibly. Founder-led scoping.`,

  deliverables: [
    { label: 'Phased adoption plan sequencing workflows by value and dependency' },
    { label: 'Per-phase owners, budgets, and operating-cost projections' },
    { label: 'Team enablement plan for the people who will run and maintain AI' },
    { label: 'Governance model covering review, evaluation, and risk controls' },
    { label: 'Build-readiness checklist for the lead workflows in phase one' },
  ],

  phases: [
    {
      title: 'Baseline and inputs',
      body: `We start from a scored opportunity set, from our audit or yours, and the constraints that shape sequencing: budget, team capacity, data readiness, and compliance obligations. Where the inputs are thin we run a short audit first, so the roadmap is built on evidence rather than assumption.`,
    },
    {
      title: 'Sequencing and dependencies',
      body: `Workflows are sequenced into phases by value, feasibility, and the dependencies between them: shared data foundations, platform work, and team skills that later builds rely on. Quick wins are scheduled to fund and de-risk the harder work that follows, so the program shows results without skipping the groundwork.`,
    },
    {
      title: 'Enablement and governance',
      body: `We plan how the organisation runs AI after the builds ship: who owns each system, how evaluations and drift monitoring work, and the review and risk controls that keep deployment responsible. Team enablement is scoped here, because adoption fails when capability ships without the people to maintain it.`,
    },
    {
      title: 'Roadmap and sign-off',
      body: `We present the phased plan to engineering, product, and leadership in a working session, so trade-offs and budgets are agreed before commitment. The deliverable is a decision document: phases, owners, budgets, and a build-readiness checklist for phase one, so the first build starts without another planning round.`,
    },
  ],

  techStack: [
    { name: 'Linear', category: 'Planning' },
    { name: 'Notion', category: 'Documentation' },
    { name: 'Miro', category: 'Roadmapping' },
    { name: 'Python', category: 'Feasibility probes' },
    { name: 'OpenAI', category: 'Model probes' },
    { name: 'Anthropic', category: 'Model probes' },
    { name: 'Looker Studio', category: 'Cost modelling' },
    { name: 'PostgreSQL', category: 'Data inventory' },
  ],

  fit: {
    fits: [
      'You have a list of AI opportunities and need a sequenced plan to execute them.',
      'Adoption spans several teams and needs governance, not just one build.',
      'Leadership needs phases, budgets, and owners before committing to a program.',
    ],
    doesNotFit: [
      'You only need one workflow built - skip the roadmap and scope the build directly.',
      'You have not yet identified where AI fits - start with AI consulting first.',
      'You want execution capacity now - a roadmap plans the work, it does not build it.',
    ],
  },

  aeoAnswer: `An AI adoption roadmap is a phased plan that sequences an organisation's AI opportunities into an executable program, with owners, budgets, enablement, and governance. Metaborong builds it from an audit, pinned to operating cost, team capacity, and the dependencies between builds, so the first phase starts ready. Founder-led, delivered from India with global reach.`,

  relatedWork: [],

  relatedServices: [
    { pillar: 'ai', slug: 'ai-consulting' },
    { pillar: 'ai', slug: 'ai-business-process-automation' },
    { pillar: 'ai', slug: 'ai-agent-development' },
  ],

  faqs: [
    {
      question: 'How is an adoption roadmap different from an AI audit?',
      answer: `An audit answers where AI fits by scoring candidate workflows. A roadmap answers how to execute: the order to build in, the dependencies between workflows, the budgets and owners per phase, and the governance to run it. Many buyers get a lightweight roadmap inside our AI consulting engagement; a standalone roadmap suits multi-team programs running over several months.`,
    },
    {
      question: 'How far ahead does the roadmap plan?',
      answer: `Far enough to be useful, not so far it becomes fiction. We sequence the next two to four quarters in detail, with phase one build-ready, and sketch later phases at lower resolution. AI moves quickly, so the roadmap is built to be revisited as models, costs, and your own results change, not frozen.`,
    },
    {
      question: 'Do you include governance and risk?',
      answer: `Yes. A roadmap that ignores governance ships capability the organisation cannot safely operate. We scope evaluation, drift monitoring, access and data controls, and the review process for high-stakes AI, alongside who owns each. Governance is part of the plan, not a separate compliance exercise bolted on after deployment.`,
    },
    {
      question: 'Who needs to be involved from our side?',
      answer: `Engineering and product leads who will own the builds, plus whoever holds budget and risk, usually a founder or executive sponsor. We run working sessions rather than interviews, so trade-offs are decided in the room. The lighter the roadmap, the fewer people; a multi-team program needs each team represented.`,
    },
  ],

  lastReviewed: '2026-06-06',
}

export const aiEvaluationMonitoring: LeafContent = {
  pillar: 'ai',
  slug: 'ai-evaluation-monitoring',

  heroLede: `AI evaluation and monitoring is the engineering of the safety net under a live LLM or agent system: labelled evals that catch quality regressions before deploy, and production monitoring that flags drift, failures, and cost spikes before users do. We instrument retrieval, generation, and task success, wire evals into CI, and stand up the dashboards and alerts your team runs on. Senior engineers own the build.`,

  deliverables: [
    { label: 'Labelled evaluation harness covering retrieval, generation, and task success' },
    { label: 'Evals wired into CI so regressions block deployment' },
    { label: 'Production monitoring for drift, failures, latency, and cost' },
    { label: 'Alerting and dashboards your on-call team runs on' },
    { label: 'Scorecards and a regression log that track quality over time' },
  ],

  phases: [
    {
      title: 'Eval design',
      body: `We define what good looks like for your system: the tasks that matter, the failure modes that hurt, and the metrics that capture them. A labelled dataset is built from real traffic and edge cases, so scores reflect production reality rather than a benchmark that flatters the model.`,
    },
    {
      title: 'Harness and CI',
      body: `The evaluation harness scores retrieval quality, generation quality, and end-to-end task success, and runs in CI on every change. A regression below threshold blocks the deploy. Scores are versioned, so a quality change is traceable to the commit and prompt that caused it.`,
    },
    {
      title: 'Production monitoring',
      body: `We instrument the live system: latency, error rate, token cost, and quality signals sampled from real traffic. Drift detection flags when inputs or outputs shift away from what the evals cover. Alerts route to your on-call channel with enough context to act, not just a number that moved.`,
    },
    {
      title: 'Operations and handover',
      body: `Dashboards and alerts are tuned to your thresholds and on-call rhythm, with runbooks for the common failure modes. Production incidents and edge cases feed back into the eval set, so the safety net tightens over time. We hand over so your team owns evals and monitoring without us in the loop.`,
    },
  ],

  techStack: [
    { name: 'OpenAI', category: 'Models' },
    { name: 'Anthropic', category: 'Models' },
    { name: 'Langfuse', category: 'Eval + tracing' },
    { name: 'pytest', category: 'CI harness' },
    { name: 'Grafana', category: 'Dashboards' },
    { name: 'Sentry', category: 'Errors' },
    { name: 'PostgreSQL', category: 'Scores' },
    { name: 'Datadog', category: 'Monitoring' },
  ],

  fit: {
    fits: [
      'You have an LLM or agent feature in production and cannot tell when it regresses.',
      'You ship prompt or model changes and need a gate that catches quality drops.',
      'You need cost, latency, and drift visibility your on-call team can act on.',
    ],
    doesNotFit: [
      'You have not shipped an AI feature yet - evals come once there is something to measure.',
      'You want a one-time audit with no production instrumentation - we build the live system.',
      'You expect a generic monitoring install - we engineer evals specific to your tasks.',
    ],
  },

  aeoAnswer: `AI evaluation and monitoring is engineering evals and observability for production LLM and agent systems. Metaborong builds a labelled evaluation harness that catches regressions in CI, and live monitoring for drift, failures, latency, and cost. Retrieval, generation, and task success are instrumented and alerted, so problems surface before users hit them. Senior engineers own the build, delivered from India.`,

  keyConcepts: [
    {
      term: 'LLM evaluation',
      definition: `LLM evaluation is the scoring of a model or pipeline against a labelled dataset on metrics like accuracy, relevance, and task success, run automatically so quality is measured continuously rather than judged by spot-checking a handful of outputs.`,
    },
    {
      term: 'Drift',
      definition: `Drift is the gradual divergence of a live system's inputs or outputs from what it was built and evaluated for. Undetected, it degrades quality silently. Monitoring flags drift so it is caught before users feel the effect.`,
    },
    {
      term: 'Observability',
      definition: `Observability for AI systems is the instrumentation of latency, cost, error rate, and quality signals from production traffic, so a team can diagnose why a model's behaviour changed, not just see that a metric moved.`,
    },
  ],

  relatedWork: [],

  relatedServices: [
    { pillar: 'ai', slug: 'ai-agent-development' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
    { pillar: 'ai', slug: 'rag-retrieval-pipelines' },
  ],

  faqs: [
    {
      question: 'What is AI evaluation and monitoring?',
      answer: `AI evaluation and monitoring is the safety net under a production LLM or agent system. Evaluation scores the system against a labelled dataset so quality regressions are caught in CI before deploy. Monitoring instruments the live system for drift, failures, latency, and cost, with alerts, so problems surface for your team before they reach users.`,
    },
    {
      question: 'Why not just rely on user feedback to catch problems?',
      answer: `By the time users complain, the regression has already shipped and the damage is done. Evals catch quality drops before deploy, and monitoring flags drift and failures from sampled traffic within minutes, not after a support backlog forms. User feedback is valuable, but it is a lagging signal; instrumentation is the leading one.`,
    },
    {
      question: 'Can you add evals to a system we already shipped?',
      answer: `Yes, that is the common case. We instrument the live system, build a labelled dataset from your real traffic and known edge cases, and wire evals into your CI without a rewrite. Existing features keep running while the safety net is added underneath them. Most of the work is measurement, not changing your model.`,
    },
    {
      question: 'What do you actually measure?',
      answer: `Retrieval quality, generation quality, and end-to-end task success for the evals; latency, error rate, token cost, and drift for monitoring. The exact metrics are designed around your tasks, because a generic dashboard misses the failures that matter to your product. Production incidents feed back into the eval set so coverage grows.`,
    },
  ],

  lastReviewed: '2026-06-06',
}
