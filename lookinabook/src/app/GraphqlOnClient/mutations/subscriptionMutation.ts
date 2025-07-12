import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_USER = gql`
    mutation SubscribeToUser($userId: Int!){
    subscribeToUser(userId: $userId){
        id
        subscriber {
            id
            username
        }
        subscribedTo{
            id
            username
        }
        createdAt
    }
    }
`
export const UNSUBSCRIBE_FROM_USER = gql`
     mutation UnsubscribeFromUser($userId: Int!){
        unsubscribeFromUser(userId: $userId){
        message
        }
     }
`