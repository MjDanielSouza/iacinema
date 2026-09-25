"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginCard({ next, intent }: { next: string; intent?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMigration = intent === "migrate_fase1";

  async function handleGoogleLogin() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}${
          isMigration ? "&intent=migrate_fase1" : ""
        }`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="glass glass-in relative z-10 w-full max-w-sm p-8 text-center">
      <p className="font-tech text-[10px] uppercase tracking-widest text-muted mb-4">
        [ACESSO // SYS v1.0]
      </p>
      <h1 className="font-display text-2xl text-title mb-1">
        Continue de onde parou.
      </h1>
      <p className="text-sm text-muted mb-6">
        Entre para acessar o curso e seus projetos.
      </p>

      {isMigration && (
        <div className="mb-6 border border-lime/30 bg-lime/[0.06] p-3 text-left">
          <p className="font-tech text-[10px] uppercase tracking-widest text-lime mb-1">
            [CHECKPOINT // FASE 01 CONCLUÍDA]
          </p>
          <p className="text-xs text-muted leading-relaxed">
            Sua decupagem da Fase 1 foi salva neste navegador. Assim que você
            entrar, ela é importada automaticamente para sua conta.
          </p>
        </div>
      )}

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="press w-full flex items-center justify-center gap-3 border border-line bg-bg-base px-4 py-3 font-tech text-xs uppercase tracking-wider text-title hover:border-lime/50 transition duration-150 ease-out disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.88c2.27-2.09 3.54-5.17 3.54-8.82z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3a7.4 7.4 0 0 1-4.05 1.15c-3.12 0-5.76-2.11-6.7-4.95H1.3v3.1A12 12 0 0 0 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.3a12 12 0 0 0 0 10.78z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.3 6.61l4 3.1c.94-2.84 3.58-4.96 6.7-4.96z"
          />
        </svg>
        {loading ? "Conectando..." : "Entrar com Google"}
      </button>

      {error && (
        <p className="mt-4 text-xs text-red-400">
          Não foi possível entrar: {error}
        </p>
      )}

      <p className="mt-8 text-[11px] text-zinc-600 leading-relaxed">
        Ao entrar, você concorda com o uso do seu e-mail e nome do Google
        para criar sua conta de aluno.
      </p>
    </div>
  );
}
