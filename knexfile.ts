import type { Knex } from "knex";
import "dotenv/config";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      user: "user",
      database: "dept",
      host: "localhost",
    },
    migrations: {
      directory: "./db/data/migrations",
    },
    seeds: {
      directory: "./db/data/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/data/migrations",
    },
    seeds: {
      directory: "./db/data/seeds",
    },
  },
};

export default config;
