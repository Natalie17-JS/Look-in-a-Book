const complaintTypeDefs = `
scalar DateTime

enum ComplaintStatus {
  PENDING
  RESOLVED
}

type Mutation {
  createComplaint(reportedUserId: Int!, reason: String!): Complaint!
  resolveComplaint(complaintId: Int!): Complaint!
}

type Query {
  getComplaints: [Complaint!]!
}

type Complaint {
  id: Int!
  reason: String!
  status: ComplaintStatus!
  reportedBy: Int!
  reportedUserId: Int!
  createdAt: DateTime
  updatedAt: DateTime
}

type User {
  id: Int!
  username: String!
  email: String!
}

`

export default complaintTypeDefs;