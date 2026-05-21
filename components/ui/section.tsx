import { type HTMLAttributes } from 'react'
import { Reveal } from '@/components/ui/reveal'

type SectionBg = 'default' | 'subtle' | 'dark'
type SectionMaxWidth = 'wide' | 'xwide' | 'narrow' | 'prose'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  bg?: SectionBg
  maxWidth?: SectionMaxWidth
  as?: 'section' | 'div'
  /** Mono uppercase seam-band label rendered at the section's top edge. */
  label?: string
}

const bgClass: Record<SectionBg, string> = {
  default: 'bg-bg',
  subtle: 'bg-bg-subtle',
  dark: 'bg-canvas text-white',
}

const maxWidthClass: Record<SectionMaxWidth, string> = {
  wide: 'max-w-[1120px]',
  xwide: 'max-w-[1280px]',
  narrow: 'max-w-[880px]',
  prose: 'max-w-[720px]',
}

export function Section({
  bg = 'default',
  maxWidth = 'wide',
  as: Tag = 'section',
  label,
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={`${bgClass[bg]} px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px] ${className}`}
      {...props}
    >
      <div className={`${maxWidthClass[maxWidth]} mx-auto`}>
        {label && <SectionLabel>{label}</SectionLabel>}
        <div className="py-[56px] md:py-[72px] lg:py-[88px]">
          <Reveal>{children}</Reveal>
        </div>
      </div>
    </Tag>
  )
}

/** The canonical section-seam label: a bordered band carrying a left-aligned
 *  mono uppercase title. Replaces the per-section eyebrow treatments so the page
 *  reads as one continuous document (DESIGN.md Session 19). */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-y border-border">
      <span className="block py-[13px] font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-gray">
        {children}
      </span>
    </div>
  )
}
