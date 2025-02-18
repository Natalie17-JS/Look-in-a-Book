const adminTypeDefs = `
scalar DateTime

type BannedUser {
    id: Int!
    username: String
    email: String!
    isBanned: Boolean!
    publishBanned: Boolean!
    createdAt: DateTime
    updatedAt: DateTime
}

type BanUserResponse {
  bannedUser: BannedUser!
  success: Boolean!
}

type UnbanUserResponse {
  unbannedUser: BannedUser!
  success: Boolean!
}

type Query {
  getBannedUsers: [BannedUser]
}
  type Mutation {
   banUser(userId: Int!): BanUserResponse!
   unbanUser(userId: Int!): UnbanUserResponse!
    createAdmin (
   username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
): User!
  }
  `
  export default adminTypeDefs;