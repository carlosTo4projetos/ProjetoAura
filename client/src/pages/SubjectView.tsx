import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useModules, useStudentProgress } from '../hooks/useCurriculum';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const SubjectView = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { modules, loading } = useModules(subjectId || null);
  const { getProgressForModule } = useStudentProgress();

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <Button 
        onClick={() => navigate('/student')} 
        variant="secondary"
        icon={<ArrowLeft size={18} />}
        style={{ marginBottom: '20px', padding: '8px 16px', fontSize: '0.95rem' }}
      >
        Voltar para Disciplinas
      </Button>

      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>
        Módulos da Disciplina
      </h1>
      <p style={{ color: 'var(--feedback)', marginBottom: '30px', fontSize: '1.1rem' }}>
        Selecione um módulo abaixo para começar os estudos.
      </p>

      {loading ? (
        <p style={{ color: 'var(--feedback)' }}>Carregando módulos...</p>
      ) : modules.length === 0 ? (
        <Card>
          <p style={{ textAlign: 'center', color: 'var(--feedback)' }}>
            Nenhum módulo encontrado para esta disciplina.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {modules.map((mod, index) => {
            const prog = getProgressForModule(mod.id);
            const isCompleted = prog?.status === 'completed';

            return (
              <Card key={mod.id} className="fade-in">
                <div 
                  onClick={() => navigate(`/student/module/${mod.id}`)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ 
                      width: '45px', 
                      height: '45px', 
                      borderRadius: '50%', 
                      backgroundColor: isCompleted ? '#67a8cd' : 'var(--background)',
                      color: isCompleted ? 'white' : 'var(--button-action)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: '700'
                    }}>
                      {isCompleted ? <CheckCircle2 size={24} /> : index + 1}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>{mod.title}</h3>
                      <p style={{ margin: '4px 0 0', color: 'var(--feedback)', fontSize: '0.95rem' }}>
                        {mod.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={24} color="var(--button-action)" />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubjectView;
