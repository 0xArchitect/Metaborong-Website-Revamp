// Characterization tests for /blog/[slug] generateMetadata — canonical shape
// (trailing slash, unlike work/services), canonical_url override, 404 stub.
// Mirrors the app/llms.txt/route.test.ts setup: mongodb-memory-server db
// swapped in via vi.mock, page module re-imported per test. See plans/003.

import { describe, expect, it, beforeEach, vi } from 'vitest'
import { randomUUID } from 'node:crypto'

vi.mock('server-only', () => ({}))
vi.mock('@/db/client', () => ({
  get db() { return testHandle.db },
}))
// generateMetadata calls next/headers (geo resolution), which throws outside
// a request scope; an empty Headers falls through to the default region.
vi.mock('next/headers', () => ({
  headers: async () => new Headers(),
}))

import { createTestDb, type TestDbHandle } from '@/db/test-utils'
import type { PostDoc } from '@/db/schema'
import type { Block } from '@/lib/blog-schema'

let testHandle: TestDbHandle

beforeEach(async () => {
  testHandle = await createTestDb()
  vi.resetModules()
})

async function loadPage() {
  return await import('@/app/blog/[slug]/page')
}

interface InsertOpts {
  slug: string
  title: string
  canonical_url?: string | null
}

async function insertPublished(opts: InsertOpts) {
  const now = new Date('2026-04-01T10:00:00Z')
  const doc: PostDoc = {
    _id:                       randomUUID(),
    slug:                      opts.slug,
    title:                     opts.title,
    excerpt:                   'A short tldr.',
    status:                    'published',
    content_json:              [] as Block[],
    content_schema_version:    1,
    cover_image_id:            null,
    og_image_id:               null,
    tags:                      [],
    author_name:               'admin',
    author_url:                null,
    meta_title:                null,
    meta_description:          null,
    canonical_url:             opts.canonical_url ?? null,
    geo_variants:              {},
    ai_readiness_score:        null,
    ai_readiness_band:         null,
    ai_readiness_report:       null,
    ai_readiness_content_hash: null,
    ai_readiness_checked_at:   null,
    published_at:              now,
    created_at:                now,
    updated_at:                now,
  }
  await testHandle.db.collection<PostDoc>('posts').insertOne(doc)
}

describe('app/blog/[slug] generateMetadata', () => {
  it('canonical is the blog URL WITH trailing slash; markdown alternate on our origin', async () => {
    await insertPublished({ slug: 'my-post', title: 'My post' })
    const { generateMetadata } = await loadPage()
    const meta = await generateMetadata({ params: Promise.resolve({ slug: 'my-post' }) })

    expect(meta.alternates?.canonical).toBe('https://www.metaborong.com/blog/my-post/')
    const types = meta.alternates?.types as Record<string, string>
    expect(types['text/markdown']).toBe('https://www.metaborong.com/blog/my-post/raw.md')
    expect(meta.title).toBe('My post')
    expect(meta.openGraph?.url).toBe('https://www.metaborong.com/blog/my-post/')
  })

  it('a stored canonical_url wins over the derived blog URL', async () => {
    await insertPublished({
      slug: 'syndicated',
      title: 'Syndicated post',
      canonical_url: 'https://example.com/original-home',
    })
    const { generateMetadata } = await loadPage()
    const meta = await generateMetadata({ params: Promise.resolve({ slug: 'syndicated' }) })

    expect(meta.alternates?.canonical).toBe('https://example.com/original-home')
    // The markdown alternate stays anchored to our own origin regardless.
    const types = meta.alternates?.types as Record<string, string>
    expect(types['text/markdown']).toBe('https://www.metaborong.com/blog/syndicated/raw.md')
  })

  it('unknown slug → Not found + noindex', async () => {
    const { generateMetadata } = await loadPage()
    const meta = await generateMetadata({ params: Promise.resolve({ slug: 'missing' }) })
    expect(meta).toEqual({ title: 'Not found', robots: { index: false, follow: false } })
  })
})
