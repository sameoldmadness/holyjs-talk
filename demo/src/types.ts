import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Batch {
    id: Int!
    name: String!
    tasks: [Task!]!
  }

  type Task {
    id: Int!
    name: String!
    isCompleted: Boolean!
  }

  type Query {
    batches: [Batch!]!
  }

  type Mutation {
    createBatch(input: CreateBatchInput!): Batch!
    completeTask(id: Int!): Task!
  }

  input CreateBatchInput {
    name: String!
    tasks: [CreateTaskInput!]!
  }

  input CreateTaskInput {
    name: String!
  }
`;
