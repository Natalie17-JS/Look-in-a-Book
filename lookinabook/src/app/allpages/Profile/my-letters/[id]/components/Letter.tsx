'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_MESSAGE_BY_ID } from '@/app/GraphqlOnClient/queries/messageQueries';
import { MessageType, Message } from '@/app/types/messageTypes';
import { useEffect } from 'react';
import { MARK_MESSAGE_AS_READ } from '@/app/GraphqlOnClient/mutations/messageMutations';
import { format } from "date-fns"
import styles from "./Letter.module.css"
import { useToken } from '@/app/hooks/useToken';

const Letter = () => {
  const { id } = useParams();
  const messageId = Number(id);
  console.log("letterId:", messageId)
const {accesstoken} = useToken()
  

  const { data, loading, error } = useQuery<{ getMessageById: Message }>(GET_MESSAGE_BY_ID, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    variables: { id: messageId },
    skip: isNaN(messageId) || !accesstoken,
  });

  const [markAsRead] = useMutation(MARK_MESSAGE_AS_READ, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
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
