"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import toast from 'react-hot-toast';
import { CREATE_MESSAGE } from "@/app/GraphqlOnClient/mutations/messageMutations";
import { useToken } from "@/app/hooks/useToken";
import styles from "./MessageForm.module.css"
import Image from "next/image";
import sendicon from "@/app/images/send-icon.svg"

interface MessageFormProps {
  chatId: number;
}

export default function MessageForm({ chatId }: MessageFormProps) {
  const { accesstoken } = useToken();
  const [text, setText] = useState("");

  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      await createMessage({
        variables: {
          text,
          chatId,
        },
      });

      toast.success("Message sent!");
      setText(""); // остаемся в чате
    } catch (err) {
      toast.error("Failed to send message.");
    }
  };

  return (
    <div>
     
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
        className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message..."
          rows={6}
          required
        />
         <button
        type="submit"
        disabled={loading}
        className={styles["send-btn"]}
      >
        <Image src={sendicon} alt="send" className={styles["send-icon"]}/>
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}
