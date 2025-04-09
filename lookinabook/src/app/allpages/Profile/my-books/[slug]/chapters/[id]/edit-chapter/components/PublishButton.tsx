"use client";

import { useMutation } from "@apollo/client";
import { PUBLISH_CHAPTER } from "@/app/GraphqlOnClient/mutations/chapterMutations";
import { Chapter } from "@/app/types/chapterTypes";
import styles from "./PublishBtn.module.css";
import { useChapter } from "@/app/context/chapterContext";
import toast from 'react-hot-toast';

const PublishChapterButton = () => {
    const {currentChapter} = useChapter()
    const accessToken = localStorage.getItem("token");
    const id = currentChapter?.id

  const [publishChapter, { loading, error }] = useMutation<{ publishChapter: Chapter }>(PUBLISH_CHAPTER, {
    variables: { id},
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    onCompleted: (data) => {
    toast.success(`Chapter "${data.publishChapter.title}" is published! 🎉`);
    console.log("Chapter published:", data.publishChapter);
    },
    onError: (error) => {
    toast.error(`Error: ${error.message}`);
    },
  });

  const handlePublish = async () => {
    try {
      await publishChapter();
    } catch (err) {
      console.error("Publish error:", err);
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={handlePublish} disabled={loading}>
        {loading ? "Publishing..." : "Publish Chapter"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
};

export default PublishChapterButton;
