import { PStatus } from "./bookTypes";
import { User } from "./userTypes";

export enum postCategory {
  THOUGHTS = "THOUGHTS",
  NEWS = "NEWS",
  NEW_BOOK_PROMOTION = "NEW_BOOK_PROMOTION",
  BOOK_REVIEW = "BOOK_REVIEW",
  OTHER = "OTHER"
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    publishStatus: PStatus;
    category: postCategory;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostsData {
  getChaptersByBookSlug: Post[]; 
  }

  export interface CreatePostFormData {
    title: string;
    content: string;
    publishStatus: PStatus;
    category: postCategory;
}

export interface PostsDraftsData {
  getChapterDrafts: Post[];
}
export interface GetAuthorPostsData {
  getAuthorBookChapters: Post[];
};