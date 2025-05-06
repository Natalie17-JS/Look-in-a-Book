"use client"

import { useMutation } from "@apollo/client"
import { EDIT_POST } from "@/app/GraphqlOnClient/mutations/postMutations"
import { usePost } from "@/app/context/postContext"
import PostForm from "../../../new-post/components/CreatePostForm"
import { Post, CreatePostFormData } from "@/app/types/postTypes"

export default function EditPost() {
    const {currentPost, setCurrentPost} = usePost()
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const [editPost, {loading, error}] = useMutation<CreatePostFormData>(EDIT_POST, {
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
                }
            })
            if (editedPost.data) {
                setCurrentPost(editedPost.data)
              }
        }
        catch (err) {
            console.error("Update error:", err);
          }
    }

    return (
        <div>
          <h1>Edit Chapter</h1>
          <PostForm
            initialValues={currentPost}
            onSubmit={handleUpdate}
            isSubmitting={loading}
            submitLabel="Update Chapter"
          />
          {error && <p>Error: {error.message}</p>}
        </div>
      );
}