import {Book, User} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";

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

export type CreateBookArgs = {
  title: string;
  annotation?: string;
  cover?: string;
  genre: Genre;
  category: Category;
};

export type UpdateBookArgs = {
    id: number;
    title?: string;
    annotation?: string;
    cover?: string;
    genre?: Genre;
    category?: Category;
}

export type DeleteBookArgs = {
    id: number; 
  };

  export type BookResolvers = {
    Query: {
      getBookById: (parent: unknown, args: { id: number }) => Promise<Book | null>;
      getBookBySlug: (parent: unknown, args: { slug: string }) => Promise<Book | null>;
      getBooks: () => Promise<Book[]>;
    };
    Mutation: {
      createBook: (
        parent: unknown, 
        args: CreateBookArgs, 
        context: IContext
      ) => Promise<Book>;
  
      updateBook: (
        parent: unknown, 
        args: UpdateBookArgs, 
        context: IContext
      ) => Promise<Book>;
  
      deleteBook: (
        parent: unknown, 
        args: DeleteBookArgs, 
        context: IContext
      ) => Promise<{ message: string; }>;
    };
    DateTime: GraphQLScalarType;
  };
  