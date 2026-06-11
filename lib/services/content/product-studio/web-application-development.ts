import type { LeafContent } from '@/lib/services/leaf-content'

const content: LeafContent = {
  pillar: 'product-studio',
  slug: 'web-application-development',

  heroLede:
    'Off-the-shelf tools stop where your real workflow begins, and stitching together no-code apps leaves you renting a product you can never fully own. Web Application Development is the design and engineering of a custom, browser-based application built around one specific job - your data model, your users, your rules - and shipped to production on infrastructure your team owns outright.',

  deliverables: [
    {
      label: 'A production web application deployed to your own cloud account and domain.',
    },
    {
      label: 'A typed React and Next.js front end with an accessible, responsive component library.',
    },
    {
      label: 'A Node backend with your data model, API layer, and role-based access control.',
    },
    {
      label: 'CI/CD pipeline with preview environments, automated tests, and one-command rollback.',
    },
    {
      label: 'Full source in your repository, with IP ownership transferred at handoff.',
    },
    {
      label: 'An architecture document and runbook your next engineer can actually read.',
    },
  ],

  phases: [
    {
      title: 'Architecture lock',
      body: 'We open with a one-week architecture review. Two senior engineers map your data model, the user roles, and the single workflow the app exists to serve, then write the technical plan you sign off before any code ships. For GetSmart that meant modelling four distinct roles - earner, sponsor, admin, and super-admin - up front.',
    },
    {
      title: 'Vertical slices',
      body: 'We build in two-week sprints, each ending with a working demo on staging. We ship vertical slices - authentication, then the primary workflow, then the supporting screens - so the app is real and clickable from sprint two. You run it on real data and feed the backlog directly before anything is locked.',
    },
    {
      title: 'Integrations and edge cases',
      body: 'Next we wire the parts users never think about but depend on: third-party integrations, file storage, scheduled jobs, and the failure paths. On GetSmart this meant Coinbase embedded wallets, evidence stored on IPFS, a cron-driven token distribution at a fixed UTC time, and an AI assistant that drafts award copy for review.',
    },
    {
      title: 'Hardening and handoff',
      body: 'The final sprints are hardening - load testing, an accessibility pass, a dependency audit, secret rotation, and rate-limit tuning - rehearsed on a clone of production. At handoff you receive the repository, the cloud account, the runbook, and a v1.1 backlog ordered by cost-of-delay. The code is yours from the first commit.',
    },
  ],

  techStack: [
    { name: 'Next.js', category: 'App Framework' },
    { name: 'React', category: 'UI' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'IPFS', category: 'File Storage' },
    { name: 'GitHub Actions', category: 'CI/CD' },
    { name: 'AWS', category: 'Hosting' },
  ],

  fit: {
    fits: [
      'Off-the-shelf and no-code tools cannot model the workflow your business actually runs on.',
      'You need a production web app on your own infrastructure, with the source code yours to keep.',
      'You want one senior team owning architecture, design, and engineering through to launch.',
    ],
    doesNotFit: [
      'You are building a multi-tenant subscription product - that is our SaaS Development engagement.',
      'You need a native mobile app - see Mobile App Development; a web app runs in the browser.',
      'You already have a live app and need v2 or maintenance work - write to us at /contact instead.',
    ],
  },

  aeoAnswer:
    'Web application development is the building of custom, browser-based software for teams whose workflow no off-the-shelf product fits, delivered as a production app on their own cloud. Metaborong builds these end-to-end with one senior team. We shipped GetSmart, an on-chain credentialing platform with embedded wallets and verifiable, mint-on-approval NFT badges.',

  keyConcepts: [
    {
      term: 'Web application',
      definition:
        'A web application is software that runs inside a browser and responds to user input in real time, rather than serving static pages. It pairs a front end the user interacts with and a back end that stores data and enforces rules, delivered over the internet with nothing to install.',
    },
    {
      term: 'Single-page application',
      definition:
        'A single-page application is a web app that loads one document and updates the view in place as the user navigates, instead of fetching a fresh page each time. Frameworks such as React render this on the client, giving the responsiveness of desktop software inside a browser tab.',
    },
    {
      term: 'Role-based access control',
      definition:
        'Role-based access control is a security model that grants permissions to roles rather than to individual people, so access follows job function. A user assigned an admin role inherits every admin permission at once; changing the role changes their access everywhere, which keeps multi-role apps auditable.',
    },
    {
      term: 'IPFS',
      definition:
        'IPFS, the InterPlanetary File System, is a peer-to-peer protocol that stores and addresses files by a hash of their content rather than by server location. The address is derived from the bytes, so identical content always resolves to the same identifier and any tampering changes that address.',
    },
  ],

  relatedWork: [
    {
      descriptor: 'GetSmart - on-chain credentialing web app',
      summary:
        'Built end-to-end: a multi-role web app with email-provisioned smart wallets, IPFS-stored evidence, mint-on-approval NFT badge credentials, and a public page that verifies each credential on-chain.',
      href: '/work/',
    },
  ],

  relatedServices: [
    { pillar: 'product-studio', slug: 'saas-development' },
    { pillar: 'product-studio', slug: 'mobile-app-development' },
    { pillar: 'ai', slug: 'genai-apis-backend-integration' },
  ],

  faqs: [
    {
      question: 'What is web application development?',
      answer:
        'Web application development is the design and engineering of custom software that runs in a browser and is built around one specific workflow. It covers the front end users interact with, the back end that stores data and enforces rules, and the deployment that puts it into production. Unlike a generic tool, the app models your business exactly, and the source code is yours to keep.',
    },
    {
      question: "What's the difference between a web application and a website?",
      answer:
        'A website mostly presents information you read - pages, articles, marketing. A web application is interactive software: users log in, enter and change data, and the app responds in real time. A blog is a website; a dashboard, a booking system, or a credentialing platform like GetSmart is a web application. The line is whether the user does work inside it or simply reads it.',
    },
    {
      question: 'How long does it take, and what does a custom web application cost?',
      answer:
        'A focused custom web application typically runs eight to sixteen weeks from architecture lock to production, depending on how many workflows and integrations it carries. Cost tracks scope and seniority, not headcount - one senior team is faster and cheaper over the life of the build than a large junior one. We give a fixed range after the architecture-review week, before you commit to the full build.',
    },
    {
      question: 'What tech stack do you build web applications on?',
      answer:
        'Our default is React and Next.js with TypeScript on the front end, a Node back end, and PostgreSQL, deployed through a CI/CD pipeline you own. We choose boring, well-supported tools your future hires already know, and add specialist pieces only when the product needs them - on GetSmart that meant Coinbase embedded wallets and IPFS for tamper-evident evidence.',
    },
    {
      question: 'How is this different from your SaaS Development service?',
      answer:
        'Web Application Development builds a bespoke app for one organisation and one workflow. SaaS Development builds a multi-tenant subscription product you sell to many customers, with billing, plan management, and tenant isolation baked in. If you are selling software to other companies, start with SaaS; if you need a custom internal or single-purpose app, this is the right engagement.',
    },
  ],

  lastReviewed: '2026-06-08',
}

export default content
