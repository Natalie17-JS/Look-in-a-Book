"use client";

import { useMutation } from "@apollo/client";
import { PUBLISH_POST } from "@/app/GraphqlOnClient/mutations/postMutations";
import { Post } from "@/app/types/postTypes";
//import styles from "./PublishBtn.module.css";
import { usePostStore } from "@/app/zustand/PostStore";
import toast from 'react-hot-toast';
import { useParams } from "next/navigation";

const PublishPostButton = () => {
  const params = useParams()
    const id =
      typeof params.id === "string"
        ? params.id
        : Array.isArray(params.id)
        ? params.id[0]
        : ""
  
    const { currentPost } = usePostStore()
    const accessToken = localStorage.getItem("token");
    

  const [publishPost, { loading, error }] = useMutation<{ publishPost: Post }>(PUBLISH_POST, {
    variables: { id},
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    onCompleted: (data) => {
    toast.success(`Post "${data.publishPost.title}" is published! 🎉`);
    console.log("Chapter published:", data.publishPost);
    },
    onError: (error) => {
    toast.error(`Error: ${error.message}`);
    },
  });

  const handlePublish = async () => {
    try {
      await publishPost();
    } catch (err) {
      console.error("Publish error:", err);
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={handlePublish} disabled={loading}>
        {loading ? "Publishing..." : "Publish post"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
};

export default PublishPostButton;
