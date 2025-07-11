import {Book} from "@prisma/client"
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
  publishStatus: PStatus;
  writingStatus: WStatus;
};

export enum PStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
}

export enum WStatus {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

export type UpdateBookByIdArgs = {
    id: number;
    title?: string;
    annotation?: string;
    cover?: string;
    genre?: Genre;
    category?: Category;
    publishStatus?: PStatus;
    writingStatus?: WStatus;
}

export type UpdateBookBySlugArgs = {
  slug: string;
  title?: string;
  annotation?: string;
  cover?: string;
  genre?: Genre;
  category?: Category;
  publishStatus?: PStatus;
  writingStatus?: WStatus;
}

export type DeleteBookByIdArgs = {
    id: number; 
  };

  export type DeleteBookBySlugArgs = {
    slug: string; 
  };

  export type BookResolvers = {
    Query: {
      getBookById: (parent: unknown, args: { id: number }) => Promise<Book | null>;
      getBookBySlug: (parent: unknown, args: { slug: string }) => Promise<Book | null>;
      getBooks: () => Promise<Book[]>;
      getMyBooks: (parent: unknown, args: unknown, context: IContext) => Promise<Book[]>;
      getBookDrafts: (parent: unknown, args: unknown, context: IContext) => Promise<Book[]>
    };
    Mutation: {
      createBook: (
        parent: unknown, 
        args: CreateBookArgs, 
        context: IContext
      ) => Promise<Book>;
  
      updateBookById: (
        parent: unknown, 
        args: UpdateBookByIdArgs, 
        context: IContext
      ) => Promise<Book>;

      updateBookBySlug: (
        parent: unknown, 
        args: UpdateBookBySlugArgs, 
        context: IContext
      ) => Promise<Book>;

      publishBook: (
        parent: unknown, 
        args: { slug: string }, 
        context: IContext
      ) => Promise<Book>;
  
      deleteBookById: (
        parent: unknown, 
        args: DeleteBookByIdArgs, 
        context: IContext
      ) => Promise<{ message: string; }>;

      deleteBookBySlug: (
        parent: unknown, 
        args: DeleteBookBySlugArgs, 
        context: IContext
      ) => Promise<{ message: string; }>;
    };
    Book:
        {
           coverLikeCount: (parent: {id: number}, args: unknown, context: IContext) => Promise<number>;
           plotLikeCount: (parent: {id: number}, args: unknown, context: IContext) => Promise<number>;
           writingStyleLikeCount: (parent: {id: number}, args: unknown, context: IContext) => Promise<number>;
           likedByCurrentUserPlot: (parent: {id: number}, args: unknown, context: IContext)=> Promise<boolean>;
           likedByCurrentUserCover: (parent: {id: number}, args: unknown, context: IContext)=> Promise<boolean>;
           likedByCurrentUserWritingStyle: (parent: {id: number}, args: unknown, context: IContext)=> Promise<boolean>;
        }
    DateTime: GraphQLScalarType;
  };
  