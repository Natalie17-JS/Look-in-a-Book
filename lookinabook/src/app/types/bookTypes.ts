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

export interface Book {
    id: number;
    title: string;
    annotation?: string;
    author: User;
    slug: string;
    genre: Genre;
    category: Category; 
    cover?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookFormData {
    title: string;
    annotation?: string;
    cover?: string;
    genre: Genre;
    category: Category; 
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
}

export interface EditBookData extends Partial<CreateBookFormData> {
    id: number;
}

