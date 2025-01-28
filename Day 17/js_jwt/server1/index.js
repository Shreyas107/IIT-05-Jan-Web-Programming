const express = require("express");
const cors = require("cors");
const app = express();
const { SECRET_KEY } = require("./config");
const jwt = require("jsonwebtoken");

const port = 5000;
app.use(cors());

app.use(express.json());

// Skip URLs Middleware
const skipUrls = (req, res, next) => {
  const skipPaths = ["/user/register", "/user/login"];

  // If the request is for a skip URL, continue without token validation
  if (skipPaths.includes(req.path)) {
    return next();
  }

  const token = req.headers.token;
  // console.log("token: ", token);

  // const decoded = jwt.decode(token); // Decodes without verifying
  // console.log("Decoded token:", decoded);

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    console.log("payload:", payload);
    // If token is valid, add the user object to the request for further use
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

app.use(skipUrls);

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

const userRoutes = require("./routes/users");
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
