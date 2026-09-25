"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "violet" | "outline" | "play" | "ghost";

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium text-sm select-none transition duration-150 ease-standard disabled:opacity-40 disabled:pointer-events-none";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "rounded-pill h-[52px] px-7 bg-lime text-on-accent hover:bg-lime-hover hover:shadow-glow-lime hover:-translate-y-px active:bg-lime-pressed active:translate-y-0 active:scale-[0.98]",
  violet:
    "rounded-pill h-[52px] px-7 text-white border border-white/18 [background:var(--gradient-btn-violet)] hover:shadow-glow-violet hover:brightness-110",
  outline:
    "rounded-pill h-12 px-6 bg-transparent text-title border border-border-strong hover:border-lime hover:text-lime hover:bg-lime/[0.06]",
  play: "rounded-full w-14 h-14 bg-white/8 backdrop-blur border border-white/30 hover:scale-[1.08] hover:bg-lime [&_svg]:hover:text-on-accent",
  ghost: "link-underline text-title px-0 h-auto",
};

function ArrowIcon({ variant }: { variant: ButtonVariant }) {
  if (variant !== "primary") return null;
  return (
    <span className="w-7 h-7 rounded-full bg-on-accent/10 flex items-center justify-center shrink-0 transition-transform duration-150 ease-standard group-hover:rotate-45 group-hover:translate-x-0.5">
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-on-accent" aria-hidden="true">
        <path
          d="M4 12L12 4M12 4H6M12 4V10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type CommonProps = {
  variant?: ButtonVariant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({ variant = "primary", icon = true, className = "", children, ...props }: ButtonProps) {
  const showIcon = icon && variant === "primary";
  const classes = `group ${BASE} ${VARIANT_CLASSES[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
        {showIcon && <ArrowIcon variant={variant} />}
      </Link>
    );
  }

  const { ...rest } = props as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button className={classes} {...rest}>
      {children}
      {showIcon && <ArrowIcon variant={variant} />}
    </button>
  );
}
