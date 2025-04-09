
import React, { createContext, useState, useContext, useEffect } from "react";
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const setData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
          toast({
            title: "Authentication Error",
            description: "There was a problem connecting to the authentication service.",
            variant: "destructive",
          });
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error: any) {
        console.error("Error in auth setup:", error);
        toast({
          title: "Authentication Error",
          description: "Authentication system unavailable. Please check your configuration.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    setData();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, newSession) => {
          console.log("Auth state changed:", event);
          setSession(newSession);
          setUser(newSession?.user ?? null);
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } catch (error: any) {
      console.error("Error setting up auth state change listener:", error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        console.log("Sign-up successful:", data.user);
      }
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      if (data.user) {
        console.log("Sign-in successful:", data.user);
      }
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  };

  const signInWithTwitter = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing in with Twitter:", error.message);
      throw error;
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithTwitter,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
