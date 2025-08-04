"use client"

import ChatMessages from "./my-messages/GetChatMessages"
import MessageForm from "@/app/allpages/authors/[id]/new-letter/components/LetterForm"
import { useUser } from "@/app/context/authContext"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

export default function ChatPage() {
  const { chatId } = useParams();
  const numericChatId = Number(chatId);
  const { user } = useUser();
  const userId = user?.id;

  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { chatId: numericChatId },
    skip: !numericChatId,
  });

  if (!userId || !numericChatId) return <p>Loading...</p>;
  if (loading) return <p>Loading chat participants...</p>;
  if (error) return <p>Error loading chat: {error.message}</p>;

  const participants = data.getChat.users;
  const recipient = participants.find((u: any) => u.id !== userId);

  if (!recipient) return <p>Recipient not found.</p>;
  return (
    <div>
      <ChatMessages chatId={chatId} currentUserId={userId} />
      <MessageForm recipientId={userId} chatId={chatId} type="MESSAGE" />
    </div>
  );
}