"use client";

import { useState } from "react";

export function PromptAssetItem({
  label,
  text,
  deleteAction,
}: {
  label: string | null;
  text: string;
  deleteAction: () => Promise<void>;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // sem permissão de clipboard neste navegador
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="bg-[#0d0d10] border border-[#2a2a2f] rounded-lg p-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-zinc-300">
          {label || "Prompt"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={copy}
            className="text-[11px] text-amber-400 hover:text-amber-300"
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
          <form action={deleteAction}>
            <button className="text-[11px] text-red-400 hover:text-red-300">
              remover
            </button>
          </form>
        </div>
      </div>
      <p className="text-xs text-cyan-300 font-mono leading-relaxed whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}
