import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dept_value", function (table) {
    table.increments("dept_id").primary();
    table
      .integer("user_foreign_id")
      .notNullable()
      .references("users.user_id")
      .onDelete("CASCADE");
    table.string("kinds", 64);
    table.integer("sspan", 16);
    table.integer("fspan", 16);
    table.string("showmode", 1);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dept_value");
}
