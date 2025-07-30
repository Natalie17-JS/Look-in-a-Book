"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT } from "@/app/GraphqlOnClient/mutations/messageMutations";
import { useToken } from "@/app/hooks/useToken";

export default function StartChatButton({ recipientId }: { recipientId: number }) {
  const router = useRouter();
  const { accesstoken } = useToken();

  const [createChat, { loading }] = useMutation(CREATE_CHAT, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
  });

  const handleClick = async () => {
    try {
      const { data } = await createChat({
        variables: { recipientId },
      });

      const chatId = data.createChat.id;
      router.push(`/allpages/profile/my-chats/${chatId}`);
    } catch (error) {
      console.error("Failed to start chat", error);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Starting..." : "Send a message"}
    </button>
  );
}
