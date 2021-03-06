import { SQLDataSource } from "datasource-sql";

interface BatchRecord {
  id: number
  name: string
}

interface TaskRecord {
  id: number
  name: string
  isCompleted: boolean
}

interface CreateBatchInput {
  name: string
}

interface CreateTaskInput {
  name: string
}

interface UpdateTaskInput {
  isCompleted: boolean
}

export class db extends SQLDataSource {
  async findBatches(): Promise<BatchRecord[]> {
    const batches = await this.knex
      .select<BatchRecord[]>("id", "name")
      .from("batches");

    return batches
  }

  async findBatch(id: number): Promise<BatchRecord> {
    const [batch] = await this.knex
      .select<BatchRecord[]>("id", "name")
      .from("batches")
      .where("id", id);

    return batch
  }

  async findTask(id: number): Promise<TaskRecord> {
    const [task] = await this.knex
      .select<TaskRecord[]>("id", "name", "isCompleted")
      .from("tasks")
      .where("id", id);

    return task
  }

  async findTasksByBatch(id: number): Promise<TaskRecord[]> {
    const tasks = await this.knex
      .select<TaskRecord[]>("id", "name", "isCompleted")
      .from("tasks")
      .where("batch_id", id);

    return tasks
  }

  async createBatch(input: CreateBatchInput) {
    const [{ id }] = await this.knex
      .table('batches')
      .returning(['id'])
      .insert<[{ id: number }]>({
        name: input.name
      })

    return this.findBatch(id)
  }

  async createTaskForBatch(batchId: number, input: CreateTaskInput) {
    const [{ id }] = await this.knex
      .table('tasks')
      .returning(['id'])
      .insert<[{ id: number }]>({
        name: input.name,
        batch_id: batchId,
      })

    return this.findTask(id)
  }

  async updateTask(id: number, input: UpdateTaskInput) {
    await this.knex
      .table('tasks')
      .where('id', id)
      .update({
        isCompleted: input.isCompleted,
      })

    return this.findTask(id)
  }
}

