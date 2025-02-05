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
  isVerified: Boolean!
  verificationCode: String!
  codeExpiresAt: DateTime,
  verificationAttempts: Int!
  lastVerificationRequest: DateTime!

  
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

type LoginResponse {
  accessToken: String!
  refreshToken: String!
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

  verifyCode(email: String!, code: String!): String!

  requestVerificationCode(email: String!): String!

  loginUser(email: String!, password: String!): LoginResponse!

  refreshAccessToken: String!

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
