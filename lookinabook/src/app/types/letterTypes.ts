import { User } from "./userTypes";

export interface Letter {
id: number;
text: string;
isRead: boolean;
senderId: number;
recipientId: number;
createdAt: Date;
sender: User;
recipient: User;
replies: Letter[];
}

export interface CreateLetterData {
   text: string;
   recipientId: number;
}