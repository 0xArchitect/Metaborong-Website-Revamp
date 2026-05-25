import { type ReactNode } from 'react'
import { Section } from '@/components/ui/section'
import { Pill } from '@/components/ui/pill'

type Founder = {
  name: string
  role: string
  bio: string
  /** Real photo path, or null → monogram fallback (spec Deviation 5). */
  image: string | null
  /** Verified LinkedIn URL, or null → no button (spec Deviation 6). */
  linkedin: string | null
  /** Verified X profile URL, or null → no button. Added 2026-05-19 (user override
   *  of Deviation 6's "LinkedIn-only"). Same brand mark as LinkedIn. */
  x: string | null
}

// Copy synced verbatim from the A3-locked block in
// docs/superpowers/specs/2026-05-19-founders-copy-audit.md. Do not edit here —
// edit homepage.md + re-run the A3 chain, then re-sync.
const founders: Founder[] = [
  {
    name: 'Arnab Ray',
    role: 'CEO & Co-Founder',
    bio: 'Co-founded Metaborong and sets its direction across Web3 and AI engagements.',
    image: '/founders/arnab.svg',
    linkedin: 'https://www.linkedin.com/in/arnab-ray-682111192/',
    x: 'https://x.com/Arnab_Alfa_Ray',
  },
  {
    name: 'Anik Ghosh',
    role: 'COO & Co-Founder',
    bio: 'Co-founded the studio; owns delivery and the scope discipline that keeps timelines honest.',
    image: '/founders/anik.svg',
    linkedin: 'https://www.linkedin.com/in/anik-ghosh-01a985208/',
    x: 'https://x.com/0x_Zeph',
  },
  {
    name: 'Soumojit Ash',
    role: 'CTO & Co-Founder',
    bio: 'Co-founded the studio and owns the architecture under every Web3 protocol and AI system it ships.',
    image: '/founders/soumojit.svg',
    linkedin: 'https://www.linkedin.com/in/soumojit-ash/',
    x: 'https://x.com/SoumojitAsh',
  },
]

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Outlined square social button (LinkedIn + X use the same Bauhaus mark via
// currentColor — no X-black, per DESIGN.md brand discipline). Handoff draws these
// at 32px; we hold a ≥44px hit area (tap-target rule wins). Focus-visible ring
// comes from the global :where(a,…):focus-visible rule in globals.css — do not
// add outline-none here.
function SocialButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-[44px] w-[44px] items-center justify-center border border-border text-gray transition-[color,border-color,background-color] duration-[150ms] hover:border-brand hover:bg-bg-subtle hover:text-brand"
    >
      {children}
    </a>
  )
}

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="flex flex-col gap-[18px] bg-bg px-[28px] pt-[32px] pb-[36px] transition-colors duration-[250ms] hover:bg-bg-raised motion-reduce:transition-none">
      {/* 96px square photo well — image or monogram fallback for null. */}
      <div className="flex h-[96px] w-[96px] flex-none items-center justify-center overflow-hidden border border-border bg-bg-subtle">
        {founder.image ? (
          <img
            src={founder.image}
            alt={`${founder.name}, ${founder.role}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden className="text-[36px] font-bold tracking-[-0.04em] text-brand">
            {initials(founder.name)}
          </span>
        )}
      </div>

      <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.025em] text-dark">
        {founder.name}
      </h3>
      <span className="-mt-[10px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
        {founder.role}
      </span>
      <p className="flex-1 text-[15px] leading-[1.55] text-gray">{founder.bio}</p>

      {/* Social row — LinkedIn + X, each rendered only when its URL exists. */}
      {(founder.linkedin || founder.x) && (
        <div className="mt-auto flex items-center gap-[8px] border-t border-border-subtle pt-[16px]">
          {founder.linkedin && (
            <SocialButton href={founder.linkedin} label={`${founder.name} on LinkedIn`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.94H5.56v8.4h2.78zM6.95 8.7a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22zm11.39 9.64v-4.6c0-2.47-1.32-3.62-3.08-3.62a2.66 2.66 0 0 0-2.41 1.33h-.04V9.94H9.95c.04.79 0 8.4 0 8.4h2.78v-4.69c0-.25.02-.5.09-.68.2-.5.66-1.02 1.42-1.02 1 0 1.4.76 1.4 1.88v4.51h2.78z" />
              </svg>
            </SocialButton>
          )}
          {founder.x && (
            <SocialButton href={founder.x} label={`${founder.name} on X`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialButton>
          )}
        </div>
      )}
    </article>
  )
}

export function FoundersSection() {
  return (
    <Section bg="default" maxWidth="xwide" divider>
      {/* Header */}
      <div className="flex flex-col items-start gap-[24px]">
        <Pill>The team</Pill>
        <h2 className="text-balance text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] text-dark">
          The team behind <span className="text-brand">the work</span>
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray">
          Metaborong&apos;s three co-founders are hands-on in every Web3 and AI
          engagement. The work in our portfolio was built by us, not by a contracting
          layer we manage. You&apos;ll be in Slack with the people writing your code.
        </p>
      </div>

      {/* Hairline-seam team grid — matches Work-Preview's grammar: gap-[1px] on a
          bg-border field with a border-border frame; cards bg-bg, hover bg-bg-raised. */}
      <div className="mt-[48px] grid grid-cols-1 gap-[1px] border border-border bg-border md:grid-cols-3">
        {founders.map((founder) => (
          <FounderCard key={founder.name} founder={founder} />
        ))}
      </div>
    </Section>
  )
}
