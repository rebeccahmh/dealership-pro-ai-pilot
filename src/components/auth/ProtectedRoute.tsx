import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isConfigured } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-autoretech-blue"></div>
          </div>
        </div>
      </div>
    );
  }

  // If Supabase is not configured, show a message instead of redirecting
  if (!isConfigured) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-4">
          <h2 className="text-xl font-semibold text-amber-700">Authentication Not Configured</h2>
          <p className="mt-4 text-gray-600">
            To access this page, you need to connect this project to Supabase and configure 
            the required environment variables.
          </p>
          <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-md text-left">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Click the green Supabase button at the top of the interface</li>
              <li>Connect to your Supabase project</li>
              <li>Add the required environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)</li>
            </ol>
          </div>
          <button 
            onClick={() => window.location.href = "/auth/login"} 
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
