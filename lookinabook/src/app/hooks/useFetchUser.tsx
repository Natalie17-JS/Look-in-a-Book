import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../GraphqlOnClient/queries/userQueries";

export function useFetchUser(accesstoken: string | null) {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    skip: !accesstoken, // Если нет токена, запрос не выполняется
  });

  return { user: data?.getCurrentUser || null, loading, error, refetch };
}
