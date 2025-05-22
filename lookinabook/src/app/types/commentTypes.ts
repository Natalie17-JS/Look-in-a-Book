import { Post } from "./postTypes";
import { Book } from "./bookTypes";
import { User } from "./userTypes";
import { Chapter } from "./chapterTypes";

export interface Comment {
  id: number;
  content: string;
  createdAt: string; // ISO формат строки от DateTime
  updatedAt: string;
  author: User;
  book?: Book | null;
  chapter?: Chapter| null;
  post?: Post | null;
  parentComment?: Comment | null;
  replies: Comment[];
}

 export interface CreateCommentFormData {
    content: string;
}

export interface EditCommentData extends Partial<CreateCommentFormData> {
    id: number;
}

export interface GetAuthorCommentsData {
  getUserComments: Comment[];
};