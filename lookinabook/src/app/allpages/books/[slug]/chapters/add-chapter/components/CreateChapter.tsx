"use client";

import { useMutation } from "@apollo/client";
import { CREATE_CHAPTER } from "@/app/GraphqlOnClient/mutations/chapterMutations";
import { useBook } from "@/app/context/bookContext"; // Контекст книги
import { useForm } from "react-hook-form";
import { CreateChapterFormData, Chapter } from "@/app/types/chapterTypes";
import { PStatus } from "@/app/types/bookTypes";
import Link from "next/link";

const CreateChapter = () => {
    const { currentBook } = useBook(); // Получаем книгу из контекста
    const bookId = currentBook?.id;

    const { register, handleSubmit, formState: { errors } } = useForm<CreateChapterFormData>({
        defaultValues: {
            title: "",
            content: "",
            publishStatus: PStatus.DRAFT
        }
    });

    const [createChapter, { loading, error }] = useMutation<Chapter>(CREATE_CHAPTER, {
        variables: { bookId },
        onCompleted: (data) => {
            console.log("Chapter created:", data);
            // Дополнительная логика для UI, например уведомления
        },
    });

    const onSubmit = async (data: { title: string; content: string; publishStatus: string }) => {
        if (!bookId) {
            alert("Book not found");
            return;
        }
        try {
            await createChapter({ variables: { ...data, bookId } });
        } catch (err) {
            console.error("Error creating chapter:", err);
        }
    };

    return (
        <div>
            <h2>Create New Chapter</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        id="title"
                        type="text"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        {...register("content", { required: "Content is required" })}
                        id="content"
                    />
                    {errors.content && <p>{errors.content.message}</p>}
                </div>

                <div>
                    <label htmlFor="publishStatus">Publish Status</label>
                    <select {...register("publishStatus")}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Chapter"}
                </button>
            </form>
            {error && <p>Error: {error.message}</p>}

            
        </div>
    );
};

export default CreateChapter;
