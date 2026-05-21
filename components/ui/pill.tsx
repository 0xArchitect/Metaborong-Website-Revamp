import { type HTMLAttributes } from 'react'

type PillTone = 'default' | 'inverse'

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'div' | 'p'
  /** `inverse` is for use on colored/dark surfaces (e.g. the blue Problem card). */
  tone?: PillTone
}

const toneClass: Record<PillTone, string> = {
  default: 'border-border bg-white text-dark',
  inverse: 'border-white/60 bg-white/10 text-off-white',
}

export function Pill({
  as: Tag = 'span',
  tone = 'default',
  className = '',
  children,
  ...props
}: PillProps) {
  return (
    <Tag
      className={`inline-flex w-fit items-center border rounded-[2px] px-[12px] py-[6px] font-mono text-[11px] font-bold uppercase leading-none tracking-[0.1em] ${toneClass[tone]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
