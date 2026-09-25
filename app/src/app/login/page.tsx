"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#141417] border border-[#2a2a2f] rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">
          Pipeline de Produção com IA
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          Entre para acessar o curso e seus projetos.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-[#2a2a2f] bg-[#1b1b1f] px-4 py-3 text-sm font-medium text-zinc-100 hover:border-[#06b6d4] transition-colors disabled:opacity-50"
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
    </main>
  );
}
