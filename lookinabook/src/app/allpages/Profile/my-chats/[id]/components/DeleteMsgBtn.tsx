"use client"

import { useMutation } from "@apollo/client";
import { DELETE_MESSAGE } from "@/app/GraphqlOnClient/mutations/messageMutations"
import styles from "./DeleteMsg.module.css"; // для стилей (опционально)
import { useToken } from "@/app/hooks/useToken";
import ConfirmModal from "@/app/confirm/Confirm";
import { useState } from "react";

interface DeleteMessageButtonProps {
  messageId: number;
  onDeleted?: () => void; // колбэк, чтобы родитель обновил список
}

export default function DeleteMessageButton({ messageId, onDeleted }: DeleteMessageButtonProps) {
    const {accesstoken} = useToken()
     const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteMessage, { loading }] = useMutation(DELETE_MESSAGE, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    variables: { id: messageId },
    onCompleted: () => {
      if (onDeleted) onDeleted();
    },
    onError: (err) => {
      console.error("Error deleting message:", err);
    },
  });

    const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMessage();
  };

  return (
    <>
    <button
      className={styles.deleteButton}
      onClick={handleDeleteClick}
      disabled={loading}
    >
      {loading ? "..." : "X"}
    </button>

    <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete message?"
        message="Do you really want to delete this message?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
      </>
  );
}
