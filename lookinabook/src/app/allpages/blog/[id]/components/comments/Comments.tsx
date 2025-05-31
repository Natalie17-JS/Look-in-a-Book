"use client"

import { useQuery } from '@apollo/client';
import { useUser } from '@/app/context/authContext';
import { GET_COMMENTS_BY_POST } from '@/app/GraphqlOnClient/queries/commentsQueries';
import { Comment } from '@/app/types/commentTypes';
import { usePostStore } from '@/app/zustand/PostStore';
import { useEffect, useState, useRef } from 'react';
import styles from "./Comments.module.css"
import CommentForm from './createComment';
import DeleteCommentButton from './DeleteComment';

type CommentsForPostProps = {
  postId?: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export default function CommentsForPost({ postId, comments, setComments }: CommentsForPostProps) {
  const { user } = useUser(); // Достаём текущего пользователя из контекста
   const [openReplies, setOpenReplies] = useState<{ [key: number]: boolean }>({});
   const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);

const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  // Проверка при изменении комментариев или прокрутке
  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;

    setShowScrollUp(el.scrollTop > 0);
    setShowScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight);
  };

  useEffect(() => {
    updateScrollButtons();
  }, [comments]);

  const handleScroll = () => updateScrollButtons();

  const scroll = (direction: "up" | "down") => {
    const el = containerRef.current;
    if (!el) return;
    const offset = 100;
    el.scrollBy({ top: direction === "up" ? -offset : offset, behavior: "smooth" });
  };


  const { data, loading, error } = useQuery(GET_COMMENTS_BY_POST, {
   variables: { postId },
   skip: !postId, // если postId ещё нет, не делать запрос
  });

  // Синхронизируем один раз после получения данных:
useEffect(() => {
  if (data?.getCommentsByPost) {
    setComments(data.getCommentsByPost);
  }
}, [data, setComments]);

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
  <div className={styles.comments} ref={containerRef} onScroll={handleScroll}>
    {comments.map((comment: Comment) => {
      const isCommentAuthor = user?.id === comment.author.id;
      const isPostAuthor = user?.id === comment.post?.author?.id;
      const shouldShowReplies = openReplies[comment.id];

      {showScrollUp && (
    <button
      className={styles.scrollButton}
      onClick={() => scroll("up")}
    >
      ▲
    </button>
  )}

      return (
        
        <div key={comment.id} className={styles["comment-container"]}>
          {editingCommentId === comment.id ? (
            <CommentForm
              mode="edit"
              commentId={comment.id}
              initialContent={comment.content}
              onSuccess={() => setEditingCommentId(null)}
              onCancel={() => setEditingCommentId(null)}
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
              <button
                onClick={() => {
                  setReplyingToCommentId(comment.id);
                  setOpenReplies((prev) => ({ ...prev, [comment.id]: true }));
                }}
              >
                Reply
              </button>
            )}

            {isCommentAuthor && (
              <button onClick={() => setEditingCommentId(comment.id)}>Edit</button>
            )}

            {(isCommentAuthor || isPostAuthor) && (
              <DeleteCommentButton
                commentId={comment.id}
                onSuccess={() =>
                  setComments((prev) => prev.filter((c) => c.id !== comment.id))
                }
              />
            )}
          </div>

          {/* Кнопка показа/скрытия ответов, если есть ответы */}
          {comment.replies && comment.replies.length > 0 && (
            <button onClick={() => toggleReplies(comment.id)}>
              {shouldShowReplies
                ? `Hide replies (${comment.replies.length})`
                : `Show replies (${comment.replies.length})`}
            </button>
          )}

          {/* Блок с ответами */}
          {shouldShowReplies && (
            <div className={styles.replies}>
              {comment.replies.map((reply: Comment) => {
                const isReplyAuthor = user?.id === reply.author.id;

                return (
                  <ul key={reply.id} className={styles["reply-container"]}>
                    <li>
                      {editingCommentId === reply.id ? (
                        <CommentForm
                          mode="edit"
                          commentId={reply.id}
                          initialContent={reply.content}
                          onSuccess={(updatedReply) => {
                            setEditingCommentId(null);
                            setComments((prev) =>
                              prev.map((c) =>
                                c.id === comment.id
                                  ? {
                                      ...c,
                                      replies: c.replies.map((r) =>
                                        r.id === updatedReply.id ? updatedReply : r
                                      ),
                                    }
                                  : c
                              )
                            );
                          }}
                          onCancel={() => setEditingCommentId(null)}
                        />
                      ) : (
                        <>
                          <p>
                            <strong>{reply.author.username}:</strong> {reply.content}
                          </p>
                          <small>{new Date(reply.createdAt).toLocaleString()}</small>
                        </>
                      )}

                      <div>
                        {isReplyAuthor && (
                          <button onClick={() => setEditingCommentId(reply.id)}>
                            Edit
                          </button>
                        )}
                        {(isReplyAuthor || isPostAuthor) && (
                          <DeleteCommentButton
                            commentId={reply.id}
                            onSuccess={() =>
                              setComments((prev) =>
                                prev.map((c) =>
                                  c.id === comment.id
                                    ? {
                                        ...c,
                                        replies: c.replies.filter((r) => r.id !== reply.id),
                                      }
                                    : c
                                )
                              )
                            }
                          />
                        )}
                      </div>
                    </li>
                  </ul>
                );
              })}

              {/* Форма для нового ответа */}
              {replyingToCommentId === comment.id && (
                <CommentForm
                  mode="create"
                  commentType="REPLYCOMMENT"
                  targetId={String(comment.post?.id)}
                  parentCommentId={comment.id}
                  onSuccess={(newReply) => {
                    setReplyingToCommentId(null);
                    setComments((prev) =>
                      prev.map((c) =>
                        c.id === comment.id
                          ? { ...c, replies: [...c.replies, newReply] }
                          : c
                      )
                    );
                  }}
                  onCancel={() => setReplyingToCommentId(null)}
                />
              )}
            </div>
          )}
        </div>
      );
    })}

     {showScrollDown && (
    <button
      className={styles.scrollButton}
      onClick={() => scroll("down")}
    >
      ▼
    </button>
  )}
  </div>
);
}