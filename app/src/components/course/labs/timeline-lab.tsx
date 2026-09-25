"use client";

import { useMemo, useState } from "react";

type LayerId = "cut" | "adr" | "sound" | "color";

const LAYERS: { id: LayerId; trackLabel: string; toggleLabel: string; color: string }[] = [
  { id: "cut", trackLabel: "V1 — Vídeo (Corte de Takes)", toggleLabel: "Aplicar Corte de Take", color: "#f59e0b" },
  { id: "adr", trackLabel: "A1 — Diálogo / Dublagem (ADR)", toggleLabel: "Ativar Dublagem/ADR", color: "#06b6d4" },
  { id: "sound", trackLabel: "A2 — Sound Design / Foley", toggleLabel: "Inserir Camada de Sound Design", color: "#a855f7" },
  { id: "color", trackLabel: "Color Grading (DI)", toggleLabel: "Aplicar Color Grading Cinematográfico", color: "#f43f5e" },
];

const DESCRIPTIONS: Record<LayerId, string> = {
  cut: "os takes brutos foram cortados e organizados com ritmo narrativo definido",
  adr: "os diálogos já contam com dublagem/ADR sincronizada em lip-sync",
  sound: "a paisagem sonora e a trilha de Foley foram inseridas, dando peso real às imagens",
  color: "o color grading cinematográfico e o grão de película foram aplicados, unificando a estética de todos os takes",
};

export function TimelineLab() {
  const [state, setState] = useState<Record<LayerId, boolean>>({
    cut: false,
    adr: false,
    sound: false,
    color: false,
  });

  const pct = Object.values(state).filter(Boolean).length * 25;

  const preview = useMemo(() => {
    const active = LAYERS.filter((l) => state[l.id]).map((l) => DESCRIPTIONS[l.id]);
    if (active.length === 0) {
      return "Nenhuma camada de pós-produção foi aplicada ainda. O filme ainda é apenas um conjunto de takes brutos gerados na Fase 4.";
    }
    if (pct === 100) {
      return "Master finalizado! " + active.join("; ") + ". O filme está pronto para exibição.";
    }
    return "Progresso atual: " + active.join("; ") + ".";
  }, [state, pct]);

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-1">
        Laboratório: Mini-Timeline de Pós-Produção
      </h3>
      <p className="text-sm text-zinc-500 mb-4">
        Ative cada camada da ilha de edição e acompanhe o status do master do filme.
      </p>

      <div className="bg-[#0D0E12] border border-white/10 rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-white">
            Master Finalizado: {pct}%
          </span>
          <div className="w-40 h-2 bg-[#14151B] rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-[#D4FF00] transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          {LAYERS.map((l) => (
            <div key={l.id} className="flex items-center gap-3">
              <span className="w-52 shrink-0 text-xs text-zinc-400">{l.trackLabel}</span>
              <div className="flex-1 h-6 bg-[#14151B] rounded border border-white/10 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: "100%",
                    background: l.color,
                    opacity: state[l.id] ? 0.85 : 0.12,
                    filter: state[l.id] ? "none" : "grayscale(1)",
                  }}
                />
              </div>
              <span
                className={`w-16 text-right text-[11px] ${
                  state[l.id] ? "text-amber-400" : "text-zinc-600"
                }`}
              >
                {state[l.id] ? "Ativo" : "Vazio"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            onClick={() => setState((s) => ({ ...s, [l.id]: !s[l.id] }))}
            className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
              state[l.id]
                ? "border-amber-500 text-amber-400 bg-amber-500/10"
                : "border-white/10 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            {l.toggleLabel}
          </button>
        ))}
      </div>

      <div className="bg-[#0D0E12] border border-white/10 rounded-xl p-4">
        <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">
          Preview / Status do Filme
        </h4>
        <p className="text-sm text-zinc-400 leading-relaxed">{preview}</p>
      </div>
    </div>
  );
}
