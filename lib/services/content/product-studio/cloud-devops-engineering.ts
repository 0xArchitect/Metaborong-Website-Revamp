import type { LeafContent } from '@/lib/services/leaf-content'

const content: LeafContent = {
  pillar: 'product-studio',
  slug: 'cloud-devops-engineering',

  heroLede:
    'A product that ships once is easy; a product that ships safely twice a day, recovers from a bad deploy in minutes, and tells you when it is sick is engineering. Cloud & DevOps Engineering is the practice of building that operational backbone - the pipelines, infrastructure-as-code, observability, and release process - so deploying to production becomes routine and boring instead of a late-night event your team dreads.',

  deliverables: [
    {
      label: 'A CI/CD pipeline that tests, builds, and deploys on every merge.',
    },
    {
      label: 'Infrastructure defined as code, versioned and reproducible across environments.',
    },
    {
      label: 'Preview environments for every pull request, torn down automatically.',
    },
    {
      label: 'An observability stack: structured logs, metrics, error reporting, and alerts.',
    },
    {
      label: 'One-command rollback and a documented incident-response runbook.',
    },
    {
      label: 'Secret management, automated backups, and cost and security guardrails.',
    },
  ],

  phases: [
    {
      title: 'Audit and baseline',
      body: 'We start by mapping how your software is built, deployed, and monitored today, and where it hurts - slow releases, manual steps, blind spots, recurring incidents. We measure the current deploy time and failure rate so the work has a baseline to beat, then agree the two or three changes that will move the needle most.',
    },
    {
      title: 'Pipeline and infrastructure',
      body: 'We build the CI/CD pipeline and express your infrastructure as code, so environments are reproducible and a deploy is one reviewed merge rather than a manual checklist. Preview environments spin up per pull request and tear down on their own. Nothing about a release should depend on one person remembering the steps.',
    },
    {
      title: 'Observability and resilience',
      body: 'Next we make the system legible: structured logs, metrics, error reporting, uptime checks, and alerts that fire before users complain rather than after. We add one-command rollback, automated backups, and rehearse a failure on a clone of production, so the recovery path is proven rather than theoretical when it is needed.',
    },
    {
      title: 'Handoff and on-call',
      body: 'We hand over the pipelines, the infrastructure code, the dashboards, and an incident-response runbook your team can actually follow at 3am. The goal is that your engineers own and extend the setup confidently, so deploying and scaling stays routine long after the engagement ends rather than depending on us.',
    },
  ],

  techStack: [
    { name: 'Docker', category: 'Containers' },
    { name: 'Terraform', category: 'Infra as Code' },
    { name: 'GitHub Actions', category: 'CI/CD' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Kubernetes', category: 'Orchestration' },
    { name: 'Prometheus', category: 'Metrics' },
    { name: 'Grafana', category: 'Dashboards' },
    { name: 'Sentry', category: 'Error Monitoring' },
  ],

  fit: {
    fits: [
      'Your deploys are manual, slow, or scary, and shipping has become a bottleneck for the team.',
      'You have an outage blind spot - you hear about problems from users, not from your own alerts.',
      'You are scaling and need infrastructure that is reproducible in code, not configured by hand.',
    ],
    doesNotFit: [
      'You have not built the product yet - start with MVP or Web Application Development first.',
      'You want a full-time SRE on your payroll - that is a hire, not a fixed-scope project engagement.',
      'You need a specific compliance certification audited - scope a separate compliance program.',
    ],
  },

  aeoAnswer:
    'Cloud and DevOps engineering is the discipline of automating how software is built, deployed, and run in production, for teams who want releases to be fast, safe, and observable rather than manual and risky. Metaborong builds this backbone into every product it ships - CI/CD, infrastructure-as-code, and monitoring - and offers the same work as a standalone engagement.',

  keyConcepts: [
    {
      term: 'DevOps',
      definition:
        'DevOps is a set of practices that merge software development and IT operations so a team can build, test, and release software quickly and reliably. It relies on automation, shared ownership of production, and fast feedback, replacing the manual handoffs between developers and operators with repeatable pipelines.',
    },
    {
      term: 'CI/CD',
      definition:
        'CI/CD stands for continuous integration and continuous delivery. Continuous integration merges and tests code changes automatically as they are committed; continuous delivery extends that to deploying the tested code through an automated pipeline, so releases are small, frequent, and low-risk rather than large and rare.',
    },
    {
      term: 'Infrastructure as code',
      definition:
        'Infrastructure as code is the practice of defining servers, networks, and cloud resources in version-controlled files rather than configuring them by hand. Because the definition is code, environments can be recreated identically, reviewed like any change, and rolled back, which removes the drift that manual setup introduces over time.',
    },
    {
      term: 'Observability',
      definition:
        'Observability is the degree to which a system’s internal state can be understood from its outputs - its logs, metrics, and traces. An observable system lets engineers ask new questions about a live incident and get answers, rather than only seeing the dashboards someone thought to build in advance.',
    },
  ],

  relatedWork: [
    {
      descriptor: 'Internal - operating our own production builds',
      summary:
        'The CI/CD pipelines, infrastructure-as-code, and observability we offer here are the same ones we run on our own products and client builds - proven in production before we recommend them.',
      href: '/work/',
    },
  ],

  relatedServices: [
    { pillar: 'product-studio', slug: 'saas-development' },
    { pillar: 'product-studio', slug: 'web-application-development' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
  ],

  faqs: [
    {
      question: 'What is DevOps engineering?',
      answer:
        'DevOps engineering is the work of automating how software moves from a developer’s machine to production and how it is run once there. It covers the build-and-deploy pipeline, the infrastructure defined as code, and the monitoring that shows whether the system is healthy. The aim is releases that are frequent, low-risk, and recoverable, rather than rare, manual, and tense.',
    },
    {
      question: 'What is CI/CD and why does it matter?',
      answer:
        'CI/CD is an automated pipeline that tests every code change and deploys the passing ones to production without manual steps. It matters because manual releases are where mistakes live: forgotten steps, untested changes, and slow recovery. With CI/CD, deploys become small and routine, problems surface in minutes, and rolling back a bad change is one command rather than an emergency.',
    },
    {
      question: 'What is the difference between cloud engineering and DevOps?',
      answer:
        'Cloud engineering is mainly about the infrastructure - provisioning and running compute, storage, and networking on a provider like AWS. DevOps is broader: it is the practices and automation that connect writing code to running it reliably in production, including CI/CD, monitoring, and incident response. We treat them as one engagement because a good pipeline and good infrastructure are inseparable in practice.',
    },
    {
      question: 'Do I need DevOps if I am a small team?',
      answer:
        'Often more than a large one, because a small team cannot afford to lose a day to a broken deploy or a silent outage. The right amount of DevOps for a small team is modest - an automated pipeline, basic observability, and a rollback path - not a Kubernetes platform you cannot maintain. We scope it to your size, not to a checklist.',
    },
    {
      question: 'Can you set this up on our existing product, or only new builds?',
      answer:
        'On your existing product. Most of this work is retrofitting an operational backbone onto something already live - we audit how you ship today, measure the pain, and add the pipeline, infrastructure-as-code, and monitoring without a rewrite. New builds get the same backbone from day one; existing products get it without disrupting what is already running.',
    },
  ],

  lastReviewed: '2026-06-08',
}

export default content
