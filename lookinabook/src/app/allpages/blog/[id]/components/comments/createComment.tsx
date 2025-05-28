'use client';

import {  useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_COMMENT, EDIT_COMMENT } from '@/app/GraphqlOnClient/mutations/commentsMutations';
import { Comment } from '@/app/types/commentTypes';
import styles from "./Comments.module.css"
import Image from 'next/image';
import sendicon from "@/app/images/send-icon.svg"

type CommentFormProps =

  | {
      mode: 'create';
      commentType: 'POSTCOMMENT' | 'BOOKCOMMENT' | 'CHAPTERCOMMENT' | 'REPLYCOMMENT';
      targetId: string | number;
      onSuccess?: (comment: Comment) => void;
    }
  | {
      mode: 'edit';
      commentId: number;
      initialContent: string;
      onSuccess?: (comment: Comment) => void;
    };

export default function CommentForm (props: CommentFormProps){
  const [content, setContent] = useState(
    props.mode === 'edit' ? props.initialContent : ''
  );
const accessToken = localStorage.getItem("token");
  const [createComment, { loading: creating, error: createError }] = useMutation(CREATE_COMMENT, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });
  const [editComment, { loading: editing, error: editError }] = useMutation(EDIT_COMMENT, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      if (props.mode === 'create') {
        const { data } = await createComment({
          variables: {
            content,
            commentType: props.commentType,
            targetId: props.targetId,
          },
        });
        props.onSuccess?.(data.createComment);
        setContent('');
      } else {
        const { data } = await editComment({
          variables: {
            id: props.commentId,
            content,
          },
        });
        props.onSuccess?.(data.editComment);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const error = props.mode === 'create' ? createError : editError;
  const loading = props.mode === 'create' ? creating : editing;

  return (
    <form className={styles["send-comment-form"]} onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        //rows={6}
        className={styles.textarea}
        placeholder={props.mode === 'edit' ? 'Edit your comment...' : 'Write a comment...'}
      />
      {error && <p>{error.message}</p>}
      <button
        type="submit"
        disabled={loading}
        className={styles["send-btn"]}
      >
        <Image src={sendicon} alt="send" className={styles["send-icon"]}/>
        {/* {loading
          ? props.mode === 'edit'
            ? 'Saving...'
            : 'Posting...'
          : props.mode === 'edit'
          ? 'Save'
          : 'Post'} */}
      </button>
    </form>
  );
};
