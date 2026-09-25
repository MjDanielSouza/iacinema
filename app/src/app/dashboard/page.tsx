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

        <div className="bg-[#141417] border border-[#2a2a2f] rounded-2xl p-8 text-center">
          <h1 className="text-xl font-bold text-white mb-2">
            Login funcionando 🎬
          </h1>
          <p className="text-sm text-zinc-500 max-w-md mx-auto">
            Esta é a base do dashboard. As próximas etapas vão adicionar aqui
            o <span className="text-amber-400">Curso</span> (as 5 fases) e{" "}
            <span className="text-cyan-400">Meus Projetos</span> (criação de
            projetos como &ldquo;Filme B&rdquo; com roteiro, imagens e
            prompts por fase).
          </p>
        </div>
      </div>
    </main>
  );
}
