-- Pipeline de Produção com IA — esquema do banco (Supabase / Postgres)
--
-- Como aplicar: Supabase Dashboard → SQL Editor → cole este arquivo inteiro → Run.
-- Seguro rodar mais de uma vez (usa "if not exists" / "or replace" onde possível).

-- ============================================================
-- PROFILES — um perfil por usuário autenticado (espelha auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'aluno' check (role in ('visitante', 'aluno', 'instrutor', 'admin')),
  plan text not null default 'gratuito' check (plan in ('gratuito', 'assinante')),
  project_limit int not null default 1,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Cria o perfil automaticamente quando alguém se cadastra (ex.: via Google)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper usado nas policies abaixo, para checar se quem faz a request é admin/instrutor
create or replace function public.is_staff()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'instrutor')
  );
$$;

create policy "profiles: usuário vê o próprio perfil" on public.profiles
  for select using (auth.uid() = id or public.is_staff());

create policy "profiles: usuário edita o próprio perfil" on public.profiles
  for update using (auth.uid() = id);

-- ============================================================
-- CURSO — progresso do aluno nas 5 fases de treinamento
-- ============================================================
create table if not exists public.course_phase_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  phase_number int not null check (phase_number between 1 and 5),
  checklist jsonb not null default '[false, false, false]'::jsonb,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, phase_number)
);

alter table public.course_phase_progress enable row level security;

create policy "progresso do curso: dono ou staff" on public.course_phase_progress
  for select using (auth.uid() = user_id or public.is_staff());

create policy "progresso do curso: só o dono edita" on public.course_phase_progress
  for insert with check (auth.uid() = user_id);

create policy "progresso do curso: só o dono atualiza" on public.course_phase_progress
  for update using (auth.uid() = user_id);

-- ============================================================
-- PROJETOS — "Filme B", etc.
-- ============================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create table if not exists public.project_members (
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'editor' check (role in ('owner', 'editor', 'viewer')),
  added_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

alter table public.project_members enable row level security;

create or replace function public.is_project_member(p_project_id uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.project_members
    where project_id = p_project_id and user_id = auth.uid()
  );
$$;

create policy "projetos: membros e staff veem" on public.projects
  for select using (public.is_project_member(id) or public.is_staff());

create policy "projetos: dono cria" on public.projects
  for insert with check (auth.uid() = owner_id);

create policy "projetos: dono apaga" on public.projects
  for delete using (auth.uid() = owner_id);

create policy "membros: quem está no projeto vê os outros membros" on public.project_members
  for select using (public.is_project_member(project_id) or public.is_staff());

create policy "membros: dono do projeto adiciona" on public.project_members
  for insert with check (
    exists (select 1 from public.projects where id = project_id and owner_id = auth.uid())
  );

create policy "membros: dono do projeto remove" on public.project_members
  for delete using (
    exists (select 1 from public.projects where id = project_id and owner_id = auth.uid())
  );

-- Ao criar um projeto, o dono também vira membro (role owner) automaticamente
create or replace function public.handle_new_project()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.project_members (project_id, user_id, role)
  values (new.id, new.owner_id, 'owner')
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_project_created on public.projects;
create trigger on_project_created
  after insert on public.projects
  for each row execute function public.handle_new_project();

-- ============================================================
-- FASES DO PROJETO — roteiro, prompts e checklist por fase (1 a 5)
-- ============================================================
create table if not exists public.project_phases (
  project_id uuid not null references public.projects (id) on delete cascade,
  phase_number int not null check (phase_number between 1 and 5),
  script_text text,
  notes text,
  checklist jsonb not null default '[false, false, false]'::jsonb,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (project_id, phase_number)
);

alter table public.project_phases enable row level security;

create policy "fases do projeto: membros e staff veem" on public.project_phases
  for select using (public.is_project_member(project_id) or public.is_staff());

create policy "fases do projeto: membros editam (insert)" on public.project_phases
  for insert with check (public.is_project_member(project_id));

create policy "fases do projeto: membros editam (update)" on public.project_phases
  for update using (public.is_project_member(project_id));

-- ============================================================
-- ASSETS DO PROJETO — imagens de referência e prompts gerados, por fase
-- ============================================================
create table if not exists public.project_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  phase_number int not null check (phase_number between 1 and 5),
  kind text not null check (kind in ('image', 'prompt')),
  label text,
  storage_path text,
  prompt_text text,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

alter table public.project_assets enable row level security;

create policy "assets do projeto: membros e staff veem" on public.project_assets
  for select using (public.is_project_member(project_id) or public.is_staff());

create policy "assets do projeto: membros inserem" on public.project_assets
  for insert with check (public.is_project_member(project_id));

create policy "assets do projeto: membros apagam" on public.project_assets
  for delete using (public.is_project_member(project_id));

-- ============================================================
-- STORAGE — bucket para as imagens de referência enviadas nos projetos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('project-assets', 'project-assets', true)
on conflict (id) do nothing;

-- Caminho esperado dos arquivos: {project_id}/{phase_number}/{arquivo}
create policy "storage: membros do projeto enviam imagem"
  on storage.objects for insert
  with check (
    bucket_id = 'project-assets'
    and public.is_project_member((storage.foldername(name))[1]::uuid)
  );

create policy "storage: leitura pública (bucket público)"
  on storage.objects for select
  using (bucket_id = 'project-assets');

create policy "storage: membros do projeto apagam imagem"
  on storage.objects for delete
  using (
    bucket_id = 'project-assets'
    and public.is_project_member((storage.foldername(name))[1]::uuid)
  );
