import React, { useState } from "react";
import styles from "./componentsStyles/SignInModal.module.css";
import { useTheme } from "@/app/context/themeContext";
import RegisterForm from "../SingInUpForms/RegisterForm";
import SignInForm from "../SingInUpForms/SignInForm";

// Типизация пропсов для компонента Modal
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { theme } = useTheme();

  // Если модальное окно не открыто, ничего не рендерим
  if (!isOpen) return null;

  // Типизация классов в зависимости от темы
  const themeClass =
    theme === "dark"
      ? styles.dark
      : theme === "gray"
      ? styles.gray
      : styles.light;

  const closeBtn =
    theme === "dark"
      ? styles.closedark
      : theme === "gray"
      ? styles.closegray
      : styles.closelight;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${themeClass}`}>
        <button
          className={`${styles.closeButton} ${closeBtn}`}
          onClick={onClose}
        >
          X
        </button>
        {isRegistering ? (
          <>
            <RegisterForm />
            <p>
              Already have an account?{" "}
              <a
                href="#"
                className={styles.link}
                onClick={() => setIsRegistering(false)}
              >
                Sign in here
              </a>
            </p>
          </>
        ) : (
          <>
            <SignInForm />
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                className={styles.link}
                onClick={() => setIsRegistering(true)}
              >
                Register here
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
