import { ApolloServer } from "apollo-server";
import { db } from "./datasources";
import { resolvers } from "./resolvers";
import { typeDefs } from "./types";

const knexConfig = require('../knexfile');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db: new db(knexConfig) })
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
