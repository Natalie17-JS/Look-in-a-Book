'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_MESSAGE } from '@/app/GraphqlOnClient/mutations/messageMutations';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useUser } from '@/app/context/authContext';
import { useToken } from '@/app/hooks/useToken';

interface MessageFormProps {
  recipientId?: number;
  type: 'MESSAGE' | 'LETTER';
  chatId?: number;
}

export default function MessageForm({ recipientId, type, chatId }: MessageFormProps) {
  const router = useRouter();
  const { accesstoken } = useToken();

  const [text, setText] = useState("");

  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Please enter your message.");
      return;
    }

    try {
      await createMessage({
        variables: {
          text,
          recipientId,
          type,
        },
      });

      toast.success("Message sent successfully!");

      if (type === "LETTER") {
        router.push(`/allpages/authors/${recipientId}`);
      } else {
        setText(""); // Очищаем поле, остаемся в чате
      }
    } catch (err) {
      toast.error("Failed to send message.");
    }
  };


  return (
    <div>
      <h1>{type === "LETTER" ? "Send a Letter" : "Send a Message"}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message..."
          rows={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
<Link href={`/allpages/authors/${recipientId}`}>
        <button>Back</button>
        </Link>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
