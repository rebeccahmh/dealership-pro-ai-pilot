
import React, { useState, useEffect } from "react";
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "@/context/AuthContext";
import { emailSignIn, emailSignUp, signOut as authSignOut, getSession } from "@/services/authService";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const isConfigured = true;

  useEffect(() => {
    const fetchInitialSession = async () => {
      try {
        setLoading(true);

        const { data, error } = await getSession();
        
        if (error) {
          console.error("Error getting session:", error.message);
        } else if (data?.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error("Unexpected error during auth initialization:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth state changed:", event);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await emailSignUp(email, password, `${window.location.origin}/auth/callback`);
      
      if (error) throw error;
      
      toast({
        title: "Account Created",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await emailSignIn(email, password);
      
      if (error) throw error;
      
      toast({
        title: "Signed In",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await authSignOut();
      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    session,
    user,
    loading,
    isConfigured,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
