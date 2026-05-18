const founders = [
  { name: 'Arnab Ray', role: 'CEO & Co-Founder', image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Arnab%20Ray&backgroundType=solid&backgroundColor=4dc3ff', linkedin: 'https://linkedin.com/in/arnab-ray', x: '#' },
  { name: 'Anik Ghosh', role: 'COO & Co-Founder', image: '/anikfounderimage.png', linkedin: 'https://www.linkedin.com/in/anik-ghosh-01a985208/', x: 'https://x.com/0x_Zeph' },
  { name: 'Soumojit Ash', role: 'CTO & Co-Founder', image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Soumojit%20Ash&backgroundType=solid&backgroundColor=6fb4d9', linkedin: '#', x: '#' },
]

export function FoundersSection() {
  return (
    <section className="bg-black px-[16px] py-[48px] sm:px-[24px] md:px-[48px] md:py-[72px] lg:px-[64px] lg:py-[80px]">
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[840px] text-center">
          <p className="mb-[14px] text-[11px] font-semibold uppercase tracking-[0.12em] text-white">The team</p>
          <h2 className="text-[clamp(30px,4vw,54px)]  text-white font-bold tracking-[-0.04em] leading-[1.02] text-dark ">
            We are a team of independent developers and designers.
          </h2>
          <p className="mx-auto mt-[20px] max-w-[620px] text-[16px] leading-[1.7] tracking-[-0.01em] text-white/70">
            Three people, shown with a taller portrait treatment and a lighter, more premium brand-forward background.
          </p>
        </div>

        <div className="mt-[44px] grid gap-[28px] grid-cols-1 md:grid-cols-3">
          {founders.map((founder) => (
            <div key={founder.name} className="group">
              <div className="rounded-[24px] bg-[#0f0f0f] p-[16px] shadow-[0_18px_40px_rgba(0,0,0,0.28)] border border-[rgba(255,255,255,0.08)]">
                <div className="overflow-hidden rounded-[16px]" style={{ height: 330, background: '#296ff0' }}>
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Open ${founder.name} on LinkedIn`}>
                    <img src={founder.image} alt={`${founder.name} — ${founder.role}`} className="h-full w-full object-cover" />
                  </a>
                </div>
              </div>

              <h3 className="mt-[16px] text-[22px] font-bold tracking-[-0.025em] text-white">{founder.name}</h3>
              <p className="mt-[6px] text-[14px] text-white/70">{founder.role}</p>
              <div className="mt-[12px] flex items-center gap-[16px]">
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] text-[13px] font-medium text-white/85 hover:text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
