import { createClient } from '@supabase/supabase-js';

const URL = 'https://xljvdnezcgghmbmqhddt.supabase.co'; // Replace with your Project URL
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsanZkbmV6Y2dnaG1ibXFoZGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNDE4MDcsImV4cCI6MjA2NjgxNzgwN30.ELFgJGqT5MPhqN8UrNAzsFDWk6jIMymtTcrpO3dCD38'; // Replace with your anon public key

export const supabase = createClient(URL, API_KEY);