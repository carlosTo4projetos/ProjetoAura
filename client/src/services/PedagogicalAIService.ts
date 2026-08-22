import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey && apiKey !== 'sua_chave_do_gemini_aqui' ? new GoogleGenAI({ apiKey }) : null;

// System Instruction rígida para guardrails pedagógicos (SKILL_AURA.md)
const SYSTEM_INSTRUCTION = `
Você é a IA Pedagógica do sistema AURA, uma plataforma educacional para estudantes do ensino médio técnico (foco inicial: Administração).

REGRAS DE CONDUTA OBRIGATÓRIAS:
1. Sua função é EXCLUSIVAMENTE educacional e adaptativa (explicar conceitos, reformular exemplos, gerar exercícios práticos).
2. NUNCA faça diagnósticos clínicos, médicas ou declarações sobre o espectro autista (TEA), transtornos ou capacidades cognitivas do estudante.
3. Mantenha tom calmo, direto, respeitoso, claro e sem infantilização.
4. Evite parágrafos longos, jargões complexos desnecessários ou metáforas ambíguas.
5. Adapte a linguagem ao nível solicitado (Concreto → Conceito + Exemplo cotidiano).
`;

export interface AIEplanationRequest {
  concept: string;
  studentLevel?: number; // 1 a 5
  style?: 'concreto' | 'simplificado' | 'padrao';
}

export class PedagogicalAIService {
  /**
   * Reformula ou explica um conceito pedagógico adaptado ao perfil do estudante
   */
  static async explainConcept({ concept, studentLevel = 2, style = 'concreto' }: AIEplanationRequest): Promise<string> {
    if (!ai) {
      return `[IA Modo Demonstração] Exemplo prático de ${concept}: Imagine uma empresa onde cada funcionário tem uma tarefa clara. O objetivo é alcançar resultados juntos com organização e clareza.`;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Explique o conceito de "${concept}" em Administração para um estudante do ensino técnico. 
Nível de abstração: ${studentLevel} (de 1 a 5). 
Estilo: ${style}. 
Use no máximo 3 frases curtas e 1 exemplo prático do dia a dia.`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3, // Respostas mais determinísticas e estáveis
        }
      });

      return response.text || 'Não foi possível gerar a explicação no momento.';
    } catch (err) {
      console.error('Erro na IA Pedagógica:', err);
      return `Exemplo de ${concept}: No dia a dia, aplicar ${concept} ajuda a organizar tarefas e atingir metas com clareza.`;
    }
  }

  /**
   * Fornece um feedback pedagógico personalizado para uma resposta dada pelo aluno
   */
  static async getFeedback(question: string, studentAnswer: string, isCorrect: boolean): Promise<string> {
    if (!ai) {
      return isCorrect 
        ? 'Excelente raciocínio! Você identificou o ponto principal.'
        : 'Vamos analisar novamente. Tente focar no objetivo principal da questão.';
    }

    try {
      const prompt = isCorrect
        ? `O estudante ACERTOU a questão: "${question}". Dê um feedback curto (1-2 frases), incentivador e sem infantilizar.`
        : `O estudante respondeu "${studentAnswer}" para a questão: "${question}". Dê um feedback instrutivo, calmo e curto (1-2 frases) ajudando-o a refletir sobre a resposta certa sem julgamento.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
        }
      });

      return response.text || (isCorrect ? 'Muito bem!' : 'Vamos refletir sobre a questão.');
    } catch (err) {
      return isCorrect ? 'Excelente resposta!' : 'Revise os conceitos e tente novamente.';
    }
  }
}
