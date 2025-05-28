"use client"

import { useQuery } from '@apollo/client';
import { useUser } from '@/app/context/authContext';
import { GET_COMMENTS_BY_POST } from '@/app/GraphqlOnClient/queries/commentsQueries';
import { Comment } from '@/app/types/commentTypes';
import { usePostStore } from '@/app/zustand/PostStore';
import { useState } from 'react';
import styles from "./Comments.module.css"
import CommentForm from './createComment';

/*interface CommentsForPostProps {
  postId: number;
}*/

export default function CommentsForPost() {
  const { user } = useUser(); // Достаём текущего пользователя из контекста
   const [openReplies, setOpenReplies] = useState<{ [key: number]: boolean }>({});
   const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

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
    <div className={styles.comments}>
      {data.getCommentsByPost.map((comment: Comment) => {
        const isCommentAuthor = user?.id === comment.author.id;
        const isPostAuthor = user?.id === currentPost?.author?.id;

        return (
           <div key={comment.id} className={styles["comment-container"]}>
          {editingCommentId === comment.id ? (
            <CommentForm
              mode="edit"
              commentId={comment.id}
              initialContent={comment.content}
              onSuccess={(updatedComment) => {
                setEditingCommentId(null);
                // Можно вручную обновить локальные комментарии или refetch
              }}
            />
          ) : (
            <>
              <p>
                <strong>{comment.author.username}:</strong> {comment.content}
              </p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </>
          )}

            <div>
              {user && (
                <button onClick={() => console.log('Reply to', comment.id)}>Reply</button>
              )}

              {isCommentAuthor && (
                 <button onClick={() => setEditingCommentId(comment.id)}>Edit</button>
              )}

              {(isCommentAuthor || isPostAuthor) && (
                <button onClick={() => console.log('Delete comment', comment.id)}>Delete</button>
              )}
            </div>

            {comment.replies.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => toggleReplies(comment.id)}
                  
                >
                  {openReplies[comment.id]
        ? `Hide replies (${comment.replies.length})`
        : `Show replies (${comment.replies.length})`}
                </button>

                {openReplies[comment.id] && (
                  <div>
                    {comment.replies.map((reply: Comment) => (
                      <ul className={styles["reply-container"]} key={reply.id}>
                        <li>{reply.content}</li> 
                        <li>{reply.author.username}</li> 
                      </ul>
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