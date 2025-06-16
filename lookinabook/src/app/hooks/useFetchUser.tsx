/*"use client"

import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../GraphqlOnClient/queries/userQueries";
import { useToken } from "./useToken";

export function useFetchUser() {
  // Токен теперь будем получать из localStorage или контекста
  const { accesstoken } = useToken();

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", // Отправляем токен в заголовках
      },
    },
    skip: !accesstoken, // Если нет токена, запрос не выполняется
    onCompleted: (data) => {
      console.log("GraphQL response:", data);
    },
    onError: (error) => {
      console.error("GraphQL error:", error);
    },
  });

  return { user: data?.getCurrentUser || null, loading, error, refetch };
}*/
