// Signature visual for the Smart Contract Development leaf hero (DESIGN.md: one
// signature visual per section, blueprint grammar, one-shot motion). A spec →
// test → audit → deploy verification pipeline: four stage nodes joined by a drawn
// connector, with a verified checkmark forming at the audited stage and a final
// deploy marker landing on-chain — the audit-first path the copy references.
// Pure SVG; the stroke-draw plays once on mount (hero is above the fold) and
// short-circuits to the final state under prefers-reduced-motion. Decorative —
// aria-hidden, lg+ only.

export function SmartContractVisual() {
  return (
    <figure className="scv relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* baseline rail the pipeline runs along */}
        <line
          className="scv-grid"
          x1="60"
          y1="150"
          x2="400"
          y2="150"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {/* the drawn pipeline connector through all four stages */}
        <path
          className="scv-pipe"
          pathLength={1}
          d="M60,150 H140 M196,150 H264 M320,150 H400"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* stage 1 — SPEC: a small document glyph */}
        <g className="scv-node scv-n1">
          <rect x="42" y="128" width="36" height="44" rx="2" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="50" y1="140" x2="70" y2="140" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="50" y1="150" x2="70" y2="150" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="50" y1="160" x2="64" y2="160" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>

        {/* stage 2 — TEST: a fuzzing/branch fork glyph */}
        <g className="scv-node scv-n2" stroke="var(--color-brand)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M168,168 V150 H180 M168,150 H156 M168,132 V150" />
          <circle cx="168" cy="168" r="3.5" fill="var(--color-bg)" />
          <circle cx="180" cy="150" r="3.5" fill="var(--color-bg)" />
          <circle cx="156" cy="150" r="3.5" fill="var(--color-bg)" />
          <circle cx="168" cy="132" r="3.5" fill="var(--color-bg)" />
        </g>

        {/* stage 3 — AUDIT: a shield with a forming verified checkmark */}
        <g className="scv-node scv-n3">
          <path
            d="M292,128 L310,134 L310,156 C310,166 302,172 292,176 C282,172 274,166 274,156 L274,134 Z"
            fill="var(--color-bg)"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            className="scv-check"
            pathLength={1}
            d="M284,151 L290,158 L301,143"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* stage 4 — DEPLOY: an on-chain block node */}
        <g className="scv-node scv-n4">
          <rect x="384" y="134" width="32" height="32" rx="2" fill="var(--color-brand)" />
          <rect x="384" y="134" width="32" height="32" rx="2" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="400" y1="134" x2="400" y2="166" stroke="var(--color-bg)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="384" y1="150" x2="416" y2="150" stroke="var(--color-bg)" strokeWidth="1" strokeOpacity="0.4" />
        </g>

        {/* stage labels (JetBrains Mono via --font-mono) */}
        <g className="scv-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" textAnchor="middle">
          <text x="60" y="200">SPEC</text>
          <text x="168" y="200">TEST</text>
          <text x="292" y="200">AUDIT</text>
          <text x="400" y="200">DEPLOY</text>
        </g>

        {/* the artefact handed forward — threat model line under the rail */}
        <g className="scv-foot" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.04em">
          <text x="60" y="232" fill="var(--color-gray-light)">{'// threat model'}</text>
          <text x="60" y="248" fill="var(--color-gray-light)">{'// invariants'}</text>
          <text x="60" y="264" fill="var(--color-brand)">→ verified on-chain</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.scv .scv-pipe { stroke-dasharray: 1; stroke-dashoffset: 1; }
.scv .scv-check { stroke-dasharray: 1; stroke-dashoffset: 1; }
.scv .scv-node, .scv .scv-label, .scv .scv-foot { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .scv .scv-pipe { animation: scvDraw 1.2s cubic-bezier(0.65,0,0.35,1) 0.15s forwards; }
  .scv .scv-n1 { animation: scvFade 0.4s ease-out 0.25s forwards; }
  .scv .scv-n2 { animation: scvFade 0.4s ease-out 0.5s forwards; }
  .scv .scv-n3 { animation: scvFade 0.4s ease-out 0.75s forwards; }
  .scv .scv-check { animation: scvDraw 0.5s cubic-bezier(0.65,0,0.35,1) 1.05s forwards; }
  .scv .scv-n4 { animation: scvFade 0.5s ease-out 1.25s forwards; }
  .scv .scv-label { animation: scvFade 0.6s ease-out 0.9s forwards; }
  .scv .scv-foot { animation: scvFade 0.6s ease-out 1.15s forwards; }
  @keyframes scvDraw { to { stroke-dashoffset: 0; } }
  @keyframes scvFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .scv .scv-pipe, .scv .scv-check { stroke-dashoffset: 0; }
  .scv .scv-node, .scv .scv-label, .scv .scv-foot { opacity: 1; }
}
`
