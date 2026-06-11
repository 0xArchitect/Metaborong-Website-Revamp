import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { pillars } from '@/components/sections/services-data'
import { PillarHub } from '@/components/services/pillar-hub'

type Params = { pillar: string }

// Pillar meta titles and descriptions are pinned in SERVICES_PLAN.md § 4 —
// this map mirrors that table so the hubs ship indexable from day one.
// Titles are BARE — the root layout's `title.template` ('%s | Metaborong')
// appends the brand suffix. Do NOT bake '| Metaborong' in here or it doubles.
// Keep each bare title <=47 chars so the rendered title stays <=60.
const PILLAR_META: Record<string, { title: string; description: string }> = {
  ai: {
    title: 'AI Development Services | Copilots, Agents, RAG',
    description:
      'Production AI engineering for startups and enterprise. We build agentic workflows, custom RAG pipelines, and specialized LLM integrations that solve concrete business problems.',
  },
  web3: {
    title: 'Web3 Development Services | Smart Contracts',
    description:
      'Smart-contract, DeFi, NFT, DID, tokenomics, and RWA engineering across EVM, Solana, and Cosmos. Audit-ready multichain Web3 studio, India and global delivery.',
  },
  'product-studio': {
    title: 'Product Studio | MVP, SaaS, B2B Product Builds',
    description:
      'End-to-end product builds for founders. We take zero-to-one SaaS, B2B platforms, and complex MVPs from technical scope through to production launch.',
  },
}

export async function generateStaticParams(): Promise<Params[]> {
  return pillars.map((p) => ({ pillar: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { pillar } = await params
  const meta = PILLAR_META[pillar]
  const p = pillars.find((x) => x.id === pillar)
  if (!p || !meta) return { robots: { index: false, follow: false } }
  // No-slash canonical: hubHref carries a trailing slash that 308-redirects,
  // so the canonical/OG/markdown-alternate URLs are stripped to the 200 URL.
  const hubUrl = `https://www.metaborong.com${p.hubHref.replace(/\/$/, '')}`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: hubUrl,
      types: { 'text/markdown': `${hubUrl}/raw.md` },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: hubUrl,
      type: 'website',
    },
  }
}

export default async function PillarHubPage({ params }: { params: Promise<Params> }) {
  const { pillar } = await params
  const p = pillars.find((x) => x.id === pillar)
  if (!p) notFound()
  return <PillarHub pillar={p} />
}
