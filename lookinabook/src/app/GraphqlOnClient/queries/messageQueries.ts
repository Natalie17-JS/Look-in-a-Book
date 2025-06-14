import { gql } from "@apollo/client";

export const GET_MESSAGE_BY_ID = gql`
query GetMessageById($id: Int!) {
  getMessageById(id: $id) {
    id
    text
    type
    isRead
    createdAt
    senderId
    recipientId
  }
}

`

export const GET_USER_MESSAGES = gql`
query GetUserMessages {
  getUserMessages {
    id
    text
    type
    isRead
    createdAt
    senderId
    recipientId
  }
}

`

export const UNREAD_MESSAGES_COUNT = gql`
query CountUnreadMessages {
countUnreadMessages 
}
`