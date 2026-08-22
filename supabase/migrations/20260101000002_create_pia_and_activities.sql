-- =============================================
-- AURA - Migration 003: PIA e Motor de Adaptação
-- Perfil Individual de Aprendizagem (PIA)
-- Aplicar APÓS as migrations 001 e 002
-- =============================================

-- =============================================
-- PIA - Perfil Individual de Aprendizagem
-- =============================================
create table if not exists public.pia (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id) on delete cascade not null unique,
  
  -- Preferências de apresentação (0.0 a 1.0 = baixa a alta afinidade)
  pref_texto numeric(3,2) default 0.5,
  pref_imagem numeric(3,2) default 0.5,
  pref_audio numeric(3,2) default 0.5,
  pref_video numeric(3,2) default 0.5,
  
  -- Características de aprendizagem observadas (sem diagnóstico clínico)
  ritmo_leitura text default 'padrao',      -- lento, padrao, rapido
  tolerancia_texto text default 'media',    -- baixa, media, alta
  necessidade_repeticao boolean default false,
  preferencia_exemplos boolean default true,
  nivel_abstrato int default 2 check (nivel_abstrato between 1 and 5),
  
  -- Configurações de interface
  visual_mode text default 'padrao',        -- padrao, reduzido, alto_contraste
  animation_mode text default 'normal',     -- normal, reduzidas, desativadas
  audio_enabled boolean default true,
  font_size text default 'padrao',          -- padrao, ampliado
  
  -- Metadados
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pia enable row level security;

-- Aluno vê apenas o próprio PIA
create policy "pia: aluno lê o próprio"
  on public.pia for select
  using (student_id = auth.uid());

-- Aluno atualiza preferências de interface do próprio PIA
create policy "pia: aluno atualiza preferências"
  on public.pia for update
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

-- Professor e admin leem todos os PIAs
create policy "pia: professor e admin leem todos"
  on public.pia for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'teacher')
    )
  );

-- Sistema (service role) pode inserir e atualizar
create policy "pia: sistema pode inserir"
  on public.pia for insert
  with check (true);

-- Trigger updated_at
create trigger pia_updated_at
  before update on public.pia
  for each row execute procedure public.handle_updated_at();

-- =============================================
-- HISTÓRICO DE INTERAÇÕES DO ESTUDANTE
-- =============================================
create table if not exists public.interactions (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.modules(id) on delete cascade not null,
  
  -- O que aconteceu
  event_type text not null, -- started, completed, repeated, abandoned, activity_answered
  duration_seconds int,
  score numeric(5,2),        -- para atividades (0 a 100)
  
  -- Contexto de adaptação (snapshot dos níveis aplicados)
  complexity_applied int,
  presentation_type text,    -- texto, imagem, audio, video, misto
  
  created_at timestamptz not null default now()
);

create index if not exists interactions_student_idx on public.interactions(student_id);
create index if not exists interactions_module_idx on public.interactions(module_id);

alter table public.interactions enable row level security;

create policy "interactions: aluno registra as próprias"
  on public.interactions for insert
  with check (student_id = auth.uid());

create policy "interactions: aluno lê as próprias"
  on public.interactions for select
  using (student_id = auth.uid());

create policy "interactions: professor e admin leem todas"
  on public.interactions for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'teacher')
    )
  );

-- =============================================
-- ATIVIDADES
-- =============================================
create type activity_type as enum (
  'associacao', 'escolha', 'ordenacao', 'completar',
  'situacao_problema', 'classificacao', 'resposta_curta'
);

create table if not exists public.activities (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  type activity_type not null default 'escolha',
  content jsonb not null default '{}',   -- estrutura da atividade (pergunta, opções, resposta certa)
  feedback_correct text not null,
  feedback_incorrect text not null,
  complexity_level int not null default 1 check (complexity_level between 1 and 5),
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.activities enable row level security;

create policy "activities: todos autenticados leem"
  on public.activities for select
  using (auth.uid() is not null);

create policy "activities: admin e professor criam/editam"
  on public.activities for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'teacher')
    )
  );

-- =============================================
-- PROGRESSO DO ESTUDANTE POR MÓDULO
-- =============================================
create table if not exists public.student_progress (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.modules(id) on delete cascade not null,
  
  status text not null default 'not_started', -- not_started, in_progress, completed
  score_avg numeric(5,2) default 0,
  attempts int default 0,
  last_accessed_at timestamptz,
  completed_at timestamptz,
  
  unique (student_id, module_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_progress enable row level security;

create policy "progress: aluno lê o próprio"
  on public.student_progress for select
  using (student_id = auth.uid());

create policy "progress: aluno atualiza o próprio"
  on public.student_progress for all
  using (student_id = auth.uid());

create policy "progress: professor e admin leem todos"
  on public.student_progress for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'teacher')
    )
  );

create trigger student_progress_updated_at
  before update on public.student_progress
  for each row execute procedure public.handle_updated_at();
