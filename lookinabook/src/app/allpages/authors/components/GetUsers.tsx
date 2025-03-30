"use client"

import { useQuery } from "@apollo/client"
import { GET_USERS } from "@/app/GraphqlOnClient/queries/userQueries"
import { UsersData, User } from "@/app/types/userTypes"
import Link from "next/link"

export default function UsersList() {

    const { loading, error, data } = useQuery(GET_USERS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

        return (
            <ul>
                {data?.getUsers.map((user: User) => (
                    <li key={user.id}>
                        <Link href={`/allpages/authors/${user.id}`}>
                        <p>{user.username}</p>
                        </Link>
                        
                        <p>Books: {user.books?.length || 0}</p>
                        </li>
                ))}
            </ul>
        )
}