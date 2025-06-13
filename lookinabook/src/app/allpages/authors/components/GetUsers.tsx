"use client"

import { useQuery } from "@apollo/client"
import { GET_USERS } from "@/app/GraphqlOnClient/queries/userQueries"
import { UsersData, User } from "@/app/types/userTypes"
import Link from "next/link"
import Roof from "./Roof"
import UserWindow from "./UserWindow"
import styles from "./Users.module.css"
import Image from "next/image"
import kustleft from "@/app/images/kust1.svg"
import kustright from "@/app/images/kust2.svg"

export default function UsersList() {

    const { loading, error, data } = useQuery(GET_USERS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

        return (
            <div className={styles["roof-userlist"]}>
                <Roof/>

                <div className={styles["house-container"]}>
                    <Image src={kustleft} alt="grass" className={styles["grass1-image"]}/>
            <ul className={styles["userlist-container"]}>
                {data?.getUsers.map((user: User) => (
                    <li className={styles["user-item"]} key={user.id}>
                        <div>
                        <Link style={{textDecoration:"none", color: "white"}} href={`/allpages/authors/${user.id}`}>
                        <h2 className={styles["username-text"]}>{user.username}</h2>
                        </Link>
                        
                        <p>Books: {user.books?.length || 0}</p>
                        <p>Posts: {user.posts?.length || 0}</p>
                       
                       <p> {user.isOnline ? (
                                <span>🟢 At office</span>
                              ) : (
                                <span>Not at office</span>
                              )}</p> 
                               </div>

                    <div className={styles["user-window"]}>
                               <UserWindow isOnline={user.isOnline} />
                               </div>
                        </li>
                ))}
            </ul>
             <Image src={kustright} alt="grass" className={styles["grass2-image"]}/>
            </div>

            </div>
        )
}