const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.data = data;
    next();
  });
};

module.exports = authenticateToken;
