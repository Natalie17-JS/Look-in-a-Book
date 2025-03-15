"use client"

import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../GraphqlOnClient/queries/userQueries";

export function useFetchUser() {
  // Токен теперь будем получать из localStorage или контекста
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "", // Отправляем токен в заголовках
      },
    },
    skip: !accessToken, // Если нет токена, запрос не выполняется
    onCompleted: (data) => {
      console.log("GraphQL response:", data);
    },
    onError: (error) => {
      console.error("GraphQL error:", error);
    },
  });

  return { user: data?.getCurrentUser || null, loading, error, refetch };
}
