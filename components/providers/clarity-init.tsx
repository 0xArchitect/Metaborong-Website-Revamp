'use client'

import Script from 'next/script'
import { useConsent } from '@/lib/use-consent'

// Microsoft Clarity — session-replay/heatmap analytics. Also doubles as our
// Bing Webmaster Tools site-ownership verification (Bing's "Clarity" verify
// method just checks that this project ID is live on the domain). Clarity
// sets identifying cookies, so unlike the cookieless Vercel Analytics tag it
// stays behind the mb_consent gate — only mounts once the visitor accepts.
const CLARITY_PROJECT_ID = 'xs0boq9arv'

export function ClarityInit() {
  const { decision } = useConsent()

  if (decision !== 'accepted') return null

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
    </Script>
  )
}
