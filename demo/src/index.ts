import { GraphQLServer } from "graphql-yoga";
import { importSchema } from 'graphql-import'
import { db } from "./datasources";
import { resolvers } from "./resolvers";

(async () => {

  const server = new GraphQLServer({
    typeDefs: await importSchema('./src/schema.graphql'),
    resolvers,
    context: (req) => ({ ...req, db })
  });

  server.start({ port: 5000 }).then(() => {
    console.log(`🚀  Server ready at http://localhost:5000`);
  });

})().catch(console.error)