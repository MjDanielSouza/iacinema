"use client";

import { useState } from "react";

interface FolderCard {
  title: string;
  meta: string;
  desc: string;
}

interface Folder {
  id: string;
  label: string;
  cards: FolderCard[];
}

const FOLDERS: Folder[] = [
  {
    id: "roteiro",
    label: "01_Roteiro",
    cards: [
      {
        title: "Roteiro_Master_v3.pdf",
        meta: "Documento mestre",
        desc: "Versão decupada na Fase 1, com sluglines, personagens, props e diálogos marcados.",
      },
      {
        title: "Guia_de_Estilo_Visual.pdf",
        meta: "Look & Tone",
        desc: "Definição macro da estética: tom, paleta de cor e referência de gênero cinematográfico.",
      },
    ],
  },
  {
    id: "personagens",
    label: "02_Pesquisa_Personagens",
    cards: [
      {
        title: "Rafael — Referência Facial",
        meta: "Char. Principal",
        desc: "Rosto anguloso, cicatriz na sobrancelha esquerda, cabelo curto castanho escuro, 35 anos.",
      },
      {
        title: "Marina — Referência Facial",
        meta: "Char. Secundária",
        desc: "Cabelo curto grisalho, estrutura atlética, olhar determinado, 28 anos.",
      },
    ],
  },
  {
    id: "figurinos",
    label: "03_Pesquisa_Figurinos",
    cards: [
      {
        title: "Rafael — Cena 01",
        meta: "Wardrobe",
        desc: "Jaqueta de couro marrom surrada, camisa cinza, calça jeans escura, botas de trilha.",
      },
      {
        title: "Rafael — Cena 02",
        meta: "Wardrobe",
        desc: "Jaqueta tática cinza-escura, colete utilitário, calça cargo preta, coturno tático.",
      },
      {
        title: "Marina — Cena 03",
        meta: "Wardrobe",
        desc: "Jaqueta tática cinza, camiseta preta, calça cargo, luvas sem dedos.",
      },
    ],
  },
  {
    id: "locais",
    label: "04_Pesquisa_Locais_Sets",
    cards: [
      {
        title: "Galpão Abandonado",
        meta: "Location Scouting",
        desc: "Vigas de metal enferrujadas, luar entrando por venezianas quebradas, poeira suspensa.",
      },
      {
        title: "Beco Industrial",
        meta: "Location Scouting",
        desc: "Beco estreito entre galpões, chão molhado, luzes de neon distante, fiação exposta.",
      },
      {
        title: "Telhado ao Amanhecer",
        meta: "Location Scouting",
        desc: "Dutos de ventilação, luz alaranjada do amanhecer, silhuetas da cidade ao fundo.",
      },
    ],
  },
  {
    id: "artefatos",
    label: "05_Pesquisa_Artefatos_Props",
    cards: [
      {
        title: "Lanterna a Querosene",
        meta: "Prop de Cena",
        desc: "Metal envelhecido, vidro trincado, chama alaranjada, estilo vintage industrial.",
      },
      {
        title: "Motocicleta Custom",
        meta: "Veículo de Cena",
        desc: "Estilo bobber com ferrugem controlada, tanque preto fosco, escapamento cromado.",
      },
      {
        title: "Chave de Fenda Industrial",
        meta: "Prop de Cena",
        desc: "Cabo amarelo desgastado, ponta metálica arranhada, aparência de ferramenta usada em combate.",
      },
    ],
  },
];

export function PastasLab() {
  const [activeId, setActiveId] = useState("roteiro");
  const folder = FOLDERS.find((f) => f.id === activeId)!;

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-1">
        Laboratório: Simulador de Pastas do Projeto &amp; Moodboard
      </h3>
      <p className="text-sm text-zinc-500 mb-4">
        Clique em uma pasta para revisar as referências salvas a partir do roteiro decupado na Fase 1.
      </p>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-surface-card border border-white/10 rounded-xl p-3 space-y-1">
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold px-2 py-1">
            /PROJETO_FILME
          </div>
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                activeId === f.id
                  ? "border-lime bg-lime/10 text-lime"
                  : "border-transparent text-zinc-400 hover:bg-surface-card-elevated"
              }`}
            >
              <span className="truncate">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-surface-card border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4 text-lime">
            <span className="font-semibold text-white">
              /PROJETO_FILME/{folder.label}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {folder.cards.map((c) => (
              <div
                key={c.title}
                className="bg-surface-card-elevated border border-white/10 rounded-lg p-3"
              >
                <span className="text-sm font-medium text-zinc-200 block mb-1">
                  {c.title}
                </span>
                <span className="inline-block text-[10px] uppercase tracking-wider text-lime mb-1.5">
                  {c.meta}
                </span>
                <p className="text-xs text-zinc-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
