"use client"

import styles from "./CreatePost.module.css";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/app/GraphqlOnClient/mutations/postMutations";
import { CreatePostFormData, Post } from "@/app/types/postTypes";
import PostForm from "./CreatePostForm";

const CreatePost =()=> {

  const accessToken = localStorage.getItem("token");
  const [createPost, {loading, error}] = useMutation<Post>(CREATE_POST, {
    context: {
      headers: { 
        Authorization: accessToken ? `bearer ${accessToken}` : ""
      }
    },
    onCompleted: (data) => {
      console.log("Post created:", data);
  },
  })

  const handleCreate = async (data: Post) =>{
    try {
      const newPost = await createPost({
        variables: {
          title: data.title,
          content: data.content,
          image: data.image || null,
          publishStatus: data.publishStatus,
          category: data.category,
          createdAt: data.createdAt
        }
      })
      if (newPost) {
        console.log("Created post:", newPost);

      } 
    }catch(err){
      console.error("Error creating post:", err);
    }
  }

  return(
    <div>
      <h1>Create a post</h1>
      <PostForm
       onSubmit={handleCreate}
       isSubmitting={loading}
       submitLabel="Create Post"
      />
    </div>
  )
}

export default CreatePost;


