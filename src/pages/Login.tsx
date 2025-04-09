
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/eaac7242-39c0-490e-9146-62c3e8f7ec3a.png" 
            alt="Autoretech Logo" 
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500">Log in to your Autoretech account</p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  );
};

export default Login;
