import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ursttpzlexzidqsevmpw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyc3R0cHpsZXh6aWRxc2V2bXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzY3NzgsImV4cCI6MjEwMjk1Mjc3OH0.cDLD5SVEhLMTdSBne0qgCd2gr5XGzJT-cmH4g3fC3E4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Checking subjects...');
  const { data: subjects, error: err1 } = await supabase.from('subjects').select('*');
  console.log('Subjects:', subjects);
  if (err1) console.error(err1);
}

check();
