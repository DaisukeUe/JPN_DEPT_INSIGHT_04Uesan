// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.USER,
      database: process.env.DB,
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
