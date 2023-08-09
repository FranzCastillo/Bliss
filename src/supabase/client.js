import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export {supabase};
