const express = require("express");
const router = express.Router();
const pool = require("../db");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const authorizeRole = require("../middlewares/authorizeRoles");
// console.log("SECRET_KEY", SECRET_KEY);

// register a user
router.post("/user/register", (request, response) => {
  const { name, email, password } = request.body;

  if (name == "" || email == "" || password == "") {
    return response.status(400).send({ message: "All fields are required" });
  } else {
    const hashPassword = String(crypto.SHA256(password));

    console.log("Password: ", password);
    console.log("hashPassword: ", hashPassword);

    // Insert user into the database
    pool.query(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashPassword],
      (error, results) => {
        if (error) {
          // console.error(error);
          if (error.code === "ER_DUP_ENTRY") {
            return response
              .status(400)
              .send({ message: "Email already exists" });
          }

          return response.status(500).send({ message: "Server Error" });
        } else {
          response
            .status(201)
            .send({ message: "User registered successfully" });
        }
      }
    );
  }
});

// User login route
router.post("/user/login", (request, response) => {
  const { email, password } = request.body;

  console.log("login called", email, password);

  if (email == "" || password == "") {
    return response.status(400).send({ message: "All fields are required" });
  } else {
    // Hash the password using SHA-256
    const hashPassword = String(crypto.SHA256(password));

    pool.execute(
      "SELECT id, name, role FROM user WHERE email = ? AND password = ?",
      [email, hashPassword],
      (error, dbResponse) => {
        if (error) {
          console.error(error);
          return response.status(500).send({ message: "Server Error" });
        }

        if (dbResponse.length === 0) {
          return response
            .status(401)
            .send({ message: "Invalid email or password" });
        }

        // User found, generate a JWT token
        const user = dbResponse[0];
        const payload = {
          id: user.id,
          name: user.name,
          email: email,
          role: user.role,
        };

        const token = jwt.sign(payload, SECRET_KEY);

        response.status(200).send({
          message: "Login successful",
          token: token,
        });
      }
    );
  }
});

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
router.get("/user/:id", authorizeRole(["admin", "user"]), (req, res) => {
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
