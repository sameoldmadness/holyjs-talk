import { forwardTo } from "prisma-binding";

export const resolvers = {
  Query: {
    batches: forwardTo('db'),
  },
  Mutation: {
    createBatch: forwardTo('db'),
    updateTask: forwardTo('db'),
  },
};
