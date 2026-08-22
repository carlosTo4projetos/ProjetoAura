import type { PIA } from '../hooks/usePIA';
import { supabase } from '../lib/supabase';

export interface AdaptationRecommendation {
  recommendedLevel: number; // 1 (Concreto) a 5 (Acadêmico)
  presentationStyle: 'texto_curto' | 'imagem_destaque' | 'exemplo_primeiro' | 'padrao';
  suggestReview: boolean;
  explanationTextStyle: 'simplificado' | 'direto' | 'detalhado';
}

export class AdaptationEngine {
  /**
   * Avalia o perfil pedagógico (PIA) e o histórico de interações do aluno
   * para recomendar a melhor estratégia de apresentação de conteúdo.
   */
  static async getRecommendation(studentId: string, _moduleId: string, pia: PIA | null): Promise<AdaptationRecommendation> {
    // Buscar histórico recente de interações do aluno neste módulo ou disciplina
    const { data: history } = await supabase
      .from('interactions')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
      .limit(10);

    const attemptsCount = history?.length || 0;
    const errorsCount = history?.filter((h) => h.score === 0).length || 0;
    
    // Nível inicial baseado no PIA do estudante
    let level = pia?.nivel_abstrato || 2;
    let presentationStyle: AdaptationRecommendation['presentationStyle'] = 'padrao';
    let textStyle: AdaptationRecommendation['explanationTextStyle'] = 'direto';
    let suggestReview = false;

    // Regra pedagógica 1: Se erros > 50% das tentativas recentes, recuar o nível para mais concreto
    if (attemptsCount > 0 && errorsCount / attemptsCount >= 0.5) {
      level = Math.max(1, level - 1);
      presentationStyle = 'exemplo_primeiro';
      textStyle = 'simplificado';
      suggestReview = true;
    }

    // Regra pedagógica 2: Se o PIA indica preferência por imagens/exemplos
    if (pia?.preferencia_exemplos || (pia?.pref_imagem && pia.pref_imagem > 0.6)) {
      presentationStyle = 'exemplo_primeiro';
    }

    // Regra pedagógica 3: Tolerância a texto baixa -> texto curto e objetivo
    if (pia?.tolerancia_texto === 'baixa') {
      textStyle = 'simplificado';
    }

    return {
      recommendedLevel: level,
      presentationStyle,
      suggestReview,
      explanationTextStyle: textStyle,
    };
  }

  /**
   * Analisa a última interação e atualiza dinamicamente as probabilidades no PIA do aluno
   * sem atribuir rótulos clínicos ou diagnósticos.
   */
  static async updatePIAFromInteraction(studentId: string, isCorrect: boolean, currentPia: PIA | null) {
    if (!currentPia) return;

    let newPrefExemplos = currentPia.preferencia_exemplos;
    let newNivelAbstrato = currentPia.nivel_abstrato;

    if (!isCorrect) {
      // Se errou, aumentamos a chance de usar exemplos práticos e recuamos o nível de abstração gradualmente
      newPrefExemplos = true;
      newNivelAbstrato = Math.max(1, currentPia.nivel_abstrato - 1);
    } else {
      // Se acertou consistentemente, avançamos o nível de abstração gradualmente
      newNivelAbstrato = Math.min(5, currentPia.nivel_abstrato + 1);
    }

    // Atualiza apenas os campos observados no banco de dados
    await supabase
      .from('pia')
      .update({
        preferencia_exemplos: newPrefExemplos,
        nivel_abstrato: newNivelAbstrato,
        updated_at: new Date().toISOString(),
      })
      .eq('student_id', studentId);
  }
}
