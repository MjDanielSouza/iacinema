import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createProject } from "./actions";

export default async function ProjetosPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/projetos");

  const { data: profile } = await supabase
    .from("profiles")
    .select("project_limit")
    .eq("id", user.id)
    .single();

  const { data: memberships } = await supabase
    .from("project_members")
    .select("project_id")
    .eq("user_id", user.id);

  const projectIds = (memberships ?? []).map((m) => m.project_id);

  const { data: projects } = projectIds.length
    ? await supabase
        .from("projects")
        .select("id, name, owner_id, created_at")
        .in("id", projectIds)
        .order("created_at", { ascending: false })
    : { data: [] as { id: string; name: string; owner_id: string; created_at: string }[] };

  const ownedCount = (projects ?? []).filter((p) => p.owner_id === user.id).length;
  const limit = profile?.project_limit ?? 1;
  const atLimit = ownedCount >= limit;

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-white">Meus Projetos</h1>
          <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-zinc-300">
            ← Dashboard
          </Link>
        </div>
        <p className="text-sm text-zinc-500 mb-8">
          Aplique as 5 fases do pipeline em um filme de verdade.
        </p>

        {erro === "limite" && (
          <div className="mb-6 bg-red-950/40 border border-red-900 rounded-lg p-4 text-sm text-red-300">
            Você atingiu o limite de {limit} projeto(s) do seu plano.
          </div>
        )}

        <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-5 mb-8">
          <h2 className="text-sm font-semibold text-white mb-3">Criar novo projeto</h2>
          <form action={createProject} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="name"
              placeholder='Ex.: "Filme B"'
              required
              disabled={atLimit}
              className="flex-1 bg-[#1b1b1f] border border-[#2a2a2f] rounded-lg px-3 py-2 text-sm text-zinc-200 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={atLimit}
              className="px-5 py-2 rounded-lg bg-amber-500 text-[#0a0a0c] font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Criar projeto
            </button>
          </form>
          <p className="text-xs text-zinc-600 mt-2">
            {ownedCount} de {limit} projeto(s) usados no seu plano atual.
          </p>
        </div>

        <div className="space-y-3">
          {(projects ?? []).length === 0 && (
            <p className="text-sm text-zinc-600 text-center py-10">
              Você ainda não tem projetos. Crie o primeiro acima.
            </p>
          )}
          {(projects ?? []).map((p) => (
            <Link
              key={p.id}
              href={`/projetos/${p.id}`}
              className="flex items-center justify-between rounded-xl border border-[#2a2a2f] bg-[#141417] p-4 hover:border-cyan-700 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-zinc-500">
                  {p.owner_id === user.id ? "Dono" : "Colaborador"}
                </p>
              </div>
              <span className="text-xs text-zinc-600">→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
