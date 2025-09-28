import pool from "./db/index.js";

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to DB:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
})();
