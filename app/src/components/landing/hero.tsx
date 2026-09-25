"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RecIndicator } from "@/components/ui/rec-indicator";

const HERO_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_31jsKS5Tv7Qv1EoTdhaNio59PHu/hf_20260925_143804_fe6bfb96-5977-45b9-86a9-afab1ded104b.png";

export function Hero({
  primaryHref,
  primaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / 900, 1);
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${progress * 8}%)`;
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full">
      <div className="tech-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[60%]"
        style={{
          background:
            "radial-gradient(55% 65% at 75% 25%, rgba(130,70,230,0.5) 0%, rgba(40,20,90,0.22) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display font-bold leading-none select-none whitespace-nowrap"
        style={{
          fontSize: "18vw",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
        }}
        aria-hidden="true"
      >
        PIPELINE
      </span>

      <div className="relative grid lg:grid-cols-2 min-h-[min(92vh,900px)]">
        <div
          className="flex flex-col justify-center py-16 lg:py-20 pr-6 lg:pr-12"
          style={{
            paddingLeft: "max(clamp(20px, 4vw, 48px), calc((100vw - 1240px) / 2))",
          }}
        >
          <span className="hero-fade-in inline-flex items-center gap-2 rounded-pill px-3 py-1.5 bg-lime/[0.14] border border-lime/35 text-lime font-technical text-xs uppercase tracking-[0.14em] mb-8 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" aria-hidden="true" />
            Curso + Ferramenta de Produção com IA
          </span>

          <h1
            className="font-display font-bold leading-[0.98] tracking-[-0.03em] mb-7"
            style={{ fontSize: "clamp(2.75rem, 6.2vw, 5.75rem)" }}
          >
            <span className="hero-line-reveal text-title" style={{ animationDelay: "300ms" }}>
              O pipeline que leva um roteiro{" "}
            </span>
            <span className="hero-line-reveal text-lime" style={{ animationDelay: "390ms" }}>
              até a tela,
            </span>{" "}
            <span className="hero-line-reveal text-dim-headline block" style={{ animationDelay: "480ms" }}>
              ensinado e aplicado no mesmo lugar.
            </span>
          </h1>

          <p
            className="hero-fade-in text-body text-lg leading-relaxed mb-10"
            style={{ maxWidth: "58ch", animationDelay: "700ms" }}
          >
            Cinco fases — roteiro, pesquisa, assets, direção de cena e
            pós-produção — com laboratórios práticos em cada uma, e um
            espaço pra aplicar tudo isso em um projeto de verdade, com sua
            equipe.
          </p>

          <div className="hero-fade-in flex flex-wrap gap-3" style={{ animationDelay: "700ms" }}>
            <Button href={primaryHref} variant="primary">
              {primaryLabel}
            </Button>
            <Button href="#comunidade" variant="outline" icon={false}>
              Conhecer a Comunidade &amp; Método
            </Button>
          </div>
        </div>

        <div className="relative min-h-[420px] lg:min-h-0 overflow-hidden">
          <div ref={imageRef} className="absolute inset-0 -inset-y-4">
            <Image
              src={HERO_IMAGE}
              alt="Frame cinematográfico gerado por IA: personagem em ambiente noturno, estilo anamórfico 35mm"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="hero-letterbox object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(38% 32% at 78% 18%, rgba(210,190,255,0.55) 0%, rgba(178,102,232,0.12) 40%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-image-fade-left)" }} aria-hidden="true" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-image-fade-bottom)" }} aria-hidden="true" />

          <div className="absolute bottom-6 left-6 lg:left-10 right-6 flex items-center gap-3">
            <RecIndicator label="" delayMs={900} />
            <p className="font-technical text-[11px] uppercase tracking-wide text-white/80">
              Frame gerado a partir de roteiro decupado + character sheet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
