'use client'

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes } from 'react'

interface StaggerProps extends HTMLAttributes<HTMLElement> {
  /** Wrapper element to render (ul/ol/dl/div). Defaults to div. */
  as?: ElementType
}

/**
 * IO-gated one-shot wrapper for the leaf-page scroll choreography. Adds
 * `is-visible` to itself once it enters the viewport; the actual motion lives in
 * globals.css keyed off the caller's className (`stagger` cascade or `aeo-draw`
 * rule-draw), gated behind `prefers-reduced-motion: no-preference`. Reduced-motion
 * and no-JS therefore keep content in its natural visible state.
 */
export function Stagger({ as: Tag = 'div', className = '', children, ...props }: StaggerProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`${className} ${visible ? 'is-visible' : ''}`} {...props}>
      {children}
    </Tag>
  )
}
