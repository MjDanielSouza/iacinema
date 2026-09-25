"use client";

import { useEffect } from "react";

const SELECTOR =
  ".scroll-reveal, .scroll-reveal-scale, .scroll-reveal-stagger > *, .backdrop-reveal";

// Curva de saída — a maior parte do movimento acontece logo no início do
// scrub, depois desacelera (sensação de "assentar").
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Scroll-driven de verdade: nada de "disparar uma vez e tocar uma
 * transição pronta". A cada frame de scroll a gente recalcula, pra cada
 * elemento, o quanto ele já cruzou a janela de entrada (com base na
 * posição real dele na tela) e escreve opacity/transform/filter direto,
 * proporcional a isso. Rolar rápido anima rápido, rolar devagar anima
 * devagar, e voltar pra cima desfaz — preso ao gesto, não a um timer.
 */
export function ScrollRevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (elements.length === 0) return;

    // Elementos dentro de um grupo .scroll-reveal-stagger cascateiam: cada
    // irmão precisa de um pouco mais de scroll que o anterior pra atingir
    // o mesmo progresso.
    const staggerOffset = new Map<HTMLElement, number>();
    for (const group of document.querySelectorAll<HTMLElement>(".scroll-reveal-stagger")) {
      Array.from(group.children).forEach((child, i) => {
        staggerOffset.set(child as HTMLElement, i * 70);
      });
    }

    const isBackdrop = (el: HTMLElement) => el.classList.contains("backdrop-reveal");
    const isScale = (el: HTMLElement) => el.classList.contains("scroll-reveal-scale");

    let ticking = false;

    function update() {
      const vh = window.innerHeight || 1;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const offset = staggerOffset.get(el) ?? 0;
        const startAt = vh * 0.92 - offset;
        const endAt = vh * 0.52 - offset;
        const raw = (startAt - rect.top) / (startAt - endAt || 1);
        const progress = Math.min(Math.max(raw, 0), 1);
        const t = easeOutCubic(progress);

        if (isBackdrop(el)) {
          const inset = 40 * (1 - t);
          el.style.opacity = String(0.15 + t * 0.85);
          el.style.clipPath = `inset(0 ${inset}% 0 ${inset}%)`;
          continue;
        }

        el.style.opacity = String(t);
        el.style.filter = `blur(${(1 - t) * 7}px)`;
        el.style.transform = isScale(el)
          ? `scale(${1.18 - t * 0.18})`
          : `translateY(${(1 - t) * 92}px) scale(${0.95 + t * 0.05})`;
      }
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
