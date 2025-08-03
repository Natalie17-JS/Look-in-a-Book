'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_LETTER_BY_ID } from '@/app/GraphqlOnClient/queries/letterQueries';
import { Letter } from '@/app/types/letterTypes';
import { useEffect, useState } from 'react';
import { MARK_LETTER_AS_READ } from '@/app/GraphqlOnClient/mutations/letterMutations';
import { format } from "date-fns"
import styles from "./Letter.module.css"
import { useToken } from '@/app/hooks/useToken';
import ReplyToLetterForm from './ReplyToLetter';
import { useUser } from '@/app/context/authContext';

const UserLetter = () => {
  const {user} = useUser()
  const { id } = useParams();
  const messageId = Number(id);
  console.log("letterId:", messageId)
const {accesstoken} = useToken()
  const [localReplies, setLocalReplies] = useState<Letter[]>([]);

  const userId = user?.id;

  const { data, loading, error, refetch  } = useQuery<{ getMessageById: Letter }>(GET_LETTER_BY_ID, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    variables: { id: messageId },
    skip: isNaN(messageId) || !accesstoken,
  });

  const [markAsRead] = useMutation(MARK_LETTER_AS_READ, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    }
  }
  );

   // При загрузке письма заполняем replies
  useEffect(() => {
    if (data?.getMessageById) {
      setLocalReplies(data.getMessageById.replies);
    }
  }, [data]);

  // Mark as read if unread and type is LETTER
  useEffect(() => {
    if (data?.getMessageById && 
    !data.getMessageById.isRead && 
    data.getMessageById.sender.id !== userId
    ) {
      markAsRead({ variables: { id: messageId } });
    }
  }, [data, markAsRead, messageId, userId]);

  if (loading) return <p>Loading letter...</p>;
  if (error || !data?.getMessageById) return <p>Letter not found.</p>;

  const letter = data.getMessageById;
  const isSentByMe = letter.sender.id === userId;


   // Проверка: можно ли ответить на письмо
  //const canReply = letter.replies.length === 0;
   // Можно ли ответить?
  const canReply = localReplies.length === 0 && !isSentByMe;

  return (
   <div className={styles["letter-inwardly-container"]}>
      <div className={styles.letter}>
        <p>
    {isSentByMe ? "To" : "From"}: <strong>{isSentByMe ? letter.recipient.username : letter.sender.username}</strong>
  </p>
        <p>Received: {format(new Date(letter.createdAt), "dd.MM.yyyy HH:mm")}</p>
        <div className={styles["letter-content"]}>{letter.text}</div>
      </div>

      {localReplies.length > 0 && (
        <div className={styles.reply}>
          <h4>Your reply:</h4>
          <div>{localReplies[0].text}</div>
        </div>
      )}

      {/* Форма ответа, если ещё не отвечали */}
      {!isSentByMe && (
  canReply ? (
    <ReplyToLetterForm
      replyToId={messageId}
      onReplySent={(newReply) => setLocalReplies([newReply])}
      refetchLetter={refetch}
    />
  ) : (
    <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
      You’ve already replied to this letter.
    </p>
  )
)}

 </div>
  );
};

export default UserLetter;
