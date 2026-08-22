-- =============================================
-- AURA - Migration 002: Escola, Turmas, Disciplinas
-- Aplicar APÓS a migration 001
-- =============================================

-- =============================================
-- ESCOLAS
-- =============================================
create table if not exists public.schools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.schools enable row level security;

DROP POLICY IF EXISTS "schools: todos autenticados leem" ON public.schools;
create policy "schools: todos autenticados leem"
  on public.schools for select
  using (auth.uid() is not null);

DROP POLICY IF EXISTS "schools: somente admin cria/edita" ON public.schools;
create policy "schools: somente admin cria/edita"
  on public.schools for all
  using (
    public.get_user_role() = 'admin'
  );

-- =============================================
-- TURMAS
-- =============================================
create table if not exists public.classes (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references public.schools(id) on delete cascade not null,
  name text not null,
  year int not null default extract(year from now()),
  created_at timestamptz not null default now()
);

alter table public.classes enable row level security;

DROP POLICY IF EXISTS "classes: professor e admin leem" ON public.classes;
create policy "classes: professor e admin leem"
  on public.classes for select
  using (
    public.get_user_role() in ('admin', 'teacher')
  );

-- =============================================
-- ALUNOS POR TURMA
-- =============================================
create table if not exists public.class_students (
  class_id uuid references public.classes(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

alter table public.class_students enable row level security;

DROP POLICY IF EXISTS "class_students: aluno vê as próprias turmas" ON public.class_students;
create policy "class_students: aluno vê as próprias turmas"
  on public.class_students for select
  using (student_id = auth.uid());

DROP POLICY IF EXISTS "class_students: professor e admin veem todos" ON public.class_students;
create policy "class_students: professor e admin veem todos"
  on public.class_students for select
  using (
    public.get_user_role() in ('admin', 'teacher')
  );

-- =============================================
-- DISCIPLINAS
-- =============================================
create table if not exists public.subjects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  domain text not null default 'administracao',
  created_at timestamptz not null default now()
);

alter table public.subjects enable row level security;

DROP POLICY IF EXISTS "subjects: todos autenticados leem" ON public.subjects;
create policy "subjects: todos autenticados leem"
  on public.subjects for select
  using (auth.uid() is not null);

DROP POLICY IF EXISTS "subjects: admin e professor criam/editam" ON public.subjects;
create policy "subjects: admin e professor criam/editam"
  on public.subjects for all
  using (
    public.get_user_role() in ('admin', 'teacher')
  );

-- Seed de disciplinas iniciais (Administração)
insert into public.subjects (name, description, domain) values
  ('Fundamentos da Administração', 'Conceitos básicos e história da Administração', 'administracao'),
  ('Planejamento', 'Planejamento estratégico, tático e operacional', 'administracao'),
  ('Organização', 'Estruturas organizacionais e processos', 'administracao'),
  ('Direção', 'Liderança, motivação e comunicação', 'administracao'),
  ('Controle', 'Indicadores, métricas e avaliação de resultados', 'administracao'),
  ('Processos e Tarefas', 'Mapeamento e gestão de processos e atividades', 'administracao'),
  ('Gestão de Pessoas', 'Recrutamento, seleção e desenvolvimento de equipes', 'administracao'),
  ('Trabalho em Equipe', 'Dinâmicas de grupo, colaboração e papéis em equipe', 'administracao')
on conflict do nothing;

-- =============================================
-- MÓDULOS (subunidades de uma disciplina)
-- =============================================
create table if not exists public.modules (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid references public.subjects(id) on delete cascade not null,
  title text not null,
  description text,
  order_index int not null default 0,
  complexity_level int not null default 1 check (complexity_level between 1 and 5),
  created_at timestamptz not null default now()
);

alter table public.modules enable row level security;

DROP POLICY IF EXISTS "modules: todos autenticados leem" ON public.modules;
create policy "modules: todos autenticados leem"
  on public.modules for select
  using (auth.uid() is not null);

DROP POLICY IF EXISTS "modules: admin e professor criam/editam" ON public.modules;
create policy "modules: admin e professor criam/editam"
  on public.modules for all
  using (
    public.get_user_role() in ('admin', 'teacher')
  );
