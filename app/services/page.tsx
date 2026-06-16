import type { Metadata } from 'next'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ServicesOverview } from '@/components/services/services-overview'
import { OVERVIEW_FAQS } from '@/components/services/services-overview-data'
import { buildServicesOverviewBreadcrumb, serviceSchemas } from '@/lib/schema'

const SERVICES_URL = 'https://www.metaborong.com/services/'
const TITLE = 'AI & Blockchain Development Company | Metaborong'
const DESCRIPTION =
  'Metaborong is an AI and blockchain development company building production AI systems, on-chain protocols, and SaaS products for founders. One senior team.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SERVICES_URL,
    types: { 'text/markdown': `${SERVICES_URL}raw.md` },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SERVICES_URL,
    images: [{ url: 'https://www.metaborong.com/opengraph-image', width: 1200, height: 630, alt: TITLE }],
  },
}

// FAQPage built from the same OVERVIEW_FAQS the page renders, so the visible
// accordion and the extractable schema never drift. BreadcrumbList + the three
// pillar Service/OfferCatalog nodes reuse the shared builders in lib/schema.ts.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SERVICES_URL}#faq`,
  mainEntity: OVERVIEW_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}
const breadcrumbSchema = buildServicesOverviewBreadcrumb()

export default function ServicesOverviewPage() {
  return (
    <>
      <Nav />
      <main>
        <Breadcrumbs items={[{ label: 'Home', href: '/', home: true }, { label: 'Services' }]} />
        <ServicesOverview />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {serviceSchemas.map((s) => (
        <script
          key={s['@id']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
