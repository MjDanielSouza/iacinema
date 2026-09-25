"use client";

import { useEffect, useRef, useState } from "react";

const PIPELINE_LINES = [
  "[REF: CHAR_SHEET_02.PNG]",
  "BLOCKING: caminha até o balcão",
  "CÂMERA: 35mm, dolly in",
  'DIÁLOGO: "Já é tarde."',
];
const FULL_TEXT = PIPELINE_LINES.join("\n");

export function GoldenRule() {
  const [typed, setTyped] = useState("");
  const [copied, setCopied] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTyped(FULL_TEXT);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          let i = 0;
          const interval = setInterval(() => {
            i += 1;
            setTyped(FULL_TEXT.slice(0, i));
            if (i >= FULL_TEXT.length) clearInterval(interval);
          }, 20);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(FULL_TEXT);
    } catch {
      // ambiente sem permissão de clipboard
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section style={{ paddingBottom: "var(--section-spacing)" }}>
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)]">
        <p className="scroll-reveal font-technical text-xs uppercase tracking-[0.14em] text-muted mb-6">
          [DEMONSTRAÇÃO — REGRA DE OURO]
        </p>
        <div className="scroll-reveal-stagger grid sm:grid-cols-2 gap-5">
          <div className="bg-surface-card border border-border-default rounded-md p-7">
            <p className="font-technical text-[11px] uppercase tracking-[0.14em] text-red mb-5">
              Prompt amador (redundante)
            </p>
            <p className="font-technical text-sm leading-relaxed text-muted">
              <span className="line-through opacity-40">
                mulher jovem, cabelo curto preto, jaqueta de couro vermelha,
                bar escuro com neon, luz azul e rosa, câmera em plano médio...
              </span>
            </p>
          </div>

          <div ref={ref} className="border border-border-accent rounded-md bg-bg-raised p-7 relative">
            <div className="flex items-center justify-between mb-5">
              <p className="font-technical text-[11px] uppercase tracking-[0.14em] text-lime">Padrão pipeline</p>
              <button
                onClick={copy}
                className="press font-technical text-[11px] uppercase tracking-wide text-lime border border-lime/40 hover:border-lime rounded-xs px-2 py-1 transition-colors duration-150"
              >
                {copied ? "Copiado ✓" : "Copiar"}
              </button>
            </div>
            <pre className="font-technical text-sm leading-relaxed text-subtitle whitespace-pre-wrap">
              {typed.split("\n").map((line, i, arr) => {
                const isComplete = i < arr.length - 1 || typed === FULL_TEXT;
                const colonIndex = line.indexOf(":");
                if (isComplete && colonIndex > -1) {
                  return (
                    <span key={i}>
                      <span className="text-lime">{line.slice(0, colonIndex + 1)}</span>
                      {line.slice(colonIndex + 1)}
                      {i < arr.length - 1 ? "\n" : ""}
                    </span>
                  );
                }
                return (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? "\n" : ""}
                  </span>
                );
              })}
              <span className="text-lime">{typed !== FULL_TEXT ? "▍" : ""}</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
