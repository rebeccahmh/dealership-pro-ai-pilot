
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-autoretech-dark">404</h1>
          <div className="h-2 w-24 mx-auto autoretech-gradient rounded-full"></div>
          <p className="text-xl text-gray-600 mt-4">Oops! Page not found</p>
          <p className="text-gray-500 mt-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button asChild className="mt-8 bg-autoretech-blue hover:bg-autoretech-blue/90">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
