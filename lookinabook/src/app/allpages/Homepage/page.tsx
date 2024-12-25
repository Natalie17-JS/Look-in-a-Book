"use client";

import Window from "./Window-theme-switcher/Window";
import Clock from "./Clock/Clock";
import Door from "./Door/Door";
import Table from "./Table/Table";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css";

const HomePage = () => {
  const { theme } = useTheme();

  const themeClass =
    theme === "dark"
      ? styles["dark"]
      : theme === "gray"
      ? styles["gray"]
      : styles["light"];

  const activeImage =
    theme === "light" ? 0 : theme === "gray" ? 1 : theme === "dark" ? 2 : null;

  return (
    <div className={`${styles["room-container"]} ${themeClass}`}>
      <Window activeImage={activeImage} />
      <Clock />
      <Table />
      <Door />
    </div>
  );
};

export default HomePage;
