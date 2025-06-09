import { PStatus } from "./bookTypes";
import { User } from "./userTypes";
import { Comment } from "./commentTypes";

export enum PostCategory {
  THOUGHTS = "THOUGHTS",
  NEWS = "NEWS",
  NEW_BOOK_PROMOTION = "NEW_BOOK_PROMOTION",
  BOOK_REVIEW = "BOOK_REVIEW",
  OTHER = "OTHER"
}

export interface Post {
    id: string;
    title: string;
    image?: string,
    content: string;
    author: User;
    publishStatus: PStatus;
    category: PostCategory;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
    likesCount: number;
    commentsCount: number;
    likedByCurrentUser: boolean;
}

export interface PostsData {
  getChaptersByBookSlug: Post[]; 
  }

  export interface CreatePostFormData {
    title: string;
    content: string;
    image?: string,
    publishStatus: PStatus;
    category: PostCategory;
}

export interface PostsDraftsData {
  getPostDrafts: Post[];
}
export interface GetAuthorPostsData {
  getAuthorPosts: Post[];
};