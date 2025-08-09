"use client"

import { useQuery } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "@/app/GraphqlOnClient/queries/messageQueries";
import { useUser } from "@/app/context/authContext";
import { useToken } from "@/app/hooks/useToken";
import styles from "./Chat.module.css"
import DeleteMessageButton from "./DeleteMsgBtn";

interface ChatMessagesProps {
  chatId: number;
  onEditClick: (id: number, text: string) => void;
}

export default function ChatMessages({ chatId, onEditClick }: ChatMessagesProps) {
  const {user} = useUser()
    const currentUserId = user?.id;
    const {accesstoken} = useToken()
    

  if (!chatId) return <p>Loading chat...</p>;

  const { data, loading, error } = useQuery( GET_CHAT_MESSAGES, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    variables: { chatId },
    skip: !chatId || !accesstoken,
    pollInterval: 5000, // автообновление каждую 5 сек
  });

  if (loading) return <p>Loading chat...</p>;
  if (error) return <p>Error loading messages: {error.message}</p>;

  //const messages = data.chat.messages;
  const messages = data?.getChatMessages;

  if (!messages || messages.length === 0) {
    return <p>No messages yet.</p>;
  }



  return (
  <ul className={styles["messages-list"]}>
  {messages.map((msg: any) => {
    const isOwnMessage = msg.sender.id === currentUserId;
    return (
      <li
        key={msg.id}
        className={`${styles["message-item"]} ${
          isOwnMessage ? styles.sent : styles.received
        }`}
      >
        <strong>{msg.sender.username}</strong>: {msg.text}
        <br />
        <small className={styles.smalltext}>{new Date(msg.createdAt).toLocaleString()}</small>

        {isOwnMessage && (
          <div className={styles["control-buttons"]}>
              <button
                className={styles["edit-btn"]}
                onClick={() => onEditClick(msg.id, msg.text)}
              >
                ✏️
              </button>
            
            <DeleteMessageButton messageId={msg.id}/>
            </div>
            )}
      </li>
    );
  })}
</ul>

  );
}
