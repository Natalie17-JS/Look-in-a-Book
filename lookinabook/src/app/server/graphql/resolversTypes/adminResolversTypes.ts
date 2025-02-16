import { IContext } from "./UserResolversTypes";
import { User } from "@prisma/client";

export type BanResponse = {
    bannedUser: User;
    success: boolean;
  };

  export type BannedUser = {
    id: number;
    username: string | null;
    email: string;
    isBanned: boolean;
    publishBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  // Аргументы для создания администратора
export type CreateAdminArgs = {
  username: string;
  email: string;
  password: string;
};
  

  export type AdminResolvers = {
    Query: {
         getBannedUsers: (
              parent: unknown,
              args: unknown,
              context: IContext
            ) => Promise<BannedUser[]>;
          };
          Mutation: {
            createAdmin: (
                  parent: unknown,
                  args: CreateAdminArgs,
                  context: IContext
                ) => Promise<User>;
            banUser: (
              parent: unknown,
              args: { userId: number },
              context: IContext
            ) => Promise<BanResponse>;
            };
            //DateTime: GraphQLScalarType;
          }
    
  