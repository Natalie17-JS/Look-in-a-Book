"use client"

import PostCard from "@/app/allpages/blog/[id]/components/Post"
import { useRef,  useState, useEffect } from "react";
import { useQuery } from "@apollo/client"
import { GET_AUTHOR_POSTS } from "@/app/GraphqlOnClient/queries/postQueries";
import Link from "next/link"
import { Post } from "@/app/types/postTypes";
import { useUser } from "@/app/context/authContext";
import styles from "./AuthorPosts.module.css"

export default function AuthorPosts() {
    const {user} = useUser()

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const {loading, error, data} = useQuery(GET_AUTHOR_POSTS, {
        context: {
            headers: {
                Authorization: accessToken ? `bearer ${accessToken}` : ""
            }
        }
    })

    const AuthorPosts: Post[] = data?.getAuthorPosts || [];

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
          scrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
        }
      };
    
      const scrollRight = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
        }
      };

      if (loading) return <p>Loading posts...</p>;
      if (error) return <p>Error: {error.message}</p>;

    
      return (
        <div>
            <div className={styles.carouselContainer}>
                {canScrollLeft && <button onClick={scrollLeft}>⬅️</button>}

                <div ref={scrollRef} className={styles.carousel}>
                    {AuthorPosts.length > 0 ? (
                        <ul>
                            {AuthorPosts.map((post) => (
                                <li key={post.id}>
                                    <PostCard preview post={post} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No posts found</p>
                    )}
                </div>

                {canScrollRight && <button onClick={scrollRight}>➡️</button>}
            </div>
        </div>
    );
}