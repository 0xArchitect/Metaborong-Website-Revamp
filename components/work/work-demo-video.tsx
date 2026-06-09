'use client'

import { useEffect, useRef } from 'react'

// Demo video that loads lazily and only plays while on screen. `preload="none"`
// + IntersectionObserver-gated play() avoids pulling the file until needed
// (replaces bare autoPlay, which downloads the whole asset eagerly). A poster
// fills the frame before bytes arrive; reduced-motion keeps the poster, no play.
export function WorkDemoVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}
