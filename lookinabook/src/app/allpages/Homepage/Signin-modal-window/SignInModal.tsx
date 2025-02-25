import React, { useState } from "react";
import styles from "./Modal.module.css";
import { useTheme } from "@/app/context/themeContext";
import RegisterForm from "../SingInUpForms/Forms/RegisterForm";
import SignInForm from "../SingInUpForms/Forms/SignInForm";
import VerifyCodeForm from "../SingInUpForms/VerifyCode/VerifyCode";

// Типизация пропсов для компонента Modal
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"register" | "verify" | "login">("login");
  const [email, setEmail] = useState<string>("");
  const { theme } = useTheme();

  if (!isOpen) return null;

  // Определяем стили для темы
  const themeClass =
    theme === "dark" ? styles.dark : theme === "gray" ? styles.gray : styles.light;

  const closeBtn =
    theme === "dark" ? styles.closedark : theme === "gray" ? styles.closegray : styles.closelight;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${themeClass}`}>
        <button className={`${styles.closeButton} ${closeBtn}`} onClick={onClose}>
          X
        </button>

        {step === "register" && (
          <>
            <RegisterForm
              onSuccess={(userEmail: string) => {
                setEmail(userEmail); 
                setStep("verify"); // Переходим к шагу верификации
              }}
            />
            <p>
              Already have an account?{" "}
              <a href="#" className={styles.link} onClick={() => setStep("login")}>
                Sign in here
              </a>
            </p>
          </>
        )}

        {step === "verify" && (
          <VerifyCodeForm 
            email={email} 
            onSuccess={() => setStep("login")} // После верификации показываем логин
          />
        )}

        {step === "login" && (
          <>
            <SignInForm />
            <p>
              Don't have an account?{" "}
              <a href="#" className={styles.link} onClick={() => setStep("register")}>
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
