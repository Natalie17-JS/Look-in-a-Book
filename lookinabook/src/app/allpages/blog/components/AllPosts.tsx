"use client"

import { useRef,  useState, useEffect } from "react";
import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS } from "@/app/GraphqlOnClient/queries/postQueries"
import { useUser } from "@/app/context/authContext"
import styles from "./AllPosts.module.css"
import { Post } from "@/app/types/postTypes"
import Link from "next/link"
import PostCard from "../[id]/components/Post"

//type PostSortOption = "likes" | "comments" | "date";
export enum PostSortOption {
  Likes = "likes",
  Comments = "comments",
  Date = "date",
}


export default function GetAllPosts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [sortBy, setSortBy] = useState<PostSortOption>(PostSortOption.Date);

  const { user } = useUser();
  const { loading, error, data, refetch  } = useQuery(GET_ALL_POSTS, {
     variables: { sortBy },
    pollInterval: 10000,
  });

  const allPosts: Post[] = data?.getAllPosts || [];

  const filteredPosts = user
    ? allPosts.filter((post) => post.author.id !== user.id)
    : allPosts;

    const checkForScrollPosition = () => {
      if (!scrollRef.current) return;
  
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
  
    useEffect(() => {
      checkForScrollPosition();
      scrollRef.current?.addEventListener("scroll", checkForScrollPosition);
      return () => {
        scrollRef.current?.removeEventListener("scroll", checkForScrollPosition);
      };
    }, []);
  
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -440, behavior: "smooth" });
      }
    };
  
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 440, behavior: "smooth" });
      }
    };

     const handleSortChange = (sortOption: PostSortOption) => {
    setSortBy(sortOption);
    refetch({ sortBy: sortOption }); // 🔁 Перезапрашиваем с новой сортировкой
  };
  

  if (loading) return <p className={styles.loading}>Loading posts...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

return (
  <div className={styles["posts-filter-container"]}>
    <div className={styles["filter-container"]}>
      <button onClick={() => handleSortChange(PostSortOption.Date)}>
          By date
        </button>
        <button onClick={() => handleSortChange(PostSortOption.Likes)}>
         Most popular
        </button>
        <button onClick={() => handleSortChange(PostSortOption.Comments)}>
          Most discussed
        </button>
    </div>

    <div className={styles.posts}>
      <h1 className={styles["welcome-text"]}>Welcome to all posts!</h1>

      <div className={styles.carouselContainer}>
      {canScrollLeft && (
    <button 
    onClick={scrollLeft} 
    className={`${styles.arrow} ${styles.leftArrow} ${!canScrollLeft ? styles.arrowHidden : ""}`}>
      ⬅️
    </button>
  )}


        {/* ВАЖНО: ref навешиваем на блок, где список постов! */}
        <div ref={scrollRef} className={styles.carousel}>
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
        </div>

        {canScrollRight && (
    <button 
    onClick={scrollRight} 
    className={`${styles.arrow} ${styles.rightArrow} ${!canScrollRight ? styles.arrowHidden : ""}`}>
      ➡️
    </button>
  )}
      </div>

      <Link href="/">
        <button>Back to home page</button>
      </Link>
    </div>
  </div>
);
}