import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Section } from '@/components/ui/section'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ContactCtaSection } from '@/components/sections/contact-cta'
import { caseStudyMeta } from '@/lib/work'
import { SITE_ORIGIN } from '@/lib/seo'

const WORK_URL = `${SITE_ORIGIN}/work`
// Root layout appends "| Metaborong" via its title template.
const TITLE = 'Our Work: Web3, AI & SaaS Case Studies'
const DESCRIPTION =
  'Case studies from Metaborong: AI platforms, stablecoin banking infrastructure, and blockchain identity systems — all live in production with named clients.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: WORK_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: WORK_URL,
    type: 'website',
    images: [{ url: `${SITE_ORIGIN}/opengraph-image`, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_ORIGIN}/opengraph-image`],
  },
}

// Insertion order of caseStudyMeta is the canonical display order (matches
// the homepage Work-Preview board).
const studies = Object.entries(caseStudyMeta)

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${WORK_URL}#collection`,
  name: TITLE,
  description: DESCRIPTION,
  url: WORK_URL,
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${WORK_URL}#studies`,
  itemListElement: studies.map(([slug, meta], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: meta.seoTitle ?? meta.title,
    url: `${WORK_URL}/${slug}`,
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Work', item: WORK_URL },
  ],
}

const pillarText = (category: string) => (category.startsWith('AI') ? 'text-ai' : 'text-brand')

export default function WorkIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <Breadcrumbs items={[{ label: 'Home', href: '/', home: true }, { label: 'Work' }]} />
        <Section bg="default" maxWidth="xwide">
          <div className="flex flex-col gap-[16px]">
            <SectionEyebrow>Case studies</SectionEyebrow>
            <h1 className="max-w-[800px] text-balance text-[clamp(38px,5.5vw,76px)] font-bold leading-[1.0] tracking-[-0.04em] text-dark">
              Work we&apos;ve shipped
            </h1>
            <p className="max-w-[600px] text-[clamp(17px,1.7vw,20px)] leading-[1.5] tracking-[-0.01em] text-gray">
              Live products across Web3, AI, fintech, and SaaS. Each is engineered for
              production and shipped with founders we still work with.
            </p>
          </div>

          <div className="mt-[48px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
            {studies.map(([slug, meta], i) => (
              <Link
                key={slug}
                href={`/work/${slug}`}
                className="group flex flex-col border border-border bg-bg p-[24px] no-underline transition-colors duration-[200ms] hover:bg-bg-raised motion-reduce:transition-none sm:p-[32px]"
              >
                <div className="flex items-center justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={meta.logo}
                    alt={meta.appName ?? meta.client}
                    className="h-[24px] max-w-[120px] object-contain opacity-80 brightness-0"
                  />
                  <span aria-hidden="true" className="font-mono text-[12px] font-bold tabular-nums text-gray-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <span className={`mt-[24px] font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${pillarText(meta.category)}`}>
                  {meta.category}
                </span>
                <h2 className="mt-[8px] text-[20px] font-bold leading-[1.25] tracking-[-0.025em] text-dark">
                  {meta.appName ?? meta.client}
                </h2>
                <p className="mt-[12px] text-[14px] leading-[1.6] tracking-[-0.005em] text-gray">
                  {meta.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-[24px]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] tabular-nums text-gray-light">
                    {meta.year}
                  </span>
                  <span className="inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-dark transition-colors duration-[150ms] group-hover:text-brand">
                    Read case study <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
        <ContactCtaSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
