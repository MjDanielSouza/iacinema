# Pipeline de Produção com IA — App

App Next.js que reúne o **Curso** (as 5 fases de produção) e **Meus Projetos**
(aplicar as 5 fases em projetos reais, com roteiro, imagens e prompts salvos),
atrás de login com Google.

Status: Etapas A–E prontas em código (login, curso, projetos, equipes,
dashboard do admin). Falta plugar credenciais reais de Supabase/Google e
fazer o deploy — veja os passos abaixo. Etapa F (assinatura/pagamento) ainda
não foi iniciada, porque depende de decisões de preço e provedor.

## Configurar o Supabase (uma vez)

1. Crie uma conta e um projeto em [supabase.com](https://supabase.com/dashboard).
2. Em **Project Settings → API**, copie a **Project URL** e a chave **anon public**.
3. Nesta pasta (`app/`), copie `.env.local.example` para `.env.local` e cole os
   dois valores:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
   ```
4. Em **SQL Editor**, cole o conteúdo de `supabase/schema.sql` inteiro e rode.
   Isso cria as tabelas (`profiles`, `course_phase_progress`, `projects`,
   `project_members`, `project_phases`, `project_assets`), as políticas de
   RLS e o bucket de Storage `project-assets` para as imagens.

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

## Tornar alguém admin ou instrutor

Todo mundo que faz login vira `aluno` por padrão (plano `gratuito`, limite de
1 projeto). Depois que existir ao menos um admin, ele mesmo edita papel,
plano e limite de projetos de qualquer pessoa direto em **`/admin`** — não
precisa mais de SQL para isso.

O primeiro admin, porém, precisa ser criado via **SQL Editor** do Supabase
(ninguém ainda tem permissão para usar a tela):

```sql
update public.profiles set role = 'admin' where email = 'seu@email.com';
```

## Deploy (Vercel)

1. Em [vercel.com](https://vercel.com), importe este repositório do GitHub.
2. Defina o **Root Directory** do projeto Vercel como `app`.
3. Em **Environment Variables**, adicione `NEXT_PUBLIC_SUPABASE_URL` e
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` com os mesmos valores do `.env.local`.
4. Depois do primeiro deploy, volte no Supabase (**Authentication → URL
   Configuration**) e atualize a Site URL para o domínio gerado pela Vercel.

## Estrutura

- `supabase/schema.sql` — todas as tabelas, RLS e o bucket de Storage
- `src/lib/phases.ts` — conteúdo compartilhado das 5 fases (título, teoria,
  prompt de imagem, itens do checklist), usado tanto pelo Curso quanto pelos
  Projetos
- `src/app/curso/` — listagem de fases + `/curso/[fase]`, com os laboratórios
  de demonstração fixos (decupador, pastas, assets, direção, timeline) em
  `src/components/course/labs/`; Fase 1 é livre, Fases 2–5 exigem login
- `src/app/projetos/` — `/projetos` (listar/criar, respeita
  `profiles.project_limit`), `/projetos/[id]` (progresso + equipe) e
  `/projetos/[id]/fase/[numero]` (roteiro editável na Fase 1; upload de
  imagem + prompts salvos nas Fases 2–5)
- `src/app/admin/` — dashboard restrito a `role in ('admin', 'instrutor')`:
  lista de alunos, progresso no curso e projetos criados
- `src/app/login/`, `src/app/auth/callback/`, `src/proxy.ts` — login com
  Google via Supabase Auth e proteção de rotas (no Next.js 16 o arquivo de
  middleware foi renomeado para `proxy.ts`)
- `src/lib/supabase/` — clientes Supabase para browser, server e proxy;
  `database.types.ts` tem tipos escritos à mão que espelham o schema —
  troque por `supabase gen types typescript` assim que o projeto existir

## O que falta (Etapa F)

Assinatura/pagamento (plano `assinante` em `profiles.plan`, limites maiores
de projeto, checkout). Falta decidir provedor (Stripe é o mais comum) e
preço antes de implementar.
