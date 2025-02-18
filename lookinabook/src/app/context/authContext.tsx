"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useFetchUser } from "../hooks/useFetchUser"; // Используем новый хук

interface User {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const { user, loading, refetch } = useFetchUser(token); // Загружаем пользователя

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    refetch(); // После логина обновляем пользователя
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
