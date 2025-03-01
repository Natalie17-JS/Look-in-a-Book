import {Book, User} from "@prisma/client"
import { GraphQLScalarType } from "graphql";
import { IContext } from "./UserResolversTypes";

export type CreateBookArgs = {
  title: string;
  annotation?: string;
  cover?: string;
};

export type UpdateBookArgs = {
    id: number;
    title?: string;
    annotation?: string;
    cover?: string;
}

export type DeleteBookArgs = {
    id: number; 
  };

  export type BookResolvers = {
    Query: {
      getBook: (parent: unknown, args: { id: number }) => Promise<Book | null>;
      getBooks: () => Promise<Book[]>;
    };
    Mutation: {
      createBook: (
        parent: unknown, 
        args: CreateBookArgs, 
        context: IContext
      ) => Promise<Book>;
  
      updateBook: (
        parent: unknown, 
        args: UpdateBookArgs, 
        context: IContext
      ) => Promise<Book>;
  
      deleteBook: (
        parent: unknown, 
        args: DeleteBookArgs, 
        context: IContext
      ) => Promise<{ message: string; }>;
    };
    DateTime: GraphQLScalarType;
  };
  