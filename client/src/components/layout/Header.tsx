import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { AccessibilityToolbar } from '../accessibility/AccessibilityToolbar';

export function Header() {
  const navigate = useNavigate();
  const [showAccessibility, setShowAccessibility] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle} onClick={() => navigate('/student')} role="button" tabIndex={0}>
        AURA
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button 
          onClick={() => setShowAccessibility(!showAccessibility)} 
          variant="secondary" 
          icon={<Eye size={18} />}
          style={{ padding: '8px 16px', fontSize: '0.95rem' }}
        >
          Acessibilidade
        </Button>

        <Button 
          onClick={handleLogout} 
          variant="secondary" 
          icon={<LogOut size={18} />}
          style={{ padding: '8px 16px', fontSize: '0.95rem' }}
        >
          Sair
        </Button>
      </div>

      {/* Modal/Dropdown de Acessibilidade */}
      {showAccessibility && (
        <div style={{ position: 'absolute', top: '70px', right: '40px', zIndex: 1000 }}>
          <AccessibilityToolbar onClose={() => setShowAccessibility(false)} />
        </div>
      )}
    </header>
  );
}

const headerStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'var(--surface)',
  padding: '15px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(41, 88, 114, 0.08)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  borderRadius: '0 0 var(--border-radius) var(--border-radius)'
};

const logoStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: '700',
  color: 'var(--text-main)',
  letterSpacing: '2px'
};
