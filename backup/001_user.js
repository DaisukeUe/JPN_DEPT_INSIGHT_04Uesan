/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("dept_value").del();
  await knex("users").del();
  await knex("users").insert([
    {
      user_id: 1,
      user_name: "test_name",
      password: "1234567890",
      solt: "12345678",
    },
  ]);
  await knex("dept_value").insert([
    {
      dept_id: 1,
      user_foreign_id: 1,
      kinds: "y2",
      dept_value: 1.23,
      move_value: 0.12,
    },
  ]);
};
