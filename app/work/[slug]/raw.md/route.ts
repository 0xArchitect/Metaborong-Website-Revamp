// Per-case-study markdown export. Crawled by LLM ingestion pipelines
// (Perplexity, ChatGPT search, etc.) for clean grounding without HTML noise.
// Mirrors the /services/{pillar}/{slug}/raw.md GEO foundation.
//
// Reachable at /work/{slug}/raw.md. Returns:
//   · 200 text/markdown for a known case study (header front-matter + body)
//   · 404 text/plain for an unknown slug
//
// The body is the authored content/work/{slug}.md verbatim — the page and this
// export read the same single source.

import fs from 'fs'
import path from 'path'
import { SITE_ORIGIN } from '@/lib/seo'
import { caseStudyMeta } from '@/lib/work'

export const revalidate = 60

interface Ctx {
  params: Promise<{ slug: string }>
}

export async function GET(_req: Request, ctx: Ctx): Promise<Response> {
  const { slug } = await ctx.params
  const meta = caseStudyMeta[slug]

  if (!meta) {
    return new Response('case study not found\n', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  let body = ''
  try {
    body = fs.readFileSync(path.join(process.cwd(), 'content', 'work', `${slug}.md`), 'utf8')
  } catch {
    return new Response('case study not found\n', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  const header = [
    `# ${meta.seoTitle ?? meta.title}`,
    '',
    meta.description,
    '',
    `Canonical: ${SITE_ORIGIN}/work/${slug}`,
    `Case study: ${slug}`,
    '',
    '---',
    '',
  ].join('\n')

  return new Response(header + body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=3600',
    },
  })
}
