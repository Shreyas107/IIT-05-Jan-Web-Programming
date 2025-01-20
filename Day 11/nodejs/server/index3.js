const express = require("express");
const app = express();

const port = 4000;

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
];

app.get("/users", (req, res) => {
  res.send({
    status: 200,
    message: "Hello, World!",
    data: users,
    name: "SJ",
  });
});

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
