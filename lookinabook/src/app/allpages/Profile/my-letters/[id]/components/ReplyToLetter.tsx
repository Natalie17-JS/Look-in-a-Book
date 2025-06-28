"use client"

import { useMutation } from "@apollo/client"
import { useState } from "react"
import { REPLY_TO_LETTER } from "@/app/GraphqlOnClient/mutations/messageMutations"
import { useToken } from "@/app/hooks/useToken"
import styles from "./Letter.module.css"
import { Reply } from "@/app/types/messageTypes"

type ReplyToLetterProps = {
  replyToId: number;
   onReplySent: (reply: Reply) => void;
   refetchLetter: () => void;
}

export default function ReplyToLetterForm(props: ReplyToLetterProps) {
    const [text, setText] = useState("")
    const {accesstoken} = useToken()

    const[replyToLetter, {error, data, loading}] = useMutation(REPLY_TO_LETTER, {
        
    context: {
      headers: {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
      },
    },
    }   
    )

    const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();

    if (!text.trim()) return;

    try {
        const reply = await replyToLetter({
            variables: {
                text,
                replyToId: props.replyToId
            }
        })
        if (reply.data?.replyToLetter) {
        props.onReplySent(reply.data.replyToLetter);
      }
        setText("")
    } catch (err) {
        console.error(err)
    }
    }

    return(
<form className={styles.replyform} onSubmit={handleSubmit}>
    <textarea className={styles["reply-textarea"]}
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Type your answer"
    />
    <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Reply'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p style={{ color: "green" }}>Ответ отправлен!</p>}
</form>
    )
}