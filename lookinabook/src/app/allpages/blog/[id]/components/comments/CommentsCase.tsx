"use client"

import Image from "next/image"
import flower from "@/app/images/flowers-on-shelf-1.svg"
import styles from "./CommentsCase.module.css"
import  CommentsForPost  from "./Comments"
import CommentForm from "./createComment"
import { usePostStore } from "@/app/zustand/PostStore"
import { useEffect, useState } from "react"
import LikeButton from "@/app/allpages/profile/my-posts/[id]/components/LikeButton"
import { useUser } from "@/app/context/authContext"

export default function CommentsCase() {
    const {user} = useUser()
    
    const { currentPost } = usePostStore()
           const postId = currentPost?.id;
           const [likesCount, setLikesCount] = useState(currentPost?.likesCount ?? 0);

         const [comments, setComments] = useState(currentPost?.comments || []);

         useEffect(() => {
           if (currentPost?.likesCount !== undefined) {
             setLikesCount(currentPost.likesCount);
           }
         }, [currentPost]);

    return(
        <div className={styles["comments-case-container"]}>

<div className={styles["like-flowers"]}>
            {user && currentPost && (
                <>
                <LikeButton
                isLiked={currentPost.likedByCurrentUser}
                postId={postId}
                disabled={!user}
                type="POST"
                onLike={() => setLikesCount(prev => prev + 1)}
                onUnlike={() => setLikesCount(prev => prev - 1)}
                />
                <span>{likesCount}</span>
                </>
            )}
            <div className={styles["image-wrapper"]}>
            <Image src={flower} alt="flower" className={styles["flower-image"]}/>
            </div>
            </div>

            <div className={styles["comments-case"]}>
                <CommentsForPost
                postId={postId}
                comments={comments}
                setComments={setComments}
                />
                <CommentForm
                        mode="create"
                        commentType="POSTCOMMENT"
                        targetId={String(postId)}
                        onSuccess={(newComment) => setComments((prev) => [...prev, newComment])}
                      />
            </div>
        </div>
    )
}