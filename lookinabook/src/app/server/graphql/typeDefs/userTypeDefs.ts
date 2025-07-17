const userTypeDefs = ` 
scalar DateTime


type User {
  id: Int! 
  username: String! 
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
  isOnline: Boolean!
  isBanned: Boolean
  publishBanned: Boolean
  banEndDate: DateTime
  banCount: Int
  books: [Book!]
  posts: [Post!]
  
  # comments: [Comment!] 
  # likes: [Like!]
  # notifications: [Notification!] 
  # subscriptionsAsSubscriber: [Subscription!]
  # subscriptionsAsSubscribedTo: [Subscription!]
  # messagesSent: [Message!] 
  # messagesReceived: [Message!]
  # pointsLogs: [PointsLog!] 
}


enum Role {
  USER
  ADMIN
}

type Subscription {
  id: Int!
  subscriberId: Int!
  subscribedToId: Int!
  subscriber: User!          
  subscribedTo: User!         
  createdAt: DateTime!
}

type LoginResponse {
  accessToken: String!
  refreshToken: String!
  user: User!
}

type UnsubscribeResult {
  message: String!
}

type Query {
  getUser(id: Int!): User 
  getUsers: [User!]! 
  getCurrentUser: User 
  getUserFollowers(id: Int!): [User!]!
  getMyFollowers: [User!]!
  getUserFollowing(id: Int!): [User!]!
  getMyFollowing: [User!]!
  getFollowersCount(userId: Int!): Int!
  getFollowingCount(userId: Int!): Int!
}

type Mutation {
  registerUser(
    username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
  ): User!

 

  verifyCode(email: String!, code: String!): String!

  requestVerificationCode(email: String!): String!

  loginUser(email: String!, password: String!): LoginResponse!

  refreshAccessTokenResolver: String!


  updateUser(
    id: Int!
    username: String
    email: String
    password: String
    bio: String
    avatar: String
  ): User!

  deleteUser(id: Int!): User! 

  logoutUser: Boolean! 

  subscribeToUser(userId: Int!): Subscription!
  unsubscribeFromUser(userId: Int!): UnsubscribeResult!
}
`;
export default userTypeDefs;
