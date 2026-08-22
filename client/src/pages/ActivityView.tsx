import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, HelpCircle, Volume2, Sparkles } from 'lucide-react';
import { useActivities } from '../hooks/useCurriculum';
import { usePIA } from '../hooks/usePIA';
import { useAdaptation } from '../hooks/useAdaptation';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TTSService } from '../services/TTSService';
import { PedagogicalAIService } from '../services/PedagogicalAIService';

const ActivityView = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activities, loading } = useActivities(moduleId || null);
  const { pia } = usePIA();
  const { recommendation, processAnswer } = useAdaptation(moduleId || null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const currentActivity = activities[currentIndex];

  const handleAskAI = async () => {
    if (!currentActivity) return;
    setLoadingAI(true);
    const explanation = await PedagogicalAIService.explainConcept({
      concept: currentActivity.title || currentActivity.content?.pergunta,
      studentLevel: recommendation?.recommendedLevel || pia?.nivel_abstrato || 2,
      style: recommendation?.explanationTextStyle === 'simplificado' ? 'simplificado' : 'concreto'
    });
    setAiExplanation(explanation);
    setLoadingAI(false);
  };

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    setFeedback(null);
  };

  const handleCheckAnswer = async () => {
    if (selectedOption === null || !currentActivity) return;

    const isCorrect = selectedOption === currentActivity.content.resposta_correta;
    const text = isCorrect ? currentActivity.feedback_correct : currentActivity.feedback_incorrect;
    setFeedback({ isCorrect, text });

    // Atualiza o PIA e a matriz de adaptação via AdaptationEngine
    await processAnswer(isCorrect);

    // Registrar interação
    if (user && moduleId) {
      await supabase.from('interactions').insert({
        student_id: user.id,
        module_id: moduleId,
        event_type: 'activity_answered',
        score: isCorrect ? 100 : 0,
        complexity_applied: recommendation?.recommendedLevel || currentActivity.complexity_level,
        presentation_type: recommendation?.presentationStyle || 'padrao'
      });

      // Atualizar ou criar progresso do estudante
      await supabase.from('student_progress').upsert({
        student_id: user.id,
        module_id: moduleId,
        status: isCorrect && currentIndex === activities.length - 1 ? 'completed' : 'in_progress',
        score_avg: isCorrect ? 100 : 50,
        last_accessed_at: new Date().toISOString()
      }, { onConflict: 'student_id,module_id' });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setFeedback(null);
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/student');
    }
  };

  if (loading) {
    return <p style={{ color: 'var(--feedback)', textAlign: 'center' }}>Carregando atividade...</p>;
  }

  if (activities.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <Button onClick={() => navigate(-1)} variant="secondary" icon={<ArrowLeft size={18} />}>
          Voltar
        </Button>
        <Card style={{ marginTop: '20px' }}>
          <p style={{ textAlign: 'center', color: 'var(--feedback)' }}>
            Nenhuma atividade cadastrada para este módulo ainda.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Button 
        onClick={() => navigate(-1)} 
        variant="secondary"
        icon={<ArrowLeft size={18} />}
        style={{ marginBottom: '20px', padding: '8px 16px', fontSize: '0.95rem' }}
      >
        Voltar para Módulos
      </Button>

      {/* Progresso e Nível de Adaptação */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--feedback)', fontWeight: 600, margin: 0 }}>
          Atividade {currentIndex + 1} de {activities.length}
        </p>

        {recommendation && (
          <span style={{ 
            fontSize: '0.8rem', 
            color: 'var(--button-action)', 
            backgroundColor: 'var(--surface)', 
            padding: '4px 12px', 
            borderRadius: '15px', 
            fontWeight: 600,
            border: '1px solid var(--feedback)'
          }}>
            Nível Adaptado: {recommendation.recommendedLevel} ({recommendation.explanationTextStyle})
          </span>
        )}
      </div>

      <div className="visual-feedback" style={{ height: '10px', marginTop: 0, marginBottom: '20px' }}>
        <div className="progress-bar" style={{ width: `${((currentIndex + 1) / activities.length) * 100}%` }}></div>
      </div>

      {/* Card Principal da Atividade */}
      <Card className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
            {currentActivity?.content?.pergunta || currentActivity?.title}
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              variant="secondary" 
              onClick={handleAskAI}
              disabled={loadingAI}
              style={{ padding: '8px 12px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              icon={<Sparkles size={16} color="var(--button-action)" />}
            >
              {loadingAI ? 'Pensando...' : 'Explicar com IA'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => TTSService.speak(currentActivity?.content?.pergunta || currentActivity?.title || '')}
              style={{ padding: '8px 12px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              icon={<Volume2 size={16} />}
            >
              Ouvir
            </Button>
          </div>
        </div>

        {/* Caixa de Explicação Gerada pela IA Pedagógica */}
        {aiExplanation && (
          <div style={{ 
            backgroundColor: '#eef7fc', 
            borderLeft: '4px solid var(--button-action)', 
            padding: '16px 20px', 
            borderRadius: '15px', 
            marginBottom: '20px',
            fontSize: '1rem',
            color: 'var(--text-main)',
            lineHeight: 1.5
          }} className="fade-in">
            <p style={{ fontWeight: 700, margin: '0 0 6px 0', fontSize: '0.9rem', color: 'var(--button-action)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> IA Pedagógica AURA:
            </p>
            {aiExplanation}
          </div>
        )}

        {/* Opções de Escolha */}
        {currentActivity?.type === 'escolha' && currentActivity?.content?.opcoes && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
            {currentActivity.content.opcoes.map((opcao: string, idx: number) => {
              const isSelected = selectedOption === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: isSelected ? 'var(--button-action)' : 'var(--background)',
                    color: isSelected ? 'white' : 'var(--text-main)',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isSelected ? '2px solid var(--button-action)' : '2px solid transparent'
                  }}
                >
                  {opcao}
                </div>
              );
            })}
          </div>
        )}

        {/* Situação problema ou outro tipo */}
        {currentActivity?.type === 'situacao_problema' && (
          <div style={{ backgroundColor: 'var(--background)', padding: '20px', borderRadius: 'var(--border-radius)', marginBottom: '20px' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>Pontos chave para análise:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '10px', color: 'var(--text-main)' }}>
              {currentActivity.content.pontos_chave?.map((ponto: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{ponto}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Botão Responder */}
        {!feedback && selectedOption !== null && (
          <Button onClick={handleCheckAnswer} style={{ width: '100%', marginTop: '10px' }}>
            Verificar Resposta
          </Button>
        )}

        {/* Feedback visual inclusivo (respeitoso, sem infantilização) */}
        {feedback && (
          <div style={{ 
            marginTop: '20px', 
            padding: '20px', 
            borderRadius: 'var(--border-radius)',
            backgroundColor: feedback.isCorrect ? '#eaf6ed' : '#fdf3f2',
            borderLeft: `5px solid ${feedback.isCorrect ? '#27ae60' : '#e74c3c'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              {feedback.isCorrect ? (
                <CheckCircle2 size={24} color="#27ae60" />
              ) : (
                <HelpCircle size={24} color="#e74c3c" />
              )}
              <h4 style={{ margin: 0, color: feedback.isCorrect ? '#27ae60' : '#e74c3c', fontSize: '1.1rem' }}>
                {feedback.isCorrect ? 'Muito bem!' : 'Vamos refletir:'}
              </h4>
            </div>
            <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.5 }}>
              {feedback.text}
            </p>

            <Button onClick={handleNext} style={{ width: '100%', marginTop: '20px' }}>
              {currentIndex < activities.length - 1 ? 'Próxima Atividade' : 'Concluir Módulo'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ActivityView;
