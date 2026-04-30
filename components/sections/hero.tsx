'use client'

import dynamic from 'next/dynamic'
import { Cta } from '@/components/ui/cta'

// Three.js: client-only, lazy-loaded after paint — no LCP impact
const HeroOrb = dynamic(
  () => import('@/components/hero-orb/hero-orb').then(m => ({ default: m.HeroOrb })),
  { ssr: false, loading: () => null }
)

export function HeroSection() {
  return (
    <section className="section-pad" style={{ background: 'var(--color-paper)' }}>
      <div className="container-x grid lg:grid-cols-[55fr_45fr] gap-12 items-center">
        {/* Left: copy column */}
        <div className="max-w-[640px]">
          <div
            className="font-mono uppercase text-[var(--color-muted)]"
            style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)' }}
          >
            {/* SLOT: HERO_EYEBROW — replaced in Task 23 with Lane B copy */}
            FULL-STACK WEB3 + AI STUDIO
          </div>

          <h1
            className="mt-4 font-medium text-[var(--color-ink)]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: 'var(--tracking-display)', lineHeight: 1.05 }}
          >
            {/* SLOT: HERO_H1 — replaced in Task 23 */}
            We build Web3 platforms and AI agents that ship.
          </h1>

          <blockquote
            className="mt-6 pl-4 text-[var(--color-ink)]"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.5,
              borderLeft: '2px solid var(--color-brand)',
            }}
          >
            {/* SLOT: HERO_BLOCKQUOTE — replaced in Task 23 (38-word AEO sentence) */}
            Metaborong is a Web3 development company building DeFi protocols, custom blockchain platforms, and AI agents for crypto, with delivery-focused founders who have shipped products since Web2 and now operate at the AI agent in Web3 frontier.
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <Cta href="/contact" variant="primary">Start a project</Cta>
            <Cta href="#work" variant="ghost">See our work</Cta>
          </div>

          <p
            className="mt-6 text-[var(--color-muted)]"
            style={{ fontSize: 'var(--text-body-sm)' }}
          >
            {/* SLOT: HERO_TRUST_MICROCOPY — replaced in Task 23 */}
            Trusted by 8 named clients across DeFi, gaming, and AI.
          </p>
        </div>

        {/* Right: orb */}
        <div className="w-full" style={{ height: 'clamp(360px, 60vh, 520px)' }}>
          <HeroOrb />
        </div>
      </div>
    </section>
  )
}
