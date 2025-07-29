"use client"

import ChatMessages from "./my-messages/GetChatMessages"
import MessageForm from "@/app/allpages/authors/[id]/new-letter/components/MessageForm"
import { useUser } from "@/app/context/authContext"
import { useQuery } from "@apollo/client"

export default function ChatPage({ chatId }: { chatId: number }) {
    const {user} = useUser()
    const userId = user?.id

    return (
    <div>
      <ChatMessages chatId={chatId} currentUserId={userId} />
      <MessageForm recipientId={userId} chatId={chatId} type="MESSAGE" />
    </div>
  );
    
}