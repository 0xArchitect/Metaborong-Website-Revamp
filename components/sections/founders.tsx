const founders = [
  { name: 'Arnab Ray',    role: 'CEO & Co-Founder', bio: 'Leads strategy, client relationships, and business direction. Background in technology entrepreneurship and Web3 ecosystem development.',                linkedin: 'https://linkedin.com/in/arnab-ray' },
  { name: 'Anik Ghosh',   role: 'COO & Co-Founder', bio: 'Oversees operations, project delivery, and go-to-market execution. Ensures every project ships on time and to spec.',                                linkedin: 'https://linkedin.com/in/anik-ghosh' },
  { name: 'Soumojit Ash', role: 'CTO & Co-Founder', bio: 'Leads technical architecture across Web3 and AI systems. Deep expertise in blockchain protocols, smart contracts, and AI agent design.',               linkedin: 'https://linkedin.com/in/soumojit-ash' },
]

export function FoundersSection() {
  return (
    <section className="bg-bg px-[16px] py-[72px] sm:px-[24px] md:px-[48px] md:py-[88px] lg:px-[96px] lg:py-[96px] xl:px-[128px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-[16px]">
          <p className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-light">The team</p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.035em] text-dark">The team behind the work</h2>
        </div>
        <p className="mb-[36px] max-w-[560px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray md:mb-[48px]">
          A technical co-founding team with hands-on delivery experience across Web3 and AI. When you work with Metaborong, you work directly with the people who built the portfolio above.
        </p>
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[24px]">
          {founders.map(f => (
            <div key={f.name} className="rounded-[12px] border border-border bg-white px-[20px] py-[24px] sm:px-[24px] sm:py-[28px] lg:px-[28px] lg:py-[32px]">
              <div className="mb-[20px] flex h-[56px] w-[56px] items-center justify-center rounded-[12px] border border-brand/10 bg-bg-subtle text-[22px] font-bold text-brand">
                {f.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="mb-[4px] text-[18px] font-bold tracking-[-0.02em] text-dark">{f.name}</h3>
              <p className="mb-[14px] text-[12px] font-semibold tracking-[0.02em] text-brand">{f.role}</p>
              <p className="mb-[20px] text-[13px] leading-[1.7] tracking-[-0.005em] text-gray">{f.bio}</p>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-[6px] py-[6px] text-[13px] font-medium text-brand no-underline transition-opacity duration-[var(--duration-instant)] hover:opacity-80"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#204AF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
