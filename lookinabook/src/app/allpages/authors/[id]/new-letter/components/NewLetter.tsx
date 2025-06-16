'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_MESSAGE } from '@/app/GraphqlOnClient/mutations/messageMutations';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useUser } from '@/app/context/authContext';
import { useToken } from '@/app/hooks/useToken';

export default function NewLetter() {
  const {user} = useUser()
 const params = useParams();
  const recipientId = Number(params.id); 
  const router = useRouter();
  console.log('Recipient ID:', recipientId);
  const {accesstoken} = useToken()

  const [text, setText] = useState('');
  const [type] = useState<'LETTER'>('LETTER'); // по умолчанию LETTER, можно сделать селектор

   
  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    context: {
      headers: {
        Authorization: accesstoken ? `bearer ${accesstoken}` : "",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientId || isNaN(recipientId)) {
      toast.error("Invalid recipient.");
      return;
    }

    if (!text.trim()) {
      toast.error("Please enter your letter.");
      return;
    }

    if (!user) {
      toast.error("Please sign in")
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
      toast.success("Your letter was successfully sent!");
      router.push(`/allpages/authors/${recipientId}`); // после отправки можно перенаправить куда нужно
    } catch (err) {
      toast.error("An error occurred while sending a letter.");
    }
  };

  return (
    <div>
      <h1>Send a Message</h1>
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
