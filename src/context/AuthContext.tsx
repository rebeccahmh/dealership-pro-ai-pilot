
import React, { createContext } from "react";
import { AuthContextType } from "@/types/auth";
import { AuthProvider } from "@/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";

// Create the context with undefined as default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export everything
export { AuthContext, AuthProvider, useAuth };
