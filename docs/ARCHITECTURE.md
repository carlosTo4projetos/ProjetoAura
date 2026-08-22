# Architecture - AURA

## Visão Geral
Plataforma educacional adaptativa para estudantes do ensino médio técnico (TEA). O foco inicial é Administração.
A plataforma deve ter acessibilidade em primeiro lugar e priorizar a **menor sobrecarga visual possível** (Zoom global de 80%, UI minimalista).

## Stack Tecnológica Prevista
- **Frontend:** React + Vite + TypeScript.
- **Backend / DB / Auth:** Supabase (PostgreSQL, Supabase Auth, Row Level Security).
- **Estilos:** CSS Modules / Vanilla CSS (conforme regras específicas de cores).
- **IA:** Serviço de IA isolado (`PedagogicalAIService`).

## Estrutura do Monorepo
- `client/`: Aplicação frontend (Estudantes e Professores).
- `server/`: (Opcional se formos usar Supabase diretamente, mas pode abrigar lógicas de backend complexas e edge functions).

## Princípios (SOLID e Acessibilidade)
- Privacy e Accessibility by design.
- Adaptação pedagógica contínua no `AdaptationEngine`.
- Autenticação biométrica baseada em dispositivo (WebAuthn / Passkeys), sem reter biometria no BD.
