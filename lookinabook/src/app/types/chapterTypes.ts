import { Book } from "./bookTypes";
import { PStatus } from "./bookTypes";


export interface Chapter {
    id: string;
    title: string;
    content: string;
    //book: Book;
    publishStatus: PStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface ChaptersData {
  getChaptersByBookSlug: Chapter[]; 
  }

export interface CreateChapterFormData {
    title: string;
    content: string;
    publishStatus: PStatus;
    
}

export interface updateChapter extends Partial<CreateChapterFormData> {
    id: string;
}

export interface ChapterDraftsData {
  getChapterDrafts: Chapter[];
}
export interface GetAuthorBookChaptersData {
  getAuthorBookChapters: Chapter[];
};
