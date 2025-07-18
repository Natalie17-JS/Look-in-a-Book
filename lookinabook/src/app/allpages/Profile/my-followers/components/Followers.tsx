"use client"

import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_MY_FOLLOWERS, GET_MY_FOLLOWING } from "@/app/GraphqlOnClient/queries/userQueries"
import { useUser } from "@/app/context/authContext"
import { useToken } from "@/app/hooks/useToken"
import { User } from "@/app/types/userTypes"
import styles from "./Followers.module.css"
import { SUBSCRIBE_TO_USER } from "@/app/GraphqlOnClient/mutations/subscriptionMutation"

export default function MyFollowersList() {
const {user} = useUser()
const {accesstoken} = useToken()
const[followers, setFollowers] = useState<User[]>([])
const [followings, setFollowings] = useState<User[]>([]);

const {data: myFollowers, loading: followersLoading} = useQuery(GET_MY_FOLLOWERS, {
    context: {
        headers: {
            Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
        }
    },
    skip: !accesstoken
})

const [subscribeToUser, {loading: subscribeLoading}] = useMutation(SUBSCRIBE_TO_USER, {
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
      }
    }
  })

  const { data: myFollowingsData, loading: followingsLoading, refetch: refetchFollowings } = useQuery(GET_MY_FOLLOWING, {
  context: {
    headers: {
      Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
    },
  },
  skip: !accesstoken,
});


  const handleSubscribe = async(userId: number) => {
    try{
      await subscribeToUser({variables: {userId}})
      console.log("You subscribed to user with id", userId)
      const { data } = await refetchFollowings(); // дождаться результата
      console.log("Updated followings after refetch:", data);
      setFollowings(data.getMyFollowings || []);
    } catch (err) {
      console.error("Error subscribing to this user:", err);
    }
  }


useEffect(() => {
  if (myFollowers?.getMyFollowers) {
    setFollowers(myFollowers.getMyFollowers);
  }
}, [myFollowers]);

useEffect(() => {
    if (myFollowingsData?.getMyFollowing) {
      setFollowings(myFollowingsData.getMyFollowing);
    }
  }, [myFollowingsData]);

const myFollowingsIds = followings.map((u) => u.id); // берём из состояния

  if (followersLoading || followingsLoading) return <p>Loading followers...</p>;

return (
  <div className={styles["myfollowers-inwardly-container"]}>
    <h2>My Followers</h2>
    {followers.length === 0 && <p>You have no followers.</p>}

   <ul className={styles["followers-list"]}>
  {followers.map((follower) => {
    const isAlreadyFollowing = myFollowingsIds.includes(follower.id);

        return (
          <li className={styles["follower-item"]} key={`${follower.username}-${follower.id}`}>
            {follower.username}

            {isAlreadyFollowing ? (
              <button disabled className={styles.followingBtn}>
                Following
              </button>
            ) : (
              <button
                onClick={() => handleSubscribe(follower.id)}
                disabled={subscribeLoading}
              >
                {subscribeLoading ? "Subscribing..." : "Follow back"}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

}