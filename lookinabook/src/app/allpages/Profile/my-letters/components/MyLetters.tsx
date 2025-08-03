
'use client';

import { useQuery } from '@apollo/client';
import { GET_USER_READ_LETTERS, GET_USER_UNREAD_LETTERS, UNREAD_LETTERS_COUNT, GET_USER_SENT_LETTERS } from "@/app/GraphqlOnClient/queries/letterQueries"
import React, { useState } from 'react';
import { Letter } from '@/app/types/letterTypes';
import Image from 'next/image';
import letterimage from "@/app/images/letter.svg"
import styles from "./Letters.module.css"
import Link from 'next/link';
import {useToken} from "@/app/hooks/useToken"

const UserLetters = () => {
  const [selectedTab, setSelectedTab] = useState<'received' | 'unread' | 'sent'>('received');
   const {accesstoken, isLoading} = useToken()
  const { data: readLettersData, loading: loadingRead } = useQuery<{ getUserReadLetters: Letter[] }>(GET_USER_READ_LETTERS, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    skip: !accesstoken || isLoading,
  });

    const { data: unreadLettersData, loading: loadingUnread } = useQuery<{ getUserUnreadLetters: Letter[] }>(GET_USER_UNREAD_LETTERS, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    skip: !accesstoken || isLoading,
  });

    const { data: sentLettersData, loading: loadingSent } = useQuery<{ getUserSentLetters: Letter[] }>(GET_USER_SENT_LETTERS, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
    skip: !accesstoken || isLoading,
  });

  const { data: unreadLettersCountData, loading: loadingUnreadCount } = useQuery<{ countUnreadLetters: number }>(UNREAD_LETTERS_COUNT, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      },
    },
    skip: !accesstoken || isLoading,
  });

  if (loadingRead || loadingSent || loadingUnread || loadingUnreadCount) return <p>Loading letters...</p>;

const receivedLetters = readLettersData?.getUserReadLetters || [];
  const sentLetters = sentLettersData?.getUserSentLetters || [];
  const unreadLetters = unreadLettersData?.getUserUnreadLetters || [];
  const unreadCount = unreadLettersCountData?.countUnreadLetters || 0;

  // --- какие письма показывать
  let lettersToShow: Letter[] = [];
  if (selectedTab === "received") {
    lettersToShow = receivedLetters;
  } else if (selectedTab === "sent") {
    lettersToShow = sentLetters;
  } else if (selectedTab === 'unread') {
  lettersToShow = unreadLetters;
  }

  return (
    <div>
     <h2>
      Letters: ({lettersToShow.length}) | Unread: {unreadCount}
    </h2>

    <div className={styles["tabs"]}>
      <button
        className={selectedTab === "received" ? styles["active-tab"] : ""}
        onClick={() => setSelectedTab("received")}
      >
        Received
      </button>
      <button
        className={selectedTab === "unread" ? styles["active-tab"] : ""}
        onClick={() => setSelectedTab("unread")}
      >
        Unread ({unreadCount})
      </button>
      <button
        className={selectedTab === "sent" ? styles["active-tab"] : ""}
        onClick={() => setSelectedTab("sent")}
      >
        Sent
      </button>
    </div>

    {lettersToShow.length === 0 ? (
      <p>No letters yet.</p>
    ) : (
      <ul className={styles["letters-container"]}>
        {lettersToShow.map((letter) => (
          <li key={letter.id} className={styles["letter-card"]}>
            <Link href={`/allpages/profile/my-letters/${letter.id}`}>
              <Image
                src={letterimage}
                alt="Letter"
                className={styles["letter-image"]}
              />
              <div className={styles["sender-info"]}>
                {selectedTab === "sent" ? "To" : "From"}:{" "}
            <span className={styles["sender-name"]}>
              {selectedTab === "sent"
                ? letter.recipient?.username || "Unknown"
                : letter.sender?.username || "Unknown"}
            </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )}
    </div>
  );
};

export default UserLetters;
