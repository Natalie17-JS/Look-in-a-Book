const complaintTypeDefs = `
enum ComplaintStatus {
  PENDING
  RESOLVED
}

type Mutation {
  submitComplaint(reportedUserId: Int!, reason: String!): Complaint!
  resolveComplaint(complaintId: Int!): Complaint!
}

type Query {
  getComplaints: [Complaint!]!
}

type Complaint {
  id: Int!
  reason: String!
  status: ComplaintStatus!
  reportedByUser: User!
  reportedUser: User!
  createdAt: String!
}

type User {
  id: Int!
  username: String!
  email: String!
}

`

export default complaintTypeDefs;