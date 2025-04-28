"use client";

import styles from "./Worktable.module.css";
import { useTheme } from "@/app/context/themeContext";
import Posts from "../Posts/Posts";
import NotebookBooks from "../NotebookBooks/NotebookBooks";
import Recommendations from "../Recommendations/Recommendations";
//import PostsDrafts from "../PostsDrafts/PostsDrafts";
import PostsDrafts from "../../my-posts/components/AuthorPosts";
import BooksDrafts from "../BooksDrafts/BooksDrafts";
import SavedBooks from "../SavedBooks/SavedBooks";
import AuthorPostsPage from "../../my-posts/page";
import { useState } from "react";
import Link from "next/link";

type ComponentName =
  | "notebookbooks"
  | "posts"
  | "recommendations"
  | "postsdrafts"
  | "booksdrafts"
  | "savedbooks";

export default function Worktable() {
  const { theme } = useTheme();
  const [activeComponent, setActiveComponent] =
    useState<ComponentName>("notebookbooks");

  const handleSwitchContent = (componentName: ComponentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className={styles["worktable-container"]}>
      <div className={styles.ontablethings}>
        {activeComponent === "notebookbooks" && <NotebookBooks />}
        {activeComponent === "posts" && <AuthorPostsPage />}
        {activeComponent === "recommendations" && <Recommendations />}
        {activeComponent === "postsdrafts" && <PostsDrafts />}
        {activeComponent === "booksdrafts" && <BooksDrafts />}
        {activeComponent === "savedbooks" && <SavedBooks />}
      </div>

      <div className={styles.upperpart}></div>

      <div className={styles.yashiki}>
        <div className={styles["yashiki-left"]}>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>

              <button
                onClick={() => handleSwitchContent("posts")}
                className={styles["switch-content-btn"]}
              >
                <p className={styles["yashik-text"]}>Posts</p>
              </button>
            </div>
          </div>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <button
                onClick={() => handleSwitchContent("postsdrafts")}
                className={styles["switch-content-btn"]}
              >
                <p className={styles["yashik-text"]}>Posts drafts</p>
              </button>
            </div>
          </div>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <button
                onClick={() => handleSwitchContent("recommendations")}
                className={styles["switch-content-btn"]}
              >
                <p className={styles["yashik-text"]}>Recommendations</p>
              </button>
            </div>
          </div>
        </div>
        <div className={styles["yashiki-right"]}>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <button
                onClick={() => handleSwitchContent("booksdrafts")}
                className={styles["switch-content-btn"]}
              >
                <p className={styles["yashik-text"]}>Books drafts</p>
              </button>
            </div>
          </div>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <button
                onClick={() => handleSwitchContent("savedbooks")}
                className={styles["switch-content-btn"]}
              >
                <p className={styles["yashik-text"]}>Saved books</p>
              </button>
            </div>
          </div>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <button
                onClick={() => handleSwitchContent("notebookbooks")}
                className={styles["switch-content-btn"]}
              >
                <p className={styles["yashik-text"]}>My table</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
