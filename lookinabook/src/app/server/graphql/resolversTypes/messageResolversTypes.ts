import {Message, ChatInvite, Chat} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";

export enum MessageType {
LETTER = "LETTER",
MESSAGE = "MESSAGE"
}

export type CreateMessageArgs ={
    text: string;
    type: MessageType;
    chatId?: number;
}

type CreateChatArgs = {
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

type AddParticipantArgs = {
        chatId: number;
        targetUserId: number;
}

type RespondToInviteArgs = {
        inviteId: number;
        accept: boolean
}

export type MessageResolversTypes = {
     Query: {
        getMessageById: (parent: unknown, args: { id: number }, context: IContext) => Promise<Message | null>;
        getChatMessages: (parent: unknown, args: { chatId: number }, context: IContext)=> Promise<Message[] | null>;
        getUserReadLetters: (parent: unknown, args: unknown, context: IContext)=> Promise<Message[] | null>;
        getUserUnreadLetters: (parent: unknown, args: unknown, context: IContext)=> Promise<Message[] | null>;
        getUserSentLetters: (parent: unknown, args: unknown, context: IContext)=> Promise<Message[] | null>;
        countUnreadMessages: (parent: unknown,args: unknown, context: IContext)=> Promise<number>;
        countUnreadLetters: (parent: unknown,args: unknown, context: IContext)=> Promise<number>;
        getUserChats: (parent: unknown,args: unknown, context: IContext) => Promise<Chat[]>;
        getChat: (parent: unknown, args: { chatId: number }, context: IContext) => Promise<Chat>;
        getPendingInvites: (parent: unknown, args: unknown,context: IContext) => Promise<ChatInvite[]>;
     },
     Mutation: {
        createMessage: (
                parent: unknown, 
                args: CreateMessageArgs, 
                context: IContext
              ) => Promise<Message>;

        createChat: (
                parent: unknown, 
                args: CreateChatArgs, 
                context: IContext
              ) => Promise<Chat>;

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
        addChatParticipant: (
                parent: unknown, 
                args: AddParticipantArgs,
                context: IContext
                ) => Promise<ChatInvite>;
        
        respondToInvite: (
                parent: unknown, 
                args: RespondToInviteArgs,
                context: IContext
                ) => Promise<{success: boolean}>
        deleteChat: (
                parent: unknown, 
                args: {chatId: number}, 
                context: IContext
                ) => Promise<{ message: string; }>;
     }
        DateTime: GraphQLScalarType;
}

