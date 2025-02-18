import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/me"; // Запрос на сервер

export function useFetchUser(token: string | null) {
  const { data, loading, refetch } = useQuery(ME_QUERY, {
    skip: !token, // Если нет токена, запрос не выполняется
  });

  return {
    user: data?.me || null,
    loading,
    refetch, // Для обновления данных
  };
}
