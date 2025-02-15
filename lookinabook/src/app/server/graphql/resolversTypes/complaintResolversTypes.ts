import { User } from "@prisma/client";
import { IContext } from "./UserResolversTypes";

export type CreateComplaintArgs = {
  reportedUserId: number; 
  reason: string;           
};

export type ComplaintResponse = {
  id: number;
  reason: string;
  status: string;        
  reportedByUser: User;
  reportedUser: User;
  createdAt: string;
  updatedAt: string;
};

export type ComplaintResolvers = {
  Mutation: {
    createComplaint: (
      parent: unknown,
      args: CreateComplaintArgs,
      context: IContext
    ) => Promise<ComplaintResponse>;
    resolveComplaint: (
      parent: unknown,
      args: { complaintId: number },
      context: IContext
    ) => Promise<ComplaintResponse>;
  };
};
