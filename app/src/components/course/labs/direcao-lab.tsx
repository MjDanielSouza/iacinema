"use client";

import { useMemo, useState } from "react";
import { PromptBox } from "@/components/shared/prompt-box";
import { SCENES } from "./scenes-data";

const CAMERA_OPTIONS = [
  { id: "dolly", label: "Dolly In lento", desc: "Dolly in lento e contínuo em direção ao personagem" },
  { id: "tracking", label: "Tracking lateral", desc: "Tracking shot lateral acompanhando o movimento do personagem" },
  { id: "static", label: "Plano Estático", desc: "Plano estático em câmera travada, composição centrada" },
  { id: "handheld", label: "Handheld nervoso", desc: "Handheld com leve tremor, sensação de urgência e tensão" },
  { id: "pan", label: "Panorâmica lenta", desc: "Panorâmica lenta da esquerda para a direita revelando o personagem" },
];

const ACTION_OPTIONS = [
  { id: "lanterna", label: "Levanta a lanterna e examina o ambiente", desc: "levanta a lanterna a querosene na altura dos olhos e examina lentamente o ambiente ao redor" },
  { id: "moto", label: "Acelera a motocicleta em fuga", desc: "monta na motocicleta e acelera bruscamente em direção à saída do beco" },
  { id: "chave", label: "Empunha a chave de fenda em posição defensiva", desc: "empunha a chave de fenda à frente do corpo em posição defensiva, pés firmes no chão" },
];

const SPEECH_OPTIONS = [
  { id: "sussurro", label: "Sussurrando com tensão", desc: "sussurrando com tensão contida, quase sem fôlego" },
  { id: "grito", label: "Gritando em desespero", desc: "gritando em tom de desespero, voz rouca e quebrada" },
  { id: "frieza", label: "Falando com frieza calculada", desc: "falando com frieza calculada, olhar fixo e tom baixo" },
];

export function DirecaoLab() {
  const [sceneId, setSceneId] = useState<1 | 2 | 3>(1);
  const [cameraId, setCameraId] = useState(CAMERA_OPTIONS[0].id);
  const [actionId, setActionId] = useState(ACTION_OPTIONS[0].id);
  const [speechId, setSpeechId] = useState(SPEECH_OPTIONS[0].id);

  const scene = SCENES.find((s) => s.id === sceneId)!;
  const camera = CAMERA_OPTIONS.find((o) => o.id === cameraId)!;
  const action = ACTION_OPTIONS.find((o) => o.id === actionId)!;
  const speech = SPEECH_OPTIONS.find((o) => o.id === speechId)!;

  const { wrongPrompt, correctPrompt } = useMemo(() => {
    const wrongPrompt = `Um(a) personagem ${scene.character}, vestindo ${scene.figurino}, dentro de ${scene.setName.toLowerCase()}: ${scene.setDesc}, segurando ${scene.prop.toLowerCase()}, ${action.desc}, dizendo a fala ${speech.desc}`;
    const correctPrompt = `${camera.desc}, enquadramento fechado no personagem, ${action.desc}, expressão facial tensa e concentrada, diálogo entregue ${speech.desc}, ritmo de corte pausado, iluminação motivada pela fonte de luz já estabelecida na cena`;
    return { wrongPrompt, correctPrompt };
  }, [scene, camera, action, speech]);

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-white mb-1">
        Laboratório: Mesa de Direção e Prompt de Vídeo
      </h3>
      <p className="text-sm text-zinc-500 mb-4">
        Os insumos visuais já estão travados. Dirija a cena escolhendo câmera, ação e intenção de fala.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {SCENES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSceneId(s.id)}
            className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
              sceneId === s.id
                ? "border-amber-500 text-amber-400 bg-amber-500/10"
                : "border-white/10 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            Cena {String(s.id).padStart(2, "0")}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div className="bg-[#0D0E12] border border-white/10 rounded-lg p-3">
          <div className="text-[10px] uppercase tracking-wider text-[#D4FF00] mb-1">
            Set (travado)
          </div>
          <span className="text-sm text-zinc-300 font-medium">{scene.setName}</span>
        </div>
        <div className="bg-[#0D0E12] border border-white/10 rounded-lg p-3">
          <div className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">
            Character Sheet (travado)
          </div>
          <span className="text-sm text-zinc-300 font-medium">
            {scene.character} — {scene.figurino.split(",")[0]}
          </span>
        </div>
        <div className="bg-[#0D0E12] border border-white/10 rounded-lg p-3">
          <div className="text-[10px] uppercase tracking-wider text-purple-300 mb-1">
            Artefato (travado)
          </div>
          <span className="text-sm text-zinc-300 font-medium">{scene.prop}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
            Movimento de Câmera
          </label>
          <select
            value={cameraId}
            onChange={(e) => setCameraId(e.target.value)}
            className="w-full bg-[#14151B] border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200"
          >
            {CAMERA_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
            Ação do Personagem
          </label>
          <select
            value={actionId}
            onChange={(e) => setActionId(e.target.value)}
            className="w-full bg-[#14151B] border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200"
          >
            {ACTION_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
            Intenção da Fala
          </label>
          <select
            value={speechId}
            onChange={(e) => setSpeechId(e.target.value)}
            className="w-full bg-[#14151B] border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200"
          >
            {SPEECH_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <PromptBox text={wrongPrompt} label="❌ Prompt Errado (Redundante)" />
        <PromptBox text={correctPrompt} label="✅ Prompt Técnico Correto" />
      </div>
    </div>
  );
}
