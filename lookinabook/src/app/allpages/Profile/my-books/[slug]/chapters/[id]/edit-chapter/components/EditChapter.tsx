"use client";

import { useMutation } from "@apollo/client";
import { EDIT_CHAPTER } from "@/app/GraphqlOnClient/mutations/chapterMutations";
import { useChapter } from "@/app/context/chapterContext";
import ChapterForm from "../../../add-chapter/components/ChapterForm";
import { CreateChapterFormData, Chapter } from "@/app/types/chapterTypes";

export default function EditChapter() {
  const { currentChapter } = useChapter();
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [updateChapter, { loading, error }] = useMutation<Chapter>(EDIT_CHAPTER, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    onCompleted: (data) => {
      console.log("Chapter updated:", data);
    },
  });

  const handleUpdate = async (data: CreateChapterFormData) => {
    try {
      await updateChapter({
        variables: {
          id: currentChapter?.id,
          ...data,
        },
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!currentChapter) return <p>No chapter to edit</p>;

  return (
    <div>
      <h1>Edit Chapter</h1>
      <ChapterForm
        initialValues={currentChapter}
        onSubmit={handleUpdate}
        isSubmitting={loading}
        submitLabel="Update Chapter"
      />
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
