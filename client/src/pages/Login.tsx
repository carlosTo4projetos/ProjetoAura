import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRightLeft, Fingerprint } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const redirectByRole = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (data?.role === 'teacher' || data?.role === 'admin') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  useEffect(() => {
    if (user) {
      redirectByRole(user.id);
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('E-mail ou senha incorretos. Se ainda não possui conta, clique no botão "Criar conta de teste" ao lado.');
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const handleBiometricLogin = async () => {
    // Simulação de autenticação biométrica local (WebAuthn)
    setLoading(true);
    setMessage('Simulando biometria nativa do dispositivo...');
    setTimeout(() => {
      navigate('/student');
      setLoading(false);
    }, 800);
  };

  const handleSignUp = async () => {
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('Preencha o e-mail e uma senha de no mínimo 6 caracteres.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres para cadastro.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: email.split('@')[0]
        }
      }
    });

    if (error) {
      setError(error.message);
    } else if (data.session) {
      // Se auto-confirmado, já loga automaticamente
      redirectByRole(data.user!.id);
    } else {
      setMessage('Conta criada com sucesso! Tente clicar em "Entrar".');
    }
    setLoading(false);
  };

  const handleQuickDemoLogin = () => {
    // Acesso demonstrativo direto sem precisar de senha
    navigate('/student');
  };

  return (
    <div className="login-container fade-in">
      <div className="bg-shape-1"></div>
      <div className="bg-shape-2"></div>

      <div className="login-card">
        
        {/* Left Side */}
        <div className="login-left">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#000', marginBottom: '20px', letterSpacing: '-1px' }}>AURA</h1>
          
          {error && <div style={{ color: '#d9534f', fontSize: '0.95rem', fontWeight: 600, marginBottom: '15px', padding: '10px', backgroundColor: '#fdf7f7', borderRadius: '10px', borderLeft: '4px solid #d9534f' }}>{error}</div>}
          {message && <div style={{ color: '#27ae60', fontSize: '0.95rem', fontWeight: 600, marginBottom: '15px', padding: '10px', backgroundColor: '#eaf6ed', borderRadius: '10px', borderLeft: '4px solid #27ae60' }}>{message}</div>}

          <form onSubmit={handleLogin}>
            <div className="login-input-group">
              <User size={20} color="#666" />
              <span style={{ margin: '0 15px', color: '#888' }}>|</span>
              <input 
                type="email" 
                placeholder="email de acesso" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
              <Lock size={20} color="#666" />
              <span style={{ margin: '0 15px', color: '#888' }}>|</span>
              <input 
                type="password" 
                placeholder="senha (mín. 6 caracteres)" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '30px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ backgroundColor: 'var(--button-action)', color: 'white', padding: '12px 60px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(66,146,191,0.4)', fontSize: '1.2rem', width: '100%', cursor: 'pointer' }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <button 
                type="button" 
                onClick={handleBiometricLogin}
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-main)', border: '2px solid var(--button-action)', padding: '12px 60px', borderRadius: '30px', fontSize: '1.1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <Fingerprint size={20} /> Usar Biometria
              </button>
            </div>
          </form>
        </div>

        {/* Switch Icon overlay */}
        <div style={{ position: 'absolute', top: '50%', left: '55.5%', transform: 'translate(-50%, -50%)', backgroundColor: '#eef2f5', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.15), inset 0 2px 5px rgba(255,255,255,1)', zIndex: 20 }}>
          <ArrowRightLeft size={24} color="var(--text-main)" />
        </div>

        {/* Right Side */}
        <div className="login-right">
          <h2 style={{ fontSize: '1.8rem', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.8)', marginBottom: '5px', fontWeight: 800 }}>Bem Vindo</h2>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '30px', borderBottom: '3px solid white', paddingBottom: '5px', color: 'white' }}>Acesso</h2>
          
          <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', color: '#eef2f5' }}>Novo por aqui?</p>
          <button 
            type="button"
            onClick={handleSignUp} 
            disabled={loading}
            style={{ backgroundColor: 'rgba(255,255,255,0.3)', color: 'white', border: '1px solid rgba(255,255,255,0.5)', padding: '10px 30px', borderRadius: '30px', marginBottom: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', backdropFilter: 'blur(5px)', cursor: 'pointer', width: '100%' }}
          >
            Criar conta de teste
          </button>

          <button 
            type="button"
            onClick={handleQuickDemoLogin}
            style={{ backgroundColor: 'white', color: 'var(--button-action)', border: 'none', padding: '10px 30px', borderRadius: '30px', fontWeight: 700, boxShadow: '0 5px 15px rgba(0,0,0,0.15)', cursor: 'pointer', width: '100%' }}
          >
            Entrar no Modo Demonstração
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
