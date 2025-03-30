import { Post } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";
import { PStatus } from "./bookResolversTypes";

export type CreatePostArgs = {
    title: string;
    content: string;
    image?: string;
    publishStatus: PStatus;
}
export type UpdatePostArgs = {
    id: number;
    title?: string;
    content?: string;
    image?: string;
    publishStatus?: PStatus;
}

export type DeletePostArgs = {
    id: number;
}

export type PostResolversTypes = {
     Query: {
          getPostById: (parent: unknown, args: { id: number }) => Promise<Post | null>;
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
}