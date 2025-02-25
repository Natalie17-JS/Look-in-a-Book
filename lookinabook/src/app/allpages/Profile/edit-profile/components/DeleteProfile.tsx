"use client";

import { useUser } from "@/app/context/authContext";
import { useMutation} from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./DeleteProfile.module.css";
import { DELETE_USER } from "@/app/GraphqlOnClient/mutations/userMutations";

export default function DeleteAccount() {
  const { user, setUser } = useUser();
  const [deleteUser, { loading }] = useMutation(DELETE_USER);
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!user) {
      toast.error("Error: user is not found");
      return;
    }

    try {
      await deleteUser({
        variables: { id: user.id },
      });

      toast.success("Your account is deleted.");
      localStorage.removeItem("token");
      setUser(null)
      router.push("/"); // Перенаправление на главную
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("We can not delete this account.");
    }
  };

  return (
    <div className={styles.container}>
      <h3>Delete account</h3>
      {!confirming ? (
        <button onClick={() => setConfirming(true)} className={styles.dangerButton}>
         Delete
        </button>
      ) : (
        <div className={styles.confirmation}>
          <p>Are your sure?</p>
          <button onClick={handleDelete} disabled={loading} className={styles.confirmButton}>
            {loading ? "Deleting..." : "Confirm delete"}
          </button>
          <button onClick={() => setConfirming(false)} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
