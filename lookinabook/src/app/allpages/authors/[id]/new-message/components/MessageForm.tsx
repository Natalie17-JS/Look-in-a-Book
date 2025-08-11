"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import toast from 'react-hot-toast';
import { CREATE_MESSAGE, EDIT_MESSAGE } from "@/app/GraphqlOnClient/mutations/messageMutations";
import { useToken } from "@/app/hooks/useToken";
import styles from "./MessageForm.module.css"
import Image from "next/image";
import sendicon from "@/app/images/send-icon.svg"
import { Message } from "@/app/types/messageTypes";

interface MessageFormProps {
  chatId: number;
  editingMessage?: { id: number; text: string } | null;
  onCancelEdit?: () => void;
  onMessageUpdated?: (id: number, newText: string) => void;
  onMessageCreated?: () => void;
  replyTo: Message | null;
  clearReply: () => void;
}

export default function MessageForm({ 
  chatId, 
  editingMessage,
  onCancelEdit,
  onMessageUpdated,
  onMessageCreated, replyTo, clearReply }: MessageFormProps) {
  const { accesstoken } = useToken();
  const [text, setText] = useState("");

const [createMessage, { loading: creating }] = useMutation(CREATE_MESSAGE, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
    onCompleted: (data) => {
      console.log("Message created:", data);
      toast.success("Message sent!");
      setText("");
      clearReply();
      onMessageCreated?.();
    },
    
    onError: (error) => {
  console.error("Create message error:", error);
  toast.error("Failed to send message.");
}
  });

  const [editMessage, { loading: editing }] = useMutation(EDIT_MESSAGE, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
    onCompleted: (data) => {
      toast.success("Message updated!");
      setText("");
      onMessageUpdated?.(data.editMessage.id, data.editMessage.text);
      onCancelEdit?.();
    },
    onError: () => toast.error("Failed to update message."),
  });

  // Когда приходит editingMessage, вставляем его текст в форму
   useEffect(() => {
    if (editingMessage) {
      setText(editingMessage.text);
    } else {
      setText(""); // сброс при отмене
    }
  }, [editingMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    if (editingMessage) {
      // режим редактирования
      await editMessage({
        variables: { id: editingMessage.id, text },
      });
    } else {
      // режим создания
      await createMessage({
        variables: { text, chatId, replyToId: replyTo ? replyTo.id : null, },
      });
    }
  };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      if (replyTo) clearReply();
      if (editingMessage) onCancelEdit?.();
    }
  };

   return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {replyTo && (
        <div className={styles["reply-header"]}>
          <div>
            <strong>{replyTo.sender.username}</strong>
            <div className={styles["reply-header-text"]}>
              {replyTo.text.length > 50 ? replyTo.text.slice(0,50) + "…" : replyTo.text}
            </div>
          </div>
          <button type="button" onClick={clearReply} aria-label="Cancel reply">x</button>
        </div>
      )}

      <div className={styles["input-sendbtn"]}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message..."
          rows={6}
          required
        />
        {editingMessage ? (
          <div className={styles.editActions}>
            <button type="submit" disabled={editing}>
              Save
            </button>
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={creating}
            className={styles["send-btn"]}
          >
            <Image
              src={sendicon}
              alt="send"
              className={styles["send-icon"]}
            />
          </button>
        )}
        </div>
      </form>
    </div>
  );
}
