import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart3, Settings, ChevronRight } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useSubjects } from '../hooks/useCurriculum';
import { usePIA } from '../hooks/usePIA';
import { Card } from '../components/ui/Card';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { subjects, loading: loadingSubjects } = useSubjects();
  const { pia } = usePIA();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <>
      {/* Saudação */}
      <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px' }}>
          {greeting()}, {profile?.full_name?.split(' ')[0] || 'Estudante'}!
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--feedback)', fontWeight: 600 }}>
          O que vamos estudar hoje?
        </p>
      </div>

      {/* Cards de ação rápida */}
      <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '1000px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <Card className="fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={24} color="var(--button-action)" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>Meu Progresso</p>
              <p style={{ color: 'var(--feedback)', fontSize: '0.9rem' }}>Veja seu desempenho</p>
            </div>
          </div>
        </Card>

        <Card className="fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={24} color="var(--button-action)" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>Preferências</p>
              <p style={{ color: 'var(--feedback)', fontSize: '0.9rem' }}>
                Modo: {pia?.visual_mode === 'reduzido' ? 'Reduzido' : pia?.visual_mode === 'alto_contraste' ? 'Alto Contraste' : 'Padrão'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Disciplinas */}
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '20px', fontSize: '1.5rem' }}>
          <BookOpen size={22} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
          Disciplinas
        </h2>

        {loadingSubjects ? (
          <p style={{ color: 'var(--feedback)' }}>Carregando disciplinas...</p>
        ) : subjects.length === 0 ? (
          <Card>
            <p style={{ textAlign: 'center', color: 'var(--feedback)' }}>
              Nenhuma disciplina disponível ainda.
            </p>
          </Card>
        ) : (
          <div className="student-grid">
            {subjects.map((subject) => (
              <div 
                key={subject.id} 
                className="module-card fade-in"
                onClick={() => navigate(`/student/subject/${subject.id}`)}
              >
                <div className="module-icon">
                  <BookOpen size={36} />
                </div>
                <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{subject.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--feedback)', marginBottom: '15px' }}>
                  {subject.description || 'Módulo de Administração'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: 'var(--button-action)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>
                  Acessar <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Barra de progresso geral */}
      <div style={{ width: '100%', maxWidth: '1000px', marginTop: '40px' }}>
        <h3 style={{ marginBottom: '10px' }}>Progresso Geral</h3>
        <div className="visual-feedback">
          <div className="progress-bar" style={{ width: '0%' }}></div>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--feedback)', marginTop: '8px' }}>
          Comece uma disciplina para acompanhar seu progresso!
        </p>
      </div>
    </>
  );
};

export default StudentDashboard;
