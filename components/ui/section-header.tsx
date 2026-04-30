// components/ui/section-header.tsx
import { ReactNode } from "react";

type Theme = "light" | "dark";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  theme?: Theme;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  theme = "light",
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const inkColor = theme === "dark" ? "text-white" : "text-[var(--color-ink)]";
  const bodyColor = theme === "dark" ? "text-[var(--color-muted-dark)]" : "text-[var(--color-muted)]";
  const eyebrowColor = theme === "dark" ? "text-[var(--color-muted-dark)]" : "text-[var(--color-muted)]";
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`max-w-3xl ${alignClass} ${className}`}>
      <div
        className={`font-mono uppercase ${eyebrowColor}`}
        style={{ fontSize: "var(--text-eyebrow)", letterSpacing: "var(--tracking-eyebrow)" }}
      >
        {eyebrow}
      </div>
      <h2
        className={`mt-4 font-medium ${inkColor}`}
        style={{ fontSize: "var(--text-h2)", letterSpacing: "var(--tracking-h2)", lineHeight: 1.05 }}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-6 ${bodyColor}`} style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.5 }}>
          {body}
        </p>
      )}
    </header>
  );
}
