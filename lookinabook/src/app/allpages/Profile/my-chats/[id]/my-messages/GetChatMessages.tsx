// components/ChatMessages.tsx

import { useQuery } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "@/app/GraphqlOnClient/queries/messageQueries";
import { useUser } from "@/app/context/authContext";

interface ChatMessagesProps {
  chatId: number;
}

export default function ChatMessages({ chatId }: ChatMessagesProps) {
  const {user} = useUser()
    const currentUserId = user?.id;

  if (!chatId) return <p>Loading chat...</p>;

  const { data, loading, error } = useQuery( GET_CHAT_MESSAGES, {
    variables: { chatId },
    skip: !chatId,
    pollInterval: 5000, // автообновление каждую 5 сек
  });

  if (loading) return <p>Loading chat...</p>;
  if (error) return <p>Error loading messages: {error.message}</p>;

  //const messages = data.chat.messages;
  const messages = data.getChatMessages;

  if (!messages || messages.length === 0) {
    return <p>No messages yet.</p>;
  }



  return (
    <ul>
      {messages.map((msg: any) => (
        <li
          key={msg.id}
          style={{
            textAlign: msg.sender.id === currentUserId ? "right" : "left",
            margin: "0.5rem 0",
          }}
        >
          <strong>{msg.sender.username}</strong>: {msg.text}
          <br />
          <small>{new Date(msg.createdAt).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}
