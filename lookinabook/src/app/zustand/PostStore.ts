import { create } from 'zustand'
import { Post } from '../types/postTypes'

type PostStore = {
    currentPost: Post | null
    setCurrentPost: (post: Post) => void
    clearCurrentPost: () => void
  }
  
  export const usePostStore = create<PostStore>((set) => ({
    currentPost: null,
    setCurrentPost: (post) => set({ currentPost: post }),
    clearCurrentPost: () => set({ currentPost: null }),
  }))