import {Message, ChatInvite, Chat, Letter} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";


export type CreateLetterArgs ={
    recipientId: number;
    text: string;
    replyToId?: number;
}

type ReplyToLetterArgs = {
  replyToId: number;
  text: string;
};

type MarkLetterAsReadArgs = {
        id: number;
        isRead: boolean;
}


export type LetterResolversTypes = {
     Query: {
        getLetterById: (parent: unknown, args: { id: number }, context: IContext) => Promise<Letter | null>;
        getUserReadLetters: (parent: unknown, args: unknown, context: IContext)=> Promise<Letter[] | null>;
        getUserUnreadLetters: (parent: unknown, args: unknown, context: IContext)=> Promise<Letter[] | null>;
        getUserSentLetters: (parent: unknown, args: unknown, context: IContext)=> Promise<Letter[] | null>;
        countUnreadLetters: (parent: unknown,args: unknown, context: IContext)=> Promise<number>;
       
     },
     Mutation: {
        createLetter: (
                parent: unknown, 
                args: CreateLetterArgs, 
                context: IContext
              ) => Promise<Letter>;


        replyToLetter: (
                parent: unknown, 
                args: ReplyToLetterArgs, 
                context: IContext
                )=> Promise<Letter>;

        markLetterAsRead:(
                parent: unknown, 
                args: MarkLetterAsReadArgs, 
                context: IContext
                ) => Promise<Letter>;

        deleteLetter: (
                parent: unknown, 
                args: {id: number}, 
                context: IContext
                ) => Promise<{ message: string; }>;

     }
        DateTime: GraphQLScalarType;
}

