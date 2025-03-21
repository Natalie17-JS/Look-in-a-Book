import {Chapter} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";

export enum PStatus {
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT",
  }

export type createChapterArgs = {
    title: string;
    content: string;
    bookId: number;
    publishStatus: PStatus;
}
export type editChapterArgs = {
    id: string;
    title?: string;
    content?: string;
    bookId: number;
    publishStatus?: PStatus;
}
export type deleteChapterByIdArgs = {
    id: string;
}

export type ChapterResolvers = {
    Query: {
      getChapterById: (parent: unknown, args: { id: string }) => Promise<Chapter | null>;
      getChapters: (parent: unknown, args: { bookId: number }) =>  Promise<Chapter[] | null>;
      getChapterDrafts: (parent: unknown, args: { bookId: number }, context: IContext) => Promise<Chapter[]>
      getAuthorBookChapters: (parent: unknown, args: { bookId: number }, context: IContext)=> Promise<Chapter[]>
    },
    Mutation: {
        createChapter: (
            parent: unknown, 
            args: createChapterArgs, 
            context: IContext
        ) => Promise<Chapter>;
        editChapter: (
            parent: unknown, 
            args: editChapterArgs, 
            context: IContext
        ) => Promise<Chapter | null>;
        publishChapter: (
            parent: unknown, 
            args: { id: string }, 
            context: IContext
            ) => Promise<Chapter>;
        deleteChapterById: (
            parent: unknown, 
            args: deleteChapterByIdArgs, 
            context: IContext
        ) => Promise<{ message: string; }>;
    }
    DateTime: GraphQLScalarType;
    };
