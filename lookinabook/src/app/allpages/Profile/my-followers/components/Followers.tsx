"use client"

import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_MY_FOLLOWERS } from "@/app/GraphqlOnClient/queries/userQueries"
import { useUser } from "@/app/context/authContext"
import { useToken } from "@/app/hooks/useToken"
import { User } from "@/app/types/userTypes"

export default function MyFollowersList() {
const {user} = useUser()
const {accesstoken} = useToken()
const[followers, setFollowers] = useState<User[]>([])

const {data: myFollowers, loading: followersLoading} = useQuery(GET_MY_FOLLOWERS, {
    context: {
        headers: {
            Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
        }
    },
    skip: !accesstoken
})


useEffect(() => {
  if (myFollowers?.getMyFollowers) {
    setFollowers(myFollowers.getMyFollowers);
  }
}, [myFollowers]);


if (followersLoading) return <p>Loading followers...</p>;

return (
<div>
     <h2>My Followers</h2>
      {followers.length === 0 && <p>You have no followers.</p>}

      <ul>
        {followers.map(follower => (
          <li key={follower.id}>
            {follower.username}
          </li>
        ))}
      </ul>
</div>
)
}