
import { createClient } from '@supabase/supabase-js';

// Supabase client configured with public keys from environment
// These are safe to expose in browser as they are public keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or anon key is missing. Please add them to your project settings.");
}

// Create the Supabase client with fallback values for development
// In production, make sure to properly configure your environment variables
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
