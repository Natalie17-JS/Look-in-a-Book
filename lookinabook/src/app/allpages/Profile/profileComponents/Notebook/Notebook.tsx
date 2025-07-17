"use client";

import Image from "next/image";
import notebookday from "@/app/images/notebook-day.svg";
import notebooknight from "@/app/images/notebook-night.svg";
import { useTheme } from "@/app/context/themeContext";
import styles from "./Notebook.module.css";
import Link from "next/link";
import LogoutButton from "../Logout/LogoutButton";
import { GET_FOLLOWERS_COUNT, GET_FOLLOWING_COUNT } from "@/app/GraphqlOnClient/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useUser } from "@/app/context/authContext";

export default function Notebook() {
  const { theme } = useTheme();
  const {user} = useUser()

    const { data: followersCountData, loading: followersLoading, error: followersError } = useQuery(GET_FOLLOWERS_COUNT, {
    variables: { userId: user?.id },
    skip: !user?.id, // пропускаем, пока user не получен
  });

  const { data: followingCountData, loading: followingLoading, error: followingError } = useQuery(GET_FOLLOWING_COUNT, {
    variables: { userId: user?.id },
    skip: !user?.id, // пропускаем, пока user не получен
  });

  let notebookImage;
  switch (theme) {
    case "dark":
      notebookImage = notebooknight;
      break;
    case "gray":
      notebookImage = notebookday;
      break;
    default:
      notebookImage = notebookday;
  }

  if (followersLoading) return <p>Loading followers count...</p>;
  if (followersError) return <p>Error: {followersError.message}</p>;
   if (followingLoading) return <p>Loading following count...</p>;
  if (followingError) return <p>Error: {followingError.message}</p>;

  return (
    <div className={styles.notebook}>
      <Image
        src={notebookImage}
        alt="notebook"
        className={styles["notebook-image"]}
      />

      <div className={styles["buttons-container"]}>

        <div className={styles.buttons}>

        <div className={styles["buttons-left"]}>
      <LogoutButton className={styles["signout-btn"]} />
        <Link href="/allpages/profile/edit-profile">
          <button className={styles["settings-btn"]}>Edit profile</button>
        </Link>
        </div>

 <div className={styles["buttons-right"]}>
       <Link href="/allpages/profile/my-followers">
          <button className={styles["settings-btn"]}>
            Followers ({followersCountData?.getFollowersCount ?? 0})
          </button>
        </Link>
        <Link href="/allpages/profile/my-following">
          <button className={styles["settings-btn"]}>
            Following ({followingCountData?.getFollowingCount ?? 0})
            </button>
        </Link>
        </div> 

        </div>       

      </div>
    </div>
  );
}
