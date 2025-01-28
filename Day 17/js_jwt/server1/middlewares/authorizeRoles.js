const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// Middleware for role authorization
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.token;
    console.log("Token: ", token);

    if (!token) {
      return res.status(403).json({ error: "Token is required" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log("Decoded JWT: ", decoded);

      const userRole = decoded.role;
      console.log("User Role: ", userRole);

      if (allowedRoles.includes(userRole)) {
        // User has the necessary role, allow access to the route
        next();
      } else {
        // User does not have the necessary role, return a 403 Forbidden error
        return res.status(403).json({
          error: "Access forbidden: You are not allowed to make this request",
        });
      }
    } catch (error) {
      // Handle token verification error (e.g., token expired, invalid token)
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
};

module.exports = authorizeRole;
