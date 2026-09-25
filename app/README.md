# Pipeline de Produção com IA — App

App Next.js que vai reunir o **Curso** (as 5 fases de produção) e **Meus Projetos**
(aplicar as 5 fases em projetos reais, com roteiro, imagens e prompts salvos).

Este diretório é a Etapa A do plano: esqueleto do app + login com Google via
Supabase. As próximas etapas vão migrar o conteúdo do curso e adicionar a
criação de projetos, equipes e o dashboard de instrutor.

## Configurar o Supabase (uma vez)

1. Crie uma conta e um projeto em [supabase.com](https://supabase.com/dashboard).
2. Em **Project Settings → API**, copie a **Project URL** e a chave **anon public**.
3. Nesta pasta (`app/`), copie `.env.local.example` para `.env.local` e cole os
   dois valores:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
   ```

## Configurar o login com Google

1. No [Google Cloud Console](https://console.cloud.google.com/apis/credentials),
   crie um **OAuth 2.0 Client ID** do tipo "Web application".
2. Em **Authorized redirect URIs**, adicione a URL de callback que o Supabase
   mostra em **Authentication → Providers → Google** do seu projeto (formato
   `https://SEU-PROJETO.supabase.co/auth/v1/callback`).
3. Copie o **Client ID** e o **Client Secret** gerados no Google.
4. No Supabase, em **Authentication → Providers → Google**, ative o provider e
   cole o Client ID e Client Secret.
5. Em **Authentication → URL Configuration**, defina:
   - **Site URL**: a URL final do app (ex.: `https://SEU-APP.vercel.app`)
   - **Redirect URLs**: adicione também `http://localhost:3000/auth/callback`
     para testar localmente.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`, clique em **Entrar**, depois **Entrar com Google**.

## Deploy (Vercel)

1. Em [vercel.com](https://vercel.com), importe este repositório do GitHub.
2. Defina o **Root Directory** do projeto Vercel como `app`.
3. Em **Environment Variables**, adicione `NEXT_PUBLIC_SUPABASE_URL` e
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` com os mesmos valores do `.env.local`.
4. Depois do primeiro deploy, volte no Supabase (**Authentication → URL
   Configuration**) e atualize a Site URL para o domínio gerado pela Vercel.

## Estrutura

- `src/app/page.tsx` — landing pública
- `src/app/login/page.tsx` — login com Google (Supabase Auth)
- `src/app/auth/callback/route.ts` — troca o código OAuth pela sessão
- `src/app/dashboard/page.tsx` — página protegida (exige login)
- `src/proxy.ts` — mantém a sessão atualizada e protege `/dashboard` (no
  Next.js 16 o arquivo de middleware foi renomeado para `proxy.ts`)
- `src/lib/supabase/` — clientes Supabase para browser, server e proxy
