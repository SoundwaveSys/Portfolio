require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connect error:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to RDS MySQL");
});

// API Route
app.get("/api/about", (_req, res) => {
  db.query("SELECT content FROM about LIMIT 1", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ content: rows[0]?.content || "" });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
