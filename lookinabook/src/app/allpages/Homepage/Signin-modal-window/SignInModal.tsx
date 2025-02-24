import React, { useState } from "react";
import styles from "./Modal.module.css";
import { useTheme } from "@/app/context/themeContext";
import RegisterForm from "../SingInUpForms/RegisterForm";
import SignInForm from "../SingInUpForms/SignInForm";
import VerifyCodeForm from "../SingInUpForms/VerifyCode";

// Типизация пропсов для компонента Modal
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [step, setStep] = useState<"register" | "verify">("register");
  const [email, setEmail] = useState<string>("");
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
                {step === "register" && (
                  <RegisterForm
                    onSuccess={(userEmail: string) => {
                      setEmail(userEmail); // Сохраняем email из формы
                      setStep("verify"); // Переходим к верификации
                    }}
                  />
                )}
                {step === "verify" && <VerifyCodeForm email={email} />} {/* Передаем email */}
                
                {step === "register" && (
                  <p>
                    Already have an account?{" "}
                    <a
                      href="#"
                      className={styles.link}
                      onClick={() => {
                        setIsRegistering(false);
                        setStep("register"); // Сброс шага
                      }}
                    >
                      Sign in here
                    </a>
                  </p>
                )}
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
