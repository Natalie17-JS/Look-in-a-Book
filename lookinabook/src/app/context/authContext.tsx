"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useFetchUser } from "../hooks/useFetchUser"; // Загружаем пользователя
import { User, CurrentUser } from "../types/userTypes";

interface AuthContextType {
  user: CurrentUser | null;
  loading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setAccessToken(savedToken);
    }
  }, []);

  // Обновляем пользователя при изменении `accessToken`
  const { user, loading, refetch } = useFetchUser(accessToken);

  const login = (newAccessToken: string) => {
    localStorage.setItem("token", newAccessToken);
    setAccessToken(newAccessToken);
    console.log("Access token", newAccessToken);
    refetch(); // Загружаем пользователя заново
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAccessToken(null);
    console.log("User signed out successfully");
    router.push("/"); // Перенаправляем на главную
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
