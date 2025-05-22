"use client"

import { useQuery } from '@apollo/client';
import { useUser } from '@/app/context/authContext';
import { GET_COMMENTS_BY_POST } from '@/app/GraphqlOnClient/queries/commentsQueries';
import { Comment } from '@/app/types/commentTypes';

interface CommentsForPostProps {
  postId: number;
}

export const CommentsForPost: React.FC<CommentsForPostProps> = ({ postId }) => {
  const { data, loading, error } = useQuery(GET_COMMENTS_BY_POST, {
    variables: { postId },
  });

  const { user } = useUser(); // Достаём текущего пользователя из контекста

  if (loading) return <p>Comments loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            <div className="ml-4 mt-2 pl-4 border-l">
              {comment.replies.map((reply: Comment) => (
                <div key={reply.id}>
                  <p>↳ {reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};