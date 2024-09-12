const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();  
const supabaseUrl = process.env.SUPABASE_URL; // Ensure you have this in your .env file
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Ensure you have this in your .env file

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
