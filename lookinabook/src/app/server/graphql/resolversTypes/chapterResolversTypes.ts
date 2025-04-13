import {Chapter} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";

export enum PStatus {
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT",
  }

export type createChapterWithBookIdArgs = {
    title: string;
    content: string;
    bookId: number;
    publishStatus: PStatus;
}

export type createChapterWithBookSlugArgs = {
    title: string;
    content: string;
    slug: string;
    publishStatus: PStatus;
}
export type editChapterArgs = {
    id: string;
    title?: string;
    content?: string;
    bookId: number;
    publishStatus?: PStatus;
}

export type editChapterArgsByBookSlug = {
    id: string;
    title?: string;
    content?: string;
    publishStatus?: PStatus;
}
export type deleteChapterByIdArgs = {
    id: string;
}

export type ChapterResolvers = {
    Query: {
      getChapterById: (parent: unknown, args: { id: string }) => Promise<Chapter | null>;
      getChaptersByBookId: (parent: unknown, args: { bookId: number }) =>  Promise<Chapter[] | null>;
      getChaptersByBookSlug: (parent: unknown, args: { slug: string }) =>  Promise<Chapter[] | null>;
      getChapterDrafts: (parent: unknown, args: { bookId: number }, context: IContext) => Promise<Chapter[]>
      getAuthorBookChapters: (parent: unknown, args: { slug: string }, context: IContext)=> Promise<Chapter[]>
    },
    Mutation: {
        createChapterWithBookId: (
            parent: unknown, 
            args: createChapterWithBookIdArgs, 
            context: IContext
        ) => Promise<Chapter>;
        createChapterWithBookSlug: (
            parent: unknown, 
            args: createChapterWithBookSlugArgs, 
            context: IContext
        ) => Promise<Chapter>;
        editChapterByBookId: (
            parent: unknown, 
            args: editChapterArgs, 
            context: IContext
        ) => Promise<Chapter | null>;
        editChapter: (
            parent: unknown, 
            args: editChapterArgsByBookSlug, 
            context: IContext
        ) => Promise<Chapter | null>;
        publishChapter: (
            parent: unknown, 
            args: { id: string }, 
            context: IContext
            ) => Promise<Chapter>;
        deleteChapter: (
            parent: unknown, 
            args: deleteChapterByIdArgs, 
            context: IContext
        ) => Promise<{ message: string; }>;
    }
    DateTime: GraphQLScalarType;
    };
