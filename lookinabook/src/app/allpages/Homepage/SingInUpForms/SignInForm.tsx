"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import styles from "./SignInUpForm.module.css";
import { useTheme } from "@/app/context/themeContext";

// Типизация данных формы
interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    mode: "onChange",
  });

  const { theme } = useTheme();

  const themeInput =
    theme === "dark"
      ? styles.dark
      : theme === "gray"
      ? styles.gray
      : styles.light;

  // Типизация обработчика отправки формы
  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    console.log("Form submitted:", data);
    reset();
  };

  return (
    <>
      <h2>Sign in</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={`${styles.input} ${themeInput}`}
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={`${styles.input} ${themeInput}`}
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>
      </form>
    </>
  );
}
