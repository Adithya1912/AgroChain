import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  user: """"Your Username"""",
  host: """"Your Host Name"""",
  database: """"Your Database name"""", 
  password: """"Your database password"""",
  port: """Your Port""",
});

console.log(`[DB] Pool created for database: ${pool.options.database}`);

export default pool;
