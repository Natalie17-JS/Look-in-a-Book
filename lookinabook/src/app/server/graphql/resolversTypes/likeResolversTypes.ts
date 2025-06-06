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
export interface BookLikeArgs {
  bookId: number;
}

export interface PostLikeArgs {
  postId: string;
}
export interface BookLikeSummary {
   type: LikeType; 
   count: number
  };

export type LikeResolversTypes = {
    
        Query: {
    postLikeCount: (
      parent: unknown,
      args: PostLikeArgs,
      context: IContext
    ) => Promise<number>;

    bookCoverLikeCount: (
      parent: unknown,
      args: BookLikeArgs,
      context: IContext
    ) => Promise<number>;

    bookPlotLikeCount: (
      parent: unknown,
      args: BookLikeArgs,
      context: IContext
    ) => Promise<number>;

    bookWritingStyleLikeCount: (
      parent: unknown,
      args: BookLikeArgs,
      context: IContext
    ) => Promise<number>;

    bookLikeSummary: (
      parent: unknown,
      args: BookLikeArgs,
      context: IContext
    ) => Promise<BookLikeSummary[]>;
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
    }
  