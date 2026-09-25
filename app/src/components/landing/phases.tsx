"use client";

import { useEffect, useRef, useState } from "react";
import { PHASES } from "@/lib/phases";
import { LabPreview } from "./lab-preview";
import { SectionBackdrop } from "./section-backdrop";

const BACKDROP =
  "https://d8j0ntlcm91z4.cloudfront.net/user_31jsKS5Tv7Qv1EoTdhaNio59PHu/hf_20260925_224455_17f4111e-33a7-4a4b-bb4c-d56b2cc68f65.png";

export function Phases() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const el of refs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="fases" className="relative scroll-mt-20 overflow-hidden">
      <SectionBackdrop src={BACKDROP} alt="Sala de controle de renderização com telas mostrando frames de IA sendo compostos" />
      <div
        className="relative max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)]"
        style={{ paddingBlock: "var(--section-spacing)" }}
      >
        <h2 className="scroll-reveal font-technical font-bold uppercase tracking-[0.02em] mb-14" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.5rem)" }}>
          Cinco fases, do papel à tela.
        </h2>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Coluna esquerda — timeline (só desktop, acompanha o scroll) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 flex items-start gap-6">
              <div className="flex flex-col items-center gap-0 pt-2">
                {PHASES.map((p, i) => (
                  <div key={p.number} className="flex flex-col items-center">
                    <span
                      className={`w-3 h-3 rounded-full border-2 transition-colors duration-250 ease-standard ${
                        active === i ? "bg-red border-red" : "border-white bg-transparent"
                      }`}
                    />
                    {i < PHASES.length - 1 && (
                      <span className="w-0.5 h-20 bg-border-strong" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                {PHASES.map((p, i) => (
                  <button
                    key={p.number}
                    onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className={`font-display font-bold text-left mb-[4.75rem] last:mb-0 transition-colors duration-250 ease-standard ${
                      active === i ? "text-title" : "text-muted"
                    }`}
                    style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
                  >
                    {String(p.number).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna direita — blocos de fase */}
          <div className="lg:col-span-8 flex flex-col gap-24">
            {PHASES.map((p, i) => (
              <div
                key={p.number}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="scroll-reveal scroll-mt-32"
              >
                <p className="lg:hidden font-technical text-xs uppercase tracking-[0.14em] text-muted mb-2">
                  {String(p.number).padStart(2, "0")}/05
                </p>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-title mb-1">
                  {p.title}
                </h3>
                <p className="font-technical text-xs uppercase tracking-[0.14em] text-subtitle">
                  {p.subtitle}
                </p>
                {i === 0 && <LabPreview />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
