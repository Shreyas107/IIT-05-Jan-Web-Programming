const express = require("express");
const router = express.Router();

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
  },
  {
    id: 4,
    name: "Alice Davis",
    email: "alice.davis@example.com",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
  },
];

router.get("/users", (req, res) => {
  res.send({
    status: 200,
    message: "Hello, World!",
    data: users,
  });
});

module.exports = router;
