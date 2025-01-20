// Import the required modules
const express = require("express");

// Create an instance of the Express application, which will be used to define routes and configure the server.
const app = express();

// Define the port where the server will listen for requests
const port = 4000;

// defining a route that responds with a message
// URL: http://localhost:4000/
// endpoint -> /hello
// app.get() -> get / post / put / delete - method name
app.get("/hello", (req, res) => {
  res.send("<h1><center>Hello, World!</center></h1>");
  // When a GET request is made to the root URL ("/"), the server will send "Hello, World!" as the response.
});

// Start the server
app.listen(port, () => {
  // The server is told to listen for incoming requests on the specified port (4000 in this case).
  console.log(`Server is running at http://localhost:${port}`);
});
