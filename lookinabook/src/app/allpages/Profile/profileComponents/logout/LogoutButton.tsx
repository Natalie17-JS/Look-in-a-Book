"use client"

import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "@/app/GraphqlOnClient/mutations/userMutations";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    className?: string; // Добавляем className как необязательный пропс
  }

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { user, logout } = useAuth(); // Берем функцию выхода из контекста
  const router = useRouter();

if (!user) return <p>You are not autenticated</p>

  const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
    fetchPolicy: "no-cache", // Отключаем кеширование, чтобы запрос выполнялся всегда
    onCompleted: () => {
      logout(); // Вызываем логику выхода из контекста
      router.push("/");
    },
    onError: (error) => {
      console.error("Error signing out:", error);
    },
  });

  const handleLogout = async () => {
    try {
      await logoutUser(); // Запускаем мутацию
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading} className={className}>
      {loading ? "Signing out..." : "Log out"}
    </button>
  );
}
