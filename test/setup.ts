import { db } from "../knex";

export const mochaGlobalTeardown = async (): Promise<void> => {
  try {
    await db.destroy();
    console.log("✅ Closed database connection");
  } catch (error) {
    console.error(error);
  }
};
