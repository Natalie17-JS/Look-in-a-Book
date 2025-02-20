"use client";

import Image from "next/image";
import flowers from "@/app/images/flowers-on-shelf.svg";
import styles from "./Shelf.module.css";
import { useTheme } from "@/app/context/themeContext";
import { useAuth } from "@/app/context/authContext";

export default function Shelf() {
  const { theme } = useTheme();
  const {user, loading} = useAuth();

  if (loading) return <p>Loading...</p>;


  return (
    <div className={styles["shelf-container"]}>
      <div className={styles.shelf}>
        <div className={styles["shelf-elements"]}>
          <div className={styles.photoram}></div>

          <div
            className={`${styles.description} ${
              theme === "dark"
                ? styles.dark
                : theme === "gray"
                ? styles.gray
                : styles.light
            }`}
          >
            <p style={{ textAlign: "center", marginTop: "10px" }}>
            <strong>Author:</strong> {user?.username || "Unknown"}
            </p>

            <p style={{ textAlign: "center", marginTop: "10px" }}>
            <strong>Bio:</strong> {user?.bio || "No bio available"}
            </p>
          </div>

          <div className={styles.flowers}>
            <Image
              src={flowers}
              alt="flowers"
              className={styles["flowers-image"]}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
