# Changelog - AURA

## [1.0.0] - 2026-08-22

### Adicionado
- **Fase 0**: Auditoria inicial e documentação estrutural (`ROADMAP`, `ARCHITECTURE`, `DECISIONS`, `PHASE_STATUS`).
- **Fase 1**: Fundação de UI/UX com componentes acessíveis (`Button`, `Card`, `Header`, `MainLayout`).
- **Fase 2**: Integração com Supabase Auth e roteamento seguro com `ProtectedRoute`.
- **Fase 3**: Migrations de banco de dados com RLS ativado (`profiles`, `schools`, `classes`, `subjects`, `modules`, `pia`, `activities`, `student_progress`, `interactions`).
- **Fase 4**: Hooks de dados reativos (`usePIA`, `useProfile`, `useCurriculum`) e dashboard do estudante.
- **Fase 5**: Conteúdo pedagógico inicial do domínio de Administração (8 disciplinas, módulos e atividades).
- **Fase 6**: Motor de Adaptação (`AdaptationEngine`) para progressão e regressão adaptativa sem diagnósticos clínicos.
- **Fase 7**: Painel de Acessibilidade TEA (`AccessibilityToolbar`), modos visuais (Reduzido/Alto Contraste), ampliação de fontes e leitor nativo TTS.
- **Fase 8**: Serviço de IA Pedagógica (`PedagogicalAIService`) integrado ao Google Gemini com guardrails rígidos.
- **Fase 9**: Portal do Professor (`TeacherPortal`) conectado aos dados vivos do Supabase e métricas dos alunos.
- **Fases 10-14**: Testes de compilação, governança de segurança (`SECURITY`, `PRIVACY`, `TEST_PLAN`) e validação final do MVP.
