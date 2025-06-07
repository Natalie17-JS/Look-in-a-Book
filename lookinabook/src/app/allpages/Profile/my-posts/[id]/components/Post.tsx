"use client"

import PostCard from "@/app/allpages/blog/[id]/components/Post"
import styles from "./Post.module.css"
import Image from "next/image"
import editpens from "@/app/images/editpens.svg"
import Link from "next/link"

import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
//import { GET_POST_BY_ID } from "@/app/GraphqlOnClient/queries/postQueries"
import { usePostStore } from "@/app/zustand/PostStore"
import { useLoadPostById } from "@/app/hooks/useFetchPost"
import DeletePostButton from "../edit-post/components/DeletePost"
import PublishPostButton from "../edit-post/components/PublishPost"
import LikeButton from "./LikeButton"
import { useEffect, useState } from "react"

export default function AuthorPost() {
 

    const params = useParams()
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : ""

  const { currentPost } = usePostStore()
  const { loading, error } = useLoadPostById(id)
   const [likesCount, setLikesCount] = useState(currentPost?.likesCount ?? 0);

   useEffect(() => {
  if (currentPost?.likesCount !== undefined) {
    setLikesCount(currentPost.likesCount);
  }
}, [currentPost]);

const isDraft = currentPost?.publishStatus === "DRAFT"

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!currentPost) return <p>Post not found...</p>

    return (
        <div>
            <PostCard post={currentPost} inProfile/>

            <div className={styles["small-table"]}>

                <Link href={`/allpages/profile/my-posts/${currentPost.id}/edit-post`}>

               
                <div className={styles["editpens-container"]}>
            <Image src={editpens} alt="edit" className={styles.editpens} />
            </div>
            </Link>

            <DeletePostButton/>

            {isDraft && (
                <PublishPostButton/>
            )}
 {!isDraft && (
  <>
<LikeButton
  isLiked={currentPost.likedByCurrentUser}
  postId={currentPost.id}
  type="POST"
  onLike={() => setLikesCount(prev => prev + 1)}
  onUnlike={() => setLikesCount(prev => prev - 1)}
/>
<span>{likesCount}</span>
</>
)}
            

            </div>
        </div>
        
    )
}