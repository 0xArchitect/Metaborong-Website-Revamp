const testimonials = [
  { quote: 'Impressive DevOps & backend support by Metaborong, their expertise made a real difference. Highly recommend!', name: 'Siddharth Banerjee', role: 'Client' },
  { quote: 'Excited to team up with Metaborong! Strong reference and previous quality work made them the perfect fit.',    name: 'Dr. Josh',            role: 'Client' },
  { quote: 'Metaborong took Create Protocol to the next level with their Web3 and Web2 skills. Impressive work!',          name: 'Abhishek Krishna',    role: 'Create Protocol' },
  { quote: 'Metaborong really put their effort to write smart contracts for Create Protocol & their web 2.0 team support was exceptional!', name: 'Girish Ahirwar', role: 'Create Protocol' },
]

export function TestimonialsSection() {
  return (
    <section className="bg-bg-subtle px-[16px] py-[72px] sm:px-[24px] md:px-[48px] md:py-[88px] lg:px-[96px] lg:py-[96px] xl:px-[128px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-[36px] md:mb-[48px]">
          <p className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-light">Social proof</p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.035em] text-dark">Voices of trust</h2>
        </div>
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 md:gap-[20px]">
          {testimonials.map(t => (
            <div key={t.name} className="rounded-[12px] border border-border bg-white p-[20px] sm:p-[24px] lg:p-[32px]">
              <p className="mb-[24px] text-[16px] italic leading-[1.7] tracking-[-0.01em] text-dark">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-[12px]">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-white">{t.name[0]}</div>
                <div>
                  <div className="text-[14px] font-semibold tracking-[-0.01em] text-dark">{t.name}</div>
                  <div className="text-[12px] text-gray">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
