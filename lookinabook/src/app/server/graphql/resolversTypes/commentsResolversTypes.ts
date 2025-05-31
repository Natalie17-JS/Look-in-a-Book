import { Book, Chapter, Comment, Post, User } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";

export enum CommentType {
    BOOKCOMMENT = "BOOKCOMMENT",
    POSTCOMMENT = "POSTCOMMENT",
    CHAPTERCOMMENT = "CHAPTERCOMMENT",
    REPLYCOMMENT = "REPLYCOMMENT"
}


export type CreateCommentArgs = {
  content: string;
  commentType: CommentType;
  targetId: number | string;
  parentCommentId?: number;
};

export type EditCommentArgs = {
    id: number;
    content?: string;
}

export type DeleteCommentArgs = {
    id: number;
}

export type CommentsResolversTypes = {
    Query: {
        getCommentById: (parent: unknown, args: { id: number }) => Promise<Comment | null>;
        getCommentsByBook: (parent: unknown, args: { bookId: number }) => Promise<Comment[] | null>;
        getCommentsByChapter: (parent: unknown, args: { chapterId: string }) => Promise<Comment[] | null>;
        getCommentsByPost: (parent: unknown, args: { postId: string }) => Promise<Comment[] | null>;
        getRepliesToComment: (parent: unknown, args: { parentCommentId: number }) => Promise<Comment[] | null>;
        getUserComments: (parent: unknown, args: unknown, context: IContext) => Promise<Comment[] | null>;
    },
    Mutation: {
        createComment: (
            parent: unknown, 
            args: CreateCommentArgs, 
            context: IContext
        ) => Promise<Comment>;
        editComment: (
            parent: unknown, 
            args: EditCommentArgs, 
            context: IContext
        ) => Promise<Comment>;
        deleteComment: (
            parent: unknown, 
            args: DeleteCommentArgs, 
            context: IContext
        )=> Promise<{ message: string }>;
        
    }
    DateTime: GraphQLScalarType;
}