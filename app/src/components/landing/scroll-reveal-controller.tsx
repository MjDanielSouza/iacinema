"use client";

import { useEffect } from "react";

const SELECTOR = ".scroll-reveal, .scroll-reveal-scale, .scroll-reveal-stagger > *";

export function ScrollRevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    for (const el of elements) observer.observe(el);

    // Rede de segurança: se por algum motivo o observer não disparar pra
    // algum elemento (layout mudando, timing raro), nada fica escondido
    // pra sempre.
    const safety = setTimeout(() => {
      for (const el of elements) el.classList.add("is-revealed");
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return null;
}
