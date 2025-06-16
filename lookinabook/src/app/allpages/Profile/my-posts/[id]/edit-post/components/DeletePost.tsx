"use client"

import { useMutation } from "@apollo/client"
import { DELETE_POST } from "@/app/GraphqlOnClient/mutations/postMutations"
import ConfirmModal from "@/app/confirm/Confirm"
import { usePostStore } from "@/app/zustand/PostStore"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLoadPostById } from "@/app/hooks/useFetchPost"
import Image from "next/image"
import basket from "@/app/images/trash.svg"
import styles from "./Delete.module.css"
import {useToken} from "@/app/hooks/useToken"

type Props = {
  onDeleted?: () => void; 
};

export default function DeletePostButton({ onDeleted }: Props) {
    const params = useParams();
      const {accesstoken} = useToken()
      const [errorMessage, setErrorMessage] = useState("");
     const [showConfirm, setShowConfirm] = useState(false);
      const router = useRouter();

      const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : ""

       const { currentPost, clearCurrentPost } = usePostStore()
          //const { loading: loadingPost, error: errorPost } = useLoadPostById(id)

           const[deletePost, { loading, error }] = useMutation(DELETE_POST, {
            context: {
                headers: {
                    Authorization: accesstoken ? `Bearer ${accesstoken}` : ""
                }
            },
             onCompleted: () => {
      clearCurrentPost()
      if (onDeleted) {
        onDeleted(); // Вызываем переданный callback
      } else {
        router.push("/allpages/profile"); // Если нет callback, то редирект
      }
    },
    onError: (error) => {
      setErrorMessage("Failed to delete the book.");
      console.error("Error deleting book:", error);
    },
           })

        const handleDelete = async () => {
        if (!id) return;
        try {
          await deletePost({
            variables: {
              id
            },
          });
        } catch (err) {
          console.error("Delete error:", err);
        }
      };

       if (!id) return null;


           return (
            <div>
   {/*  <button onClick={() => setShowConfirm(true)} disabled={loading}>
        {loading ? "Deleting..." : "Delete post"}
    </button>*/}
     <div className={styles["basket-container"]} onClick={() => setShowConfirm(true)}>
              <Image src={basket} alt="basket" className={styles.basket} />
      </div>
                
    {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
                
    <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete post"
        message={`Are you sure you want to delete post "${currentPost?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        danger
        />
        </div>
 )
}