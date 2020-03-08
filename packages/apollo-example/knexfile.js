module.exports = {
  client: "sqlite3",
  migrations: {
    extension: 'ts'
  },
  connection: {
    filename: "./apollo-example.db"
  },
  debug: true,
  useNullAsDefault: true,
};
