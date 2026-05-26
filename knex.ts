import knex from "knex";
import config from "./knexfile";

const environment = "development";
const connectionConfig = config[process.env.NODE_ENV || environment];

if (!connectionConfig) {
  throw new Error(`環境 '${environment}' の設定が knexfile に見つかりません。`);
}

export const db = knex(connectionConfig);
