'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_MESSAGE_BY_ID } from '@/app/GraphqlOnClient/queries/messageQueries';
import { MessageType, Message } from '@/app/types/messageTypes';
import { useEffect } from 'react';
import { MARK_MESSAGE_AS_READ } from '@/app/GraphqlOnClient/mutations/messageMutations';

const LetterPage = () => {
  const { id } = useParams();
  const messageId = Number(id);

  const { data, loading, error } = useQuery<{ getMessageById: Message }>(GET_MESSAGE_BY_ID, {
    variables: { id: messageId },
    skip: isNaN(messageId),
  });

  const [markAsRead] = useMutation(MARK_MESSAGE_AS_READ);

  // Mark as read if unread and type is LETTER
  useEffect(() => {
    if (data?.getMessageById && !data.getMessageById.isRead && data.getMessageById.type === MessageType.LETTER) {
      markAsRead({ variables: { id: messageId } });
    }
  }, [data, markAsRead, messageId]);

  if (loading) return <p>Loading letter...</p>;
  if (error || !data?.getMessageById) return <p>Letter not found.</p>;

  const message = data.getMessageById;

  if (message.type !== MessageType.LETTER) return <p>This is not a letter.</p>;

  return (
    <div>
      <h1>📩 Letter</h1>
      <div>
        <p>From User ID: <strong>{message.senderId}</strong></p>
        <p>Received: {new Date(message.createdAt).toLocaleString()}</p>
        <div>{message.text}</div>
      </div>
    </div>
  );
};

export default LetterPage;
