"use client";

import { useState } from "react";
import { EditableTextarea } from "@/components/project/editable-textarea";
import { readGuestDraft, GUEST_DRAFT_KEY } from "@/lib/guest-storage";

export function GuestFase1Draft() {
  const [initial] = useState(() => readGuestDraft());
  const [resetKey, setResetKey] = useState(0);

  async function saveDraft(value: string) {
    try {
      localStorage.setItem(GUEST_DRAFT_KEY, value);
    } catch {
      // localStorage indisponível — segue sem persistir
    }
  }

  function clearDraft() {
    try {
      localStorage.setItem(GUEST_DRAFT_KEY, "");
    } catch {
      // localStorage indisponível — segue sem persistir
    }
    setResetKey((k) => k + 1);
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <p className="font-tech text-[10px] uppercase tracking-widest text-muted">
          Seu rascunho — vira o roteiro da Fase 1 do seu 1º projeto quando você criar conta
        </p>
        <button
          onClick={clearDraft}
          className="font-tech text-[10px] uppercase tracking-widest text-lime hover:text-lime-hover transition-colors duration-100 border border-lime/30 px-2 py-1"
        >
          [Limpar e Usar Meu Roteiro]
        </button>
      </div>
      <EditableTextarea
        key={resetKey}
        label="Seu roteiro (rascunho local)"
        placeholder="Cole aqui o seu roteiro..."
        initialValue={resetKey === 0 ? initial : ""}
        rows={12}
        onSave={saveDraft}
      />
    </div>
  );
}
