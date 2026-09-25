import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PermissionsRow } from "@/components/admin/permissions-row";
import { AppHeader } from "@/components/shared/app-header";
import type { Plan, Role } from "@/lib/supabase/database.types";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isStaff = myProfile?.role === "admin" || myProfile?.role === "instrutor";
  if (!isStaff) redirect("/dashboard");
  const isAdmin = myProfile?.role === "admin";

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, plan, project_limit, created_at")
    .order("created_at", { ascending: false });

  const { data: progressRows } = await supabase
    .from("course_phase_progress")
    .select("user_id, completed_at");

  const { data: projectCounts } = await supabase
    .from("projects")
    .select("owner_id");

  const completedByUser = new Map<string, number>();
  for (const row of progressRows ?? []) {
    if (row.completed_at) {
      completedByUser.set(row.user_id, (completedByUser.get(row.user_id) ?? 0) + 1);
    }
  }

  const projectsByUser = new Map<string, number>();
  for (const row of projectCounts ?? []) {
    projectsByUser.set(row.owner_id, (projectsByUser.get(row.owner_id) ?? 0) + 1);
  }

  const totalStudents = (profiles ?? []).length;
  const totalCompletedCourse = (profiles ?? []).filter(
    (p) => (completedByUser.get(p.id) ?? 0) === 5,
  ).length;

  return (
    <>
      <AppHeader authed backHref="/dashboard" backLabel="Dashboard" />
      <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-semibold text-2xl text-white mb-2">Dashboard do Admin</h1>
        <p className="text-sm text-zinc-500 mb-8">
          Alunos, progresso no curso e projetos criados.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{totalStudents}</p>
            <p className="text-xs text-zinc-500">Alunos</p>
          </div>
          <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{totalCompletedCourse}</p>
            <p className="text-xs text-zinc-500">Curso completo</p>
          </div>
          <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-cyan-400">
              {[...projectsByUser.values()].reduce((a, b) => a + b, 0)}
            </p>
            <p className="text-xs text-zinc-500">Projetos criados</p>
          </div>
        </div>

        <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-zinc-500 border-b border-[#2a2a2f]">
                <th className="px-4 py-3 font-semibold">Nome / E-mail</th>
                <th className="px-4 py-3 font-semibold">
                  {isAdmin ? "Papel / Plano / Limite" : "Papel / Plano"}
                </th>
                <th className="px-4 py-3 font-semibold">Curso</th>
                <th className="px-4 py-3 font-semibold">Projetos</th>
              </tr>
            </thead>
            <tbody>
              {(profiles ?? []).map((p) => {
                const completed = completedByUser.get(p.id) ?? 0;
                return (
                  <tr key={p.id} className="border-b border-[#1b1b1f] last:border-0">
                    <td className="px-4 py-3">
                      <p className="text-zinc-200">{p.full_name || "—"}</p>
                      <p className="text-xs text-zinc-500">{p.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      {isAdmin ? (
                        <PermissionsRow
                          userId={p.id}
                          initialRole={p.role as Role}
                          initialPlan={p.plan as Plan}
                          initialProjectLimit={p.project_limit}
                          isSelf={p.id === user.id}
                        />
                      ) : (
                        <span className="text-zinc-400">
                          {p.role} · {p.plan}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          completed === 5 ? "text-amber-400 font-semibold" : "text-zinc-400"
                        }
                      >
                        {completed}/5
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {projectsByUser.get(p.id) ?? 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {isAdmin ? (
          <p className="text-[11px] text-zinc-600 mt-4">
            Mudanças de papel, plano e limite de projetos entram em vigor na hora — não precisa de SQL.
          </p>
        ) : (
          <p className="text-[11px] text-zinc-600 mt-4">
            Só administradores podem alterar papel, plano e limite de projetos.
          </p>
        )}
      </div>
      </main>
    </>
  );
}
