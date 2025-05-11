// hooks/useLoadPostById.ts
import { useQuery } from "@apollo/client"
import { GET_POST_BY_ID } from "@/app/GraphqlOnClient/queries/postQueries"
import { useEffect } from "react"
import { usePostStore } from "../zustand/PostStore"

export const useLoadPostById = (id: string | undefined) => {
  const { setCurrentPost, clearCurrentPost } = usePostStore()

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { id },
    skip: !id,
  })

  useEffect(() => {
    if (data?.getPostById) {
      setCurrentPost(data.getPostById)
    } else {
      clearCurrentPost()
    }
  }, [data, setCurrentPost, clearCurrentPost])

  return { loading, error }
}
