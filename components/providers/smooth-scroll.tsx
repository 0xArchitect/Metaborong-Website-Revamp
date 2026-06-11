'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

// Fixed nav height (px) — anchor targets carry `scroll-mt-[64px]` for native
// jumps; Lenis ignores scroll-margin, so we pass the same offset to scrollTo.
const NAV_OFFSET = 64

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    let lenis: Lenis | null = null
    let rafId = 0

    const onAnchorClick = (e: MouseEvent) => {
      if (!lenis) return
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement).closest('a')
      const href = anchor?.getAttribute('href')
      if (!href) return
      // Same-page hash links only: "#id" or "/#id".
      const hash = href.startsWith('#') ? href : href.startsWith('/#') ? href.slice(1) : null
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -NAV_OFFSET })
    }

    const start = () => {
      if (lenis) return
      lenis = new Lenis({ lerp: 0.1 })
      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
      document.addEventListener('click', onAnchorClick)
    }

    const stop = () => {
      if (!lenis) return
      document.removeEventListener('click', onAnchorClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenis = null
    }

    // Reduced motion → never run inertia (native instant scroll).
    const sync = () => (mq.matches ? stop() : start())
    sync()
    mq.addEventListener('change', sync)

    return () => {
      mq.removeEventListener('change', sync)
      stop()
    }
  }, [])

  return <>{children}</>
}
