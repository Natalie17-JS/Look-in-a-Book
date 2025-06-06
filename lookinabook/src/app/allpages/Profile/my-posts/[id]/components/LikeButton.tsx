import { useMutation } from "@apollo/client";
import HeartIcon from "./Heart";
import { useState } from "react";
import { LIKE, UNLIKE } from "@/app/GraphqlOnClient/mutations/likeMutations";

type LikeButtonProps = {
  isLiked: boolean
  postId?: number
  bookId?: number
   type: 'COVER' | 'PLOT' | 'WRITING_STYLE' | 'POST'
}

export default function LikeButton({ isLiked: initialLiked, postId, bookId, type }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)

  const [likeMutation] = useMutation(LIKE)
  const [unlikeMutation] = useMutation(UNLIKE)

  const handleClick = async () => {
    try {
      if (isLiked) {
        await unlikeMutation({
          variables: { type, postId, bookId },
        })
      } else {
        await likeMutation({
          variables: { type, postId, bookId },
        })
      }

      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <button onClick={handleClick} aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}>
      <HeartIcon filled={isLiked} size={32} color="red" />
    </button>
  )
}
