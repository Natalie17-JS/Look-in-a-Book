"use client"

import PostCard from "@/app/allpages/blog/[id]/components/Post"
import { useRef,  useState, useEffect } from "react";
import { useQuery } from "@apollo/client"
import { GET_AUTHOR_POSTS } from "@/app/GraphqlOnClient/queries/postQueries";
import Link from "next/link"
import { Post } from "@/app/types/postTypes";
import { useUser } from "@/app/context/authContext";
import styles from "./AuthorPosts.module.css"
import { Carousel3slides } from "./Carousel";

export default function AuthorPosts() {
  const { user } = useUser();

  const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { loading, error, data } = useQuery(GET_AUTHOR_POSTS, {
    context: {
      headers: {
        Authorization: accessToken ? `bearer ${accessToken}` : "",
      },
    },
  });

  const AuthorPosts: Post[] = data?.getAuthorPosts || [];

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (AuthorPosts.length === 0) {
    return <p>No posts found</p>;
  }

  // Если постов 5 или меньше — не показываем стрелки и не включаем карусель
  const shouldUseCarousel = AuthorPosts.length > 2;

  return (
    <div className={styles["posts-ontable"]}>
<Link href="/allpages/profile/my-posts/new-post">
      <button>New +</button>
      </Link>
    <div className={styles.carouselWrapper}>
      {shouldUseCarousel ? (
        <Carousel3slides>
          {AuthorPosts.map((post) => (
            <Link href={`/allpages/profile/my-posts/${post.id}`}>
            <PostCard key={post.id} post={post} onTable />
            </Link>
          ))}
        </Carousel3slides>
      ) : (
        <div className={styles.staticList}>
          {AuthorPosts.map((post) => (
            <div key={post.id} className={styles.staticItem}>
              <PostCard post={post} onTable />
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}