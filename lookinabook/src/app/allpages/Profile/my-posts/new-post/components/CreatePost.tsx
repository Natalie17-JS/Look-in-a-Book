"use client"

import styles from "./CreatePost.module.css";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/app/GraphqlOnClient/mutations/postMutations";
import { CreatePostFormData, Post } from "@/app/types/postTypes";
import PostForm from "./CreatePostForm";
import { useToken } from "@/app/hooks/useToken";

const CreatePost =()=> {
const {accesstoken, isLoading} = useToken()
  const [createPost, {loading, error}] = useMutation<Post>(CREATE_POST, {
    context: {
      headers: { 
        Authorization: accesstoken ? `bearer ${accesstoken}` : ""
      }
    },
    
    onCompleted: (data) => {
      console.log("Post created:", data);
  },
  
  })

  {error && <p className="error">Error: {error.message}</p>}

  const handleCreate = async (data: CreatePostFormData) =>{
    console.log("Submitting post data:", data);
    if (isLoading || !accesstoken) {
    console.warn("Token not ready, skipping mutation");
    return;
  }
    try {
      const newPost = await createPost({
        variables: {
          title: data.title,
          content: data.content,
          image: data.image || null,
          publishStatus: data.publishStatus,
          category: data.category,
          //createdAt: data.createdAt
         // createdAt: new Date().toISOString()
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
    <div className={styles["create-post-container"]}>
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


