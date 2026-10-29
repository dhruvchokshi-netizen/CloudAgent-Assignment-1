const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello CloudAgent!",
    service: "Node.js backend"
  });
});

app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database, NOW() AS time"
    );

    res.json({
      status: "connected",
      database: result.rows[0].database,
      time: result.rows[0].time
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({ status: "disconnected" });
  }
});

app.get("/records", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, message, created_at FROM sample_records ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Query failed:", error.message);
    res.status(500).json({ error: "Could not fetch records" });
  }
});

app.post("/records", async (req, res) => {
  const { message } = req.body;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "A message is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO sample_records (message) VALUES ($1) RETURNING *",
      [message.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Insert failed:", error.message);
    res.status(500).json({ error: "Could not insert record" });
  }
});

async function startServer() {
  try {
    await pool.query("SELECT 1");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sample_records (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    app.listen(3000, "0.0.0.0", () => {
      console.log("Backend listening on port 3000");
      console.log("Database connection successful");
    });
  } catch (error) {
    console.error("Database not ready:", error.message);
    process.exit(1);
  }
}

startServer();
