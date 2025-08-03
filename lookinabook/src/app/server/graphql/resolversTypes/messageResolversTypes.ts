import {Message, ChatInvite, Chat, Letter} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";


export type CreateMessageArgs ={
    text: string;
    chatId: number;
}

type CreateChatArgs = {
     recipientId: number;
}
type EditMessageArgs = {
  id: number;
  text?: string;
  chatId: number;
};

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
        countUnreadMessagesByChat: (parent: unknown,args: { chatId: number }, context: IContext)=> Promise<number>;
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

        markMessagesAsRead: (
                parent: unknown, 
                args: {chatId: number}, 
                context: IContext
                ) => Promise<number>;

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

