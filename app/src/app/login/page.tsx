import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginCard } from "./login-card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; intent?: string }>;
}) {
  const { next, intent } = await searchParams;
  const safeNext = next && next.startsWith("/") ? next : "/dashboard";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(safeNext);
  }

  return (
    <main className="relative min-h-screen bg-[#050507] text-[#FAFAFA] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="atmosphere absolute inset-0" aria-hidden="true" />
      <Link
        href="/"
        className="relative z-10 font-tech text-[10px] uppercase tracking-widest text-muted hover:text-[#FAFAFA] transition-colors duration-100 mb-6 flex items-center gap-1.5"
      >
        &larr; Voltar para a página inicial
      </Link>
      <LoginCard next={safeNext} intent={intent} />
    </main>
  );
}
