// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
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
    seeds: { directory: "./db/data/seeds" },
  },
};
