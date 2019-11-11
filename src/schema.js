import path from "path";
import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import {GraphQLDateTime} from 'graphql-type-datetime'

const allTypes = fileLoader(path.join(__dirname,'/api/**/*.graphql'));
const allResolvers = fileLoader(path.join(__dirname,'/api/**/*.js'));

const schema = makeExecutableSchema({
    typeDefs : mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;