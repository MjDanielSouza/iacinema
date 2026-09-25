"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#metodo", label: "Método" },
  { href: "#fases", label: "As 5 Fases" },
  { href: "#comunidade", label: "Comunidade" },
];

export function Header({ navHref, navLabel }: { navHref: string; navLabel: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 h-[76px] flex items-center transition-[background-color,backdrop-filter,border-color] duration-250 ease-standard border-b ${
        scrolled ? "bg-[rgba(7,7,10,0.72)] backdrop-blur-[14px] border-border-subtle" : "bg-transparent border-transparent"
      }`}
    >
      <div className="w-full max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)] flex items-center justify-between gap-6">
        <Link href="/" className="font-display font-bold text-lg text-title shrink-0">
          Pipeline<span className="text-lime">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-subtitle hover:text-title transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href={navHref}
          className="hidden md:inline-flex items-center h-11 px-5 rounded-pill text-sm font-medium text-title border border-border-strong hover:bg-lime hover:text-on-accent hover:border-lime transition duration-150 ease-standard shrink-0"
        >
          {navLabel}
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span className="w-6 h-px bg-title" />
          <span className="w-6 h-px bg-title" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-bg-deep flex flex-col md:hidden">
          <div className="flex items-center justify-between h-[76px] px-[clamp(20px,4vw,48px)]">
            <span className="font-display font-bold text-lg text-title">
              Pipeline<span className="text-lime">.</span>
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu" className="p-2 -mr-2 text-title text-2xl leading-none">
              &times;
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-8 px-[clamp(20px,4vw,48px)]">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display font-bold text-[32px] text-title"
              >
                {l.label}
              </a>
            ))}
            <Link
              href={navHref}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center h-[52px] px-7 rounded-pill bg-lime text-on-accent font-medium text-sm w-fit"
            >
              {navLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
