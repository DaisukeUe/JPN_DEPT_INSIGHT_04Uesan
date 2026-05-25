import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", function (table) {
    table.string("solt", 32).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", function (table) {
    table.string("solt", 8).alter();
  });
}
