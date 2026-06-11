import { type HTMLAttributes } from 'react'
import { type PillarId } from '@/components/sections/services-data'

type EyebrowTone = 'default' | PillarId

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'div' | 'p'
  tone?: EyebrowTone
}

const toneClass: Record<EyebrowTone, string> = {
  'default':        'text-gray-light',
  'web3':           'text-brand',
  'ai':             'text-ai',
  'product-studio': 'text-accent',
}

export function Eyebrow({
  as: Tag = 'span',
  tone = 'default',
  className = '',
  children,
  ...props
}: EyebrowProps) {
  return (
    <Tag
      className={`text-[11px] font-bold uppercase tracking-[0.1em] leading-none ${toneClass[tone]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
