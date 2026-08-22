import React, { useEffect, useState } from 'react';
import { Eye, Type, Volume2, Sparkles, X } from 'lucide-react';
import { usePIA } from '../../hooks/usePIA';
import { TTSService } from '../../services/TTSService';
import { Button } from '../ui/Button';

interface AccessibilityToolbarProps {
  onClose?: () => void;
}

export function AccessibilityToolbar({ onClose }: AccessibilityToolbarProps) {
  const { pia, updatePIA } = usePIA();

  const [visualMode, setVisualMode] = useState<'padrao' | 'reduzido' | 'alto_contraste'>(pia?.visual_mode || 'padrao');
  const [fontSize, setFontSize] = useState<'padrao' | 'ampliado'>(pia?.font_size || 'padrao');
  const [animations, setAnimations] = useState<'normal' | 'desativadas'>(pia?.animation_mode === 'desativadas' ? 'desativadas' : 'normal');

  useEffect(() => {
    if (pia) {
      setVisualMode(pia.visual_mode || 'padrao');
      setFontSize(pia.font_size || 'padrao');
      setAnimations(pia.animation_mode === 'desativadas' ? 'desativadas' : 'normal');
    }
  }, [pia]);

  // Aplicar classes no tag <html>
  useEffect(() => {
    const html = document.documentElement;

    // Visual Mode
    html.classList.remove('mode-reduzido', 'mode-alto-contraste');
    if (visualMode === 'reduzido') html.classList.add('mode-reduzido');
    if (visualMode === 'alto_contraste') html.classList.add('mode-alto-contraste');

    // Font Size
    html.classList.remove('font-ampliada');
    if (fontSize === 'ampliado') html.classList.add('font-ampliada');

    // Animations
    html.classList.remove('animations-disabled');
    if (animations === 'desativadas') html.classList.add('animations-disabled');
  }, [visualMode, fontSize, animations]);

  const handleVisualModeChange = (mode: 'padrao' | 'reduzido' | 'alto_contraste') => {
    setVisualMode(mode);
    updatePIA({ visual_mode: mode });
  };

  const handleFontSizeChange = (size: 'padrao' | 'ampliado') => {
    setFontSize(size);
    updatePIA({ font_size: size });
  };

  const handleAnimationChange = (mode: 'normal' | 'desativadas') => {
    setAnimations(mode);
    updatePIA({ animation_mode: mode });
  };

  const handleTestTTS = () => {
    TTSService.speak('Bem-vindo ao AURA! Este é um teste de áudio acessível para auxílio na leitura.');
  };

  return (
    <div style={containerStyle} className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={20} color="var(--button-action)" /> Painel de Acessibilidade
        </h3>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} color="var(--text-main)" />
          </button>
        )}
      </div>

      {/* Modo Visual */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Modo Visual (Estímulo)</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            variant={visualMode === 'padrao' ? 'primary' : 'secondary'} 
            onClick={() => handleVisualModeChange('padrao')}
            style={btnGroupStyle}
          >
            Padrão
          </Button>
          <Button 
            variant={visualMode === 'reduzido' ? 'primary' : 'secondary'} 
            onClick={() => handleVisualModeChange('reduzido')}
            style={btnGroupStyle}
          >
            Reduzido
          </Button>
          <Button 
            variant={visualMode === 'alto_contraste' ? 'primary' : 'secondary'} 
            onClick={() => handleVisualModeChange('alto_contraste')}
            style={btnGroupStyle}
          >
            Alto Contraste
          </Button>
        </div>
      </div>

      {/* Tamanho da Fonte */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Tamanho do Texto</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            variant={fontSize === 'padrao' ? 'primary' : 'secondary'} 
            onClick={() => handleFontSizeChange('padrao')}
            style={btnGroupStyle}
          >
            <Type size={16} /> Normal
          </Button>
          <Button 
            variant={fontSize === 'ampliado' ? 'primary' : 'secondary'} 
            onClick={() => handleFontSizeChange('ampliado')}
            style={btnGroupStyle}
          >
            <Type size={20} /> Ampliado
          </Button>
        </div>
      </div>

      {/* Animações */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Animações</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            variant={animations === 'normal' ? 'primary' : 'secondary'} 
            onClick={() => handleAnimationChange('normal')}
            style={btnGroupStyle}
          >
            <Sparkles size={16} /> Ativadas
          </Button>
          <Button 
            variant={animations === 'desativadas' ? 'primary' : 'secondary'} 
            onClick={() => handleAnimationChange('desativadas')}
            style={btnGroupStyle}
          >
            Desativadas
          </Button>
        </div>
      </div>

      {/* Áudio / Leitor */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Leitura por Áudio (TTS)</label>
        <Button onClick={handleTestTTS} variant="secondary" icon={<Volume2 size={18} />} style={{ width: '100%' }}>
          Ouvir Exemplo de Voz
        </Button>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: 'var(--surface)',
  borderRadius: 'var(--border-radius)',
  padding: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  border: '1px solid var(--feedback)',
  maxWidth: '450px',
  width: '100%'
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '16px'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: 'var(--text-main)',
  marginBottom: '8px'
};

const btnGroupStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px 12px',
  fontSize: '0.85rem'
};
