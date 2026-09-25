"use client";

import { useState } from "react";
import { PHASES } from "@/lib/phases";

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="font-tech text-[10px] uppercase tracking-wide px-1.5 py-0.5 border"
      style={{ color, borderColor: color }}
    >
      {children}
    </span>
  );
}

function Mockup01() {
  return (
    <div className="font-tech text-xs leading-relaxed">
      <p className="text-muted mb-3">[SC-01] &mdash; INT. CAFÉ - NOITE</p>
      <p className="text-[#F2EFE9]/90 mb-4">
        <Tag color="#EAB308">PERSONAGEM: ELENA</Tag> entra, sacode a chuva do{" "}
        <Tag color="#4ADE80">FIGURINO: TRENCH COAT BEGE</Tag>. A cena é banhada
        por <Tag color="#38BDF8">LUZ: TUNGSTÊNIO 3200K</Tag> vindo do balcão.
      </p>
      <div className="border-t border-line pt-3">
        <p className="text-muted uppercase text-[10px] tracking-wider mb-2">
          Lista de necessidades gerada
        </p>
        <ul className="space-y-1 text-[#F2EFE9]/80">
          <li>&gt; 1 personagem — Elena</li>
          <li>&gt; 1 figurino — trench coat bege</li>
          <li>&gt; 1 locação — café, período noturno</li>
        </ul>
      </div>
    </div>
  );
}

function Mockup02() {
  const swatches = ["#0c0c0b", "#3a2a1a", "#8e6a3a", "#c9a46a", "#e8d8b8"];
  return (
    <div className="font-tech text-xs">
      <div className="grid grid-cols-3 gap-px bg-line border border-line mb-4">
        {["ATMOSFERA", "PALETA CROMÁTICA", "ILUMINAÇÃO"].map((label) => (
          <div key={label} className="bg-[#0c0c0b] p-3">
            <p className="text-muted text-[10px] uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-muted uppercase text-[10px] tracking-wider mb-2">
        Paleta cromática da cena
      </p>
      <div className="flex gap-1 mb-4">
        {swatches.map((c) => (
          <div key={c} className="w-8 h-8 border border-line" style={{ background: c }} />
        ))}
      </div>
      <p className="text-[#F2EFE9]/80">
        &gt; 3 referências de arquitetura anexadas
        <br />
        &gt; 2 referências de iluminação anexadas
      </p>
    </div>
  );
}

function Mockup03() {
  return (
    <div className="font-tech text-xs">
      <div className="grid grid-cols-3 gap-px bg-line border border-line mb-4">
        {["FRONTAL", "PERFIL", "PLANO MÉDIO"].map((label) => (
          <div key={label} className="bg-[#0c0c0b] aspect-[3/4] flex items-end p-2">
            <p className="text-muted text-[10px] uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border border-line px-3 py-2">
        <span className="text-[#F2EFE9]/80">CHAR_SHEET_02 — ELENA</span>
        <Tag color="#EAB308">FIGURINO CENA 01: BLOQUEADO</Tag>
      </div>
    </div>
  );
}

function Mockup04() {
  return (
    <div className="font-tech text-xs">
      <div className="border border-line divide-y divide-line mb-4">
        <div className="grid grid-cols-4 gap-px px-3 py-2 text-muted text-[10px] uppercase tracking-wider">
          <span>Input</span>
          <span>Blocking</span>
          <span>Lente / Câmera</span>
          <span>Diálogo</span>
        </div>
        <div className="grid grid-cols-4 gap-px px-3 py-2 text-[#F2EFE9]/80">
          <span className="text-amber-400">CHAR_SHEET_02.PNG</span>
          <span>caminha até o balcão</span>
          <span>35mm — dolly in</span>
          <span>&quot;Já é tarde.&quot;</span>
        </div>
      </div>
      <p className="text-muted">
        [2.39:1] &middot; RACCORD: TRAVADO &middot; TC 01:04:22:10
      </p>
    </div>
  );
}

function Mockup05() {
  const tracks = [
    { label: "V1 — VÍDEO", w: "100%", color: "#EAB308" },
    { label: "A1 — DIÁLOGO", w: "70%", color: "#38BDF8" },
    { label: "A2 — AMBIENCE", w: "100%", color: "#4ADE80" },
    { label: "A3 — FOLEY", w: "40%", color: "#f472b6" },
    { label: "LUT — COLOR GRADING", w: "100%", color: "#8E8D8A" },
  ];
  return (
    <div className="font-tech text-xs">
      <div className="space-y-2 mb-3">
        {tracks.map((t) => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="w-32 shrink-0 text-muted text-[10px] uppercase tracking-wider">
              {t.label}
            </span>
            <div className="flex-1 h-4 border border-line">
              <div className="h-full" style={{ width: t.w, background: t.color, opacity: 0.5 }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-muted">TC 00:00:00:00 &rarr; 00:02:14:08</p>
    </div>
  );
}

const MOCKUPS = [Mockup01, Mockup02, Mockup03, Mockup04, Mockup05];

export function FasesInspector() {
  const [active, setActive] = useState(0);
  const phase = PHASES[active];
  const Mockup = MOCKUPS[active];

  return (
    <div className="grid md:grid-cols-12 border border-line">
      <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-line">
        {PHASES.map((p, i) => (
          <button
            key={p.number}
            onClick={() => setActive(i)}
            className={`w-full text-left flex items-center gap-4 px-5 min-h-[56px] py-3 border-b last:border-b-0 border-line transition-colors duration-100 ${
              active === i ? "bg-panel" : "hover:bg-panel/50"
            }`}
          >
            <span
              className={`font-tech text-xs shrink-0 ${
                active === i ? "text-amber-400" : "text-muted"
              }`}
            >
              {String(p.number).padStart(2, "0")}/05
            </span>
            <span className="min-w-0">
              <span
                className={`block text-sm font-medium truncate ${
                  active === i ? "text-[#F2EFE9]" : "text-[#F2EFE9]/70"
                }`}
              >
                {p.title}
              </span>
              <span className="block text-[11px] text-muted truncate">{p.subtitle}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="md:col-span-7 bg-[#141413] p-5 sm:p-8">
        <p className="font-tech text-[10px] uppercase tracking-widest text-amber-400 mb-4">
          [LAB {String(phase.number).padStart(2, "0")}] — PRÉVIA DE INTERFACE
        </p>
        <Mockup />
      </div>
    </div>
  );
}
