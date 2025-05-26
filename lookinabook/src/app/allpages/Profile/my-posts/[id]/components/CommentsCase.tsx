
import styles from "./Comments.module.css"
import CommentsForPost from "@/app/allpages/blog/[id]/components/Comments"

export default function CommentsCase() {

    return(
        <div className={styles["comments-container"]}>
            <CommentsForPost/>
        </div>
    )
}