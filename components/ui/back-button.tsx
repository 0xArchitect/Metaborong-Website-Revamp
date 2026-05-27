'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  /** Override the destination. If omitted, uses router.back() */
  href?: string
  label?: string
  /** Visual variant */
  variant?: 'nav' | 'ghost'
  className?: string
}

export function BackButton({
  href,
  label = 'Back',
  variant = 'nav',
  className = '',
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  if (variant === 'ghost') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-[6px] text-[13px] font-medium text-gray hover:text-dark transition-colors duration-150 group ${className}`}
      >
        <ArrowLeft
          size={14}
          className="transition-transform duration-150 group-hover:-translate-x-[2px]"
        />
        {label}
      </button>
    )
  }

  // variant === 'nav' — pill style that sits comfortably in the nav bar
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-[6px] h-[32px] px-[12px] rounded-full border border-border bg-bg text-[12px] font-semibold text-gray hover:text-dark hover:border-dark/30 transition-all duration-150 group ${className}`}
    >
      <ArrowLeft
        size={13}
        className="transition-transform duration-150 group-hover:-translate-x-[2px]"
      />
      {label}
    </button>
  )
}
