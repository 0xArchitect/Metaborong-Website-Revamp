'use client'

import { track } from '@vercel/analytics'

// Wraps any server-rendered child with a click-tracking boundary.
// display:contents keeps it out of layout entirely.
export function TrackClick({
  event,
  data,
  children,
}: {
  event: string
  data?: Record<string, string>
  children: React.ReactNode
}) {
  return (
    <span style={{ display: 'contents' }} onClick={() => track(event, data)}>
      {children}
    </span>
  )
}
