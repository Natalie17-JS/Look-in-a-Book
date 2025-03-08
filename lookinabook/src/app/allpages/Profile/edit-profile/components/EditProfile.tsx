"use client";

import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styles from "./EditProfile.module.css";
import { useUser } from "@/app/context/authContext";
import { UPDATE_USER } from "@/app/GraphqlOnClient/mutations/userMutations";
import { EditFormData } from "@/app/types/userTypes";
import Link from "next/link";
import DeleteAccount from "./DeleteProfile";
import toast from 'react-hot-toast';
import { useTheme } from "@/app/context/themeContext";

export default function EditProfile() {
  const {theme} = useTheme();
  const { user } = useUser();

  const inputClass = theme === "light" 
  ? styles["light-input"]
  : theme === "dark"
  ? styles["dark-input"]
  : styles["gray-input"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditFormData>();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

  const onSubmit = async (formData: EditFormData) => {
    if (!user) {
      toast.error("You need to sign in!");
      return;
    }

    try {
      await updateUser({
        variables: {
          id: user.id,
          username: formData.username,
          email: formData.email,
          password: formData.password || null,
          bio: formData.bio,
        },
      });
      toast.success("Your profile was updated successfully!");
    } catch (err) {
      console.error("Edit profile error:", err);
      toast.error("An error occurred while updating your profile.");
    }
  };

  return (
  
     
    <div className={styles.container}>
      <h2 className={styles["header-text"]}>Edit profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label}>Your name:</label>
        <input className={`${styles["edit-input"]} ${inputClass}`} {...register("username", { required: "Enter your name" })} />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}

        <label className={styles.label}>Email:</label>
        <input className={`${styles["edit-input"]} ${inputClass}`} {...register("email", { required: "Enter your email" })} type="email" />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label className={styles.label}>New password:</label>
        <input className={`${styles["edit-input"]} ${inputClass}`} {...register("password")} type="password" />

        <label className={styles.label}>About you:</label>
        <textarea className={`${styles.textarea} ${inputClass}`} {...register("bio")} />

        <button className={styles["save-btn"]} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>

        <DeleteAccount />

        <Link href="/allpages/profile">
        <button className={styles["save-btn"]}>Back to profile</button>
        </Link>
      </form>

      {error && <p className={styles.error}>Error: {error.message}</p>}
      {data && <p className={styles.success}>Profile is updated!</p>}
    </div>

   
 
  );
}
