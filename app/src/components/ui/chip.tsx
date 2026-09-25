import type { ReactNode } from "react";

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill px-3 py-1.5 bg-lime/[0.14] border border-lime/35 text-lime font-technical text-xs uppercase tracking-[0.14em] ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" aria-hidden="true" />
      {children}
    </span>
  );
}
