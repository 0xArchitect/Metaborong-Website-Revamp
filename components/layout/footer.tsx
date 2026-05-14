import { Logo } from '@/components/ui/logo'

const footerLinks: { label: string; href: string }[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Work',     href: '/#work' },
  { label: 'About',    href: '/#founders' },
  { label: 'FAQ',      href: '/#faq' },
  { label: 'Contact',  href: '/#contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-canvas px-[16px] py-[28px] sm:px-[24px] md:px-[48px] lg:px-[96px] xl:px-[128px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[18px] md:flex-row md:items-center md:justify-between">
      <Logo showWordmark wordmarkColor="rgba(255,255,255,0.85)" />
      <nav className="flex flex-wrap gap-x-[18px] gap-y-[10px] md:gap-x-[24px]">
        {footerLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-[13px] tracking-[-0.01em] text-white/45 no-underline transition-colors duration-[var(--duration-instant)] hover:text-white/80"
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[10px] md:justify-end">
        <a href="https://linkedin.com/company/metaborong-technologies" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://x.com/Metaborong" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <span className="text-[12px] tracking-[-0.01em] text-white/30">© 2026 Metaborong Technologies</span>
      </div>
      </div>
    </footer>
  )
}
