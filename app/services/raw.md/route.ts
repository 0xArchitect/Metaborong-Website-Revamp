// Markdown export for the /services index. Crawled by LLM ingestion pipelines
// (Perplexity, ChatGPT search, etc.) for clean grounding without HTML noise.
// Mirrors the per-pillar /services/{pillar}/raw.md and per-leaf raw.md routes.
//
// Reachable at /services/raw.md. The static `raw.md` segment wins over the
// sibling `[pillar]` dynamic route for this exact path. Returns 200
// text/markdown. Shares its copy with the rendered page via
// services-overview-data.ts, so the export never drifts from the UI.

import { pillars, getPublishedLeaves } from '@/components/sections/services-data'
import { AEO_ANSWER, OVERVIEW_FAQS } from '@/components/services/services-overview-data'
import { SITE_ORIGIN } from '@/lib/seo'

export const revalidate = 60

export async function GET(): Promise<Response> {
  return new Response(serialize(), {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=3600',
    },
  })
}

function serialize(): string {
  const url = `${SITE_ORIGIN}/services`

  const header = [
    '# Services — Metaborong',
    '',
    'Metaborong is an AI and blockchain development company building production AI systems, on-chain protocols, and SaaS products for founders.',
    '',
    `Canonical: ${url}`,
  ]

  const sections: string[] = []
  sections.push(`## What is Metaborong?\n\n${AEO_ANSWER}`)

  // One section per pillar: headline + body + its published leaves (links).
  for (const p of pillars) {
    const leafLines = getPublishedLeaves(p).map(
      (leaf) => `- [${leaf.name}](${url}/${p.id}/${leaf.slug}): ${leaf.description}`,
    )
    const body = [p.body, leafLines.join('\n')].filter(Boolean).join('\n\n')
    sections.push(`## ${p.label} — ${p.headline}\n\n${body}\n\n[Open ${p.label}](${url}/${p.id})`)
  }

  const faqBlocks = OVERVIEW_FAQS.map((f) => `### ${f.q}\n\n${f.a}`)
  sections.push(`## FAQ\n\n${faqBlocks.join('\n\n')}`)

  return `${header.join('\n')}\n\n${sections.join('\n\n')}\n`
}
