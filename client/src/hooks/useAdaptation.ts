import { useState, useEffect } from 'react';
import { AdaptationEngine } from '../services/AdaptationEngine';
import type { AdaptationRecommendation } from '../services/AdaptationEngine';
import { usePIA } from './usePIA';
import { useAuth } from '../context/AuthContext';

export function useAdaptation(moduleId: string | null) {
  const { user } = useAuth();
  const { pia, refetch: refetchPIA } = usePIA();
  const [recommendation, setRecommendation] = useState<AdaptationRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !moduleId) return;

    let isMounted = true;
    setLoading(true);

    AdaptationEngine.getRecommendation(user.id, moduleId, pia).then((rec) => {
      if (isMounted) {
        setRecommendation(rec);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user, moduleId, pia]);

  const processAnswer = async (isCorrect: boolean) => {
    if (!user) return;
    await AdaptationEngine.updatePIAFromInteraction(user.id, isCorrect, pia);
    await refetchPIA();
  };

  return { recommendation, loading, processAnswer };
}
