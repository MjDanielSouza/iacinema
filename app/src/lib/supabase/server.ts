import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Ver nota em lib/supabase/client.ts sobre por que o generic `Database` não
// é usado aqui ainda.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado de um Server Component sem permissão de escrita de cookie.
            // O middleware cuida de manter a sessão atualizada nesse caso.
          }
        },
      },
    },
  );
}
