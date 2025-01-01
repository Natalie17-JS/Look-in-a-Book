"use client";

import styles from "./Worktable.module.css";
import { useTheme } from "@/app/context/themeContext";
import Posts from "../Posts/Posts";
import NotebookBooks from "../NotebookBooks/NotebookBooks";
import { useState } from "react";

type ComponentName = "notebookbooks" | "posts";

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
        {activeComponent === "posts" && <Posts />}
      </div>

      <div className={styles.upper}></div>

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
              <p className={styles["yashik-text"]}>Posts drafts</p>
            </div>
          </div>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <p className={styles["yashik-text"]}>Recommendations</p>
            </div>
          </div>
        </div>
        <div className={styles["yashiki-right"]}>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <p className={styles["yashik-text"]}>Books drafts</p>
            </div>
          </div>
          <div className={styles.yashik}>
            <div className={styles.insidepart}>
              <div className={styles.tag}></div>
              <p className={styles["yashik-text"]}>Saved books</p>
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
