const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;
app.use(cors());

// Custom middleware
const myMiddleware = (req, res, next) => {
  console.log("Middleware called!");
  console.log("request: " + req.url);
  next();
};

// app.use(myMiddleware);

const routeMiddleware = (req, res, next) => {
  console.log("specific route Middleware called!");
  console.log("request: " + req.url);
  next();
};

app.get("/hello", routeMiddleware, (req, res) => {
  res.send("Hello, World!");
});

app.get("/test", (req, res) => {
  res.send("test!");
});

const userRoutes = require("./routes/users");
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
