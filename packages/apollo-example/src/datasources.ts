import { SQLDataSource } from "datasource-sql";

export class db extends SQLDataSource {
  findUsers() {
    return this.knex.select("*").from("users");
  }

  findBatchesByUser(id: number) {
    return this.knex
      .select("*")
      .from("batches")
      .where("user_id", id);
  }

  findTasksByBatch(id: number) {
    return this.knex
      .select("*")
      .from("tasks")
      .where("batch_id", id);
  }

  async areAllTasksCompleted(id: number) {
    const count = await this.knex
      .table("tasks")
      .join("batches", "batches.id", "=", "tasks.batch_id")
      .where("tasks.isCompleted", false)
      .count();

    return count === 0;
  }
}
