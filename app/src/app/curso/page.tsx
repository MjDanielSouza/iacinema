import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PHASES } from "@/lib/phases";
import { AppHeader } from "@/components/shared/app-header";
import type { ChecklistState } from "@/lib/supabase/database.types";

export default async function CursoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let progressByPhase = new Map<number, { checklist: ChecklistState; completed: boolean }>();

  if (user) {
    const { data } = await supabase
      .from("course_phase_progress")
      .select("phase_number, checklist, completed_at")
      .eq("user_id", user.id);
    progressByPhase = new Map(
      (data ?? []).map((row) => [
        row.phase_number,
        { checklist: row.checklist, completed: !!row.completed_at },
      ]),
    );
  }

  const completedCount = [...progressByPhase.values()].filter((p) => p.completed).length;

  return (
    <>
      <AppHeader authed={!!user} backHref="/dashboard" backLabel="Dashboard" />
      <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
          Curso
        </p>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-2">
          Pipeline de Produção Cinematográfica com IA
        </h1>
        <p className="text-sm text-zinc-500 mb-6">
          Do roteiro à pós-produção, em 5 fases.
        </p>

        {user ? (
          <div className="mb-8 flex items-center gap-3">
            <div className="flex-1 h-2 bg-[#1b1b1f] rounded-full overflow-hidden border border-[#2a2a2f]">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-cyan-500 transition-all"
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-amber-400 shrink-0">
              {Math.round((completedCount / 5) * 100)}%
            </span>
          </div>
        ) : (
          <div className="mb-8 bg-[#141417] border border-[#2a2a2f] rounded-xl p-4 text-sm text-zinc-400">
            Você está vendo a{" "}
            <span className="text-amber-400 font-semibold">degustação</span> —
            a Fase 1 está liberada. Para acessar o curso completo e salvar seu
            progresso,{" "}
            <Link href="/login" className="text-cyan-400 underline">
              entre com sua conta
            </Link>
            .
          </div>
        )}

        <div className="space-y-3">
          {PHASES.map((phase) => {
            const progress = progressByPhase.get(phase.number);
            const locked = !user && phase.number > 1;
            return (
              <Link
                key={phase.number}
                href={locked ? "/login" : `/curso/${phase.number}`}
                className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                  locked
                    ? "border-[#2a2a2f] bg-[#141417] opacity-50"
                    : "border-[#2a2a2f] bg-[#141417] hover:border-cyan-700"
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border ${
                    progress?.completed
                      ? "bg-amber-500 border-amber-500 text-[#0a0a0c]"
                      : "border-[#2a2a2f] text-zinc-400"
                  }`}
                >
                  {progress?.completed ? "✓" : phase.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {phase.title}
                  </p>
                  <p className="text-xs text-zinc-500">{phase.subtitle}</p>
                </div>
                {locked && (
                  <span className="text-[11px] text-zinc-600 shrink-0">
                    entrar para liberar
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      </main>
    </>
  );
}
