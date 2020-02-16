import { PrismaClient } from '@prisma/client'
import { GraphQLServer } from 'graphql-yoga'
import { makeSchema } from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as path from 'path'
import * as types from './types'

const prisma = new PrismaClient()

new GraphQLServer({
  context: () => ({ prisma }),
  schema: makeSchema({
    types,
    plugins: [nexusPrismaPlugin()],
    typegenAutoConfig: {
      contextType: '{ prisma: PrismaClient.PrismaClient }',
      sources: [{ source: '@prisma/client', alias: 'PrismaClient' }],
    },
    outputs: {
      typegen: path.join(
        __dirname,
        '../node_modules/@types/nexus-typegen/index.d.ts',
      ),
    },
  }),
}).start(() => console.log(`🚀 GraphQL service ready at http://localhost:4000`))