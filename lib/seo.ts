// JSON-LD builders for the public blog surface.
//
// Article + BreadcrumbList land in M5-core (essential SEO). FAQPage,
// HowTo, and Speakable land in M9-AEO (answer-engine optimization, v1.5).
//
// These builders return plain objects ready to be JSON-stringified into
// <script type="application/ld+json"> tags. They never throw — every
// optional field falls back gracefully so a partially-populated draft
// still emits well-formed JSON-LD.
//
// The AEO trio (FAQPage / HowTo / Speakable) returns `null` when the post
// lacks the relevant content so callers can simply
// `[faqPageSchema(post), howToSchema(post), …].filter(Boolean)` and skip
// emitting empty <script> tags.
//
// The output shapes follow schema.org/Article, schema.org/BreadcrumbList,
// schema.org/FAQPage, schema.org/HowTo, and schema.org/SpeakableSpecification.

import type { Block, Post } from './blog-schema'
import { blockToPlainText } from './blocks-to-md'

export const SITE_ORIGIN = 'https://www.metaborong.com'

const PUBLISHER = {
  '@type': 'Organization' as const,
  name: 'Metaborong',
  url: SITE_ORIGIN,
  logo: {
    '@type': 'ImageObject' as const,
    url: `${SITE_ORIGIN}/logo.png`,
  },
}

interface ArticleSchemaInput {
  post: Post
  /**
   * Resolved cover image URL (next/image src or absolute https). When
   * absent, the OG fallback route is used so Article still has an image.
   */
  imageUrl?: string | null
}

/**
 * Build a schema.org/Article JSON-LD object. The output is a plain JSON-
 * serializable object; the caller stringifies it inside a
 * <script type="application/ld+json"> tag.
 *
 * Fields:
 *   - headline / description / datePublished / dateModified — mandatory.
 *   - mainEntityOfPage — canonical URL of the post.
 *   - image — cover image when present, else /og?slug=<slug> fallback.
 *   - author — author_name + author_url when present.
 *   - publisher — Metaborong Organization stub.
 *   - keywords — post.tags joined.
 */
export function articleSchema({ post, imageUrl }: ArticleSchemaInput): Record<string, unknown> {
  const url = post.canonical_url ?? `${SITE_ORIGIN}/blog/${post.slug}/`
  const image = imageUrl ?? `${SITE_ORIGIN}/og?slug=${encodeURIComponent(post.slug)}`
  const description = post.meta_description ?? post.excerpt ?? post.title

  const author: Record<string, unknown> = {
    '@type': 'Person',
    name: post.author_name,
  }
  if (post.author_url) author.url = post.author_url

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta_title ?? post.title,
    description,
    image,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    author,
    publisher: PUBLISHER,
    keywords: post.tags.length > 0 ? post.tags.join(', ') : undefined,
  }
}

interface BreadcrumbSchemaInput {
  /** The post's slug + title — the leaf of the trail. */
  post: Pick<Post, 'slug' | 'title'>
}

/**
 * Build a schema.org/BreadcrumbList for Home → Blog → Post. The breadcrumb
 * is the canonical SEO breadcrumb signal — Google uses it to render
 * site-hierarchy chips in the search snippet.
 */
export function breadcrumbSchema({ post }: BreadcrumbSchemaInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_ORIGIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_ORIGIN}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_ORIGIN}/blog/${post.slug}/`,
      },
    ],
  }
}

// ─── M9-AEO: FAQPage / HowTo / Speakable ──────────────────────────────────────

type FaqBlock = Extract<Block, { type: 'faq' }>

/**
 * Build a schema.org/FAQPage from every `faq` block in `post.content_json`,
 * preserving block order. Returns `null` when the post has no FAQ blocks
 * so the caller can simply skip emitting the <script> tag.
 *
 * Empty answers are passed through verbatim — JSON-LD validity is a
 * structural property; data-quality gating belongs to the AI-readiness
 * surface, not to the schema builder.
 */
export function faqPageSchema(post: Post): Record<string, unknown> | null {
  const faqs = post.content_json.filter((b): b is FaqBlock => b.type === 'faq')
  if (faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((b) => ({
      '@type': 'Question',
      name: b.data.question,
      acceptedAnswer: { '@type': 'Answer', text: b.data.answer },
    })),
  }
}

/**
 * Build a schema.org/HowTo from blocks tagged `role: 'step'`, in
 * content_json order. Returns `null` when fewer than three step blocks
 * exist — schema.org/HowTo represents an ordered procedure, and Google's
 * Rich Results documentation flags single-step "how-to" markup as low
 * quality. Three is the minimum that actually communicates a sequence.
 *
 * `description` is omitted entirely when neither `excerpt` nor
 * `meta_description` is set, so we never serialize `description: undefined`.
 */
export function howToSchema(post: Post): Record<string, unknown> | null {
  const steps = post.content_json.filter((b) => b.role === 'step')
  if (steps.length < 3) return null

  const out: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    step: steps.map((b, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: deriveStepName(b),
      text: blockToPlainText(b),
    })),
  }

  const description = post.excerpt ?? post.meta_description
  if (description) out.description = description

  return out
}

/**
 * Build a schema.org/SpeakableSpecification on a WebPage referencing the
 * blocks tagged `role: 'tldr'` or `role: 'intro'`. The CSS selectors
 * point at `[data-block-id="…"]` attributes that the public block
 * renderer emits per block.
 *
 * Returns `null` when the post has no tldr/intro blocks — without an
 * anchor for assistants to read aloud, emitting an empty Speakable spec
 * is worse than emitting none at all.
 */
export function speakableSchema(post: Post): Record<string, unknown> | null {
  const blocks = post.content_json.filter(
    (b) => b.role === 'tldr' || b.role === 'intro',
  )
  if (blocks.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: blocks.map((b) => `[data-block-id="${b.id}"]`),
    },
  }
}

// ── helpers ───────────────────────────────────────────────────────────────────

const STEP_NAME_MAX = 80

/**
 * Pull a short step name out of a block. For text-bearing blocks
 * (heading / paragraph / quote / callout / key-takeaway / list), we take
 * the first sentence (split on `. `, `?`, `!`) and truncate to 80 chars
 * at a word boundary. Image and FAQ blocks fall back to alt or question
 * text. Code and otherwise-empty blocks fall back to a generic 'Step'
 * label so the JSON-LD never carries an empty `name`.
 */
export function deriveStepName(block: Block): string {
  const raw = pickStepNameSource(block)
  const flat = raw.replace(/\s+/g, ' ').trim()
  if (!flat) return 'Step'

  const sentenceMatch = flat.match(/^([^.!?]+)[.!?]/)
  const candidate = sentenceMatch ? sentenceMatch[1].trim() : flat

  return truncateAtWordBoundary(candidate, STEP_NAME_MAX)
}

function pickStepNameSource(block: Block): string {
  switch (block.type) {
    case 'heading':
    case 'paragraph':
    case 'quote':
    case 'callout':
    case 'key-takeaway':
      return block.data.text
    case 'list':
      return block.data.items[0] ?? ''
    case 'image':
      return block.data.alt
    case 'faq':
      return block.data.question
    case 'code':
      return ''
  }
}

function truncateAtWordBoundary(input: string, max: number): string {
  if (input.length <= max) return input
  const cut = input.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  // Only break on a space if it's reasonably close to the end; otherwise
  // hard-cut so we don't return a misleading 3-word "name" for an 80-char
  // budget. 0.6 mirrors the heuristic in lib/blocks-to-md.ts.
  const trimmed = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut
  return trimmed.replace(/[\s,;:.\-—]+$/, '')
}
