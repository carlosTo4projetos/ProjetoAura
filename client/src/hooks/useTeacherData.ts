import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface TeacherStudent {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  created_at: string;
  pia?: any;
  progressCount?: number;
}

export function useTeacherData() {
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [modulesCount, setModulesCount] = useState(0);
  const [completedActivitiesCount, setCompletedActivitiesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTeacherData = useCallback(async () => {
    setLoading(true);

    // 1. Buscar alunos
    const { data: studentsData } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student');

    // 2. Buscar contagem de disciplinas e módulos
    const { count: sCount } = await supabase
      .from('subjects')
      .select('*', { count: 'exact', head: true });

    const { count: mCount } = await supabase
      .from('modules')
      .select('*', { count: 'exact', head: true });

    // 3. Buscar progresso concluído
    const { count: pCount } = await supabase
      .from('student_progress')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    setStudents(studentsData || []);
    setSubjectsCount(sCount || 0);
    setModulesCount(mCount || 0);
    setCompletedActivitiesCount(pCount || 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  return {
    students,
    subjectsCount,
    modulesCount,
    completedActivitiesCount,
    loading,
    refetch: fetchTeacherData,
  };
}
