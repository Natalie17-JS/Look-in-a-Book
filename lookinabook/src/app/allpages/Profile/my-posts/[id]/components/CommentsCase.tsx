
import styles from "./Comments.module.css"
import CommentsForPost from "@/app/allpages/blog/[id]/components/comments/Comments"
import CommentForm from "@/app/allpages/blog/[id]/components/comments/createComment"
import { usePostStore } from "@/app/zustand/PostStore";
import { useState } from "react";

export default function CommentsCase() {
     const { currentPost } = usePostStore()
       const postId = currentPost?.id;
     const [comments, setComments] = useState(currentPost?.comments || []);

    return(
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
    )
}