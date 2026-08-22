# Diretrizes de Acessibilidade - AURA

## Filosofia
O AURA foi concebido para oferecer uma experiência educacional acessível para estudantes do ensino médio técnico, com foco em inclusão para pessoas no espectro autista (TEA níveis 1 e 2).

## Princípios de Design TEA
1. **Baixa Estimulação Visual**:
   - Evitar neon, flashes, animações aceleradas e cores opressivas.
   - Uso da paleta de cores azul oficial (#295872, #357599, #4292bf, #67a8cd, #8dbeda).
2. **Previsibilidade**:
   - Layout estático e consistente (`.predictable-layout`).
   - Posição fixa de botões principais e ações.
3. **Escala e Proporção**:
   - Zoom global fixado em 80% (`zoom: 0.8;` na tag `html`).
   - Cantos arredondados de 25px em cartões e botões para suavizar o design.
   - Tipografia legível (`Open Sans`).

## Recursos do Painel de Acessibilidade
| Recurso | Opções | Descrição |
|---------|--------|-----------|
| **Modo Visual** | Padrão / Reduzido / Alto Contraste | Reduz contraste ou aumenta nitidez conforme a necessidade sensorial |
| **Tamanho do Texto** | Normal / Ampliado | Ajusta o tamanho da fonte global sem quebrar o layout |
| **Animações** | Ativadas / Desativadas | Permite desativar transições para evitar sobrecarga sensorial |
| **Síntese de Voz (TTS)** | Botão "Ouvir" | Lê enunciados e conteúdos usando a API Web Speech nativa |

## Governança de Código
- As opções ativadas no painel são salvas diretamente no PIA do estudante no Supabase.
- A aplicação escuta as preferências e aplica as classes equivalentes no elemento raiz `<html>`.
