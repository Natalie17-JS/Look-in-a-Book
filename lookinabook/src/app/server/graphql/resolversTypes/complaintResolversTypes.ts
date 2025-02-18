import { User, Complaint } from "@prisma/client";
import { IContext } from "./UserResolversTypes";

export type CreateComplaintArgs = {
  reportedUserId: number; 
  reason: string;           
};

export type ComplaintResponse = {
  id: number;
  reason: string;
  status: string;
  reportedByUser: User;  // Теперь это User, а не id
  reportedUser: User;    // Теперь это User, а не id
};


export type ComplaintResolvers = {
  Query: {
    getComplaints: (
      parent: unknown, 
      args: unknown, 
      context: IContext
    ) => Promise<Complaint[]>;
  };
  Mutation: {
    createComplaint: (
      parent: unknown,
      args: CreateComplaintArgs,
      context: IContext
    ) => Promise<Complaint>;
    /*resolveComplaint: (
      parent: unknown,
      args: { complaintId: number },
      context: IContext
    ) => Promise<ComplaintResponse>;*/
  };
};
