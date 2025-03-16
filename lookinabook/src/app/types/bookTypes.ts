import { User } from "./userTypes";

export enum Category {
    FICTION = "FICTION",
    NON_FICTION = "NON_FICTION",
  }
  
  export enum Genre {
    DRAMA = "DRAMA",
    ADVENTURE = "ADVENTURE",
    SCIENCE_FICTION = "SCIENCE_FICTION",
    POST_APOCALYPSE = "POST_APOCALYPSE",
    APOCALYPSE = "APOCALYPSE",
    HUMOR = "HUMOR",
    HISTORY = "HISTORY",
    SHORT_STORY = "SHORT_STORY",
    POETRY = "POETRY",
    DETECTIVE = "DETECTIVE",
    THRILLER = "THRILLER",
  }

  export enum WStatus {
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    
  }
  
  export enum PStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
  }

  export interface SearchBookParams {
    title?: string;
    genre?: Genre;
    category?: Category;
    writingStatus?: WStatus;
    publishStatus?: PStatus;
    authorId?: number;
    authorName?: string;
    createdAtRange?: [Date, Date];
    updatedAtRange?: [Date, Date];
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
    perPage?: number;
  }
  
  export interface SearchBookResult {
    totalCount: number;
    books: Book[];
  }

export interface Book {
    id: number;
    title: string;
    annotation?: string;
    author: User;
    slug: string;
    genre: Genre;
    category: Category; 
    cover?: string;
    writingStatus: WStatus;
    publishStatus: PStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookFormData {
    title: string;
    annotation?: string;
    cover?: string;
    genre: Genre;
    category: Category;
    writingStatus: WStatus;
    publishStatus: PStatus;
}

export interface CreateBookData {
    id: number;
    title: string;
    annotation?: string;
    author: User;
    slug: string;
    genre: Genre;
    category: Category; 
    cover?: string;
    writingStatus: WStatus;
    publishStatus: PStatus;
    createdAt: Date;
    
}

export interface EditBookData extends Partial<Book> {
  id: number; // ID остается обязательным

}


export interface BookDraft {
    id: number;
    title: string;
    annotation?: string;
    author: User;
    slug: string;
    cover?: string;
    genre: Genre;
    category: Category; 
    writingStatus: WStatus;
}

export interface BookDraftsData {
  getBookDrafts: BookDraft[]; // ✅ getBookDrafts - это массив книг
}

