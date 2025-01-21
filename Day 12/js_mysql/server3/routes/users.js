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
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id =?", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ error, message: "server error" });
    }
    if (results.length === 0) {
      res.status(404).send({ message: "No users found" });
    } else {
      res.send(results[0]);
    }
  });
});

// create a new user
router.post("/user", (req, res) => {
  const { id, name, username, email, phone } = req.body;
  console.log("req.body: " + req.body.id);

  pool.query(
    "INSERT INTO users (id, name, username, email, phone) VALUES (?,?,?,?,?)",
    [id, name, username, email, phone],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ error, message: "server error" });
      } else {
        res.status(201).send({ results, message: "User created successfully" });
      }
    }
  );
});

// update a user by its id
router.put("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, username, email, phone } = req.body;

  pool.query(
    "UPDATE users SET name =?, username =?, email =?, phone =? WHERE id =?",
    [name, username, email, phone, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ error, message: "server error" });
      } else {
        res.status(200).send({ results, message: "User updated successfully" });
      }
    }
  );
});

// delete a user by id
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM users WHERE id =?", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ error, message: "server error" });
    } else {
      res.status(200).send({ results, message: "User deleted successfully" });
    }
  });
});

module.exports = router;
