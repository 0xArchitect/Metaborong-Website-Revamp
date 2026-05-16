// Next.js convention: app/robots.ts → /robots.txt.
//
// Two-mode output:
//   · production (NEXT_PUBLIC_VERCEL_ENV === 'production') → allow-list
//     with Disallow for /api/, /services/ (noindex stubs) and /admin/
//     (CMS). Explicit AI-crawler opt-in so the site is citable in AI
//     search engines, with the same disallow applied.
//   · everywhere else (preview, development) → blanket "Disallow: /"
//     so test deploys never get indexed.

import type { MetadataRoute } from 'next'
import { SITE_ORIGIN } from '@/lib/seo'

const DISALLOW = ['/api/', '/services/', '/admin/', '/admin/posts/*/preview']

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

  if (!isProd) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      // No sitemap reference in non-prod — robots that DO obey the
      // disallow may still ignore it for sitemap fetches; better not to
      // advertise a preview sitemap at all.
    }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      // Explicit AI crawler allows — opt-in to citation in AI search
      // engines. Repeat the disallow so AI crawlers don't ingest
      // "Coming soon" stub pages or the CMS admin into retrieval indices.
      { userAgent: 'GPTBot',          allow: '/', disallow: DISALLOW },
      { userAgent: 'OAI-SearchBot',   allow: '/', disallow: DISALLOW },
      { userAgent: 'ChatGPT-User',    allow: '/', disallow: DISALLOW },
      { userAgent: 'ClaudeBot',       allow: '/', disallow: DISALLOW },
      { userAgent: 'anthropic-ai',    allow: '/', disallow: DISALLOW },
      { userAgent: 'PerplexityBot',   allow: '/', disallow: DISALLOW },
      { userAgent: 'Google-Extended', allow: '/', disallow: DISALLOW },
      { userAgent: 'CCBot',           allow: '/', disallow: DISALLOW },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  }
}
