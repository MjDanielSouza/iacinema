"use client";

import { useState, useTransition } from "react";
import type { Plan, Role } from "@/lib/supabase/database.types";
import { updateUserPermissions } from "@/app/admin/actions";

const ROLES: Role[] = ["visitante", "aluno", "instrutor", "admin"];
const PLANS: Plan[] = ["gratuito", "assinante"];

export function PermissionsRow({
  userId,
  initialRole,
  initialPlan,
  initialProjectLimit,
  isSelf,
}: {
  userId: string;
  initialRole: Role;
  initialPlan: Plan;
  initialProjectLimit: number;
  isSelf: boolean;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [projectLimit, setProjectLimit] = useState(initialProjectLimit);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [, startTransition] = useTransition();

  const dirty =
    role !== initialRole || plan !== initialPlan || projectLimit !== initialProjectLimit;

  function save() {
    setStatus("saving");
    startTransition(async () => {
      try {
        await updateUserPermissions(userId, { role, plan, project_limit: projectLimit });
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 1500);
      } catch {
        setStatus("error");
      }
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        disabled={isSelf}
        className="bg-[#1b1b1f] border border-[#2a2a2f] rounded px-2 py-1 text-xs text-zinc-200 disabled:opacity-50"
        title={isSelf ? "Você não pode alterar o próprio papel" : undefined}
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={plan}
        onChange={(e) => setPlan(e.target.value as Plan)}
        className="bg-[#1b1b1f] border border-[#2a2a2f] rounded px-2 py-1 text-xs text-zinc-200"
      >
        {PLANS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <input
        type="number"
        min={0}
        value={projectLimit}
        onChange={(e) => setProjectLimit(Number(e.target.value))}
        className="w-14 bg-[#1b1b1f] border border-[#2a2a2f] rounded px-2 py-1 text-xs text-zinc-200"
      />

      <button
        onClick={save}
        disabled={!dirty || status === "saving"}
        className="text-xs px-2 py-1 rounded bg-amber-500 text-[#0a0a0c] font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {status === "saving" ? "..." : "Salvar"}
      </button>

      {status === "saved" && <span className="text-[11px] text-amber-400">Salvo ✓</span>}
      {status === "error" && <span className="text-[11px] text-red-400">Erro</span>}
    </div>
  );
}
