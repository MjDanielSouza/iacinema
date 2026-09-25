"use client";

import { useMemo, useState } from "react";

type TagType = "character" | "location" | "prop" | "dialogue";

interface Segment {
  text: string;
  type?: TagType;
}

const SCREENPLAY: Segment[] = [
  { text: "INT. GALPÃO ABANDONADO – NOITE\n\n", type: "location" },
  { text: "Um raio de lua atravessa as venezianas quebradas. " },
  { text: "RAFAEL", type: "character" },
  {
    text: " (35), casaco de couro surrado, cicatriz na sobrancelha esquerda, avança lentamente segurando uma ",
  },
  { text: "LANTERNA A QUEROSENE", type: "prop" },
  { text: ".\n\n" },
  { text: "RAFAEL", type: "character" },
  { text: "\n(sussurrando)\n" },
  { text: "Ela disse que estaria aqui...", type: "dialogue" },
  { text: "\n\nUm barulho metálico ecoa. " },
  { text: "MARINA", type: "character" },
  {
    text: " (28), cabelo curto grisalho, jaqueta tática cinza, surge das sombras empunhando uma ",
  },
  { text: "CHAVE DE FENDA", type: "prop" },
  { text: " como arma improvisada.\n\n" },
  { text: "MARINA", type: "character" },
  { text: "\n" },
  { text: "Você não devia ter vindo sozinho.", type: "dialogue" },
  {
    text: "\n\nRafael recua um passo e tropeça em uma ",
  },
  { text: "MOTOCICLETA", type: "prop" },
  { text: " enferrujada encostada na parede.", type: "dialogue" },
];

const FILTER_LABELS: Record<TagType, { name: string; color: string; hl: string }> = {
  character: { name: "Personagens", color: "#fcd34d", hl: "bg-amber-500/25 text-amber-300 ring-1 ring-amber-500/40" },
  location: { name: "Locais/Sets", color: "#C8F31D", hl: "bg-lime/25 text-lime ring-1 ring-lime/40" },
  prop: { name: "Artefatos/Props", color: "#d8b4fe", hl: "bg-purple-500/25 text-purple-300 ring-1 ring-purple-500/40" },
  dialogue: { name: "Falas/Ação", color: "#fda4af", hl: "bg-rose-500/25 text-rose-300 ring-1 ring-rose-500/40" },
};

const FILTER_BUTTONS: { type: TagType; label: string }[] = [
  { type: "character", label: "Destacar Personagens" },
  { type: "location", label: "Destacar Locais/Sets" },
  { type: "prop", label: "Destacar Artefatos/Props" },
  { type: "dialogue", label: "Destacar Falas/Ação" },
];

export function DecupadorLab() {
  const [active, setActive] = useState<Set<TagType>>(new Set(["character"]));

  function toggle(type: TagType) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }

  const extracted = useMemo(() => {
    const byType = new Map<TagType, string[]>();
    for (const type of active) {
      const seen = new Set<string>();
      const items: string[] = [];
      for (const seg of SCREENPLAY) {
        if (seg.type === type) {
          const clean = seg.text.trim();
          const key = clean.toLowerCase();
          if (clean && !seen.has(key)) {
            seen.add(key);
            items.push(clean);
          }
        }
      }
      byType.set(type, items);
    }
    return byType;
  }, [active]);

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-1">
        Laboratório: Decupador de Roteiro Interativo
      </h3>
      <p className="text-sm text-zinc-500 mb-4">
        Clique nos filtros para destacar e extrair automaticamente os elementos do trecho de roteiro abaixo.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTER_BUTTONS.map((btn) => {
          const isActive = active.has(btn.type);
          return (
            <button
              key={btn.type}
              onClick={() => toggle(btn.type)}
              className="px-3 py-2 rounded-lg border text-xs font-medium transition-all"
              style={{
                borderColor: isActive ? FILTER_LABELS[btn.type].color : "rgba(255,255,255,0.1)",
                color: FILTER_LABELS[btn.type].color,
                filter: isActive ? "brightness(1.15)" : "brightness(0.7)",
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface-card border border-white/10 rounded-xl p-5 text-sm leading-loose whitespace-pre-wrap font-mono">
          {SCREENPLAY.map((seg, i) => {
            if (!seg.type) return <span key={i}>{seg.text}</span>;
            const isActive = active.has(seg.type);
            const activeAny = active.size > 0;
            return (
              <span
                key={i}
                className={`rounded px-0.5 transition-all ${
                  isActive ? FILTER_LABELS[seg.type].hl : activeAny ? "opacity-40" : ""
                }`}
              >
                {seg.text}
              </span>
            );
          })}
        </div>

        <div className="bg-surface-card border border-white/10 rounded-xl p-4">
          <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
            Tabela de Decupagem
          </h4>
          {active.size === 0 ? (
            <p className="text-xs text-zinc-600">
              Selecione ao menos um filtro para extrair elementos do roteiro.
            </p>
          ) : (
            <div className="space-y-3 text-sm">
              {[...active].map((type) => (
                <div key={type}>
                  <div
                    className="text-[11px] uppercase tracking-wider font-semibold mb-1.5"
                    style={{ color: FILTER_LABELS[type].color }}
                  >
                    {FILTER_LABELS[type].name} ({extracted.get(type)?.length ?? 0})
                  </div>
                  <ul className="space-y-1">
                    {extracted.get(type)?.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-zinc-400 bg-surface-card-elevated rounded px-2 py-1 border border-white/10"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
