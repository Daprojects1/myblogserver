const jwt = require('jsonwebtoken')

const config = process.env

const verifyToken = (req, res, next) => {
  let token;
  token = req.body.token || req.headers["x-access-token"] || req.headers?.authorization;
  if (req.headers?.authorization) token = token.split(" ")[1]
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
}


module.exports = verifyToken