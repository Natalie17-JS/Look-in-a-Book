"use client"

import styles from "./Comments.module.css"
import CommentsForPost from "@/app/allpages/blog/[id]/components/comments/Comments"
import CommentForm from "@/app/allpages/blog/[id]/components/comments/createComment"
import { usePostStore } from "@/app/zustand/PostStore";
import { useState } from "react";
import flower from "@/app/images/flowers-on-shelf-1.svg"
import Image from "next/image"

export default function CommentsCase() {
     const { currentPost } = usePostStore()
       const postId = currentPost?.id;
     const [comments, setComments] = useState(currentPost?.comments || []);

    return(
       <div className={styles["comments-case-container"]}>
      <div className={styles["image-wrapper"]}>
            <Image src={flower} alt="flower" className={styles["flower-image"]}/>
            </div>
        <div className={styles["comments-container"]}>
            <CommentsForPost postId={postId}
        comments={comments}
        setComments={setComments}/>
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