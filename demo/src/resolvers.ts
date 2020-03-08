import { db } from './datasources';
import { Batch, Resolvers, Task } from "./generated/graphql";

interface Context {
  dataSources: {
    db: db
  }
}

export const resolvers: Resolvers<Context> = {
  Query: {
    batches: async (_parent, _args, ctx) => {
      const batches = await ctx.dataSources.db.findBatches()

      return batches.map((batch) => ({
        id: batch.id,
        name: batch.name,
      } as Batch))
    }
  },
  Mutation: {
    createBatch: async (_parent, args, ctx) => {
      const batch = await ctx.dataSources.db.createBatch(args.data)

      for (const taskInput of args.data.tasks) {
        await ctx.dataSources.db.createTaskForBatch(batch.id, taskInput)
      }

      return batch as Batch
    },
    updateTask: async (_parent, args, ctx) => {
      const task = await ctx.dataSources.db.updateTask(args.where.id, args.data)

      return task as Task
    },
  },
  Batch: {
    tasks: async (parent, _args, ctx) => {
      const tasks = await ctx.dataSources.db.findTasksByBatch(parent.id)

      return tasks.map((task) => ({
        id: task.id,
        name: task.name,
        isCompleted: task.isCompleted,
      } as Task))
    }
  },
};
