"use client";

import { useMutation } from "@apollo/client";
import { CREATE_CHAPTER_WITH_BOOKSLUG } from "@/app/GraphqlOnClient/mutations/chapterMutations";
import { useBook } from "@/app/context/bookContext"; // Контекст книги
import { useForm } from "react-hook-form";
import { CreateChapterFormData, Chapter } from "@/app/types/chapterTypes";
import { PStatus } from "@/app/types/bookTypes";
import Link from "next/link";
import styles from "./CreateChapter.module.css"
import { useTheme } from "@/app/context/themeContext";
import ChapterForm from "./ChapterForm";
import { useToken } from "@/app/hooks/useToken";

const CreateChapter = () => {
    const {theme} = useTheme()
    const { currentBook } = useBook(); // Получаем книгу из контекста
    const slug = currentBook?.slug;
    if (!slug) {
        return <p>Book not found</p>;
    }
const {accesstoken} = useToken()
    /*const themeInput =
          theme === "dark"
            ? styles.dark
            : theme === "gray"
            ? styles.gray
            : styles.light;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateChapterFormData>({
        defaultValues: {
            title: "",
            content: "",
            publishStatus: PStatus.DRAFT
        }
    });*/
    

    const [createChapterWithBookSlug, { loading, error }] = useMutation<Chapter>(CREATE_CHAPTER_WITH_BOOKSLUG, {
        context: {
            headers: {
              Authorization: accesstoken ? `Bearer ${accesstoken}` : "", 
            },
          },
        onCompleted: (data) => {
            console.log("Chapter created:", data);
            // Дополнительная логика для UI, например уведомления
        },
    });

    const handleCreate = async (data: { title: string; content: string; publishStatus: string }) => {
        if (!slug) {
            alert("Book not found");
            return;
        }
        try {
            const newChapter = await createChapterWithBookSlug(
                {
                variables: {
                    title: data.title,
                    content: data.content,
                    publishStatus: data.publishStatus,
                    slug
                    //createdAt: new Date(),
                    },
                  }
            );
            if (newChapter) {

                console.log("Created chapter:", newChapter);
               // reset();
              }
        } catch (err) {
            console.error("Error creating chapter:", err);
        }
    };

    return (
        <div>
        <h1>Create Chapter</h1>
        <ChapterForm
          onSubmit={handleCreate}
          isSubmitting={loading}
          submitLabel="Create Chapter"
        />
        {error && <p>Error: {error.message}</p>}
      </div>
       /* <div className={styles["addchapter-inwardly-container"]}>
            <h1>Create New Chapter</h1>
            <form className={styles["addchapter-form"]} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title"></label>
                    <input className={`${styles.title} ${themeInput}`}
                        {...register("title", { required: "Title is required" })}
                        id="title"
                        type="text"
                        placeholder="Title"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                
                <div className={styles["content-container"]}>
                    <label htmlFor="content"></label>
                    <textarea className={`${styles.content} ${themeInput}`}
                        {...register("content", { required: "Content is required" })}
                        id="content"
                        placeholder="Content..."
                    />
                    {errors.content && <p>{errors.content.message}</p>}
                </div>

                <div>
                    <label htmlFor="publishStatus">Publish Status</label>
                    <select {...register("publishStatus")}>
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                    </select>
                </div>

                <button className={styles["addchapter-btn"]} type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Chapter"}
                </button>
            </form>
            {error && <p>Error: {error.message}</p>} 
        </div>*/
    );
};

export default CreateChapter;
