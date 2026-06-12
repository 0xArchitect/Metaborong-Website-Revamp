// Characterization tests for the per-leaf JSON-LD builder. Written against
// live taxonomy/content data so legitimate copy changes adapt automatically —
// see plans/003.

import { describe, expect, it } from 'vitest'

import { buildLeafJsonLd } from '@/lib/services/leaf-jsonld'
import { pillars, getPublishedLeaves, type Pillar, type ChildService } from '@/components/sections/services-data'
import { getLeafContent } from '@/lib/services/content'
import { getLeafSeo } from '@/lib/services/seo-map'
import type { LeafContent } from '@/lib/services/leaf-content'

interface AuthoredLeaf {
  pillar: Pillar
  leaf: ChildService
  content: LeafContent
}

// Every published leaf whose content has been authored — the set the live
// site actually emits JSON-LD for.
const authoredLeaves: AuthoredLeaf[] = pillars.flatMap((pillar) =>
  getPublishedLeaves(pillar).flatMap((leaf) => {
    const content = getLeafContent(pillar.id, leaf.slug)
    return content ? [{ pillar, leaf, content }] : []
  }),
)

function blocksFor({ pillar, leaf, content }: AuthoredLeaf) {
  return buildLeafJsonLd({
    pillar,
    leaf,
    content,
    description: getLeafSeo(pillar.id, leaf.slug)?.description,
  })
}

describe('buildLeafJsonLd', () => {
  it('has at least one published, authored leaf to characterize', () => {
    expect(authoredLeaves.length).toBeGreaterThan(0)
  })

  describe('first authored leaf in taxonomy order', () => {
    const first = authoredLeaves[0]
    const blocks = blocksFor(first)
    const types = blocks.map((b) => b['@type'])

    it('emits exactly one block per expected @type', () => {
      const expected = ['Service', 'FAQPage', 'BreadcrumbList']
      if (first.content.phases.length > 0) expected.push('HowTo')
      if (first.content.keyConcepts && first.content.keyConcepts.length > 0) {
        expected.push('DefinedTermSet')
      }
      expect([...types].sort()).toEqual([...expected].sort())
    })

    it('every block carries the schema.org @context', () => {
      for (const block of blocks) {
        expect(block['@context']).toBe('https://schema.org')
      }
    })

    it('the Service @id is the leaf URL + #service', () => {
      const service = blocks.find((b) => b['@type'] === 'Service')!
      expect(service['@id']).toBe(
        `https://www.metaborong.com/services/${first.pillar.id}/${first.leaf.slug}#service`,
      )
    })

    it('every block survives a JSON round-trip', () => {
      for (const block of blocks) {
        expect(JSON.parse(JSON.stringify(block))).toEqual(block)
      }
    })
  })

  describe('sweep: every published, authored leaf', () => {
    it('emits DefinedTermSet iff the leaf authored keyConcepts', () => {
      for (const entry of authoredLeaves) {
        const hasSet = blocksFor(entry).some((b) => b['@type'] === 'DefinedTermSet')
        const authored = Boolean(entry.content.keyConcepts && entry.content.keyConcepts.length > 0)
        expect(hasSet, `${entry.pillar.id}/${entry.leaf.slug}`).toBe(authored)
      }
    })

    it('no block serializes with a literal "undefined"', () => {
      for (const entry of authoredLeaves) {
        for (const block of blocksFor(entry)) {
          expect(
            JSON.stringify(block).includes('undefined'),
            `${entry.pillar.id}/${entry.leaf.slug} (${block['@type']})`,
          ).toBe(false)
        }
      }
    })

    it('BreadcrumbList positions are sequential 1..n', () => {
      for (const entry of authoredLeaves) {
        const crumb = blocksFor(entry).find((b) => b['@type'] === 'BreadcrumbList')!
        const items = crumb.itemListElement as Array<{ position: number; item: string }>
        items.forEach((item, i) => {
          expect(item.position, `${entry.pillar.id}/${entry.leaf.slug}`).toBe(i + 1)
          expect(item.item).toMatch(/^https:\/\/www\.metaborong\.com\//)
        })
      }
    })
  })
})
