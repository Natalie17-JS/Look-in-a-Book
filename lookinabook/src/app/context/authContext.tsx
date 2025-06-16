// "use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../GraphqlOnClient/queries/userQueries";
import { useToken } from "../hooks/useToken";
import { CurrentUser } from "../types/userTypes";

interface AuthContextType {
  user: CurrentUser | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  loading: boolean;
  refetch: () => void;
}

const UserContext = createContext<AuthContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const { accesstoken, isLoading: tokenLoading } = useToken();

  const {
    data,
    loading,
    refetch,
    error,
  } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
    skip: !accesstoken || tokenLoading,
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
    onCompleted: (data) => {
      if (data?.getCurrentUser) {
        setUser(data.getCurrentUser);
      }
    },
    onError: (error) => {
      console.error("GraphQL error:", error);
    },
  });

  // Можно вручную установить юзера, если нужно
  useEffect(() => {
    if (data?.getCurrentUser) {
      setUser(data.getCurrentUser);
    }
  }, [data]);

  // Доп. активность пользователя
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user?.id) {
        navigator.sendBeacon("/api/updateLastActive");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, refetch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
