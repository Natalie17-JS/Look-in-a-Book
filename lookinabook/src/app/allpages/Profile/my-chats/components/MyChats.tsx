"use client"

import { useQuery } from "@apollo/client"
import { GET_USER_CHATS } from "@/app/GraphqlOnClient/queries/messageQueries"
import { useToken } from "@/app/hooks/useToken"
import { useUser } from "@/app/context/authContext"
import { Chat } from "@/app/types/messageTypes"
import Link from "next/link"

export default function Chats(){
    const {accesstoken} = useToken()
    const {user} = useUser()

const {data: chatData, loading: chatLoading} = useQuery<{getUserChats: Chat[]}>(GET_USER_CHATS, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    skip: !accesstoken
})

if (chatLoading) return <p>Loading letters...</p>;
const chats = chatData?.getUserChats || [];
if (chats.length === 0) return <p>No chats yet.</p>;

return (
    <ul>
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
          >
            <Link href={`/allpages/profile/my-chats/${chat.id}`}>
              <div>{names || "You"}</div>
                {lastMessage ? (
        <p>
          {lastMessage.text.length > 20
            ? lastMessage.text.slice(0, 20) + "..."
            : lastMessage.text}
        </p>
      ) : (
        <p></p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
