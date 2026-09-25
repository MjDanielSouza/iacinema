"use client";

import { useMemo, useState } from "react";
import { PromptBox } from "@/components/shared/prompt-box";
import { SCENES } from "./scenes-data";

type AssetTab = "personagem" | "set" | "prop";

const TABS: { id: AssetTab; label: string }[] = [
  { id: "personagem", label: "Character Sheet" },
  { id: "set", label: "Set / Cenário" },
  { id: "prop", label: "Artefato / Prop" },
];

export function AssetsLab() {
  const [sceneId, setSceneId] = useState<1 | 2 | 3>(1);
  const [tab, setTab] = useState<AssetTab>("personagem");
  const scene = SCENES.find((s) => s.id === sceneId)!;

  const { chips, prompt } = useMemo(() => {
    if (tab === "personagem") {
      return {
        chips: (
          <>
            <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
              Combinação de Raccord — {scene.name}
            </h4>
            <div className="space-y-2">
              <div className="bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg p-3">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 block mb-1">
                  Referência Base do Ator
                </span>
                <span className="text-sm text-zinc-300">{scene.actorBase}</span>
              </div>
              <div className="bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg p-3">
                <span className="text-[10px] uppercase tracking-wider text-cyan-400 block mb-1">
                  Figurino da Cena
                </span>
                <span className="text-sm text-zinc-300">{scene.figurino}</span>
              </div>
              <div className="bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg p-3">
                <span className="text-[10px] uppercase tracking-wider text-purple-300 block mb-1">
                  Acessório no Corpo
                </span>
                <span className="text-sm text-zinc-300">{scene.acessorio}</span>
              </div>
            </div>
            <span className="inline-block mt-3 text-xs text-zinc-500">
              ID do Asset:{" "}
              <code className="text-amber-400">
                Char_{scene.character}_Cena0{scene.id}
              </code>
            </span>
          </>
        ),
        prompt: `Character sheet, turnaround de corpo inteiro (frente, perfil, costas), fundo neutro cinza, iluminação de estúdio uniforme, personagem: ${scene.actorBase}, vestindo ${scene.figurino}, portando ${scene.acessorio}, identificação: Char_${scene.character}_Cena0${scene.id}, alta definição de tecido e textura de pele, consistência de raccord --ar 3:4`,
      };
    }
    if (tab === "set") {
      return {
        chips: (
          <>
            <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
              Set / Clean Plate — {scene.name}
            </h4>
            <div className="bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg p-3">
              <span className="text-[10px] uppercase tracking-wider text-cyan-400 block mb-1">
                {scene.setName}
              </span>
              <span className="text-sm text-zinc-300">{scene.setDesc}</span>
            </div>
            <span className="inline-block mt-3 text-xs text-zinc-500">
              Cenário vazio, sem personagens ou artefatos em cena.
            </span>
          </>
        ),
        prompt: `Clean plate cinematográfico, cenário vazio sem personagens, ${scene.setName}: ${scene.setDesc}, direção de arte consistente com o tom do filme, iluminação prática motivada, pronto para composição de atores em pós-produção, 8k, fotorrealista --ar 16:9`,
      };
    }
    return {
      chips: (
        <>
          <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
            Artefato Isolado — {scene.name}
          </h4>
          <div className="bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg p-3">
            <span className="text-[10px] uppercase tracking-wider text-purple-300 block mb-1">
              {scene.prop}
            </span>
            <span className="text-sm text-zinc-300">{scene.propDesc}</span>
          </div>
          <span className="inline-block mt-3 text-xs text-zinc-500">
            Referência de continuidade para Cena 0{scene.id}.
          </span>
        </>
      ),
      prompt: `Isolated product-style render de artefato de cena, ${scene.prop}: ${scene.propDesc}, fundo neutro para recorte, iluminação de estúdio em três pontos, altíssimo nível de detalhe e textura, referência de continuidade para Cena 0${scene.id} --ar 1:1`,
    };
  }, [tab, scene]);

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-1">
        Laboratório: Construtor de Assets e Raccord de Figurino
      </h3>
      <p className="text-sm text-zinc-500 mb-4">
        Selecione a cena e a aba de asset para montar o prompt automaticamente.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {SCENES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSceneId(s.id)}
            className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
              sceneId === s.id
                ? "border-amber-500 text-amber-400 bg-amber-500/10"
                : "border-[#2a2a2f] text-zinc-400 hover:border-zinc-500"
            }`}
          >
            Cena {String(s.id).padStart(2, "0")}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4 border-b border-[#2a2a2f]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? "border-cyan-500 text-cyan-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-4">
          {chips}
        </div>
        <PromptBox text={prompt} label="Prompt de Asset Gerado" />
      </div>
    </div>
  );
}
