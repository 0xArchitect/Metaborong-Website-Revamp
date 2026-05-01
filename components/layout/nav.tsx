'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { MMark } from "@/components/ui/logo";
import { Cta } from "@/components/ui/cta";
import { ServicesDropdown } from "@/components/layout/services-dropdown";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-200"
      style={{
        height: 72,
        backgroundColor: scrolled ? "rgba(245,247,255,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(10,10,10,0.04)" : "1px solid transparent",
      }}
    >
      <div className="container-x h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0 no-underline" aria-label="Metaborong home">
          <span
            className="flex items-center justify-center"
            style={{ width: 28, height: 28, background: "var(--color-brand)", borderRadius: 5 }}
          >
            <MMark className="w-4 h-[9px]" color="white" />
          </span>
          <span
            className="hidden sm:inline font-medium text-[var(--color-ink)]"
            style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
          >
            Metaborong
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <ServicesDropdown />
          <Link href="#work" className="text-[14px] font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-ink)] transition-colors">Work</Link>
          <Link href="/about" className="text-[14px] font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-ink)] transition-colors">About</Link>
          <Link href="/blog" className="text-[14px] font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-ink)] transition-colors">Blog</Link>
        </nav>

        <div className="hidden lg:block">
          <Cta href="/contact" variant="ghost">Let&apos;s talk</Cta>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
