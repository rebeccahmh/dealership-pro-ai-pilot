
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = "https://tdpxnhtaexnbbnrrnpuy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcHhuaHRhZXhuYmJucnJucHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNjIzNzAsImV4cCI6MjA1OTczODM3MH0.x5aHBAc27QI3a2aswXO0IvoYc03KkDSMd1u3z4UFYbI";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple wrapper function to check if auth is properly configured
export const isAuthConfigured = () => {
  return true; // Always configured since we're using hardcoded credentials
};
