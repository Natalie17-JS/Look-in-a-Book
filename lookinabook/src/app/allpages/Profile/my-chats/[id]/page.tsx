"use client"

import ChatMessages from "./my-messages/GetChatMessages"
import MessageForm from "@/app/allpages/authors/[id]/new-message/components/MessageForm"
import { useUser } from "@/app/context/authContext"
import { GET_CHAT } from "@/app/GraphqlOnClient/queries/messageQueries"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

export default function ChatPage() {
  const params  = useParams();
  const chatId = Number(params.id);
  const { user } = useUser();
  const userId = user?.id;

  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { chatId: chatId },
    skip: !chatId,
  });

  if (isNaN(chatId)) {
  return <p>Invalid chat ID format</p>;
}

  if (!userId || !chatId) return <p>Loading...</p>;
  if (loading) return <p>Loading chat participants...</p>;
  if (error) return <p>Error loading chat: {error.message}</p>;

  const participants = data.getChat.users;
  const recipient = participants.find((u: any) => u.id !== userId);

  if (!recipient) return <p>Recipient not found.</p>;
  return (
    <div>
      <ChatMessages chatId={chatId} />
      <MessageForm chatId={chatId} />
    </div>
  );
}