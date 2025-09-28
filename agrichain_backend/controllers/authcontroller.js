import pool from "../db/index.js";

const generatePublicId = (role) => {
  const prefix = role.substring(0, 3).toUpperCase();
  const uniqueNum = Date.now().toString().slice(-5);
  return `${prefix}_${uniqueNum}`;
};

export const registerUser = async (req, res) => {
  try {
    const { name, role } = req.body;
    const public_id = generatePublicId(role);

    const result = await pool.query(
      "INSERT INTO users (public_id, name, role) VALUES ($1, $2, $3) RETURNING *",
      [public_id, name, role]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { public_id, role } = req.body;
    const result = await pool.query(
      "SELECT * FROM users WHERE public_id=$1 AND role=$2",
      [public_id, role]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid ID or role" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};
