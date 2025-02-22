import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../GraphqlOnClient/queries/userQueries";
//import { CurrentUser } from "../types/userTypes";

export function useFetchUser(accessToken: string | null) {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "", // Передаём токен в заголовках
      },
    },
    skip: !accessToken, // Если токена нет, запрос не выполняется
    onCompleted: (data) => {
      console.log("GraphQL response:", data);
    },
    onError: (error) => {
      console.error("GraphQL error:", error);
    },
  });

  return { user: data?.getCurrentUser || null, loading, error, refetch };
}
