"use client"

import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "@/app/GraphqlOnClient/mutations/userMutations";
import { useUser } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    className?: string; // Добавляем className как необязательный пропс
  }

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { user, setUser } = useUser(); // Берем функцию выхода из контекста
  const router = useRouter();

//if (!user) return <p>You are not autenticated</p>
 const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
    fetchPolicy: "no-cache", // Отключаем кеширование, чтобы запрос выполнялся всегда
    context: {
      headers: {
       Authorization: accessToken ? `Bearer ${accessToken}` : "", 
      },
    },
    onCompleted: () => {
      console.log("Logged out successfully");
    },
    onError: (error) => {
      console.error("Error signing out:", error);
    },
  });

  const handleLogout = async () => {
    try {
      // Если ты вызываешь мутацию для выхода, то она будет делать свои действия на сервере
      await logoutUser(); 

      // Удаляем токены с клиентской стороны (например, из localStorage или cookies)
      localStorage.removeItem("token");  // Удаляем токен из localStorage
    
      // Очищаем пользователя в контексте
      setUser(null); 
      router.push("/");
      console.log("User signed out successfully");
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
