import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
          Pipeline de Produção Cinematográfica com IA
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Do roteiro à pós-produção, em um só lugar
        </h1>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
          Aprenda o processo de produção audiovisual com IA em 5 fases, e
          aplique cada etapa em projetos reais — roteiro, referências,
          assets, direção de cena e finalização.
        </p>
        <Link
          href={user ? "/dashboard" : "/login"}
          className="inline-block px-6 py-3 rounded-lg bg-amber-500 text-[#0a0a0c] font-semibold text-sm hover:bg-amber-400 transition-colors"
        >
          {user ? "Ir para o Dashboard" : "Entrar"}
        </Link>
      </div>
    </main>
  );
}
