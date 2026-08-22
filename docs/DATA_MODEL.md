# DATA MODEL - AURA

## Visão Geral
A base de dados é hospedada no Supabase/PostgreSQL, totalmente protegida por Row Level Security (RLS).

## Diagrama de Entidades

```
auth.users (Supabase gerencia)
    ↓ trigger: on_auth_user_created
profiles (id, role, full_name, email)
    ├── role: admin | teacher | student | parent
    ├── pia (1:1 com student)
    │     ├── preferências de apresentação (texto, imagem, áudio, vídeo)
    │     ├── características pedagógicas observadas (ritmo, tolerância, etc.)
    │     └── configurações de interface (visual_mode, animation_mode, font_size)
    ├── class_students (M:N com classes)
    ├── student_progress (N com modules)
    └── interactions (N com modules)

schools
    └── classes (N)
            └── class_students (M:N com profiles)

subjects (disciplinas)
    └── modules (N, ordernados por order_index)
            └── activities (N)
```

## Tabelas

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Extensão de `auth.users` com role e dados pessoais |
| `pia` | Perfil Individual de Aprendizagem do aluno (sem diagnóstico clínico) |
| `schools` | Escolas cadastradas |
| `classes` | Turmas por escola e ano |
| `class_students` | Relação M:N entre alunos e turmas |
| `subjects` | Disciplinas (domínio inicial: Administração) |
| `modules` | Módulos/unidades dentro de cada disciplina |
| `activities` | Atividades pedagógicas por módulo |
| `student_progress` | Progresso do aluno por módulo |
| `interactions` | Log de eventos de aprendizagem para análise |

## RLS - Políticas de Segurança

- Aluno: acessa somente os próprios dados (PIA, progresso, interações).
- Professor: acessa dados de todos os alunos (progresso, interações, PIAs).
- Admin: acesso total às tabelas.
- Sistema: pode criar PIAs automaticamente via trigger.

## Convenções
- IDs: UUID (uuid_generate_v4).
- Timestamps: timestamptz (com fuso horário).
- Scores: numeric(5,2).
- Preferências do PIA: numeric(3,2) de 0.0 a 1.0.
