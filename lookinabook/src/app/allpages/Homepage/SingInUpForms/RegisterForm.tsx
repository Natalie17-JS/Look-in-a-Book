"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SignInUpForm.module.css";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/app/GraphqlOnClient/mutations/userMutations";
import { RegisterFormData, RegisterUserData } from "@/app/types/userTypes";


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });
  const [registerUser, { loading }] = useMutation<RegisterUserData>(REGISTER_USER);

  // Типизация обработчика отправки формы
  const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
    try {
      const { data } = await registerUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          avatar: formData.avatar,
          bio: formData.bio, 
        },
      });

      if (data?.registerUser) {
        alert("Registration is successfull!");
        reset(); // Очистка формы
      }
    } catch (err) {
      console.error("Regustration error:", err);
    }
  };


  return (
    <>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Name:
          </label>
          <input
            className={styles.input}
            type="username"
            id="username"
            placeholder="Enter your name..."
            {...register("username", {
              required: "Name is required",
              minLength: { value: 3, message: "Username must be at least 3 characters" }
            })}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Enter your email..."
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
            className={styles.input}
            type="password"
            id="password"
            placeholder="Enter your password..."
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className={styles.input}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password..."
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="bio">
            Bio:
          </label>
          <textarea
            className={styles.input}
            id="bio"
            placeholder="Tell us about yourself..."
            {...register("bio")}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
        {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </>
  );
}
