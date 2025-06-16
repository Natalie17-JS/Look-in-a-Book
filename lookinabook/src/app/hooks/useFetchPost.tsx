// hooks/useLoadPostById.ts
import { useQuery } from "@apollo/client"
import { GET_AUTHOR_POST_BY_ID, GET_POST_BY_ID } from "@/app/GraphqlOnClient/queries/postQueries"
import { useEffect } from "react"
import { usePostStore } from "../zustand/PostStore"
import { useUser } from "../context/authContext"
import { useToken } from "./useToken"


export const useLoadPostById = (id: string | undefined) => {
  const { setCurrentPost, clearCurrentPost } = usePostStore()
  const { user } = useUser();
const { accesstoken, isLoading } = useToken();

   const context = accesstoken && user
    ? { headers: { Authorization: `Bearer ${accesstoken}` } }
    : undefined;
  const { data, loading, error } = useQuery(user ? GET_AUTHOR_POST_BY_ID : GET_POST_BY_ID, {
    variables: { id },
    skip: !id || !accesstoken || isLoading,
    context,
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    const post = data?.getAuthorPostById ?? data?.getPostById;
    if (post) {
      setCurrentPost(post);
    } else {
      clearCurrentPost();
    }
  }, [data, setCurrentPost, clearCurrentPost])

  return { loading, error }
}
