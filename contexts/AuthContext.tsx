"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: "attendee" | "organizer";
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("access_token");
        const storedRefreshToken = localStorage.getItem("refresh_token");

        if (storedUser && storedAccessToken) {
          setUser(JSON.parse(storedUser));
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const BASEURL = "http://localhost:8000/api";

      // Step 1: Get JWT tokens
      const loginResponse = await fetch(`${BASEURL}/auth/jwt/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.detail || "Invalid credentials");
      }

      const { access, refresh } = await loginResponse.json();

      // Step 2: Get user details
      const userResponse = await fetch(`${BASEURL}/auth/users/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await userResponse.json();

      // Step 3: Store tokens and user data
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      setAccessToken(access);
      setRefreshToken(refresh);
      setUser(userData);

      // Step 4: Redirect based on role
      if (userData.role === "attendee") {
        router.push("/home");
      } else if (userData.role === "organizer") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    router.push("/login");
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!accessToken,
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
