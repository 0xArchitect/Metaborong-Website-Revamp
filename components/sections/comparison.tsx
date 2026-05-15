const rows = [
  { label: 'Team access',        mb: 'Direct — founders',                              large: 'Account manager layer',  free: 'Direct but inconsistent' },
  { label: 'AI-native services', mb: 'Core offering',                                  large: 'Add-on or absent',       free: 'Rare' },
  { label: 'DeFi depth',         mb: '7 chains — Ethereum, Solana, Base, Arbitrum, Hyperledger, Polygon, Avalanche',  large: 'Generic',                free: 'Depends on individual' },
  { label: 'Speed to delivery',  mb: 'Weeks',                                          large: 'Months',                 free: 'Unpredictable' },
  { label: 'Product thinking',   mb: 'Built in',                                       large: 'Execution-focused',      free: 'Absent' },
  { label: 'Track record',       mb: 'DeFi · AI · SaaS shipped',                       large: 'Hundreds of clients ✓',  free: 'Case by case' },
]

export function ComparisonSection() {
  return (
    <section className="bg-bg-subtle px-[16px] py-[72px] sm:px-[24px] md:px-[48px] md:py-[88px] lg:px-[96px] lg:py-[96px] xl:px-[128px]">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-[24px] md:mb-[32px]">
          <p className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-light">Comparison</p>
          <h2 className="mb-[16px] text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.035em] text-dark">How Metaborong compares</h2>
          <p className="max-w-[600px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray">
            If you&apos;re choosing between us, a large agency, or a freelance team, here&apos;s the honest read.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-[14px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="w-[22%] px-[16px] py-[12px] text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-light" />
                <th className="w-[26%] px-[16px] py-[12px] text-left text-[13px] font-bold text-brand">Metaborong</th>
                <th className="w-[26%] px-[16px] py-[12px] text-left text-[13px] font-semibold text-gray">Large Web3 or AI Agency</th>
                <th className="w-[26%] px-[16px] py-[12px] text-left text-[13px] font-semibold text-gray">Freelance Team</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={`border-b border-border-subtle ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}>
                  <td className="px-[16px] py-[14px] text-[13px] font-medium text-gray">{r.label}</td>
                  <td className="px-[16px] py-[14px] font-semibold text-dark">{r.mb}</td>
                  <td className="px-[16px] py-[14px] text-gray">{r.large}</td>
                  <td className="px-[16px] py-[14px] text-gray">{r.free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] text-[12px] leading-[1.6] text-gray-light">✓ marks where the alternative genuinely wins. Larger agencies have longer track records, a real advantage for enterprises needing procurement comfort. We win on speed, AI-native depth, and direct access.</p>
      </div>
    </section>
  )
}
