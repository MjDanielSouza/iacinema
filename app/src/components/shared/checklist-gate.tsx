"use client";

import { useState, useTransition, type ReactNode } from "react";
import type { ChecklistState } from "@/lib/supabase/database.types";

export function ChecklistGate({
  items,
  initialChecklist,
  initialCompleted,
  onSaveChecklist,
  onComplete,
  completeLabel = "Concluir fase",
  afterComplete,
}: {
  items: string[];
  initialChecklist: ChecklistState;
  initialCompleted: boolean;
  onSaveChecklist: (checklist: ChecklistState) => Promise<void>;
  onComplete: () => Promise<void>;
  completeLabel?: string;
  afterComplete?: ReactNode;
}) {
  const [checklist, setChecklist] = useState<ChecklistState>(initialChecklist);
  const [completed, setCompleted] = useState(initialCompleted);
  const [pending, startTransition] = useTransition();

  function toggle(i: number) {
    const next = [...checklist] as ChecklistState;
    next[i] = !next[i];
    setChecklist(next);
    startTransition(() => {
      onSaveChecklist(next);
    });
  }

  function complete() {
    startTransition(async () => {
      await onComplete();
      setCompleted(true);
    });
  }

  const allChecked = checklist.every(Boolean);

  return (
    <div className="bg-[#1b1b1f] border border-[#2a2a2f] rounded-xl p-5">
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
              className="mt-0.5 w-5 h-5 accent-amber-500 shrink-0"
            />
            <span className="text-sm text-zinc-300">{label}</span>
          </label>
        ))}
      </div>

      {!completed ? (
        <button
          onClick={complete}
          disabled={!allChecked || pending}
          className="mt-5 px-5 py-2.5 rounded-lg bg-amber-500 text-[#0a0a0c] font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          {pending ? "Salvando..." : completeLabel}
        </button>
      ) : (
        <div className="mt-5">{afterComplete}</div>
      )}
    </div>
  );
}
