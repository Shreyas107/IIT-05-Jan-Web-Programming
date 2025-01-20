const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Route to get users
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Shreyas", address: "Pune" },
    { id: 2, name: "Sameer", address: "Mumbai" },
    { id: 3, name: "Mahesh", address: "Nagar" },
    { id: 4, name: "Amit", address: "Pune" },
    { id: 5, name: "Nilesh", address: "Pune" },
  ];
  res.json(users);
});

// Route to create a user
app.post("/users", (req, res) => {
  const newUser = req.body;
  // Here you would typically insert the new user into the database
  res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
