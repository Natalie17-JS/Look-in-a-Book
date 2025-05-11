"use client"

import { useMutation } from "@apollo/client"
import { EDIT_POST } from "@/app/GraphqlOnClient/mutations/postMutations"
import { usePost } from "@/app/context/postContext"
import PostForm from "../../../new-post/components/CreatePostForm"
import { Post, CreatePostFormData, PostCategory } from "@/app/types/postTypes"
import { PStatus } from "@/app/types/bookTypes"
import { useParams, useRouter } from "next/navigation"
import { GET_POST_BY_ID } from "@/app/GraphqlOnClient/queries/postQueries"
import { usePostStore } from "@/app/zustand/PostStore"
import { useLoadPostById } from "@/app/hooks/useFetchPost"

export default function EditPost() {
  const router = useRouter();
  const params = useParams()
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : ""
    //const {currentPost, setCurrentPost } = usePost()

    const { currentPost, setCurrentPost } = usePostStore()
    const { loading: loadingPost, error: errorPost } = useLoadPostById(id)
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const [editPost, {loading, error}] = useMutation<Post>(EDIT_POST, {
        context: {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : ""
            }
        },
        onCompleted: (data) => {
            console.log("Post updated:", data);
          },
    })

    const handleUpdate = async(data: CreatePostFormData) => {
        try {
            const editedPost = await editPost({
                variables: {
                    id: currentPost?.id,
                    title: data.title,
                    content: data.content,
                    publishStatus: data.publishStatus,
                    category: data.category,
                    //updatedAt: data.updatedAt
                },
              
            })
            if (editedPost.data) {
                setCurrentPost(editedPost.data);
                //await refetchPost();
                router.push(`/allpages/profile/my-posts/${currentPost?.id}`)
              }
        }
        catch (err) {
            console.error("Update error:", err);
          }
    }

    if (loadingPost || !currentPost) return <p>Loading...</p>;

    return (
        <div>
          <h1>Edit Chapter</h1>
          <PostForm
            initialValues={{
              title: currentPost?.title || "",
              content: currentPost?.content || "",
              publishStatus: currentPost?.publishStatus || PStatus.DRAFT,
              category: currentPost?.category || PostCategory.NEWS,
              image: currentPost?.image || undefined,
            }}
            onSubmit={handleUpdate}
            isSubmitting={loading}
            submitLabel="Update Chapter"
          />
          {error && <p>Error: {error.message}</p>}
        </div>
      );
}