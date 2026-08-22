import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface PIA {
  id: string;
  student_id: string;
  pref_texto: number;
  pref_imagem: number;
  pref_audio: number;
  pref_video: number;
  ritmo_leitura: 'lento' | 'padrao' | 'rapido';
  tolerancia_texto: 'baixa' | 'media' | 'alta';
  necessidade_repeticao: boolean;
  preferencia_exemplos: boolean;
  nivel_abstrato: number;
  visual_mode: 'padrao' | 'reduzido' | 'alto_contraste';
  animation_mode: 'normal' | 'reduzidas' | 'desativadas';
  audio_enabled: boolean;
  font_size: 'padrao' | 'ampliado';
}

export function usePIA() {
  const { user } = useAuth();
  const [pia, setPia] = useState<PIA | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPIA = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('pia')
      .select('*')
      .eq('student_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      setError(error.message);
    } else {
      setPia(data);
    }
    setLoading(false);
  }, [user]);

  const updatePIA = async (updates: Partial<PIA>) => {
    if (!user || !pia) return;

    const { data, error } = await supabase
      .from('pia')
      .update(updates)
      .eq('student_id', user.id)
      .select()
      .single();

    if (error) {
      setError(error.message);
    } else {
      setPia(data);
    }
    return { data, error };
  };

  useEffect(() => {
    fetchPIA();
  }, [fetchPIA]);

  return { pia, loading, error, updatePIA, refetch: fetchPIA };
}
