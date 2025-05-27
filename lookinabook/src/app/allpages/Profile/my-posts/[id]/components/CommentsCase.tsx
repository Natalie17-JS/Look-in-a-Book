
import styles from "./Comments.module.css"
import CommentsForPost from "@/app/allpages/blog/[id]/components/comments/Comments"

export default function CommentsCase() {

    return(
        <div className={styles["comments-container"]}>
            <CommentsForPost/>
        </div>
    )
}