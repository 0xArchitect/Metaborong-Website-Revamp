'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/components/sections/faq-data'

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="bg-bg px-[16px] py-[72px] sm:px-[24px] md:px-[48px] md:py-[88px] lg:px-[96px] lg:py-[96px] xl:px-[128px]">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-[36px] md:mb-[48px]">
          <p className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-light">FAQ</p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.035em] text-dark">Frequently asked questions</h2>
        </div>
        <div className="border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-[16px] bg-transparent py-[16px] text-left [font-family:var(--font-brand)] sm:py-[20px]"
                aria-expanded={open === i}
              >
                <span className="text-[16px] font-semibold leading-[1.3] tracking-[-0.02em] text-dark">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gray transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="pb-[16px] pr-[8px] sm:pb-[20px] sm:pr-[32px]">
                  <p className="text-[15px] leading-[1.7] tracking-[-0.01em] text-gray">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
