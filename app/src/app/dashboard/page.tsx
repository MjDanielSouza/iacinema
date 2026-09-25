import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/shared/app-header";
import { GuestImportBanner } from "@/components/course/guest-import-banner";

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
    <>
      <AppHeader authed userName={name} avatarUrl={avatarUrl} />
      <main className="min-h-screen bg-bg-base text-zinc-300 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-lime font-semibold mb-2">
            Dashboard
          </p>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-6">
            Olá, {name?.split(" ")[0] ?? "de novo"}.
          </h1>

          <GuestImportBanner />

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Link
              href="/curso"
              className="press rounded-2xl border border-white/10 p-7 bg-gradient-to-br from-lime/[0.06] to-transparent hover:border-lime/60 transition duration-150 ease-out"
            >
              <p className="text-xs uppercase tracking-widest text-lime font-semibold mb-3">
                Curso
              </p>
              <h2 className="font-display font-semibold text-xl text-white mb-2">
                As 5 fases do pipeline
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Aprenda o processo, do roteiro à pós-produção.
              </p>
            </Link>

            <Link
              href="/projetos"
              className="press rounded-2xl border border-white/10 p-7 bg-gradient-to-br from-lime/[0.06] to-transparent hover:border-lime/60 transition duration-150 ease-out"
            >
              <p className="text-xs uppercase tracking-widest text-lime font-semibold mb-3">
                Projetos
              </p>
              <h2 className="font-display font-semibold text-xl text-white mb-2">
                Meus Projetos
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Aplique as 5 fases em um filme de verdade, com equipe.
              </p>
            </Link>
          </div>

          {isStaff && (
            <Link
              href="/admin"
              className="press block rounded-2xl border border-white/10 p-4 hover:border-purple-600/60 transition duration-150 ease-out text-center text-sm text-purple-300"
            >
              Ir para o Dashboard do Admin →
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
