'use client';

import Link from "next/link";
import { ChevronDown, Boxes, Brain, LayoutGrid, LucideIcon } from "lucide-react";
import { useState } from "react";

interface PillarRow {
  href: string;
  icon: LucideIcon;
  color: string;
  name: string;
  count: string;
  description: string;
}

const PILLARS: PillarRow[] = [
  {
    href: "/services/web3/",
    icon: Boxes,
    color: "var(--color-accent)",
    name: "Web3 Development",
    count: "5 services",
    description: "DeFi, DEX, lending, wallets, tokens.",
  },
  {
    href: "/services/ai-agents/",
    icon: Brain,
    color: "var(--color-accent-2)",
    name: "AI Agent Development",
    count: "5 services",
    description: "Agents for DeFi, audit, governance.",
  },
  {
    href: "/services/product-studio/",
    icon: LayoutGrid,
    color: "var(--color-brand)",
    name: "Product Studio",
    count: "4 services",
    description: "Telegram MiniApps, SaaS, migrations.",
  },
];

export function ServicesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-[14px] font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-ink)] transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Services
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full pt-3"
          style={{ width: 400 }}
        >
          <div
            className="rounded-[12px] bg-[var(--color-surface)] p-2"
            style={{
              border: "1px solid var(--color-line)",
              boxShadow: "0 12px 32px rgba(10,10,10,0.08)",
            }}
          >
            {PILLARS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex flex-col gap-1 rounded-[8px] p-3 hover:bg-[var(--color-paper)] border-l-2 border-transparent transition-[background-color,border-color] duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = p.color)}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "transparent")}
              >
                <div className="flex items-center gap-3">
                  <p.icon size={20} strokeWidth={1.5} style={{ color: p.color }} />
                  <span className="text-[16px] font-medium text-[var(--color-ink)]">{p.name}</span>
                  <span
                    className="ml-auto font-mono text-[var(--color-muted)]"
                    style={{ fontSize: "var(--text-mono-sm)", letterSpacing: "var(--tracking-mono)" }}
                  >
                    {p.count}
                  </span>
                </div>
                <span className="text-[14px] text-[var(--color-muted)] pl-[32px]">{p.description}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
