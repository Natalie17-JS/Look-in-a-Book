"use client"

import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_MY_FOLLOWERS } from "@/app/GraphqlOnClient/queries/userQueries"
import { UNSUBSCRIBE_FROM_USER } from "@/app/GraphqlOnClient/mutations/subscriptionMutation"
import { useUser } from "@/app/context/authContext"
import { useToken } from "@/app/hooks/useToken"
import { User } from "@/app/types/userTypes"

export default function MyFollowers() {
const {user} = useUser()
const {accesstoken} = useToken()
const[followers, setFollowers] = useState<User>([])

const {data: myFollowers, loading: followersLoading} = useQuery(GET_MY_FOLLOWERS, {
    context: {
        headers: {
            Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
        }
    },
    skip: !accesstoken
})

return (

)
}