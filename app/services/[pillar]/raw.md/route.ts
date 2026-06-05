// Markdown export for the pillar-hub pages. Crawled by LLM ingestion
// pipelines (Perplexity, ChatGPT search, etc.) for clean grounding without
// HTML noise. Mirrors the per-leaf /services/{pillar}/{slug}/raw.md route and
// the /blog/{slug}/raw.md GEO foundation.
//
// Reachable at /services/{pillar}/raw.md. The static `raw.md` segment wins
// over the sibling `[slug]` dynamic route for this exact path. Returns:
//   · 200 text/markdown for a known pillar with authored hub copy
//   · 404 text/plain otherwise
//
// Gated on pillarHubCopy — the same copy the hub page renders.

import { pillars, type Pillar } from '@/components/sections/services-data'
import { pillarHubCopy, type PillarHubCopy } from '@/lib/services/pillar-hub-content'
import { SITE_ORIGIN } from '@/lib/seo'

export const revalidate = 60

interface Ctx {
  params: Promise<{ pillar: string }>
}

export async function GET(_req: Request, ctx: Ctx): Promise<Response> {
  const { pillar } = await ctx.params
  const p = pillars.find((x) => x.id === pillar)
  const copy = p ? pillarHubCopy[p.id] : undefined

  if (!p || !copy) {
    return new Response('pillar not found\n', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  return new Response(serializeHub(p, copy), {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=3600',
    },
  })
}

function serializeHub(pillar: Pillar, copy: PillarHubCopy): string {
  const hubUrl = `${SITE_ORIGIN}/services/${pillar.id}`

  const header: string[] = [`# ${pillar.label} services — Metaborong`]
  header.push('', copy.positioning)
  header.push('')
  header.push(`Canonical: ${hubUrl}`)
  header.push(`Pillar: ${pillar.id}`)

  // Each section is one pre-joined block ("## Title\n\n<body>") so joining
  // with a blank line between sections never leaves empty-line gaps under a heading.
  const sections: string[] = []

  sections.push(`## Overview\n\n${copy.heading ?? pillar.headline}`)

  if (copy.aeoAnswer) {
    sections.push(`## What is it?\n\n${copy.aeoAnswer}`)
  }

  // One section per sub-group: description + its leaves (published leaves link
  // to their own page; coming-soon leaves are listed without a URL).
  for (const sg of pillar.subGroups) {
    const sgCopy = copy.subGroups.find((s) => s.id === sg.id)
    const leafLines = sg.children.map((leaf) =>
      leaf.status === 'published'
        ? `- [${leaf.name}](${hubUrl}/${leaf.slug}): ${leaf.description}`
        : `- ${leaf.name} (coming soon): ${leaf.description}`,
    )
    const body = [sgCopy?.description, leafLines.join('\n')].filter(Boolean).join('\n\n')
    sections.push(`## ${pillar.label} · ${sg.label}\n\n${body}`)
  }

  const phaseLines = copy.engagement.map(
    (ph, i) => `${i + 1}. **${ph.label}** ${ph.body}`,
  )
  sections.push(`## How we engage\n\n${phaseLines.join('\n')}`)

  const faqBlocks = copy.faqs.map((f) => `### ${f.q}\n\n${f.a}`)
  sections.push(`## FAQ\n\n${faqBlocks.join('\n\n')}`)

  return `${header.join('\n')}\n\n${sections.join('\n\n')}\n`
}
