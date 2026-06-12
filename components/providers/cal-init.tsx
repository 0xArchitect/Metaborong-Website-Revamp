'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

// Registers the cal.com element-click embed for the "30min" namespace once
// per page load; any element carrying data-cal-link opens the popup.
export function CalInit() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])
  return null
}
