/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("dept_value", function (table) {
    table.increments("dept_id").primary;
    table
      .integer("user_foreign_id")
      .notNullable()
      .references("users.user_id")
      .onDelete("CASCADE");
    table.string("kinds", 64);
    table.decimal("dept_value", 3, 2);
    table.decimal("move_value", 3, 2);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("dept_value");
};
