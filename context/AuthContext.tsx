"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  googleStart: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // REFRESH ON PAGE LOAD
  // ---------------------------
  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  // ---------------------------
  // LOGIN
  // ---------------------------
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.error("Login failed");
      return false;
    }

    const data = await res.json();

    if (data.accessToken) {
      setAccessToken(data.accessToken);

      // store accessToken in NON-httpOnly cookie for middleware
      document.cookie = `accessToken=${data.accessToken}; path=/`;

      setUser(data.user);
      return true;
    }

    return false;
  };

  // ---------------------------
  // REGISTER
  // ---------------------------
  const register = async (name: string, email: string, password: string) => {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    return res.ok;
  };

  // ---------------------------
  // REFRESH TOKEN
  // ---------------------------
  const refresh = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/refresh", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        // user not logged in → this is fine
        setUser(null);
        setAccessToken(null);
        document.cookie = "accessToken=; path=/;";
        return;
      }

      const data = await res.json();

      if (data.accessToken) {
        setAccessToken(data.accessToken);

        document.cookie = `accessToken=${data.accessToken}; path=/`;

        // decode token
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
        setUser({
          _id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        });
      }
    } catch (err) {
      console.error("Refresh error:", err);
    }
  };

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const logout = async () => {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setAccessToken(null);
    document.cookie = "accessToken=; path=/;"; // remove cookie
  };

  // ---------------------------
  // GOOGLE OAUTH
  // ---------------------------
  const googleStart = () => {
    window.location.href = "http://localhost:8080/auth/google/init";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
        refresh,
        googleStart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
