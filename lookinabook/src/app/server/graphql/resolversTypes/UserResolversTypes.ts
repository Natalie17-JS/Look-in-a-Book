import { User } from "@prisma/client";

export type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string; // URL аватара (опционально)
};

export type UpdateUserArgs = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  avatar?: string; // URL аватара (опционально)
};

export type DeleteUserArgs = {
  id: number;
};

export type GetUserArgs = {
  id: number;
};

export type AuthenticatedUser = {
  id: number;
};

export type UserResolvers = {
  Query: {
    getUser: (parent: unknown, args: GetUserArgs) => Promise<User | null>;
    getUsers: () => Promise<User[]>;
    getCurrentUser: (
      parent: unknown,
      args: unknown,
      context: { user: AuthenticatedUser }
    ) => Promise<User | null>;
  };
  Mutation: {
    registerUser: (parent: unknown, args: CreateUserArgs) => Promise<User>;
    updateUser: (parent: unknown, args: UpdateUserArgs) => Promise<User>;
    deleteUser: (parent: unknown, args: DeleteUserArgs) => Promise<User>;
    logout: (
      parent: unknown,
      args: unknown,
      context: { user: AuthenticatedUser }
    ) => Promise<boolean>;
  };
};
