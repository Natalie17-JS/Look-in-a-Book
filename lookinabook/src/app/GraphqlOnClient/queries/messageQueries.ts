import { gql } from "@apollo/client";

export const GET_MESSAGE_BY_ID = gql`
query GetMessageById($id: Int!) {
  getMessageById(id: $id) {
    id
    text
    type
    isRead
    createdAt
    sender {
      id
      username
    }
    recipientId
    replies {
      id
      text
    }
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
    replies {
      id
      text
    }
  }
}

`

export const GET_USER_LETTERS = gql`
query GetUserLetters {
  getUserLetters {
    id
    text
    type
    isRead
    createdAt
    sender {
      id
      username
    }
      replies {
      id
      text
    }
  }
}

`

export const UNREAD_MESSAGES_COUNT = gql`
query CountUnreadMessages {
countUnreadMessages 
}
`

export const UNREAD_LETTERS_COUNT = gql`
query CountUnreadLetters {
countUnreadLetters
}
`