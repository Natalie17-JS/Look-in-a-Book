
'use client';

import { useQuery } from '@apollo/client';
import { GET_USER_MESSAGES, UNREAD_LETTERS_COUNT } from "@/app/GraphqlOnClient/queries/messageQueries"
import React from 'react';
import { Message, MessageType } from '@/app/types/messageTypes';
import Image from 'next/image';
import letter from "@/app/images/letter.svg"
import styles from "./Letters.module.css"

const UserLetters = () => {
  const { data: messagesData, loading: loadingMessages } = useQuery<{ getUserMessages: Message[] }>(GET_USER_MESSAGES);
  const { data: unreadData, loading: loadingUnread } = useQuery<{ countUnreadMessages: number }>(UNREAD_LETTERS_COUNT);

  if (loadingMessages || loadingUnread) return <p>Loading letters...</p>;

  const allMessages = messagesData?.getUserMessages || [];
  const letters = allMessages.filter((msg) => msg.type === MessageType.LETTER);
  const unreadCount = unreadData?.countUnreadMessages || 0;

  return (
    <div>
      <h2>
        <Image src={letter} alt="letter" className={styles["letter-image"]}/>
        Letters: ({letters.length}) | Unread: {unreadCount}
      </h2>
      {letters.length === 0 && <p>No letters yet.</p>}
      <ul>
        {letters.map((message) => (
          <li key={message.id} className={`p-3 border rounded ${message.isRead ? '' : 'bg-yellow-100'}`}>
            <p>From: {message.senderId}</p>
            <p>{message.text}</p>
            <p>{new Date(message.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserLetters;
