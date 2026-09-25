import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PHASES } from "@/lib/phases";
import { addProjectMember, removeProjectMember } from "@/app/projetos/actions";

export default async function ProjectOverviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erro?: string }>;
}) {
  const { id } = await params;
  const { erro } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/projetos/${id}`);

  const { data: project } = await supabase
    .from("projects")
    .select("id, name, owner_id, created_at")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();

  const isOwner = project.owner_id === user.id;

  const { data: members } = await supabase
    .from("project_members")
    .select("user_id, role, profiles:profiles(email, full_name)")
    .eq("project_id", id);

  const { data: phaseRows } = await supabase
    .from("project_phases")
    .select("phase_number, completed_at")
    .eq("project_id", id);

  const progressByPhase = new Map(
    (phaseRows ?? []).map((r) => [r.phase_number, !!r.completed_at]),
  );
  const completedCount = [...progressByPhase.values()].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/projetos" className="text-xs text-zinc-500 hover:text-zinc-300 mb-4 inline-block">
          ← Meus Projetos
        </Link>

        <h1 className="text-2xl font-bold text-white mb-1">{project.name}</h1>
        <p className="text-sm text-zinc-500 mb-6">
          Criado em {new Date(project.created_at).toLocaleDateString("pt-BR")}
        </p>

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

        <div className="space-y-3 mb-10">
          {PHASES.map((phase) => {
            const completed = progressByPhase.get(phase.number);
            return (
              <Link
                key={phase.number}
                href={`/projetos/${id}/fase/${phase.number}`}
                className="flex items-center gap-4 rounded-xl border border-[#2a2a2f] bg-[#141417] p-4 hover:border-cyan-700 transition-colors"
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border ${
                    completed
                      ? "bg-amber-500 border-amber-500 text-[#0a0a0c]"
                      : "border-[#2a2a2f] text-zinc-400"
                  }`}
                >
                  {completed ? "✓" : phase.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{phase.title}</p>
                  <p className="text-xs text-zinc-500">{phase.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Equipe</h2>

          {erro === "usuario_nao_encontrado" && (
            <div className="mb-4 bg-red-950/40 border border-red-900 rounded-lg p-3 text-xs text-red-300">
              Não encontramos ninguém com esse e-mail. A pessoa precisa ter
              entrado no app pelo menos uma vez antes de ser adicionada.
            </div>
          )}

          <ul className="space-y-2 mb-4">
            {(members ?? []).map((m) => {
              const memberProfile = Array.isArray(m.profiles) ? m.profiles[0] : m.profiles;
              return (
              <li
                key={m.user_id}
                className="flex items-center justify-between text-sm bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg px-3 py-2"
              >
                <span className="text-zinc-300">
                  {memberProfile?.full_name || memberProfile?.email}{" "}
                  <span className="text-zinc-600">— {m.role}</span>
                </span>
                {isOwner && m.role !== "owner" && (
                  <form action={removeProjectMember.bind(null, id, m.user_id)}>
                    <button className="text-xs text-red-400 hover:text-red-300">
                      remover
                    </button>
                  </form>
                )}
              </li>
              );
            })}
          </ul>

          {isOwner && (
            <form action={addProjectMember} className="flex gap-2">
              <input type="hidden" name="projectId" value={id} />
              <input
                type="email"
                name="email"
                placeholder="e-mail da pessoa (precisa já ter entrado no app)"
                required
                className="flex-1 bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg px-3 py-2 text-xs text-zinc-200"
              />
              <button className="px-4 py-2 rounded-lg border border-[#2a2a2f] text-xs text-zinc-300 hover:border-cyan-700">
                Adicionar
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
