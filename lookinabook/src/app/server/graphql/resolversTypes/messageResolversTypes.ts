import {Message} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";

export enum MessageType {
LETTER = "LETTER",
MESSAGE = "MESSAGE"
}

export type CreateMessageArgs ={
    text: string;
    type: MessageType;
    recipientId: number;
}
type EditMessageArgs = {
  id: number;
  text?: string;
};
type ReplyToLetterArgs = {
  replyToId: number;
  text: string;
};

type MarkMessageAsReadArgd = {
        id: number;
        isRead: boolean;
}

export type MessageResolversTypes = {
     Query: {
        getMessageById: (parent: unknown, args: { id: number }, context: IContext) => Promise<Message | null>;
        getUserMessages: (parent: unknown, args: unknown, context: IContext)=> Promise<Message[] | null>;
        getUserLetters: (parent: unknown, args: unknown, context: IContext)=> Promise<Message[] | null>;
        countUnreadMessages: (parent: unknown,args: unknown, context: IContext)=> Promise<number>;
        countUnreadLetters: (parent: unknown,args: unknown, context: IContext)=> Promise<number>;
     },
     Mutation: {
         createMessage: (
                parent: unknown, 
                args: CreateMessageArgs, 
                context: IContext
              ) => Promise<Message>;

        editMessage: (
                parent: unknown, 
                args: EditMessageArgs, 
                context: IContext
                ) => Promise<Message>;

        replyToLetter: (
                parent: unknown, 
                args: ReplyToLetterArgs, 
                context: IContext
                )=> Promise<Message>;

        markMessageAsRead:(
                parent: unknown, 
                args: MarkMessageAsReadArgd, 
                context: IContext
                ) => Promise<Message>;

        deleteMessage: (
                parent: unknown, 
                args: {id: number}, 
                context: IContext
                ) => Promise<{ message: string; }>;
     }
        DateTime: GraphQLScalarType;
}

