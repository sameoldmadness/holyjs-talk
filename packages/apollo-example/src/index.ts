import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./types";
import { db } from "./datasources";
import knexConfig from '../knexfile';

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  dataSources: () => ({ db: new db(knexConfig.development) })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
