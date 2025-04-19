"use client"

import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS } from "@/app/GraphqlOnClient/queries/postQueries"
import { useUser } from "@/app/context/authContext"
import styles from "./AllPosts.module.css"
import { Post } from "@/app/types/postTypes"
import Link from "next/link"

export default function GetAllPosts() {
      const { user } = useUser();
      const { loading, error, data } = useQuery(GET_ALL_POSTS, {
        pollInterval: 10000,
      });

      if (loading) return <p className={styles.loading}>Loading books...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

const filteredPosts = user
   ? data.getAllPosts.filter((post: Post) => post.author.id !== user.id)
   : data.getAllPosts;

   return (
    <div className={styles["posts-container"]}>
        <h1 className={styles["welcome-text"]}>Welcome to all posts!</h1>
        {data.getAllPosts ? (
            <ul>
            {filteredPosts.map((post: Post) => (
                <li className={styles["post-item"]} key={post.id}>
                     <p className={styles["post-title"]}>{post.title}</p>
                     <p className={styles["post-content"]}>{post.content}</p>
                     <p className={styles["post-category"]}>{post.category}</p>
                </li>
                ))}
                </ul>
         ) : (
            <p>No posts found</p>
        )}

         <Link href="/">
                <button>Back to home page</button>
        </Link>
        
    </div>
   )
}