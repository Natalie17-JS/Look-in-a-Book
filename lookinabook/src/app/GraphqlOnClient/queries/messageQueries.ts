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
    recipient {
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

export const GET_USER_CHATS = gql `
  query GetUserChats {
    getUserChats {
      id
      participants {
        id
        username
      }
      messages {
          id
          text
        }
      invitations {
          id
          chatId
        }
      createdAt
    }  
  }
`

export const GET_PENDING_INVITES = gql `
  query GetPendingInvites {
    getPendingInvites{
      id
      chat
      inviter{
        id
        username
      }
      target{
        id
        username
      }
      status
      createdAt
    }
  }
`

export const GET_USER_MESSAGES = gql`
query GetUserMessages {
  getUserMessages {
    id
    chatId
    text
    type
    isRead
    createdAt
    sender{
      id
      username
    }
    recipient {
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

export const GET_USER_READ_LETTERS = gql`
query GetUserReadLetters {
  getUserReadLetters {
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

export const GET_USER_UNREAD_LETTERS = gql`
query GetUserUnreadLetters {
  getUserUnreadLetters {
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

export const GET_USER_SENT_LETTERS = gql`
query GetUserSentLetters {
  getUserSentLetters {
    id
    text
    type
    isRead
    createdAt
    recipient {
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