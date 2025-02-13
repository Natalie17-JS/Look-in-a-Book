import {mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import userTypeDefs from "./typeDefs/userTypeDefs";
import userResolvers from "./resolvers/userResolvers";
import bookTypeDefs from "./typeDefs/bookTypeDefs";
import bookResolvers from "./resolvers/bookResolvers";
import uploadResolvers from "./resolvers/uploadResolvers";
import uploadTypeDefs from "./typeDefs/uploadTypeDefs";

const resolvers = mergeResolvers([userResolvers, bookResolvers, uploadResolvers]);

const typeDefs = mergeTypeDefs([userTypeDefs, bookTypeDefs, uploadTypeDefs]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;