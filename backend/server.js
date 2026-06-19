const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
        return;
    }

    console.log("MySQL Connected");
});

app.get("/api/scans", (req, res) => {

    const sql = "SELECT * FROM scans ORDER BY scan_time DESC";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});
app.post("/api/scans", (req, res) => {
  const { website, risk_score, status } = req.body;

  const sql =
    "INSERT INTO scans (website, risk_score, status) VALUES (?, ?, ?)";

  db.query(
    sql,
    [website, risk_score, status],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Scan saved successfully",
      });
    }
  );
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
}); 