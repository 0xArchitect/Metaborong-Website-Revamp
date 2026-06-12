// Characterization tests for /work/[slug] generateMetadata — canonical shape,
// markdown alternate, OG parity. See plans/003.
//
// Trailing-slash policy is asymmetric by design: work/services canonicals have
// NO trailing slash; blog canonicals keep it. Don't "fix" this for consistency.

import { describe, expect, it } from 'vitest'

import { generateMetadata } from './page'
import { caseStudyMeta, workSlugs } from '@/lib/work'

describe('app/work/[slug] generateMetadata', () => {
  it('covers the expected case-study slugs', () => {
    expect(workSlugs.length).toBeGreaterThan(0)
  })

  for (const slug of workSlugs) {
    it(`${slug}: canonical, markdown alternate, OG url, non-empty copy`, async () => {
      const meta = await generateMetadata({ params: Promise.resolve({ slug }) })
      const canonical = `https://www.metaborong.com/work/${slug}`

      expect(meta.alternates?.canonical).toBe(canonical)
      const types = meta.alternates?.types as Record<string, string>
      expect(types['text/markdown']).toBe(`${canonical}/raw.md`)

      expect(String(meta.title).length).toBeGreaterThan(0)
      expect(String(meta.description).length).toBeGreaterThan(0)
      expect(meta.description).toBe(caseStudyMeta[slug].description)

      expect(meta.openGraph?.url).toBe(canonical)
    })
  }

  it('returns {} for an unknown slug', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: 'does-not-exist' }) })
    expect(meta).toEqual({})
  })
})
