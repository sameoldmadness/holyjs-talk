import { queryType, mutationType, objectType } from 'nexus'
import { areAllTasksCompleted } from './service'

export const Query = queryType({
  definition(t) {
    t.crud.users()
  },
})

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser()
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.batches()
    t.field('areAllTasksCompleted', {
        type: 'Boolean',
        resolve: (parent, _args, ctx) => areAllTasksCompleted(parent.id, ctx)
    })
  },
})

export const Batch = objectType({
  name: 'Batch',
  definition(t) {
    t.model.id()
    t.model.tasks()
  },
})

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.isCompleted()
  },
})