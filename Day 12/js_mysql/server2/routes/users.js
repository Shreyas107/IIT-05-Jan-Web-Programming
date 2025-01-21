const express = require("express");
const router = express.Router();
const pool = require("../db");

// get all users from the database
router.get("/users", (req, res) => {
  pool.execute("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send(error, "Server Error");
    }
    res.send(results);
  });
});

// get user by id
router.get("/user/:id", (req, res) => {
  console.log("req.params: ", req.params);

  const userId = req.params.id;

  pool.execute(
    "SELECT * FROM users WHERE id =?",
    [userId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ error, message: "server error" });
      }
      if (results.length === 0) {
        res.status(404).send({ message: "No users found" });
      } else {
        res.send(results[0]);
      }
    }
  );
});

module.exports = router;
