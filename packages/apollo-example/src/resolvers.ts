import { Resolvers } from "./generated/graphql";
import { db } from './datasources'

interface Context {
  dataSources: {
    db: db
  }
}

export const resolvers: Resolvers<Context> = {
  Query: {
    users: async (_parent, _args, ctx) => ctx.dataSources.db.findUsers()
  },
  Batch: {
    tasks: async (parent, _args, ctx) => ctx.dataSources.db.findTasksByBatch(parent.id)
  },
  User: {
    areAllTasksCompleted: async (parent, _args, ctx) => ctx.dataSources.db.areAllTasksCompleted(parent.id),
    batches: async (parent, _args, ctx) => ctx.dataSources.db.findBatchesByUser(parent.id)
  }
};
