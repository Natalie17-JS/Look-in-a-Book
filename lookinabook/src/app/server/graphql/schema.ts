import {mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import userTypeDefs from "./typeDefs/userTypeDefs";
import userResolvers from "./resolvers/userResolvers";
import adminResolvers  from "./resolvers/adminResolvers";
import adminTypeDefs from "./typeDefs/adminTypeDefs";
import complaintTypeDefs from "./typeDefs/complaintTypeDefs";
import complaintResolvers from "./resolvers/complaintResolvers";
import bookTypeDefs from "./typeDefs/bookTypeDefs";
import bookResolvers from "./resolvers/bookResolvers";
import chapterResolvers from "./resolvers/chapterResolvers";
import { chapterTypeDefs } from "./typeDefs/chapterTypeDefs";
import uploadResolvers from "./resolvers/uploadResolvers";
import uploadTypeDefs from "./typeDefs/uploadTypeDefs";

const resolvers = mergeResolvers([userResolvers, uploadResolvers, adminResolvers,bookResolvers,chapterResolvers, complaintResolvers]);

const typeDefs = mergeTypeDefs([userTypeDefs, uploadTypeDefs, adminTypeDefs,bookTypeDefs,chapterTypeDefs, complaintTypeDefs]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;