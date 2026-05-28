import { ServicesPillarsLazy } from '@/components/sections/services-pillars-lazy'

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Metaborong build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metaborong is a boutique engineering studio building three product categories: Web3 protocols (DeFi, NFT marketplaces, DAOs); AI agents (agentic pipelines, RAG, voice); and full-stack SaaS products (MVP and B2B builds). One senior team owns architecture, engineering, security, and deployment across EVM, Solana, and Cosmos.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Metaborong differ from a freelancer marketplace?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metaborong is a single accountable studio where one senior team owns the engagement end-to-end. Engineering, design, and architecture stay on the project from specification through production deployment. Freelancer marketplaces fragment ownership across roles and re-bid talent per phase; Metaborong runs one continuous team instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'What blockchain ecosystems does Metaborong support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metaborong builds across the three primary smart-contract ecosystems: EVM chains including Ethereum and Layer-2 rollups, where the studio ships Solidity protocols; Solana, including SPL tokens and Anchor programs; and Cosmos, including CosmWasm modules. Categories covered: DeFi, NFT, wallets, liquid staking, and DAO systems.',
      },
    },
  ],
}

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="services-section-bridge bg-bg"
    >
      <h2 id="services-heading" className="sr-only">What we build: a small, senior team across three pillars</h2>
      <ServicesPillarsLazy />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: FAQ_JSONLD_JSON }}
      />
    </section>
  )
}

const FAQ_JSONLD_JSON = JSON.stringify(FAQ_JSONLD)
