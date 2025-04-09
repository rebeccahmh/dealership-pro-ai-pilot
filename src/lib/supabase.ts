
import { createClient } from '@supabase/supabase-js';

// Supabase client configured with public keys from environment
// These are safe to expose in browser as they are public keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or anon key is missing. Make sure they are properly set in your environment variables.");
}

// Create a temporary client for development if no env variables are provided
// In production, this should be properly configured
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
