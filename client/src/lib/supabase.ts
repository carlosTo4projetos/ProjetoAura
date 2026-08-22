import { createClient } from '@supabase/supabase-js';

const fallbackUrl = 'https://ursttpzlexzidqsevmpw.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyc3R0cHpsZXh6aWRxc2V2bXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzY3NzgsImV4cCI6MjEwMjk1Mjc3OH0.cDLD5SVEhLMTdSBne0qgCd2gr5XGzJT-cmH4g3fC3E4';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackKey;

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Aviso: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas no .env. Usando fallbacks da plataforma.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
