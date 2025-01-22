const userTypeDefs = ` 
scalar DateTime

type User {
  id: ID! 
  username: String 
  email: String! 
  password: String! 
  role: Role! 
  createdAt: DateTime!
  updatedAt: DateTime! 
  points: Int! 
  lastActive: DateTime 
  bio: String 
  avatar: String 

  # Связи
  books: [Book!]! 
  comments: [Comment!]! 
  likes: [Like!]! 
  posts: [Post!]! 
  notifications: [Notification!]! 
  subscriptionsAsSubscriber: [Subscription!]! 
  subscriptionsAsSubscribedTo: [Subscription!]! 
  messagesSent: [Message!]! 
  messagesReceived: [Message!]!
  pointsLogs: [PointsLog!]! 
}

type Query {
  getUser(id: ID!): User 
  getUsers: [User!]! 
  getCurrentUser: User 
}

type Mutation {
  registerUser(
    username: String
    email: String!
    password: String!
    bio: String
    avatar: String
  ): User!

  loginUser(email: String!, password: String!): String! 

  updateUser(
    id: ID!
    username: String
    email: String
    password: String
    bio: String
    avatar: String
  ): User! 

  deleteUser(id: ID!): User! 

  logout: Boolean! 
}
`;
