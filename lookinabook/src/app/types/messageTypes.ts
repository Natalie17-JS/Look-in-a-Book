import { User } from "./userTypes";


export enum MessageType {
    LETTER = "LETTER",
    MESSAGE = "MESSAGE"
}

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

export interface Message {
id: number;
text: string;
type: MessageType;
isRead: boolean;
senderId: number;
recipientId: number;
createdAt: Date;
sender: User;
recipient: User;
chatId?: number;
replies: Reply[];
}

export interface Reply {
  id: number;
  text: string;
  createdAt: Date;
  senderId: number;
}

export interface Chat {
  id: number;
  participants: User[]
  messages: Message[]
  invitations: ChatInvite[]
  createdAt: Date
  updatedAt: Date
}

export interface ChatInvite{
  id: number;
  chat: Chat
  chatId: number
  inviter: User
  inviterId: number
  target: User
  targetId: number
  status: InviteStatus
  createdAt: Date
}

  export interface CreateMessageData {
   text: string;
   type: MessageType;
   recipientId: number;
}


export interface EditMessageData {
id: number;
text: string;
}