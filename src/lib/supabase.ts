
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we're using placeholders - for development/testing only
if (supabaseUrl === 'https://placeholder-url.supabase.co' || supabaseAnonKey === 'placeholder-key') {
  console.warn("Using placeholder Supabase credentials. Authentication features will be limited.");
}

// Create the Supabase client with proper error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple wrapper function to check if auth is properly configured
export const isAuthConfigured = () => {
  return !(supabaseUrl === 'https://placeholder-url.supabase.co' || 
           supabaseAnonKey === 'placeholder-key');
};
