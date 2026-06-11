// components/sections/why-us-data.tsx
import type { ReactNode } from 'react'

export const ext = (label: string, href: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-brand underline decoration-brand/40 decoration-1 underline-offset-[3px]"
  >
    {label}
  </a>
)

export type Reason = { tag: string; image: string; title: string; body: ReactNode }

export const reasons: Reason[] = [
  {
    tag: 'Speed',
    image: '/whyus/speed.webp',
    title: 'First working version in weeks',
    body: (
      <>
        Lean senior team, no account-manager layer. {ext('AbsolveMe', 'https://www.absolveme.ai/')} needed its launch site live before the liquidity window closed. Site, content, and design support shipped in 2 days. The Solana–NEAR cross-chain layer followed in 5 more.
      </>
    ),
  },
  {
    tag: 'Product thinking',
    image: '/whyus/product-thinking.webp',
    title: 'We stress-test the brief before we build',
    body: (
      <>
        Spec gaps get named. Simpler approaches get raised. {ext('SunsetML', 'https://www.sunsetml.com/')} came to us with an AI writing-tool concept. We iterated the architecture with the founder across multiple planning rounds, and stayed on as equity co-founders.
      </>
    ),
  },
  {
    tag: 'Niche depth',
    image: '/whyus/niche-depth.webp',
    title: 'Multichain Web3 and production-grade AI agents',
    body: (
      <>
        Smart contracts shipped on Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, and Avalanche, including {ext('OrbitXPay', 'https://orbitxpay.com/')}&rsquo;s DeFi-banking module with multi-layer orchestration. AI agent orchestration in production at {ext('SunsetML', 'https://www.sunsetml.com/')} and {ext('PredictRAM', 'https://predictram.com/')}.
      </>
    ),
  },
]

// One-line sr-only lede, kept crawlable (SEO/AEO) though dropped from the
// visible header. Verbatim from the prior visible lede.
export const LEDE =
  'Founders pick Metaborong over larger Web3 and AI agencies for three reasons: shorter time to a first working version, sharper push-back on the brief, and the specialist depth in multichain protocols and AI agent orchestration that most studios don\'t have.'
