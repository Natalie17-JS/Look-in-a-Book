// components/UserMessages.tsx

'use client';

import { useQuery } from '@apollo/client';
import { GET_USER_MESSAGES, UNREAD_MESSAGES_COUNT } from "@/app/GraphqlOnClient/queries/messageQueries"
import React from 'react';
import { Message } from '@/app/types/messageTypes';
import Image from 'next/image';
import letter from "@/app/images/letter.svg"
import styles from "./Messages.module.css"

const UserLetters = () => {
  const { data: messagesData, loading: loadingMessages } = useQuery<{ getUserMessages: Message[] }>(GET_USER_MESSAGES);
  const { data: unreadData, loading: loadingUnread } = useQuery<{ countUnreadMessages: number }>(UNREAD_MESSAGES_COUNT);

  if (loadingMessages || loadingUnread) return <p>Loading messages...</p>;

  const messages = messagesData?.getUserMessages || [];
  const unreadCount = unreadData?.countUnreadMessages || 0;

  return (
    <div>
      <h2>
        <Image src={letter} alt="letter" className={styles["letter-image"]}/>
        Messages ({messages.length}) | Unread: {unreadCount}
      </h2>
      {messages.length === 0 && <p>No messages yet.</p>}
      <ul>
        {messages.map((message) => (
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
