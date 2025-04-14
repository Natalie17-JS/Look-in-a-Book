import { PStatus } from "./bookTypes";

export interface Post {
    id: string;
    title: string;
    content: string;
    publishStatus: PStatus;
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
}

export interface PostsDraftsData {
  getChapterDrafts: Post[];
}
export interface GetAuthorPostsData {
  getAuthorBookChapters: Post[];
};