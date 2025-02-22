"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useAuth } from "@/app/context/authContext"; // Используем контекст
import { LOGIN_USER } from "@/app/GraphqlOnClient/mutations/userMutations";
import { SignInFormData, SignInUserData } from "@/app/types/userTypes";
import styles from "./SignInUpForm.module.css";
import { useTheme } from "@/app/context/themeContext";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({ mode: "onChange" });

  const [loginUser, { loading, error }] = useMutation<SignInUserData>(LOGIN_USER);
  const { login } = useAuth(); // Берем `login` из контекста
  const { theme } = useTheme();
  const router = useRouter(); 

  const themeInput =
    theme === "dark"
      ? styles.dark
      : theme === "gray"
      ? styles.gray
      : styles.light;

  const onSubmit: SubmitHandler<SignInFormData> = async (formData) => {
    try {
      const { data } = await loginUser({ variables: formData });

      if (data?.loginUser?.accessToken) {
        login(data.loginUser.accessToken); // Передаем токен в контекст
        router.push("/allpages/profile");
        console.log("User signed in:", data.loginUser) // После логина обновляем пользователя
      }
    } catch (err) {
      console.error("Login error:", err);
    }

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
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
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
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {error && <p className={styles.error}>Login failed. Please try again.</p>}
      </form>
    </>
  );
}
