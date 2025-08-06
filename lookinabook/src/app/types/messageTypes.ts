import { User } from "./userTypes";

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

export interface Message {
id: number;
text: string;
isRead: boolean;
senderId: number;
createdAt: Date;
sender: User;
chatId: number;
replies: Message[];
}


export interface ChatParticipant {
  id: number;
  chatId: number;
  userId: number;
  user: User;
}

export interface Chat {
  id: number;
  participants: ChatParticipant[]
  messages: Message[]
  invitations: ChatInvite[]
  createdAt: Date
  updatedAt: Date
}

export interface ChatInvite{
  id: number;
  chat: Chat
  chatId: number
  inviter: ChatParticipant
  inviterId: number
  target: User
  targetId: number
  status: InviteStatus
  createdAt: Date
}

  export interface CreateMessageData {
   text: string;
   chatId: number;
}

export interface EditMessageData {
id: number;
text?: string;
}