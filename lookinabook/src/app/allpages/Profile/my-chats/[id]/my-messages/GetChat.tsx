"use client"

import ChatMessages from "./GetChatMessages"
import MessageForm from "@/app/allpages/authors/[id]/new-message/components/MessageForm"
import { useUser } from "@/app/context/authContext"
import { GET_CHAT } from "@/app/GraphqlOnClient/queries/messageQueries"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { useToken } from "@/app/hooks/useToken"

export default function Chat() {
  const params  = useParams();
  const chatId = Number(params.id);
  const { user } = useUser();
  const userId = user?.id;
  const {accesstoken} = useToken()

  const { data, loading, error } = useQuery(GET_CHAT, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    variables: { chatId: chatId },
    skip: !chatId || !accesstoken,
  });

  if (isNaN(chatId)) {
  return <p>Invalid chat ID format</p>;
}

  if (!userId || !chatId) return <p>Loading...</p>;
  if (loading) return <p>Loading chat participants...</p>;
  if (error) return <p>Error loading chat: {error.message}</p>;

  const participants = data?.getChat?.participants ?? [];

  if (!Array.isArray(participants) || participants.length === 0) {
    return <p>No participants found in this chat</p>;
  }
  const recipient = participants.find((p: any) => p.user.id !== userId);

  if (!recipient) return <p>Recipient not found.</p>;

  return (
    <div>
      <ChatMessages chatId={chatId} />
      <MessageForm chatId={chatId} />
    </div>
  );
}