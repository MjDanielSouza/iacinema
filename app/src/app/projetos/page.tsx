import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/shared/app-header";
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
    <>
      <AppHeader authed backHref="/dashboard" backLabel="Dashboard" />
      <main className="min-h-screen bg-[#050507] text-zinc-300 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-semibold text-2xl text-white mb-2">Meus Projetos</h1>
        <p className="text-sm text-zinc-500 mb-8">
          Aplique as 5 fases do pipeline em um filme de verdade.
        </p>

        {erro === "limite" && (
          <div className="mb-6 bg-red-950/40 border border-red-900 rounded-lg p-4 text-sm text-red-300">
            Você atingiu o limite de {limit} projeto(s) do seu plano.
          </div>
        )}

        <div className="bg-[#0D0E12] border border-white/10 rounded-xl p-5 mb-8">
          <h2 className="text-sm font-semibold text-white mb-3">Criar novo projeto</h2>
          <form action={createProject} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="name"
              placeholder='Ex.: "Filme B"'
              required
              disabled={atLimit}
              className="flex-1 bg-[#14151B] border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={atLimit}
              className="press px-5 py-2 rounded-full bg-amber-500 text-[#050507] font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 transition duration-150 ease-out"
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
              className="press flex items-center justify-between rounded-xl border border-white/10 bg-[#0D0E12] p-4 hover:border-[#D4FF00] transition duration-150 ease-out"
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
    </>
  );
}
