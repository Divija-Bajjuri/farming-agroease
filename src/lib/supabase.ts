import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://azuzllugnlpanxttejro.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVjOTJhM2VjLTRmY2ItNDA2OC1hYTI5LTI4ODBkNDE1MTNkNyJ9.eyJwcm9qZWN0SWQiOiJhenV6bGx1Z25scGFueHR0ZWpybyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcyODAzMjczLCJleHAiOjIwODgxNjMyNzMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.15RttcQY2oIG2GcgeTdXU0tIw5o6EfSQcXTVxH9ISgM';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };