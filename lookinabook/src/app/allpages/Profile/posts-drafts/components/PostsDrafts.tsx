"use client"

import { useQuery } from "@apollo/client"
import { GET_POSTS_DRAFTS } from "@/app/GraphqlOnClient/queries/postQueries"
import PostCard from "@/app/allpages/blog/[id]/components/Post"
import Link from "next/link"
import { useUser } from "@/app/context/authContext"
import { useTheme } from "@/app/context/themeContext"
import { Post, PostsDraftsData } from "@/app/types/postTypes"
import { Carousel3slides } from "../../my-posts/components/Carousel"
import styles from "../../my-posts/components/AuthorPosts.module.css"

const PostsDrafts = () => {
    const { user } = useUser();
    const { theme } = useTheme();
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const {loading, error, data} = useQuery<PostsDraftsData>(GET_POSTS_DRAFTS, {
        context: {
            headers: {
                Authorization: accessToken ? `bearer ${accessToken}` : "",
            }
        }
    })
  const PostsDrafts: Post[] = data?.getPostDrafts || [];

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (PostsDrafts.length === 0) {
    return <p>No drafts posts found</p>;
  }

  // Если постов 5 или меньше — не показываем стрелки и не включаем карусель
  const shouldUseCarousel = PostsDrafts.length > 2;

    return(
        <div className={styles["posts-ontable"]}>

    <div className={styles.carouselWrapper}>
      {shouldUseCarousel ? (
        <Carousel3slides>
          {PostsDrafts.map((post) => (
            <Link href={`/allpages/profile/posts-drafts/${post.id}`}>
            <PostCard key={post.id} post={post} onTable />
            </Link>
          ))}
        </Carousel3slides>
      ) : (
        <div className={styles.staticList}>
          {PostsDrafts.map((post) => (
            <div key={post.id} className={styles.staticItem}>
                 <Link href={`/allpages/profile/posts-drafts/${post.id}`}>
              <PostCard post={post} onTable />
                </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    )
}
export default PostsDrafts;
