import { Config } from "knex";

const config: Record<'development', Config> = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./apollo-example.db"
    },
    debug: true,
    useNullAsDefault: true,
  }
};

export default config
