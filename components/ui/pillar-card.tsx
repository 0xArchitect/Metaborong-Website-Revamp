'use client';

import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { useRef, MouseEvent } from "react";

interface PillarCardProps {
  pillar: "WEB3" | "AI" | "PRODUCT";
  pillarColor: string;
  icon: LucideIcon;
  title: string;
  description: string;
  services: string[];
  href: string;
  ctaLabel: string;
}

export function PillarCard({
  pillar, pillarColor, icon: Icon, title, description, services, href, ctaLabel,
}: PillarCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      className="group relative block rounded-[16px] border border-[var(--color-line-dark)] hover:border-[var(--color-line-dark-hover)] bg-[var(--color-surface-dark)] p-8 md:p-10 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 overflow-hidden"
      style={{ ['--pillar' as never]: pillarColor }}
    >
      {/* Signature motion: radial gradient trace following cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(240px circle at var(--mx,50%) var(--my,50%), ${pillarColor}14, transparent 60%)`,
        }}
      />

      {/* Pillar identity row */}
      <div className="relative flex items-center gap-2" style={{ color: pillarColor }}>
        <Icon size={20} strokeWidth={1.5} />
        <span
          className="font-mono uppercase"
          style={{ fontSize: "var(--text-mono-sm)", letterSpacing: "var(--tracking-mono)" }}
        >
          {pillar}
        </span>
      </div>

      {/* Title */}
      <h3
        className="relative mt-8 font-medium text-white"
        style={{ fontSize: "var(--text-h3)", letterSpacing: "var(--tracking-h3)", lineHeight: 1.2 }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="relative mt-4 text-[var(--color-muted-dark)]"
        style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
      >
        {description}
      </p>

      {/* Service list */}
      <p
        className="relative mt-8 font-mono text-[var(--color-muted-dark)]"
        style={{ fontSize: "var(--text-mono-sm)", letterSpacing: "var(--tracking-mono)", lineHeight: 1.7 }}
      >
        {services.join(" · ")}
      </p>

      {/* Ghost CTA */}
      <span
        className="relative mt-10 inline-flex items-center gap-2"
        style={{ color: pillarColor }}
      >
        <span style={{ fontSize: "var(--text-body)" }}>{ctaLabel}</span>
        <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
