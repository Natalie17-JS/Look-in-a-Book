import { User } from "./userTypes";

export enum Category {
    FICTION = "Fiction",
    NON_FICTION = "Non-fiction",
  }
  
  export enum Genre {
    DRAMA = "Drama",
    ADVENTURE = "Adventure",
    SCIENCE_FICTION = "Science fiction",
    POST_APOCALYPSE = "Post apocalypse",
    APOCALYPSE = "Apocalypse",
    HUMOR = "Humor",
    HISTORY = "History",
    SHORT_STORY = "Short story",
    POETRY = "Poetry",
    DETECTIVE = "Detective",
    THRILLER = "Thriller",
  }

  export enum WStatus {
    ONGOING = "Ongoing",
    COMPLETED = "Completed",
    
  }
  
  export enum PStatus {
    DRAFT = "Draft",
    PUBLISHED = "Published",
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
    cover?: string;
    genre: Genre;
    category: Category; 
    writingStatus: WStatus;
    publishStatus: PStatus;
}

export interface EditBookData extends Partial<CreateBookFormData> {
    id: number;
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

