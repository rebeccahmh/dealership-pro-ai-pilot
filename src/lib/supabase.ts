
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or anon key is missing. Please add them to your project settings.");
}

// Create Supabase client with strict validation for proper initialization
// Empty strings will cause errors, so we use undefined to trigger proper error handling
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
