import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--background)' }}>
        <p style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Carregando AURA...</p>
      </div>
    );
  }

  if (!user) {
    // Redireciona para o Login se não estiver autenticado
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
