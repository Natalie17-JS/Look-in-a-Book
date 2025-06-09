import { Post } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";
import { PStatus } from "./bookResolversTypes";

export enum PostCategory {
  THOUGHTS = "THOUGHTS",
  NEWS = "NEWS",
  NEW_BOOK_PROMOTION = "NEW_BOOK_PROMOTION",
  BOOK_REVIEW = "BOOK_REVIEW",
  OTHER = "OTHER"
}

type PostSortOption = "likes" | "comments" | "date";

export type CreatePostArgs = {
    title: string;
    content: string;
    image?: string;
    publishStatus: PStatus;
    category: PostCategory;
}
export type UpdatePostArgs = {
    id: string;
    title?: string;
    content?: string;
    image?: string;
    publishStatus?: PStatus;
    category?: PostCategory;
}

export type DeletePostArgs = {
    id: string;
}

export type PostResolversTypes = {
     Query: {
          getPostById: (parent: unknown, args: { id: string }) => Promise<Post | null>;
          getAuthorPostById: (parent: unknown, args: { id: string },context: IContext )=> Promise<Post | null>;
          getAllPosts: (_: any, args: { sortBy?: PostSortOption }, context: IContext) => Promise<Post[]>;
          getUserPosts: (parent: unknown, args: { authorId: number }) => Promise<Post[]>;
          getAuthorPosts: (parent: unknown, args: unknown, context: IContext) => Promise<Post[]>;
          getPostDrafts: (parent: unknown, args: unknown, context: IContext) => Promise<Post[]>
        };
        Mutation: {
         
          createPost: (parent: unknown, args: CreatePostArgs, context: IContext) => Promise<Post>;
          editPost: (parent: unknown, args: UpdatePostArgs, context: IContext) => Promise<Post | null>;
          publishPost: (parent: unknown, args: { id: string }, context: IContext) => Promise<Post | null>;
          deletePost: (parent: unknown, args: DeletePostArgs, context: IContext) => Promise<{ message: string; }>;
        };
        Post:
        {
           likesCount: (parent: {id: string}, args: unknown, context: IContext) => Promise<number>;
           likedByCurrentUser: (parent: {id: string}, args: unknown, context: IContext)=> Promise<boolean>;
           commentsCount: (parent: {id: string}, args: unknown, context: IContext) => Promise<number>;
        }
        DateTime: GraphQLScalarType;
}