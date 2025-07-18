"use client"

import { useMutation, useQuery } from "@apollo/client"
import { GET_MY_FOLLOWERS, GET_MY_FOLLOWING, GET_USER_BY_ID } from "@/app/GraphqlOnClient/queries/userQueries"
//import { useEffect } from "react"
import { useParams } from "next/navigation";
import { formatLastActive } from "./LastActive";
import { Book } from "@/app/types/bookTypes";
import { Post } from "@/app/types/postTypes";
import styles from "./Author.module.css"
import bookstyles from "@/app/allpages/profile/profileComponents/my-books/MyBooks.module.css"
import UserWindow from "../../components/UserWindow";
import Link from "next/link";
import PostCard from "@/app/allpages/blog/[id]/components/Post";
import { SUBSCRIBE_TO_USER } from "@/app/GraphqlOnClient/mutations/subscriptionMutation";
import { useToken } from "@/app/hooks/useToken";
import { User } from "@/app/types/userTypes";
import { useMemo } from "react";

export default function GetAuthor() {
    const params = useParams();
  const userId = Number(params.id); 
  const shouldSkip = !userId || isNaN(userId);
  const {accesstoken} = useToken()

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: shouldSkip,
    fetchPolicy: 'network-only',
    pollInterval: 10000, // Обновляет данные каждые 10 секунд
    
  });

  const [subscribeToUser, {loading: subscribeLoading}] = useMutation(SUBSCRIBE_TO_USER, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      }
    }
  })

  const { data: myFollowersData, loading: followersLoading } = useQuery(GET_MY_FOLLOWERS, {
  context: {
    headers: {
      Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
    },
  },
  skip: !accesstoken,
});

  const { data: myFollowingsData, loading: followingsLoading, refetch: refetchFollowings } = useQuery(GET_MY_FOLLOWING, {
  context: {
    headers: {
      Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
    },
  },
  skip: !accesstoken,
});

const myFollowingsIds = useMemo(() => {
  return myFollowingsData?.getMyFollowing?.map((u: User) => u.id) || [];
}, [myFollowingsData]);

const myFollowersIds = useMemo(() => {
  return myFollowersData?.getMyFollowers?.map((u: User) => u.id) || [];
}, [myFollowersData]);

const isAlreadyFollowing = useMemo(() => {
  return myFollowingsIds.includes(userId);
}, [myFollowingsIds, userId]);

const isFollowedByUser = useMemo(() => {
  return myFollowersIds.includes(userId);
}, [myFollowersIds, userId]);

const isMutualFollow = useMemo(() => {
  return isAlreadyFollowing && isFollowedByUser;
}, [isAlreadyFollowing, isFollowedByUser]);


  
  const handleSubscribe = async(userId: number) => {
    try{
      await subscribeToUser({variables: {userId}})
      console.log("You subscribed to user with id", userId)
      await refetchFollowings(); // обновим список
    } catch (err) {
      console.error("Error subscribing to this user:", err);
    }
  }

  if (userLoading) return <p>Loading user...</p>;
  if (userError) return <p>Error: {userError.message}</p>;
  if (!userData?.getUser) return <p>User not found</p>;

  const user = userData.getUser;
  console.log(user);


return (
  <div className={styles["account-container"]}>

    <div className={styles["user-info"]}>
    <h1 className={styles.username}>{user.username}</h1>
    <h3>{user.bio}</h3>
    <p>
      {user.isOnline ? (
        <span>🟢 At office</span>
      ) : (
        <span>{formatLastActive(user.lastActive)}</span>
      )}
    </p>
    <UserWindow isOnline={user.isOnline} />
    </div>

<div className={`${styles["books-posts"]} ${styles.bookslist}`}>
    <h3>Books:</h3>
    {user.books.length > 0 ? (
      <ul className={bookstyles.books}>
        {user.books.map((book: Book) => (
          <li className={bookstyles.book} key={book.id}>
             <Link style={{textDecoration: "none"}} href={`/allpages/books/${book.slug}`}>
                          <div className={bookstyles.bookInner}>
                      <h2 className={bookstyles.bookTitle}>{book.title}</h2>
                    </div>
                        </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>No books yet.</p>
    )}

   
    {user.posts.length > 0 ? (
      <ul className={styles.postslist}>
         <h3>Posts:</h3>
        {user.posts.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    ) : (
      <p>No posts yet.</p>
    )}
    </div>

    <div className={styles.door}>
      <div className={styles.handtag}></div>
<div className={styles["ondoor-things"]}>
  {isAlreadyFollowing ? (
  <button disabled className={styles.followingBtn}>Following</button>
) : (
  <button 
    disabled={subscribeLoading}
    onClick={() => handleSubscribe(userId)}>
    {subscribeLoading ? "Subscribing..." : "Knock and subscribe"}
  </button>
)}
 {isMutualFollow ? (
  <Link href={`/chat/${userId}`}>
    <button>Send a message</button>
  </Link>
) : (
  <div className={styles.mailbox}>
    <Link href={`/allpages/authors/${userId}/new-letter`}>
      <button>Send a letter</button>
    </Link>
    <div className={styles.hole}></div>
  </div>
)}

</div>
    </div>
  </div>
);

};

