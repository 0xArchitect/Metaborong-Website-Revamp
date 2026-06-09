// Case-study metadata shared by the /work/[slug] page, its raw.md GEO export,
// and the sitemap. Single source of truth for which work pages exist and the
// per-project hero/SEO facts. The markdown body lives in content/work/<slug>.md.

export interface CaseStudyMeta {
  title: string
  description: string
  logo: string
  category: string
  animatedLogo?: string
  demoVideo?: string
  demoPoster?: string // poster frame for the demo video
  glowColor?: string // CSS colour for hero glow — defaults to brand blue
  // SunsetML (AEO re-architecture) optional facts. Other slugs fall back to the
  // legacy hardcoded hero row until they are migrated.
  seoTitle?: string // keyword-led <title>; falls back to title.split(':')[0]
  client?: string // hero "Client" value; falls back to title.split(':')[0]
  services?: string // hero "Services" value; falls back to 'Platform Engineering'
  year?: string // hero "Year" value; falls back to '2024'
  datePublished?: string // ISO date for Article JSON-LD (page publish date)
  appCategory?: string // JSON-LD about.SoftwareApplication applicationCategory
  appName?: string // product name (breadcrumb + JSON-LD about); falls back to client
}

export const caseStudyMeta: Record<string, CaseStudyMeta> = {
  sunset: {
    title: 'SunsetML: How Metaborong Built an AI-Native Writing Platform That Eliminates Creative Friction',
    seoTitle: 'SunsetML: AI-Native Writing Platform Case Study',
    description:
      'SunsetML is an AI-native writing platform with an in-editor AI prompt bar and live multi-model switching, built ground-up by Metaborong for creators and teams.',
    logo: '/clients/sunset.svg',
    client: 'SunsetML',
    category: 'AI · Platform',
    services: 'AI Integration · Full-Stack Engineering',
    year: '2026',
    datePublished: '2026-06-09',
    animatedLogo: '/works/sunset/animated-logo.mp4',
    demoVideo: '/works/sunset/demo.mp4',
    demoPoster: '/works/sunset/demo-poster.jpg',
    glowColor: '#ff6b35', // warm orange matching SunsetML brand
    appCategory: 'AI writing platform',
  },
  magic: {
    title: 'MAGIC by Omagic AI: How Metaborong Built a Scalable AI Product Video and Creative Automation Platform for E-commerce',
    seoTitle: 'MAGIC by Omagic AI: AI Creative Automation Case Study',
    description:
      'MAGIC by Omagic AI turns one product image into product videos, CGI visuals, and marketplace packshots at scale. Built ground-up by Metaborong for e-commerce.',
    logo: '/clients/magic.svg',
    client: 'Omagic AI',
    appName: 'MAGIC',
    category: 'AI · Automation',
    services: 'AI Integration · Full-Stack Engineering',
    year: '2025',
    datePublished: '2026-06-09',
    animatedLogo: '/works/magic/animated-logo.mp4',
    demoVideo: '/works/magic/demo.mp4',
    demoPoster: '/works/magic/demo-poster.jpg',
    glowColor: '#a855f7', // purple/violet matching MAGIC brand
    appCategory: 'AI creative automation platform',
  },
  orbitx: {
    title: 'OrbitX: How Metaborong Engineered a Production-Grade Stablecoin Banking Infrastructure for Global Payments',
    description:
      'Metaborong built OrbitX, a stablecoin banking infrastructure with smart contracts, escrow systems, USDC treasury management, and on-chain governance on Coinbase Base Network.',
    logo: '/clients/orbitx.svg',
    category: 'Web3 · Fintech',
    glowColor: '#22d3ee', // cyan/teal
  },
  sedax: {
    title: 'SEDAX: How Metaborong Built a Blockchain eKYC Platform with Zero-Knowledge Proof Identity Verification',
    description:
      'Metaborong engineered SEDAX, a blockchain eKYC platform using Zero-Knowledge Proofs, self-sovereign identity, and verifiable credentials for privacy-first digital identity verification.',
    logo: '/clients/sedax.svg',
    category: 'Web3 · Identity',
    glowColor: '#10b981', // emerald
  },
}

export const workSlugs = Object.keys(caseStudyMeta)
