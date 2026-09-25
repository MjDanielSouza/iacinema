"use client";

import { useEffect, useState, useTransition, type ReactNode } from "react";
import type { ChecklistState } from "@/lib/supabase/database.types";
import { CheckpointModal } from "./checkpoint-modal";
import { GUEST_CHECKLIST_KEY, GUEST_COMPLETED_KEY } from "@/lib/guest-storage";

type Props = {
  items: string[];
  initialChecklist: ChecklistState;
  initialCompleted: boolean;
  completeLabel?: string;
  afterComplete?: ReactNode;
} & (
  | {
      guestMode?: false;
      onSaveChecklist: (checklist: ChecklistState) => Promise<void>;
      onComplete: () => Promise<void>;
    }
  | {
      guestMode: true;
      onSaveChecklist?: never;
      onComplete?: never;
      checkpointLoginHref: string;
    }
);

export function ChecklistGate(props: Props) {
  const { items, initialChecklist, initialCompleted, completeLabel = "Concluir fase", afterComplete } = props;
  const [checklist, setChecklist] = useState<ChecklistState>(initialChecklist);
  const [completed, setCompleted] = useState(initialCompleted);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!props.guestMode) return;
    // Leitura única do localStorage (sistema externo ao React) logo após montar
    // no cliente — necessária porque o servidor não tem acesso a essa storage.
    try {
      const savedChecklist = localStorage.getItem(GUEST_CHECKLIST_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedChecklist) setChecklist(JSON.parse(savedChecklist));
      setCompleted(localStorage.getItem(GUEST_COMPLETED_KEY) === "true");
    } catch {
      // localStorage indisponível — segue com o estado inicial
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle(i: number) {
    const next = [...checklist] as ChecklistState;
    next[i] = !next[i];
    setChecklist(next);

    if (props.guestMode) {
      try {
        localStorage.setItem(GUEST_CHECKLIST_KEY, JSON.stringify(next));
      } catch {
        // localStorage indisponível — segue sem persistir
      }
      return;
    }
    startTransition(() => {
      props.onSaveChecklist(next);
    });
  }

  function complete() {
    if (props.guestMode) {
      try {
        localStorage.setItem(GUEST_COMPLETED_KEY, "true");
      } catch {
        // localStorage indisponível — segue sem persistir
      }
      setCompleted(true);
      setShowCheckpoint(true);
      return;
    }
    startTransition(async () => {
      await props.onComplete();
      setCompleted(true);
    });
  }

  const allChecked = checklist.every(Boolean);

  return (
    <div className="bg-surface-card-elevated border border-white/10 rounded-xl p-5">
      <h3 className="text-sm font-bold text-white mb-4">
        Checklist de Aprovação
      </h3>
      <div className="space-y-3">
        {items.map((label, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checklist[i]}
              onChange={() => toggle(i)}
              className="mt-0.5 w-5 h-5 accent-lime shrink-0"
            />
            <span className="text-sm text-zinc-300">{label}</span>
          </label>
        ))}
      </div>

      {!completed ? (
        <button
          onClick={complete}
          disabled={!allChecked || pending}
          className="press mt-5 px-5 py-2.5 rounded-full bg-lime text-on-accent font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-lime-hover"
        >
          {pending ? "Salvando..." : completeLabel}
        </button>
      ) : props.guestMode ? (
        <div className="mt-5 border border-lime/30 bg-lime/[0.06] rounded-lg p-4 text-sm text-title/90 flex items-center justify-between gap-4 flex-wrap">
          <span>Fase 1 concluída (salva neste navegador).</span>
          <button
            onClick={() => setShowCheckpoint(true)}
            className="text-xs font-semibold text-lime underline"
          >
            Salvar na nuvem e continuar →
          </button>
        </div>
      ) : (
        <div className="mt-5">{afterComplete}</div>
      )}

      {props.guestMode && showCheckpoint && (
        <CheckpointModal
          loginHref={props.checkpointLoginHref}
          onClose={() => setShowCheckpoint(false)}
        />
      )}
    </div>
  );
}
