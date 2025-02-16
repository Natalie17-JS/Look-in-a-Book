const adminTypeDefs = `
scalar DateTime

type BannedUser {
    id: Int!;
    username: String
    email: String!
    isBanned: Boolean!
    publishBanned: Boolean!
    createdAt: Date
    updatedAt: Date
}

type BanUserResponse {
  bannedUser: BannedUser!
  success: Boolean!
}


type Query {
  getBannedUsers: [BannedUser]
}
  type Mutation {
   banUser(userId: Int!): BanUserResponse!
    createAdmin (
   username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
): User!
  }

`