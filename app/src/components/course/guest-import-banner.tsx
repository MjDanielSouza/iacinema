"use client";

import { useEffect, useState, useTransition } from "react";
import { completeCoursePhase } from "@/app/curso/actions";
import { createProjectFromDraft } from "@/app/projetos/actions";
import {
  GUEST_DRAFT_PLACEHOLDER,
  clearGuestProgress,
  hasGuestProgress,
  readGuestDraft,
} from "@/lib/guest-storage";

export function GuestImportBanner() {
  const [visible, setVisible] = useState(false);
  const [draft, setDraft] = useState("");
  const [projectName, setProjectName] = useState("Meu Filme");
  const [pending, startTransition] = useTransition();
  const [imported, setImported] = useState(false);

  useEffect(() => {
    // Leitura única do localStorage (sistema externo ao React) logo após
    // montar no cliente — necessária porque o servidor não tem essa storage.
    if (hasGuestProgress()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      setDraft(readGuestDraft());
    }
  }, []);

  if (!visible) return null;

  const hasRealDraft = draft.trim() !== "" && draft.trim() !== GUEST_DRAFT_PLACEHOLDER.trim();

  function markCourseComplete() {
    startTransition(async () => {
      await completeCoursePhase(1);
      setImported(true);
    });
  }

  function dismiss() {
    clearGuestProgress();
    setVisible(false);
  }

  return (
    <div className="mb-8 glass p-5">
      <p className="font-tech text-[10px] uppercase tracking-widest text-lime mb-2">
        [IMPORTAR PROGRESSO DA FASE 01 // VISITANTE]
      </p>
      <p className="text-sm text-muted leading-relaxed mb-4">
        Encontramos uma decupagem salva neste navegador de antes de você
        entrar. Importe pra sua conta em um clique.
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={markCourseComplete}
          disabled={pending || imported}
          className="self-start font-tech text-xs uppercase tracking-wider px-4 py-2 border border-lime/40 text-lime hover:bg-lime/10 transition-colors duration-100 disabled:opacity-40"
        >
          {imported ? "Fase 1 marcada como concluída ✓" : "Marcar Fase 1 como concluída na minha conta"}
        </button>

        {hasRealDraft && (
          <form
            action={(formData) => {
              const name = String(formData.get("name") ?? projectName);
              startTransition(async () => {
                await createProjectFromDraft(name, draft);
              });
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              name="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder='Nome do projeto, ex.: "Filme B"'
              className="flex-1 bg-bg-base border border-white/10 px-3 py-2 text-sm text-zinc-200"
            />
            <button
              type="submit"
              disabled={pending}
              className="font-tech text-xs uppercase tracking-wider px-4 py-2 bg-lime text-on-accent hover:bg-lime-hover transition-colors duration-100 disabled:opacity-40"
            >
              Criar projeto com este roteiro
            </button>
          </form>
        )}

        <button
          onClick={dismiss}
          className="self-start font-tech text-[10px] uppercase tracking-widest text-muted hover:text-title transition-colors duration-100"
        >
          Dispensar
        </button>
      </div>
    </div>
  );
}
