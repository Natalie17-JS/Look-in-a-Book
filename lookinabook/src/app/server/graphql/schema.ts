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
import postResolvers  from "./resolvers/postResolvers";
import { postTypeDefs } from "./typeDefs/postTypeDefs";
import uploadResolvers from "./resolvers/uploadResolvers";
import uploadTypeDefs from "./typeDefs/uploadTypeDefs";
import commentsResolvers from "./resolvers/commentsResolvers";
import { commentsTypeDefs } from "./typeDefs/commentsTypeDefs";
import likeResolvers from "./resolvers/likeResolvers";
import { likeTypeDefs } from "./typeDefs/likeTypeDefs";

const resolvers = mergeResolvers([
    userResolvers, 
    uploadResolvers, 
    adminResolvers,
    bookResolvers,
    chapterResolvers,
    postResolvers, 
    complaintResolvers,
    commentsResolvers,
    likeResolvers
]);

const typeDefs = mergeTypeDefs([
    userTypeDefs, 
    uploadTypeDefs, 
    adminTypeDefs,
    bookTypeDefs,
    chapterTypeDefs, 
    postTypeDefs, 
    complaintTypeDefs,
    commentsTypeDefs,
    likeTypeDefs
]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;