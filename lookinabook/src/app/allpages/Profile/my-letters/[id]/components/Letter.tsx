'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_MESSAGE_BY_ID } from '@/app/GraphqlOnClient/queries/messageQueries';
import { MessageType, Message } from '@/app/types/messageTypes';
import { useEffect } from 'react';
import { MARK_MESSAGE_AS_READ } from '@/app/GraphqlOnClient/mutations/messageMutations';
import { format } from "date-fns"
import styles from "./Letter.module.css"

const Letter = () => {
  const { id } = useParams();
  const messageId = Number(id);
  console.log("letterId:", messageId)

  const accessToken = localStorage.getItem("token");

  const { data, loading, error } = useQuery<{ getMessageById: Message }>(GET_MESSAGE_BY_ID, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "", 
      },
    },
    variables: { id: messageId },
    skip: isNaN(messageId),
  });

  const [markAsRead] = useMutation(MARK_MESSAGE_AS_READ, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "", 
      },
    }
  }
  );

  // Mark as read if unread and type is LETTER
  useEffect(() => {
    if (data?.getMessageById && !data.getMessageById.isRead && data.getMessageById.type === MessageType.LETTER) {
      markAsRead({ variables: { id: messageId } });
    }
  }, [data, markAsRead, messageId]);

  if (loading) return <p>Loading letter...</p>;
  if (error || !data?.getMessageById) return <p>Letter not found.</p>;

  const letter = data.getMessageById;

  if (letter.type !== MessageType.LETTER) return <p>This is not a letter.</p>;

  return (
   <div className={styles["letter-inwardly-container"]}>
      <div className={styles.letter}>
        <p>From: <strong>{letter.sender.username}</strong></p>
        <p>Received: {format(new Date(letter.createdAt), "dd.MM.yyyy HH:mm")}</p>
        <div className={styles["letter-content"]}>{letter.text}</div>
      </div>
 </div>
  );
};

export default Letter;
