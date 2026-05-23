import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      user_id: 1,
      user_name: "test_name",
      password: "1234567890",
      solt: "12345678",
    },
    {
      user_id: 2,
      user_name: "test_name2",
      password: "1234",
      solt: "1234",
    },
  ]);
}
