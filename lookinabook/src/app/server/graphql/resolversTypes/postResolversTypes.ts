import { Post } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";
import { PStatus } from "./bookResolversTypes";

export enum postCategory {
  THOUGHTS = "THOUGHTS",
  NEWS = "NEWS",
  NEW_BOOK_PROMOTION = "NEW_BOOK_PROMOTION",
  BOOK_REVIEW = "BOOK_REVIEW",
  OTHER = "OTHER"
}

export type CreatePostArgs = {
    title: string;
    content: string;
    image?: string;
    publishStatus: PStatus;
    category: postCategory;
}
export type UpdatePostArgs = {
    id: string;
    title?: string;
    content?: string;
    image?: string;
    publishStatus?: PStatus;
    category?: postCategory;
}

export type DeletePostArgs = {
    id: string;
}

export type PostResolversTypes = {
     Query: {
          getPostById: (parent: unknown, args: { id: string }) => Promise<Post | null>;
          getAllPosts: () => Promise<Post[]>;
          getUserPosts: (parent: unknown, args: { authorId: number }) => Promise<Post[]>;
          getMyPosts: (parent: unknown, args: unknown, context: IContext) => Promise<Post[]>;
          getPostDrafts: (parent: unknown, args: unknown, context: IContext) => Promise<Post[]>
        };
        Mutation: {
          createPost: (parent: unknown, args: CreatePostArgs, context: IContext) => Promise<Post>;
          updatePost: (parent: unknown, args: UpdatePostArgs, context: IContext) => Promise<Post | null>;
          deletePost: (parent: unknown, args: DeletePostArgs, context: IContext) => Promise<{ message: string; }>;
        };
        DateTime: GraphQLScalarType;
}