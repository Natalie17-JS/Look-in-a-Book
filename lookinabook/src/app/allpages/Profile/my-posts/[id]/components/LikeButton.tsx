"use client"

import { useMutation } from "@apollo/client";
import HeartIcon from "./Heart";
import { useEffect, useState } from "react";
import { LIKE, UNLIKE } from "@/app/GraphqlOnClient/mutations/likeMutations";
import  {useUser} from "@/app/context/authContext"
import styles from "./Like.module.css"

type LikeButtonProps = {
  isLiked: boolean
  postId?: string
  bookId?: number
  color?: string
  disabled?: boolean;
  type: 'COVER' | 'PLOT' | 'WRITING_STYLE' | 'POST'
  onLike: () => void;
  onUnlike: () => void;
}

export default function LikeButton({ isLiked: initialLiked, postId, bookId, type, color = 'red', disabled = false, onLike, onUnlike }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [isAnimating, setIsAnimating] = useState(false)
  const { user } = useUser() 

  const accessToken = localStorage.getItem("token");
  const [likeMutation] = useMutation(LIKE, {
    
    context: {
      headers: { 
        Authorization: accessToken ? `bearer ${accessToken}` : ""
      }
    }
  })
  const [unlikeMutation] = useMutation(UNLIKE, {
    
    context: {
      headers: { 
        Authorization: accessToken ? `bearer ${accessToken}` : ""
      }
    }
  })

    // 🔁 Синхронизация, если пропсы изменились при возврате на страницу
  useEffect(() => {
    setIsLiked(initialLiked)
  }, [initialLiked])

  const handleClick = async () => {
    if (!user) {
      console.warn('User not found')
      return
    }
    try {
       setIsAnimating(true) // 🌀 Запускаем анимацию
      if (isLiked) {
        await unlikeMutation({
          variables: { type, postId, bookId },
        })
        setIsLiked(false);
        onUnlike();
      } else {
        await likeMutation({
          variables: { type, postId, bookId },
        })
        setIsLiked(true);
        onLike();
      }

      setIsLiked(!isLiked)
       // ⏳ Отключаем анимацию после завершения
      setTimeout(() => {
        setIsAnimating(false)
      }, 300) // длительность анимации должна совпадать с CSS
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <button style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: isLiked ? color : 'gray',
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
      }}
    onClick={handleClick}  disabled={disabled} aria-label={isLiked ? 'Remove like' : 'Like'} 
    title={disabled ? 'Sign in to like' : ''}>

       <div className={isAnimating ? styles["pulse-animation"] : ''}>
      <HeartIcon filled={isLiked} size={32} color={color} />
      </div>
    </button>
  )
}
