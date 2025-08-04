'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_LETTER } from '@/app/GraphqlOnClient/mutations/letterMutations';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useToken } from '@/app/hooks/useToken';

interface LetterFormProps {
  recipientId: number;
}

export default function LetterForm({ recipientId}: LetterFormProps) {
  const router = useRouter();
  const { accesstoken } = useToken();
  const [text, setText] = useState("");

  const [createLetter, { loading, error }] = useMutation(CREATE_LETTER, {
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
      await createLetter({
        variables: {
          text,
          recipientId,
        },
      });

      toast.success("Letter sent successfully!")
      router.push(`/allpages/authors/${recipientId}`);
    } catch (err) {
      toast.error("Failed to send this letter.");
    }
  };


  return (
    <div>
      <h1>Send a letter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your letter text..."
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
