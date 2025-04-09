
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or anon key is missing. Please add them to your project settings.");
}

// Create a mock client for development when no environment variables are available
// This allows development to proceed without Supabase properly configured
const createMockClient = () => {
  console.log("Using mock Supabase client. Authentication and database features will not work.");
  
  // Return a mock client that won't throw errors but won't actually connect to Supabase
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signInWithOAuth: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    // Add any other Supabase methods you're using here
  };
};

// Use real Supabase client if environment variables are available, otherwise use mock
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient() as ReturnType<typeof createClient>;
