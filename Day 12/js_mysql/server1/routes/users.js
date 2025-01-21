const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shreyas",
  database: "userdata",
});

// get all users from the database
router.get("/users", (req, res) => {
  connection.execute("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
    res.send(results);
  });
});

module.exports = router;
