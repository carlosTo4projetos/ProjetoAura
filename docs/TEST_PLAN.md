# Plano de Testes - AURA

## Estratégia de Testes

### 1. Testes Estáticos (TypeScript & Linting)
- Verificação de tipos com `npx tsc --noEmit`.
- ESLint para garantir consistência e regras de código limpo.

### 2. Testes Unitários de Lógica
- `AdaptationEngine`: Validação de regras de progressão e regressão adaptativa de níveis (1 a 5).
- `TTSService`: Verificação de suporte a fala nativa.

### 3. Testes de Integração e RLS
- Verificação das políticas de RLS do Supabase garantindo isolamento por usuário.
