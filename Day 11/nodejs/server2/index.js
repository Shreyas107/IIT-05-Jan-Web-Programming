const express = require("express");
const app = express();

const port = 4000;

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

const userRoutes = require("./users");
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
