"use client"

import {useState, useContext, createContext, useEffect, ReactNode} from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { GET_POST_BY_ID } from "../GraphqlOnClient/queries/postQueries"
import { Post } from "../types/postTypes"

interface PostContextType {
    currentPost: Post | null;
    setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>;
    //refetchPost: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider = ({children}: {children: ReactNode}) => {
    const [currentPost, setCurrentPost] = useState<Post | null>(null)
    const { id } = useParams();

    const {data, error, loading } = useQuery(GET_POST_BY_ID, {
        //variables: {id: id as String},
        variables: { id: String(id) },
        skip: !id,
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (data?.getPostById) {
          setCurrentPost(data.getPostById);
          console.log("Current post:", data.getPostById);
         // console.log("Current post: " + data.getPostById)
        }
      }, [data]);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        <PostContext.Provider value={{ currentPost, setCurrentPost }}>
          {children}
        </PostContext.Provider>
      );
}

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};