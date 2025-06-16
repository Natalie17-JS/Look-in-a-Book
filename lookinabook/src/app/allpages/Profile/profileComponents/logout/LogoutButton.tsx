"use client"

import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "@/app/GraphqlOnClient/mutations/userMutations";
import { useUser } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { useToken } from "@/app/hooks/useToken";

interface LogoutButtonProps {
    className?: string; // Добавляем className как необязательный пропс
  }

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { user, setUser } = useUser(); // Берем функцию выхода из контекста
  const router = useRouter();
const {accesstoken} = useToken()
//if (!user) return <p>You are not autenticated</p>
  const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
    fetchPolicy: "no-cache", // Отключаем кеширование, чтобы запрос выполнялся всегда
    context: {
      headers: {
       Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
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
