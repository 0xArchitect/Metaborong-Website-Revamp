const CLIENTS = ['KGeN', 'Bionic', 'DATA3 AI', 'Defiverse', 'GET Smart', 'SEDAX', 'Bayan', 'Memestakes Vault']

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-line)]" style={{ background: 'var(--color-paper)' }}>
      <div className="container-x py-8 flex items-center gap-8">
        <div
          className="font-mono uppercase text-[var(--color-muted)] shrink-0"
          style={{ fontSize: 'var(--text-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)' }}
        >
          TRUSTED BY
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div
            className="flex gap-12 whitespace-nowrap"
            style={{ animation: 'trustBarScroll 24s linear infinite', width: 'max-content' }}
          >
            {[...CLIENTS, ...CLIENTS].map((name, i) => (
              <span
                key={i}
                className="font-mono uppercase text-[var(--color-ink)]"
                style={{ fontSize: 'var(--text-mono-sm)', letterSpacing: 'var(--tracking-mono)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes trustBarScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  )
}
