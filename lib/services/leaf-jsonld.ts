// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD — Service + FAQPage + BreadcrumbList + HowTo + (optional) DefinedTermSet.
// Emitted per published leaf to give crawlers and AI search engines the
// structured surface they need to cite the page. HowTo mirrors the visible
// "How we work" phases (a top AEO schema type). DefinedTermSet only emits when
// the leaf authored a `keyConcepts` block.
// ─────────────────────────────────────────────────────────────────────────────

import type { Pillar, ChildService } from '@/components/sections/services-data'
import { SITE_ORIGIN } from '@/lib/seo'
import type { LeafContent } from '@/lib/services/leaf-content'

export function buildLeafJsonLd({
  pillar,
  leaf,
  content,
  description,
}: {
  pillar: Pillar
  leaf: ChildService
  content: LeafContent
  description?: string
}): Record<string, unknown>[] {
  const leafUrl = `${SITE_ORIGIN}/services/${pillar.id}/${leaf.slug}`

  const service: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${leafUrl}#service`,
    name: leaf.name,
    description: description ?? leaf.description,
    serviceType: leaf.name,
    category: `${pillar.label} engineering services`,
    url: leafUrl,
    provider: {
      '@type': 'Organization',
      name: 'Metaborong',
      url: SITE_ORIGIN,
    },
    areaServed: content.areaServed
      ? { '@type': 'Country', name: content.areaServed }
      : { '@type': 'AdministrativeArea', name: 'Worldwide' },
  }
  if (content.lastReviewed) {
    service.dateModified = content.lastReviewed
    service.reviewedBy = {
      '@type': 'Organization',
      name: 'Metaborong engineering team',
    }
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: { '@type': 'Answer', text: qa.answer },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services/` },
      { '@type': 'ListItem', position: 3, name: pillar.label, item: `${SITE_ORIGIN}${pillar.hubHref}` },
      { '@type': 'ListItem', position: 4, name: leaf.name, item: leafUrl },
    ],
  }

  const blocks: Record<string, unknown>[] = [service, faqPage, breadcrumb]

  if (content.phases.length > 0) {
    const howTo = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${leafUrl}#howto`,
      name: `How we deliver ${leaf.name}`,
      step: content.phases.map((phase, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: phase.title,
        text: phase.body,
      })),
    }
    blocks.push(howTo)
  }

  if (content.keyConcepts && content.keyConcepts.length > 0) {
    const definedTermSet = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${leafUrl}#defined-terms`,
      name: `${leaf.name} glossary`,
      hasDefinedTerm: content.keyConcepts.map((c) => ({
        '@type': 'DefinedTerm',
        name: c.term,
        description: c.definition,
      })),
    }
    blocks.push(definedTermSet)
  }

  return blocks
}
