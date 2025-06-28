import { User } from "./userTypes";


export enum MessageType {
    LETTER = "LETTER",
    MESSAGE = "MESSAGE"
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
replies: Reply[];
}

export interface Reply {
  id: number;
  text: string;
  createdAt: Date;
  senderId: number;
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