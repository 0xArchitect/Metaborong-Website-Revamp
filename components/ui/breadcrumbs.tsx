import { Fragment } from 'react'
import Link from 'next/link'
import { House, ChevronRight } from 'lucide-react'

export type Crumb = {
  label: string
  /** Omit on the current (last) crumb so it renders as a non-linked page marker. */
  href?: string
  /** Render the label as a home icon (with the label as sr-only text). */
  home?: boolean
}

// Shared site breadcrumb (OriginUI breadcrumb-03 pattern): home icon root,
// chevron separators, current page non-linked. The band reserves the fixed-nav
// height so it can sit at the top of any page that mounts <Nav>.
const GUTTER = 'px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]'

export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-bg border-b border-border-subtle pt-[calc(56px+24px)] pb-[24px] ${GUTTER}`}
    >
      <ol className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-[6px] text-[14px] text-gray sm:gap-[10px]">
        {items.map((crumb, i) => {
          const isCurrent = i === items.length - 1 || !crumb.href
          return (
            <Fragment key={i}>
              <li className="inline-flex items-center">
                {isCurrent ? (
                  <span role="link" aria-disabled="true" aria-current="page" className="py-[5px] text-dark">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href!}
                    className="inline-flex items-center py-[5px] transition-colors duration-[var(--duration-instant)] hover:text-dark"
                  >
                    {crumb.home ? (
                      <>
                        <House className="h-[16px] w-[16px]" strokeWidth={2} aria-hidden="true" />
                        <span className="sr-only">{crumb.label}</span>
                      </>
                    ) : (
                      crumb.label
                    )}
                  </Link>
                )}
              </li>
              {i < items.length - 1 && (
                <li aria-hidden="true" className="inline-flex items-center text-gray-subtle">
                  <ChevronRight className="h-[14px] w-[14px]" strokeWidth={2} />
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
