// Static CSS vignettes for the OrbitX "What we built" section. Tokenized
// surfaces, no images. #0e7490 (AA-safe teal) is OrbitX's per-slug functional
// accent (see DESIGN.md decisions log). Mock values are illustrative UI, not
// claims; the whole vignette is aria-hidden.

// Upgradeable architecture: a proxy holding state points at upgradeable logic.
export function UpgradeableMock() {
  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]" aria-hidden="true">
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Contract</span>
        <span className="inline-flex items-center gap-[6px] rounded-full bg-[#0e7490]/10 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0e7490]"><span className="h-[5px] w-[5px] rounded-full bg-[#0e7490]" /> UUPS</span>
      </div>
      <div className="flex items-stretch gap-[10px]">
        <div className="flex-1 rounded-[10px] border border-border bg-bg-subtle p-[12px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Proxy</span>
          <p className="mt-[6px] text-[12px] font-semibold text-dark">State + funds</p>
          <div className="mt-[8px] flex flex-col gap-[4px]"><span className="h-[5px] w-[80%] rounded-full bg-dark/15" /><span className="h-[5px] w-[60%] rounded-full bg-dark/15" /></div>
          <span className="mt-[8px] inline-block font-mono text-[9px] uppercase tracking-[0.08em] text-[#0e7490]">preserved</span>
        </div>
        <div className="flex items-center text-[16px] text-[#0e7490]">→</div>
        <div className="flex-1 rounded-[10px] border border-[#0e7490] bg-[#0e7490]/[0.05] p-[12px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Logic</span>
          <p className="mt-[6px] text-[12px] font-semibold text-dark">v2 · upgraded</p>
          <div className="mt-[8px] flex flex-col gap-[4px]"><span className="h-[5px] w-[70%] rounded-full bg-[#0e7490]/30" /><span className="h-[5px] w-[85%] rounded-full bg-[#0e7490]/30" /></div>
          <span className="mt-[8px] inline-block font-mono text-[9px] uppercase tracking-[0.08em] text-[#0e7490]">no migration</span>
        </div>
      </div>
    </div>
  )
}

// Governance: a queued change under a timelock delay, with roles + multi-sig.
export function GovernanceMock() {
  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]" aria-hidden="true">
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Governance</span>
        <span className="inline-flex items-center gap-[6px] rounded-full bg-[#0e7490]/10 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0e7490]">timelock</span>
      </div>
      <div className="rounded-[10px] border border-border bg-bg-subtle px-[12px] py-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-dark">Upgrade treasury module</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">queued</span>
        </div>
        <div className="mt-[8px] flex items-center gap-[8px]">
          <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-border"><span className="block h-full w-[55%] rounded-full bg-[#0e7490]" /></span>
          <span className="font-mono text-[10px] text-gray">delay</span>
        </div>
      </div>
      <div className="mt-[12px] flex flex-wrap items-center gap-[6px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Roles</span>
        {['Treasury', 'Governance', 'Upgrade'].map((r) => (<span key={r} className="rounded-full border border-border px-[9px] py-[3px] text-[11px] font-medium text-gray">{r}</span>))}
        <span className="rounded-full border border-[#0e7490] bg-[#0e7490]/[0.06] px-[9px] py-[3px] text-[11px] font-semibold text-dark">multi-sig 3 / 5</span>
      </div>
    </div>
  )
}

// Treasury: a USDC reserve earning yield through Aave + Morpho on Base.
export function TreasuryMock() {
  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]" aria-hidden="true">
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">USDC treasury</span>
        <span className="font-mono text-[11px] text-gray">on Base</span>
      </div>
      <div className="rounded-[10px] border border-border bg-bg-subtle p-[12px]">
        <div className="flex items-center gap-[8px]">
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#0e7490]/10 font-mono text-[11px] font-bold text-[#0e7490]">$</span>
          <span className="text-[13px] font-semibold text-dark">USDC reserve</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-[#0e7490]">earning</span>
        </div>
        <div className="mt-[8px] h-[6px] w-full overflow-hidden rounded-full bg-border"><span className="block h-full w-[72%] rounded-full bg-[#0e7490]" /></div>
      </div>
      <ul className="mt-[10px] flex flex-col gap-[8px]">
        {[{ n: 'Aave', d: 'lending yield' }, { n: 'Morpho', d: 'routed yield' }].map((p) => (
          <li key={p.n} className="flex items-center justify-between rounded-[9px] border border-border px-[12px] py-[9px]">
            <span className="flex items-center gap-[10px]"><span className="h-[8px] w-[8px] rounded-full bg-[#0e7490]" /><span className="text-[13px] font-semibold text-dark">{p.n}</span></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">{p.d}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
