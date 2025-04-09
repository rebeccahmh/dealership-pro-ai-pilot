
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error.message);
          setErrorMessage("Authentication error. Please try again.");
          toast({
            title: "Authentication Error",
            description: "There was a problem completing the authentication process.",
            variant: "destructive",
          });
          setTimeout(() => navigate("/auth/login"), 2000);
          return;
        }
        
        if (data.session) {
          console.log("Auth successful, user logged in");
          toast({
            title: "Authentication Successful",
            description: "You have been successfully authenticated.",
          });
          navigate("/");
        } else {
          console.log("No session found after auth callback");
          setErrorMessage("No authenticated session found.");
          setTimeout(() => navigate("/auth/login"), 2000);
        }
      } catch (error: any) {
        console.error("Error in auth callback:", error);
        setErrorMessage("An unexpected error occurred.");
        setTimeout(() => navigate("/auth/login"), 2000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event in callback:", event);
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {isProcessing ? (
          <>
            <h2 className="text-2xl font-semibold">Processing authentication...</h2>
            <p className="mt-2 text-gray-500">Please wait while we complete your login</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-autoretech-blue"></div>
            </div>
          </>
        ) : errorMessage ? (
          <>
            <h2 className="text-2xl font-semibold text-red-600">Authentication Error</h2>
            <p className="mt-2 text-gray-500">{errorMessage}</p>
            <p className="mt-2">Redirecting to login page...</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AuthCallback;
