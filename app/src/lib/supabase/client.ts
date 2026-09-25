import { createBrowserClient } from "@supabase/ssr";

// Nota: não usamos o generic `Database` aqui de propósito — os tipos escritos
// à mão em `database.types.ts` não seguem exatamente o formato que o
// supabase-js espera para inferência completa. Assim que o projeto Supabase
// existir, gere os tipos reais com `supabase gen types typescript` e troque
// para `createBrowserClient<Database>(...)`. Enquanto isso, os tipos de
// `database.types.ts` (Profile, Project, etc.) são usados manualmente onde
// fizer sentido.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
