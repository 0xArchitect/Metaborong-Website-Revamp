import type { Metadata } from 'next'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { ServicesOverview } from '@/components/services/services-overview'

// Meta values per SERVICES_PLAN.md § 4. Description is 158 chars.
export const metadata: Metadata = {
  title: 'Services | AI, Web3, Product Studio | Metaborong',
  description:
    'Engineering services for founders and technical teams. We sell three engagements: AI capability, decentralized protocols, and end-to-end product builds.',
  alternates: { canonical: 'https://www.metaborong.com/services/' },
  openGraph: {
    title: 'Services | AI, Web3, Product Studio | Metaborong',
    description:
      'Engineering services for founders and technical teams. We sell three engagements: AI capability, decentralized protocols, and end-to-end product builds.',
    url: 'https://www.metaborong.com/services/',
  },
}

export default function ServicesOverviewPage() {
  return (
    <>
      <Nav />
      <main className="pt-[56px]">
        <ServicesOverview />
      </main>
      <Footer />
    </>
  )
}
