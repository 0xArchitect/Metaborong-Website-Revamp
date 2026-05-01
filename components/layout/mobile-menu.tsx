'use client';

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Cta } from "@/components/ui/cta";

const PILLARS = [
  { href: "/services/web3/", name: "Web3 Development" },
  { href: "/services/ai-agents/", name: "AI Agent Development" },
  { href: "/services/product-studio/", name: "Product Studio" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="text-[var(--color-ink)] p-2"
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60]"
          style={{ background: "var(--color-ink)", color: "white" }}
          role="dialog"
          aria-modal="true"
        >
          <div className="container-x flex items-center justify-between" style={{ height: 64 }}>
            <span className="font-medium text-[16px]">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-white p-2"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="container-x mt-8 flex flex-col gap-6">
            <button
              type="button"
              onClick={() => setServicesOpen(s => !s)}
              className="flex items-center justify-between text-[24px] font-medium"
              aria-expanded={servicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }}
              />
            </button>

            {servicesOpen && (
              <div className="flex flex-col gap-3 pl-2">
                {PILLARS.map(p => (
                  <Link key={p.href} href={p.href} onClick={() => setOpen(false)} className="text-[18px] text-white/85 hover:text-white">
                    {p.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="#work" onClick={() => setOpen(false)} className="text-[24px] font-medium">Work</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-[24px] font-medium">About</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="text-[24px] font-medium">Blog</Link>
          </nav>

          <div className="container-x absolute bottom-8 left-0 right-0">
            <Cta href="/contact" variant="primary" className="w-full justify-center">Let&apos;s talk</Cta>
          </div>
        </div>
      )}
    </>
  );
}
