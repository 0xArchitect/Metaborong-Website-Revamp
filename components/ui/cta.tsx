// components/ui/cta.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface CtaProps {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const base = "inline-flex items-center gap-2 font-medium transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white px-6 py-3 rounded-[12px] hover:brightness-110 hover:shadow-md",
  secondary:
    "border border-[var(--color-ink)] text-[var(--color-ink)] px-6 py-3 rounded-[12px] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]",
  ghost:
    "text-[var(--color-ink)] hover:text-[var(--color-accent)] underline-offset-4 hover:underline",
};

export function Cta({ href, variant = "primary", children, className = "" }: CtaProps) {
  return (
    <Link href={href} className={`${base} ${variantStyles[variant]} ${className} group`}>
      <span>{children}</span>
      <ArrowRight
        size={16}
        strokeWidth={1.5}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}
