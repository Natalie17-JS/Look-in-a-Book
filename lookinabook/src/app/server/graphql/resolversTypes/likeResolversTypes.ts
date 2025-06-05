import { Like } from "@prisma/client";
import { IContext } from "./UserResolversTypes";

export enum LikeType {
COVER = "COVER",
PLOT = "PLOT",
WRITING_STYLE = "WRITING_STYLE",
POST = "POST"
}

export interface ToggleLikeArgs {
  type: LikeType
  bookId?: number
  postId?: string
}

export type LikeResolversTypes = {
    Query: {
        postLikeCount: (parent: unknown, args: { postId: string }) => Promise<number>
    }
  Mutation: {
    like: (
      parent: unknown,
      args: ToggleLikeArgs,
      context: IContext
    ) => Promise<boolean>; 
    unlike: (
      parent: unknown,
      args: ToggleLikeArgs,
      context: IContext
    ) => Promise<boolean>; 
  };
};