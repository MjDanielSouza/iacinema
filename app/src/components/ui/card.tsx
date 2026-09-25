import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "base" | "featured" | "glass" | "bento" | "feature";

const VARIANT_CLASSES: Record<CardVariant, string> = {
  base: "bg-surface-card border border-border-default rounded-md shadow-card hover:border-white/20 hover:bg-surface-card-elevated hover:-translate-y-0.5 transition duration-250 ease-standard",
  featured: "bg-lime text-on-accent rounded-md",
  glass: "glass rounded-md",
  bento: "border border-border-accent rounded-lg bg-bg-raised",
  feature: "bg-surface-card border border-border-default rounded-md",
};

export function Card({
  variant = "base",
  className = "",
  children,
  ...rest
}: {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${VARIANT_CLASSES[variant]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
