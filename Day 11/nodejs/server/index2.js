const express = require("express");

const app = express();

const port = 4000;

app.get("/hello", (req, res) => {
  // console.log("req", req);
  // console.log("res", res);

  res.send("Hello, World! (GET request)");
});

app.post("/hello", (req, res) => {
  res.send("Hello, World! (POST request)");
});

app.put("/hello", (req, res) => {
  res.send("Hello, World! (PUT request)");
});

app.delete("/hello", (req, res) => {
  res.send("Hello, World! (DELETE request)");
});

app.listen(port, () => {
  // The server is told to listen for incoming requests on the specified port (4000 in this case).
  console.log(`Server is running at http://localhost:${port}`);
});
