import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  loading?: boolean
  /** When set, renders the split-arrow primary signature. The button label
   *  appears in the left span; this character (default: '→') in a darker right span. */
  arrow?: string | false
}

const sizeClass: Record<ButtonSize, { text: string; pad: string; arrowPad: string }> = {
  sm: { text: 'text-[13px]', pad: 'py-[6px] px-[14px]',  arrowPad: 'px-[10px]' },
  md: { text: 'text-[15px]', pad: 'py-[8px] px-[18px]',  arrowPad: 'px-[12px]' },
  lg: { text: 'text-[15px]', pad: 'py-[10px] px-[22px]', arrowPad: 'px-[14px]' },
}

const variantClass: Record<ButtonVariant, { base: string; hover: string; active: string }> = {
  // Primary + secondary action colors resolve from --cta-color, which pillar
  // service surfaces localize (AI=teal, PS=orange). Neutral surfaces have no
  // --cta-color set, so the brand-blue fallbacks below apply unchanged.
  primary: {
    base:   'bg-[var(--cta-color,var(--color-brand))] text-white border border-[var(--cta-color,var(--color-brand))]',
    hover:  'hover:bg-[var(--cta-hover,#1a3fdb)] hover:border-[var(--cta-hover,#1a3fdb)]',
    active: 'active:bg-[var(--cta-active,#0f2eb8)] active:border-[var(--cta-active,#0f2eb8)]',
  },
  ghost: {
    base:   'bg-transparent text-dark border border-border',
    hover:  'hover:bg-bg-subtle hover:border-gray-subtle',
    active: 'active:bg-border-subtle',
  },
  secondary: {
    base:   'bg-bg-subtle text-[var(--cta-color,var(--color-brand))] border border-[color-mix(in_srgb,var(--cta-color,var(--color-brand))_20%,transparent)]',
    hover:  'hover:border-[color-mix(in_srgb,var(--cta-color,var(--color-brand))_40%,transparent)]',
    active: 'active:bg-[color-mix(in_srgb,var(--cta-color,var(--color-brand))_8%,#fff)]',
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  arrow,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const sz = sizeClass[size]
  const v = variantClass[variant]

  // Split-arrow signature only on primary, only when an arrow char is requested
  // (or implicitly: passed via the `arrow` prop; consumers using `→` in children
  // can opt in by setting arrow="→" and trimming children).
  const showSplitArrow = variant === 'primary' && arrow !== false && typeof arrow === 'string' && arrow.length > 0

  const base = [
    'inline-flex items-center font-semibold tracking-[-0.01em] cursor-pointer no-underline',
    'rounded-none', // square corners — Bauhaus restraint
    'transition-[background-color,border-color,color] duration-[var(--duration-instant)] ease-[cubic-bezier(0.4,0,0.2,1)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-current disabled:hover:border-current',
    'tabular-nums',
    sz.text,
    v.base,
    !disabled && !loading ? v.hover : '',
    !disabled && !loading ? v.active : '',
    className,
  ].join(' ')

  const isInert = disabled || loading

  const inner: ReactNode = showSplitArrow ? (
    <>
      <span className={`flex items-center ${sz.pad}`}>
        {loading ? <Spinner /> : children}
      </span>
      <span
        aria-hidden="true"
        className={`flex items-center self-stretch ${sz.arrowPad} bg-[rgba(255,255,255,0.10)] border-l border-white/15 text-[18px] sm:text-[20px] md:text-[22px] font-light`}
      >
        {arrow}
      </span>
    </>
  ) : (
    <span className={`flex items-center gap-[6px] ${sz.pad}`}>
      {loading ? <Spinner /> : children}
    </span>
  )

  if (href && !isInert) {
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    )
  }

  return (
    <button
      className={base}
      disabled={isInert}
      aria-busy={loading || undefined}
      {...props}
    >
      {inner}
    </button>
  )
}

function Spinner() {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block h-[14px] w-[14px] animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  )
}
