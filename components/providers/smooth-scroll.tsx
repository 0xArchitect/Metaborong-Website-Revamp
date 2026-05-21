'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'

// Fixed nav height (px) — anchor targets carry `scroll-mt-[64px]` for native
// jumps; Lenis ignores scroll-margin, so we pass the same offset here and to snap.
const NAV_OFFSET = 64

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    let lenis: Lenis | null = null
    let snap: Snap | null = null
    let rafId = 0
    let resizeTimer = 0
    let settleTimer = 0
    let points: number[] = []
    let onScroll: (() => void) | null = null

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

    // Top-level homepage sections worth a snap point at their start. Excludes
    // nested <section>s and the short Trust-bar marquee strip.
    const snapSections = () => {
      const all = [...document.querySelectorAll('main section')] as HTMLElement[]
      const minHeight = window.innerHeight * 0.4
      return all.filter(
        (s) => !all.some((o) => o !== s && o.contains(s)) && s.getBoundingClientRect().height >= minHeight,
      )
    }

    // Mandatory snap to every section START, but only while the scroll position
    // is near a snap point. Deep inside a tall section (e.g. Services' 260vh
    // scrolltelling) no point is near, so snap suspends and the body scrolls
    // freely — you stop at each section's start without being trapped mid-section.
    const createSnap = () => {
      if (!lenis) return
      snap = new Snap(lenis, {
        type: 'mandatory',
        // Soft landing (user-picked): slow ease-in-out quart glide so the pull
        // starts and ends gently instead of grabbing.
        duration: 2.8,
        easing: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
      })
      points = []
      for (const s of snapSections()) {
        const v = Math.max(0, Math.round(s.getBoundingClientRect().top + window.scrollY - NAV_OFFSET))
        snap.add(v)
        points.push(v)
      }
      // Narrow engage band: snap only kicks in when you're already close to a
      // section start, so the pull is short and gentle (and tall-section bodies
      // scroll freely once you're past the start).
      const band = window.innerHeight * 0.3
      onScroll = () => {
        if (!snap || !lenis) return
        const y = lenis.scroll
        const nearAStart = points.some((p) => Math.abs(y - p) < band)
        if (nearAStart) snap.start()
        else snap.stop()
      }
      lenis.on('scroll', onScroll)
      onScroll()
    }

    const teardownSnap = () => {
      if (onScroll && lenis) lenis.off('scroll', onScroll)
      onScroll = null
      snap?.destroy()
      snap = null
    }

    const rebuildSnap = () => {
      teardownSnap()
      createSnap()
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
      createSnap()
      // Recompute once after images/late layout settle (offsets shift as media loads).
      settleTimer = window.setTimeout(rebuildSnap, 800)
    }

    const stop = () => {
      if (!lenis) return
      document.removeEventListener('click', onAnchorClick)
      clearTimeout(settleTimer)
      teardownSnap()
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenis = null
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(rebuildSnap, 250)
    }
    window.addEventListener('resize', onResize)

    // Reduced motion → never run inertia or snap (native instant scroll).
    const sync = () => (mq.matches ? stop() : start())
    sync()
    mq.addEventListener('change', sync)

    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
      stop()
    }
  }, [])

  return <>{children}</>
}
