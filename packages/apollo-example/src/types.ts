import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    areAllTasksCompleted: Boolean!
    batches: [Batch!]!
  }

  type Batch {
    id: Int!
    tasks: [Task!]!
  }

  type Task {
    id: Int!
    isCompleted: Boolean!
  }

  type Query {
    users: [User!]!
  }
`;
