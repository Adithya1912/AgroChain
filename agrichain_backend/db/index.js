import pkg from "pg";
const { Pool } = pkg;

// TEMPORARY TEST: We are hardcoding the correct database name here
// to bypass any issues with the .env file.
const pool = new Pool({
  user: ""Your Username"",
  host: ""Your Host Name"",
  database: ""Your Database name"", // <-- HARDCODED a
  password: ""Yoyr database password"",
  port: 5432,
});

// Add a console log to confirm which database this file is connecting to
console.log(`[DB] Pool created for database: ${pool.options.database}`);

export default pool;
