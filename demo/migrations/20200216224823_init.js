exports.up = knex => {
  return knex.schema
    .createTable("batches", function(table) {
      table.increments("id");
      table.text("name");
    })
    .createTable("tasks", function(table) {
      table.increments("id");
      table.text("name");
      table
        .boolean("isCompleted")
        .notNullable()
        .defaultTo(false);
      table
        .integer("batch_id")
        .unsigned()
        .references("id")
        .inTable("batches");
    });
};

exports.down = knex => {
  return knex.schema.dropTable("tasks").dropTable("batches");
};
