import { User } from "./userTypes";

export interface Book {
    id: number;
    title: string;
    annotation?: string;
    author: User;
    slug: string;
    cover?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookFormData {
    title: string;
    annotation?: string;
    cover?: string;
}

export interface CreateBookData {
    id: number;
    title: string;
    annotation?: string;
    author: User;
    slug: string;
    cover?: string;
}

export interface EditBookData extends Partial<CreateBookFormData> {
    id: number;
}

