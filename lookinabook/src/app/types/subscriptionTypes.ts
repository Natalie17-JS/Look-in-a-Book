import { User } from "./userTypes";

export interface Subscription {
    id: number;
    subscriber: User;
    subscribedTo: User;
    createdAt: Date;
}