"use client"

import PostCard from "@/app/allpages/blog/[id]/components/Post"
import styles from "./Post.module.css"
import Image from "next/image"
import editpens from "@/app/images/editpens.svg"
import Link from "next/link"
import { usePost } from "@/app/context/postContext"

export default function AuthorPost() {
    const {currentPost} = usePost()
    const id = currentPost?.id;

    if (!currentPost) return <p>Post not found...</p>;

    return (
        <div>
            <PostCard post={currentPost} inProfile/>

            <div className={styles["small-table"]}>

                <Link href={`/allpages/profile/my-posts/${id}/edit-post`}>
                <div className={styles["editpens-container"]}>
            <Image src={editpens} alt="edit" className={styles.editpens} />
            </div>
            </Link>

            </div>
        </div>
    )
}