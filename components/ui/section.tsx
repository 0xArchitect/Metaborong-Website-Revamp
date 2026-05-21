import { type HTMLAttributes } from 'react'
import { Reveal } from '@/components/ui/reveal'

type SectionBg = 'default' | 'subtle' | 'dark'
type SectionMaxWidth = 'wide' | 'xwide' | 'narrow' | 'prose'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  bg?: SectionBg
  maxWidth?: SectionMaxWidth
  as?: 'section' | 'div'
  /** Edge-to-edge 1px top hairline — the section-seam idiom (Session 19 redo). */
  divider?: boolean
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
  divider = false,
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={`${bgClass[bg]} ${divider ? 'border-t border-border' : ''} py-[56px] md:py-[72px] lg:py-[96px] px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px] ${className}`}
      {...props}
    >
      <div className={`${maxWidthClass[maxWidth]} mx-auto`}>
        <Reveal>{children}</Reveal>
      </div>
    </Tag>
  )
}
