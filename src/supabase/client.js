const {createClient} = require("@supabase/supabase-js");

const supabaseUrl = process.env.REACT_APP_DB_URL;
const supabaseKey = process.env.REACT_APP_DB_KEY;

console.log(process.env.REACT_APP_DB_URL);
console.log( process.env.REACT_APP_DB_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);