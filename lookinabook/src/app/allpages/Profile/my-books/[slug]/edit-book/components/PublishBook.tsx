"use client"; // если используешь Next.js App Router

import { useMutation } from "@apollo/client";
import toast from 'react-hot-toast';
import { PUBLISH_BOOK } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { useBook } from "@/app/context/bookContext";
import { useToken } from "@/app/hooks/useToken";

export default function PublishBookButton() {
    const { currentBook } = useBook(); 
  const {accesstoken} = useToken()

    const [publishBook, { loading, error }] = useMutation(PUBLISH_BOOK, {
        context: {
            headers: {
              Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
            },
          },
        variables: { slug: currentBook?.slug }, // Берем slug из контекста
        onCompleted: (data) => {
          toast.success(`Book "${data.publishBook.title}" is published! 🎉`);
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`);
        },
      });
    
      if (!currentBook) return null; // Если книги нет, кнопку не показываем
    

  return (
    <div>
      <button
        onClick={() => publishBook()}
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish book"}
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}
