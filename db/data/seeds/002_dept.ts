import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("dept_value").del();

  // Inserts seed entries
  await knex("dept_value").insert([
    {
      dept_id: 1,
      user_foreign_id: 1,
      kinds: "y2",
      sspan: 20231128,
      fspan: 20260522,
      showmode: "d",
    },
    {
      dept_id: 2,
      user_foreign_id: 2,
      kinds: "y5",
      sspan: 20221128,
      fspan: 20250522,
      showmode: "w",
    },
    {
      dept_id: 3,
      user_foreign_id: 1,
      kinds: "y10",
      sspan: 20221128,
      fspan: 20250522,
      showmode: "w",
    },
  ]);
}
