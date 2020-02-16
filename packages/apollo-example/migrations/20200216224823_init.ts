import * as Knex from "knex";

export function up(knex: Knex) {
  return knex.schema
    .createTable("users", function(table) {
      table.increments("id");
      table.text("name").notNullable();
    })
    .createTable("batches", function(table) {
      table.increments("id");
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
    .createTable("tasks", function(table) {
      table.increments("id");
      table.boolean("isCompleted").notNullable();
      table.integer('batch_id').unsigned().references('id').inTable('batches')
    });
}

export function down(knex: Knex) {
  return knex.schema
    .dropTable("tasks")
    .dropTable("batches")
    .dropTable("users");
}
