"use client"

import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_MY_FOLLOWING } from "@/app/GraphqlOnClient/queries/userQueries"
import { UNSUBSCRIBE_FROM_USER } from "@/app/GraphqlOnClient/mutations/subscriptionMutation"
import { useUser } from "@/app/context/authContext"
import { useToken } from "@/app/hooks/useToken"
import { User } from "@/app/types/userTypes"

export default function MyFollowingList() {
const {user} = useUser()
const {accesstoken} = useToken()
const[following, setFollowing] = useState<User[]>([])

const {data: myFollowing, loading: followingLoading} = useQuery(GET_MY_FOLLOWING, {
    context: {
        headers: {
            Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
        }
    },
    skip: !accesstoken
})

const [unsubscribeFromUser, {loading: unsubscribeLoading}] = useMutation(UNSUBSCRIBE_FROM_USER, {
    context: {
        headers: {
            Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
        }
    },
})

useEffect(() => {
  if (myFollowing?.getMyFollowers) {
    setFollowing(myFollowing.getMyFollowers);
  }
}, [myFollowing]);

const handleUnsubscribe = async (userId: number) => {
    try{
        await unsubscribeFromUser({variables: {userId}})
        setFollowing(prev => prev.filter(f => f.id !== userId))
    } catch (err){
        console.error("Error unsubscribing:", err);
    }
}

if (followingLoading) return <p>Loading followers...</p>;

return (
<div>
     <h2>My Followings</h2>
      {following.length === 0 && <p>You follow no one.</p>}

      <ul>
        {following.map(following => (
          <li key={following.id}>
            {following.username}
            <button
              onClick={() => handleUnsubscribe(following.id)}
              disabled={unsubscribeLoading}
            >
              {unsubscribeLoading ? "Unsubscribing..." : "Unsubscribe"}
            </button>
          </li>
        ))}
      </ul>
</div>
)
}