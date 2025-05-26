"use client"

import { useQuery } from '@apollo/client';
import { useUser } from '@/app/context/authContext';
import { GET_COMMENTS_BY_POST } from '@/app/GraphqlOnClient/queries/commentsQueries';
import { Comment } from '@/app/types/commentTypes';
import { usePostStore } from '@/app/zustand/PostStore';
import { useState } from 'react';

/*interface CommentsForPostProps {
  postId: number;
}*/

export default function CommentsForPost() {
  const { user } = useUser(); // Достаём текущего пользователя из контекста
   const [openReplies, setOpenReplies] = useState<{ [key: number]: boolean }>({});
  const { currentPost } = usePostStore()
   const postId = currentPost?.id;

  const { data, loading, error } = useQuery(GET_COMMENTS_BY_POST, {
   variables: { postId },
   skip: !postId, // если postId ещё нет, не делать запрос
  });

  if (loading) return <p>Comments loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.getCommentsByPost) return <p>No comments found.</p>;

   const toggleReplies = (commentId: number) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div>
      {data.getCommentsByPost.map((comment: Comment) => (
        <div key={comment.id} className="comment">
          <p>
            <strong>{comment.author.username}:</strong> {comment.content}
          </p>
          <small>{new Date(comment.createdAt).toLocaleString()}</small>

          {/* Показывать кнопки только если автор комментария совпадает с текущим пользователем */}
          {user?.id === comment.author.id && (
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}

         {comment.replies.length > 0 && (
            <div>
              <button
                onClick={() => toggleReplies(comment.id)}
                
              >
                {openReplies[comment.id] ? 'Hide replies' : 'Show replies'}
              </button>

              {openReplies[comment.id] && (
                <div>
                  {comment.replies.map((reply: Comment) => (
                    <div key={reply.id}>
                      <p>↳ {reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};