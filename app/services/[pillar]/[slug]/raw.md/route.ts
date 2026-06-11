// Per-leaf markdown export for service pages. Crawled by LLM ingestion
// pipelines (Perplexity, ChatGPT search, etc.) for clean grounding without
// HTML noise. Mirrors the /blog/{slug}/raw.md GEO foundation.
//
// Reachable at /services/{pillar}/{slug}/raw.md. Returns:
//   · 200 text/markdown for an authored published leaf
//   · 404 text/plain for an unauthored / coming-soon / unknown leaf
//
// Gated purely on getLeafContent — the same content gate the page uses to
// decide between the published template and the coming-soon stub.

import { getLeafContent } from '@/lib/services/content'
import { getLeafSeo } from '@/lib/services/seo-map'
import { SITE_ORIGIN } from '@/lib/seo'
import type { LeafContent } from '@/lib/services/leaf-content'
import type { LeafSeoEntry } from '@/lib/services/seo-map'

export const revalidate = 60

interface Ctx {
  params: Promise<{ pillar: string; slug: string }>
}

export async function GET(_req: Request, ctx: Ctx): Promise<Response> {
  const { pillar, slug } = await ctx.params
  const content = getLeafContent(pillar, slug)

  if (!content) {
    return new Response('service not found\n', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  const seo = getLeafSeo(pillar, slug)
  const body = serializeLeaf(pillar, slug, content, seo)

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=3600',
    },
  })
}

// Header front-matter keeps the file machine-parseable: every line above the
// first blank-line break is title/description/Key: value, and everything below
// is the leaf body in markdown. LLMs can read either half cleanly.
function serializeLeaf(
  pillar: string,
  slug: string,
  content: LeafContent,
  seo: LeafSeoEntry | undefined,
): string {
  const header: string[] = [`# ${seo?.title ?? slug}`]
  if (seo?.description) header.push('', seo.description)
  header.push('')
  header.push(`Canonical: ${SITE_ORIGIN}/services/${pillar}/${slug}`)
  header.push(`Service: ${pillar}/${slug}`)

  const sections: string[] = []

  sections.push(`## Overview`, '', content.heroLede)

  sections.push(`## What is it?`, '', content.aeoAnswer)

  if (content.deliverables.length > 0) {
    const lines = content.deliverables.map((d) =>
      d.detail ? `- ${d.label}: ${d.detail}` : `- ${d.label}`,
    )
    sections.push(`## What we deliver`, '', lines.join('\n'))
  }

  if (content.keyConcepts && content.keyConcepts.length > 0) {
    const lines = content.keyConcepts.map((c) => `**${c.term}**: ${c.definition}`)
    sections.push(`## Key concepts`, '', lines.join('\n\n'))
  }

  if (content.phases.length > 0) {
    const lines = content.phases.map((p, i) => `${i + 1}. **${p.title}** ${p.body}`)
    sections.push(`## How we work`, '', lines.join('\n'))
  }

  if (content.techStack.length > 0) {
    const items = content.techStack.map((t) =>
      t.category ? `${t.name} (${t.category})` : t.name,
    )
    sections.push(`## Tech stack`, '', items.join(', '))
  }

  sections.push(
    `## When this fits`,
    '',
    `### Fits when`,
    '',
    content.fit.fits.map((b) => `- ${b}`).join('\n'),
    '',
    `### Does not fit when`,
    '',
    content.fit.doesNotFit.map((b) => `- ${b}`).join('\n'),
  )

  if (content.faqs.length > 0) {
    const blocks = content.faqs.map((f) => `### ${f.question}\n\n${f.answer}`)
    sections.push(`## FAQ`, '', blocks.join('\n\n'))
  }

  return [header.join('\n'), '', sections.join('\n\n'), ''].join('\n')
}
