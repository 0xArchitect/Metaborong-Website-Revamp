import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { CalInit } from '@/components/providers/cal-init'

export const metadata: Metadata = {
  title: {
    default: 'Metaborong | Web3, AI and Product Studio',
    template: '%s | Metaborong',
  },
  description:
    'Metaborong builds DeFi protocols, AI agent systems, and custom SaaS products for founders and crypto-native teams. Fast delivery, product-first thinking.',
  metadataBase: new URL('https://www.metaborong.com'),
  openGraph: {
    siteName: 'Metaborong',
    locale: 'en_US',
    type: 'website',
    // OG image is generated dynamically at the edge via app/opengraph-image.tsx —
    // Next.js auto-wires the metadata, no explicit `images` array needed.
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Metaborong',
    creator: '@Metaborong',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning targets a known dev-time mismatch: browser
          extensions (Grammarly is the most common offender — `data-gr-*`,
          `data-new-gr-c-s-check-loaded`) inject attributes into <body> before
          React hydrates. The flag suppresses *only* the body element's
          attribute mismatch, not anything inside it. */}
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        {/* Vercel Web Analytics is cookieless (no browser identifiers), so it
            sits outside the mb_consent gate that guards the mb_geo cookie. */}
        <Analytics />
        <CalInit />
      </body>
    </html>
  )
}
