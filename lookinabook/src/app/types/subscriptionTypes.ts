import { User } from "./userTypes";

export interface Subscription {
    id: number;
    subscriber: User;
    subscriberId: number;
    subscribedTo: User;
    subscribedToId: number;
    createdAt: Date;
}