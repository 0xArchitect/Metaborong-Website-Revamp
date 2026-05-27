import { type HTMLAttributes } from 'react'

type EyebrowTone = 'default' | 'inverse'

interface SectionEyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'div' | 'p'
  /** `inverse` is for colored/dark surfaces (e.g. the blue Problem card). */
  tone?: EyebrowTone
}

// Unified section eyebrow: 8px brand square + mono label (no border, no hairline).
// Mirrors the Hero/Contact reference treatment; replaces the bordered Pill.
const markClass: Record<EyebrowTone, string> = {
  default: 'bg-brand',
  inverse: 'bg-off-white',
}
const textClass: Record<EyebrowTone, string> = {
  default: 'text-gray-light',
  inverse: 'text-off-white',
}

export function SectionEyebrow({
  as: Tag = 'span',
  tone = 'default',
  className = '',
  children,
  ...props
}: SectionEyebrowProps) {
  return (
    <Tag
      className={`inline-flex w-fit items-center gap-[10px] font-mono text-[11px] font-bold uppercase leading-none tracking-[0.14em] ${textClass[tone]} ${className}`}
      {...props}
    >
      <span aria-hidden="true" className={`h-[8px] w-[8px] flex-none ${markClass[tone]}`} />
      {children}
    </Tag>
  )
}
