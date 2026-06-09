// Static CSS vignettes for the SEDAX "What we built" section. Tokenized
// surfaces, no images. #047857 (AA-safe emerald) is SEDAX's per-slug functional
// accent (see DESIGN.md decisions log). Mock values are illustrative UI, not
// claims; the whole vignette is aria-hidden.

// Self-sovereign identity: a user-controlled wallet with selective disclosure.
export function SsiMock() {
  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]" aria-hidden="true">
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Identity wallet</span>
        <span className="font-mono text-[11px] text-gray">user-controlled</span>
      </div>
      <ul className="flex flex-col gap-[8px]">
        {[{ c: 'Age over 18', share: true }, { c: 'Nationality', share: true }, { c: 'Date of birth', share: false }, { c: 'Home address', share: false }].map((x) => (
          <li key={x.c} className={`flex items-center justify-between rounded-[9px] border px-[12px] py-[9px] ${x.share ? 'border-[#047857] bg-[#047857]/[0.05]' : 'border-border'}`}>
            <span className="flex items-center gap-[10px]"><span className={`h-[8px] w-[8px] rounded-full ${x.share ? 'bg-[#047857]' : 'bg-border'}`} /><span className="text-[13px] font-semibold text-dark">{x.c}</span></span>
            <span className={`font-mono text-[10px] uppercase tracking-[0.08em] ${x.share ? 'text-[#047857]' : 'text-gray'}`}>{x.share ? 'shared' : 'private'}</span>
          </li>
        ))}
      </ul>
      <p className="mt-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Selective disclosure · W3C VC</p>
    </div>
  )
}

// On-chain trust: issuance, verification, and revocation on a tamper-evident
// ledger; the credential is reusable across services.
export function OnChainTrustMock() {
  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]" aria-hidden="true">
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Trust ledger</span>
        <span className="inline-flex items-center gap-[6px] rounded-full bg-[#047857]/10 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#047857]">on-chain</span>
      </div>
      <ul className="flex flex-col gap-[7px]">
        {[{ e: 'Credential issued', t: 'issuer' }, { e: 'Proof verified', t: 'verifier' }, { e: 'Revocation recorded', t: 'on-chain' }].map((x, i) => (
          <li key={x.e} className="flex items-center gap-[10px] rounded-[9px] border border-border px-[12px] py-[8px]">
            <span className="font-mono text-[10px] text-[#047857]">0{i + 1}</span>
            <span className="text-[13px] font-medium text-dark">{x.e}</span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-gray">{x.t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-[10px] flex items-center gap-[8px] rounded-[9px] border border-[#047857]/40 bg-[#047857]/[0.04] px-[12px] py-[8px]">
        <span className="h-[8px] w-[8px] rounded-full bg-[#047857]" />
        <span className="text-[12px] font-semibold text-dark">Reusable across services</span>
      </div>
    </div>
  )
}

// AI-assisted fraud detection: liveness + document authenticity + risk scoring.
export function FraudDetectionMock() {
  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]" aria-hidden="true">
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Fraud checks</span>
        <span className="font-mono text-[11px] text-gray">AI-assisted</span>
      </div>
      <div className="grid grid-cols-2 gap-[10px]">
        <div className="rounded-[10px] border border-border bg-bg-subtle p-[12px]">
          <div className="mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#047857]/40"><span className="h-[20px] w-[20px] rounded-full bg-[#047857]/25" /></div>
          <p className="mt-[8px] text-center text-[12px] font-semibold text-dark">Liveness</p>
          <p className="text-center font-mono text-[9px] uppercase tracking-[0.08em] text-[#047857]">passed</p>
        </div>
        <div className="rounded-[10px] border border-border bg-bg-subtle p-[12px]">
          <div className="flex flex-col gap-[4px]"><span className="h-[5px] w-[70%] rounded-full bg-dark/15" /><span className="h-[5px] w-[90%] rounded-full bg-dark/15" /><span className="h-[5px] w-[55%] rounded-full bg-dark/15" /></div>
          <p className="mt-[8px] text-[12px] font-semibold text-dark">Document</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#047857]">authentic</p>
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-[8px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Risk</span>
        <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-border"><span className="block h-full w-[18%] rounded-full bg-[#047857]" /></span>
        <span className="font-mono text-[10px] text-[#047857]">low</span>
      </div>
    </div>
  )
}
