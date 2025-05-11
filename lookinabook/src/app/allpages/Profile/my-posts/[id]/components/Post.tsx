"use client"

import PostCard from "@/app/allpages/blog/[id]/components/Post"
import styles from "./Post.module.css"
import Image from "next/image"
import editpens from "@/app/images/editpens.svg"
import Link from "next/link"
import { usePost } from "@/app/context/postContext"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { GET_POST_BY_ID } from "@/app/GraphqlOnClient/queries/postQueries"
import { usePostStore } from "@/app/zustand/PostStore"
import { useLoadPostById } from "@/app/hooks/useFetchPost"
import DeletePostButton from "../edit-post/components/DeletePost"

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

            </div>
        </div>
    )
}