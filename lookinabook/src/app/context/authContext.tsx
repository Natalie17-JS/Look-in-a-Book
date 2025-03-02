"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useFetchUser } from "../hooks/useFetchUser"; // Загружаем пользователя
import { CurrentUser } from "../types/userTypes";

interface UserContextType {
  user: CurrentUser | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const { user: fetchedUser, loading, refetch } = useFetchUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser); // Устанавливаем пользователя в контекст
    }
  }, [fetchedUser]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}