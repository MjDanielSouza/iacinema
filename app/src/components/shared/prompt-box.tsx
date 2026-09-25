"use client";

import { useState } from "react";

export function PromptBox({
  text,
  label = "Prompt de Imagem",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ambiente sem permissão de clipboard — o usuário pode selecionar e copiar manualmente
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="bg-[#0D0E12] border border-white/10 rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
          {label}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 px-2 py-1 rounded border border-amber-900 transition-colors"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <div className="bg-[#050507] border border-white/10 rounded-lg p-3 text-xs text-[#D4FF00] leading-relaxed font-mono flex-1 whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}
