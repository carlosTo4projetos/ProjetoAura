import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Activity, Maximize, BarChart2, User, BookOpen,
  BrainCircuit, Users, UserPlus, Pencil, Trash2,
  ClipboardList, X, Plus, Bell, Search, TrendingUp,
  CheckCircle, AlertTriangle, BookMarked
} from 'lucide-react';
import { useTeacherData } from '../hooks/useTeacherData';

// ─── Dados Simulados ─────────────────────────────────────────────────────────
const MOCK_STUDENTS = [
  { id: 1, name: 'João Silva', level: 'Nível 1', dob: '2010-03-15', engagement: 90, module: 'Leitura Compreensiva - Módulo 3' },
  { id: 2, name: 'Maria Souza', level: 'Nível 2', dob: '2011-07-22', engagement: 65, module: 'Interação Lógica - Módulo 2' },
  { id: 3, name: 'Pedro Alves', level: 'Nível 1', dob: '2009-11-08', engagement: 78, module: 'Matemática Básica - Módulo 1' },
];

const MOCK_EVALUATIONS: Record<number, { date: string; activity: string; score: string; insight: string }[]> = {
  1: [
    { date: '25/03/2025', activity: 'Quiz - Leitura', score: '9/10', insight: 'João apresentou pico de resposta motora. O sistema ajustou paletas para tons pastéis e desativou estímulos sonoros intensos.' },
    { date: '20/03/2025', activity: 'Módulo de Texto', score: '8/10', insight: 'Manter atividades curtas com pausas visuais de 5 min.' },
  ],
  2: [
    { date: '24/03/2025', activity: 'Quiz - Lógica', score: '6/10', insight: 'Maria completou os desafios mais rápido com gamificação parcelada ("Estrelas por passo"). Mantenha a consistência.' },
    { date: '18/03/2025', activity: 'Vídeo Educativo', score: '7/10', insight: 'Recomenda-se reduzir o volume sonoro nas próximas atividades.' },
  ],
  3: [
    { date: '23/03/2025', activity: 'Atividade Matemática', score: '7/10', insight: 'Pedro manteve foco durante toda a atividade. Elevar dificuldade gradualmente.' },
  ],
};

const BARS = [
  { label: 'Seg', val: 60 }, { label: 'Ter', val: 85 }, { label: 'Qua', val: 45 },
  { label: 'Qui', val: 90 }, { label: 'Sex', val: 72 }, { label: 'Sáb', val: 30 }, { label: 'Dom', val: 50 },
];

// ─── Estilos Compartilhados ───────────────────────────────────────────────────
type ActiveView = 'stats' | 'students' | 'profile' | 'disciplines' | 'reports';

const overlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, backgroundColor: 'rgba(12,30,48,0.6)',
  display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 200, padding: '20px',
};
const modalStyle: React.CSSProperties = {
  background: 'white', borderRadius: '24px', padding: '36px',
  width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto',
  boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
};
const inputSt: React.CSSProperties = {
  padding: '13px 18px', borderRadius: '12px', border: '1.5px solid #c5dae6',
  fontSize: '1rem', width: '100%', fontFamily: 'inherit', outline: 'none',
};

// ─── COMPONENTE ───────────────────────────────────────────────────────────────
const TeacherPortal = () => {
  const navigate = useNavigate();
  const { students: realStudents, subjectsCount, modulesCount, completedActivitiesCount } = useTeacherData();

  const [activeView, setActiveView] = useState<ActiveView>('stats');
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [evaluationOpen, setEvaluationOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);
  const [disciplineOpen, setDisciplineOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [reportFilters, setReportFilters] = useState({ aluno: '', disciplina: '', dataInicio: '', dataFim: '' });

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen?.();
  };

  const openEvaluation = (st: typeof MOCK_STUDENTS[0]) => {
    setSelectedStudent(st);
    setStudentListOpen(false);
    setEvaluationOpen(true);
  };

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    if (view === 'students') setStudentListOpen(true);
    if (view === 'disciplines') setDisciplineOpen(true);
    if (view === 'profile') setProfileOpen(true);
    if (view === 'reports') setReportsOpen(true);
  };

  // Sidebar nav items
  const NAV = [
    { id: 'stats' as ActiveView, icon: <BarChart2 size={20} />, label: 'Estatísticas' },
    { id: 'students' as ActiveView, icon: <Users size={20} />, label: 'Alunos' },
    { id: 'profile' as ActiveView, icon: <User size={20} />, label: 'Perfil' },
    { id: 'disciplines' as ActiveView, icon: <BookMarked size={20} />, label: 'Disciplinas' },
    { id: 'reports' as ActiveView, icon: <BrainCircuit size={20} />, label: 'Relatórios' },
  ];

  // KPI Cards
  const KPIS = [
    { label: 'Total de Alunos', value: String(realStudents.length || MOCK_STUDENTS.length).padStart(2, '0'), sub: 'Cadastrados no banco', icon: <Users size={22} />, color: '#4292bf' },
    { label: 'Módulos Ativos', value: String(modulesCount || 11).padStart(2, '0'), sub: `${subjectsCount || 8} disciplinas`, icon: <BookOpen size={22} />, color: '#295872' },
    { label: 'Atividades Concluídas', value: String(completedActivitiesCount || 14).padStart(2, '0'), sub: 'total do sistema', icon: <CheckCircle size={22} />, color: '#67a8cd' },
    { label: 'Alertas de IA', value: '02', sub: 'requerem atenção', icon: <AlertTriangle size={22} />, color: '#e07b3f' },
  ];

  return (
    <div style={{ display: 'flex', height: '125vh', overflow: 'hidden', fontFamily: "'Open Sans', sans-serif" }}>

      {/* ── SIDEBAR ESCURA ────────────────────────────────────────────────── */}
      <aside style={{
        width: '240px', height: '125vh', background: 'linear-gradient(180deg, #0d2137 0%, #1a3a55 100%)',
        display: 'flex', flexDirection: 'column', padding: '30px 20px', flexShrink: 0,
        boxShadow: '4px 0 30px rgba(0,0,0,0.2)', overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', paddingBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4292bf, #67a8cd)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={20} color="white" />
          </div>
          <span style={{ color: 'white', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            <span style={{ color: '#67a8cd' }}>AURA</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => handleNav(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px',
              borderRadius: '14px', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              background: activeView === n.id
                ? 'linear-gradient(90deg, #4292bf, #67a8cd)'
                : 'transparent',
              color: activeView === n.id ? 'white' : 'rgba(255,255,255,0.6)',
              fontWeight: activeView === n.id ? 700 : 500, fontSize: '0.95rem',
              boxShadow: activeView === n.id ? '0 4px 15px rgba(66,146,191,0.4)' : 'none',
            }}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>

        {/* Sair */}
        <button onClick={() => navigate('/')} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
          borderRadius: '14px', border: 'none', cursor: 'pointer',
          background: 'rgba(255,100,100,0.15)', color: '#ff8080', fontWeight: 700,
          fontSize: '0.95rem', transition: 'all 0.2s',
        }}>
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* ── ÁREA PRINCIPAL ────────────────────────────────────────────────── */}
      <div style={{ flex: 1, background: '#f0f5f8', display: 'flex', flexDirection: 'column', height: '125vh', overflow: 'hidden' }}>

        {/* HEADER */}
        <header style={{
          background: 'white', padding: '18px 40px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #e4edf3', boxShadow: '0 2px 15px rgba(0,0,0,0.04)',
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0d2137' }}>
              Olá, <span style={{ color: '#4292bf' }}>Prof. Admin</span> 👋
            </h1>
            <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#8a9eb0', fontWeight: 500 }}>
              Plataforma Educacional Inclusiva · TEA
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f0f5f8', borderRadius: '25px', padding: '10px 20px', border: '1.5px solid #e4edf3' }}>
              <Search size={16} color="#8a9eb0" />
              <input placeholder="Buscar aluno..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', color: '#0d2137', width: '140px' }} />
            </div>

            <button onClick={toggleFullScreen} style={{ background: '#f0f5f8', border: '1.5px solid #e4edf3', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Tela Cheia">
              <Maximize size={18} color="#4292bf" />
            </button>

            <div style={{ position: 'relative' }}>
              <Bell size={22} color="#8a9eb0" style={{ cursor: 'pointer' }} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#e07b3f', borderRadius: '50%' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(90deg, #eef6fb, #daedf8)', padding: '8px 16px', borderRadius: '25px', border: '1px solid #c5dae6' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #4292bf, #295872)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>P</div>
              <span style={{ fontWeight: 700, color: '#295872', fontSize: '0.9rem' }}>Prof. Admin</span>
            </div>
          </div>
        </header>

        {/* CONTEÚDO */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '35px 40px' }}>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#0d2137' }}>Visão de Produção Global</h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: '+ Aluno', icon: <Users size={16} />, action: () => setStudentListOpen(true) },
                { label: '+ Disciplina', icon: <BookOpen size={16} />, action: () => setDisciplineOpen(true) },
                { label: '+ Professor', icon: <UserPlus size={16} />, action: () => setTeacherOpen(true) },
              ].map(b => (
                <button key={b.label} onClick={b.action} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px',
                  borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 700,
                  fontSize: '0.9rem', background: 'linear-gradient(90deg, #4292bf, #295872)',
                  color: 'white', boxShadow: '0 4px 15px rgba(66,146,191,0.3)', transition: 'all 0.2s',
                }}>
                  {b.icon} {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* KPI CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            {KPIS.map(k => (
              <div key={k.label} style={{
                background: 'white', borderRadius: '20px', padding: '25px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                borderLeft: `4px solid ${k.color}`, display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ background: `${k.color}18`, padding: '10px', borderRadius: '12px', color: k.color }}>{k.icon}</div>
                  <TrendingUp size={16} color="#67a8cd" />
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0d2137', lineHeight: 1 }}>{k.value}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.95rem' }}>{k.label}</div>
                  <div style={{ color: '#8a9eb0', fontSize: '0.8rem', marginTop: '2px' }}>{k.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* GRÁFICO + ALUNOS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '25px', marginBottom: '25px', flexWrap: 'wrap' as any }}>

            {/* Gráfico de Barras */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#0d2137', fontWeight: 800, fontSize: '1.1rem' }}>Engajamento Semanal</h3>
                  <p style={{ margin: '3px 0 0', color: '#8a9eb0', fontSize: '0.82rem' }}>Média de produção por dia</p>
                </div>
                <span style={{ background: '#eef6fb', color: '#4292bf', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.82rem' }}>Esta semana</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '180px', gap: '12px', borderBottom: '2px solid #f0f5f8', paddingBottom: '0' }}>
                {BARS.map(b => (
                  <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4292bf' }}>{b.val}%</span>
                    <div style={{
                      width: '100%', height: `${b.val}%`,
                      background: b.val > 70 ? 'linear-gradient(180deg, #4292bf, #295872)' : 'linear-gradient(180deg, #8dbeda, #67a8cd)',
                      borderRadius: '8px 8px 0 0', boxShadow: b.val > 70 ? '0 -4px 12px rgba(66,146,191,0.3)' : 'none',
                      transition: 'height 0.5s ease',
                    }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', paddingTop: '10px' }}>
                {BARS.map(b => (
                  <div key={b.label} style={{ flex: 1, textAlign: 'center', fontSize: '0.78rem', color: '#8a9eb0', fontWeight: 600 }}>{b.label}</div>
                ))}
              </div>
            </div>

            {/* Painel de Alunos */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#0d2137', fontWeight: 800, fontSize: '1.1rem' }}>Alunos</h3>
                <button onClick={() => setStudentListOpen(true)} style={{ background: '#eef6fb', border: 'none', borderRadius: '20px', padding: '6px 14px', color: '#4292bf', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                  Ver todos
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                {MOCK_STUDENTS.map(s => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', borderRadius: '16px', background: '#f7fbff', border: '1px solid #e4edf3' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #4292bf, #295872)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>
                      {s.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: '#0d2137', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#8a9eb0' }}>{s.level}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, color: '#4292bf', fontSize: '1rem' }}>{s.engagement}%</div>
                      <div style={{ width: '60px', height: '4px', background: '#e4edf3', borderRadius: '4px', marginTop: '4px' }}>
                        <div style={{ width: `${s.engagement}%`, height: '100%', background: s.engagement > 70 ? '#4292bf' : '#67a8cd', borderRadius: '4px' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ALUNOS TABLE / PROJETOS */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontWeight: 800, color: '#0d2137', fontSize: '1.1rem' }}>Módulos em Andamento</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', gap: '0', fontWeight: 700, color: '#8a9eb0', fontSize: '0.82rem', borderBottom: '2px solid #f0f5f8', paddingBottom: '12px', marginBottom: '12px' }}>
              <span>Aluno</span><span>Módulo Atual</span><span>Engajamento</span><span>Status</span>
            </div>
            {MOCK_STUDENTS.map(s => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', gap: '0', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f5f8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #4292bf, #295872)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>{s.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0d2137', fontSize: '0.9rem' }}>{s.name}</div>
                    <div style={{ color: '#8a9eb0', fontSize: '0.77rem' }}>{s.level}</div>
                  </div>
                </div>
                <div style={{ color: '#3a5570', fontSize: '0.88rem' }}>{s.module}</div>
                <div style={{ fontWeight: 800, color: '#4292bf' }}>{s.engagement}%</div>
                <span style={{
                  background: s.engagement > 70 ? '#e8f8ef' : '#fff3e8',
                  color: s.engagement > 70 ? '#2ecc71' : '#e07b3f',
                  padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-block',
                }}>
                  {s.engagement > 70 ? 'Ótimo' : 'Atenção'}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══════════════ MODAIS ══════════════ */}

      {/* Lista de Alunos */}
      {studentListOpen && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setStudentListOpen(false)}>
          <div style={modalStyle} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f5f8', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users size={24} color="#4292bf" />
                <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#0d2137' }}>Alunos Cadastrados</h2>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={() => { setAddStudentOpen(true); setStudentListOpen(false); }} style={{ background: 'linear-gradient(90deg, #4292bf, #295872)', color: 'white', border: 'none', borderRadius: '20px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 12px rgba(66,146,191,0.3)' }}>
                  <Plus size={16} /> Cadastrar
                </button>
                <button onClick={() => setStudentListOpen(false)} style={{ border: 'none', background: '#f0f5f8', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><X size={20} color="#8a9eb0" /></button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_STUDENTS.map(s => (
                <div key={s.id} style={{ background: '#f7fbff', borderRadius: '18px', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e4edf3', gap: '15px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #4292bf, #295872)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>{s.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0d2137', fontSize: '1rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.82rem', color: '#8a9eb0' }}>{s.level} · {s.engagement}% engajamento</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEvaluation(s)} style={{ background: '#eef6fb', color: '#4292bf', border: '1px solid #c5dae6', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                      <ClipboardList size={15} /> Avaliação
                    </button>
                    <button style={{ background: 'transparent', border: '1px solid #e4edf3', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: '#3a5570', fontWeight: 600 }}>
                      <Pencil size={14} /> Editar
                    </button>
                    <button style={{ background: 'transparent', border: '1px solid #ffe4e4', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: '#e05656', fontWeight: 600 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cadastrar Aluno */}
      {addStudentOpen && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setAddStudentOpen(false)}>
          <div style={modalStyle} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#0d2137' }}>Cadastrar Novo Aluno</h2>
              <button onClick={() => setAddStudentOpen(false)} style={{ border: 'none', background: '#f0f5f8', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><X size={20} color="#8a9eb0" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Nome Completo do Aluno" style={inputSt} />
              <input type="date" style={inputSt} />
              <select style={inputSt}>
                <option value="">Selecione o Nível TEA</option>
                <option value="1">Nível 1 (Suporte Leve)</option>
                <option value="2">Nível 2 (Suporte Substancial)</option>
              </select>
              <button style={{ background: '#f0f8ff', border: '2px dashed #67a8cd', borderRadius: '14px', padding: '16px', cursor: 'pointer', fontWeight: 700, color: '#4292bf', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                📸 Capturar Biometria Facial
              </button>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => { setAddStudentOpen(false); setStudentListOpen(true); }} style={{ background: '#f0f5f8', color: '#3a5570', border: 'none', borderRadius: '14px', padding: '12px 24px', cursor: 'pointer', fontWeight: 700 }}>Cancelar</button>
                <button onClick={() => setAddStudentOpen(false)} style={{ background: 'linear-gradient(90deg, #4292bf, #295872)', color: 'white', border: 'none', borderRadius: '14px', padding: '12px 24px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 12px rgba(66,146,191,0.3)' }}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avaliações */}
      {evaluationOpen && selectedStudent && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setEvaluationOpen(false)}>
          <div style={{ ...modalStyle, maxWidth: '750px' }} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f5f8', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #4292bf, #295872)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>{selectedStudent.name.charAt(0)}</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0d2137' }}>{selectedStudent.name}</h2>
                  <span style={{ fontSize: '0.85rem', color: '#8a9eb0', fontWeight: 600 }}>{selectedStudent.level} · {selectedStudent.engagement}% engajamento</span>
                </div>
              </div>
              <button onClick={() => setEvaluationOpen(false)} style={{ border: 'none', background: '#f0f5f8', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><X size={20} color="#8a9eb0" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(MOCK_EVALUATIONS[selectedStudent.id] || []).map((ev, i) => (
                <div key={i} style={{ background: '#f7fbff', borderRadius: '18px', padding: '22px', border: '1px solid #e4edf3' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <User size={20} color="#4292bf" />
                      <strong style={{ color: '#0d2137', fontSize: '1rem' }}>{ev.activity}</strong>
                    </div>
                    <span style={{ background: 'linear-gradient(90deg, #4292bf, #295872)', color: 'white', padding: '5px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem' }}>{ev.score}</span>
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#8a9eb0' }}>📅 {ev.date}</p>
                  <div style={{ background: '#eef6fb', borderRadius: '14px', padding: '16px', display: 'flex', gap: '12px', borderLeft: '4px solid #4292bf' }}>
                    <BrainCircuit size={20} color="#295872" style={{ flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#3a5570', lineHeight: 1.5 }}>{ev.insight}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => { setEvaluationOpen(false); setStudentListOpen(true); }} style={{ background: '#f0f5f8', color: '#3a5570', border: 'none', borderRadius: '20px', padding: '10px 24px', cursor: 'pointer', fontWeight: 700 }}>← Voltar</button>
            </div>
          </div>
        </div>
      )}

      {/* Disciplina */}
      {disciplineOpen && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setDisciplineOpen(false)}>
          <div style={modalStyle} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#0d2137' }}>Cadastrar Disciplina</h2>
              <button onClick={() => setDisciplineOpen(false)} style={{ border: 'none', background: '#f0f5f8', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><X size={20} color="#8a9eb0" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Nome da Disciplina" style={inputSt} />
              <textarea placeholder="Descrição..." style={{ ...inputSt, minHeight: '90px' }} />
              {[['modTexto', 'Módulos de Texto Curto'], ['modVideo', 'Vídeos Acústicos (Baixo Estímulo)'], ['modQuiz', 'Quiz Gamificado IA']].map(([id, label]) => (
                <label key={id} htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: 600, color: '#3a5570' }}>
                  <input type="checkbox" id={id} style={{ width: '20px', height: '20px', accentColor: '#4292bf', cursor: 'pointer' }} /> {label}
                </label>
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => setDisciplineOpen(false)} style={{ background: '#f0f5f8', color: '#3a5570', border: 'none', borderRadius: '14px', padding: '12px 24px', cursor: 'pointer', fontWeight: 700 }}>Cancelar</button>
                <button onClick={() => setDisciplineOpen(false)} style={{ background: 'linear-gradient(90deg, #4292bf, #295872)', color: 'white', border: 'none', borderRadius: '14px', padding: '12px 24px', cursor: 'pointer', fontWeight: 700 }}>Criar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professor */}
      {teacherOpen && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setTeacherOpen(false)}>
          <div style={modalStyle} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#0d2137' }}>Cadastrar Professor</h2>
              <button onClick={() => setTeacherOpen(false)} style={{ border: 'none', background: '#f0f5f8', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><X size={20} color="#8a9eb0" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Nome Completo" style={inputSt} />
              <input type="email" placeholder="E-mail Institucional" style={inputSt} />
              <input type="password" placeholder="Senha de Acesso" style={inputSt} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => setTeacherOpen(false)} style={{ background: '#f0f5f8', color: '#3a5570', border: 'none', borderRadius: '14px', padding: '12px 24px', cursor: 'pointer', fontWeight: 700 }}>Cancelar</button>
                <button onClick={() => setTeacherOpen(false)} style={{ background: 'linear-gradient(90deg, #4292bf, #295872)', color: 'white', border: 'none', borderRadius: '14px', padding: '12px 24px', cursor: 'pointer', fontWeight: 700 }}>Ativar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: PERFIL DO PROFESSOR ── */}
      {profileOpen && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setProfileOpen(false)}>
          <div style={{ ...modalStyle, maxWidth: '480px', padding: '28px', overflowY: 'visible' }} className="fade-in">

            {/* Cabeçalho */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #f0f5f8', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={20} color="#4292bf" />
                <h2 style={{ margin: 0, color: '#0d2137', fontSize: '1.2rem' }}>Perfil do Professor</h2>
              </div>
              <button onClick={() => setProfileOpen(false)} style={{ border: 'none', background: '#f0f5f8', borderRadius: '10px', padding: '7px', cursor: 'pointer' }}><X size={18} color="#8a9eb0" /></button>
            </div>

            {/* Avatar em linha com info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', background: '#f7fbff', borderRadius: '14px', padding: '14px 18px' }}>
              <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #4292bf, #295872)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.4rem', flexShrink: 0, boxShadow: '0 4px 14px rgba(66,146,191,0.3)' }}>P</div>
              <div>
                <div style={{ fontWeight: 800, color: '#0d2137', fontSize: '1rem' }}>Prof. Admin</div>
                <div style={{ color: '#8a9eb0', fontSize: '0.82rem' }}>Administrador · AURA</div>
              </div>
            </div>

            {/* Campos compactos em grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.78rem', display: 'block', marginBottom: '5px' }}>Nome Completo</label>
                <input type="text" defaultValue="Prof. Admin" style={{ ...inputSt, padding: '10px 14px', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.78rem', display: 'block', marginBottom: '5px' }}>Instituição</label>
                <input type="text" defaultValue="Escola AURA" style={{ ...inputSt, padding: '10px 14px', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.78rem', display: 'block', marginBottom: '5px' }}>E-mail Institucional</label>
                <input type="email" defaultValue="admin@aura.edu.br" style={{ ...inputSt, padding: '10px 14px', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.78rem', display: 'block', marginBottom: '5px' }}>Nova Senha</label>
                <input type="password" placeholder="Em branco para manter" style={{ ...inputSt, padding: '10px 14px', fontSize: '0.9rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setProfileOpen(false)} style={{ background: '#f0f5f8', color: '#3a5570', border: 'none', borderRadius: '12px', padding: '10px 22px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>Cancelar</button>
              <button onClick={() => setProfileOpen(false)} style={{ background: 'linear-gradient(90deg, #4292bf, #295872)', color: 'white', border: 'none', borderRadius: '12px', padding: '10px 22px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(66,146,191,0.3)' }}>Salvar Alterações</button>
            </div>

          </div>
        </div>
      )}


      {/* ── MODAL: RELATÓRIOS COM FILTROS ── */}
      {reportsOpen && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setReportsOpen(false)}>
          <div style={{ ...modalStyle, maxWidth: '800px' }} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f5f8', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <BrainCircuit size={24} color="#4292bf" />
                <h2 style={{ margin: 0, color: '#0d2137', fontSize: '1.4rem' }}>Relatórios de Desempenho</h2>
              </div>
              <button onClick={() => setReportsOpen(false)} style={{ border: 'none', background: '#f0f5f8', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><X size={20} color="#8a9eb0" /></button>
            </div>

            {/* FILTROS */}
            <div style={{ background: '#f7fbff', borderRadius: '18px', padding: '22px', marginBottom: '25px', border: '1px solid #e4edf3' }}>
              <h3 style={{ margin: '0 0 18px', color: '#295872', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClipboardList size={18} /> Filtrar Relatório
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.82rem', display: 'block', marginBottom: '6px' }}>Aluno</label>
                  <select
                    value={reportFilters.aluno}
                    onChange={e => setReportFilters(f => ({ ...f, aluno: e.target.value }))}
                    style={{ ...inputSt, cursor: 'pointer' }}
                  >
                    <option value="">Todos os alunos</option>
                    {MOCK_STUDENTS.map(s => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.82rem', display: 'block', marginBottom: '6px' }}>Disciplina</label>
                  <select
                    value={reportFilters.disciplina}
                    onChange={e => setReportFilters(f => ({ ...f, disciplina: e.target.value }))}
                    style={{ ...inputSt, cursor: 'pointer' }}
                  >
                    <option value="">Todas as disciplinas</option>
                    <option value="leitura">Leitura Compreensiva</option>
                    <option value="logica">Interação Lógica</option>
                    <option value="matematica">Matemática Básica</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.82rem', display: 'block', marginBottom: '6px' }}>Data Início</label>
                  <input
                    type="date"
                    value={reportFilters.dataInicio}
                    onChange={e => setReportFilters(f => ({ ...f, dataInicio: e.target.value }))}
                    style={inputSt}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 700, color: '#3a5570', fontSize: '0.82rem', display: 'block', marginBottom: '6px' }}>Data Fim</label>
                  <input
                    type="date"
                    value={reportFilters.dataFim}
                    onChange={e => setReportFilters(f => ({ ...f, dataFim: e.target.value }))}
                    style={inputSt}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  onClick={() => setReportFilters({ aluno: '', disciplina: '', dataInicio: '', dataFim: '' })}
                  style={{ background: '#f0f5f8', color: '#3a5570', border: 'none', borderRadius: '14px', padding: '10px 20px', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem' }}
                >
                  Limpar Filtros
                </button>
                <button
                  style={{ background: 'linear-gradient(90deg, #4292bf, #295872)', color: 'white', border: 'none', borderRadius: '14px', padding: '10px 22px', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(66,146,191,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <ClipboardList size={16} /> Gerar Relatório
                </button>
              </div>
            </div>

            {/* RESULTADOS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '340px', overflowY: 'auto' }}>
              {MOCK_STUDENTS
                .filter(s => !reportFilters.aluno || String(s.id) === reportFilters.aluno)
                .map(s => (
                  <div key={s.id} style={{ background: 'white', borderRadius: '18px', padding: '22px', border: '1px solid #e4edf3', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f0f5f8', paddingBottom: '14px', marginBottom: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #4292bf, #295872)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>{s.name.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0d2137', fontSize: '1rem' }}>{s.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#8a9eb0' }}>{s.level} · Engajamento: {s.engagement}%</div>
                      </div>
                      <div style={{ marginLeft: 'auto', background: s.engagement > 70 ? '#e8f8ef' : '#fff3e8', color: s.engagement > 70 ? '#2ecc71' : '#e07b3f', padding: '5px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.82rem' }}>
                        {s.engagement > 70 ? 'Ótimo' : 'Atenção'}
                      </div>
                    </div>
                    <p style={{ margin: '0 0 6px', fontSize: '0.9rem', color: '#3a5570' }}><strong>Módulo Atual:</strong> {s.module}</p>
                    {(MOCK_EVALUATIONS[s.id] || []).map((ev, i) => (
                      <div key={i} style={{ background: '#eef6fb', borderRadius: '12px', padding: '14px', marginTop: '10px', display: 'flex', gap: '12px', borderLeft: '4px solid #4292bf' }}>
                        <BrainCircuit size={18} color="#295872" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0d2137', fontSize: '0.88rem', marginBottom: '4px' }}>{ev.activity} · {ev.date} · Nota: {ev.score}</div>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#3a5570', lineHeight: 1.45 }}>{ev.insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherPortal;
