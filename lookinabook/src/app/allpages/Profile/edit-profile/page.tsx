"use client"

import { useTheme } from "@/app/context/themeContext";
import EditProfile from "./components/EditProfile";
import SideShelf from "../profileComponents/SideShelf/SideShelf";
import styles from "./MainPage.module.css"

const EditProfilePage = () => {
  const {theme} = useTheme()

  const themeClass =
    theme === "dark"
      ? styles["dark"]
      : theme === "gray"
      ? styles["gray"]
      : styles["light"];


  return (
    <div className={`${styles["edit-profile-container"]} ${themeClass}`}>
   <EditProfile/>
   <SideShelf/>
   </div>
  );
};

export default EditProfilePage;
