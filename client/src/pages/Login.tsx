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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // O useEffect vai capturar o user e redirecionar por role
    }
    setLoading(false);
  };

  const handleBiometricLogin = async () => {
    // Simulação de autenticação biométrica local (WebAuthn) na Fase 2
    alert('Simulando solicitação de biometria nativa pelo Sistema Operacional...');
    // Na vida real: Aqui ocorreria o WebAuthn API (navigator.credentials.get)
  };

  const handleSignUp = async () => {
    // Apenas para fins de teste na Fase 2
    if (!email || !password) {
      setError('Preencha email e senha para criar conta de teste.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert('Verifique seu e-mail para confirmar a conta!');
    setLoading(false);
  };

  return (
    <div className="login-container fade-in">
      <div className="bg-shape-1"></div>
      <div className="bg-shape-2"></div>

      <div className="login-card">
        
        {/* Left Side */}
        <div className="login-left">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#000', marginBottom: '20px', letterSpacing: '-1px' }}>AURA</h1>
          
          {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

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
                placeholder="senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '30px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ backgroundColor: 'var(--button-action)', color: 'white', padding: '12px 60px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(66,146,191,0.4)', fontSize: '1.2rem', width: '100%' }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <button 
                type="button" 
                onClick={handleBiometricLogin}
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-main)', border: '2px solid var(--button-action)', padding: '12px 60px', borderRadius: '30px', fontSize: '1.1rem', width: '100%', display: 'flex', gap: '10px' }}
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
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '50px', borderBottom: '3px solid white', paddingBottom: '5px', color: 'white' }}>Acesso</h2>
          
          <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', color: '#eef2f5' }}>Ambiente de testes?</p>
          <button 
            type="button"
            onClick={handleSignUp} 
            disabled={loading}
            style={{ backgroundColor: 'rgba(255,255,255,0.3)', color: 'white', border: '1px solid rgba(255,255,255,0.5)', padding: '10px 30px', borderRadius: '30px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', backdropFilter: 'blur(5px)' }}
          >
            Criar conta de teste
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
