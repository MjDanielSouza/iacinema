"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Fundo full-bleed com parallax (imagem se move mais devagar que o scroll)
 * e abertura tipo diafragma de lente quando a seção entra na tela.
 * Some nas bordas superior/inferior pra voltar ao bg-base entre seções.
 */
export function SectionBackdrop({
  src,
  alt,
  focus = "center",
}: {
  src: string;
  alt: string;
  focus?: "center" | "top" | "bottom";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = wrapRef.current?.parentElement;
    if (!section) return;

    if (!reduceMotion) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          const progress = (vh - rect.top) / (vh + rect.height);
          const clamped = Math.min(Math.max(progress, 0), 1);
          if (imgRef.current) {
            imgRef.current.style.transform = `translateY(${(clamped - 0.5) * 14}%) scale(1.18)`;
          }
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="backdrop-reveal absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={imgRef} className="absolute inset-0 scale-[1.18]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus === "center" ? "center" : focus }}
        />
      </div>
      <div className="absolute inset-0 bg-bg-base/78" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-backdrop-fade)" }} />
    </div>
  );
}
