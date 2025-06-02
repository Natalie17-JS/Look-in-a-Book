"use client"

import { useState } from "react";
import { useMutation } from "@apollo/client";
import ConfirmModal from "@/app/confirm/Confirm";
import styles from "./Comments.module.css";
import { DELETE_COMMENT } from "@/app/GraphqlOnClient/mutations/commentsMutations";

interface DeleteCommentButtonProps {
  commentId: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function DeleteCommentButton({
  commentId,
  onSuccess,
  onError,
}: DeleteCommentButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  const handleConfirmDelete = async () => {
    try {
      await deleteComment({ variables: { id: commentId } });
      onSuccess?.();
    } catch (err: any) {
      console.error("Failed to delete comment", err);
      onError?.(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles["delete-btn"]}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </>
  );
}
