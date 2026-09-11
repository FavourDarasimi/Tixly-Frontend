"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api-base";

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: "attendee" | "organizer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** POST to the refresh endpoint (refresh JWT lives in an HttpOnly cookie). */
async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/jwt/refresh/`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** fetch with credentials + one silent refresh-and-retry on 401. */
async function authedFetch(input: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, { ...init, credentials: "include" });
  if (res.status !== 401) return res;
  if (await tryRefresh()) {
    return fetch(input, { ...init, credentials: "include" });
  }
  return res;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Don't manually read cookies - let the browser send them automatically
        const response = await authedFetch(
          `${API_BASE_URL}/auth/users/me/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();

          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Step 1: Login and set cookies
      const loginResponse = await fetch(`${API_BASE_URL}/auth/jwt/create/`, {
        method: "POST",
        credentials: "include", // ✅ Receive cookies from server
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.detail || "Invalid credentials");
      }

      const loginData = await loginResponse.json();
      console.log("✅ Login successful:", loginData.message);

      // Step 2: Fetch user details (cookies sent automatically)
      const userResponse = await fetch(`${API_BASE_URL}/auth/users/me/`, {
        credentials: "include", // ✅ Send cookies automatically
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await userResponse.json();
      setUser(userData);

      // Step 3: Redirect based on role
      if (userData.role === "attendee") {
        router.push("/home");
      } else if (userData.role === "organizer") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear cookies on server
      await fetch(`${API_BASE_URL}/auth/logout/`, {
        method: "POST",
        credentials: "include", // ✅ Send cookies for logout
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
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
