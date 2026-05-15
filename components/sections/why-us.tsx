const clutchProfileUrl = 'https://clutch.co/profile/metaborong-technologies-private'

const projectLinkStyle: React.CSSProperties = {
  color: '#296ff0',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  textDecorationThickness: '1px',
  textDecorationColor: 'rgba(41, 111, 240, 0.4)',
  fontWeight: 500,
}

const ext = (label: string, href: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={projectLinkStyle}>
    {label}
  </a>
)

const reasons = [
  {
    tag: 'Speed',
    color: '#296ff0',
    title: 'First working version in weeks',
    body: (
      <>
        Lean senior team, no account-manager layer. {ext('AbsolveMe', 'https://www.absolveme.ai/')} needed its launch site live before the liquidity window closed. Site, content, and design support shipped in 2 days. The Solana–NEAR cross-chain layer followed in 5 more.
      </>
    ),
  },
  {
    tag: 'Product thinking',
    color: '#296ff0',
    title: 'We stress-test the brief before we build',
    body: (
      <>
        Spec gaps get named. Simpler approaches get raised. {ext('SunsetML', 'https://www.sunsetml.com/')} came to us with an AI writing-tool concept. We iterated the architecture with the founder across multiple planning rounds, and stayed on as equity co-founders.
      </>
    ),
  },
  {
    tag: 'Niche depth',
    color: '#296ff0',
    title: 'Multichain Web3 and production-grade AI agents',
    body: (
      <>
        Smart contracts shipped on Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, and Avalanche, including {ext('OrbitXPay', 'https://orbitxpay.com/')}&rsquo;s DeFi-banking module with multi-layer orchestration. AI agent orchestration in production at {ext('SunsetML', 'https://www.sunsetml.com/')} and {ext('PredictRAM', 'https://predictram.com/')}.
      </>
    ),
  },
]

export function WhyUsSection() {
  return (
    <section className="bg-bg-subtle px-[16px] py-[72px] sm:px-[24px] md:px-[48px] md:py-[88px] lg:px-[96px] lg:py-[96px] xl:px-[128px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-[40px] max-w-[720px] md:mb-[56px]">
          <p className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-light">Why us</p>
          <h2 className="mb-[20px] text-[clamp(32px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.035em] text-dark">Why founders choose Metaborong</h2>
          <p className="mb-[24px] max-w-[640px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray">
            Founders pick Metaborong over larger Web3 and AI agencies for three reasons: shorter time to a first working version, sharper push-back on the brief, and the specialist depth — multichain protocols and AI agent orchestration — most studios don&apos;t have.
          </p>

          <div className="flex flex-wrap items-center gap-[14px] text-[13px] tracking-[-0.005em]">
            <a
              href={clutchProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[6px] font-semibold text-dark no-underline"
            >
              <span>4.9</span>
              <span aria-label="5 out of 5 stars" className="text-[12px] leading-none tracking-[1px] text-[#F6851B]">★★★★★</span>
              <span className="font-medium text-gray">on Clutch</span>
            </a>
            <span aria-hidden="true" className="text-[#d4d4d8]">·</span>
            <span className="font-semibold text-dark">Reply within 12h</span>
            <span aria-hidden="true" className="text-[#d4d4d8]">·</span>
            <span className="font-semibold text-dark">4–12 weeks to ship</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[24px]">
          {reasons.map(r => (
            <div key={r.tag} className="rounded-[12px] border border-border bg-white px-[20px] py-[24px] sm:px-[24px] sm:py-[28px] lg:px-[32px] lg:py-[36px]">
              <div className="mb-[18px] text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: r.color }}>{r.tag}</div>
              <h3 className="mb-[14px] text-[22px] font-bold leading-[1.2] tracking-[-0.025em] text-dark">{r.title}</h3>
              <p className="text-[14px] leading-[1.75] tracking-[-0.005em] text-gray">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
