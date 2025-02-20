"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useFetchUser } from "../hooks/useFetchUser"; // Используем новый хук
import { User } from "../types/userTypes";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (accesstoken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accesstoken, setAccesstoken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setAccesstoken(savedToken);
  }, []);

  const { user, loading, refetch } = useFetchUser(accesstoken); // Загружаем пользователя

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setAccesstoken(token);
    refetch(); // После логина обновляем пользователя
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAccesstoken(null);
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
