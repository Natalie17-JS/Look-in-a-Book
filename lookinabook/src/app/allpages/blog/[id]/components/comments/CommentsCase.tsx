import Image from "next/image"
import flower from "@/app/images/flowers-on-shelf-1.svg"
import styles from "./CommentsCase.module.css"
import  CommentsForPost  from "./Comments"
import CommentForm from "./createComment"
import { usePostStore } from "@/app/zustand/PostStore"
import { useState } from "react"

export default function CommentsCase() {
    const { currentPost } = usePostStore()
           const postId = currentPost?.id;
         const [comments, setComments] = useState(currentPost?.comments || []);

    return(
        <div className={styles["comments-case-container"]}>
            <div className={styles["image-wrapper"]}>
            <Image src={flower} alt="flower" className={styles["flower-image"]}/>
            </div>

            <div className={styles["comments-case"]}>
                <CommentsForPost/>
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