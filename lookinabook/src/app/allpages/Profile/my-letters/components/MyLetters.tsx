
'use client';

import { useQuery } from '@apollo/client';
import { GET_USER_LETTERS, UNREAD_LETTERS_COUNT } from "@/app/GraphqlOnClient/queries/messageQueries"
import React from 'react';
import { Message } from '@/app/types/messageTypes';
import Image from 'next/image';
import letterimage from "@/app/images/letter.svg"
import styles from "./Letters.module.css"
import Link from 'next/link';
import {useToken} from "@/app/hooks/useToken"

const UserLetters = () => {
   const {accesstoken, isLoading} = useToken()
  const { data: lettersData, loading: loadingMessages } = useQuery<{ getUserLetters: Message[] }>(GET_USER_LETTERS, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    skip: !accesstoken || isLoading,
  });
  const { data: unreadLettersData, loading: loadingUnread } = useQuery<{ countUnreadLetters: number }>(UNREAD_LETTERS_COUNT, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    skip: !accesstoken || isLoading,
  });

  if (loadingMessages || loadingUnread) return <p>Loading letters...</p>;

  const letters = lettersData?.getUserLetters || [];
  const unreadCount = unreadLettersData?.countUnreadLetters || 0;

  return (
    <div>
      <h2>
        Letters: ({letters.length}) | Unread: {unreadCount}
      </h2>
      {letters.length === 0 && <p>No letters yet.</p>}

      <ul className={styles["letters-container"]}>
        {letters.map((letter) => (
          <li key={letter.id} className={styles["letter-card"]}>
            <Link href={`/allpages/profile/my-letters/${letter.id}`}>
            <Image
              src={letterimage}
              alt="Letter"
              className={styles["letter-image"]}
            />
            <div className={styles["sender-info"]}>
              From: <span className={styles["sender-name"]}>{letter.sender?.username || "Unknown"}</span>
            </div>
            </Link>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default UserLetters;
