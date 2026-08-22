# Diretrizes de Segurança - AURA

## Princípios de Segurança (OWASP)
1. **Row Level Security (RLS)**:
   - Todas as tabelas do PostgreSQL no Supabase possuem RLS habilitado obrigatoriamente.
   - Estudantes só conseguem visualizar e alterar seus próprios dados de progresso e perfil PIA.
   - Chaves privadas `service_role` jamais são expostas no código cliente.

2. **Gestão de Segredos**:
   - Credenciais mantidas estritamente no arquivo `.env`.
   - Nenhuma API key ou secret fixada no código-fonte.
   - `.env` incluído no `.gitignore`.

3. **Autenticação**:
   - Gerenciada pelo Supabase Auth.
   - Suporte à biometria do dispositivo (WebAuthn / Passkeys nativos do SO) sem retenção centralizada de templates biométricos.
