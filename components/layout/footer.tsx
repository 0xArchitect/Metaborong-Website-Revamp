import { Logo } from '@/components/ui/logo'

const companyLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#founders' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

const serviceLinks = [
  { label: 'Web3 / Blockchain', href: '/services/web3' },
  { label: 'AI Agents', href: '/services/ai' },
  { label: 'Product Studio', href: '/services/product-studio' },
]

const offices = [
  { country: 'India', address: '117, Rajyadharpur Govt Colony, Mallickpara, Serampore, West Bengal' },
  { country: 'United Arab Emirates', address: 'Sharjah Media City, Sharjah, UAE, Al Batayih, 000000' },
  { country: 'USA', address: '16192 Coastal Hwy, Lewes, DE 19958' },
]

const colHead = 'mb-[18px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray'
const colLink =
  'inline-flex min-h-[40px] items-center text-[14px] tracking-[-0.005em] text-dark no-underline transition-[color] duration-[var(--duration-instant)] hover:text-brand'
const bottomLink =
  'text-gray no-underline transition-[color] duration-[var(--duration-instant)] hover:text-brand'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-bg px-[16px] pt-[64px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]">
      <div className="mx-auto max-w-[1280px]">
        {/* Top — brand + sitemap + offices */}
        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[40px] border-b border-border pb-[48px] md:gap-[40px] lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 flex flex-col gap-[16px] md:col-span-1 lg:col-span-1">
            <Logo size="md" href="/" />
            <p className="max-w-[36ch] text-[14px] leading-[1.55] tracking-[-0.005em] text-gray">
              Metaborong builds and ships Web3 protocols, AI agents, and SaaS products. We are a small, senior, founder-led team.
            </p>
          </div>

          <nav aria-label="Company" className="col-span-1">
            <p className={colHead}>Company</p>
            <ul className="flex flex-col gap-[10px]">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={colLink}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="col-span-1">
            <p className={colHead}>Services</p>
            <ul className="flex flex-col gap-[10px]">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={colLink}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <p className={colHead}>Offices</p>
            <div className="flex flex-col gap-[18px]">
              {offices.map(({ country, address }) => (
                <address key={country} className="flex flex-col gap-[4px] not-italic">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand">{country}</span>
                  <span className="text-[13px] leading-[1.5] text-gray">{address}</span>
                </address>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-[16px] py-[28px] font-mono text-[11px] uppercase tracking-[0.12em] text-gray text-center md:text-left">
          <span>© {year} Metaborong Technologies</span>
          <a href="mailto:contact@metaborong.com" className={bottomLink}>contact@metaborong.com</a>
          <div className="flex items-center justify-center gap-[8px] w-full md:w-auto">
            <a
              href="https://linkedin.com/company/metaborong-technologies"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-[44px] w-[44px] items-center justify-center border border-border text-gray transition-[color,border-color] duration-[var(--duration-instant)] hover:border-brand hover:text-brand"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v2h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.36h-4.56v-7.4c0-1.77-.03-4.05-2.47-4.05-2.47 0-2.85 1.93-2.85 3.93V22H7.62V8z"/></svg>
            </a>
            <a
              href="https://x.com/Metaborong"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="X / Twitter"
              className="inline-flex h-[44px] w-[44px] items-center justify-center border border-border text-gray transition-[color,border-color] duration-[var(--duration-instant)] hover:border-brand hover:text-brand"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
