-- =============================================
-- AURA - Migration 001: Profiles e Roles
-- Aplicar no SQL Editor do Supabase
-- =============================================

-- Habilitar UUID extension
create extension if not exists "uuid-ossp";

-- Enum de papéis
create type user_role as enum ('admin', 'teacher', 'student', 'parent');

-- Tabela de perfis vinculada ao auth.users
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role user_role not null default 'student',
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índices úteis
create index if not exists profiles_role_idx on public.profiles(role);

-- =============================================
-- FUNÇÃO AUXILIAR PARA RLS (Evitar Recursão Infinita)
-- =============================================
create or replace function public.get_user_role()
returns user_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

alter table public.profiles enable row level security;

-- Usuário vê apenas o próprio perfil
DROP POLICY IF EXISTS "profiles: usuário lê o próprio perfil" ON public.profiles;
create policy "profiles: usuário lê o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

-- Usuário atualiza apenas o próprio perfil
DROP POLICY IF EXISTS "profiles: usuário atualiza o próprio perfil" ON public.profiles;
create policy "profiles: usuário atualiza o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin vê todos os perfis
DROP POLICY IF EXISTS "profiles: admin lê todos" ON public.profiles;
create policy "profiles: admin lê todos"
  on public.profiles for select
  using (
    public.get_user_role() = 'admin'
  );

-- Professor vê alunos (sem restrição de turma aqui, afinaremos na Fase 4)
DROP POLICY IF EXISTS "profiles: professor lê alunos" ON public.profiles;
create policy "profiles: professor lê alunos"
  on public.profiles for select
  using (
    public.get_user_role() = 'teacher'
    and role = 'student'
  );

-- =============================================
-- TRIGGER: cria profile automaticamente
-- =============================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

-- Dropar se existir e recriar
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- FUNÇÃO: atualizar updated_at automaticamente
-- =============================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
