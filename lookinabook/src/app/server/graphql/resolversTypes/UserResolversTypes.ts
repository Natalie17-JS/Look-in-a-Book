import { User } from "@prisma/client";
import { GraphQLScalarType, Kind, ValueNode } from "graphql";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prismaClient";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid date-time value",
  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new TypeError("Value is not an instance of Date");
    }
    return value.toISOString(); // Преобразование Date в строку ISO
  },
  parseValue(value: unknown): Date {
    if (typeof value !== "string") {
      throw new TypeError("Value is not a valid ISO string");
    }
    return new Date(value); // Преобразование строки ISO в Date
  },
  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Преобразование строки ISO в Date
    }
    return null; // Некорректные данные
  },
});

export type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
};

export type UpdateUserArgs = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  avatar?: string;
};

export type DeleteUserArgs = {
  id: number;
};

export type GetUserArgs = {
  id: number;
};

export type LoginUserArgs = {
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  id: number;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export interface IContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: typeof prisma; // Используйте тип экземпляра prisma
  user?: User | null; // user - это информация о текущем пользователе (если есть)
}

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
    registerUser: (
      parent: unknown,
      args: CreateUserArgs,
      context: IContext
    ) => Promise<User>;
    updateUser: (
      parent: unknown,
      args: UpdateUserArgs,
      context: IContext
    ) => Promise<User>;
    deleteUser: (
      parent: unknown,
      args: DeleteUserArgs,
      context: IContext
    ) => Promise<User>;
    loginUser: (
      parent: unknown,
      args: LoginUserArgs,
      context: IContext
    ) => Promise<LoginResponse>;
    logout: (
      parent: unknown,
      args: unknown,
      context: { user: AuthenticatedUser }
    ) => Promise<boolean>;
  };
  DateTime: GraphQLScalarType;
};
