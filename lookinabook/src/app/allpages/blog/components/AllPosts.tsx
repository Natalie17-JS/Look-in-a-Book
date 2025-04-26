"use client"

import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS } from "@/app/GraphqlOnClient/queries/postQueries"
import { useUser } from "@/app/context/authContext"
import styles from "./AllPosts.module.css"
import { Post } from "@/app/types/postTypes"
import Link from "next/link"
import PostCard from "../[id]/components/Post"

export default function GetAllPosts() {
      const { user } = useUser();
      const { loading, error, data } = useQuery(GET_ALL_POSTS, {
        pollInterval: 10000,
      });

      if (loading) return <p className={styles.loading}>Loading posts...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  const allPosts: Post[] = data?.getAllPosts || [];

  const filteredPosts = user
    ? allPosts.filter((post) => post.author.id !== user.id)
    : allPosts;

    console.log("data", data);
console.log("allPosts", allPosts);
console.log("filteredPosts", filteredPosts);

   return (
    <div className={styles["posts-filter-container"]}>

      <div className={styles["filter-container"]}></div>

<div className={styles.posts}>
        <h1 className={styles["welcome-text"]}>Welcome to all posts!</h1>
        {filteredPosts.length > 0 ? (
          <ul className={styles["post-list"]}>
            {filteredPosts.map((post) => (
              <li key={post.id} className={styles["post-item"]}>
                <Link href={`/allpages/blog/${post.id}`}>
                  <PostCard post={post} preview />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found.</p>
        )}

        <Link href="/">
          <button>Back to home page</button>
        </Link>
      </div>
    </div>
  );
}