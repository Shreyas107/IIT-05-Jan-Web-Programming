const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;
app.use(cors());

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

const userRoutes = require("./routes/users");
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
