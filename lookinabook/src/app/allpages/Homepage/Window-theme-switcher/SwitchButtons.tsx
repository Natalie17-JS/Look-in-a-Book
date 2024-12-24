import Image from "next/image";
import { useState, useEffect } from "react";
import cloudsSwitcher from "@/images/clouds-switcher.svg";
import sunSwitcher from "@/images/sun-switcher.svg";
import nightSwitcher from "@/images/night-switcher.svg";
import { useTheme } from "@/app/context/ThemeContext";
import styles from "./componentsStyles/ThemeSwitcher.module.css";

const SwitchButtons = ({ onSwitch }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeButton, setActiveButton] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (theme === "light") {
      setActiveButton(0);
    } else if (theme === "gray") {
      setActiveButton(1);
    } else if (theme === "dark") {
      setActiveButton(2);
    }
  }, [theme]);

  const handleSwitch = (imageIndex) => {
    if (imageIndex !== activeButton || !buttonClicked) {
      onSwitch(imageIndex);
      setButtonClicked(true);
      setActiveButton(imageIndex);
      toggleTheme(
        imageIndex === 0 ? "light" : imageIndex === 1 ? "gray" : "dark"
      );
    }
  };

  return (
    <div className={styles["switch-btn-container"]}>
      <button
        className={`${styles["switch-btn"]} ${
          activeButton === 0 ? styles["active"] : ""
        }`}
        onClick={() => handleSwitch(0)}
      >
        <Image
          src={sunSwitcher}
          alt="Sun"
          className={styles["switchbtn-image"]}
        />
      </button>
      <button
        className={`${styles["switch-btn"]} ${
          activeButton === 1 ? styles["active"] : ""
        }`}
        onClick={() => handleSwitch(1)}
      >
        <Image
          src={cloudsSwitcher}
          alt="Clouds"
          className={styles["switchbtn-image"]}
        />
      </button>
      <button
        className={`${styles["switch-btn"]} ${
          activeButton === 2 ? styles["active"] : ""
        }`}
        onClick={() => handleSwitch(2)}
      >
        <Image
          src={nightSwitcher}
          alt="Night"
          className={styles["switchbtn-image"]}
        />
      </button>
    </div>
  );
};

export default SwitchButtons;
