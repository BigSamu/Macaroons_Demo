"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { authService } from "../services";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
      let usernameToUpdate = await authService.login(credentials);
      setUser(usernameToUpdate);
      setError("");
      router.push("/");
    } catch (error) {
      setError("Invalid Credentials");
    }
  };

  const logout = async () => {
    authService.logout();
    setUser(null);
    router.push("/login"); // Using `navigate` from `useNavigation`
  };

  const context = {
    user,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
