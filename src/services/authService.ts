
import { supabase } from "@/integrations/supabase/client";

export const emailSignUp = async (email: string, password: string, redirectTo: string) => {
  return await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: redirectTo,
    }
  });
};

export const emailSignIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};
