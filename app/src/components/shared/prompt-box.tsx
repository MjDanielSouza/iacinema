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
    <div className="bg-surface-card border border-white/10 rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
          {label}
        </span>
        <button
          onClick={copy}
          className="press flex items-center gap-1 text-xs text-lime hover:text-lime-hover px-2 py-1 rounded border border-lime/50 hover:border-lime transition-colors duration-150"
        >
          {copied ? "Copiado ✓" : "Copiar"}
        </button>
      </div>
      <div className="bg-bg-base border border-white/10 rounded-lg p-3 text-xs text-lime leading-relaxed font-mono flex-1 whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}
