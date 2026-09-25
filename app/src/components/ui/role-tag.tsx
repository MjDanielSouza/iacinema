import type { ReactNode } from "react";

export function RoleTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`font-technical text-xs uppercase tracking-[0.14em] bg-surface-card-elevated border border-border-default rounded-xs px-2 py-1 text-subtitle ${className}`}
    >
      {children}
    </span>
  );
}
