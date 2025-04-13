"use client"

import { DELETE_CHAPTER } from "@/app/GraphqlOnClient/mutations/chapterMutations"
import ConfirmModal from "@/app/confirm/Confirm";
import { useChapter } from "@/app/context/chapterContext"
import { useMutation } from "@apollo/client"
import { useState } from "react";

type Props = {
    chapterId?: string;
    onDeleted?: () => void; // callback после удаления, например: refetch
  };

export default function DeleteChapterButton({ chapterId, onDeleted }: Props) {
    const {currentChapter, setCurrentChapter} = useChapter()
    const [showConfirm, setShowConfirm] = useState(false);
    const id = currentChapter?.id

    const accessToken = localStorage.getItem("token");

    const [deleteChapter, { loading, error }] = useMutation(DELETE_CHAPTER, {
        context: {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        },
        onCompleted: (data) => {
            if (onDeleted) onDeleted();
          console.log("Chapter deleted:", data);
          setCurrentChapter(null); // Очистим текущую главу
        },
      });

      const handleDelete = async () => {
        const idToDelete = chapterId || currentChapter?.id;
        if (!idToDelete) return;
    
    
        try {
          await deleteChapter({
            variables: {
              id: idToDelete
            },
          });
        } catch (err) {
          console.error("Delete error:", err);
        }
      };

      return (
        <div>
          <button onClick={() => setShowConfirm(true)} disabled={loading}>
            {loading ? "Deleting..." : "Delete chapter"}
          </button>
    
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    
          <ConfirmModal
            isOpen={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={handleDelete}
            title="Delete Chapter"
            message="Are you sure you want to delete this chapter? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            danger
          />
        </div>
      );

}