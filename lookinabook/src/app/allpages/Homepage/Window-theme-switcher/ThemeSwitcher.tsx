import { useState, useEffect } from "react";
import SwitchButtons from "./SwitchButtons";
import Window from "./Window";
import { useTheme } from "@/app/context/themeContext";

import styles from "./componentsStyles/ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { theme } = useTheme();
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    if (theme === "light") {
      setActiveImage(0);
    } else if (theme === "gray") {
      setActiveImage(1);
    } else if (theme === "dark") {
      setActiveImage(2);
    }
  }, [theme]);

  const handleSwitch = (imageIndex: number) => {
    setActiveImage(imageIndex);
  };

  return (
    <div className={styles["theme-switcher-container"]}>
      <SwitchButtons onSwitch={handleSwitch} />
      <Window activeImage={activeImage} />
    </div>
  );
};

export default ThemeSwitcher;
