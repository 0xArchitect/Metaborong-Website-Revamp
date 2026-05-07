// Unit tests for the M5-core JSON-LD builders.

import { describe, expect, it } from 'vitest'
import {
  articleSchema,
  breadcrumbSchema,
  deriveStepName,
  faqPageSchema,
  howToSchema,
  speakableSchema,
  SITE_ORIGIN,
} from './seo'
import type { Block, Post } from './blog-schema'

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'how-we-shipped',
    title: 'How we shipped the protocol in six weeks',
    excerpt: 'A short summary that doubles as the lede.',
    status: 'published',
    content_json: [],
    content_schema_version: 1,
    cover_image_id: null,
    og_image_id: null,
    tags: ['web3', 'engineering'],
    author_name: 'Arnab Ray',
    author_url: 'https://example.com/arnab',
    meta_title: null,
    meta_description: null,
    canonical_url: null,
    geo_variants: {},
    ai_readiness_score: null,
    ai_readiness_band: null,
    ai_readiness_report: null,
    ai_readiness_checked_at: null,
    published_at: '2026-04-12T08:00:00.000Z',
    created_at: '2026-04-10T08:00:00.000Z',
    updated_at: '2026-04-12T08:00:00.000Z',
    ...overrides,
  }
}

describe('articleSchema', () => {
  it('emits a schema.org Article with mandatory fields populated', () => {
    const out = articleSchema({ post: makePost() })
    expect(out['@context']).toBe('https://schema.org')
    expect(out['@type']).toBe('Article')
    expect(out.headline).toBe('How we shipped the protocol in six weeks')
    expect(out.datePublished).toBe('2026-04-12T08:00:00.000Z')
    expect(out.dateModified).toBe('2026-04-12T08:00:00.000Z')
    expect(out.url).toBe(`${SITE_ORIGIN}/blog/how-we-shipped/`)
  })

  it('falls back to /og?slug=… when no cover image url is supplied', () => {
    const out = articleSchema({ post: makePost() })
    expect(out.image).toBe(`${SITE_ORIGIN}/og?slug=how-we-shipped`)
  })

  it('uses the supplied cover image when present', () => {
    const out = articleSchema({
      post: makePost(),
      imageUrl: 'https://cdn.example/cover.jpg',
    })
    expect(out.image).toBe('https://cdn.example/cover.jpg')
  })

  it('prefers meta_title and meta_description when set', () => {
    const out = articleSchema({
      post: makePost({
        meta_title: 'Six weeks, one protocol',
        meta_description: 'How we did it.',
      }),
    })
    expect(out.headline).toBe('Six weeks, one protocol')
    expect(out.description).toBe('How we did it.')
  })

  it('honors canonical_url when set', () => {
    const out = articleSchema({
      post: makePost({ canonical_url: 'https://canonical.example/post' }),
    })
    expect(out.url).toBe('https://canonical.example/post')
    expect(out.mainEntityOfPage).toEqual({
      '@type': 'WebPage',
      '@id': 'https://canonical.example/post',
    })
  })

  it('emits author with url when author_url present, name-only otherwise', () => {
    const withUrl = articleSchema({ post: makePost() })
    expect(withUrl.author).toEqual({
      '@type': 'Person',
      name: 'Arnab Ray',
      url: 'https://example.com/arnab',
    })
    const without = articleSchema({ post: makePost({ author_url: null }) })
    expect(without.author).toEqual({ '@type': 'Person', name: 'Arnab Ray' })
  })

  it('joins tags into keywords; omits keywords entirely when empty', () => {
    expect(articleSchema({ post: makePost() }).keywords).toBe('web3, engineering')
    expect(articleSchema({ post: makePost({ tags: [] }) }).keywords).toBeUndefined()
  })

  it('falls back to created_at when published_at is null (still-draft case)', () => {
    const out = articleSchema({ post: makePost({ published_at: null }) })
    expect(out.datePublished).toBe('2026-04-10T08:00:00.000Z')
  })

  it('publisher is the Metaborong Organization stub', () => {
    const out = articleSchema({ post: makePost() }) as { publisher: Record<string, unknown> }
    expect(out.publisher['@type']).toBe('Organization')
    expect(out.publisher.name).toBe('Metaborong')
    expect(out.publisher.url).toBe(SITE_ORIGIN)
  })
})

describe('breadcrumbSchema', () => {
  it('emits Home → Blog → Post in order', () => {
    const out = breadcrumbSchema({
      post: { slug: 'how-we-shipped', title: 'How we shipped' },
    }) as { '@type': string; itemListElement: Array<{ position: number; name: string; item: string }> }
    expect(out['@type']).toBe('BreadcrumbList')
    expect(out.itemListElement).toHaveLength(3)
    expect(out.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_ORIGIN,
    })
    expect(out.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${SITE_ORIGIN}/blog/`,
    })
    expect(out.itemListElement[2]).toEqual({
      '@type': 'ListItem',
      position: 3,
      name: 'How we shipped',
      item: `${SITE_ORIGIN}/blog/how-we-shipped/`,
    })
  })
})

// ─── M9-AEO ───────────────────────────────────────────────────────────────────

function faq(id: string, question: string, answer: string): Block {
  return { id, type: 'faq', data: { question, answer } }
}

function step(id: string, text: string): Block {
  return { id, type: 'paragraph', role: 'step', data: { text } }
}

describe('faqPageSchema', () => {
  it('returns null when no faq blocks are present', () => {
    expect(faqPageSchema(makePost({ content_json: [] }))).toBeNull()
    expect(
      faqPageSchema(
        makePost({
          content_json: [
            { id: '1', type: 'paragraph', data: { text: 'Body.' } },
          ],
        }),
      ),
    ).toBeNull()
  })

  it('emits an FAQPage with a single Question for one faq block', () => {
    const out = faqPageSchema(
      makePost({ content_json: [faq('q1', 'Why?', 'Because.')] }),
    ) as { '@context': string; '@type': string; mainEntity: Array<Record<string, unknown>> }
    expect(out['@context']).toBe('https://schema.org')
    expect(out['@type']).toBe('FAQPage')
    expect(out.mainEntity).toHaveLength(1)
    expect(out.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Why?',
      acceptedAnswer: { '@type': 'Answer', text: 'Because.' },
    })
  })

  it('preserves block order across multiple faqs', () => {
    const out = faqPageSchema(
      makePost({
        content_json: [
          faq('a', 'First?', 'One.'),
          { id: 'mid', type: 'paragraph', data: { text: 'Filler.' } },
          faq('b', 'Second?', 'Two.'),
          faq('c', 'Third?', 'Three.'),
        ],
      }),
    ) as { mainEntity: Array<{ name: string }> }
    expect(out.mainEntity.map((q) => q.name)).toEqual([
      'First?',
      'Second?',
      'Third?',
    ])
  })

  it('still emits when an answer is empty (does not gate on data quality)', () => {
    const out = faqPageSchema(
      makePost({ content_json: [faq('q1', 'Why?', '')] }),
    ) as { mainEntity: Array<{ acceptedAnswer: { text: string } }> }
    expect(out.mainEntity[0].acceptedAnswer.text).toBe('')
  })
})

describe('howToSchema', () => {
  it('returns null when no step-role blocks exist', () => {
    expect(howToSchema(makePost({ content_json: [] }))).toBeNull()
    expect(
      howToSchema(
        makePost({
          content_json: [
            { id: '1', type: 'paragraph', data: { text: 'Body.' } },
            { id: '2', type: 'paragraph', role: 'intro', data: { text: 'Intro.' } },
          ],
        }),
      ),
    ).toBeNull()
  })

  it('returns null below the three-step threshold', () => {
    expect(
      howToSchema(
        makePost({
          content_json: [step('1', 'First.'), step('2', 'Second.')],
        }),
      ),
    ).toBeNull()
  })

  it('emits a HowTo with positions 1..N preserving content_json order', () => {
    const out = howToSchema(
      makePost({
        content_json: [
          step('s1', 'Boot the cluster.'),
          { id: 'mid', type: 'paragraph', data: { text: 'Aside.' } },
          step('s2', 'Apply migrations.'),
          step('s3', 'Verify health.'),
        ],
      }),
    ) as { '@type': string; name: string; step: Array<{ position: number; name: string; text: string }> }
    expect(out['@type']).toBe('HowTo')
    expect(out.name).toBe('How we shipped the protocol in six weeks')
    expect(out.step).toHaveLength(3)
    expect(out.step.map((s) => s.position)).toEqual([1, 2, 3])
    expect(out.step[0].text).toBe('Boot the cluster.')
    expect(out.step[2].name).toBe('Verify health')
  })

  it('omits description entirely when both excerpt and meta_description are null', () => {
    const out = howToSchema(
      makePost({
        excerpt: null,
        meta_description: null,
        content_json: [step('1', 'A.'), step('2', 'B.'), step('3', 'C.')],
      }),
    ) as Record<string, unknown>
    expect('description' in out).toBe(false)
  })

  it('uses excerpt for description when present, falling back to meta_description', () => {
    const fromExcerpt = howToSchema(
      makePost({
        excerpt: 'Excerpt body.',
        meta_description: 'Meta body.',
        content_json: [step('1', 'A.'), step('2', 'B.'), step('3', 'C.')],
      }),
    ) as { description?: string }
    expect(fromExcerpt.description).toBe('Excerpt body.')

    const fromMeta = howToSchema(
      makePost({
        excerpt: null,
        meta_description: 'Meta body.',
        content_json: [step('1', 'A.'), step('2', 'B.'), step('3', 'C.')],
      }),
    ) as { description?: string }
    expect(fromMeta.description).toBe('Meta body.')
  })
})

describe('speakableSchema', () => {
  it('returns null when no tldr or intro blocks exist', () => {
    expect(speakableSchema(makePost({ content_json: [] }))).toBeNull()
    expect(
      speakableSchema(
        makePost({
          content_json: [
            { id: '1', type: 'paragraph', data: { text: 'Plain body.' } },
          ],
        }),
      ),
    ).toBeNull()
  })

  it('emits a single cssSelector for one tldr block', () => {
    const out = speakableSchema(
      makePost({
        content_json: [
          { id: 'tldr-1', type: 'paragraph', role: 'tldr', data: { text: 'Summary.' } },
        ],
      }),
    ) as { '@type': string; speakable: { '@type': string; cssSelector: string[] } }
    expect(out['@type']).toBe('WebPage')
    expect(out.speakable['@type']).toBe('SpeakableSpecification')
    expect(out.speakable.cssSelector).toEqual(['[data-block-id="tldr-1"]'])
  })

  it('includes both intro and tldr selectors in content order', () => {
    const out = speakableSchema(
      makePost({
        content_json: [
          { id: 'intro-1', type: 'paragraph', role: 'intro', data: { text: 'Intro.' } },
          { id: 'mid', type: 'paragraph', data: { text: 'Body.' } },
          { id: 'tldr-1', type: 'paragraph', role: 'tldr', data: { text: 'Summary.' } },
        ],
      }),
    ) as { speakable: { cssSelector: string[] } }
    expect(out.speakable.cssSelector).toEqual([
      '[data-block-id="intro-1"]',
      '[data-block-id="tldr-1"]',
    ])
  })
})

describe('deriveStepName', () => {
  it('extracts the first sentence and trims trailing punctuation', () => {
    const block: Block = {
      id: '1',
      type: 'paragraph',
      role: 'step',
      data: { text: 'First step is to boot the cluster. Then apply migrations.' },
    }
    expect(deriveStepName(block)).toBe('First step is to boot the cluster')
  })

  it('handles ? and ! sentence terminators', () => {
    const q: Block = { id: '1', type: 'paragraph', data: { text: 'Why does this matter? Because reasons.' } }
    expect(deriveStepName(q)).toBe('Why does this matter')
    const e: Block = { id: '2', type: 'paragraph', data: { text: 'Watch out! It is sharp.' } }
    expect(deriveStepName(e)).toBe('Watch out')
  })

  it('truncates a 200-char single-sentence paragraph to ≤ 80 chars', () => {
    const long = 'word '.repeat(50).trim() // 249 chars, no sentence terminators
    const block: Block = { id: '1', type: 'paragraph', data: { text: long } }
    const name = deriveStepName(block)
    expect(name.length).toBeLessThanOrEqual(80)
    expect(name.length).toBeGreaterThan(0)
    // Should break at a word boundary, not mid-word.
    expect(name.endsWith('word')).toBe(true)
  })

  it('uses heading text directly', () => {
    const block: Block = { id: '1', type: 'heading', role: 'step', data: { text: 'Boot the cluster', level: 2 } }
    expect(deriveStepName(block)).toBe('Boot the cluster')
  })

  it('uses an image block alt as the descriptive fallback', () => {
    const block: Block = {
      id: '1',
      type: 'image',
      data: { imageId: '11111111-1111-1111-1111-111111111111', alt: 'cluster diagram' },
    }
    expect(deriveStepName(block)).toBe('cluster diagram')
  })

  it('falls back to "Step" for a code block (no descriptive text)', () => {
    const block: Block = { id: '1', type: 'code', data: { lang: 'ts', code: 'const x = 1' } }
    expect(deriveStepName(block)).toBe('Step')
  })

  it('falls back to "Step" for an empty paragraph', () => {
    const block: Block = { id: '1', type: 'paragraph', data: { text: '   ' } }
    expect(deriveStepName(block)).toBe('Step')
  })
})
