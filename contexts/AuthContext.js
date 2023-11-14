"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { authService } from "../services";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Next.js 13 uses `useNavigation` for client-side navigation
  const router = useRouter();

  useEffect(() => {
    // Perform client-side setup, like checking for a logged-in user session, etc.
    // This is only an example and might differ based on your authentication logic.
    const checkUserSession = async () => {
      // ... check user session
    };
    checkUserSession();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      let usernameToUpdate = await authService.login(credentials);
      setUser(usernameToUpdate);
      setError("");
      router.push("/");
    } catch (error) {
      setError("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push("/login"); // Using `navigate` from `useNavigation`
  };

  const context = {
    user,
    error,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
