import { ApolloServer } from "apollo-server";
import { importSchema } from 'graphql-import'
import { db } from "./datasources";
import { resolvers } from "./resolvers";

(async () => {

  const knexConfig = require('../knexfile');

  const server = new ApolloServer({
    typeDefs: await importSchema('./src/schema.graphql'),
    resolvers,
    dataSources: () => ({ db: new db(knexConfig) })
  });

  server.listen({ port: 5000 }).then(() => {
    console.log(`🚀  Server ready at http://localhost:5000`);
  });

})().catch(console.error)