"use client"

import { useMutation, useQuery } from "@apollo/client"
import { GET_USER_CHATS } from "@/app/GraphqlOnClient/queries/messageQueries"
import { useToken } from "@/app/hooks/useToken"
import { useUser } from "@/app/context/authContext"
import { Chat } from "@/app/types/messageTypes"
import Link from "next/link"
import Image from "next/image"
import chatday from "@/app/images/chat-day.svg"
import chatnight from "@/app/images/chat-night.svg"
import styles from "./MyChats.module.css"
import { useTheme } from "@/app/context/themeContext"
import { MARK_MESSAGES_AS_READ } from "@/app/GraphqlOnClient/mutations/messageMutations"
import { useEffect } from "react"
import { useParams } from "next/navigation"

export default function Chats(){
    const {accesstoken} = useToken()
    const {user} = useUser()
    const {theme} = useTheme()
    const params = useParams();
    const chatId = Number(params.id);

    let chaticon;
  switch (theme) {
    case "dark":
      chaticon = chatnight;
      break;
    case "gray":
      chaticon = chatday;
      break;
    default:
      chaticon = chatday;
  }

const {data: chatData, loading: chatLoading} = useQuery<{getUserChats: Chat[]}>(GET_USER_CHATS, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    skip: !accesstoken
})
const [markAsRead] = useMutation(MARK_MESSAGES_AS_READ,{
   context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
});

/*useEffect(() => {
    if (chatId) {
      markAsRead({ variables: { chatId } });
    }
  }, [chatId, markAsRead]);*/
  useEffect(() => {
  if (chatId) {
    markAsRead({
      variables: { chatId },
      update: (cache, { data }) => {
        const readCount = data?.markMessagesAsRead;

        if (readCount > 0) {
          cache.modify({
            fields: {
              getUserChats(existingChats = []) {
                return existingChats.map((chat: Chat) => {
                  if (chat.id === chatId) {
                    return {
                      ...chat,
                      unreadCount: 0 // сразу обнуляем
                    };
                  }
                  return chat;
                });
              }
            }
          });
        }
      }
    });
  }
}, [chatId, markAsRead]);

if (chatLoading) return <p>Loading letters...</p>;
const chats = chatData?.getUserChats || [];
if (chats.length === 0) return <p>No chats yet.</p>;

return (
    <ul className={styles["chats-list"]}>
      {chats.map((chat) => {
        // участники, кроме самого пользователя
        const otherParticipants = chat.participants.filter(
          (p) => p.user.id !== user?.id
        );
        const names = otherParticipants
          .map((p) => p.user.username)
          .join(", ");

        // последнее сообщение (мы отдавали его сервером через take: 1)
        const lastMessage = chat.messages[0];

        return (
          <li
            key={chat.id}
            className={styles["chat-card"]}
          >
            <Link style={{"textDecoration": "none", "color": "inherit"}} href={`/allpages/profile/my-chats/${chat.id}`}>
            <Image
            src={chaticon}
            alt="Chat"
            className={styles["chat-image"]}
            />
            <div className={styles["chat-info"]}>
              <div className={styles["chat-names"]}>Chat with: {names || "You"}</div>
                {lastMessage ? (
        <p className={styles["last-message"]}>
          {lastMessage.text.length > 20
            ? lastMessage.text.slice(0, 20) + "..."
            : lastMessage.text}
        </p>
      ) : (
        <p></p>
        
              )}
              {chat.unreadCount > 0 && (
              <span className={styles.undreadcount}>{chat.unreadCount}</span>
            )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
