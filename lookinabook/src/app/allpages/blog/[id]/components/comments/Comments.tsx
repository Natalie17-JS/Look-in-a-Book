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
      {data.getCommentsByPost.map((comment: Comment) => {
        const isCommentAuthor = user?.id === comment.author.id;
        const isPostAuthor = user?.id === currentPost?.author?.id;

        return (
          <div key={comment.id} className="comment border-b py-3">
            <p>
              <strong>{comment.author.username}:</strong> {comment.content}
            </p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>

            <div className="mt-1 space-x-2">
              {user && (
                <button onClick={() => console.log('Reply to', comment.id)}>Reply</button>
              )}

              {isCommentAuthor && (
                <button onClick={() => console.log('Edit comment', comment.id)}>Edit</button>
              )}

              {(isCommentAuthor || isPostAuthor) && (
                <button onClick={() => console.log('Delete comment', comment.id)}>Delete</button>
              )}
            </div>

            {comment.replies.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => toggleReplies(comment.id)}
                  className="text-blue-500 text-sm"
                >
                  {openReplies[comment.id] ? 'Hide replies' : 'Show replies'}
                </button>

                {openReplies[comment.id] && (
                  <div className="pl-4 mt-2 border-l border-gray-300">
                    {comment.replies.map((reply: Comment) => (
                      <div key={reply.id} className="text-sm py-1">
                        ↳ {reply.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}