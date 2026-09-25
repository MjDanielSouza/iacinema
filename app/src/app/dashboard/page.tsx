import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, plan")
    .eq("id", user.id)
    .maybeSingle();

  const isStaff = profile?.role === "admin" || profile?.role === "instrutor";

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            {avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt=""
                className="w-10 h-10 rounded-full border border-[#2a2a2f]"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className="text-xs text-zinc-500">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Link
            href="/curso"
            className="bg-[#141417] border border-[#2a2a2f] rounded-2xl p-6 hover:border-amber-600 transition-colors"
          >
            <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Curso
            </p>
            <h2 className="text-lg font-bold text-white mb-1">
              As 5 fases do pipeline
            </h2>
            <p className="text-sm text-zinc-500">
              Aprenda o processo, do roteiro à pós-produção.
            </p>
          </Link>

          <Link
            href="/projetos"
            className="bg-[#141417] border border-[#2a2a2f] rounded-2xl p-6 hover:border-cyan-600 transition-colors"
          >
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
              Projetos
            </p>
            <h2 className="text-lg font-bold text-white mb-1">Meus Projetos</h2>
            <p className="text-sm text-zinc-500">
              Aplique as 5 fases em um filme de verdade, com equipe.
            </p>
          </Link>
        </div>

        {isStaff && (
          <Link
            href="/admin"
            className="block bg-[#141417] border border-[#2a2a2f] rounded-2xl p-4 hover:border-purple-600 transition-colors text-center text-sm text-purple-300"
          >
            Ir para o Dashboard do Admin →
          </Link>
        )}
      </div>
    </main>
  );
}
