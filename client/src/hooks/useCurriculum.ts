import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface Subject {
  id: string;
  name: string;
  description: string | null;
  domain: string;
}

export interface Module {
  id: string;
  subject_id: string;
  title: string;
  description: string | null;
  order_index: number;
  complexity_level: number;
}

export interface StudentProgress {
  module_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score_avg: number;
  attempts: number;
}

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('subjects')
        .select('*')
        .eq('domain', 'administracao')
        .order('name');
      setSubjects(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { subjects, loading };
}

export function useModules(subjectId: string | null) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subjectId) return;
    setLoading(true);
    const fetch = async () => {
      const { data } = await supabase
        .from('modules')
        .select('*')
        .eq('subject_id', subjectId)
        .order('order_index');
      setModules(data || []);
      setLoading(false);
    };
    fetch();
  }, [subjectId]);

  return { modules, loading };
}

export function useStudentProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from('student_progress')
        .select('module_id, status, score_avg, attempts')
        .eq('student_id', user.id);
      setProgress(data || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const getProgressForModule = (moduleId: string): StudentProgress | undefined => {
    return progress.find((p) => p.module_id === moduleId);
  };

  return { progress, loading, getProgressForModule };
}

export interface Activity {
  id: string;
  module_id: string;
  title: string;
  type: string;
  content: any;
  feedback_correct: string;
  feedback_incorrect: string;
  complexity_level: number;
  order_index: number;
}

export function useActivities(moduleId: string | null) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!moduleId) return;
    setLoading(true);
    const fetch = async () => {
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('module_id', moduleId)
        .order('order_index');
      setActivities(data || []);
      setLoading(false);
    };
    fetch();
  }, [moduleId]);

  return { activities, loading };
}
