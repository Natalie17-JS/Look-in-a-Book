"use client"

import ChatMessages from "./GetChatMessages"
import MessageForm from "@/app/allpages/authors/[id]/new-message/components/MessageForm"
import { useUser } from "@/app/context/authContext"
import { GET_CHAT } from "@/app/GraphqlOnClient/queries/messageQueries"
import { useMutation, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { useToken } from "@/app/hooks/useToken"
import styles from "./Chat.module.css"
import { useEffect, useState } from "react"
import { Message } from "@/app/types/messageTypes"
import { MARK_MESSAGES_AS_READ } from "@/app/GraphqlOnClient/mutations/messageMutations"
import { Chat } from "@/app/types/messageTypes"

export default function UserChat() {
  const params  = useParams();
  const chatId = Number(params.id);
  const { user } = useUser();
  const userId = user?.id;
  const {accesstoken} = useToken()
   const [replyTo, setReplyTo] = useState<Message | null>(null);

   const [editingMessage, setEditingMessage] = useState<{
    id: number;
    text: string;
  } | null>(null);

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

const [markAsRead] = useMutation(MARK_MESSAGES_AS_READ,{
   context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
});

/*useEffect(() => {
   if (!userId || !chatId) return;

    if (!loading && data?.getChat?.messages?.length) {
      const hasUnread = data.getChat.messages.some(
        (msg: Message) => !msg.isRead && msg.senderId !== userId
      );

      if (hasUnread) {
        markAsRead({ variables: { chatId } });
      }
    }
  }, [loading, data, chatId, userId, markAsRead]);*/

 useEffect(() => {
  if (!chatId || !userId || !data?.getChat?.messages?.length) return;

  const hasUnread = data.getChat.messages.some(
    (msg: Message) => !msg.isRead && msg.senderId !== userId
  );

  if (hasUnread) {
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
                      unreadCount: 0
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
}, [chatId, data, userId, markAsRead]);


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
    <div className={styles["chat-inside-container"]}>
      <ChatMessages chatId={chatId}  onEditClick={(id, text) => setEditingMessage({ id, text })} onReplyClick={setReplyTo}/>
      <MessageForm chatId={chatId} editingMessage={editingMessage}
        onCancelEdit={() => setEditingMessage(null)} replyTo={replyTo} clearReply={() => setReplyTo(null)}
        onMessageUpdated={(id, newText) => {
          setEditingMessage(null);
        }}
         
        />
    </div>
  );
}