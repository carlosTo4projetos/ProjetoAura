# Comportamento e Governança da IA - AURA

## Visão Geral
A IA no AURA atua exclusivamente como uma **camada pedagógica adaptativa** (`PedagogicalAIService`). Ela auxilia na explicação de conceitos, geração de exemplos cotidianos e apoio em feedbacks de atividades.

## Guardrails Rígidos (Limitações Éticas)

### O que a IA PODE fazer:
- Explicar conceitos em diferentes níveis de abstração (1 a 5).
- Gerar exemplos práticos do cotidiano para a área de Administração.
- Reformular enunciados longos em textos curtos e objetivos.
- Fornecer feedback pedagógico respeitoso e instrutivo.
- Recomendar revisões de módulos com base no histórico.

### O que a IA NUNCA PODE fazer:
- **Diagnosticar**: NUNCA emitir diagnósticos clínicos, laudos ou avaliações médicas.
- **Classificar**: NUNCA atribuir níveis de suporte clínicos (ex: "TEA nível 1").
- **Inferir emoção ou capacidade**: NUNCA interpretar dados de câmera ou biometria para inferir estado emocional, crise ou capacidade cognitiva.
- **Substituir profissionais**: NUNCA substituir a autoridade do professor ou de profissionais de saúde.

## Configuração do Modelo
- **Provedor**: Google Gemini (`@google/genai`).
- **Modelo**: `gemini-2.5-flash`.
- **Temperatura**: `0.3` (Garante respostas altamente estáveis, previsíveis e com baixíssima alucinação).
- **Variável de Ambiente**: `VITE_GEMINI_API_KEY`.
- **Fallback Seguro**: Se a chave de API não for configurada ou a chamada falhar, o serviço opera em modo de demonstração pedagógica segura sem interromper a experiência do estudante.
