const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Postgres@123",
  database: "usersdb",
  port: 5432,
});