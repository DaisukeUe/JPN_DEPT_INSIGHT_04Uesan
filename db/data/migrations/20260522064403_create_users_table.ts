import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.increments("user_id").primary();
    table.string("user_name", 64);
    table.string("password", 64).notNullable();
    table.string("solt", 8);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
