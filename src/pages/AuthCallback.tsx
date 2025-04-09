
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError.message);
          toast({
            title: "Authentication Error",
            description: "There was a problem completing the authentication process.",
            variant: "destructive",
          });
          navigate("/auth/login");
          return;
        }
        
        if (session) {
          console.log("Auth successful, user logged in");
          toast({
            title: "Authentication Successful",
            description: "You have been successfully authenticated.",
          });
          navigate("/");
        } else {
          console.log("No session found after auth callback");
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate("/auth/login");
      }
    };

    handleAuthCallback();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event in callback:", event);
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Processing authentication...</h2>
        <p className="mt-2 text-gray-500">Please wait while we complete your login</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-autoretech-blue"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
